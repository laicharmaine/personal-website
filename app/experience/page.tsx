import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import DraftBadge from "@/components/DraftBadge";
import Window from "@/components/Window";
import { education, experience, skills } from "@/lib/content";

export const metadata: Metadata = {
  title: "Experience",
  description:
    "Education, experience, and skills — draft resume content for Charmaine Lai.",
};

function SectionTab({ children, extra }: { children: React.ReactNode; extra?: React.ReactNode }) {
  return (
    <div className="mb-2 flex flex-wrap items-center gap-3 border-b-2 border-ink">
      <h2 className="-mb-[2px] border-2 border-b-0 border-ink bg-ink px-3 py-1 font-pixel text-sm text-lime">
        {children}
      </h2>
      {extra}
    </div>
  );
}

type Entry = {
  key: string;
  period: string;
  title: React.ReactNode;
  meta: string;
  metaClass: string;
  bullets: string[];
};

function EntryList({ entries }: { entries: Entry[] }) {
  return (
    <ol className="divide-y-2 divide-dashed divide-platinum-dark">
      {entries.map((e) => (
        <li key={e.key} className="grid gap-2 py-6 sm:grid-cols-[10rem_1fr] sm:gap-8">
          <time className="font-mono text-sm font-medium text-ink-soft sm:pt-0.5">
            {e.period}
          </time>
          <div>
            <h3 className="text-lg font-semibold leading-snug">{e.title}</h3>
            <p className={`mt-0.5 text-sm font-medium ${e.metaClass}`}>{e.meta}</p>
            <ul className="pixel-list mt-3 space-y-1.5 text-[0.95rem] leading-relaxed text-ink-soft">
              {e.bullets.map((b) => (
                <li key={b}>{b}</li>
              ))}
            </ul>
          </div>
        </li>
      ))}
    </ol>
  );
}

export default function ExperiencePage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 sm:py-16">
      <PageHeader
        eyebrow="Resume"
        path="/experience"
        title="Experience"
        description="Timeline-style sections with clearly labeled draft bullets. Swap in real employers, dates, and wins."
        showDraft
      />

      <Window as="section" title="resume.doc" bodyClassName="px-5 py-6 sm:px-9 sm:py-8">
        <section className="mb-10">
          <SectionTab>Education</SectionTab>
          <EntryList
            entries={education.map((item) => ({
              key: item.school,
              period: item.period,
              title: item.school,
              meta: item.degree,
              metaClass: "text-peri-deep",
              bullets: item.bullets,
            }))}
          />
        </section>

        <section>
          <SectionTab extra={<DraftBadge className="mb-1" />}>Work experience</SectionTab>
          <EntryList
            entries={experience.map((item) => ({
              key: `${item.company}-${item.role}`,
              period: item.period,
              title: (
                <>
                  {item.role} <span className="font-normal text-ink-soft">@</span>{" "}
                  {item.company}
                </>
              ),
              meta: item.location,
              metaClass: "text-ink-soft",
              bullets: item.bullets,
            }))}
          />
        </section>
      </Window>

      <Window
        as="section"
        title="skills.cfg — Properties"
        accent="platinum"
        className="mt-10 lg:ml-16"
        bodyClassName="px-5 py-6 sm:px-8"
      >
        <h2 className="mb-5 font-display text-3xl font-bold">Skills</h2>
        <div className="grid gap-5 md:grid-cols-3">
          {(
            [
              ["Product", skills.product],
              ["Marketing", skills.marketing],
              ["Tools", skills.tools],
            ] as const
          ).map(([label, items]) => (
            <fieldset key={label} className="groupbox">
              <legend>{label}</legend>
              <ul className="space-y-2 text-sm">
                {items.map((s) => (
                  <li key={s} className="flex items-start gap-2.5">
                    <span
                      aria-hidden
                      className="bevel-in mt-0.5 grid h-4 w-4 flex-none place-items-center text-[0.7rem] font-bold leading-none"
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
