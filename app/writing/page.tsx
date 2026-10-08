import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import { articles } from "@/lib/content";

export const metadata: Metadata = {
  title: "Writing",
  description: "Published writing by Charmaine Lai for Intel and Numenta.",
};

export default function WritingPage() {
  return (
    <div className="mx-auto max-w-6xl px-5 pb-24 sm:px-8">
      <PageHeader eyebrow="Writing" title="Words" intro="22k+ readers, an Intel feature, a few Hacker News hits." />
      <ul className="border-t border-ink">
        {articles.map((a) => (
          <li key={a.href} className="border-b border-line">
            <a
              href={a.href}
              target="_blank"
              rel="noopener noreferrer"
              className="row-hover grid grid-cols-[1fr_auto] gap-x-6 gap-y-1 px-1 py-6 sm:grid-cols-[5rem_1fr_16rem_auto] sm:items-baseline sm:px-3"
            >
              <span className="font-mono text-sm text-muted sm:order-none">{a.date}</span>
              <span className="display-wide col-span-2 text-xl sm:col-span-1 sm:text-2xl">{a.title}</span>
              <span className="font-mono text-sm text-muted">{a.outlet}</span>
              <span aria-hidden className="row-arrow col-start-2 row-start-1 sm:col-start-4">↗</span>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
