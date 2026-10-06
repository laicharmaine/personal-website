import Link from "next/link";
import DraftBadge from "@/components/DraftBadge";
import PixelIcon from "@/components/PixelIcon";
import Window from "@/components/Window";
import { site } from "@/lib/content";

const desktopIcons = [
  { href: "/experience", label: "Experience", file: "resume", icon: "folder" },
  { href: "/projects", label: "Projects", file: "case_studies", icon: "floppy" },
  { href: "/writing", label: "Writing", file: "posts.txt", icon: "doc" },
  { href: "/contact", label: "Contact", file: "say_hi", icon: "mail" },
] as const;

const changelog = [
  {
    version: "v1.0",
    status: "shipped",
    title: "Marketing roots",
    body: "Campaigns, positioning, and customer stories — the craft of making people care.",
    chip: "bg-platinum",
  },
  {
    version: "v2.0",
    status: "in progress",
    title: "Product pivot",
    body: "Learning to ship: research → bets → roadmaps. MBAi for AI-fluent product sense.",
    chip: "bg-peri-light",
  },
  {
    version: "v3.0-beta",
    status: "summer 2027",
    title: "Summer 2027",
    body: "Open to PM, PMM, and exploratory consulting. Teams that talk to users win.",
    chip: "bg-lime",
  },
];

const ticker = [
  "Now booking: Summer 2027 PM / PMM internships",
  "Bay Area preferred",
  "Northwestern Kellogg MBAi",
  "Marketer by craft, product by curiosity",
  "Customer insight → products people want",
];

const firstName = site.name.split(" ")[0];

