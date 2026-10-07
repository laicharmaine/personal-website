type Props = {
  eyebrow?: string;
  title: string;
  description?: string;
};

export default function PageHeader({
  eyebrow,
  title,
  description,
}: Props) {
  return (
    <header className="mb-10">
      {eyebrow && (
        <p className="mb-3 font-mono text-sm font-medium text-peri-deep">{eyebrow}</p>
      )}
      <h1 className="font-display text-[2.75rem] font-bold leading-none tracking-tight text-ink sm:text-[3.5rem]">
        {title}
      </h1>
      {description && (
        <p className="mt-4 max-w-[65ch] text-lg leading-relaxed text-ink-soft">
          {description}
        </p>
      )}
    </header>
  );
}
