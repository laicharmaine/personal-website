import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import Window from "@/components/Window";
import { projects, sideProjects } from "@/lib/content";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Case studies from Numenta and YES International (launching NuPIC, a website revamp, A Thousand Brains, Brains@Bay) plus side projects like Tabby and @litto_lychee.",
};

const steps = [
  { key: "problem", label: "Problem" },
  { key: "did", label: "What I did" },
  { key: "result", label: "Result" },
] as const;

const linkCls =
  "font-semibold text-peri-deep underline decoration-2 underline-offset-4 hover:bg-peri-light";

export default function ProjectsPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 sm:py-16">
      <PageHeader
        eyebrow="Case studies"
        title="Projects"
        description="Five pieces of work, each told as problem → what I did → result. Then a few things I built for fun."
      />

      <ol className="space-y-8">
        {projects.map((project, i) => (
          <li key={project.slug} id={project.slug} className="scroll-mt-24">
            <Window
              as="article"
              title={`case_study_0${i + 1}.doc`}
              bodyClassName="grid gap-6 p-6 sm:p-8 md:grid-cols-[11rem_1fr] md:gap-9"
            >
              <div className="flex flex-col gap-3">
                {project.metric && (
                  <div className="border-2 border-ink bg-lime px-4 py-3">
                    <p className="text-4xl font-bold leading-none tracking-tight">
                      {project.metric.value}
                    </p>
                    <p className="mt-1.5 text-sm font-medium leading-snug">
                      {project.metric.label}
                    </p>
                  </div>
                )}
                <p className="font-mono text-sm text-ink-soft">
                  {project.org}
                  <br />
                  {project.period}
                </p>
              </div>
              <div className="min-w-0">
                <h2 className="text-2xl font-bold leading-snug">{project.title}</h2>
                <dl className="mt-4 space-y-3">
                  {steps.map((s) => (
                    <div key={s.key} className="grid gap-0.5 sm:grid-cols-[7rem_1fr] sm:gap-4">
                      <dt className="font-mono text-sm font-medium text-peri-deep sm:pt-0.5">
                        {s.label}
                      </dt>
                      <dd className="max-w-[62ch] leading-relaxed text-ink">
                        {project[s.key]}
                      </dd>
                    </div>
                  ))}
                </dl>
                <ul className="mt-5 flex flex-wrap gap-2" aria-label="Tags">
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

      <section className="mt-16" aria-labelledby="side-title">
        <p className="font-mono text-sm font-medium text-peri-deep">Built for fun</p>
        <h2 id="side-title" className="mt-1 text-3xl font-bold tracking-tight">
          Side projects
        </h2>
        <Window title="side_projects/" accent="platinum" className="mt-6" bodyClassName="p-0">
          <ul className="grid divide-y-2 divide-dashed divide-platinum-dark md:grid-cols-3 md:divide-x-2 md:divide-y-0">
            {sideProjects.map((sp) => (
              <li key={sp.title} className="flex flex-col p-6 sm:p-7">
                <p className="font-mono text-sm text-ink-soft">{sp.period}</p>
                <h3 className="mt-1 text-xl font-bold leading-snug">{sp.title}</h3>
                <p className="mt-2 flex-1 leading-relaxed text-ink-soft">{sp.body}</p>
                <ul className="mt-4 flex flex-wrap gap-2" aria-label="Tags">
                  {sp.tags.map((t) => (
                    <li key={t} className="chip">
                      {t}
                    </li>
                  ))}
                </ul>
                {(sp.links || sp.note) && (
                  <p className="mt-4 flex flex-wrap gap-x-4 gap-y-1">
                    {sp.links?.map((l) => (
                      <a
                        key={l.href}
                        href={l.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={linkCls}
                      >
                        {l.label} <span aria-hidden>↗</span>
                      </a>
                    ))}
                    {sp.note && <span className="text-sm text-ink-soft">{sp.note}</span>}
                  </p>
                )}
              </li>
            ))}
          </ul>
        </Window>
      </section>
    </div>
  );
}
