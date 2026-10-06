import { site } from "@/lib/content";

export default function Footer() {
  return (
    <footer className="mt-auto border-t border-stone-200 bg-stone-50">
      <div className="mx-auto flex max-w-5xl flex-col gap-4 px-4 py-10 sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <div>
          <p className="font-display text-base font-semibold text-ink">
            {site.name}
          </p>
          <p className="mt-1 text-sm text-stone-500">{site.tagline}</p>
        </div>
        <div className="flex flex-wrap gap-4 text-sm">
          <a
            href={`mailto:${site.email}`}
            className="font-medium text-stone-600 underline-offset-4 hover:text-coral-600 hover:underline"
          >
            Email
          </a>
          <a
            href={site.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-stone-600 underline-offset-4 hover:text-coral-600 hover:underline"
          >
            LinkedIn
          </a>
          <a
            href={site.github}
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-stone-600 underline-offset-4 hover:text-coral-600 hover:underline"
          >
            GitHub
          </a>
        </div>
      </div>
      <div className="border-t border-stone-200/80 py-3 text-center text-xs text-stone-400">
        © {new Date().getFullYear()} {site.name}. Built with Next.js.
      </div>
    </footer>
  );
}
