"use client";

/**
 * Layout controls for the visual editor.
 *
 * <Block id="home.intro" kind="text" as="p" className="...">…</Block>
 *
 * Settings live in content.layout[id] (see BlockLayout in lib/content.ts).
 * Missing settings = the site's normal design. Widths only apply from the
 * md breakpoint up, so phones always get the full-width layout.
 */

import {
  createContext,
  Fragment,
  useContext,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  useSyncExternalStore,
  type ElementType,
  type ReactNode,
} from "react";
import { createPortal } from "react-dom";
import { useEdit } from "@/components/edit/EditProvider";
import type { BlockLayout } from "@/lib/content";

type Kind = "text" | "section" | "image" | "item";

// ---- which block is selected (one at a time) ----
let selected: string | null = null;
const subs = new Set<() => void>();
const selStore = {
  get: () => selected,
  set(v: string | null) {
    selected = v;
    subs.forEach((f) => f());
  },
  sub(f: () => void) {
    subs.add(f);
    return () => {
      subs.delete(f);
    };
  },
};
function useSelected() {
  return useSyncExternalStore(selStore.sub, selStore.get, () => null);
}

const TEXT_W = {
  s: "md:max-w-sm",
  m: "md:max-w-xl",
  l: "md:max-w-3xl",
  full: "md:max-w-none",
} as const;
const SECTION_W = {
  s: "md:max-w-3xl",
  m: "md:max-w-4xl",
  l: "md:max-w-5xl",
  full: "md:max-w-none",
} as const;
const FONT = { sm: "0.85em", lg: "1.2em" } as const;

export const slugId = (s: string) =>
  s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 40) || "x";

/** Clean a layout object: drop defaults so "nothing set" stays nothing. */
function clean(l: BlockLayout): BlockLayout | undefined {
  const out: BlockLayout = {};
  if (l.w) out.w = l.w;
  if (l.size) out.size = l.size;
  if (l.align) out.align = l.align;
  if (l.img) out.img = l.img;
  if (l.hidden) out.hidden = true;
  if (l.order?.length) out.order = l.order;
  return Object.keys(out).length ? out : undefined;
}

// ---- ordered groups of sections ----
const GroupCtx = createContext<{ key: string; ids: string[] } | null>(null);

export function Sections({
  page,
  items,
}: {
  page: string;
  items: { id: string; node: ReactNode }[];
}) {
  const { content } = useEdit();
  const key = `${page}:order`;
  const stored = content.layout?.[key]?.order ?? [];
  const ids = items.map((i) => i.id);
  const order = [
    ...stored.filter((id) => ids.includes(id)),
    ...ids.filter((id) => !stored.includes(id)),
  ];
  return (
    <GroupCtx.Provider value={{ key, ids: order }}>
      {order.map((id) => (
        <Fragment key={id}>{items.find((i) => i.id === id)!.node}</Fragment>
      ))}
    </GroupCtx.Provider>
  );
}

function stripTokens(cls: string, re: RegExp) {
  return cls
    .split(/\s+/)
    .filter((t) => t && !re.test(t))
    .join(" ");
}

type BlockProps = {
  id: string;
  kind?: Kind;
  as?: ElementType;
  className?: string;
  /** image blocks: full replacement classNames for S and L (M = className). */
  sizes?: { s?: string; l?: string };
  /** section blocks: allow width presets (needs a max-w-* in className). */
  noWidth?: boolean;
  label?: string;
  /** DOM id (anchor target); `id` is the layout key. */
  domId?: string;
  children: ReactNode;
  [k: string]: unknown;
};

