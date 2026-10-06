import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import DraftBadge from "@/components/DraftBadge";
import { projects } from "@/lib/content";

export const metadata: Metadata = {
  title: "Projects",
  description: "Case study stubs and side projects — draft placeholders.",
};

export default function ProjectsPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 sm:py-16">
      <PageHeader
        eyebrow="Case studies"
        title="Projects"
        description="Card-style stubs for 2–3 stories. Replace titles, one-liners, and tags with real work — or link out to write-ups later."
        showDraft
      />

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => (
          <article
            key={project.slug}
            className="group flex flex-col rounded-2xl border border-stone-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-coral-200 hover:shadow-md"
          >
            <div className="mb-3 flex items-start justify-between gap-2">
              <span className="rounded-md bg-coral-50 px-2 py-0.5 text-xs font-medium text-coral-700">
                Case study stub
              </span>
              {project.status === "draft" && <DraftBadge />}
            </div>
            <h2 className="font-display text-xl font-semibold text-ink group-hover:text-coral-700">
              {project.title}
            </h2>
            <p className="mt-3 flex-1 text-sm leading-relaxed text-stone-600">
              {project.oneLiner}
            </p>
            <ul className="mt-4 flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <li
                  key={tag}
                  className="rounded-full bg-stone-100 px-2.5 py-0.5 text-xs font-medium text-stone-600"
                >
                  {tag}
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>

      <p className="mt-10 text-sm text-stone-500">
        Tip: when you&apos;re ready, turn each card into a dedicated{" "}
        <code className="rounded bg-stone-100 px-1.5 py-0.5 text-xs">
          /projects/[slug]
        </code>{" "}
        page with problem → insight → action → result.
      </p>
    </div>
  );
}
