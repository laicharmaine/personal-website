"use client";

import { usePathname } from "next/navigation";
import { site } from "@/lib/content";

const linkCls =
  "border-2 border-paper/30 px-2.5 py-1 text-xs font-medium text-paper transition-colors hover:border-lime hover:text-lime";

export default function Footer() {
  const pathname = usePathname();
  if (pathname === "/login" || pathname.startsWith("/login/")) return null;

  return (
    <footer className="mt-auto border-t-2 border-ink bg-ink text-paper">
      <div className="mx-auto flex max-w-6xl flex-col gap-5 px-4 py-6 sm:px-6 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-3">
          <span
            aria-hidden
            className="holo grid h-9 w-9 flex-none place-items-center border-2 border-paper font-pixel text-xs text-ink"
          >
            CL
          </span>
          <div>
            <p className="font-pixel text-sm">{site.name}</p>
            <p className="text-sm text-paper/75">{site.tagline}</p>
          </div>
        </div>

        <p className="flex items-center gap-2 font-mono text-xs text-paper/80">
          <span aria-hidden className="eq flex h-3 items-end gap-[2px]">
            <span />
            <span />
            <span />
            <span />
          </span>
          now playing: customer_interviews.mp3
        </p>

        <div className="flex flex-wrap items-center gap-2">
          <a href={`mailto:${site.email}`} className={linkCls}>
            Email
          </a>
          <a
            href={site.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className={linkCls}
          >
            LinkedIn
          </a>
          <a
            href={site.github}
            target="_blank"
            rel="noopener noreferrer"
            className={linkCls}
          >
            GitHub
          </a>
          <form action="/api/logout" method="POST" className="inline">
            <button type="submit" className={`${linkCls} border-dashed`}>
              Log out
            </button>
          </form>
        </div>
      </div>
      <div className="border-t border-paper/15">
        <p className="mx-auto flex max-w-6xl flex-wrap justify-between gap-2 px-4 py-2.5 font-mono text-[0.7rem] text-paper/65 sm:px-6">
          <span>
            © {new Date().getFullYear()} {site.name}. Built with Next.js.
          </span>
          <span>Best viewed at any resolution.</span>
        </p>
      </div>
    </footer>
  );
}
