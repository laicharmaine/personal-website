import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import Window from "@/components/Window";
import { education, experience, resumeExtras } from "@/lib/content";

export const metadata: Metadata = {
  title: "Experience",
  description:
    "Charmaine Lai’s résumé: Northwestern MBAi (Kellogg + McCormick), UC Berkeley, YES International, and three roles at Numenta.",
};

export default function ExperiencePage() {
  return (
    <div className="mx-auto max-w-6xl px-5 pb-24 sm:px-8">
      <PageHeader path="C:\Charmaine\resume.doc" title="Experience" intro="AI marketing, then product. Now an MBA + MS in AI." />

      <Window title="work_history.doc" className="win-open" bodyClassName="divide-y divide-line">
        {experience.map((job) => (
          <section key={job.company} className="px-5 py-7 sm:px-8">
            <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
              <h2 className="pixel text-[2.75rem]">{job.company}</h2>
              <p className="font-mono text-sm text-ink-soft">
                {job.location} · {job.period}
              </p>
            </div>
            <ul className="mt-4 space-y-5">
              {job.roles.map((r) => (
                <li key={r.title} className="grid gap-1.5 sm:grid-cols-[14rem_1fr] sm:gap-8">
                  <div>
                    <p className="font-semibold">{r.title}</p>
                    {job.roles.length > 1 && <p className="font-mono text-xs text-ink-soft">{r.period}</p>}
                  </div>
                  <ul className="pixel-list max-w-2xl space-y-1.5 text-ink-soft">
                    {r.bullets.map((b) => (
                      <li key={b}>{b}</li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </Window>

      <div className="mt-16 grid gap-14 md:grid-cols-2 md:gap-12">
        <section aria-labelledby="edu-title">
          <h2 id="edu-title" className="pixel text-5xl">Education</h2>
          <ul className="mt-5 space-y-6">
            {education.map((e) => (
              <li key={e.school} className="border-t border-ink pt-4">
                <div className="flex flex-wrap items-baseline justify-between gap-x-4">
                  <h3 className="text-xl font-semibold">{e.school}</h3>
                  <p className="font-mono text-sm text-ink-soft">{e.period}</p>
                </div>
                <p className="mt-1">{e.degree}</p>
                {e.note && <p className="mt-1 text-sm text-ink-soft">{e.note}</p>}
              </li>
            ))}
          </ul>
        </section>

        <section aria-labelledby="also-title">
          <h2 id="also-title" className="pixel text-5xl">Also</h2>
          <dl className="mt-5 space-y-3 border-t border-ink pt-4">
            {resumeExtras.map((x) => (
              <div key={x.label} className="grid gap-0.5 sm:grid-cols-[7.5rem_1fr] sm:gap-4">
                <dt className="label sm:pt-0.5">{x.label}</dt>
                <dd>{x.value}</dd>
              </div>
            ))}
          </dl>
        </section>
      </div>
    </div>
  );
}
