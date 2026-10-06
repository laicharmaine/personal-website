import DraftBadge from "./DraftBadge";

type Props = {
  eyebrow?: string;
  title: string;
  description?: string;
  showDraft?: boolean;
};

export default function PageHeader({
  eyebrow,
  title,
  description,
  showDraft = false,
}: Props) {
  return (
    <div className="mb-10 max-w-2xl">
      {eyebrow && (
        <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-coral-600">
          {eyebrow}
        </p>
      )}
      <div className="flex flex-wrap items-center gap-3">
        <h1 className="font-display text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
          {title}
        </h1>
        {showDraft && <DraftBadge />}
      </div>
      {description && (
        <p className="mt-3 text-lg leading-relaxed text-stone-600">
          {description}
        </p>
      )}
    </div>
  );
}
