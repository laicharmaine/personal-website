import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import DraftBadge from "@/components/DraftBadge";
import { education, experience, skills } from "@/lib/content";

export const metadata: Metadata = {
  title: "Experience",
  description:
    "Education, experience, and skills — draft resume content for Charmaine Lai.",
};

export default function ExperiencePage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 sm:py-16">
      <PageHeader
        eyebrow="Resume"
        title="Experience"
        description="Timeline-style sections with clearly labeled draft bullets. Swap in real employers, dates, and wins."
        showDraft
      />

      <section className="mb-14">
        <h2 className="mb-6 font-display text-2xl font-semibold text-ink">
          Education
        </h2>
        <ol className="relative space-y-8 border-l-2 border-coral-200 pl-6">
          {education.map((item) => (
            <li key={item.school} className="relative">
              <span
                className="absolute -left-[1.9rem] top-1.5 h-3.5 w-3.5 rounded-full border-2 border-white bg-coral-500 shadow"
                aria-hidden
              />
              <div className="rounded-2xl border border-stone-200 bg-white p-5 shadow-sm">
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <h3 className="font-semibold text-ink">{item.school}</h3>
                  <time className="text-sm text-stone-500">{item.period}</time>
                </div>
                <p className="mt-1 text-sm text-coral-700">{item.degree}</p>
                <ul className="mt-3 list-disc space-y-1.5 pl-5 text-sm text-stone-600">
                  {item.bullets.map((b) => (
                    <li key={b}>{b}</li>
                  ))}
                </ul>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section className="mb-14">
        <div className="mb-6 flex flex-wrap items-center gap-3">
          <h2 className="font-display text-2xl font-semibold text-ink">
            Work experience
          </h2>
          <DraftBadge />
        </div>
        <ol className="relative space-y-8 border-l-2 border-coral-200 pl-6">
          {experience.map((item) => (
            <li key={`${item.company}-${item.role}`} className="relative">
              <span
                className="absolute -left-[1.9rem] top-1.5 h-3.5 w-3.5 rounded-full border-2 border-white bg-coral-500 shadow"
                aria-hidden
              />
              <div className="rounded-2xl border border-stone-200 bg-white p-5 shadow-sm">
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <h3 className="font-semibold text-ink">
                    {item.role}{" "}
                    <span className="font-normal text-stone-500">@</span>{" "}
                    {item.company}
                  </h3>
                  <time className="text-sm text-stone-500">{item.period}</time>
                </div>
                <p className="mt-1 text-sm text-stone-500">{item.location}</p>
                <ul className="mt-3 list-disc space-y-1.5 pl-5 text-sm text-stone-600">
                  {item.bullets.map((b) => (
                    <li key={b}>{b}</li>
                  ))}
                </ul>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section>
        <h2 className="mb-6 font-display text-2xl font-semibold text-ink">
          Skills
        </h2>
        <div className="grid gap-4 sm:grid-cols-3">
          {(
            [
              ["Product", skills.product],
              ["Marketing", skills.marketing],
              ["Tools", skills.tools],
            ] as const
          ).map(([label, items]) => (
            <div
              key={label}
              className="rounded-2xl border border-stone-200 bg-white p-5 shadow-sm"
            >
              <h3 className="text-sm font-semibold uppercase tracking-wide text-coral-600">
                {label}
              </h3>
              <ul className="mt-3 space-y-2 text-sm text-stone-700">
                {items.map((s) => (
                  <li key={s} className="flex gap-2">
                    <span className="text-coral-500" aria-hidden>
                      ▹
                    </span>
                    {s}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
