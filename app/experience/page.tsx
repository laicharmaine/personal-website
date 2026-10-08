import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import { education, experience, resumeExtras } from "@/lib/content";

export const metadata: Metadata = {
  title: "Experience",
  description:
    "Charmaine Lai’s résumé: Northwestern MBAi (Kellogg + McCormick), UC Berkeley, YES International, and three roles at Numenta.",
};

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="grid gap-4 border-t border-ink py-10 md:grid-cols-[12rem_1fr] md:gap-10">
      <h2 className="label pt-1">{title}</h2>
      <div>{children}</div>
    </section>
  );
}

export default function ExperiencePage() {
  return (
    <div className="mx-auto max-w-6xl px-5 pb-24 sm:px-8">
      <PageHeader eyebrow="Résumé" title="Experience" intro="AI marketing, then product. Now an MBA + MS in AI." />

      <Section title="Work">
        <ol className="space-y-10">
          {experience.map((job) => (
            <li key={job.company}>
              <div className="flex flex-wrap items-baseline justify-between gap-x-6">
                <h3 className="display-wide text-3xl">{job.company}</h3>
                <p className="font-mono text-sm text-muted">
                  {job.location} · {job.period}
                </p>
              </div>
              <ul className="mt-4 space-y-5">
                {job.roles.map((r) => (
                  <li key={r.title} className="grid gap-1 sm:grid-cols-[13rem_1fr] sm:gap-6">
                    <div>
                      <p className="font-semibold">{r.title}</p>
                      {job.roles.length > 1 && <p className="font-mono text-xs text-muted">{r.period}</p>}
                    </div>
                    <ul className="max-w-xl space-y-1.5 text-muted">
                      {r.bullets.map((b) => (
                        <li key={b} className="relative pl-4 before:absolute before:left-0 before:top-[0.7em] before:h-1 before:w-1 before:rounded-full before:bg-accent">
                          {b}
                        </li>
                      ))}
                    </ul>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ol>
      </Section>

      <Section title="Education">
        <ul className="space-y-6">
          {education.map((e) => (
            <li key={e.school}>
              <div className="flex flex-wrap items-baseline justify-between gap-x-6">
                <h3 className="display-wide text-2xl">{e.school}</h3>
                <p className="font-mono text-sm text-muted">{e.period}</p>
              </div>
              <p className="mt-1">{e.degree}</p>
              {e.note && <p className="mt-1 text-sm text-muted">{e.note}</p>}
            </li>
          ))}
        </ul>
      </Section>

      <Section title="Also">
        <dl className="space-y-3">
          {resumeExtras.map((x) => (
            <div key={x.label} className="grid gap-0.5 sm:grid-cols-[8rem_1fr] sm:gap-6">
              <dt className="font-mono text-sm text-muted sm:pt-0.5">{x.label}</dt>
              <dd>{x.value}</dd>
            </div>
          ))}
        </dl>
      </Section>
    </div>
  );
}
