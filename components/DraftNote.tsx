/** One quiet, per-page note that the copy is still placeholder. */
export default function DraftNote({
  children,
  className = "",
}: {
  children?: React.ReactNode;
  className?: string;
}) {
  return (
    <p className={`flex items-start gap-2 font-mono text-sm text-ink-soft ${className}`}>
      <span
        aria-hidden
        className="mt-[0.3rem] inline-block h-2.5 w-2.5 flex-none border-[1.5px] border-ink bg-lime"
      />
      <span>
        {children ??
          "Draft copy — anything in [brackets] is a placeholder Charmaine is rewriting."}
      </span>
    </p>
  );
}
