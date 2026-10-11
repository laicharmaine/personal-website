import { defaultContent, type SiteContent } from "./content";

/**
 * Server-side validation for content saved from the editor. Every field is
 * checked against this schema: unknown keys are dropped, wrong types fall
 * back to the default, strings are length-limited, and links/images must use
 * safe URL schemes.
 */
type Leaf = "str" | "text" | "url" | "img" | "shape" | "email";
type Schema = Leaf | { obj: Record<string, Schema>; optional?: string[] } | { arr: Schema; max: number };

const obj = (o: Record<string, Schema>, optional: string[] = []): Schema => ({ obj: o, optional });
const arr = (a: Schema, max = 60): Schema => ({ arr: a, max });

const stat = obj({ value: "str", label: "str" });
const link = obj({ label: "str", href: "url" });

const schema: Schema = obj({
  site: obj({ name: "str", tagline: "str", email: "email", linkedin: "url", github: "url", description: "text" }),
  home: obj({
    windowTitle: "str",
    sticker: "str",
    hookA: "str",
    hookB: "str",
    intro: "text",
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
    obj({
      slug: "str",
      title: "str",
      org: "str",
      year: "str",
      line: "text",
      metric: stat,
      problem: "text",
      did: "text",
      result: "text",
    }),
    30,
  ),
  sideProjects: arr(obj({ title: "str", line: "text", links: arr(link, 6), note: "str" }, ["links", "note"]), 20),
  experiencePage: obj({ path: "str", title: "str", intro: "text", window: "str", educationHeading: "str", alsoHeading: "str" }),
  experience: arr(
    obj({
      company: "str",
      location: "str",
      period: "str",
      roles: arr(obj({ title: "str", period: "str", bullets: arr("text", 12) }), 12),
    }),
    20,
  ),
  education: arr(obj({ school: "str", degree: "text", period: "str", note: "text" }), 10),
  resumeExtras: arr(obj({ label: "str", value: "text" }), 15),
  writingPage: obj({ path: "str", title: "str", intro: "text", window: "str" }),
  articles: arr(obj({ title: "text", outlet: "str", date: "str", href: "url" }), 40),
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
        media: arr(obj({ src: "img", alt: "text", href: "url", caption: "str" }, ["src", "alt", "href", "caption"]), 24),
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
});

const CONTROL = /[\u0000-\u0009\u000B-\u001F\u007F]/g;

function cleanString(v: string, max: number) {
  return v.replace(CONTROL, "").replace(/\r\n?/g, "\n").slice(0, max);
}

function isSafeUrl(v: string) {
  const s = v.trim();
  if (s === "" || s.startsWith("/") || s.startsWith("#")) return !s.startsWith("//");
  return /^(https?:\/\/|mailto:)/i.test(s);
}

export function isAllowedImage(v: string) {
  if (v === "") return true;
  if (/^\/fun\/[\w.-]+$/.test(v)) return true;
  return /^https:\/\/[a-z0-9]+\.public\.blob\.vercel-storage\.com\/[\w./%-]+$/i.test(v);
}

function sanitize(value: unknown, s: Schema, fallback: unknown): unknown {
  if (typeof s === "string") {
    const fb = typeof fallback === "string" ? fallback : "";
    if (typeof value !== "string") return fb;
    switch (s) {
      case "str":
        return cleanString(value, 400);
      case "text":
        return cleanString(value, 3000);
      case "email":
        return /^[^\s@<>"]+@[^\s@<>"]+\.[^\s@<>"]+$/.test(value.trim()) ? value.trim().slice(0, 200) : fb;
      case "url":
        return isSafeUrl(value) ? value.trim().slice(0, 2000) : fb;
      case "img":
        return isAllowedImage(value.trim()) ? value.trim() : fb;
      case "shape":
        return ["portrait", "wide", "square"].includes(value) ? value : fb || "portrait";
    }
  }
  if ("arr" in s) {
    if (!Array.isArray(value)) return Array.isArray(fallback) ? fallback : [];
    return value.slice(0, s.max).map((v) => sanitize(v, s.arr, undefined));
  }
  const src = value && typeof value === "object" && !Array.isArray(value) ? (value as Record<string, unknown>) : {};
  const fb = fallback && typeof fallback === "object" ? (fallback as Record<string, unknown>) : {};
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
