import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import Window from "@/components/Window";
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
        description="Selected work — each one framed as problem → insight → action → result."
        showDraft
      />

      <ol className="space-y-8">
        {projects.map((project, i) => (
          <li key={project.slug}>
            <Window
              as="article"
              title={`${project.slug.replace(/-/g, "_")}.doc`}
              bodyClassName="grid gap-5 p-6 sm:grid-cols-[5rem_1fr] sm:gap-8 sm:p-8"
            >
              <span
                aria-hidden
                className="grid h-16 w-16 place-items-center border-2 border-ink bg-lime font-display text-3xl font-bold leading-none sm:h-20 sm:w-20 sm:text-4xl"
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <div className="min-w-0">
                <h2 className="text-2xl font-bold leading-snug">{project.title}</h2>
                <p className="mt-2 max-w-[65ch] text-lg leading-relaxed text-ink-soft">
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
          </li>
        ))}
      </ol>
    </div>
  );
}
