import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import Window from "@/components/Window";
import { articles } from "@/lib/content";

export const metadata: Metadata = {
  title: "Writing",
  description: "Published writing by Charmaine Lai for Intel and Numenta.",
};

export default function WritingPage() {
  return (
    <div className="mx-auto max-w-6xl px-5 pb-24 sm:px-8">
      <PageHeader path="C:\Charmaine\posts.txt" title="Writing" intro="22k+ readers, an Intel feature, a few Hacker News hits." />
      <Window title="posts.txt" className="win-open" bodyClassName="p-0">
        <ul className="divide-y divide-line">
          {articles.map((a) => (
            <li key={a.href}>
              <a
                href={a.href}
                target="_blank"
                rel="noopener noreferrer"
                className="file-row grid grid-cols-[1fr_auto] gap-x-5 gap-y-1 px-4 py-5 sm:grid-cols-[4.5rem_1fr_15rem_auto] sm:items-baseline sm:px-7"
              >
                <span className="font-mono text-sm text-ink-soft">{a.date}</span>
                <span className="col-span-2 text-lg font-semibold sm:col-span-1">{a.title}</span>
                <span className="muted-on-hover text-sm text-ink-soft">{a.outlet}</span>
                <span aria-hidden className="col-start-2 row-start-1 sm:col-start-4">↗</span>
              </a>
            </li>
          ))}
        </ul>
      </Window>
    </div>
  );
}
