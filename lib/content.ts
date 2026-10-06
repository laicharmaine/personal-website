/**
 * Central placeholder content for Charmaine's personal site.
 * Everything marked DRAFT / [brackets] is meant to be replaced with real copy.
 */

export const site = {
  name: "Charmaine Lai",
  tagline: "Marketing mind → PM/PMM. Kellogg MBAi.",
  location: "Evanston, CT · targeting Bay Area",
  email: "hello@charmainelai.com", // DRAFT placeholder — replace with real email
  linkedin: "https://www.linkedin.com/in/charmainelai", // DRAFT — confirm URL
  github: "https://github.com/laicharmaine",
  headline:
    "I turn messy customer insight into products people actually want.",
};

export const nav = [
  { href: "/", label: "Home" },
  { href: "/experience", label: "Experience" },
  { href: "/projects", label: "Projects" },
  { href: "/writing", label: "Writing" },
  { href: "/contact", label: "Contact" },
] as const;

export const education = [
  {
    school: "Northwestern Kellogg School of Management",
    degree: "MBAi (Master in Business Administration + Artificial Intelligence)",
    period: "Expected 2027",
    bullets: [
      "[DRAFT] Exploring product management, product marketing, and consulting paths for summer 2027.",
      "[DRAFT] Coursework TBD — AI + strategy, customer insight, go-to-market.",
    ],
  },
  {
    school: "[Undergrad Institution]",
    degree: "[Degree / Major — e.g. Marketing, Communications]",
    period: "[Years]",
    bullets: [
      "[DRAFT] Replace with real undergrad highlights, leadership, or academic focus.",
    ],
  },
];

export const experience = [
  {
    company: "[Most Recent Company]",
    role: "[Role — e.g. Marketing Manager]",
    period: "[Start] – [End]",
    location: "[City]",
    bullets: [
      "[DRAFT] Led a campaign / product launch that drove X% lift in Y metric.",
      "[DRAFT] Partnered with product/sales to translate customer research into messaging.",
      "[DRAFT] Owned channel strategy (email, social, web) for [audience segment].",
    ],
  },
  {
    company: "[Earlier Company]",
    role: "[Role]",
    period: "[Start] – [End]",
    location: "[City]",
    bullets: [
      "[DRAFT] Built brand / content systems that scaled without losing voice.",
      "[DRAFT] Ran experiments on positioning; shipped the winner into GTM.",
    ],
  },
  {
    company: "[Internship / Early Role]",
    role: "[Role]",
    period: "[Start] – [End]",
    location: "[City]",
    bullets: [
      "[DRAFT] First taste of customer-facing work — research, storytelling, or growth.",
    ],
  },
];

export const skills = {
  product: [
    "Product sense & prioritization",
    "Customer research / interviews",
    "Roadmapping (learning)",
    "AI product literacy (MBAi)",
  ],
  marketing: [
    "Positioning & messaging",
    "Go-to-market",
    "Content & brand voice",
    "Campaign strategy",
  ],
  tools: [
    "[Analytics stack — e.g. Amplitude, Mixpanel]",
    "[Design — Figma]",
    "[CRM / email]",
    "SQL (learning)",
  ],
};

export const projects = [
  {
    slug: "case-study-one",
    title: "[Case Study] Repositioning a B2B product",
    oneLiner:
      "How we reframed the value prop after talking to 20 customers — and what changed in the funnel.",
    tags: ["PMM", "Positioning", "Research"],
    status: "draft" as const,
  },
  {
    slug: "case-study-two",
    title: "[Side Project] Tabby — splitting the group tab",
    oneLiner:
      "A small product experiment: claim your own items so nobody argues over the check.",
    tags: ["Product", "Indie", "UX"],
    status: "draft" as const,
  },
  {
    slug: "case-study-three",
    title: "[MBA Project] AI + GTM for [industry]",
    oneLiner:
      "Kellogg MBAi team project — pairing model capability with a go-to-market story that lands.",
    tags: ["MBAi", "AI", "Strategy"],
    status: "draft" as const,
  },
];

export type Post = {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  tags: string[];
  draft: boolean;
  body: string[];
};

export const posts: Post[] = [
  {
    slug: "marketing-to-pm",
    title: "Why a marketer belongs in product",
    date: "2026-09-15",
    excerpt:
      "DRAFT: The skills that transfer — and the ones I'm deliberately building at Kellogg.",
    tags: ["Career", "PM", "PMM"],
    draft: true,
    body: [
      "This is a draft post stub. Replace with your real take.",
      "The core idea: great marketers already live in the gap between what customers say and what the product does. That's half of product work.",
      "At Kellogg MBAi I'm filling in the other half — technical literacy, prioritization frameworks, and the discipline of shipping.",
      "If you're a recruiter reading this: ask me about a campaign that taught me more about product than any roadmap slide.",
    ],
  },
  {
    slug: "notes-on-positioning",
    title: "Notes on positioning that don't put people to sleep",
    date: "2026-08-02",
    excerpt:
      "DRAFT: Positioning isn't a tagline workshop. It's a bet on who you serve first.",
    tags: ["PMM", "Messaging"],
    draft: true,
    body: [
      "Draft stub — rewrite in your voice.",
      "Most positioning docs fail because they're consensus documents. Good positioning makes someone slightly uncomfortable — usually the people who aren't the target customer.",
      "A working definition I like: if your ideal customer doesn't feel recognized, and everyone else doesn't feel mildly excluded, you haven't positioned yet.",
      "More examples and war stories to come once I replace this placeholder.",
    ],
  },
  {
    slug: "summer-2027-search",
    title: "What I'm looking for in summer 2027",
    date: "2026-10-01",
    excerpt:
      "DRAFT: PM / PMM (and exploring consulting) — preferably Bay Area. Here's the filter.",
    tags: ["Recruiting", "Career"],
    draft: true,
    body: [
      "Open draft for recruiting season. Customize before sharing widely.",
      "I'm targeting product management and product marketing internships for summer 2027, with consulting as an exploratory track. Prefer Bay Area; open to teams that move fast and talk to customers.",
      "What I bring: marketing craft, narrative clarity, and a Kellogg MBAi toolkit for AI-aware product work.",
      "What I want to learn: how strong PMs and PMMs decide what *not* to build — and how they earn trust across engineering, design, and GTM.",
    ],
  },
];

export function getPost(slug: string): Post | undefined {
  return posts.find((p) => p.slug === slug);
}
