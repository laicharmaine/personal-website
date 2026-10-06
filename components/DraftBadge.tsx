export default function DraftBadge({ className = "" }: { className?: string }) {
  return <span className={`tape ${className}`}>Draft — rewrite me</span>;
}
