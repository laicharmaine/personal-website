import Link from "next/link";
import Window from "@/components/Window";
import { projects, proof, site, strengths } from "@/lib/content";

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="mx-auto max-w-6xl px-5 pt-12 sm:px-8 sm:pt-16" aria-labelledby="hero-title">
        <div className="relative">
          <Window title="about_charmaine.exe" className="win-open" bodyClassName="px-5 pb-8 pt-7 sm:px-10 sm:pb-12 sm:pt-10">
            <h1 id="hero-title" className="pixel pixel-shadow whitespace-nowrap text-[20vw] md:text-[min(12.5vw,10.5rem)]">
              Charmaine
              <br className="md:hidden" /> Lai
              <span aria-hidden className="blink ml-[0.08em] inline-block h-[0.55em] w-[0.2em] bg-lime align-baseline outline outline-[1.5px] outline-ink" />
            </h1>
            <div className="mt-8 grid gap-6 md:grid-cols-12 md:items-end md:gap-10">
              <p className="text-2xl font-semibold leading-snug sm:text-[2rem] md:col-span-6">
                Marketer by craft. <span className="hl">Product by curiosity.</span>
              </p>
              <div className="md:col-span-6">
                <p className="max-w-md text-lg text-ink-soft">
                  Ex-Numenta AI marketer, now MBA + MS in AI at Northwestern. Seeking a
                  summer 2027 PM or PMM internship in the Bay Area.
                </p>
                <div className="mt-6 flex flex-wrap gap-3">
                  <Link href="/projects" className="btn btn-lime">
                    See my work <span aria-hidden className="arrow">→</span>
                  </Link>
                  <a href={`mailto:${site.email}`} className="btn btn-paper">
                    Email me
                  </a>
                </div>
              </div>
            </div>
          </Window>

          {/* Starburst sticker */}
          <div className="sticker absolute -right-2 -top-9 sm:-right-7 sm:-top-12" aria-hidden>
            <div className="burst grid h-24 w-24 place-items-center bg-ink sm:h-36 sm:w-36">
              <div className="burst grid h-[5.6rem] w-[5.6rem] place-items-center bg-lime text-center sm:h-[8.5rem] sm:w-[8.5rem]">
                <span className="pixel text-[1.15rem] leading-[0.95] sm:text-[1.75rem]">
                  Open for
                  <br />
                  Summer
                  <br />
                  ’27!
                </span>
              </div>
            </div>
          </div>
          <p className="sr-only">Open for summer 2027 internships.</p>
        </div>
      </section>

      {/* Big numbers */}
      <section aria-label="Highlights" className="mx-auto max-w-6xl px-5 pt-16 sm:px-8 sm:pt-24">
        <ul className="grid grid-cols-2 gap-y-10 md:grid-cols-4">
          {proof.map((p, i) => (
            <li
              key={p.label}
              className={`border-line ${i % 2 === 1 ? "border-l pl-5" : "pr-5"} md:px-7 ${i === 0 ? "md:pl-0" : ""} ${
                i === 2 ? "md:border-l" : ""
              }`}
            >
              <span className="pixel pixel-shadow block text-[4.5rem] sm:text-[6rem]">{p.value}</span>
              <span className="mt-2 block text-[0.95rem] font-medium text-ink-soft">{p.label}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* The one ticker */}
      <div className="marquee mt-16 overflow-hidden bg-ink py-3 text-lime sm:mt-24" aria-label="What I bring">
        <div className="marquee-track">
          {[0, 1].map((copy) => (
            <ul key={copy} className="flex flex-none items-center" aria-hidden={copy === 1 ? true : undefined}>
              {strengths.map((s) => (
                <li key={s} className="flex items-center whitespace-nowrap">
                  <span className="pixel px-6 text-[2rem] leading-none">{s}</span>
                  <span aria-hidden className="text-peri">✦</span>
                </li>
              ))}
            </ul>
          ))}
        </div>
      </div>

      {/* Selected work */}
      <section className="mx-auto max-w-6xl px-5 pt-16 sm:px-8 sm:pt-24" aria-labelledby="work-title">
        <div className="mb-5 flex items-end justify-between gap-4">
          <h2 id="work-title" className="pixel text-5xl sm:text-6xl">Selected work</h2>
          <Link href="/projects" className="ulink text-sm font-semibold">All projects</Link>
        </div>
        <Window title="selected_work/" bodyClassName="p-0">
          <ol className="divide-y divide-line">
            {projects.map((p, i) => (
              <li key={p.slug}>
                <Link
                  href={`/projects#${p.slug}`}
                  className="file-row grid grid-cols-[2.25rem_1fr_auto] items-baseline gap-x-3 px-4 py-5 sm:grid-cols-[3rem_1fr_1fr_auto] sm:gap-x-6 sm:px-6"
                >
                  <span className="font-mono text-sm text-ink-soft">{`0${i + 1}`}</span>
                  <span className="text-lg font-semibold sm:text-xl">{p.title}</span>
                  <span className="muted-on-hover col-start-2 mt-0.5 text-ink-soft sm:col-start-3 sm:mt-0">{p.line}</span>
                  <span aria-hidden className="arrow col-start-3 row-start-1 sm:col-start-4">→</span>
                </Link>
              </li>
            ))}
          </ol>
        </Window>
      </section>

      {/* Contact CTA */}
      <section className="mx-auto max-w-6xl px-5 pb-24 pt-20 sm:px-8 sm:pb-32 sm:pt-28" aria-labelledby="cta-title">
        <h2 id="cta-title" className="pixel chrome-text text-[5.5rem] drop-shadow-[3px_3px_0_var(--peri)] sm:text-[10rem]">
          Let’s talk.
        </h2>
        <div className="mt-6 flex flex-wrap items-center gap-x-8 gap-y-4">
          <a href={`mailto:${site.email}`} className="ulink text-lg font-semibold sm:text-2xl">
            {site.email.split("@")[0]}@<wbr />
            {site.email.split("@")[1]}
          </a>
          <Link href="/experience" className="btn btn-paper">
            Résumé <span aria-hidden className="arrow">→</span>
          </Link>
        </div>
      </section>
    </>
  );
}