export default function Block({
  id,
  kind = "text",
  as: Tag = "div",
  className = "",
  sizes,
  noWidth,
  label,
  domId,
  children,
  ...rest
}: BlockProps) {
  const { content, editing } = useEdit();
  const L: BlockLayout = content.layout?.[id] ?? {};
  const sel = useSelected();
  const ref = useRef<HTMLElement>(null);

  if (L.hidden && !editing) return null;

  let cls = className;
  if (kind === "image" && L.img && sizes?.[L.img]) cls = sizes[L.img]!;
  if (L.w && (kind === "text" || (kind === "section" && !noWidth))) {
    cls = `${stripTokens(cls, /^(?:sm:|md:|lg:)?max-w-/)} ${(kind === "section" ? SECTION_W : TEXT_W)[L.w]}`;
  }
  if (L.align === "center" && kind === "text") cls += " text-center";
  if (editing)
    cls += ` lb relative${L.hidden ? " lb-hidden" : ""}${sel === id ? " lb-selected" : ""}`;

  const body =
    L.size && kind === "text" ? (
      <span style={{ fontSize: FONT[L.size] }}>{children}</span>
    ) : (
      children
    );

  return (
    <Tag
      ref={ref}
      id={domId}
      className={cls}
      data-block={editing ? id : undefined}
      {...rest}
    >
      {body}
      {editing && (
        <>
          <button
            type="button"
            data-editor-ui=""
            className="lb-tab"
            aria-label={`Layout: ${label ?? id}`}
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              selStore.set(sel === id ? null : id);
            }}
          >
            ⚙{L.hidden ? " hidden" : ""}
          </button>
          {sel === id && (
            <LayoutBar
              id={id}
              kind={kind}
              anchor={ref}
              hasSizes={sizes}
              noWidth={noWidth}
              label={label}
            />
          )}
        </>
      )}
    </Tag>
  );
}

const chip =
  "rounded-full border-[1.5px] border-ink bg-paper px-2 py-0.5 font-mono text-[0.7rem] leading-4 text-ink hover:bg-lime disabled:opacity-40";
const on = "!bg-lime";

