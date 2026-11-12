"use client";

import { useEffect, useRef } from "react";

const SCHEMES = ["cherry", "lilac", "cobalt"] as const;
type Scheme = (typeof SCHEMES)[number];
type Mode = "light" | "dark";

const KEY_S = "y2k-glossy2-scheme";
const KEY_M = "y2k-glossy2-mode";

export default function ThemeSwitcher() {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const html = document.documentElement;
    const root = rootRef.current;
    if (!root) return;

    const current = (): { scheme: Scheme; mode: Mode } => {
      const s = html.getAttribute("data-scheme");
      const m = html.getAttribute("data-mode");
      return {
        scheme: SCHEMES.includes(s as Scheme) ? (s as Scheme) : "cherry",
        mode: m === "dark" ? "dark" : "light",
      };
    };

    const syncUI = () => {
      const { scheme, mode } = current();
      root.querySelectorAll<HTMLButtonElement>(".swatch").forEach((btn) => {
        btn.setAttribute(
          "aria-pressed",
          btn.getAttribute("data-scheme") === scheme ? "true" : "false",
        );
      });
      const toggle = root.querySelector<HTMLButtonElement>(".mode-toggle");
      if (toggle) {
        toggle.setAttribute("aria-pressed", mode === "dark" ? "true" : "false");
        toggle.setAttribute(
          "aria-label",
          mode === "dark" ? "Switch to light mode" : "Switch to dark mode",
        );
      }
    };

    const apply = (scheme: string, mode: string) => {
      const nextScheme = SCHEMES.includes(scheme as Scheme) ? scheme : "cherry";
      const nextMode = mode === "dark" ? "dark" : "light";
      html.setAttribute("data-scheme", nextScheme);
      html.setAttribute("data-mode", nextMode);
      try {
        localStorage.setItem(KEY_S, nextScheme);
        localStorage.setItem(KEY_M, nextMode);
      } catch {
        /* private mode */
      }
      syncUI();
    };

    const onClick = (ev: Event) => {
      const btn = (ev.target as HTMLElement).closest("button");
      if (!btn || !root.contains(btn)) return;
      const { scheme, mode } = current();
      if (btn.classList.contains("swatch")) {
        apply(btn.getAttribute("data-scheme") || scheme, mode);
      } else if (btn.classList.contains("mode-toggle")) {
        apply(scheme, mode === "dark" ? "light" : "dark");
      }
    };

    root.addEventListener("click", onClick);
    syncUI();
    const id = requestAnimationFrame(() => html.classList.add("theme-ready"));
    return () => {
      root.removeEventListener("click", onClick);
      cancelAnimationFrame(id);
    };
  }, []);

  return (
    <div ref={rootRef} className="theme-switcher" role="group" aria-label="Theme">
      <div className="scheme-dots" role="radiogroup" aria-label="Color scheme">
        {SCHEMES.map((s) => (
          <button
            key={s}
            type="button"
            className={`swatch swatch-${s}`}
            data-scheme={s}
            aria-label={`${s[0].toUpperCase()}${s.slice(1)} scheme`}
            aria-pressed={s === "cherry"}
          />
        ))}
      </div>
      <span className="switcher-tick" aria-hidden="true" />
      <button
        type="button"
        className="mode-toggle"
        aria-label="Switch to dark mode"
        aria-pressed="false"
      >
        <svg className="icon-sun" viewBox="0 0 16 16" aria-hidden="true" focusable="false">
          <circle cx="8" cy="8" r="2.6" fill="currentColor" />
          <g stroke="currentColor" strokeWidth="1.25" strokeLinecap="round">
            <path d="M8 1.4v1.7M8 12.9v1.7M1.4 8h1.7M12.9 8h1.7" />
            <path d="M3.2 3.3l1.2 1.2M11.6 11.5l1.2 1.2M3.2 12.7l1.2-1.2M11.6 4.5l1.2-1.2" />
          </g>
        </svg>
        <svg className="icon-moon" viewBox="0 0 16 16" aria-hidden="true" focusable="false">
          <path
            fill="currentColor"
            d="M10.1 2.1a6.1 6.1 0 1 0 3.7 9.3 5.15 5.15 0 1 1-3.7-9.3z"
          />
        </svg>
      </button>
    </div>
  );
}
