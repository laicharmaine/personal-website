import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import DraftBadge from "@/components/DraftBadge";
import PixelIcon from "@/components/PixelIcon";
import Window from "@/components/Window";
import { projects } from "@/lib/content";

export const metadata: Metadata = {
  title: "Projects",
  description: "Case study stubs and side projects — draft placeholders.",
};

// Cascading windows: each one offset like a stack on an old desktop.
const cascade = ["lg:mr-28", "lg:ml-14 lg:mr-14", "lg:ml-28"];
const accents = ["peri", "lime", "pink"] as const;
const numberBg = ["bg-peri-light", "bg-lime", "bg-[#ffd6ea]"];

export default function ProjectsPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 sm:py-16">
      <PageHeader
        eyebrow="Case studies"
        path="/projects"
        title="Projects"
        description="Card-style stubs for 2–3 stories. Replace titles, one-liners, and tags with real work — or link out to write-ups later."
        showDraft
      />

      <div className="space-y-8">
        {projects.map((project, i) => (
          <Window
            key={project.slug}
            as="article"
            title={`${project.slug.replace(/-/g, "_")}.doc`}
            accent={accents[i % 3]}
            className={`${cascade[i % 3]} transition-transform hover:-translate-y-1`}
            bodyClassName="grid gap-5 p-5 sm:grid-cols-[7rem_1fr] sm:gap-7 sm:p-7"
          >
            <div
              className={`flex items-center justify-between gap-3 border-2 border-ink px-3 py-2 sm:flex-col sm:items-start sm:justify-start ${numberBg[i % 3]}`}
            >
              <span className="font-display text-5xl font-bold leading-none sm:text-6xl">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="font-mono text-[0.7rem] uppercase">Case study stub</span>
            </div>
            <div className="min-w-0">
              {project.status === "draft" && <DraftBadge className="mb-3" />}
              <h2 className="text-xl font-semibold leading-snug sm:text-2xl">
                {project.title}
              </h2>
              <p className="mt-2 max-w-prose leading-relaxed text-ink-soft">
                {project.oneLiner}
              </p>
              <ul className="mt-4 flex flex-wrap gap-2" aria-label="Tags">
                {project.tags.map((tag) => (
                  <li key={tag} className="chip">
                    {tag}
                  </li>
                ))}
              </ul>
            </div>
          </Window>
        ))}
      </div>

      <Window
        title="Tip of the Day"
        accent="platinum"
        className="mt-12 max-w-xl"
        bodyClassName="flex gap-4 p-5"
      >
        <PixelIcon name="bulb" size={40} className="flex-none" />
        <p className="text-sm leading-relaxed text-ink-soft">
          <span className="font-semibold text-ink">Did you know…</span> when
          you&apos;re ready, turn each card into a dedicated{" "}
          <code className="bevel-in px-1.5 py-0.5 font-mono text-xs text-ink">
            /projects/[slug]
          </code>{" "}
          page with problem → insight → action → result.
        </p>
      </Window>
    </div>
  );
}
