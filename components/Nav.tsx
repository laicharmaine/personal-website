"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { nav } from "@/lib/content";

export default function Nav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  if (pathname === "/login" || pathname.startsWith("/login/")) return null;

  const isActive = (href: string) => pathname.startsWith(href);

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-desk/85 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 sm:px-8">
        <Link href="/" className="group flex items-center gap-2.5" onClick={() => setOpen(false)}>
          <span
            aria-hidden
            className="holo h-5 w-5 rounded-[4px] border-[1.5px] border-ink transition-transform duration-300 group-hover:rotate-12"
          />
          <span className="pixel text-[1.75rem] leading-none">
            Charmaine<span className="text-peri-deep">.OS</span>
          </span>
          <span className="sr-only"> (Charmaine Lai, home)</span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex" aria-label="Main">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              aria-current={isActive(item.href) ? "page" : undefined}
              className={`rounded-full px-3.5 py-1.5 text-[0.95rem] font-medium transition-colors ${
                isActive(item.href)
                  ? "bg-lime text-ink ring-[1.5px] ring-ink"
                  : "text-ink-soft hover:bg-paper hover:text-ink"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <button
          type="button"
          className="rounded-full border-[1.5px] border-ink bg-paper px-4 py-1.5 text-sm font-semibold md:hidden"
          aria-expanded={open}
          aria-controls="mobile-nav"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? "Close" : "Menu"}
        </button>
      </div>

      {open && (
        <nav id="mobile-nav" aria-label="Mobile" className="border-t border-line px-5 pb-6 pt-2 md:hidden">
          <ul>
            {nav.map((item) => (
              <li key={item.href} className="border-b border-line">
                <Link
                  href={item.href}
                  onClick={() => setOpen(false)}
                  aria-current={isActive(item.href) ? "page" : undefined}
                  className="flex items-center justify-between py-3"
                >
                  <span className={`pixel text-5xl ${isActive(item.href) ? "hl" : ""}`}>{item.label}</span>
                  <span aria-hidden>→</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}
