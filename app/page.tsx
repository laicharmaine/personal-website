import Link from "next/link";
import Window from "@/components/Window";
import { cat, projects, site } from "@/lib/content";

const glance = [
  {
    label: "Program",
    value: "MBA + MS in AI (MBAi), Kellogg + McCormick, Northwestern · Mar 2028",
  },
  { label: "Background", value: "Almost 5 years in AI marketing at Numenta, then product consulting" },
  { label: "Looking for", value: `${site.lookingFor} · ${site.target}`, highlight: true },
  { label: "Based in", value: site.location },
  { label: "Languages", value: "English, Cantonese, Mandarin" },
];

const strengths = [
  {
    title: "Go-to-market for technical products",
    body: "I took NuPIC, a CPU-based generative AI platform, from launch to three strategic partnerships in its first quarter.",
    chips: ["Market research", "Positioning", "Launches"],
  },
  {
    title: "Customer insight → product decisions",
    body: "My dogfooding sessions shaped three NuPIC iterations. In Hong Kong I turned railroad buyers’ requirements into prioritized capabilities ($7M in potential opportunities).",
    chips: ["Dogfooding", "Prioritization", "API docs"],
  },
  {
    title: "Content people actually read",
    body: "22k+ readers on my AI writing, a front-page Intel feature, Hacker News trending posts, and a cat with 450k+ followers.",
    chips: ["Writing", "Events", "Social"],
  },
];

const featured = projects.slice(0, 3);

function SectionHeading({
  id,
  kicker,
  children,
  link,
}: {
  id: string;
  kicker: string;
  children: React.ReactNode;
  link?: { href: string; label: string };
}) {
  return (
    <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
      <div>
        <p className="font-mono text-sm font-medium text-peri-deep">{kicker}</p>
        <h2 id={id} className="mt-1 text-3xl font-bold tracking-tight">
          {children}
        </h2>
      </div>
      {link && (
        <Link
          href={link.href}
          className="font-semibold text-peri-deep underline decoration-2 underline-offset-4 hover:bg-peri-light"
        >
          {link.label} <span aria-hidden>→</span>
        </Link>
      )}
    </div>
  );
}

