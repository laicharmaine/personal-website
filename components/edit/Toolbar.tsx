"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import type { SiteContent } from "@/lib/content";
import { EDITOR_HEADERS, useEdit } from "./EditProvider";

type Version = {
  pathname: string;
  uploadedAt: string;
  size: number;
  note: string;
};

const btn =
  "inline-flex items-center gap-1.5 rounded-full border-[1.5px] border-ink px-3.5 py-1.5 text-sm font-semibold transition-transform hover:-translate-y-px disabled:opacity-50";

/** Floating Charmaine.OS editor toolbar. Only shown to a logged-in editor. */
export default function Toolbar() {
  const { admin, editing, dirty, status, startEditing, cancel, save } =
    useEdit();
  const [historyOpen, setHistoryOpen] = useState(false);
  const pathname = usePathname();
  if (!admin || pathname.startsWith("/login") || pathname.startsWith("/admin"))
    return null;

  const statusText =
    status.kind === "saving"
      ? "Publishing…"
      : status.kind === "error"
        ? status.message
        : editing
          ? dirty
            ? "Unsaved changes"
            : "Editing · no changes yet"
          : status.kind === "saved"
            ? `Published ✓ ${status.message ?? ""}`
            : "Viewing the live site";

  return (
    <>
      <div
        data-editor-ui=""
        role="toolbar"
        aria-label="Site editor"
        className="editor-bar fixed bottom-4 left-1/2 z-[70] w-[min(42rem,calc(100vw-1.5rem))] -translate-x-1/2"
      >
        <div className="win win-ink">
          <div className="win-titlebar" aria-hidden>
            <span className="win-box win-box-close" />
            <span className="win-title">editor.exe</span>
            <span className="win-box" />
          </div>
          <div className="flex flex-wrap items-center gap-x-3 gap-y-2 px-3 py-2.5">
            <p
              className="mr-auto flex items-center gap-2 text-sm font-medium"
              aria-live="polite"
            >
              <span
                aria-hidden
                className={`h-2.5 w-2.5 rounded-full border-[1.5px] border-ink ${
                  status.kind === "error"
                    ? "bg-[#ff5a4f]"
                    : dirty || status.kind === "saving"
                      ? "bg-[#ffcf3c]"
                      : "bg-lime"
                }`}
              />
              <span className={status.kind === "error" ? "text-[#8c1d18]" : ""}>
                {statusText}
              </span>
            </p>
            {editing ? (
              <>
                <button
                  type="button"
                  className={`${btn} bg-paper`}
                  onClick={cancel}
                  disabled={status.kind === "saving"}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className={`${btn} bg-lime shadow-[2px_2px_0_var(--ink)]`}
                  onClick={save}
                  disabled={status.kind === "saving" || !dirty}
                >
                  {status.kind === "saving" ? "Publishing…" : "Save & publish"}
                </button>
              </>
            ) : (
              <>
                <button
                  type="button"
                  className={`${btn} bg-paper`}
                  onClick={() => setHistoryOpen(true)}
                >
                  History
                </button>
                <button
                  type="button"
                  className={`${btn} bg-lime shadow-[2px_2px_0_var(--ink)]`}
                  onClick={startEditing}
                >
                  ✎ Edit site
                </button>
                <form action="/api/admin/logout" method="POST">
                  <button
                    type="submit"
                    className="px-1 text-sm font-medium underline underline-offset-4"
                  >
                    Log out
                  </button>
                </form>
              </>
            )}
          </div>
          {editing && (
            <p className="border-t border-line px-3 py-1.5 text-xs text-ink-soft">
              Click any text to type. Click a photo frame to upload. Use the top
              menu to switch pages; your edits are kept until you publish.
            </p>
          )}
        </div>
      </div>
      {historyOpen && <HistoryPanel onClose={() => setHistoryOpen(false)} />}
    </>
  );
}

