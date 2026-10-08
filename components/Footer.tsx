"use client";

import { usePathname } from "next/navigation";
import { site } from "@/lib/content";

export default function Footer() {
  const pathname = usePathname();
  if (pathname === "/login" || pathname.startsWith("/login/")) return null;

  return (
    <footer className="mt-auto border-t border-line">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-5 py-8 font-mono text-sm text-muted sm:flex-row sm:items-center sm:justify-between sm:px-8">
        <p>© {new Date().getFullYear()} {site.name}</p>
        <div className="flex flex-wrap gap-x-6 gap-y-2">
          <a href={`mailto:${site.email}`} className="hover:text-accent">Email</a>
          <a href={site.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-accent">LinkedIn</a>
          <a href={site.github} target="_blank" rel="noopener noreferrer" className="hover:text-accent">GitHub</a>
          <form action="/api/logout" method="POST" className="inline">
            <button type="submit" className="hover:text-accent">Log out</button>
          </form>
        </div>
      </div>
    </footer>
  );
}
