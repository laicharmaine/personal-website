"use client";

import { usePathname } from "next/navigation";
import { Href, T } from "@/components/edit/Editable";
import { useContent } from "@/components/edit/EditProvider";

export default function Footer() {
  const pathname = usePathname();
  const c = useContent();
  if (pathname === "/login" || pathname.startsWith("/login/")) return null;

  return (
    <footer className="mt-auto border-t border-line">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-5 py-8 font-mono text-sm text-ink-soft sm:flex-row sm:items-center sm:justify-between sm:px-8">
        <p>
          © {new Date().getFullYear()} {c.site.name} ·{" "}
          <T path={["footer", "tagline"]} />
        </p>
        <div className="flex flex-wrap gap-x-6 gap-y-2">
          <a
            href={`mailto:${c.site.email}`}
            className="hover:text-peri-deep hover:underline"
          >
            Email
          </a>
          <span>
            <a
              href={c.site.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-peri-deep hover:underline"
            >
              LinkedIn
            </a>
            <Href path={["site", "linkedin"]} />
          </span>
          <span>
            <a
              href={c.site.github}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-peri-deep hover:underline"
            >
              GitHub
            </a>
            <Href path={["site", "github"]} />
          </span>
          <form action="/api/logout" method="POST" className="inline">
            <button
              type="submit"
              className="hover:text-peri-deep hover:underline"
            >
              Log out
            </button>
          </form>
        </div>
      </div>
    </footer>
  );
}
