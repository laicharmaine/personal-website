"use client";

import { useEffect, useRef, useState } from "react";

/** 8 compass directions, matching wayturn.dev (atan2 of a down-positive y). */
export const GAZE_DIRS = [
  "right",
  "downright",
  "down",
  "downleft",
  "left",
  "upleft",
  "up",
  "upright",
] as const;

export type GazeDir = (typeof GAZE_DIRS)[number];
export type Expression = "pout" | "smirk" | "blink" | "half";
export type FrameName = "rest" | GazeDir | Expression;

const GAZE: Record<"rest" | GazeDir, string> = {
  rest: "/fun/gaze/rest.webp",
  right: "/fun/gaze/right.webp",
  downright: "/fun/gaze/downright.webp",
  down: "/fun/gaze/down.webp",
  downleft: "/fun/gaze/downleft.webp",
  left: "/fun/gaze/left.webp",
  upleft: "/fun/gaze/upleft.webp",
  up: "/fun/gaze/up.webp",
  upright: "/fun/gaze/upright.webp",
};

const EXPR: Record<Expression, string> = {
  pout: "/fun/gaze/pout.webp",
  smirk: "/fun/gaze/smirk.webp",
  blink: "/fun/gaze/blink.webp",
  half: "/fun/gaze/half.webp",
};

const ALL_FRAMES: { name: FrameName; src: string }[] = [
  ...Object.entries(GAZE).map(([name, src]) => ({ name: name as FrameName, src })),
  ...Object.entries(EXPR).map(([name, src]) => ({ name: name as FrameName, src })),
];

/** Live gaze is tied to this portrait. A swapped photo in the editor falls back to a still. */
const LIVE_SOURCES = new Set([
  "/fun/charmaine-portrait.webp",
  "/fun/gaze/rest.webp",
]);

export function hasGazeFrames(src?: string) {
  return Boolean(src && LIVE_SOURCES.has(src));
}

function clamp(n: number, a: number, b: number) {
  return Math.max(a, Math.min(b, n));
}

function gazeName(x: number, y: number): "rest" | GazeDir {
  if (Math.hypot(x, y) < 0.13) return "rest";
  const i = Math.round(Math.atan2(y, x) / (Math.PI / 4) + 8) % 8;
  return GAZE_DIRS[i];
}

const MASK_W = 160;
const MASK_H = 156;
const HIT_ALPHA = 40;

/**
 * Cursor-following die-cut head sticker for /contact.
 *
 * Frames are preloaded transparent webps with a shared white sticker
 * outline. A smoothed gaze vector picks rest or one of eight directions.
 * Hovering an opaque pixel for 100ms shows a pout; a click/tap on the
 * figure holds a smirk for 1.2s. Periodic blinks run every ~2.2–5.6s.
 * Touch/mobile: device tilt if available, otherwise a gentle idle loop,
 * plus blinks and tap-to-smirk. `prefers-reduced-motion` shows only the
 * still rest frame.
 */
