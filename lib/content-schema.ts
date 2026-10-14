import { defaultContent, type SiteContent } from "./content";

/**
 * Server-side validation for content saved from the editor. Every field is
 * checked against this schema: unknown keys are dropped, wrong types fall
 * back to the default, strings are length-limited, and links/images must use
 * safe URL schemes.
 */
type Leaf = "str" | "text" | "url" | "img" | "shape" | "email" | "layout";
type Schema =
  | Leaf
  | { obj: Record<string, Schema>; optional?: string[] }
  | { arr: Schema; max: number };

const obj = (o: Record<string, Schema>, optional: string[] = []): Schema => ({
  obj: o,
  optional,
});
const arr = (a: Schema, max = 60): Schema => ({ arr: a, max });

const stat = obj({ value: "str", label: "str" });
const link = obj({ label: "str", href: "url" });

const schema: Schema = obj({
  site: obj({
    name: "str",
    tagline: "str",
    email: "email",
    linkedin: "url",
    github: "url",
    description: "text",
  }),
  home: obj({
    windowTitle: "str",
    sticker: "str",
    hookA: "str",
    hookB: "str",
    intro: "text",
    photo: obj({ src: "img", alt: "text", caption: "str" }, [
      "src",
      "alt",
      "caption",
    ]),
    ctaWork: "str",
    ctaEmail: "str",
    proof: arr(stat, 12),
    strengths: arr("str", 30),
    workHeading: "str",
    workAll: "str",
    workWindow: "str",
    funLead: "str",
    funText: "str",
    ctaHeading: "str",
    resume: "str",
  }),
  projectsPage: obj({
    path: "str",
    title: "str",
    intro: "text",
    window: "str",
    problemLabel: "str",
    didLabel: "str",
    resultLabel: "str",
    sideHeading: "str",
    offTitle: "str",
    offLine: "text",
    offLink: "str",
  }),
  projects: arr(
    obj(
      {
        slug: "str",
        title: "str",
        org: "str",
        year: "str",
        line: "text",
        metric: stat,
        problem: "text",
        did: "text",
        result: "text",
        media: obj({ src: "img", alt: "text", href: "url", caption: "str" }, [
          "src",
          "alt",
          "href",
          "caption",
        ]),
        badge: link,
        links: arr(link, 6),
      },
      ["media", "badge", "links"],
    ),
    30,
  ),
  sideProjects: arr(
    obj(
      {
        title: "str",
        line: "text",
        links: arr(link, 6),
        note: "str",
        media: obj({ src: "img", alt: "text", href: "url", caption: "str" }, [
          "src",
          "alt",
          "href",
          "caption",
        ]),
      },
      ["links", "note", "media"],
    ),
    20,
  ),
  experiencePage: obj({
    path: "str",
    title: "str",
    intro: "text",
    window: "str",
    educationHeading: "str",
    alsoHeading: "str",
  }),
  experience: arr(
    obj(
      {
        company: "str",
        about: "text",
        location: "str",
        period: "str",
        roles: arr(
          obj(
            {
              title: "str",
              period: "str",
              bullets: arr("text", 12),
              work: link,
            },
            ["work"],
          ),
          12,
        ),
      },
      ["about"],
    ),
    20,
  ),
  education: arr(
    obj({ school: "str", degree: "text", period: "str", note: "text" }),
    10,
  ),
  resumeExtras: arr(obj({ label: "str", value: "text" }), 15),
  writingPage: obj({ path: "str", title: "str", intro: "text", window: "str" }),
  articles: arr(
    obj({ title: "text", outlet: "str", date: "str", href: "url" }),
    40,
  ),
  funPage: obj({ path: "str", title: "str", intro: "text" }),
  fun: arr(
    obj(
      {
        slug: "str",
        title: "str",
        file: "str",
        line: "text",
        links: arr(link, 6),
        shape: "shape",
        media: arr(
          obj({ src: "img", alt: "text", href: "url", caption: "str" }, [
            "src",
            "alt",
            "href",
            "caption",
          ]),
          24,
        ),
        stat,
      },
      ["links", "stat"],
    ),
    20,
  ),
  contactPage: obj({
    path: "str",
    title: "str",
    intro: "text",
    window: "str",
    emailLabel: "str",
    button: "str",
    links: arr(link, 12),
  }),
  footer: obj({ tagline: "str" }),
  layout: "layout",
});

const CONTROL = /[\u0000-\u0009\u000B-\u001F\u007F]/g;

