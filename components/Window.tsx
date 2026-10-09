import type { ReactNode } from "react";

type Props = {
  title: string;
  children: ReactNode;
  tone?: "peri" | "lime" | "ink";
  as?: "section" | "div" | "aside";
  className?: string;
  bodyClassName?: string;
  labelledBy?: string;
};

/** A light Charmaine.OS window: thin frame, pinstriped title bar. */
export default function Window({
  title,
  children,
  tone = "peri",
  as: Tag = "div",
  className = "",
  bodyClassName = "",
  labelledBy,
}: Props) {
  const toneClass = tone === "lime" ? "win-lime" : tone === "ink" ? "win-ink" : "";
  return (
    <Tag className={`win ${toneClass} ${className}`} aria-labelledby={labelledBy}>
      <div className="win-titlebar" aria-hidden>
        <span className="win-box win-box-close" />
        <span className="win-title">{title}</span>
        <span className="win-box" />
      </div>
      <div className={bodyClassName}>{children}</div>
    </Tag>
  );
}
