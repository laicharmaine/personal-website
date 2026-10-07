import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import PixelIcon from "@/components/PixelIcon";
import Window from "@/components/Window";
import { site } from "@/lib/content";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with Charmaine Lai — email and LinkedIn.",
};

const optionCls =
  "group flex flex-col border-2 border-ink bg-paper p-5 shadow-[4px_4px_0_var(--ink)] transition-[transform,box-shadow,background-color] hover:-translate-x-0.5 hover:-translate-y-0.5 hover:bg-peri-light hover:shadow-[6px_6px_0_var(--ink)] active:translate-x-1 active:translate-y-1 active:shadow-none";

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 sm:py-16">
      <PageHeader
        eyebrow="Hello"
        title="Contact"
        description="Recruiters, classmates, collaborators — the shortest path is email or LinkedIn. No form backend yet; mailto keeps it simple."
        showDraft
      />

      <Window title="New Message" bodyClassName="p-0">
        <dl className="border-b-2 border-ink bg-platinum">
          <div className="flex items-center gap-3 border-b border-platinum-dark px-5 py-2">
            <dt className="w-20 font-mono font-medium">To:</dt>
            <dd className="bevel-in flex-1 px-2 py-0.5">{site.name}</dd>
          </div>
          <div className="flex items-center gap-3 px-5 py-2">
            <dt className="w-20 font-mono font-medium">Subject:</dt>
            <dd className="bevel-in flex-1 px-2 py-0.5">Hello Charmaine</dd>
          </div>
        </dl>

        <div className="grid gap-6 p-5 sm:grid-cols-2 sm:p-7">
          <a href={`mailto:${site.email}?subject=Hello%20Charmaine`} className={optionCls}>
            <PixelIcon name="mail" size={44} />
            <span className="mt-4 font-mono text-sm font-medium text-peri-deep">Email</span>
            <span className="mt-1 break-all text-xl font-semibold group-hover:underline group-hover:decoration-2 group-hover:underline-offset-4">
              {site.email}
            </span>
            <span className="mt-2 text-ink-soft">
              Placeholder address — replace in{" "}
              <code className="bevel-in px-1 font-mono text-xs text-ink">lib/content.ts</code>{" "}
              with your real inbox. Click opens mailto.
            </span>
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
            <span className="mt-1 break-all text-xl font-semibold group-hover:underline group-hover:decoration-2 group-hover:underline-offset-4">
              linkedin.com/in/charmainelai
            </span>
            <span className="mt-2 text-ink-soft">
              Confirm this URL matches your profile. Opens in a new tab.
            </span>
          </a>
        </div>
      </Window>

      <aside className="mt-10 max-w-[65ch] border-2 border-dashed border-ink/40 px-5 py-4">
        <h2 className="text-lg font-bold">Prefer a form later?</h2>
        <p className="mt-1 leading-relaxed text-ink-soft">
          Easy upgrades: Formspree, Resend + a Route Handler, or a Notion
          database. No backend required for day one.
        </p>
      </aside>
    </div>
  );
}
