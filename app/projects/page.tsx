import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import { projects, sideProjects } from "@/lib/content";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Selected work by Charmaine Lai: launching NuPIC, Numenta’s website revamp, A Thousand Brains, Brains@Bay, and railroad product strategy, plus side projects.",
};

const steps = [
  { key: "problem", label: "Problem" },
  { key: "did", label: "What I did" },
  { key: "result", label: "Result" },
] as const;

export default function ProjectsPage() {
  return (
    <div className="mx-auto max-w-6xl px-5 sm:px-8">
      <PageHeader eyebrow="Projects" title="Selected work" intro="Five launches and bets. Tap one for the story." />

      <ol className="border-t border-ink">
        {projects.map((p, i) => (
          <li key={p.slug} id={p.slug} className="scroll-mt-24 border-b border-line">
            <details className="group">
              <summary className="row-hover grid grid-cols-[1fr_auto] items-center gap-x-6 gap-y-2 px-1 py-7 sm:grid-cols-[11rem_1fr_auto] sm:gap-x-10 sm:px-3">
                <span className="col-span-2 flex items-baseline gap-3 sm:col-span-1 sm:block">
                  <span className="display block text-6xl text-accent sm:text-7xl">{p.metric.value}</span>
                  <span className="font-mono text-xs text-muted sm:mt-2 sm:block">{p.metric.label}</span>
                </span>
                <span>
                  <span className="font-mono text-xs text-muted">
                    0{i + 1} · {p.org} · {p.year}
                  </span>
                  <span className="display-wide mt-1 block text-2xl sm:text-4xl">{p.title}</span>
                  <span className="mt-1 block text-muted">{p.line}</span>
                </span>
                <span
                  aria-hidden
                  className="plus grid h-10 w-10 place-items-center rounded-full text-2xl font-light ring-1 ring-ink/30 group-open:bg-ink group-open:text-bone"
                >
                  +
                </span>
              </summary>
              <dl className="details-body grid gap-3 px-1 pb-8 sm:ml-[13.5rem] sm:px-3">
                {steps.map((s) => (
                  <div key={s.key} className="grid gap-1 sm:grid-cols-[7rem_1fr] sm:gap-6">
                    <dt className="label pt-0.5">{s.label}</dt>
                    <dd className="max-w-xl">{p[s.key]}</dd>
                  </div>
                ))}
              </dl>
            </details>
          </li>
        ))}
      </ol>

      <section className="py-20 sm:py-28" aria-labelledby="side-title">
        <h2 id="side-title" className="label">Built for fun</h2>
        <ul className="mt-6 grid gap-10 border-t border-ink pt-8 md:grid-cols-3 md:gap-12">
          {sideProjects.map((sp) => (
            <li key={sp.title}>
              <h3 className="display-wide text-2xl">{sp.title}</h3>
              <p className="mt-2 text-muted">{sp.line}</p>
              <p className="mt-3 flex flex-wrap gap-x-5 font-mono text-sm">
                {sp.links?.map((l) => (
                  <a key={l.href} href={l.href} target="_blank" rel="noopener noreferrer" className="ulink">
                    {l.label} ↗
                  </a>
                ))}
                {sp.note && <span className="text-muted">{sp.note}</span>}
              </p>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
