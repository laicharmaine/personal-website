import type { Metadata } from "next";
import Link from "next/link";
import PageHeader from "@/components/PageHeader";
import DraftBadge from "@/components/DraftBadge";
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
        title="Writing"
        description="Short posts in Charmaine's voice (once the drafts are rewritten). Click through for full stub pages."
        showDraft
      />

      <ul className="divide-y divide-stone-200 overflow-hidden rounded-2xl border border-stone-200 bg-white shadow-sm">
        {posts.map((post) => (
          <li key={post.slug}>
            <Link
              href={`/writing/${post.slug}`}
              className="block px-5 py-5 transition hover:bg-coral-50/60 sm:px-6"
            >
              <div className="flex flex-wrap items-center gap-2">
                <time className="text-xs font-medium uppercase tracking-wide text-stone-400">
                  {formatDate(post.date)}
                </time>
                {post.draft && <DraftBadge />}
              </div>
              <h2 className="mt-1 font-display text-xl font-semibold text-ink">
                {post.title}
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-stone-600">
                {post.excerpt}
              </p>
              <ul className="mt-3 flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <li
                    key={tag}
                    className="rounded-full bg-stone-100 px-2.5 py-0.5 text-xs font-medium text-stone-600"
                  >
                    {tag}
                  </li>
                ))}
              </ul>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
