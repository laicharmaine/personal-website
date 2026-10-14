"use client";

import { useLayoutEffect, useRef, useState, type ReactNode } from "react";
import { getIn, type Path } from "@/lib/path";
import { EDITOR_HEADERS, useEdit } from "./EditProvider";

/* ------------------------------------------------------------------ */
/* Text                                                                 */
/* ------------------------------------------------------------------ */

type TProps = {
  path: Path;
  multiline?: boolean;
  className?: string;
  placeholder?: string;
};

/**
 * Editable text. Outside edit mode it renders the plain string (no extra
 * markup, so the design is unchanged). In edit mode it becomes a
 * click-to-type field.
 */
export function T({
  path,
  multiline = false,
  className,
  placeholder = "Type here",
}: TProps) {
  const { content, editing, setAt } = useEdit();
  const value = String(getIn(content, path) ?? "");
  if (!editing) return <>{value}</>;
  return (
    <EditableText
      value={value}
      multiline={multiline}
      className={className}
      placeholder={placeholder}
      onChange={(v) => setAt(path, v)}
    />
  );
}

function EditableText({
  value,
  onChange,
  multiline,
  className,
  placeholder,
}: {
  value: string;
  onChange: (v: string) => void;
  multiline: boolean;
  className?: string;
  placeholder: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const lastEmitted = useRef<string | null>(null);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (value === lastEmitted.current) return; // our own typing: leave the caret alone
    if (el.innerText !== value) el.textContent = value;
  }, [value]);

  return (
    <span
      ref={ref}
      role="textbox"
      aria-multiline={multiline || undefined}
      aria-label={placeholder}
      contentEditable="plaintext-only"
      suppressContentEditableWarning
      spellCheck
      data-editable=""
      data-placeholder={placeholder}
      className={`editable ${multiline ? "whitespace-pre-line" : ""} ${className ?? ""}`}
      onInput={(e) => {
        const raw = e.currentTarget.innerText.replace(/\u00a0/g, " ");
        const v = multiline ? raw.replace(/\n$/, "") : raw.replace(/\n/g, " ");
        lastEmitted.current = v;
        onChange(v);
      }}
      onKeyDown={(e) => {
        if (e.key === "Enter" && !multiline) {
          e.preventDefault();
          e.currentTarget.blur();
        }
      }}
      onBlur={() => {
        lastEmitted.current = null;
      }}
    />
  );
}

/* ------------------------------------------------------------------ */
/* Small editor-only controls                                           */
/* ------------------------------------------------------------------ */

/** Renders children only in edit mode. */
export function EditOnly({ children }: { children: ReactNode }) {
  const { editing } = useEdit();
  return editing ? <>{children}</> : null;
}

const chip =
  "inline-flex items-center gap-1 rounded-full border-[1.5px] border-ink bg-paper px-2 py-0.5 font-mono text-[0.72rem] font-medium leading-5 text-ink shadow-[2px_2px_0_var(--peri)] hover:bg-lime";

/** "Link" chip: edit the address a link points to. */
export function Href({
  path,
  label = "Edit link",
}: {
  path: Path;
  label?: string;
}) {
  const { content, editing, setAt } = useEdit();
  if (!editing) return null;
  const current = String(getIn(content, path) ?? "");
  return (
    <button
      type="button"
      data-editor-ui=""
      className={`${chip} ml-1.5 align-middle`}
      title={current || "No link yet"}
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        const next = window.prompt(
          "Paste the link (starts with https://, mailto: or /). Leave empty for no link.",
          current,
        );
        if (next === null) return;
        const v = next.trim();
        if (v && !/^(https?:\/\/|mailto:|\/)/i.test(v)) {
          window.alert("Links need to start with https://, mailto: or /");
          return;
        }
        setAt(path, v);
      }}
    >
      🔗 {label}
    </button>
  );
}

/** ↑ ↓ ✕ controls for one item in a list. Parent must be `relative`. */
export function ItemTools({
  path,
  index,
  length,
  noun = "item",
  confirmRemove = false,
  className = "-top-3 right-2",
}: {
  path: Path;
  index: number;
  length: number;
  noun?: string;
  confirmRemove?: boolean;
  className?: string;
}) {
  const { editing, move, remove } = useEdit();
  if (!editing) return null;
  const stop = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };
  return (
    <span data-editor-ui="" className={`absolute z-20 flex gap-1 ${className}`}>
      {index > 0 && (
        <button
          type="button"
          className={chip}
          title={`Move ${noun} up`}
          onClick={(e) => (stop(e), move(path, index, -1))}
        >
          ↑
        </button>
      )}
      {index < length - 1 && (
        <button
          type="button"
          className={chip}
          title={`Move ${noun} down`}
          onClick={(e) => (stop(e), move(path, index, 1))}
        >
          ↓
        </button>
      )}
      <button
        type="button"
        className={`${chip} hover:!bg-pink`}
        title={`Remove ${noun}`}
        onClick={(e) => {
          stop(e);
          if (confirmRemove && !window.confirm(`Remove this ${noun}?`)) return;
          remove(path, index);
        }}
      >
        ✕ <span className="sr-only">Remove {noun}</span>
      </button>
    </span>
  );
}

