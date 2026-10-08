import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import { cat, site } from "@/lib/content";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with Charmaine Lai.",
};

const links = [
  { label: "LinkedIn", href: site.linkedin },
  { label: "GitHub", href: site.github },
  { label: "TikTok (the cat)", href: cat.tiktok },
  { label: "Instagram (also the cat)", href: cat.instagram },
];

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-6xl px-5 pb-24 sm:px-8">
      <PageHeader eyebrow="Contact" title="Say hi" intro="Hiring for summer 2027? Email is fastest." />
      <div className="border-t border-ink pt-10">
        <a
          href={`mailto:${site.email}`}
          className="ulink display-wide break-all text-2xl sm:text-5xl"
        >
          {site.email}
        </a>
        <ul className="mt-12 border-t border-line">
          {links.map((l) => (
            <li key={l.href} className="border-b border-line">
              <a
                href={l.href}
                target="_blank"
                rel="noopener noreferrer"
                className="row-hover flex items-center justify-between px-1 py-5 text-lg font-medium sm:px-3"
              >
                {l.label}
                <span aria-hidden className="row-arrow">↗</span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
