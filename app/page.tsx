import Link from "next/link";
import DraftBadge from "@/components/DraftBadge";
import { site } from "@/lib/content";

export default function HomePage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-14 sm:px-6 sm:py-20">
      <section className="relative overflow-hidden rounded-3xl border border-coral-100 bg-gradient-to-br from-white via-cream to-coral-50 px-6 py-12 shadow-sm sm:px-12 sm:py-16">
        <div
          className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-coral-200/40 blur-3xl"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute -bottom-20 -left-10 h-48 w-48 rounded-full bg-coral-100/60 blur-3xl"
          aria-hidden
        />

        <div className="relative">
          <div className="animate-fade-up mb-4 flex flex-wrap items-center gap-2">
            <span className="rounded-full bg-white/80 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-coral-700 ring-1 ring-coral-200">
              Kellogg MBAi · Class of 2027
            </span>
            <DraftBadge />
          </div>

          <h1 className="animate-fade-up font-display text-4xl font-semibold leading-tight tracking-tight text-ink sm:text-5xl lg:text-[3.25rem]">
            Hi, I&apos;m{" "}
            <span className="text-coral-600">{site.name.split(" ")[0]}</span>.
            <br />
            <span className="text-stone-700">
              Marketer by craft. Product by curiosity.
            </span>
          </h1>

          <p className="animate-fade-up-delay mt-5 max-w-xl text-lg leading-relaxed text-stone-600 sm:text-xl">
            {site.headline} Currently at Northwestern Kellogg (MBAi), hunting a{" "}
            <strong className="font-semibold text-ink">PM / PMM</strong> summer
            2027 role — preferably Bay Area — and peeking at consulting too.
          </p>

          <p className="animate-fade-up-delay mt-3 max-w-xl text-sm text-stone-500">
            {site.location}. Copy on this site is labeled{" "}
            <em>draft</em> until Charmaine rewrites it in her real voice.
          </p>

          <div className="animate-fade-up-delay-2 mt-8 flex flex-wrap gap-3">
            <Link
              href="/experience"
              className="inline-flex items-center justify-center rounded-full bg-coral-500 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-coral-600"
            >
              See experience →
            </Link>
            <Link
              href="/projects"
              className="inline-flex items-center justify-center rounded-full border border-stone-300 bg-white px-6 py-3 text-sm font-semibold text-ink transition hover:border-coral-300 hover:bg-coral-50"
            >
              Browse projects
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-semibold text-coral-700 transition hover:bg-coral-50"
            >
              Say hello
            </Link>
          </div>
        </div>
      </section>

      <section className="mt-16 grid gap-6 sm:grid-cols-3">
        {[
          {
            title: "Marketing roots",
            body: "Campaigns, positioning, and customer stories — the craft of making people care.",
          },
          {
            title: "Product pivot",
            body: "Learning to ship: research → bets → roadmaps. MBAi for AI-fluent product sense.",
          },
          {
            title: "Summer 2027",
            body: "Open to PM, PMM, and exploratory consulting. Teams that talk to users win.",
          },
        ].map((card) => (
          <div
            key={card.title}
            className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:border-coral-200 hover:shadow-md"
          >
            <h2 className="font-display text-lg font-semibold text-ink">
              {card.title}
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-stone-600">
              {card.body}
            </p>
          </div>
        ))}
      </section>
    </div>
  );
}
