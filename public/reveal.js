/* Full-cover downtown vinyl sheet that waits for a click, then flies off. Once per session. */
(function () {
  const KEY = "y2k-glossy2-reveal";
  const FLY = 560;
  const STAGGER = 40; // 8 waves * 40ms = 320ms
  const DT = "/stickers/dt/";
  const Y2K = "/stickers/";

  const ME = "/stickers/personal/";
  const FILL_BASE = [
    DT + "heart.svg", DT + "star-red.svg", DT + "star-black.svg", DT + "star-outline.svg",
    DT + "star-red-sm.svg", DT + "heart-lilac.svg", DT + "kisses.svg", DT + "lips.svg",
    DT + "bow.svg", DT + "cherries.svg", DT + "vinyl.svg", DT + "cassette.svg",
    DT + "disco.svg", DT + "cat.svg", DT + "teddy.svg", DT + "camera.svg",
    DT + "tv.svg", DT + "gramophone.svg", DT + "lipstick.svg", DT + "web.svg",
    DT + "nophone.svg", DT + "heart-eye.svg", DT + "broken-heart.svg", DT + "sunglasses.svg",
    DT + "headphones.svg", DT + "butterfly.svg", DT + "collage1.svg", DT + "collage2.svg",
    DT + "collage3.svg", Y2K + "cd.svg", Y2K + "cd2.svg", Y2K + "phone.svg",
    Y2K + "butterfly.svg",
  ];
  const PERSONAL = [
    ME + "hk-skyline.svg", ME + "hk-taxi.svg", ME + "star-ferry.svg",
    ME + "word-hongkong-zh.svg",
    ME + "gg-bridge.svg", ME + "cable-car.svg", ME + "fog.svg",
    ME + "cat-pair.svg", ME + "cat-cream.svg",
    ME + "notes.svg", ME + "mic.svg", ME + "speaker.svg",
    ME + "ferris.svg", ME + "palms.svg", ME + "cactus.svg", ME + "wristband.svg",
    ME + "desert-sun.svg",
    ME + "ice-skate.svg", ME + "snowflake.svg",
    ME + "scissors.svg", ME + "palette.svg", ME + "yarn.svg",
    ME + "washi.svg", ME + "glue-stick.svg", ME + "crayon.svg",
    ME + "egg-tart.svg", ME + "pineapple-bun.svg", ME + "bao.svg",
    ME + "boba.svg", ME + "cherry-pair.svg", ME + "strawberry.svg",
  ];
  const FILL = [];
  FILL_BASE.forEach((src, i) => {
    FILL.push(src);
    FILL.push(PERSONAL[i % PERSONAL.length]);
  });

  function densePieces() {
    const out = [];
    let i = 0;
    for (let y = -8; y <= 108; y += 8) {
      for (let x = -8; x <= 108; x += 8) {
        const jx = ((x * 17 + y * 9) % 7) - 3;
        const jy = ((x * 11 + y * 13) % 7) - 3;
        const src = FILL[i % FILL.length];
        i += 1;
        out.push({
          src: src,
          x: x + jx,
          y: y + jy,
          w: 17 + (i % 9),
          r: ((i * 17) % 51) - 25,
          z: 2 + (i % 6),
        });
      }
    }
    const featured = [
      { src: DT + "word-rock-star.svg", x: 22, y: 38, w: 26, r: -8, z: 38 },
      { src: ME + "palette.svg", x: 78, y: 38, w: 22, r: 5, z: 38 },
      { src: DT + "word-downtown-stack.svg", x: 16, y: 16, w: 22, r: -10, z: 36 },
      { src: DT + "word-ny-loves-you.svg", x: 88, y: 12, w: 15, r: 8, z: 36 },
      { src: DT + "word-play-it-loud.svg", x: 78, y: 24, w: 24, r: 4, z: 35 },
      { src: DT + "word-after-hours.svg", x: 28, y: 90, w: 24, r: -4, z: 35 },
      { src: DT + "word-downtown-girl.svg", x: 72, y: 88, w: 26, r: 6, z: 35 },
      { src: DT + "cat.svg", x: 10, y: 28, w: 16, r: -8, z: 32 },
      { src: DT + "lips.svg", x: 90, y: 30, w: 14, r: 12, z: 32 },
      { src: DT + "vinyl.svg", x: 8, y: 72, w: 16, r: -16, z: 30 },
      { src: DT + "disco.svg", x: 92, y: 72, w: 14, r: 8, z: 30 },
      { src: Y2K + "phone.svg", x: 92, y: 50, w: 11, r: -10, z: 33 },
      { src: Y2K + "cd.svg", x: 10, y: 50, w: 14, r: 16, z: 33 },
      { src: ME + "boba.svg", x: 20, y: 18, w: 16, r: -6, z: 37 },
      { src: ME + "word-hongkong-zh.svg", x: 84, y: 16, w: 16, r: 8, z: 37 },
      { src: ME + "hk-skyline.svg", x: 48, y: 14, w: 28, r: -2, z: 36 },
      { src: ME + "hk-taxi.svg", x: 12, y: 62, w: 20, r: -8, z: 37 },
      { src: ME + "star-ferry.svg", x: 88, y: 64, w: 22, r: 6, z: 37 },
      { src: ME + "gg-bridge.svg", x: 22, y: 80, w: 26, r: 3, z: 36 },
      { src: ME + "cable-car.svg", x: 80, y: 80, w: 24, r: -5, z: 37 },
      { src: ME + "cable-car.svg", x: 8, y: 42, w: 16, r: -12, z: 36 },
      { src: ME + "fog.svg", x: 50, y: 92, w: 24, r: 2, z: 34 },
      { src: ME + "cat-pair.svg", x: 68, y: 14, w: 22, r: 5, z: 38 },
      { src: ME + "cat-cream.svg", x: 34, y: 10, w: 16, r: -7, z: 37 },
      { src: ME + "notes.svg", x: 90, y: 42, w: 16, r: 10, z: 36 },
      { src: ME + "mic.svg", x: 16, y: 88, w: 14, r: -6, z: 36 },
      { src: ME + "speaker.svg", x: 92, y: 88, w: 14, r: 8, z: 36 },
      { src: ME + "ferris.svg", x: 36, y: 86, w: 18, r: -4, z: 37 },
      { src: ME + "palms.svg", x: 62, y: 90, w: 16, r: 7, z: 36 },
      { src: ME + "desert-sun.svg", x: 50, y: 6, w: 24, r: 2, z: 37 },
      { src: ME + "wristband.svg", x: 10, y: 8, w: 18, r: -16, z: 36 },
      { src: ME + "cactus.svg", x: 78, y: 6, w: 20, r: 5, z: 36 },
      { src: ME + "ice-skate.svg", x: 14, y: 48, w: 16, r: -14, z: 37 },
      { src: ME + "ice-skate.svg", x: 48, y: 82, w: 22, r: 3, z: 37 },
      { src: ME + "snowflake.svg", x: 8, y: 80, w: 13, r: 15, z: 35 },
      { src: ME + "scissors.svg", x: 86, y: 28, w: 16, r: 12, z: 36 },
      { src: ME + "yarn.svg", x: 32, y: 22, w: 16, r: -8, z: 36 },
      { src: ME + "washi.svg", x: 70, y: 22, w: 15, r: 8, z: 35 },
      { src: ME + "glue-stick.svg", x: 10, y: 36, w: 12, r: -6, z: 35 },
      { src: ME + "crayon.svg", x: 90, y: 60, w: 12, r: 16, z: 35 },
      { src: ME + "egg-tart.svg", x: 16, y: 74, w: 18, r: -4, z: 37 },
      { src: ME + "pineapple-bun.svg", x: 84, y: 74, w: 18, r: 6, z: 37 },
      { src: ME + "bao.svg", x: 36, y: 8, w: 16, r: 4, z: 36 },
      { src: ME + "strawberry.svg", x: 62, y: 8, w: 15, r: -6, z: 36 },
      { src: ME + "cherry-pair.svg", x: 88, y: 88, w: 16, r: 10, z: 36 },
    ];
    return out.concat(featured);
  }

  const PIECES = densePieces();


  function prefersReduce() {
    return window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }
  function params() {
    try { return new URLSearchParams(location.search); } catch { return new URLSearchParams(); }
  }
  function shouldPlay() {
    const q = params();
    if (q.get("reveal") === "force" || q.get("reveal") === "1") return true;
    if (q.get("reveal") === "skip" || q.get("reveal") === "done") return false;
    try { if (sessionStorage.getItem(KEY)) return false; } catch {}
    return true;
  }
  function isTouch() {
    try {
      return (window.matchMedia && window.matchMedia("(pointer: coarse)").matches)
        || (navigator.maxTouchPoints || 0) > 0;
    } catch { return false; }
  }

  function sheetEl() {
    let el = document.getElementById("reveal-sheet");
    if (!el) {
      el = document.createElement("div");
      el.id = "reveal-sheet";
      el.setAttribute("aria-hidden", "true");
      document.body.prepend(el);
    }
    return el;
  }

  function populate(el) {
    el.innerHTML = "";
    PIECES.forEach((p, i) => {
      const img = document.createElement("img");
      img.className = "reveal-piece";
      img.src = p.src;
      img.alt = "";
      img.draggable = false;
      const wave = i % 8;
      const x = p.x - 50;
      const y = p.y - 50;
      const len = Math.hypot(x, y) || 1;
      const dist = 78;
      img.style.cssText = [
        `left:${p.x}%`,
        `top:${p.y}%`,
        `width:${p.w}vmin`,
        `z-index:${p.z || 5}`,
        `transform:translate(-50%,-50%) rotate(${p.r}deg)`,
        `--rot:${p.r}deg`,
        `--rest:translate(-50%,-50%) rotate(${p.r}deg)`,
        `--dx:${(x / len) * dist}vw`,
        `--dy:${(y / len) * dist}vh`,
        `--spin:${(x + y >= 0 ? 1 : -1) * (48 + wave * 6)}deg`,
        `--delay:${wave * STAGGER}ms`,
      ].join(";");
      if (i % 13 === 4 || (p.z && p.z >= 32 && i % 2 === 0)) {
        img.classList.add("is-wiggling");
        img.style.setProperty("--wiggle-delay", ((i * 97) % 1800) + "ms");
      }
      el.appendChild(img);
    });
    addHero(el);
    addPrompt(el);
  }

  function addHero(el) {
    const wrap = document.createElement("div");
    wrap.className = "reveal-piece reveal-hero";
    wrap.setAttribute("aria-hidden", "true");
    wrap.style.cssText = [
      "left:50%",
      "top:50%",
      "z-index:70",
      "transform:translate(-50%,-50%)",
      "--rot:0deg",
      "--rest:translate(-50%,-50%)",
      "--dx:0vw",
      "--dy:-36vh",
      "--spin:-12deg",
      "--delay:40ms",
    ].join(";");
    const img = document.createElement("img");
    img.className = "reveal-hero-mark";
    img.src = DT + "word-charmaine-os.svg";
    img.alt = "";
    img.draggable = false;
    wrap.appendChild(img);
    el.appendChild(wrap);
  }

  function addPrompt(el) {
    const prompt = document.createElement("div");
    prompt.className = "reveal-piece reveal-prompt";
    prompt.setAttribute("aria-hidden", "true");
    const label = isTouch() ? "tap to peel" : "click to open";
    prompt.innerHTML = '<span class="prompt-inner"><span class="prompt-copy">' + label + ' <span class="prompt-star" aria-hidden="true">✦</span></span></span>';
    prompt.style.cssText = [
      "left:50%",
      "top:50%",
      "z-index:80",
      "transform:translate(-50%,-50%) translateY(var(--prompt-shift))",
      "--rot:0deg",
      "--rest:translate(-50%,-50%) translateY(var(--prompt-shift))",
      "--dx:0vw",
      "--dy:42vh",
      "--spin:-18deg",
      "--delay:80ms",
    ].join(";");
    el.appendChild(prompt);
  }

  let holdTimer, doneTimer, finished = false;
  let detachWait = function () {};

  function removeSheet() {
    document.documentElement.classList.remove("has-reveal", "is-revealing");
    const el = document.getElementById("reveal-sheet");
    if (el) el.remove();
  }

  function finish(remember) {
    detachWait();
    clearTimeout(holdTimer);
    clearTimeout(doneTimer);
    removeSheet();
    if (!finished && remember) {
      try { sessionStorage.setItem(KEY, "1"); } catch {}
    }
    finished = true;
  }

  function leave() {
    const el = document.getElementById("reveal-sheet");
    if (!el || finished) return;
    detachWait();
    document.documentElement.classList.add("is-revealing");
    el.style.pointerEvents = "none";
    el.setAttribute("aria-hidden", "true");
    el.removeAttribute("tabindex");
    if (prefersReduce()) {
      el.classList.add("is-fading");
      doneTimer = setTimeout(() => finish(true), 280);
      return;
    }
    el.classList.add("is-leaving");
    doneTimer = setTimeout(() => finish(true), FLY + STAGGER * 8 + 80);
  }

  function skip() { finish(true); }

  function armWait(el) {
    el.setAttribute("role", "button");
    el.setAttribute("aria-label", "Open site");
    el.setAttribute("tabindex", "0");
    el.removeAttribute("aria-hidden");
    const onKey = (ev) => {
      if (finished) return;
      if (ev.key !== "Enter" && ev.key !== " " && ev.key !== "Escape") return;
      ev.preventDefault();
      leave();
    };
    const onClick = (ev) => {
      if (finished) return;
      ev.preventDefault();
      leave();
    };
    detachWait = function () {
      el.removeEventListener("click", onClick);
      el.removeEventListener("keydown", onKey);
      window.removeEventListener("keydown", onKey, true);
    };
    el.addEventListener("click", onClick);
    el.addEventListener("keydown", onKey);
    window.addEventListener("keydown", onKey, true);
  }

  function play() {
    document.documentElement.classList.add("has-reveal");
    const el = sheetEl();
    populate(el);
    finished = false;
    el.classList.remove("is-leaving", "is-fading", "is-mid");
    document.documentElement.classList.remove("is-revealing");
    armWait(el);
  }

  function goto(state) {
    document.documentElement.classList.add("has-reveal");
    const el = sheetEl();
    populate(el);
    finished = false;
    clearTimeout(holdTimer);
    clearTimeout(doneTimer);
    detachWait();
    el.classList.remove("is-leaving", "is-mid", "is-fading");
    if (state === "mid") {
      document.documentElement.classList.add("is-revealing");
      el.classList.add("is-mid");
      el.setAttribute("aria-hidden", "true");
      el.removeAttribute("tabindex");
    } else if (state === "done" || state === "revealed") {
      finish(false);
    } else {
      document.documentElement.classList.remove("is-revealing");
      armWait(el);
    }
  }

  window.__y2kReveal = { play, skip, goto, finish, populate };

  const q = params().get("reveal");
  if (q === "cover") {
    document.documentElement.classList.add("has-reveal");
    if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", () => goto("cover"));
    else goto("cover");
    return;
  }
  if (q === "mid") {
    document.documentElement.classList.add("has-reveal");
    if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", () => goto("mid"));
    else goto("mid");
    return;
  }
  if (q === "done" || q === "skip") {
    removeSheet();
    return;
  }

  if (!shouldPlay()) {
    removeSheet();
    return;
  }
  document.documentElement.classList.add("has-reveal");
  const start = () => play();
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", start);
  else start();
})();
