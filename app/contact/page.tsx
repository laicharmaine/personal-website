import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import DraftBadge from "@/components/DraftBadge";
import { site } from "@/lib/content";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with Charmaine Lai — email and LinkedIn.",
};

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 sm:py-16">
      <PageHeader
        eyebrow="Hello"
        title="Contact"
        description="Recruiters, classmates, collaborators — the shortest path is email or LinkedIn. No form backend yet; mailto keeps it simple."
        showDraft
      />

      <div className="grid gap-6 sm:grid-cols-2">
        <a
          href={`mailto:${site.email}?subject=Hello%20Charmaine`}
          className="group rounded-2xl border border-stone-200 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:border-coral-300 hover:shadow-md"
        >
          <div className="flex items-center justify-between">
            <span className="text-sm font-semibold uppercase tracking-wide text-coral-600">
              Email
            </span>
            <DraftBadge />
          </div>
          <p className="mt-3 font-display text-xl font-semibold text-ink group-hover:text-coral-700">
            {site.email}
          </p>
          <p className="mt-2 text-sm text-stone-500">
            Placeholder address — replace in{" "}
            <code className="rounded bg-stone-100 px-1 text-xs">
              lib/content.ts
            </code>{" "}
            with your real inbox. Click opens mailto.
          </p>
        </a>

        <a
          href={site.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="group rounded-2xl border border-stone-200 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:border-coral-300 hover:shadow-md"
        >
          <div className="flex items-center justify-between">
            <span className="text-sm font-semibold uppercase tracking-wide text-coral-600">
              LinkedIn
            </span>
            <DraftBadge />
          </div>
          <p className="mt-3 font-display text-xl font-semibold text-ink group-hover:text-coral-700">
            linkedin.com/in/charmainelai
          </p>
          <p className="mt-2 text-sm text-stone-500">
            Confirm this URL matches your profile. Opens in a new tab.
          </p>
        </a>
      </div>

      <div className="mt-10 rounded-2xl border border-dashed border-coral-200 bg-coral-50/50 p-6">
        <h2 className="font-display text-lg font-semibold text-ink">
          Prefer a form later?
        </h2>
        <p className="mt-2 text-sm text-stone-600">
          Easy upgrades: Formspree, Resend + a Route Handler, or a Notion
          database. No backend required for day one.
        </p>
      </div>
    </div>
  );
}
