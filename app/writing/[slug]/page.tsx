import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import DraftBadge from "@/components/DraftBadge";
import { getPost, posts } from "@/lib/content";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return { title: "Post not found" };
  return {
    title: post.title,
    description: post.excerpt,
  };
}

function formatDate(iso: string) {
  return new Date(iso + "T12:00:00").toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default async function PostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  return (
    <article className="mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-16">
      <Link
        href="/writing"
        className="text-sm font-medium text-coral-600 hover:text-coral-700"
      >
        ← All writing
      </Link>

      <header className="mt-6 mb-8">
        <div className="flex flex-wrap items-center gap-2">
          <time className="text-sm text-stone-500">{formatDate(post.date)}</time>
          {post.draft && <DraftBadge />}
        </div>
        <h1 className="mt-2 font-display text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
          {post.title}
        </h1>
        <ul className="mt-4 flex flex-wrap gap-2">
          {post.tags.map((tag) => (
            <li
              key={tag}
              className="rounded-full bg-coral-50 px-2.5 py-0.5 text-xs font-medium text-coral-700"
            >
              {tag}
            </li>
          ))}
        </ul>
      </header>

      <div className="space-y-4 text-base leading-relaxed text-stone-700 sm:text-lg">
        {post.body.map((para) => (
          <p key={para.slice(0, 40)}>{para}</p>
        ))}
      </div>
    </article>
  );
}
