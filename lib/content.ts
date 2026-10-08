/**
 * Site content for Charmaine Lai. Facts and numbers come from her résumé
 * or from verified public sources (links checked Oct 2026).
 */

export const site = {
  name: "Charmaine Lai",
  tagline: "Marketer by craft. Product by curiosity.",
  email: "charmaine.lai@kellogg.northwestern.edu",
  linkedin: "https://www.linkedin.com/in/charmaine-lai",
  github: "https://github.com/laicharmaine",
  description:
    "Charmaine Lai: ex-Numenta AI marketer, now an MBA + MS in AI at Northwestern (Kellogg + McCormick), looking for a summer 2027 PM / PMM internship in the Bay Area.",
};

export const cat = {
  handle: "@litto_lychee",
  tiktok: "https://www.tiktok.com/@litto_lychee",
  instagram: "https://www.instagram.com/litto_lychee/",
};

export const nav = [
  { href: "/projects", label: "Projects" },
  { href: "/experience", label: "Experience" },
  { href: "/writing", label: "Writing" },
  { href: "/contact", label: "Contact" },
] as const;

/** Home proof points: big number + 2–4 word label. */
export const proof = [
  { value: "3", label: "launch-quarter partnerships" },
  { value: "65%", label: "peak YoY traffic lift" },
  { value: "Top 5", label: "Bill Gates’ 2021 books" },
  { value: "450k+", label: "followers (it’s a cat)" },
];

export const strengths = [
  "Go-to-market",
  "Positioning",
  "Product launches",
  "Dogfooding",
  "Market research",
  "Technical writing",
  "Community",
  "AI products",
];

export type Link = { label: string; href: string };

export type Project = {
  slug: string;
  title: string;
  org: string;
  year: string;
  line: string;
  metric: { value: string; label: string };
  problem: string;
  did: string;
  result: string;
};

export const projects: Project[] = [
  {
    slug: "nupic-launch",
    title: "Launching NuPIC",
    org: "Numenta",
    year: "2023–25",
    line: "Took a CPU-based generative AI platform to market.",
    metric: { value: "3", label: "partnerships in quarter one" },
    problem: "A new generative AI platform that runs on CPUs, and no map of who would buy it.",
    did: "Market research, multi-channel GTM, dogfooding sessions, API docs, 5+ conferences.",
    result: "3 strategic partnerships in the launch quarter, 3 product iterations, +110% event leads.",
  },
  {
    slug: "numenta-website",
    title: "Numenta’s website + brand",
    org: "Numenta",
    year: "2021–23",
    line: "Rebuilt the site and brand around the product strategy.",
    metric: { value: "65%", label: "peak YoY traffic lift" },
    problem: "The site and brand lagged behind where the product was going.",
    did: "Coordinated the full revamp, then owned the site: domain, front end, back end.",
    result: "Traffic up as much as 65% year over year.",
  },
  {
    slug: "a-thousand-brains",
    title: "A Thousand Brains launch",
    org: "Numenta",
    year: "2020–21",
    line: "Launched Jeff Hawkins’ book with a podcast and live events.",
    metric: { value: "Top 5", label: "Bill Gates’ 2021 books" },
    problem: "A book about the brain and AI had to reach past the neuroscience crowd.",
    did: "Multi-channel launch, a companion podcast series, and live events.",
    result: "Bill Gates named it one of his five favorite books of 2021.",
  },
  {
    slug: "brains-at-bay",
    title: "Brains@Bay",
    org: "Numenta",
    year: "2021–23",
    line: "Hosted a quarterly neuroscience + AI meetup.",
    metric: { value: "200+", label: "attendees" },
    problem: "Numenta wanted a bigger voice where neuroscience meets AI.",
    did: "Organized and hosted a quarterly meetup for both research crowds.",
    result: "200+ attendees and more visibility for Numenta.",
  },
  {
    slug: "railroad-product",
    title: "Railroad product strategy",
    org: "YES International",
    year: "2025–26",
    line: "Turned buyer requirements in China into a product plan.",
    metric: { value: "$7M", label: "potential opportunities" },
    problem: "What do railroad buyers in China actually need, and what should the product lead with?",
    did: "Mapped market and procurement dynamics; ranked product capabilities; wrote deployment recommendations.",
    result: "$7M in potential opportunities.",
  },
];

export type SideProject = { title: string; line: string; links?: Link[]; note?: string };

