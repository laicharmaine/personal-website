"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  useSyncExternalStore,
  type ReactNode,
} from "react";
import type { SiteContent } from "@/lib/content";
import { setIn, updateList, type Path } from "@/lib/path";

export const EDITOR_HEADERS = { "x-charmaine-editor": "1" };

type Status = { kind: "idle" | "saving" | "saved" | "error"; message?: string };

type EditCtx = {
  /** What to render: the draft while editing, otherwise the published content. */
  content: SiteContent;
  editing: boolean;
  admin: boolean;
  dirty: boolean;
  status: Status;
  startEditing: () => void;
  cancel: () => void;
  save: () => Promise<void>;
  setAt: (path: Path, value: unknown) => void;
  insert: (path: Path, item: unknown, index?: number) => void;
  remove: (path: Path, index: number) => void;
  move: (path: Path, index: number, dir: -1 | 1) => void;
  replacePublished: (content: SiteContent) => void;
};

const Ctx = createContext<EditCtx | null>(null);

export function useEdit(): EditCtx {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useEdit must be used inside <EditProvider>");
  return ctx;
}

export function useContent(): SiteContent {
  return useEdit().content;
}

const noopSubscribe = () => () => {};
const readAdminHint = () =>
  document.cookie.split("; ").includes("site_admin_ui=1");

export default function EditProvider({
  initial,
  children,
}: {
  initial: SiteContent;
  children: ReactNode;
}) {
  const [published, setPublished] = useState(initial);
  const [lastInitial, setLastInitial] = useState(initial);
  const [draft, setDraft] = useState<SiteContent | null>(null);
  const [status, setStatus] = useState<Status>({ kind: "idle" });
  const admin = useSyncExternalStore(noopSubscribe, readAdminHint, () => false);

  // New server content (after save/refresh): adopt it.
  if (initial !== lastInitial) {
    setLastInitial(initial);
    setPublished(initial);
  }

  const editing = draft !== null;
  const dirty = useMemo(
    () => editing && JSON.stringify(draft) !== JSON.stringify(published),
    [draft, published, editing],
  );

  const startEditing = useCallback(() => {
    setDraft(structuredClone(published));
    setStatus({ kind: "idle" });
  }, [published]);

  // /?edit=1 (right after logging in) opens edit mode straight away.
  useEffect(() => {
    if (!admin) return;
    const url = new URL(window.location.href);
    if (url.searchParams.get("edit") !== "1") return;
    url.searchParams.delete("edit");
    window.history.replaceState(null, "", url.pathname + url.search + url.hash);
    queueMicrotask(startEditing);
  }, [admin, startEditing]);

  const cancel = useCallback(() => {
    if (dirty && !window.confirm("Throw away your unsaved changes?")) return;
    setDraft(null);
    setStatus({ kind: "idle" });
  }, [dirty]);

  const save = useCallback(async () => {
    if (!draft) return;
    setStatus({ kind: "saving" });
    try {
      const res = await fetch("/api/admin/content", {
        method: "POST",
        headers: { "content-type": "application/json", ...EDITOR_HEADERS },
        body: JSON.stringify({ content: draft }),
      });
      const data = await res.json().catch(() => ({}));
      if (res.status === 401)
        throw new Error(
          "Your editor login expired. Log in again at /admin (your changes are still here).",
        );
      if (!res.ok) throw new Error(data.error ?? "Could not save.");
      setPublished(data.content);
      setDraft(null);
      setStatus({
        kind: "saved",
        message: new Date().toLocaleTimeString([], {
          hour: "numeric",
          minute: "2-digit",
        }),
      });
    } catch (err) {
      setStatus({
        kind: "error",
        message: err instanceof Error ? err.message : "Could not save.",
      });
    }
  }, [draft]);

  // The editor keeps the content it just published as the source of truth for
  // this session (a router refresh right after saving can race the cache and
  // bring back the previous version). Viewers get the new content from the server.
  const replacePublished = useCallback((content: SiteContent) => {
    setPublished(content);
    setDraft(null);
  }, []);

  const mutate = useCallback((fn: (d: SiteContent) => SiteContent) => {
    setDraft((d) => (d ? fn(d) : d));
  }, []);

  const value = useMemo<EditCtx>(
    () => ({
      content: draft ?? published,
      editing,
      admin,
      dirty,
      status,
      startEditing,
      cancel,
      save,
      replacePublished,
      setAt: (path, v) => mutate((d) => setIn(d, path, v)),
      insert: (path, item, index) =>
        mutate((d) =>
          updateList(d, path, (l) => {
            const copy = [...l];
            copy.splice(index ?? copy.length, 0, item);
            return copy;
          }),
        ),
      remove: (path, index) =>
        mutate((d) =>
          updateList(d, path, (l) => l.filter((_, i) => i !== index)),
        ),
      move: (path, index, dir) =>
        mutate((d) =>
          updateList(d, path, (l) => {
            const j = index + dir;
            if (j < 0 || j >= l.length) return l;
            const copy = [...l];
            [copy[index], copy[j]] = [copy[j], copy[index]];
            return copy;
          }),
        ),
    }),
    [
      draft,
      published,
      editing,
      admin,
      dirty,
      status,
      startEditing,
      cancel,
      save,
      replacePublished,
      mutate,
    ],
  );

  // Warn before leaving with unsaved edits.
  useEffect(() => {
    if (!dirty) return;
    const onBeforeUnload = (e: BeforeUnloadEvent) => {
      e.preventDefault();
    };
    window.addEventListener("beforeunload", onBeforeUnload);
    return () => window.removeEventListener("beforeunload", onBeforeUnload);
  }, [dirty]);

  // While editing, clicks inside the page edit text instead of following links
  // or toggling expandable rows. The top nav still works to switch pages.
  useEffect(() => {
    if (!editing) return;
    const onClick = (e: MouseEvent) => {
      const t = e.target as Element | null;
      if (!t || t.closest("[data-editor-ui]")) return;
      const inPage = t.closest("main, footer");
      if (!inPage) return;
      if (t.closest("a") || t.closest("summary")) e.preventDefault();
    };
    const onKey = (e: KeyboardEvent) => {
      const t = e.target as Element | null;
      if (
        (e.key === " " || e.key === "Enter") &&
        t?.closest("summary") &&
        t.closest("[data-editable]")
      ) {
        e.stopPropagation();
      }
    };
    document.addEventListener("click", onClick, true);
    document.addEventListener("keyup", onKey, true);
    document.documentElement.classList.add("is-editing");
    return () => {
      document.removeEventListener("click", onClick, true);
      document.removeEventListener("keyup", onKey, true);
      document.documentElement.classList.remove("is-editing");
    };
  }, [editing]);

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}
