export default function DraftBadge({ className = "" }: { className?: string }) {
  return (
    <span
      className={`inline-flex items-center rounded-full bg-coral-100 px-2.5 py-0.5 text-xs font-medium text-coral-800 ring-1 ring-inset ring-coral-200 ${className}`}
    >
      Draft — rewrite me
    </span>
  );
}
