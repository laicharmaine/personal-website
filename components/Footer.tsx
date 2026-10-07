"use client";

import { usePathname } from "next/navigation";
import { site } from "@/lib/content";

const linkCls =
  "text-sm font-medium text-paper underline decoration-paper/40 underline-offset-4 transition-colors hover:text-lime hover:decoration-lime";

export default function Footer() {
  const pathname = usePathname();
  if (pathname === "/login" || pathname.startsWith("/login/")) return null;

  return (
    <footer className="mt-auto border-t-2 border-ink bg-ink text-paper">
      <div className="mx-auto flex max-w-5xl flex-col gap-5 px-5 py-8 sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <div>
          <p className="font-semibold">{site.name}</p>
          <p className="text-sm text-paper/80">{site.tagline}</p>
        </div>
        <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
          <a href={`mailto:${site.email}`} className={linkCls}>
            Email
          </a>
          <a href={site.linkedin} target="_blank" rel="noopener noreferrer" className={linkCls}>
            LinkedIn
          </a>
          <a href={site.github} target="_blank" rel="noopener noreferrer" className={linkCls}>
            GitHub
          </a>
          <form action="/api/logout" method="POST" className="inline">
            <button type="submit" className={`${linkCls} text-paper/80`}>
              Log out
            </button>
          </form>
        </div>
      </div>
      <p className="mx-auto max-w-5xl border-t border-paper/15 px-5 py-3 font-mono text-xs text-paper/75 sm:px-6">
        © {new Date().getFullYear()} {site.name} · Built with Next.js · Best viewed at any resolution
      </p>
    </footer>
  );
}
