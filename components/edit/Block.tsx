"use client";

/**
 * Layout controls for the visual editor (direct manipulation).
 *
 * <Block id="home.intro" kind="text" as="p" className="...">…</Block>
 *
 * - Drag the right edge / corner handle to resize (stored as % of the
 *   container for text/sections/cards, px for photos).
 * - Drag the ⠿ grip to reorder sections and list items (@dnd-kit; mouse,
 *   touch and keyboard).
 * - ⚙ opens the small secondary menu (text size, align, hide, reset).
 *
 * Settings live in content.layout[id]. Missing = the normal design.
 * Widths only apply from the md breakpoint up, so phones stay full width.
 */

import {
  createContext,
  Fragment,
  useCallback,
  useContext,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  useSyncExternalStore,
  type CSSProperties,
  type ElementType,
  type ReactNode,
} from "react";
import { createPortal } from "react-dom";
import {
  closestCenter,
  DndContext,
  DragOverlay,
  KeyboardSensor,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
  type DragStartEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  rectSortingStrategy,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { snapCenterToCursor } from "@dnd-kit/modifiers";
import { useEdit } from "@/components/edit/EditProvider";
import type { BlockLayout } from "@/lib/content";

type Kind = "text" | "section" | "image" | "item";

// ---- which block is selected / has its ⚙ menu open (one at a time) ----
type Sel = { id: string; menu: boolean } | null;
let selected: Sel = null;
const subs = new Set<() => void>();
const selStore = {
  get: () => selected,
  set(v: Sel) {
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
export const WP_MIN = 20;
export const PX_MIN = 48;
export const PX_MAX = 640;

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
  if (l.wp && l.wp < 100) out.wp = l.wp;
  if (l.wp === 100) out.wp = 100;
  if (l.px) out.px = l.px;
  if (l.size) out.size = l.size;
  if (l.align) out.align = l.align;
  if (l.img) out.img = l.img;
  if (l.hidden) out.hidden = true;
  if (l.order?.length) out.order = l.order;
  return Object.keys(out).length ? out : undefined;
}

// ---- drag-to-reorder areas ----
const SortCtx = createContext<{ ids: string[] } | null>(null);
const GroupCtx = createContext<{ key: string; ids: string[] } | null>(null);

/** Wrap a list so its <Block sortKey=…> children can be dragged by their ⠿ grip. */
export function SortArea({
  ids,
  onMove,
  grid,
  children,
}: {
  ids: string[];
  onMove: (from: number, to: number) => void;
  grid?: boolean;
  children: ReactNode;
}) {
  const { editing } = useEdit();
  const sensors = useSensors(
    useSensor(MouseSensor, { activationConstraint: { distance: 4 } }),
    useSensor(TouchSensor, {
      activationConstraint: { delay: 120, tolerance: 8 },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );
  const [active, setActive] = useState<string | null>(null);
  if (!editing) return <>{children}</>;
  const end = (e: DragEndEvent) => {
    setActive(null);
    if (!e.over || e.active.id === e.over.id) return;
    const from = ids.indexOf(String(e.active.id));
    const to = ids.indexOf(String(e.over.id));
    if (from >= 0 && to >= 0) onMove(from, to);
  };
  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragStart={(e: DragStartEvent) => {
        selStore.set(null);
        setActive(String(e.active.data.current?.label ?? "block"));
      }}
      onDragEnd={end}
      onDragCancel={() => setActive(null)}
    >
      <SortableContext
        items={ids}
        strategy={grid ? rectSortingStrategy : verticalListSortingStrategy}
      >
        <SortCtx.Provider value={{ ids }}>{children}</SortCtx.Provider>
      </SortableContext>
      {typeof document !== "undefined" &&
        createPortal(
          <DragOverlay dropAnimation={null} modifiers={[snapCenterToCursor]}>
            {active ? (
              <span className="lb-ghost">⠿ Moving {active}…</span>
            ) : null}
          </DragOverlay>,
          document.body,
        )}
    </DndContext>
  );
}

export function Sections({
  page,
  items,
}: {
  page: string;
  items: { id: string; node: ReactNode }[];
}) {
  const { content, setAt } = useEdit();
  const key = `${page}:order`;
  const stored = content.layout?.[key]?.order ?? [];
  const ids = items.map((i) => i.id);
  const order = [
    ...stored.filter((id) => ids.includes(id)),
    ...ids.filter((id) => !stored.includes(id)),
  ];
  return (
    <GroupCtx.Provider value={{ key, ids: order }}>
      <SortArea
        ids={order}
        onMove={(from, to) =>
          setAt(["layout", key], { order: arrayMove(order, from, to) })
        }
      >
        {order.map((id) => (
          <Fragment key={id}>{items.find((i) => i.id === id)!.node}</Fragment>
        ))}
      </SortArea>
    </GroupCtx.Provider>
  );
}

/** Reorder helper for content arrays (projects, jobs, cards…). */
export function useListMove(path: (string | number)[]) {
  const { content, setAt } = useEdit();
  return (from: number, to: number) => {
    let arr: unknown = content;
    for (const k of path) arr = (arr as Record<string | number, unknown>)?.[k];
    if (!Array.isArray(arr)) return;
    setAt(path, arrayMove(arr, from, to));
  };
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
  /** image blocks: full replacement classNames for S and L (old presets). */
  sizes?: { s?: string; l?: string };
  /** no resizing (e.g. the full-bleed ticker). */
  noWidth?: boolean;
  label?: string;
  /** DOM id (anchor target); `id` is the layout key. */
  domId?: string;
  /** resize this ancestor block instead (by its layout id). */
  resizeVia?: string;
  /** which edge carries the resize handles (default right). */
  handleSide?: "left" | "right";
  /** "width": dragged % sets the width (flex columns); default max-width. */
  widthMode?: "max" | "width";
  /** key inside the nearest SortArea (defaults to id). */
  sortKey?: string;
  children: ReactNode;
  [k: string]: unknown;
};

type SortBits = ReturnType<typeof useSortable>;

export default function Block(props: BlockProps) {
  const { editing } = useEdit();
  const sort = useContext(SortCtx);
  const key = props.sortKey ?? props.id;
  if (editing && sort?.ids.includes(key)) {
    return <SortableBlock {...props} sortKey={key} />;
  }
  return <BlockView {...props} />;
}

function SortableBlock(props: BlockProps & { sortKey: string }) {
  const s = useSortable({
    id: props.sortKey,
    data: { label: props.label ?? props.id },
  });
  return <BlockView {...props} sortable={s} />;
}

/* eslint-disable react-hooks/refs -- dnd-kit's sortable bits are callbacks/props, not ref reads */
function BlockView({
  id,
  kind = "text",
  as: Tag = "div",
  className = "",
  sizes,
  noWidth,
  label,
  domId,
  sortKey: _sortKey,
  resizeVia,
  handleSide = "right",
  widthMode = "max",
  sortable,
  children,
  style: styleProp,
  ...rest
}: BlockProps & { sortable?: SortBits }) {
  void _sortKey;
  const { content, editing, setAt } = useEdit();
  const L: BlockLayout = content.layout?.[id] ?? {};
  const sel = useSelected();
  const ref = useRef<HTMLElement | null>(null);
  const [live, setLive] = useState<string | null>(null);
  const setRef = useCallback(
    (el: HTMLElement | null) => {
      ref.current = el;
      sortable?.setNodeRef(el);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [sortable?.setNodeRef],
  );

  if (L.hidden && !editing) return null;

  const resizable = !noWidth;
  let cls = className;
  if (kind === "image" && L.img && sizes?.[L.img] && !L.px) cls = sizes[L.img]!;
  if (L.w && !L.wp && (kind === "text" || (kind === "section" && !noWidth))) {
    cls = `${stripTokens(cls, /^(?:sm:|md:|lg:)?max-w-/)} ${(kind === "section" ? SECTION_W : TEXT_W)[L.w]}`;
  }
  const style: Record<string, string> = {
    ...((styleProp as Record<string, string>) ?? {}),
  };
  if (L.wp && kind !== "image") {
    cls += widthMode === "width" ? " lb-wpw" : " lb-wp";
    style["--lb-wp"] = `${L.wp}%`;
  }
  if (L.px && kind === "image") {
    cls += " lb-px";
    style["--lb-px"] = `${L.px}px`;
  }
  if (L.align === "center" && kind === "text") cls += " text-center";
  const isSel = sel?.id === id;
  if (editing)
    cls += ` lb relative${L.hidden ? " lb-hidden" : ""}${isSel ? " lb-selected" : ""}`;
  if (sortable) {
    cls += " lb-sortable";
    if (sortable.isDragging) cls += " lb-dragging";
    style.transform = CSS.Translate.toString(sortable.transform) ?? "";
    style.transition = sortable.transition ?? "";
  }

  // ---- drag-to-resize ----
  const startResize = (e: React.PointerEvent) => {
    const el = resizeVia
      ? (ref.current?.closest(
          `[data-block="${resizeVia}"]`,
        ) as HTMLElement | null)
      : ref.current;
    const tid = resizeVia ?? id;
    const TL: BlockLayout = content.layout?.[tid] ?? {};
    const parent = el?.parentElement;
    if (!el || !parent) return;
    const sign = handleSide === "left" ? -1 : 1;
    const wcls = el.dataset.lbMode === "width" ? "lb-wpw" : "lb-wp";
    e.preventDefault();
    e.stopPropagation();
    selStore.set({ id, menu: false });
    const handle = e.currentTarget as HTMLElement;
    handle.setPointerCapture(e.pointerId);
    const ps = getComputedStyle(parent);
    const pw =
      parent.clientWidth -
      parseFloat(ps.paddingLeft) -
      parseFloat(ps.paddingRight);
    const es = getComputedStyle(el);
    const centered =
      parseFloat(es.marginLeft) > 1 &&
      Math.abs(parseFloat(es.marginLeft) - parseFloat(es.marginRight)) < 2;
    const startW = el.getBoundingClientRect().width;
    const x0 = e.clientX;
    let val = 0;
    const calc = (x: number) => {
      const w = startW + (x - x0) * sign * (centered ? 2 : 1);
      if (kind === "image") {
        const max = Math.min(PX_MAX, pw);
        return Math.round(Math.max(PX_MIN, Math.min(max, w)) / 8) * 8;
      }
      const pct = Math.round(((w / pw) * 100) / 5) * 5;
      return Math.max(WP_MIN, Math.min(100, pct));
    };
    const apply = (v: number) => {
      if (kind === "image") {
        el.classList.add("lb-px");
        el.style.setProperty("--lb-px", `${v}px`);
        setLive(`${v}px`);
      } else {
        el.classList.add(wcls);
        el.style.setProperty("--lb-wp", `${v}%`);
        setLive(v === 100 ? "Full" : `${v}%`);
      }
    };
    const move = (ev: PointerEvent) => {
      val = calc(ev.clientX);
      apply(val);
    };
    const up = () => {
      handle.removeEventListener("pointermove", move);
      handle.removeEventListener("pointerup", up);
      handle.removeEventListener("pointercancel", up);
      setLive(null);
      if (!val) return;
      const next =
        kind === "image"
          ? clean({ ...TL, px: val, img: undefined })
          : clean({ ...TL, wp: val, w: undefined });
      setAt(["layout", tid], next);
    };
    handle.addEventListener("pointermove", move);
    handle.addEventListener("pointerup", up);
    handle.addEventListener("pointercancel", up);
  };

  const body =
    L.size && kind === "text" ? (
      <span style={{ fontSize: FONT[L.size] }}>{children}</span>
    ) : (
      children
    );

  return (
    <Tag
      ref={setRef}
      id={domId}
      className={cls}
      style={Object.keys(style).length ? (style as CSSProperties) : undefined}
      data-block={editing ? id : undefined}
      data-lb-mode={widthMode === "width" ? "width" : undefined}
      onClick={
        editing
          ? (e: React.MouseEvent) => {
              const t = e.target as Element;
              if (t.closest("[data-block]") !== e.currentTarget) return;
              if (t.closest("[data-editor-ui]")) return;
              if (selStore.get()?.id !== id) selStore.set({ id, menu: false });
            }
          : undefined
      }
      {...rest}
    >
      {body}
      {editing && (
        <>
          {sortable && (
            <button
              type="button"
              data-editor-ui=""
              className="lb-grip"
              aria-label={`Drag to move: ${label ?? id}`}
              title="Drag to move"
              ref={sortable.setActivatorNodeRef}
              {...sortable.attributes}
              {...sortable.listeners}
            >
              ⠿
            </button>
          )}
          <button
            type="button"
            data-editor-ui=""
            className="lb-tab"
            aria-label={`More layout options: ${label ?? id}`}
            title="Text size, align, hide, reset"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              selStore.set(isSel && sel?.menu ? null : { id, menu: true });
            }}
          >
            ⚙{L.hidden ? " hidden" : ""}
          </button>
          {resizable && (
            <>
              <span
                data-editor-ui=""
                className={`lb-h ${handleSide === "left" ? "lb-h-l" : "lb-h-r"}`}
                aria-hidden
                title="Drag to resize"
                onPointerDown={startResize}
              />
              <span
                data-editor-ui=""
                className={`lb-h ${handleSide === "left" ? "lb-h-cl" : "lb-h-c"}`}
                aria-hidden
                title="Drag to resize"
                onPointerDown={startResize}
              />
            </>
          )}
          {live && (
            <span data-editor-ui="" className="lb-size">
              {live}
            </span>
          )}
          {isSel && sel?.menu && (
            <LayoutBar id={id} kind={kind} anchor={ref} label={label} />
          )}
        </>
      )}
    </Tag>
  );
}

/* eslint-enable react-hooks/refs */

const HINT_KEY = "lb-hint-v1";
/** One-time hint shown the first time she opens edit mode. */
export function DragHint() {
  const { editing } = useEdit();
  const [dismissed, setDismissed] = useState(false);
  const seen = useSyncExternalStore(
    () => () => {},
    () => {
      try {
        return !!localStorage.getItem(HINT_KEY);
      } catch {
        return false;
      }
    },
    () => true,
  );
  const show = !seen && !dismissed;
  if (!editing || !show) return null;
  const close = () => {
    try {
      localStorage.setItem(HINT_KEY, "1");
    } catch {}
    setDismissed(true);
  };
  return (
    <div
      data-editor-ui=""
      role="status"
      className="win win-ink fixed left-1/2 top-16 z-[75] w-[min(34rem,calc(100vw-1rem))] -translate-x-1/2"
    >
      <div className="win-titlebar" aria-hidden>
        <span className="win-box win-box-close" />
        <span className="win-title">tip.txt</span>
        <span className="win-box" />
      </div>
      <div className="flex items-center gap-3 bg-paper px-3 py-2.5 text-sm text-ink">
        <p className="flex-1 font-medium">
          Drag edges to resize · drag ⠿ to move · click text to type
        </p>
        <button
          type="button"
          onClick={close}
          className="rounded-full border-[1.5px] border-ink bg-lime px-3 py-0.5 text-xs font-semibold"
        >
          Got it
        </button>
      </div>
    </div>
  );
}

const chip =
  "rounded-full border-[1.5px] border-ink bg-paper px-2 py-0.5 font-mono text-[0.7rem] leading-4 text-ink hover:bg-lime disabled:opacity-40";
const on = "!bg-lime";

function LayoutBar({
  id,
  kind,
  anchor,
  label,
}: {
  id: string;
  kind: Kind;
  anchor: React.RefObject<HTMLElement | null>;
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
