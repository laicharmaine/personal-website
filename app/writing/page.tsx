import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import Window from "@/components/Window";
import { articles } from "@/lib/content";

export const metadata: Metadata = {
  title: "Writing",
  description:
    "Published writing by Charmaine Lai on brain-inspired AI, AI inference on CPUs, and AI’s energy cost, for Numenta and Intel.",
};

export default function WritingPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 sm:py-16">
      <PageHeader
        eyebrow="Published"
        title="Writing"
        description="At Numenta I wrote about brain-inspired AI for researchers, developers, and the curious: 22k+ readers, a front-page feature in Intel’s Parallel Universe Magazine, and a few Hacker News trending posts. Some favorites:"
      />

      <Window title={`writing/ — ${articles.length} articles`} bodyClassName="p-0">
        <ul className="divide-y-2 divide-dashed divide-platinum-dark">
          {articles.map((a) => (
            <li key={a.href} className="grid gap-1 px-5 py-6 sm:grid-cols-[7rem_1fr] sm:gap-6 sm:px-7">
              <p className="font-mono text-sm font-medium text-ink-soft sm:pt-1">{a.date}</p>
              <div>
                <p className="font-mono text-sm text-peri-deep">{a.outlet}</p>
                <h2 className="mt-0.5 text-xl font-bold leading-snug">
                  <a
                    href={a.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline decoration-platinum-dark decoration-2 underline-offset-4 hover:bg-peri-light hover:decoration-ink"
                  >
                    {a.title}
                    <span aria-hidden className="ml-1 text-peri-deep">↗</span>
                  </a>
                </h2>
                {a.byline && <p className="mt-1 text-sm text-ink-soft">Co-written {a.byline}</p>}
                <p className="mt-2 max-w-[65ch] leading-relaxed text-ink-soft">{a.description}</p>
                {a.hn && (
                  <p className="mt-3">
                    <a
                      href={a.hn.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="chip bg-peri-light hover:bg-lime"
                    >
                      Hacker News · {a.hn.points} points ↗
                    </a>
                  </p>
                )}
              </div>
            </li>
          ))}
        </ul>
        <p className="border-t-2 border-ink bg-platinum px-5 py-2.5 text-sm text-ink-soft sm:px-7">
          Numenta’s original blog is offline, so a couple of links point to Numenta’s
          Medium mirror or the Internet Archive.
        </p>
      </Window>
    </div>
  );
}
