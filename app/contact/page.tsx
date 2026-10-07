import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import PixelIcon from "@/components/PixelIcon";
import Window from "@/components/Window";
import { cat, site } from "@/lib/content";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with Charmaine Lai by email or LinkedIn.",
};

const optionCls =
  "group flex flex-col border-2 border-ink bg-paper p-5 shadow-[4px_4px_0_var(--ink)] transition-[transform,box-shadow,background-color] hover:-translate-x-0.5 hover:-translate-y-0.5 hover:bg-peri-light hover:shadow-[6px_6px_0_var(--ink)] active:translate-x-1 active:translate-y-1 active:shadow-none";

const linkCls =
  "font-semibold text-peri-deep underline decoration-2 underline-offset-4 hover:bg-peri-light";

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 sm:py-16">
      <PageHeader
        eyebrow="Say hi"
        title="Contact"
        description="Hiring for a summer 2027 PM or PMM internship, or just want to talk product, AI, or cats? Email is the fastest way to reach me."
      />

      <Window title="New Message" bodyClassName="p-0">
        <dl className="border-b-2 border-ink bg-platinum">
          <div className="flex items-center gap-3 border-b border-platinum-dark px-5 py-2">
            <dt className="w-20 font-mono font-medium">To:</dt>
            <dd className="bevel-in min-w-0 flex-1 px-2 py-0.5">{site.name}</dd>
          </div>
          <div className="flex items-center gap-3 px-5 py-2">
            <dt className="w-20 font-mono font-medium">Subject:</dt>
            <dd className="bevel-in min-w-0 flex-1 px-2 py-0.5">Summer 2027 internship</dd>
          </div>
        </dl>

        <div className="grid gap-6 p-5 sm:grid-cols-2 sm:p-7">
          <a
            href={`mailto:${site.email}?subject=Summer%202027%20internship`}
            className={optionCls}
          >
            <PixelIcon name="mail" size={44} />
            <span className="mt-4 font-mono text-sm font-medium text-peri-deep">Email</span>
            <span className="mt-1 break-all text-lg font-semibold group-hover:underline group-hover:decoration-2 group-hover:underline-offset-4 sm:text-xl">
              {site.email}
            </span>
            <span className="mt-2 text-ink-soft">Opens your mail app.</span>
          </a>

          <a
            href={site.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className={optionCls}
          >
            <span
              aria-hidden
              className="grid h-11 w-11 place-items-center border-2 border-ink bg-peri font-mono text-lg font-bold text-ink"
            >
              in
            </span>
            <span className="mt-4 font-mono text-sm font-medium text-peri-deep">LinkedIn</span>
            <span className="mt-1 break-all text-lg font-semibold group-hover:underline group-hover:decoration-2 group-hover:underline-offset-4 sm:text-xl">
              {site.linkedinLabel}
            </span>
            <span className="mt-2 text-ink-soft">Opens in a new tab.</span>
          </a>
        </div>
      </Window>

      <p className="mt-10 max-w-[65ch] leading-relaxed text-ink-soft">
        Also around: code on{" "}
        <a href={site.github} target="_blank" rel="noopener noreferrer" className={linkCls}>
          GitHub
        </a>{" "}
        and a very photogenic cat on{" "}
        <a href={cat.tiktok} target="_blank" rel="noopener noreferrer" className={linkCls}>
          TikTok
        </a>{" "}
        and{" "}
        <a href={cat.instagram} target="_blank" rel="noopener noreferrer" className={linkCls}>
          Instagram
        </a>
        .
      </p>
    </div>
  );
}
