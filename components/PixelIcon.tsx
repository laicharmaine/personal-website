type Name = "folder" | "floppy" | "doc" | "mail" | "key" | "bulb" | "home";

/** Tiny hand-drawn 16×16 pixel icons (crisp, no external assets). */
export default function PixelIcon({
  name,
  size = 48,
  className = "",
}: {
  name: Name;
  size?: number;
  className?: string;
}) {
  const common = {
    width: size,
    height: size,
    viewBox: "0 0 16 16",
    shapeRendering: "crispEdges" as const,
    className,
    "aria-hidden": true,
  };
  const ink = "var(--ink)";
  switch (name) {
    case "folder":
      return (
        <svg {...common}>
          <path d="M1 3h6v1h1v1h7v9H1z" fill={ink} />
          <path d="M2 4h4v1h1v1h7v7H2z" fill="var(--lime)" />
          <path d="M2 7h12v1H2z" fill={ink} opacity=".35" />
          <path d="M2 4h4v1H2z" fill="#fff" opacity=".7" />
        </svg>
      );
    case "floppy":
      return (
        <svg {...common}>
          <path d="M1 1h13l1 1v13H1z" fill={ink} />
          <path d="M2 2h11l1 1v11H2z" fill="var(--peri)" />
          <path d="M4 2h7v4H4z" fill="var(--platinum)" />
          <path d="M8 3h2v2H8z" fill={ink} />
          <path d="M3 8h10v6H3z" fill="#fff" />
          <path d="M4 10h8v1H4zM4 12h6v1H4z" fill="var(--peri)" />
        </svg>
      );
    case "doc":
      return (
        <svg {...common}>
          <path d="M2 0h8l4 4v12H2z" fill={ink} />
          <path d="M3 1h6v4h4v10H3z" fill="#fff" />
          <path d="M10 1.5V4h2.5z" fill="var(--platinum)" />
          <path d="M5 7h6v1H5zM5 9h6v1H5zM5 11h4v1H5z" fill="var(--peri-deep)" />
        </svg>
      );
    case "mail":
      return (
        <svg {...common}>
          <path d="M0 3h16v11H0z" fill={ink} />
          <path d="M1 4h14v9H1z" fill="#fff" />
          <path d="M1 4h2v1h1v1h1v1h1v1h4V7h1V6h1V5h1V4h2v1h-1v1h-1v1h-1v1h-1v1H6V8H5V7H4V6H3V5H1z" fill={ink} />
          <path d="M11 9h3v3h-3z" fill="var(--lime)" />
        </svg>
      );
    case "key":
      return (
        <svg {...common}>
          <path d="M0 3h8v8H0zM8 6h8v3H8zM11 9h2v3h-2zM14 9h2v2h-2z" fill={ink} />
          <path d="M1 4h6v6H1zM8 7h7v1H8z" fill="var(--lime)" />
          <path d="M3 6h2v2H3z" fill={ink} />
          <path d="M1 4h2v1H1z" fill="#fff" />
        </svg>
      );
    case "bulb":
      return (
        <svg {...common}>
          <path d="M5 1h6v1h1v1h1v5h-1v1h-1v2H5V9H4V8H3V3h1V2h1z" fill={ink} />
          <path d="M5 2h6v1h1v5h-1v1h-1v1H6V9H5V8H4V3h1z" fill="var(--lime)" />
          <path d="M5 3h2v2H5z" fill="#fff" />
          <path d="M5 12h6v1H5zM6 14h4v1H6z" fill={ink} />
        </svg>
      );
    case "home":
      return (
        <svg {...common}>
          <path d="M7 1h2v1h1v1h1v1h1v1h1v1h1v1h-1v8H3V7H2V6h1V5h1V4h1V3h1V2h1z" fill={ink} />
          <path d="M8 2v0h0v1h1v1h1v1h1v1h1v8H9v-4H7v4H4V6h1V5h1V4h1V3h1z" fill="var(--peri)" />
        </svg>
      );
  }
}
