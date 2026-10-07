import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import DraftNote from "@/components/DraftNote";
import Window from "@/components/Window";
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
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-16">
      <Link href="/writing" className="btn btn-secondary px-3 py-1.5 text-sm">
        <span aria-hidden>◂</span> All writing
      </Link>

      <Window
        as="article"
        title={`${post.slug}.txt`}
        className="mt-6"
        bodyClassName="px-5 py-7 sm:px-10 sm:py-10"
      >
        <header className="mb-8 border-b-2 border-dashed border-platinum-dark pb-6">
          <time className="font-mono text-sm text-ink-soft">{formatDate(post.date)}</time>
          <h1 className="mt-2 text-3xl font-bold leading-tight tracking-tight sm:text-4xl">
            {post.title}
          </h1>
          <ul className="mt-5 flex flex-wrap gap-2" aria-label="Tags">
            {post.tags.map((tag) => (
              <li key={tag} className="chip bg-peri-light">
                {tag}
              </li>
            ))}
          </ul>
        </header>

        <div className="max-w-[65ch] space-y-5 text-lg leading-relaxed text-ink">
          {post.body.map((para) => (
            <p key={para.slice(0, 40)}>{para}</p>
          ))}
        </div>
        {post.draft && <DraftNote className="mt-8 border-t-2 border-dashed border-platinum-dark pt-5">Draft post — placeholder text that Charmaine is rewriting.</DraftNote>}
      </Window>
    </div>
  );
}