export default function LivingPortrait({
  alt,
  className = "",
}: {
  alt: string;
  className?: string;
}) {
  const root = useRef<HTMLSpanElement>(null);
  const target = useRef({ x: 0, y: 0 });
  const cur = useRef({ x: 0, y: 0 });
  const lastPointer = useRef(0);
  const hasPointer = useRef(false);
  const hovering = useRef(false);
  const hoverSince = useRef(0);
  const moodUntil = useRef(0);
  const nextBlink = useRef(0);
  const blinkStart = useRef(-Infinity);
  const downAt = useRef<{ t: number; x: number; y: number } | null>(null);
  const unionMask = useRef<Uint8Array | null>(null);
  const [shown, setShown] = useState<FrameName>("rest");
  const [reduce, setReduce] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduce(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    const canvas = document.createElement("canvas");
    canvas.width = MASK_W;
    canvas.height = MASK_H;
    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    if (!ctx) return;
    const union = new Uint8Array(MASK_W * MASK_H);
    let pending = ALL_FRAMES.length;
    for (const { src } of ALL_FRAMES) {
      const im = new Image();
      im.decoding = "async";
      im.onload = () => {
        ctx.clearRect(0, 0, MASK_W, MASK_H);
        ctx.drawImage(im, 0, 0, MASK_W, MASK_H);
        const data = ctx.getImageData(0, 0, MASK_W, MASK_H).data;
        for (let i = 0; i < union.length; i++) {
          const a = data[i * 4 + 3];
          if (a > union[i]) union[i] = a;
        }
        pending -= 1;
        if (pending === 0) unionMask.current = union;
      };
      im.src = src;
    }
  }, []);

  useEffect(() => {
    if (reduce) {
      setShown("rest");
      return;
    }
    const coarse = window.matchMedia("(pointer: coarse)").matches;

    const faceBox = () => root.current?.getBoundingClientRect() ?? null;

    const hitsFigure = (clientX: number, clientY: number) => {
      const r = faceBox();
      const mask = unionMask.current;
      if (!r || !mask) return false;
      const u = (clientX - r.left) / r.width;
      const v = (clientY - r.top) / r.height;
      if (u < 0 || v < 0 || u >= 1 || v >= 1) return false;
      const x = Math.min(MASK_W - 1, Math.max(0, Math.floor(u * MASK_W)));
      const y = Math.min(MASK_H - 1, Math.max(0, Math.floor(v * MASK_H)));
      return mask[y * MASK_W + x] > HIT_ALPHA;
    };

    const onMove = (e: PointerEvent) => {
      if (e.pointerType === "touch") return;
      const r = faceBox();
      if (!r) return;
      // Origin is the center of her eyes in the tight head-sticker crop.
      // Map so the face is rest, and each edge of the viewport is a full turn.
      const cx = r.left + r.width * 0.50;
      const cy = r.top + r.height * 0.39;
      const vx = e.clientX < cx ? cx : window.innerWidth - cx;
      const vy = e.clientY < cy ? cy : window.innerHeight - cy;
      target.current = {
        x: clamp(vx ? (e.clientX - cx) / vx : 0, -1, 1),
        y: clamp(vy ? (e.clientY - cy) / vy : 0, -1, 1),
      };
      lastPointer.current = performance.now();
      hasPointer.current = true;

      const over = hitsFigure(e.clientX, e.clientY);
      if (over) {
        if (!hovering.current) {
          hovering.current = true;
          hoverSince.current = performance.now();
        }
      } else {
        hovering.current = false;
      }
    };

    const onLeave = () => {
      hasPointer.current = false;
      hovering.current = false;
      if (!coarse) target.current = { x: 0, y: 0 };
    };

    const onOrient = (e: DeviceOrientationEvent) => {
      if (!coarse) return;
      if (hasPointer.current && performance.now() - lastPointer.current < 800)
        return;
      if (e.gamma == null || e.beta == null) return;
      target.current = {
        x: clamp(e.gamma / 16, -1, 1),
        y: clamp((e.beta - 50) / 22, -1, 1),
      };
      lastPointer.current = performance.now();
    };

    const onDown = (e: PointerEvent) => {
      if (e.button !== 0 || !e.isPrimary) return;
      if (!hitsFigure(e.clientX, e.clientY)) return;
      downAt.current = { t: performance.now(), x: e.clientX, y: e.clientY };
    };

    const onUp = (e: PointerEvent) => {
      const d = downAt.current;
      downAt.current = null;
      if (!d) return;
      const now = performance.now();
      const dist = Math.hypot(e.clientX - d.x, e.clientY - d.y);
      if (dist < 10 && now - d.t < 600 && hitsFigure(e.clientX, e.clientY)) {
        moodUntil.current = now + 1200;
        lastPointer.current = now;
      }
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerleave", onLeave);
    window.addEventListener("blur", onLeave);
    window.addEventListener("deviceorientation", onOrient);
    window.addEventListener("pointerdown", onDown);
    window.addEventListener("pointerup", onUp);
    let raf = 0;
    let last = performance.now();
    const tick = (now: number) => {
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      // On a phone with no tilt data, a slow figure-eight so the portrait still feels alive.
      if (coarse && !hasPointer.current && now - lastPointer.current > 700) {
        const u = now / 1000;
        target.current = {
          x: Math.sin(u * 0.55) * 0.72,
          y: Math.sin(u * 0.4 + 1.1) * 0.48,
        };
      }
      const k = 1 - Math.exp(-dt / 0.11);
      cur.current = {
        x: cur.current.x + (target.current.x - cur.current.x) * k,
        y: cur.current.y + (target.current.y - cur.current.y) * k,
      };

      if (nextBlink.current === 0) {
        nextBlink.current = now + 2200 + 3400 * Math.random();
      }

      let next: FrameName;
      if (now < moodUntil.current) {
        next = "smirk";
      } else {
        if (now >= nextBlink.current) {
          blinkStart.current = now;
          nextBlink.current = now + 2200 + 3400 * Math.random();
        }
        const o = now - blinkStart.current;
        if (o >= 0 && o < 180) {
          next = o < 55 || o > 125 ? "half" : "blink";
        } else if (!coarse && hovering.current && now - hoverSince.current > 100) {
          next = "pout";
        } else {
          next = gazeName(cur.current.x, cur.current.y);
        }
      }

      setShown((s) => (s === next ? s : next));
      raf = window.requestAnimationFrame(tick);
    };
    raf = window.requestAnimationFrame(tick);
    return () => {
      window.cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerleave", onLeave);
      window.removeEventListener("blur", onLeave);
      window.removeEventListener("deviceorientation", onOrient);
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);
    };
  }, [reduce]);

  const fadeMs = shown === "half" || shown === "blink" ? 25 : 80;
  const isExpr =
    shown === "pout" || shown === "smirk" || shown === "blink" || shown === "half";

  return (
    <span
      ref={root}
      role="img"
      aria-label={alt}
      data-living-portrait=""
      data-gaze-frame={shown}
      data-expression={isExpr ? shown : undefined}
      className={`relative block aspect-[665/647] ${className}`}
    >
      {/* Stable silhouette shadow so crossfades don't flicker a drop-shadow. */}
      <img
        src={GAZE.rest}
        alt=""
        width={665}
        height={647}
        aria-hidden
        draggable={false}
        className="pointer-events-none absolute inset-0 h-full w-full object-contain"
        style={{
          filter: "brightness(0) blur(8px)",
          opacity: 0.2,
          transform: "translate(5px, 7px)",
        }}
      />
      {ALL_FRAMES.map(({ name, src }) => (
        <img
          key={name}
          src={src}
          alt=""
          width={665}
          height={647}
          draggable={false}
          decoding="async"
          fetchPriority={name === "rest" ? "high" : "low"}
          aria-hidden
          className="absolute inset-0 h-full w-full object-contain"
          style={{
            opacity: (reduce ? name === "rest" : name === shown) ? 1 : 0,
            transition: reduce ? "none" : `opacity ${fadeMs}ms linear`,
          }}
        />
      ))}
    </span>
  );
}
