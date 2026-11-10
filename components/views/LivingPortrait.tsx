"use client";

import { useEffect, useRef, useState } from "react";

/** 5x5 gaze/head-turn frames. Center (r2c2) is the real photo crop; the rest are generated variants. */
export const GAZE_ROWS = 5;
export const GAZE_COLS = 5;
export const GAZE_CENTER = 2 * GAZE_COLS + 2;
export const GAZE_FRAMES = Array.from(
  { length: GAZE_ROWS * GAZE_COLS },
  (_, i) => `/fun/gaze/r${Math.floor(i / GAZE_COLS)}c${i % GAZE_COLS}.webp`,
);

/** Live gaze is tied to this portrait. A swapped photo in the editor falls back to a still. */
const LIVE_SOURCES = new Set([
  "/fun/charmaine-portrait.webp",
  GAZE_FRAMES[GAZE_CENTER],
]);

export function hasGazeFrames(src?: string) {
  return Boolean(src && LIVE_SOURCES.has(src));
}

function clamp(n: number, a: number, b: number) {
  return Math.max(a, Math.min(b, n));
}

function cell(x: number, y: number) {
  const col = Math.round(((clamp(x, -1, 1) + 1) / 2) * (GAZE_COLS - 1));
  const row = Math.round(((clamp(y, -1, 1) + 1) / 2) * (GAZE_ROWS - 1));
  return row * GAZE_COLS + col;
}

/**
 * Cursor-following portrait for the /contact "hi.jpg" window.
 *
 * Frames are preloaded webp. A smoothed gaze vector picks the nearest cell.
 * Desktop: the face follows the cursor (page-wide). Touch/mobile: device tilt
 * if the browser already provides it, otherwise a gentle idle loop.
 * `prefers-reduced-motion` shows only the still center frame.
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
  const [idx, setIdx] = useState(GAZE_CENTER);
  const [reduce, setReduce] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduce(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    // Warm the decoder so the first turn isn't a blank frame.
    for (const src of GAZE_FRAMES) {
      const im = new Image();
      im.decoding = "async";
      im.src = src;
    }
  }, []);

  useEffect(() => {
    if (reduce) {
      setIdx(GAZE_CENTER);
      return;
    }
    const coarse = window.matchMedia("(pointer: coarse)").matches;

    const onMove = (e: PointerEvent) => {
      if (e.pointerType === "touch") return;
      const el = root.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      // Origin is her face, slightly left and high in the 4:5 crop.
      // Map so the face is rest, and each edge of the viewport is a full turn
      // that way — the portrait sits on the left, so a fixed pixel radius
      // would barely reach a left-looking frame.
      const cx = r.left + r.width * 0.42;
      const cy = r.top + r.height * 0.3;
      const vx = e.clientX < cx ? cx : window.innerWidth - cx;
      const vy = e.clientY < cy ? cy : window.innerHeight - cy;
      target.current = {
        x: clamp(vx ? (e.clientX - cx) / vx : 0, -1, 1),
        y: clamp(vy ? (e.clientY - cy) / vy : 0, -1, 1),
      };
      lastPointer.current = performance.now();
      hasPointer.current = true;
    };
    const onLeave = () => {
      hasPointer.current = false;
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

    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerleave", onLeave);
    window.addEventListener("blur", onLeave);
    window.addEventListener("deviceorientation", onOrient);
    let raf = 0;
    let last = performance.now();
    const tick = (now: number) => {
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      // On a phone with no tilt data, a slow figure-eight so the portrait still feels alive.
      if (
        coarse &&
        !hasPointer.current &&
        now - lastPointer.current > 700
      ) {
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
      const next = cell(cur.current.x, cur.current.y);
      setIdx((i) => (i === next ? i : next));
      raf = window.requestAnimationFrame(tick);
    };
    raf = window.requestAnimationFrame(tick);
    return () => {
      window.cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerleave", onLeave);
      window.removeEventListener("blur", onLeave);
      window.removeEventListener("deviceorientation", onOrient);
    };
  }, [reduce]);

  return (
    <span
      ref={root}
      role="img"
      aria-label={alt}
      data-living-portrait=""
      data-gaze-frame={idx}
      className={`relative block aspect-[4/5] overflow-hidden rounded-[3px] bg-desk ${className}`}
    >
      {GAZE_FRAMES.map((src, i) => (
        <img
          key={src}
          src={src}
          alt=""
          width={800}
          height={1000}
          draggable={false}
          decoding="async"
          // Center is the still everyone should see first; the rest preload in the background.
          fetchPriority={i === GAZE_CENTER ? "high" : "low"}
          aria-hidden
          className="absolute inset-0 h-full w-full object-cover"
          style={{
            opacity: (reduce ? i === GAZE_CENTER : i === idx) ? 1 : 0,
            transition: reduce ? "none" : "opacity 80ms linear",
          }}
        />
      ))}
    </span>
  );
}
