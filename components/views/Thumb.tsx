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
}: {
  m?: FunMedia;
  path: Path;
  title?: string;
}) {
  const { editing } = useEdit();
  if (!m?.src && !editing) return null;
  const remote = Boolean(m?.src && /^https?:/.test(m.src));
  const img = m?.src ? (
    <span className="relative block aspect-video overflow-hidden bg-desk">
      <Image
        src={m.src}
        alt={m.alt ?? ""}
        fill
        loading="lazy"
        sizes="208px"
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
    <span className="grid aspect-video place-items-center border border-dashed border-ink/40 bg-desk/50 font-mono text-xs text-ink-soft">
      no image
    </span>
  );
  return (
    <span className="thumb-win relative block w-full max-w-[13rem] overflow-hidden rounded-[6px] border border-ink bg-paper shadow-[3px_3px_0_var(--peri)]">
      <span
        aria-hidden
        className="flex h-4 items-center gap-1 border-b border-ink bg-peri/60 px-1.5"
      >
        <span className="h-1.5 w-1.5 rounded-full border border-ink bg-paper" />
        <span className="h-1.5 w-1.5 rounded-full border border-ink bg-paper" />
        {title && (
          <span className="ml-1 truncate font-mono text-[0.6rem] leading-none text-ink">
            {title}
          </span>
        )}
      </span>
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
