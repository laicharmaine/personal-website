import Link from "next/link";
import { projects, proof, site, strengths } from "@/lib/content";

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="mx-auto max-w-6xl px-5 pb-20 pt-14 sm:px-8 sm:pb-28 sm:pt-24">
        <p className="pill fade-up">
          <span aria-hidden className="dot" />
          Open to Summer ’27
        </p>
        <h1 className="display fade-up fade-up-1 mt-8 whitespace-nowrap text-[25vw] md:text-[min(17.5vw,13.5rem)]">
          Charmaine
          <br className="md:hidden" /> Lai<span className="text-accent">.</span>
        </h1>
        <div className="mt-10 grid gap-8 md:grid-cols-12 md:items-end">
          <p className="display-wide fade-up fade-up-2 text-3xl leading-[1.05] sm:text-[2.6rem] md:col-span-7">
            {site.tagline}
          </p>
          <div className="fade-up fade-up-3 md:col-span-5">
            <p className="max-w-sm text-lg text-muted">
              Ex-Numenta AI marketer, now MBA + MS in AI at Northwestern. Seeking a
              summer 2027 PM or PMM internship in the Bay Area.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link href="/projects" className="btn btn-solid">
                See my work <span aria-hidden className="arrow">→</span>
              </Link>
              <a href={`mailto:${site.email}`} className="btn btn-ghost">
                Email me
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Proof points */}
      <section aria-label="Highlights" className="border-t border-line">
        <ul className="mx-auto grid max-w-6xl grid-cols-2 px-5 sm:px-8 md:grid-cols-4">
          {proof.map((p, i) => (
            <li
              key={p.label}
              className={`border-line py-10 sm:py-12 md:px-8 ${i % 2 === 1 ? "border-l pl-5" : "pr-5"} ${
                i >= 2 ? "border-t md:border-t-0" : ""
              } ${i === 0 ? "md:pl-0" : ""} ${i === 2 ? "md:border-l" : ""}`}
            >
              <span className="display block text-6xl sm:text-7xl">{p.value}</span>
              <span className="mt-3 block font-mono text-sm text-muted">{p.label}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* Marquee: what I bring, in one line */}
      <div className="marquee overflow-hidden border-y border-line py-6" aria-label="What I bring">
        <div className="marquee-track">
          {[0, 1].map((copy) => (
            <ul key={copy} className="flex flex-none items-center" aria-hidden={copy === 1 ? true : undefined}>
              {strengths.map((s, i) => (
                <li key={s} className="flex items-center">
                  <span
                    className={`display px-6 text-5xl sm:text-6xl ${i % 2 === 1 ? "outline-text" : ""}`}
                  >
                    {s}
                  </span>
                  <span aria-hidden className="irid h-3 w-3 rounded-full" />
                </li>
              ))}
            </ul>
          ))}
        </div>
      </div>

      {/* Selected work */}
      <section className="mx-auto max-w-6xl px-5 py-20 sm:px-8 sm:py-28" aria-labelledby="work-title">
        <div className="flex items-end justify-between gap-4">
          <h2 id="work-title" className="label">Selected work</h2>
          <Link href="/projects" className="ulink text-sm font-medium">
            All projects
          </Link>
        </div>
        <ol className="mt-6 border-t border-ink">
          {projects.map((p, i) => (
            <li key={p.slug} className="border-b border-line">
              <Link
                href={`/projects#${p.slug}`}
                className="row-hover grid grid-cols-[2.5rem_1fr_auto] items-baseline gap-x-4 px-1 py-6 sm:grid-cols-[4rem_1fr_1fr_auto] sm:gap-x-8 sm:px-3"
              >
                <span className="font-mono text-sm text-muted">{`0${i + 1}`}</span>
                <span className="display-wide text-2xl sm:text-3xl">{p.title}</span>
                <span className="col-start-2 mt-1 text-muted sm:col-start-3 sm:mt-0">{p.line}</span>
                <span aria-hidden className="row-arrow col-start-3 row-start-1 text-xl sm:col-start-4">↗</span>
              </Link>
            </li>
          ))}
        </ol>
      </section>

      {/* Contact CTA */}
      <section className="mx-auto max-w-6xl px-5 pb-24 sm:px-8 sm:pb-32" aria-labelledby="cta-title">
        <div className="border-t border-ink pt-12">
          <h2 id="cta-title" className="display text-7xl sm:text-[9rem]">
            Let’s talk<span className="text-accent">.</span>
          </h2>
          <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-4">
            <a href={`mailto:${site.email}`} className="ulink break-all text-lg font-medium sm:text-2xl">
              {site.email}
            </a>
            <Link href="/experience" className="btn btn-ghost">
              Résumé <span aria-hidden className="arrow">→</span>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
