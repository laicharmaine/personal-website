"use client";

import Script from "next/script";

/** Homepage-only sticker cover. Behavior lives in /public/reveal.js. */
export default function RevealCover() {
  return (
    <>
      <div id="reveal-sheet" />
      <Script src="/reveal.js" strategy="afterInteractive" />
    </>
  );
}