/** "+ Add …" button at the end of a list. */
export function AddButton({
  path,
  make,
  label,
  className = "",
}: {
  path: Path;
  make: () => unknown;
  label: string;
  className?: string;
}) {
  const { editing, insert } = useEdit();
  if (!editing) return null;
  return (
    <button
      type="button"
      data-editor-ui=""
      className={`inline-flex items-center gap-1.5 rounded-full border-[1.5px] border-dashed border-ink bg-paper/70 px-3 py-1 font-mono text-xs font-medium hover:bg-lime ${className}`}
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        insert(path, make());
      }}
    >
      + {label}
    </button>
  );
}

/* ------------------------------------------------------------------ */
/* Images                                                               */
/* ------------------------------------------------------------------ */

const ACCEPT = ["image/jpeg", "image/png", "image/webp", "image/gif"];
const MAX_UPLOAD = 4 * 1024 * 1024;

/** Resize to max 1800px and re-encode as WebP (GIFs are kept as-is to keep animation). */
async function prepareImage(file: File): Promise<Blob> {
  if (!ACCEPT.includes(file.type))
    throw new Error("Please choose a JPG, PNG, WebP or GIF image.");
  if (file.size > 30 * 1024 * 1024)
    throw new Error("That image is over 30 MB. Try a smaller one.");
  if (file.type === "image/gif") {
    if (file.size > MAX_UPLOAD) throw new Error("GIFs need to be under 4 MB.");
    return file;
  }
  const bitmap = await createImageBitmap(file, {
    imageOrientation: "from-image",
  });
  const scale = Math.min(1, 1800 / Math.max(bitmap.width, bitmap.height));
  const canvas = document.createElement("canvas");
  canvas.width = Math.round(bitmap.width * scale);
  canvas.height = Math.round(bitmap.height * scale);
  canvas.getContext("2d")!.drawImage(bitmap, 0, 0, canvas.width, canvas.height);
  bitmap.close();
  for (const quality of [0.85, 0.72, 0.6]) {
    const blob = await new Promise<Blob | null>((r) =>
      canvas.toBlob(r, "image/webp", quality),
    );
    if (blob && blob.size <= MAX_UPLOAD) return blob;
  }
  throw new Error("Couldn’t shrink that image enough. Try a smaller one.");
}

async function uploadImage(file: File): Promise<string> {
  const blob = await prepareImage(file);
  const res = await fetch("/api/admin/upload", {
    method: "POST",
    headers: { "content-type": blob.type || file.type, ...EDITOR_HEADERS },
    body: blob,
  });
  const data = await res.json().catch(() => ({}));
  if (res.status === 401)
    throw new Error("Your editor login expired. Log in again at /admin.");
  if (!res.ok || !data.url) throw new Error(data.error ?? "Upload failed.");
  return data.url as string;
}

/**
 * Overlay controls for a photo frame: upload/replace, remove, alt text and
 * an optional video/post link. `path` points at the media object.
 */
export function MediaTools({ path }: { path: Path }) {
  const { content, editing, setAt } = useEdit();
  const [busy, setBusy] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  if (!editing) return null;
  const media = (getIn(content, path) ?? {}) as {
    src?: string;
    alt?: string;
    href?: string;
    caption?: string;
  };
  const hasImage = Boolean(media.src);

  const stop = (e: React.SyntheticEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  return (
    <span
      data-editor-ui=""
      className="media-tools absolute inset-x-1 bottom-1 z-20 flex flex-wrap justify-center gap-1"
    >
      <input
        ref={inputRef}
        type="file"
        accept={ACCEPT.join(",")}
        className="hidden"
        onChange={async (e) => {
          const file = e.target.files?.[0];
          e.target.value = "";
          if (!file) return;
          setBusy(true);
          try {
            const url = await uploadImage(file);
            setAt(path, { ...media, src: url, alt: media.alt ?? "" });
          } catch (err) {
            window.alert(err instanceof Error ? err.message : "Upload failed.");
          } finally {
            setBusy(false);
          }
        }}
      />
      <button
        type="button"
        className={chip}
        disabled={busy}
        onClick={(e) => (stop(e), inputRef.current?.click())}
      >
        {busy ? "Uploading…" : hasImage ? "↺ Replace photo" : "⬆ Upload photo"}
      </button>
      {hasImage && (
        <button
          type="button"
          className={chip}
          onClick={(e) => {
            stop(e);
            const alt = window.prompt(
              "Describe the photo for screen readers (alt text):",
              media.alt ?? "",
            );
            if (alt !== null) setAt(path, { ...media, alt: alt.trim() });
          }}
        >
          Alt text
        </button>
      )}
      {hasImage && (
        <button
          type="button"
          className={`${chip} hover:!bg-pink`}
          onClick={(e) => {
            stop(e);
            if (
              !window.confirm(
                "Remove this photo? The frame goes back to a placeholder.",
              )
            )
              return;
            const next = { ...media };
            delete next.src;
            delete next.alt;
            if (!next.caption) next.caption = "Coming soon";
            setAt(path, next);
          }}
        >
          ✕ Remove photo
        </button>
      )}
      <button
        type="button"
        className={chip}
        title={media.href || "No link"}
        onClick={(e) => {
          stop(e);
          const v = window.prompt(
            "Video or post link (YouTube, Instagram, TikTok…). Leave empty for none.",
            media.href ?? "",
          );
          if (v === null) return;
          const t = v.trim();
          if (t && !/^https?:\/\//i.test(t)) {
            window.alert("Links need to start with https://");
            return;
          }
          const next = { ...media };
          if (t) next.href = t;
          else delete next.href;
          setAt(path, next);
        }}
      >
        🔗 {media.href ? "Edit link" : "Add link"}
      </button>
    </span>
  );
}
