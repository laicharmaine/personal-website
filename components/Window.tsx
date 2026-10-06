import type { CSSProperties, ReactNode } from "react";

type Accent = "peri" | "lime" | "ink" | "platinum" | "pink";

const accents: Record<Accent, { bar: string; ink: string }> = {
  peri: { bar: "var(--peri)", ink: "var(--ink)" },
  lime: { bar: "var(--lime)", ink: "var(--ink)" },
  ink: { bar: "var(--ink)", ink: "var(--lime)" },
  platinum: { bar: "var(--platinum)", ink: "var(--ink)" },
  pink: { bar: "var(--pink)", ink: "var(--ink)" },
};

type Props = {
  title: string;
  children: ReactNode;
  accent?: Accent;
  className?: string;
  bodyClassName?: string;
  as?: "section" | "div" | "article" | "aside";
  labelledBy?: string;
};

/** Platinum-era OS window: pinstriped title bar, close + zoom boxes. */
export default function Window({
  title,
  children,
  accent = "peri",
  className = "",
  bodyClassName = "p-5 sm:p-7",
  as: Tag = "div",
  labelledBy,
}: Props) {
  const a = accents[accent];
  const style = { "--bar": a.bar, "--bar-ink": a.ink } as CSSProperties;
  const stripes =
    accent === "ink"
      ? {
          backgroundImage:
            "repeating-linear-gradient(to bottom, rgb(200 255 60 / 0.35) 0 1px, transparent 1px 4px)",
        }
      : undefined;

  return (
    <Tag className={`win ${className}`} aria-labelledby={labelledBy}>
      <div className="win-titlebar" style={{ ...style, ...stripes }} aria-hidden>
        <span className="win-box win-box-close" />
        <span className="win-title">{title}</span>
        <span className="win-box win-box-zoom" />
      </div>
      <div className={bodyClassName}>{children}</div>
    </Tag>
  );
}
