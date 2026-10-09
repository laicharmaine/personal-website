import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import Window from "@/components/Window";
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
      <PageHeader path="C:\Charmaine\say_hi.exe" title="Say hi" intro="Hiring for summer 2027? Email is fastest." />
      <div className="grid gap-10 md:grid-cols-12 md:items-start">
        <Window title="new_message.eml" tone="lime" className="win-open md:col-span-7" bodyClassName="px-5 py-8 sm:px-8 sm:py-10">
          <p className="label">Email</p>
          <a href={`mailto:${site.email}`} className="ulink mt-2 inline-block text-xl font-semibold sm:text-[1.65rem]">
            {site.email.split("@")[0]}@<wbr />
            {site.email.split("@")[1]}
          </a>
          <a href={`mailto:${site.email}`} className="btn btn-lime mt-8">
            Write me <span aria-hidden className="arrow">→</span>
          </a>
        </Window>
        <ul className="divide-y divide-line border-y border-ink md:col-span-5">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                target="_blank"
                rel="noopener noreferrer"
                className="file-row flex items-center justify-between px-2 py-4 text-lg font-semibold"
              >
                {l.label}
                <span aria-hidden>↗</span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
