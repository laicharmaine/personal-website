import DraftBadge from "./DraftBadge";

type Props = {
  eyebrow?: string;
  title: string;
  description?: string;
  showDraft?: boolean;
  path?: string;
};

/** Page heading styled as a browser address bar + big pixel title. */
export default function PageHeader({
  eyebrow,
  title,
  description,
  showDraft = false,
  path,
}: Props) {
  return (
    <header className="mb-10 sm:mb-12">
      <div className="bevel-out mb-6 flex max-w-xl items-center gap-2 px-2 py-1.5 text-sm">
        <span className="font-pixel text-xs">Address</span>
        <span className="bevel-in flex min-w-0 flex-1 items-center gap-2 px-2 py-0.5 font-mono text-[0.8rem]">
          <span aria-hidden className="inline-block h-2.5 w-2.5 flex-none border-[1.5px] border-ink bg-lime" />
          <span className="truncate">
            charmaine.lai{path ?? ""}
          </span>
        </span>
        {eyebrow && (
          <span className="hidden font-pixel text-xs sm:inline">{eyebrow}</span>
        )}
      </div>
      <div className="flex flex-wrap items-end gap-x-4 gap-y-2">
        <h1 className="font-display text-5xl font-bold leading-none tracking-tight text-ink [text-shadow:3px_3px_0_var(--paper)] sm:text-6xl">
          {title}
        </h1>
        {showDraft && <DraftBadge className="mb-1.5" />}
      </div>
      {description && (
        <p className="mt-4 max-w-2xl border-l-4 border-ink bg-paper/80 px-4 py-2 text-base leading-relaxed text-ink-soft sm:text-lg">
          {description}
        </p>
      )}
    </header>
  );
}
