import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import Window from "@/components/Window";
import { education, experience, skills, volunteering } from "@/lib/content";

export const metadata: Metadata = {
  title: "Experience",
  description:
    "Charmaine Lai’s résumé: Northwestern MBAi (Kellogg + McCormick), UC Berkeley, product consulting at YES International, and three roles in AI marketing at Numenta.",
};

function SectionTab({ children }: { children: React.ReactNode }) {
  return (
    <div className="mb-2 border-b-2 border-ink">
      <h2 className="-mb-[2px] inline-block border-2 border-b-0 border-ink bg-ink px-4 py-1.5 text-lg font-bold text-lime">
        {children}
      </h2>
    </div>
  );
}

function Bullets({ items }: { items: string[] }) {
  if (items.length === 0) return null;
  return (
    <ul className="pixel-list mt-3 max-w-[68ch] space-y-2 leading-relaxed text-ink">
      {items.map((b) => (
        <li key={b}>{b}</li>
      ))}
    </ul>
  );
}

const row = "grid gap-1.5 py-6 sm:grid-cols-[9.5rem_1fr] sm:gap-8";
const dateCls = "font-mono text-[0.95rem] font-medium text-ink-soft sm:pt-0.5";

export default function ExperiencePage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 sm:py-16">
      <PageHeader
        eyebrow="Résumé"
        title="Experience"
        description="AI marketing at Numenta, product consulting in Hong Kong, and now a joint MBA + MS in AI at Northwestern."
      />

      <Window as="section" title="resume.doc" bodyClassName="px-5 py-6 sm:px-9 sm:py-8">
        <section className="mb-10">
          <SectionTab>Experience</SectionTab>
          <ol className="divide-y-2 divide-dashed divide-platinum-dark">
            {experience.map((job) => (
              <li key={job.company} className={row}>
                <p className={dateCls}>{job.period}</p>
                <div>
                  <h3 className="text-xl font-bold leading-snug">{job.company}</h3>
                  <p className="mt-0.5 font-medium text-ink-soft">{job.location}</p>
                  <div className="mt-2 space-y-5">
                    {job.roles.map((r) => (
                      <div key={r.title}>
                        <p className="flex flex-wrap items-baseline gap-x-3">
                          <span className="text-lg font-semibold text-peri-deep">{r.title}</span>
                          {job.roles.length > 1 && (
                            <span className="font-mono text-sm text-ink-soft">{r.period}</span>
                          )}
                        </p>
                        <Bullets items={r.bullets} />
                      </div>
                    ))}
                  </div>
                </div>
              </li>
            ))}
          </ol>
        </section>

        <section className="mb-10">
          <SectionTab>Education</SectionTab>
          <ol className="divide-y-2 divide-dashed divide-platinum-dark">
            {education.map((item) => (
              <li key={item.school} className={row}>
                <p className={dateCls}>{item.period}</p>
                <div>
                  <h3 className="text-xl font-bold leading-snug">{item.school}</h3>
                  {item.detail && <p className="mt-0.5 font-medium text-ink-soft">{item.detail}</p>}
                  <p className="mt-1 font-semibold text-peri-deep">{item.degree}</p>
                  {item.bullets.length > 0 && (
                    <>
                      <p className="mt-3 text-sm font-semibold uppercase tracking-wide text-ink-soft">
                        Leadership
                      </p>
                      <ul className="pixel-list mt-1.5 grid gap-x-6 gap-y-1.5 leading-relaxed sm:grid-cols-2">
                        {item.bullets.map((b) => (
                          <li key={b}>{b}</li>
                        ))}
                      </ul>
                    </>
                  )}
                </div>
              </li>
            ))}
          </ol>
        </section>

        <section>
          <SectionTab>Volunteering</SectionTab>
          <ul className="divide-y-2 divide-dashed divide-platinum-dark">
            {volunteering.map((v) => (
              <li key={v.org} className="py-4 sm:pl-[11.5rem]">
                <span className="font-bold">{v.org}</span>
                <span className="text-ink-soft"> · {v.role}</span>
              </li>
            ))}
          </ul>
        </section>
      </Window>

      <Window
        as="section"
        title="skills.cfg — Properties"
        accent="platinum"
        className="mt-10"
        bodyClassName="px-5 py-6 sm:px-8"
      >
        <h2 className="mb-5 text-2xl font-bold">Skills</h2>
        <div className="grid gap-5 md:grid-cols-3">
          {(
            [
              ["Product", skills.product],
              ["Marketing", skills.marketing],
              ["Tools", skills.tools],
              ["Languages", skills.languages],
              ["Certifications", skills.certifications],
            ] as const
          ).map(([label, items]) => (
            <fieldset
              key={label}
              className={`groupbox ${label === "Certifications" ? "md:col-span-2" : ""}`}
            >
              <legend>{label}</legend>
              <ul className="space-y-2.5">
                {items.map((s) => (
                  <li key={s} className="flex items-start gap-2.5">
                    <span
                      aria-hidden
                      className="bevel-in mt-1 grid h-4 w-4 flex-none place-items-center text-[0.7rem] font-bold leading-none"
                    >
                      ✓
                    </span>
                    {s}
                  </li>
                ))}
              </ul>
            </fieldset>
          ))}
        </div>
      </Window>
    </div>
  );
}
