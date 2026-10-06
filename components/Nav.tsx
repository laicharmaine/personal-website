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
      <div className="mx-auto flex h-11 max-w-6xl items-center gap-2 px-3 sm:px-6">
        <Link
          href="/"
          className="group flex items-center gap-2 pr-2"
          aria-label={`${site.name} — home`}
        >
          <span
            aria-hidden
            className="holo grid h-7 w-7 place-items-center border-2 border-ink font-pixel text-[0.7rem] leading-none text-ink shadow-[2px_2px_0_var(--ink)] transition-transform group-hover:-rotate-6"
          >
            CL
          </span>
          <span className="font-pixel text-sm tracking-tight">
            {site.name}
          </span>
        </Link>

        <nav className="ml-2 hidden h-full items-stretch md:flex" aria-label="Main">
          {nav.map((item) => {
            const active = isActive(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={`flex items-center px-3 text-sm font-medium transition-colors ${
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

        <p className="ml-auto hidden items-center gap-2 font-mono text-xs text-ink-soft lg:flex">
          <span
            aria-hidden
            className="blink inline-block h-2 w-2 border border-ink bg-lime"
          />
          Open to PM / PMM · Summer ’27
        </p>

        <button
          type="button"
          className="btn btn-secondary ml-auto px-3 py-1 text-xs md:hidden"
          aria-expanded={open}
          aria-controls="mobile-nav"
          onClick={() => setOpen((v) => !v)}
        >
          <span className="font-pixel">Menu</span>
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
                    className={`flex items-center justify-between px-4 py-2.5 text-sm font-medium ${
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
