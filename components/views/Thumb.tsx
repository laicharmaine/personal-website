"use client";

import Image from "next/image";
import { MediaTools } from "@/components/edit/Editable";
import { useEdit } from "@/components/edit/EditProvider";
import type { FunMedia } from "@/lib/content";
import type { Path } from "@/lib/path";

/** One small, consistent thumbnail in a thin Y2K window frame. Lazy-loaded; links out when `href` is set. */
export default function Thumb({
  m,
  path,
  title,
  big,
  bare,
}: {
  m?: FunMedia;
  path: Path;
  title?: string;
  /** feature size: sharper image, 16:10, roomier title bar */
  big?: boolean;
  /** no title bar or shadow (when already inside a window) */
  bare?: boolean;
}) {
  const { editing } = useEdit();
  if (!m?.src && !editing) return null;
  const remote = Boolean(m?.src && /^https?:/.test(m.src));
  const img = m?.src ? (
    <span
      className={`relative block overflow-hidden bg-desk ${big ? "aspect-[16/10]" : "aspect-video"}`}
    >
      <Image
        src={m.src}
        alt={m.alt ?? ""}
        fill
        loading="lazy"
        sizes={big ? "(min-width: 768px) 600px, 100vw" : "208px"}
        className="object-cover"
        unoptimized={remote}
      />
      {m.href && (
        <span
          aria-hidden
          className="absolute bottom-1.5 right-1.5 rounded-full border border-ink bg-lime px-1.5 font-mono text-[0.65rem] leading-4 text-ink"
        >
          ↗
        </span>
      )}
    </span>
  ) : (
    <span
      className={`grid ${big ? "aspect-[16/10]" : "aspect-video"} place-items-center border border-dashed border-ink/40 bg-desk/50 font-mono text-xs text-ink-soft`}
    >
      no image
    </span>
  );
  return (
    <span
      className={`thumb-win relative block w-full overflow-hidden rounded-[6px] border bg-paper ${bare ? "border-line" : "border-ink shadow-[3px_3px_0_var(--peri)]"}`}
    >
      {!bare && (
        <span
          aria-hidden
          className={`flex items-center gap-1 border-b border-ink bg-peri/60 ${big ? "h-6 px-2.5" : "h-4 px-1.5"}`}
        >
          <span className="h-1.5 w-1.5 rounded-full border border-ink bg-paper" />
          <span className="h-1.5 w-1.5 rounded-full border border-ink bg-paper" />
          {title && (
            <span
              className={`ml-1 truncate font-mono leading-none text-ink ${big ? "text-[0.7rem]" : "text-[0.6rem]"}`}
            >
              {title}
            </span>
          )}
        </span>
      )}
      {m?.href && !editing ? (
        <a
          href={m.href}
          target="_blank"
          rel="noopener noreferrer"
          className="block"
          aria-label={m.caption || m.alt || "Open link"}
        >
          {img}
        </a>
      ) : (
        img
      )}
      <MediaTools path={path} />
    </span>
  );
}