function HistoryPanel({ onClose }: { onClose: () => void }) {
  const { replacePublished } = useEdit();
  const [versions, setVersions] = useState<Version[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    let alive = true;
    fetch("/api/admin/versions", { headers: EDITOR_HEADERS })
      .then(async (r) => {
        const d = await r.json();
        if (!r.ok) throw new Error(d.error ?? "Could not load history");
        if (alive) setVersions(d.versions);
      })
      .catch((e) => alive && setError(e.message));
    return () => {
      alive = false;
    };
  }, []);

  async function restore(
    body: { pathname?: string; original?: boolean },
    question: string,
  ) {
    if (!window.confirm(question)) return;
    setBusy(true);
    try {
      const r = await fetch("/api/admin/restore", {
        method: "POST",
        headers: { "content-type": "application/json", ...EDITOR_HEADERS },
        body: JSON.stringify(body),
      });
      const d = await r.json();
      if (!r.ok) throw new Error(d.error ?? "Restore failed");
      replacePublished(d.content as SiteContent);
      onClose();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Restore failed");
    } finally {
      setBusy(false);
    }
  }

  const fmt = (iso: string) =>
    new Date(iso).toLocaleString([], {
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit",
    });
  const noteLabel: Record<string, string> = {
    edit: "Saved edit",
    restore: "Restored an older version",
    reset: "Reset to original",
  };

  return (
    <div
      data-editor-ui=""
      className="fixed inset-0 z-[80] grid place-items-center bg-ink/30 p-4"
      onClick={onClose}
    >
      <div
        className="win w-full max-w-lg"
        role="dialog"
        aria-modal="true"
        aria-label="Version history"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="win-titlebar">
          <button
            type="button"
            className="win-box win-box-close"
            aria-label="Close history"
            onClick={onClose}
          />
          <span className="win-title">history.log</span>
          <span className="win-box" aria-hidden />
        </div>
        <div className="px-5 py-5">
          <h2 className="pixel text-4xl">Version history</h2>
          <p className="mt-1 text-sm text-ink-soft">
            Every publish is saved. Restoring publishes a copy of that version;
            nothing is deleted.
          </p>
          {error && (
            <p className="mt-3 rounded-md border border-[#b3261e] bg-[#fff1f0] px-3 py-2 text-sm text-[#8c1d18]">
              {error}
            </p>
          )}
          {!versions && !error && <p className="mt-4 text-sm">Loading…</p>}
          {versions && versions.length === 0 && (
            <p className="mt-4 text-sm">
              No saved versions yet. The site is showing the original content.
            </p>
          )}
          {versions && versions.length > 0 && (
            <ul className="mt-4 max-h-72 divide-y divide-line overflow-auto rounded-md border border-line">
              {versions.map((v, i) => (
                <li
                  key={v.pathname}
                  className="flex items-center justify-between gap-3 px-3 py-2 text-sm"
                >
                  <span>
                    <span className="font-semibold">{fmt(v.uploadedAt)}</span>
                    <span className="ml-2 text-ink-soft">
                      {noteLabel[v.note] ?? "Saved"}
                    </span>
                  </span>
                  {i === 0 ? (
                    <span className="rounded-full bg-lime px-2 py-0.5 font-mono text-xs">
                      live now
                    </span>
                  ) : (
                    <button
                      type="button"
                      disabled={busy}
                      className="rounded-full border-[1.5px] border-ink bg-paper px-2.5 py-0.5 text-xs font-semibold hover:bg-lime"
                      onClick={() =>
                        restore(
                          { pathname: v.pathname },
                          `Restore the version from ${fmt(v.uploadedAt)}? It goes live right away.`,
                        )
                      }
                    >
                      Restore
                    </button>
                  )}
                </li>
              ))}
            </ul>
          )}
          <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
            <button
              type="button"
              disabled={busy}
              className="text-sm font-medium text-[#8c1d18] underline underline-offset-4"
              onClick={() =>
                restore(
                  { original: true },
                  "Reset the whole site to the original text and photos? (Your current version stays in history.)",
                )
              }
            >
              Reset to original site
            </button>
            <button
              type="button"
              className={`${btn} bg-paper`}
              onClick={onClose}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
