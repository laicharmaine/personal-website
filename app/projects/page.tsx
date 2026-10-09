import type { Metadata } from "next";
import Link from "next/link";
import PageHeader from "@/components/PageHeader";
import Window from "@/components/Window";
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
    <div className="mx-auto max-w-6xl px-5 pb-24 sm:px-8">
      <PageHeader path="C:\Charmaine\case_studies" title="Projects" intro="Five launches and bets. Tap one for the story." />

      <Window title="case_studies/" className="win-open" bodyClassName="p-0">
        <ol className="divide-y divide-line">
          {projects.map((p, i) => (
            <li key={p.slug} id={p.slug} className="scroll-mt-24">
              <details className="group">
                <summary className="file-row grid grid-cols-[1fr_auto] items-center gap-x-5 gap-y-2 px-4 py-6 sm:grid-cols-[10rem_1fr_auto] sm:gap-x-8 sm:px-7">
                  <span className="col-span-2 flex items-baseline gap-3 sm:col-span-1 sm:block">
                    <span className="pixel pixel-shadow block text-[3.75rem] sm:text-[4.5rem]">{p.metric.value}</span>
                    <span className="text-sm font-medium text-ink-soft sm:mt-1 sm:block">{p.metric.label}</span>
                  </span>
                  <span>
                    <span className="font-mono text-xs text-ink-soft">
                      {`0${i + 1}`} · {p.org} · {p.year}
                    </span>
                    <span className="mt-0.5 block text-xl font-semibold sm:text-2xl">{p.title}</span>
                    <span className="muted-on-hover mt-0.5 block text-ink-soft">{p.line}</span>
                  </span>
                  <span
                    aria-hidden
                    className="toggle grid h-9 w-9 place-items-center rounded-full border-[1.5px] border-ink bg-paper text-xl leading-none"
                  >
                    +
                  </span>
                </summary>
                <dl className="details-body grid gap-3 border-t border-dashed border-line bg-desk/40 px-4 py-6 sm:pl-[13rem] sm:pr-7">
                  {steps.map((s) => (
                    <div key={s.key} className="grid gap-0.5 sm:grid-cols-[7rem_1fr] sm:gap-6">
                      <dt className="label pt-0.5">{s.label}</dt>
                      <dd className="max-w-xl">{p[s.key]}</dd>
                    </div>
                  ))}
                </dl>
              </details>
            </li>
          ))}
        </ol>
      </Window>

      <section className="pt-20 sm:pt-28" aria-labelledby="side-title">
        <h2 id="side-title" className="pixel text-5xl sm:text-6xl">Side quests</h2>
        <ul className="mt-8 grid gap-10 md:grid-cols-3 md:gap-12">
          {sideProjects.map((sp) => (
            <li key={sp.title} className="border-t border-ink pt-5">
              <h3 className="flex items-center gap-2.5 text-xl font-semibold">
                <span aria-hidden className="holo h-4 w-4 rounded-[3px] border-[1.5px] border-ink" />
                {sp.title}
              </h3>
              <p className="mt-2 text-ink-soft">{sp.line}</p>
              <p className="mt-3 flex flex-wrap gap-x-5 text-sm font-semibold">
                {sp.links?.map((l) => (
                  <a key={l.href} href={l.href} target="_blank" rel="noopener noreferrer" className="ulink">
                    {l.label} ↗
                  </a>
                ))}
                {sp.note && <span className="font-mono font-normal text-ink-soft">{sp.note}</span>}
              </p>
            </li>
          ))}
          <li className="border-t border-ink pt-5">
            <h3 className="flex items-center gap-2.5 text-xl font-semibold">
              <span aria-hidden className="holo h-4 w-4 rounded-[3px] border-[1.5px] border-ink" />
              Off the clock
            </h3>
            <p className="mt-2 text-ink-soft">Photos, dance, crafts and a famous cat.</p>
            <p className="mt-3 text-sm font-semibold">
              <Link href="/fun" className="ulink">For fun →</Link>
            </p>
          </li>
        </ul>
      </section>
    </div>
  );
}