function LayoutBar({
  id,
  kind,
  anchor,
  hasSizes,
  noWidth,
  label,
}: {
  id: string;
  kind: Kind;
  anchor: React.RefObject<HTMLElement | null>;
  hasSizes?: { s?: string; l?: string };
  noWidth?: boolean;
  label?: string;
}) {
  const { content, setAt } = useEdit();
  const group = useContext(GroupCtx);
  const L: BlockLayout = content.layout?.[id] ?? {};
  const barRef = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState<{ top: number; left: number } | null>(null);

  useLayoutEffect(() => {
    const place = () => {
      const a = anchor.current?.getBoundingClientRect();
      const b = barRef.current?.getBoundingClientRect();
      if (!a) return;
      const h = b?.height ?? 40;
      const w = b?.width ?? 320;
      let top = a.top - h - 8;
      if (top < 64) top = Math.min(a.bottom + 8, window.innerHeight - h - 8);
      const left = Math.max(8, Math.min(a.left, window.innerWidth - w - 8));
      setPos({ top, left });
    };
    place();
    window.addEventListener("scroll", place, true);
    window.addEventListener("resize", place);
    return () => {
      window.removeEventListener("scroll", place, true);
      window.removeEventListener("resize", place);
    };
  }, [anchor]);

  useEffect(() => {
    const close = (e: MouseEvent | KeyboardEvent) => {
      if (e instanceof KeyboardEvent) {
        if (e.key === "Escape") selStore.set(null);
        return;
      }
      const t = e.target as Node;
      if (barRef.current?.contains(t) || anchor.current?.contains(t)) return;
      selStore.set(null);
    };
    document.addEventListener("mousedown", close);
    document.addEventListener("keydown", close);
    return () => {
      document.removeEventListener("mousedown", close);
      document.removeEventListener("keydown", close);
    };
  }, [anchor]);

  const update = (patch: Partial<BlockLayout>) =>
    setAt(["layout", id], clean({ ...L, ...patch }));
  const stop = (e: React.SyntheticEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };
  const idx = group ? group.ids.indexOf(id) : -1;
  const move = (dir: -1 | 1) => {
    if (!group || idx < 0) return;
    const ids = [...group.ids];
    const j = idx + dir;
    if (j < 0 || j >= ids.length) return;
    [ids[idx], ids[j]] = [ids[j], ids[idx]];
    setAt(["layout", group.key], { order: ids });
  };
  const showWidth = kind === "text" || (kind === "section" && !noWidth);

  const bar = (
    <div
      ref={barRef}
      data-editor-ui=""
      role="toolbar"
      aria-label={`Layout for ${label ?? id}`}
      className="win win-ink fixed z-[70] max-w-[calc(100vw-1rem)] text-ink"
      style={{ top: pos?.top ?? -9999, left: pos?.left ?? 0 }}
      onMouseDown={(e) => e.stopPropagation()}
    >
      <div className="win-titlebar" aria-hidden>
        <span className="win-box win-box-close" />
        <span className="win-title">
          layout.exe{label ? ` · ${label}` : ""}
        </span>
        <span className="win-box" />
      </div>
      <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5 bg-paper px-2.5 py-2">
        {showWidth && (
          <span className="flex items-center gap-1">
            <span className="label mr-0.5">Width</span>
            {(["s", "m", "l", "full"] as const).map((w) => (
              <button
                key={w}
                type="button"
                className={`${chip} ${L.w === w ? on : ""}`}
                onClick={(e) => (
                  stop(e),
                  update({ w: L.w === w ? undefined : w })
                )}
              >
                {w === "full" ? "Full" : w.toUpperCase()}
              </button>
            ))}
          </span>
        )}
        {kind === "text" && (
          <span className="flex items-center gap-1">
            <span className="label mr-0.5">Text</span>
            {(["sm", "md", "lg"] as const).map((s) => (
              <button
                key={s}
                type="button"
                className={`${chip} ${(L.size ?? "md") === s ? on : ""}`}
                onClick={(e) => (
                  stop(e),
                  update({ size: s === "md" ? undefined : s })
                )}
                aria-label={
                  s === "sm"
                    ? "Small text"
                    : s === "lg"
                      ? "Large text"
                      : "Normal text"
                }
              >
                {s === "sm" ? "A−" : s === "lg" ? "A+" : "A"}
              </button>
            ))}
          </span>
        )}
        {kind === "text" && (
          <span className="flex items-center gap-1">
            <span className="label mr-0.5">Align</span>
            <button
              type="button"
              className={`${chip} ${L.align !== "center" ? on : ""}`}
              onClick={(e) => (stop(e), update({ align: undefined }))}
            >
              Left
            </button>
            <button
              type="button"
              className={`${chip} ${L.align === "center" ? on : ""}`}
              onClick={(e) => (stop(e), update({ align: "center" }))}
            >
              Center
            </button>
          </span>
        )}
        {kind === "image" && (
          <span className="flex items-center gap-1">
            <span className="label mr-0.5">Size</span>
            {(["s", "m", "l"] as const).map((s) => (
              <button
                key={s}
                type="button"
                disabled={s !== "m" && !hasSizes?.[s]}
                className={`${chip} ${(L.img ?? "m") === s ? on : ""}`}
                onClick={(e) => (
                  stop(e),
                  update({ img: s === "m" ? undefined : s })
                )}
              >
                {s.toUpperCase()}
              </button>
            ))}
          </span>
        )}
        {group && idx >= 0 && (
          <span className="flex items-center gap-1">
            <span className="label mr-0.5">Move</span>
            <button
              type="button"
              className={chip}
              disabled={idx === 0}
              onClick={(e) => (stop(e), move(-1))}
              aria-label="Move section up"
            >
              ↑
            </button>
            <button
              type="button"
              className={chip}
              disabled={idx === group.ids.length - 1}
              onClick={(e) => (stop(e), move(1))}
              aria-label="Move section down"
            >
              ↓
            </button>
          </span>
        )}
        <span className="flex items-center gap-1">
          <button
            type="button"
            className={`${chip} ${L.hidden ? on : ""}`}
            onClick={(e) => (stop(e), update({ hidden: !L.hidden }))}
          >
            {L.hidden ? "◐ Show" : "◑ Hide"}
          </button>
          <button
            type="button"
            className={chip}
            disabled={!content.layout?.[id]}
            onClick={(e) => (stop(e), setAt(["layout", id], undefined))}
            title="Back to the normal design for this block"
          >
            ↺ Reset
          </button>
          <button
            type="button"
            className={chip}
            onClick={(e) => (stop(e), selStore.set(null))}
            aria-label="Close layout tools"
          >
            ✕
          </button>
        </span>
      </div>
    </div>
  );
  return createPortal(bar, document.body);
}