export const sideProjects: SideProject[] = [
  {
    title: "Tabby",
    line: "A no-account bill splitter for MBA happy hours. Scan, share a link, everyone claims their own.",
    links: [{ label: "Try it", href: "https://tabby-wmtt.onrender.com" }],
  },
  {
    title: "@litto_lychee",
    line: "I’m the Meowmager behind a flame-point Siamese with 450k+ followers.",
    links: [
      { label: "TikTok", href: "https://www.tiktok.com/@litto_lychee" },
      { label: "Instagram", href: "https://www.instagram.com/litto_lychee/" },
    ],
  },
  {
    title: "Dayline",
    line: "My to-dos, calendars, and recruiting pipeline on one screen.",
    note: "Private",
  },
];

export type Role = { title: string; period: string; bullets: string[] };
export type Job = { company: string; location: string; period: string; roles: Role[] };

export const experience: Job[] = [
  {
    company: "YES International",
    location: "Hong Kong",
    period: "2025–26",
    roles: [
      {
        title: "Product Consultant",
        period: "2025–26",
        bullets: [
          "Turned railroad buyers’ requirements in China into prioritized product capabilities, unlocking $7M in potential opportunities.",
        ],
      },
    ],
  },
  {
    company: "Numenta",
    location: "Redwood City, CA",
    period: "2020–25",
    roles: [
      {
        title: "Marketing Manager",
        period: "Sep 2023 – Jun 2025",
        bullets: [
          "Led go-to-market for NuPIC, a CPU-based generative AI platform: 3 strategic partnerships in the launch quarter.",
          "Ran dogfooding that shaped 3 product iterations; drove +110% event leads across 5+ conferences.",
        ],
      },
      {
        title: "Senior Marketing Specialist",
        period: "Sep 2021 – Aug 2023",
        bullets: [
          "Coordinated a website and brand revamp that lifted traffic up to 65% year over year.",
          "Hosted Brains@Bay, a quarterly neuroscience + AI meetup (200+ attendees).",
        ],
      },
      {
        title: "Marketing Associate",
        period: "Aug 2020 – Aug 2021",
        bullets: [
          "Launched Jeff Hawkins’ A Thousand Brains with a podcast and live events. Bill Gates made it a top-5 book of 2021.",
        ],
      },
    ],
  },
];

export const education = [
  {
    school: "Northwestern University",
    degree: "MBA + MS in Artificial Intelligence (MBAi) · Kellogg + McCormick",
    period: "2026 – Mar 2028",
    note: "",
  },
  {
    school: "UC Berkeley",
    degree: "BS, Environmental Economics and Policy",
    period: "2016–20",
    note: "AFX Dance Executive Director · Asian American Association President · DeCal instructor · Humanity First co-founder",
  },
];

export const resumeExtras = [
  { label: "Skills", value: "Go-to-market · Positioning · Market research · Dogfooding · Technical writing · Events" },
  { label: "Tools", value: "Google Analytics · Jira · Shortcut · Zapier · WordPress · Photoshop · Final Cut Pro" },
  { label: "Languages", value: "English · Cantonese · Mandarin" },
  {
    label: "Certificates",
    value: "Python for Everybody (UMich) · IBM Data Science · Google Project Management · Writing in the Sciences (Stanford)",
  },
  { label: "Volunteer", value: "Tri-Valley Animal Rescue · SuperTech FT" },
];

export type Article = { title: string; outlet: string; date: string; href: string };

/** Published writing, verified by byline. Numenta’s own blog is offline, so
 *  links point to Numenta’s Medium mirror or the Internet Archive. */
export const articles: Article[] = [
  {
    title: "Usher in a New Era of Accelerated AI on Intel CPUs",
    outlet: "Intel · Parallel Universe Magazine",
    date: "2024",
    href: "https://www.intel.com/content/www/us/en/developer/articles/technical/usher-in-a-new-era-of-accelerated-ai-on-cpus.html",
  },
  {
    title: "AI is harming our planet: addressing AI’s staggering energy cost",
    outlet: "Numenta (co-written, archived)",
    date: "2022",
    href: "https://web.archive.org/web/2023/https://www.numenta.com/blog/2022/05/24/ai-is-harming-our-planet/",
  },
  {
    title: "How do I Pursue a Career in Brain-Based AI?",
    outlet: "Numenta on Medium",
    date: "2022",
    href: "https://medium.com/@Numenta/how-do-i-pursue-a-career-in-brain-based-ai-2014d0ecfe",
  },
  {
    title: "Comparing Hinton’s GLOM Model to Numenta’s Thousand Brains Theory",
    outlet: "Numenta on Medium",
    date: "2021",
    href: "https://medium.com/@Numenta/comparing-hintons-glom-model-to-numenta-s-thousand-brains-theory-88ed999ab13d",
  },
];
