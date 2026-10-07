"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { nav, site } from "@/lib/content";

export default function Nav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  // The password screen is its own little "log on" desktop.
  if (pathname === "/login" || pathname.startsWith("/login/")) return null;

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header className="sticky top-0 z-50 border-b-2 border-ink bg-paper">
      <div className="mx-auto flex h-14 max-w-5xl items-center gap-2 px-4 sm:px-6">
        <Link
          href="/"
          className="group flex items-center gap-2 pr-2"
          aria-label={`${site.name} — home`}
        >
          <span
            aria-hidden
            className="holo grid h-8 w-8 place-items-center border-2 border-ink font-mono text-xs font-semibold leading-none text-ink shadow-[2px_2px_0_var(--ink)] transition-transform group-hover:-rotate-6"
          >
            CL
          </span>
          <span className="text-base font-semibold tracking-tight">
            {site.name}
          </span>
        </Link>

        <nav className="ml-auto hidden h-full items-stretch md:flex" aria-label="Main">
          {nav.map((item) => {
            const active = isActive(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={`flex items-center px-4 text-[0.95rem] font-medium transition-colors ${
                  active
                    ? "bg-ink text-lime"
                    : "text-ink hover:bg-peri-light"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>


        <button
          type="button"
          className="btn btn-secondary ml-auto px-3 py-1.5 text-sm md:hidden"
          aria-expanded={open}
          aria-controls="mobile-nav"
          onClick={() => setOpen((v) => !v)}
        >
          <span>Menu</span>
          <span aria-hidden>{open ? "▴" : "▾"}</span>
        </button>
      </div>

      {open && (
        <nav
          id="mobile-nav"
          className="absolute right-3 top-full mt-1 w-56 border-2 border-ink bg-paper shadow-[4px_4px_0_var(--ink)] md:hidden"
          aria-label="Mobile"
        >
          <ul className="py-1">
            {nav.map((item) => {
              const active = isActive(item.href);
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={() => setOpen(false)}
                    aria-current={active ? "page" : undefined}
                    className={`flex items-center justify-between px-4 py-3 text-base font-medium ${
                      active ? "bg-ink text-lime" : "text-ink hover:bg-peri-light"
                    }`}
                  >
                    {item.label}
                    {active && <span aria-hidden>✓</span>}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      )}
    </header>
  );
}
