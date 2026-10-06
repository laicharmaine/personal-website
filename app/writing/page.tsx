import type { Metadata } from "next";
import Link from "next/link";
import PageHeader from "@/components/PageHeader";
import DraftBadge from "@/components/DraftBadge";
import Window from "@/components/Window";
import { posts } from "@/lib/content";

export const metadata: Metadata = {
  title: "Writing",
  description: "Draft blog posts and recruiting notes.",
};

function formatDate(iso: string) {
  return new Date(iso + "T12:00:00").toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export default function WritingPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 sm:py-16">
      <PageHeader
        eyebrow="Blog"
        path="/writing"
        title="Writing"
        description="Short posts in Charmaine's voice (once the drafts are rewritten). Click through for full stub pages."
        showDraft
      />

      <Window title={`Inbox — Writing (${posts.length})`} bodyClassName="p-0">
        <div
          className="bevel-out hidden grid-cols-[8.5rem_1fr] gap-6 border-x-0 border-t-0 px-6 py-1.5 font-pixel text-xs sm:grid"
          aria-hidden
        >
          <span>Date</span>
          <span>Subject</span>
        </div>
        <ul className="divide-y-2 divide-dashed divide-platinum-dark">
          {posts.map((post) => (
            <li key={post.slug}>
              <Link
                href={`/writing/${post.slug}`}
                className="group grid gap-1 px-5 py-5 transition-colors hover:bg-peri-light sm:grid-cols-[8.5rem_1fr] sm:gap-6 sm:px-6"
              >
                <time className="flex items-center gap-2 self-start font-mono text-xs font-medium uppercase text-ink-soft sm:pt-1.5">
                  <span
                    aria-hidden
                    className="inline-block h-2 w-2 flex-none border-[1.5px] border-ink bg-lime"
                  />
                  {formatDate(post.date)}
                </time>
                <div>
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                    <h2 className="text-xl font-semibold leading-snug group-hover:underline group-hover:decoration-2 group-hover:underline-offset-4">
                      {post.title}
                    </h2>
                    {post.draft && <DraftBadge />}
                  </div>
                  <p className="mt-1.5 leading-relaxed text-ink-soft">{post.excerpt}</p>
                  <ul className="mt-3 flex flex-wrap gap-2" aria-label="Tags">
                    {post.tags.map((tag) => (
                      <li key={tag} className="chip">
                        {tag}
                      </li>
                    ))}
                  </ul>
                </div>
              </Link>
            </li>
          ))}
        </ul>
        <p className="border-t-2 border-ink bg-platinum px-5 py-1.5 font-mono text-[0.7rem] text-ink-soft sm:px-6">
          {posts.length} items · sorted by you, eventually
        </p>
      </Window>
    </div>
  );
}