export default function HomePage() {
  return (
    <div className="mx-auto max-w-5xl px-4 sm:px-6">
      {/* 1 — Intro: who, pitch, what she wants, where to click */}
      <section className="relative pt-10 sm:pt-14" aria-labelledby="hero-title">
        <Window
          title="about_charmaine.exe"
          className="win-open"
          bodyClassName="grid gap-8 px-5 pb-8 pt-7 sm:px-9 sm:pb-9 sm:pt-8 md:grid-cols-[1.35fr_1fr] md:gap-10"
        >
          <div>
            <p className="font-mono text-sm font-medium text-peri-deep">
              Northwestern MBAi ’28 · PM / PMM
            </p>
            <h1
              id="hero-title"
              className="mt-3 font-display text-[2.9rem] font-bold leading-[0.95] tracking-tight [text-shadow:3px_3px_0_var(--peri)] sm:text-[4rem]"
            >
              {site.name}
            </h1>
            <p className="mt-5 text-2xl font-semibold leading-snug">
              Marketer by craft.{" "}
              <span className="bg-lime px-1 [box-decoration-break:clone]">
                Product by curiosity.
              </span>
            </p>
            <p className="mt-4 max-w-[60ch] text-lg leading-relaxed text-ink-soft">
              {site.headline} Now I’m doing a joint MBA + MS in AI at
              Northwestern and looking for a{" "}
              <strong className="font-semibold text-ink">PM or PMM internship</strong>{" "}
              in the Bay Area for summer 2027.
            </p>
            <p className="mt-3 max-w-[60ch] leading-relaxed text-ink-soft">
              Off the clock, I’m the Meowmager behind{" "}
              <a
                href={cat.tiktok}
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-peri-deep underline decoration-2 underline-offset-4 hover:bg-peri-light"
              >
                {cat.handle}
              </a>{" "}
              ({cat.followers} followers).
            </p>
            <div className="mt-7 flex flex-wrap items-center gap-3">
              <Link href="/experience" className="btn btn-primary px-5 py-3 text-base">
                View experience <span aria-hidden>→</span>
              </Link>
              <Link href="/contact" className="btn btn-secondary px-5 py-3 text-base">
                Contact me
              </Link>
            </div>
          </div>

          <aside
            aria-label="At a glance"
            className="self-start border-t-2 border-dashed border-platinum-dark pt-6 md:border-l-2 md:border-t-0 md:pl-8 md:pt-1"
          >
            <h2 className="font-mono text-sm font-medium text-peri-deep">At a glance</h2>
            <dl className="mt-3 space-y-4">
              {glance.map((row) => (
                <div key={row.label}>
                  <dt className="text-sm font-semibold uppercase tracking-wide text-ink-soft">
                    {row.label}
                  </dt>
                  <dd className="mt-0.5 font-medium leading-snug">
                    {row.highlight ? (
                      <span className="bg-lime px-1 [box-decoration-break:clone]">{row.value}</span>
                    ) : (
                      row.value
                    )}
                  </dd>
                </div>
              ))}
            </dl>
          </aside>
        </Window>

        {/* Signature sticker */}
        <div
          className="sticker-wobble absolute -right-2 top-1 rotate-12 drop-shadow-[3px_3px_0_var(--ink)] sm:-right-7 sm:top-3"
          aria-hidden
        >
          <div className="burst grid h-24 w-24 place-items-center bg-ink sm:h-32 sm:w-32">
            <div className="burst grid h-[5.6rem] w-[5.6rem] place-items-center bg-lime text-center sm:h-[7.6rem] sm:w-[7.6rem]">
              <span className="text-[0.72rem] font-bold uppercase leading-tight sm:text-sm">
                Open for
                <br />
                Summer ’27
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* 2 — What she brings */}
      <section className="pt-16" aria-labelledby="brings-title">
        <SectionHeading id="brings-title" kicker="Why me">
          What I bring
        </SectionHeading>
        <Window title="highlights.txt" accent="platinum" bodyClassName="p-0">
          <ul className="grid divide-y-2 divide-dashed divide-platinum-dark md:grid-cols-3 md:divide-x-2 md:divide-y-0">
            {strengths.map((s) => (
              <li key={s.title} className="p-6 sm:p-7">
                <h3 className="text-xl font-bold leading-snug">{s.title}</h3>
                <p className="mt-2 leading-relaxed text-ink-soft">{s.body}</p>
                <ul className="mt-4 flex flex-wrap gap-2" aria-label={`${s.title} skills`}>
                  {s.chips.map((k) => (
                    <li key={k} className="chip">
                      {k}
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </Window>
      </section>

      {/* 3 — Featured projects */}
      <section className="pt-16" aria-labelledby="projects-title">
        <SectionHeading
          id="projects-title"
          kicker="Proof of work"
          link={{ href: "/projects", label: "All projects" }}
        >
          Featured projects
        </SectionHeading>
        <Window title="case_studies/" bodyClassName="p-0">
          <ol className="divide-y-2 divide-dashed divide-platinum-dark">
            {featured.map((p) => (
              <li key={p.slug}>
                <Link
                  href={`/projects#${p.slug}`}
                  className="group grid gap-3 px-6 py-6 transition-colors hover:bg-peri-light sm:grid-cols-[8.5rem_1fr] sm:items-center sm:gap-7 sm:px-7"
                >
                  {p.metric && (
                    <span className="flex items-baseline gap-2 sm:block">
                      <span className="block text-4xl font-bold leading-none tracking-tight text-peri-deep">
                        {p.metric.value}
                      </span>
                      <span className="mt-1 block text-sm leading-snug text-ink-soft">
                        {p.metric.label}
                      </span>
                    </span>
                  )}
                  <span>
                    <span className="block font-mono text-sm text-ink-soft">
                      {p.org} · {p.period}
                    </span>
                    <span className="mt-0.5 block text-xl font-bold leading-snug group-hover:underline group-hover:decoration-2 group-hover:underline-offset-4">
                      {p.title}
                    </span>
                    <span className="mt-1 block max-w-[65ch] leading-relaxed text-ink-soft">
                      {p.result}
                    </span>
                  </span>
                </Link>
              </li>
            ))}
          </ol>
        </Window>
      </section>

      {/* 4 — CTA */}
      <section className="py-16 sm:py-20" aria-labelledby="cta-title">
        <div className="win flex flex-col gap-6 bg-ink p-7 text-paper shadow-[5px_5px_0_var(--peri)] sm:flex-row sm:items-center sm:justify-between sm:p-9">
          <div>
            <h2 id="cta-title" className="font-display text-3xl font-bold leading-tight text-lime sm:text-4xl">
              Hiring a summer 2027 PM or PMM intern?
            </h2>
            <p className="mt-2 max-w-[55ch] text-lg text-paper/85">
              Let’s talk. My full résumé is one click away, and email is the
              fastest way to reach me.
            </p>
          </div>
          <div className="flex flex-none flex-wrap gap-3">
            <Link href="/experience" className="btn btn-primary px-5 py-3 text-base">
              View experience
            </Link>
            <Link href="/contact" className="btn btn-secondary px-5 py-3 text-base">
              Contact me
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