export default function HomePage() {
  return (
    <>
      <div className="mx-auto grid max-w-6xl gap-8 px-4 pt-10 sm:px-6 sm:pt-14 lg:grid-cols-12 lg:gap-10">
        {/* Hero window */}
        <div className="relative lg:col-span-8">
          <Window
            as="section"
            title="about_charmaine.exe"
            className="win-open"
            bodyClassName="px-5 pb-8 pt-7 sm:px-10 sm:pb-10 sm:pt-9"
            labelledBy="hero-title"
          >
            <div className="mb-6 flex flex-wrap items-center gap-2">
              <span className="chip bg-peri-light">Kellogg MBAi · Class of 2027</span>
              <DraftBadge />
            </div>

            <h1 id="hero-title" className="font-display font-bold leading-[0.9] tracking-tight">
              <span className="block text-[3.4rem] text-ink [text-shadow:4px_4px_0_var(--peri)] sm:text-[5.5rem]">
                {firstName}
              </span>
              <span className="block text-[3.4rem] text-ink [text-shadow:4px_4px_0_var(--peri)] sm:text-[5.5rem]">
                {site.name.split(" ").slice(1).join(" ")}
                <span className="blink ml-2 inline-block h-[0.7em] w-[0.3em] bg-lime align-baseline shadow-[0_0_0_3px_var(--ink)]" aria-hidden />
              </span>
              <span className="mt-5 block font-sans text-xl font-semibold leading-snug tracking-normal text-ink sm:text-2xl">
                Marketer by craft.{" "}
                <span className="bg-lime px-1 [box-decoration-break:clone]">
                  Product by curiosity.
                </span>
              </span>
            </h1>

            <p className="mt-5 max-w-xl text-lg leading-relaxed text-ink-soft">
              {site.headline} Currently at Northwestern Kellogg (MBAi), hunting a{" "}
              <strong className="font-semibold text-ink">PM / PMM</strong> summer
              2027 role — preferably Bay Area — and peeking at consulting too.
            </p>

            <p className="mt-3 max-w-xl font-mono text-xs leading-relaxed text-ink-soft">
              {site.location}. Copy on this site is labeled <em>draft</em> until
              Charmaine rewrites it in her real voice.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/experience" className="btn btn-primary">
                See experience <span aria-hidden>→</span>
              </Link>
              <Link href="/projects" className="btn btn-secondary">
                Browse projects
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center px-3 py-2 text-sm font-semibold text-peri-deep underline decoration-2 underline-offset-4 hover:bg-peri-light"
              >
                Say hello
              </Link>
            </div>
          </Window>

          {/* Starburst sticker */}
          <div
            className="sticker-wobble absolute -right-3 -top-7 rotate-12 drop-shadow-[3px_3px_0_var(--ink)] sm:-right-6 sm:-top-9"
            aria-hidden
          >
            <div className="burst grid h-24 w-24 place-items-center bg-ink sm:h-32 sm:w-32">
              <div className="burst grid h-[5.5rem] w-[5.5rem] place-items-center bg-lime text-center sm:h-[7.5rem] sm:w-[7.5rem]">
                <span className="font-pixel text-[0.62rem] leading-tight sm:text-sm">
                  Open for
                  <br />
                  Summer
                  <br />
                  ’27!
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Right column: Get Info + desktop icons */}
        <div className="flex flex-col gap-8 lg:col-span-4">
          <Window
            as="aside"
            title="Get Info"
            accent="platinum"
            className="win-open-2"
            bodyClassName="p-5"
          >
            <div className="flex items-center gap-3 border-b-2 border-dashed border-platinum-dark pb-4">
              <div className="holo grid h-14 w-14 flex-none place-items-center border-2 border-ink font-pixel text-lg shadow-[2px_2px_0_var(--ink)]">
                CL
              </div>
              <div>
                <p className="font-semibold leading-tight">{site.name}</p>
                <p className="font-mono text-xs text-ink-soft">{site.tagline}</p>
              </div>
            </div>
            <dl className="mt-4 grid grid-cols-[5.5rem_1fr] gap-x-3 gap-y-2.5 text-sm">
              <dt className="text-right font-pixel text-xs leading-5 text-ink-soft">Kind</dt>
              <dd>Marketer → PM / PMM</dd>
              <dt className="text-right font-pixel text-xs leading-5 text-ink-soft">Version</dt>
              <dd>Kellogg MBAi ’27</dd>
              <dt className="text-right font-pixel text-xs leading-5 text-ink-soft">Where</dt>
              <dd>{site.location}</dd>
              <dt className="text-right font-pixel text-xs leading-5 text-ink-soft">Status</dt>
              <dd>
                <span className="inline-flex items-center gap-1.5 border-[1.5px] border-ink bg-lime px-1.5 font-medium">
                  <span aria-hidden className="blink h-1.5 w-1.5 bg-ink" />
                  Open · Summer 2027
                </span>
              </dd>
            </dl>
          </Window>

          <nav aria-label="Desktop shortcuts" className="win-open-3">
            <ul className="grid grid-cols-4 gap-2 lg:grid-cols-2 lg:gap-y-5">
              {desktopIcons.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="desk-icon flex flex-col items-center gap-1.5 text-center outline-none"
                  >
                    <PixelIcon name={item.icon} size={52} />
                    <span className="icon-label font-mono text-xs font-medium text-ink">
                      {item.file}
                    </span>
                    <span className="sr-only">{item.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>

      {/* The one marquee */}
      <div
        className="marquee mt-14 overflow-hidden border-y-2 border-ink bg-ink py-2.5 text-lime"
        role="region"
        aria-label="Status ticker"
      >
        <div className="marquee-track">
          {[0, 1].map((copy) => (
            <ul
              key={copy}
              className="flex flex-none items-center"
              aria-hidden={copy === 1 ? true : undefined}
            >
              {ticker.map((t) => (
                <li key={t} className="flex items-center whitespace-nowrap font-pixel text-sm">
                  <span className="px-6">{t}</span>
                  <span aria-hidden className="text-peri">✦</span>
                </li>
              ))}
            </ul>
          ))}
        </div>
      </div>

      {/* Changelog */}
      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-20">
        <div className="grid gap-8 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <p className="font-pixel text-sm">Release notes</p>
            <h2 className="mt-2 font-display text-4xl font-bold leading-none sm:text-5xl">
              Charmaine, versioned.
            </h2>
            <p className="mt-4 max-w-sm text-base leading-relaxed text-ink">
              Every product has a changelog. This is mine — from marketer to
              product builder.
            </p>
          </div>

          <Window
            as="section"
            title="CHANGELOG.md"
            accent="ink"
            className="lg:col-span-8"
            bodyClassName="p-0"
          >
            <ol className="divide-y-2 divide-dashed divide-platinum-dark">
              {changelog.map((entry) => (
                <li
                  key={entry.version}
                  className="grid gap-3 px-5 py-6 sm:grid-cols-[9rem_1fr] sm:gap-6 sm:px-7"
                >
                  <div className="flex flex-row items-center gap-2 sm:flex-col sm:items-start">
                    <span className={`chip ${entry.chip}`}>{entry.version}</span>
                    <span className="font-mono text-xs text-ink-soft">{entry.status}</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold">{entry.title}</h3>
                    <p className="mt-1.5 leading-relaxed text-ink-soft">{entry.body}</p>
                  </div>
                </li>
              ))}
            </ol>
          </Window>
        </div>
      </div>
    </>
  );
}
