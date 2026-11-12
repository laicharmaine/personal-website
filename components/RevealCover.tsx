"use client";

import { useEffect, useRef } from "react";
import { startReveal } from "@/lib/reveal";

/** Homepage-only sticker cover. Logic lives in lib/reveal.ts and runs in an effect
 *  so we never inject a next/script tag or detach React's #reveal-sheet node. */
export default function RevealCover() {
  const sheetRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const sheet = sheetRef.current;
    if (!sheet) return;
    return startReveal(sheet);
  }, []);

  return <div id="reveal-sheet" ref={sheetRef} />;
}