function cleanString(v: string, max: number) {
  return v.replace(CONTROL, "").replace(/\r\n?/g, "\n").slice(0, max);
}

function isSafeUrl(v: string) {
  const s = v.trim();
  if (s === "" || s.startsWith("/") || s.startsWith("#"))
    return !s.startsWith("//");
  return /^(https?:\/\/|mailto:)/i.test(s);
}

export function isAllowedImage(v: string) {
  if (v === "") return true;
  if (/^\/fun\/[\w.-]+$/.test(v)) return true;
  return /^https:\/\/[a-z0-9]+\.public\.blob\.vercel-storage\.com\/[\w./%-]+$/i.test(
    v,
  );
}

const LAYOUT_ID = /^[a-z0-9][\w.:-]{0,79}$/i;
const pick = <T extends string>(v: unknown, ok: readonly T[]) =>
  ok.includes(v as T) ? (v as T) : undefined;

/** Editor layout settings: { [blockId]: { w, size, align, img, hidden, order } }. Unknown keys/values are dropped. */
function sanitizeLayout(value: unknown): Record<string, unknown> {
  const out: Record<string, unknown> = {};
  if (!value || typeof value !== "object" || Array.isArray(value)) return out;
  for (const [id, raw] of Object.entries(
    value as Record<string, unknown>,
  ).slice(0, 400)) {
    if (
      !LAYOUT_ID.test(id) ||
      !raw ||
      typeof raw !== "object" ||
      Array.isArray(raw)
    )
      continue;
    const r = raw as Record<string, unknown>;
    const l: Record<string, unknown> = {};
    const w = pick(r.w, ["s", "m", "l", "full"] as const);
    const size = pick(r.size, ["sm", "lg"] as const);
    const align = pick(r.align, ["center"] as const);
    const img = pick(r.img, ["s", "l"] as const);
    if (w) l.w = w;
    if (size) l.size = size;
    if (align) l.align = align;
    if (img) l.img = img;
    const num = (v: unknown, lo: number, hi: number) =>
      typeof v === "number" && Number.isFinite(v)
        ? Math.round(Math.min(hi, Math.max(lo, v)))
        : undefined;
    const wp = num(r.wp, 20, 100);
    const px = num(r.px, 48, 640);
    if (wp) l.wp = wp;
    if (px) l.px = px;
    if (r.hidden === true) l.hidden = true;
    if (Array.isArray(r.order)) {
      const order = r.order
        .filter(
          (x): x is string => typeof x === "string" && /^[\w.-]{1,60}$/.test(x),
        )
        .slice(0, 20);
      if (order.length) l.order = order;
    }
    if (Object.keys(l).length) out[id] = l;
  }
  return out;
}

function sanitize(value: unknown, s: Schema, fallback: unknown): unknown {
  if (s === "layout") return sanitizeLayout(value);
  if (typeof s === "string") {
    const fb = typeof fallback === "string" ? fallback : "";
    if (typeof value !== "string") return fb;
    switch (s) {
      case "str":
        return cleanString(value, 400);
      case "text":
        return cleanString(value, 3000);
      case "email":
        return /^[^\s@<>"]+@[^\s@<>"]+\.[^\s@<>"]+$/.test(value.trim())
          ? value.trim().slice(0, 200)
          : fb;
      case "url":
        return isSafeUrl(value) ? value.trim().slice(0, 2000) : fb;
      case "img":
        return isAllowedImage(value.trim()) ? value.trim() : fb;
      case "shape":
        return ["portrait", "wide", "square"].includes(value)
          ? value
          : fb || "portrait";
    }
  }
  if ("arr" in s) {
    if (!Array.isArray(value)) return Array.isArray(fallback) ? fallback : [];
    return value.slice(0, s.max).map((v) => sanitize(v, s.arr, undefined));
  }
  const src =
    value && typeof value === "object" && !Array.isArray(value)
      ? (value as Record<string, unknown>)
      : {};
  const fb =
    fallback && typeof fallback === "object"
      ? (fallback as Record<string, unknown>)
      : {};
  const out: Record<string, unknown> = {};
  for (const [key, sub] of Object.entries(s.obj)) {
    const optional = s.optional?.includes(key);
    const has = src[key] !== undefined;
    if (optional && !has) continue;
    out[key] = sanitize(has ? src[key] : undefined, sub, fb[key]);
  }
  return out;
}

/** Validate untrusted content, filling anything missing from the defaults. */
export function sanitizeContent(value: unknown): SiteContent {
  return sanitize(value, schema, defaultContent) as SiteContent;
}
