/**
 * Site content for Charmaine Lai. Facts and numbers come from her résumé
 * or from verified public sources (links checked Oct 2026).
 *
 * This file is the DEFAULT content (the seed). Once Charmaine edits the site
 * in the browser (/admin → Edit), the live copy is stored in Vercel Blob and
 * this file is only used as a fallback and for "Reset to original".
 * Edits made in the browser are NOT written back here.
 */

const site = {
  name: "Charmaine Lai",
  tagline: "Marketer by craft. Product by curiosity.",
  email: "charmaine.lai@kellogg.northwestern.edu",
  linkedin: "https://www.linkedin.com/in/charmaine-lai",
  github: "https://github.com/laicharmaine",
  description:
    "Charmaine Lai: ex-Numenta AI marketer, now an MBA in Artificial Intelligence student at Northwestern (Kellogg + McCormick). Launches, brands and communities for deep tech.",
};

const cat = {
  handle: "@litto_lychee",
  tiktok: "https://www.tiktok.com/@litto_lychee",
  instagram: "https://www.instagram.com/litto_lychee/",
};

export const nav = [
  { href: "/projects", label: "Projects" },
  { href: "/experience", label: "Experience" },
  { href: "/writing", label: "Writing" },
  { href: "/fun", label: "For fun" },
  { href: "/contact", label: "Contact" },
] as const;

/** Home proof points: big number + 2–4 word label. */
export type Stat = { value: string; label: string };

const proof: Stat[] = [
  { value: "$5M", label: "partner pipeline" },
  { value: "65%", label: "peak YoY traffic lift" },
  { value: "1.2K+", label: "Brains@Bay members" },
  { value: "450k+", label: "followers (it’s a cat)" },
];

const strengths: string[] = [
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
  /** Role title on /experience this highlight sits under. */
  role?: string;
  title: string;
  org: string;
  year: string;
  line: string;
  metric: { value: string; label: string };
  problem: string;
  did: string;
  result: string;
  /** One small thumbnail (optional). Local files live in /public/fun/. */
  media?: FunMedia;
  /** A small "featured" badge link (optional). */
  badge?: Link;
  /** Text links (optional). */
  links?: Link[];
};

const projects: Project[] = [
  {
    slug: "nupic-launch",
    role: "Marketing Manager",
    title: "Launching NuPIC",
    org: "Numenta",
    year: "2023–25",
    line: "Took a CPU-based generative AI platform to market.",
    metric: { value: "$5M", label: "partner pipeline" },
    problem:
      "A new generative AI platform that runs on CPUs, and no map of who would buy it.",
    did: "Go-to-market, market research, multi-channel marketing, dogfooding + user feedback across major releases, Numenta’s first API docs, 5+ conferences.",
    result:
      "A $5M partner pipeline incl. Intel and F5, +110% event leads, dev setup cut from days to hours.",
    badge: {
      label: "Featured in Intel Parallel Universe",
      href: "https://www.intel.com/content/www/us/en/developer/articles/technical/usher-in-a-new-era-of-accelerated-ai-on-cpus.html",
    },
  },
  {
    slug: "numenta-website",
    role: "Senior Marketing Specialist",
    title: "Numenta’s website + brand",
    org: "Numenta",
    year: "2021–23",
    line: "Rebuilt the site and brand around the product strategy.",
    metric: { value: "65%", label: "peak YoY traffic lift" },
    problem: "The site and brand lagged behind where the product was going.",
    did: "Coordinated the full revamp, owned the site (domain, front end, back end) and ran Google Ads tests.",
    result:
      "Traffic up as much as 65% year over year; Google Ads A/B tests lifted click-through 30% and cut cost per lead 20%.",
    links: [
      {
        label: "Before (2020, Wayback)",
        href: "https://web.archive.org/web/20201218073306/https://numenta.com/",
      },
      {
        label: "After (2023, Wayback)",
        href: "https://web.archive.org/web/2023/https://www.numenta.com/",
      },
    ],
  },
  {
    slug: "a-thousand-brains",
    role: "Marketing Associate",
    title: "A Thousand Brains launch",
    org: "Numenta",
    year: "2020–21",
    line: "Launched Jeff Hawkins’ book with a video + podcast series and live events.",
    metric: { value: "30K+", label: "series views" },
    problem:
      "A book about the brain and AI had to reach past the neuroscience crowd.",
    did: "Multi-channel launch, a four-part companion video + podcast series, and the Numenta News Digest.",
    result: "30K+ views on the companion series and 800+ digest subscribers.",
    media: {
      src: "/fun/proj-thousand-brains.webp",
      alt: "A Thousand Brains book cover, from the series introduction video",
      href: "https://www.youtube.com/watch?v=3kbveUiFVdM",
      caption: "Watch the series intro",
    },
    links: [
      {
        label: "Podcast",
        href: "https://numenta.buzzsprout.com/188368/episodes/7929319-a-thousand-brains-by-jeff-hawkins-introduction",
      },
    ],
  },
  {
    slug: "thousand-brains-explainer",
    role: "Senior Marketing Specialist",
    title: "Thousand Brains Theory explainer",
    org: "Numenta",
    year: "2022",
    line: "An animated video on how the brain works, per Numenta’s theory.",
    metric: { value: "25K+", label: "YouTube views" },
    problem:
      "The Thousand Brains Theory is dense science. Most people need an easy way in.",
    did: "Made an animated explainer for Numenta’s YouTube channel.",
    result: "25K+ views on YouTube.",
    media: {
      src: "/fun/proj-tbt-explainer.webp",
      alt: "Thumbnail of Numenta’s animated video How the Brain Works: The Thousand Brains Theory of Intelligence",
      href: "https://www.youtube.com/watch?v=LaAYuygr7_8",
      caption: "Watch the explainer",
    },
  },
  {
    slug: "brains-at-bay",
    role: "Senior Marketing Specialist",
    title: "Brains@Bay",
    org: "Numenta",
    year: "2021–23",
    line: "Grew a quarterly neuroscience + AI meetup.",
    metric: { value: "1.2K+", label: "members" },
    problem: "Numenta wanted a bigger voice where neuroscience meets AI.",
    did: "Organized and hosted a quarterly meetup, recruiting speakers from AI research and startups, incl. RL pioneer and Turing Award winner Richard Sutton.",
    result:
      "1.2K+ members, 200+ attendees per event, and Numenta as a hub for brain-inspired AI.",
    media: {
      src: "/fun/proj-brainsbay-sutton.webp",
      alt: "Brains@Bay title card: Sensorimotor Learning in AI, Dec 15, 2021",
      href: "https://www.youtube.com/watch?v=YV-wBjel-9s",
      caption: "Hosted Richard Sutton",
    },
    links: [
      {
        label: "All recordings",
        href: "https://www.youtube.com/playlist?list=PL3yXMgtrZmDqWkN_8VxStZjzbRKarAn6b",
      },
      { label: "Meetup", href: "https://www.meetup.com/brains-bay/" },
    ],
  },
];

export type SideProject = {
  title: string;
  line: string;
  links?: Link[];
  note?: string;
  /** 1–2 short "what I built / result" lines. */
  points?: string[];
  /** Small tags, e.g. "Live", "Private", "2nd place · MBAi Hackathon". */
  tags?: string[];
  media?: FunMedia;
};

const sideProjects: SideProject[] = [
  {
    title: "M:XR",
    line: "Less group chat, more mixers. An AI agent that plans a club mixer in minutes, not weeks of texts.",
    tags: ["2nd place · MBAi Hackathon 2026", "AI agent"],
    points: [
      "The agent finds groups free that night, picks the right bar, and holds the reservation.",
      "Pay-for-results model: venues pay a commission only when groups show up.",
    ],
    media: {
      src: "/fun/proj-mxr.webp",
      alt: "M:XR app mockup on desktop and phone, listing bars and student groups to mix with",
    },
  },
  {
    title: "Tabby",
    line: "A no-account bill splitter for MBA happy hours.",
    points: [
      "Scan the receipt and share one link.",
      "Everyone claims their own items.",
    ],
    tags: ["Live", "Web app"],
    links: [{ label: "Try Tabby", href: "https://tabby-wmtt.onrender.com" }],
    media: {
      src: "/fun/proj-tabby.webp",
      alt: "Tabby’s start screen: You covered the tab. Let everyone claim their own.",
      href: "https://tabby-wmtt.onrender.com",
    },
  },
  {
    title: "Dayline",
    line: "My to-dos and calendars on one screen.",
    tags: ["Private", "Personal tool"],
  },
];

/**
 * For fun (/fun).
 *
 * How to fill a placeholder:
 *  - Photo: drop the file in /public/fun/ (e.g. /public/fun/dance-1.jpg) and set
 *    `src: "/fun/dance-1.jpg"` plus a short `alt` describing the picture.
 *  - Video or post: set `href` to the YouTube / Instagram / TikTok link. The frame
 *    becomes a link (you can set `src` too, to use a photo as its cover).
 *  - Leave both empty and the frame shows a dashed "coming soon" placeholder
 *    with `caption` as its label.
 *  - Easiest: use the in-browser editor (/admin) and click the frame to upload.
 */
export type FunMedia = {
  src?: string;
  alt?: string;
  href?: string;
  caption?: string;
};

export type FunItem = {
  slug: string;
  title: string;
  /** Playful window title, flavor only. */
  file: string;
  line: string;
  links?: Link[];
  /** Media frames. Use "portrait" (3:4), "wide" (16:9) or "square" (1:1). */
  shape: "portrait" | "wide" | "square";
  media: FunMedia[];
  /** Big pixel stat instead of media (used for the cat). */
  stat?: { value: string; label: string };
};

const fun: FunItem[] = [
  {
    slug: "photography",
    title: "Photography",
    file: "my_photos/",
    line: "Portraits, mostly. The full portfolio lives on my Wix site.",
    links: [
      {
        label: "See the portfolio",
        href: "https://laicharmaine.wixsite.com/portfolio",
      },
    ],
    shape: "portrait",
    media: [
      {
        src: "/fun/portrait-1.jpg",
        alt: "Portrait by Charmaine: a laughing subject against a wall of red flowers",
      },
      {
        src: "/fun/portrait-2.jpg",
        alt: "Portrait by Charmaine: a subject with pink hair against a lavender wall",
      },
    ],
  },
  {
    slug: "dance",
    title: "Dance & choreography",
    file: "afx_dance.mov",
    line: "I was Executive Director of AFX Dance at UC Berkeley, and I choreograph.",
    shape: "wide",
    media: [
      {
        src: "/fun/dance-duracell.webp",
        alt: "Title card: AFX Showcase, Spring 2017, Duracell",
        href: "https://www.youtube.com/watch?v=GfjT5Nz7-7U",
        caption: "On the team · Duracell, AFX Showcase Spring 2017",
      },
    ],
  },
  {
    slug: "crafts",
    title: "Arts & crafts",
    file: "crafts.zip",
    line: "Junk journaling and other things I make with my hands instead of a keyboard.",
    shape: "portrait",
    media: [
      {
        src: "/fun/craft-anamorphic.webp",
        alt: "Anamorphic drawing: a stretched skull on paper reflects as an upright skull in a mirrored cylinder",
        caption: "Anamorphic mirror drawing",
      },
      { caption: "Coming soon" },
      { caption: "Coming soon" },
    ],
  },
  {
    slug: "litto-lychee",
    title: "@litto_lychee",
    file: "cat.gif",
    line: "I’m the Meowmager behind a flame-point Siamese who is more famous than me.",
    links: [
      { label: "TikTok", href: "https://www.tiktok.com/@litto_lychee" },
      { label: "Instagram", href: "https://www.instagram.com/litto_lychee/" },
    ],
    shape: "square",
    media: [
      {
        src: "/fun/lychee.webp",
        alt: "Lychee the cat, mouth open mid-meow",
        href: "https://www.tiktok.com/@litto_lychee",
        caption: "Lychee · @litto_lychee",
      },
    ],
    stat: { value: "450k+", label: "followers" },
  },
];

export type Role = {
  title: string;
  period: string;
  bullets: string[];
  work?: Link;
};
export type Job = {
  company: string;
  about?: string;
  location: string;
  period: string;
  roles: Role[];
};

const experience: Job[] = [
  {
    company: "YES International",
    about: "Exclusive HK/China agent for Schlatter rail welding machinery.",
    location: "Hong Kong",
    period: "2025–26",
    roles: [
      {
        title: "Product Consultant",
        period: "2025–26",
        bullets: [
          "Product and market strategy for rail welding systems in China.",
        ],
      },
    ],
  },
  {
    company: "Numenta",
    about:
      "Neuroscience-based AI company building efficient generative AI on CPUs.",
    location: "Redwood City, CA",
    period: "2020–25",
    roles: [
      {
        title: "Marketing Manager",
        period: "Sep 2023 – Jun 2025",
        bullets: [
          "Go-to-market and product lifecycle for NuPIC, Numenta’s first commercial product.",
        ],
      },
      {
        title: "Senior Marketing Specialist",
        period: "Sep 2021 – Aug 2023",
        bullets: ["Website, brand, paid search and the Brains@Bay community."],
      },
      {
        title: "Marketing Associate",
        period: "Aug 2020 – Aug 2021",
        bullets: [
          "Launch marketing and science content for Jeff Hawkins’ A Thousand Brains.",
        ],
      },
    ],
  },
];

export type Education = {
  school: string;
  degree: string;
  period: string;
  note: string;
};

const education: Education[] = [
  {
    school: "Northwestern University",
    degree: "MBA in Artificial Intelligence (MBAi) · Kellogg + McCormick",
    period: "2026 – Mar 2028",
    note: "Kellogg Tech Club Marketing Director · Charity Auction Ball Auction Director · MBAi Social Chair · 2nd place, MBAi Hackathon · Kellogg Scholarship",
  },
  {
    school: "UC Berkeley",
    degree: "BS, Environmental Economics and Policy",
    period: "2016–20",
    note: "AFX Dance Executive Director · Asian American Association President · Cantonese DeCal instructor · Humanity First co-founder",
  },
];

export type Extra = { label: string; value: string };

const resumeExtras: Extra[] = [
  {
    label: "Skills",
    value:
      "Go-to-market · Positioning · Market research · Dogfooding · Technical writing · Events",
  },
  {
    label: "Coursework",
    value:
      "Tech Product Management · Applied AI for Business · Computational Thinking · Marketing",
  },
  {
    label: "Internships",
    value: "YINA.CO · Lane Crawford · Marco Polo Hotels · PwC",
  },
  {
    label: "Tools",
    value:
      "Figma · Google Analytics · Jira · Zapier · WordPress · HTML/CSS · Photoshop · Final Cut Pro",
  },
  { label: "Languages", value: "English · Cantonese · Mandarin" },
  {
    label: "Certificates",
    value:
      "Python for Everybody (UMich) · IBM Data Science · Google Project Management · Writing in the Sciences (Stanford)",
  },
  {
    label: "Volunteer",
    value:
      "Tri-Valley Animal Rescue · SRL Alumni Association (web developer) · SuperTech FT",
  },
];

export type Article = {
  title: string;
  outlet: string;
  date: string;
  href: string;
};

/** Published writing, verified by byline. Numenta’s own blog is offline, so
 *  links point to Numenta’s Medium mirror or the Internet Archive. */
const articles: Article[] = [
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

/* ------------------------------------------------------------------------ */
/* Page copy + the full editable content object                              */
/* ------------------------------------------------------------------------ */

const contactLinks: Link[] = [
  { label: "LinkedIn", href: site.linkedin },
  { label: "GitHub", href: site.github },
  { label: "TikTok (the cat)", href: cat.tiktok },
  { label: "Instagram (also the cat)", href: cat.instagram },
];

/**
 * Layout settings from the editor, per block id (e.g. "home.intro").
 * Missing = the normal design.
 */
export type BlockLayout = {
  w?: "s" | "m" | "l" | "full";
  /** dragged width, % of the container (20–100), md+ only */
  wp?: number;
  /** dragged photo width in px (48–640), md+ only */
  px?: number;
  size?: "sm" | "lg";
  align?: "left" | "center";
  img?: "s" | "l";
  hidden?: boolean;
  /** Section order for a page, stored under "<page>:order". */
  order?: string[];
};

export const defaultContent = {
  site,
  home: {
    windowTitle: "about_charmaine.exe",
    sticker: "Hello\nWorld!",
    hookA: "Marketer by craft.",
    hookB: "Product by curiosity.",
    intro:
      "Ex-Numenta AI marketer, now MBA in Artificial Intelligence at Northwestern Kellogg. I launch deep-tech products and build the brands and communities around them.",
    ctaWork: "See my work",
    ctaEmail: "Email me",
    proof,
    strengths,
    workHeading: "Selected work",
    workAll: "Full experience",
    workWindow: "selected_work/",
    buildsLead: "Builds:",
    buildsText: "M:XR, Tabby and this site",
    funLead: "Off the clock:",
    funText: "photos, dance, crafts and a famous cat",
    ctaHeading: "Say hi.",
    resume: "Résumé",
  },
  projectsPage: {
    path: "C:\\Charmaine\\builds",
    title: "Projects",
    intro: "Things I build off the clock.",
    window: "case_studies/",
    problemLabel: "Problem",
    didLabel: "What I did",
    resultLabel: "Result",
    sideHeading: "Builds",
    offTitle: "Off the clock",
    offLine: "Photos, dance, crafts and a famous cat.",
    offLink: "For fun",
  },
  projects,
  sideProjects,
  experiencePage: {
    path: "C:\\Charmaine\\resume.doc",
    title: "Experience",
    intro: "AI marketing, then product. Now an MBA in Artificial Intelligence.",
    window: "work_history.doc",
    educationHeading: "Education",
    alsoHeading: "Also",
    highlightsLabel: "Highlights",
  },
  experience,
  education,
  resumeExtras,
  writingPage: {
    path: "C:\\Charmaine\\posts.txt",
    title: "Writing",
    intro: "22k+ readers, an Intel feature, a few Hacker News hits.",
    window: "posts.txt",
  },
  articles,
  funPage: {
    path: "C:\\Charmaine\\extracurriculars.zip",
    title: "For fun",
    intro: "What I’m up to when the laptop’s closed.",
  },
  fun,
  contactPage: {
    path: "C:\\Charmaine\\say_hi.exe",
    title: "Say hi",
    intro: "Ideas, collabs, or just hello. Email is fastest.",
    photoTitle: "hi.jpg",
    about:
      "I’m an AI marketer turned MBA in Artificial Intelligence at Northwestern Kellogg. At Numenta I launched deep-tech products and built the brands and communities around them. Off the clock: dance, crafts and Lychee the cat.",
    // Small tilted polaroid on the contact page. Swap it in the editor.
    photo: {
      src: "/fun/charmaine.webp",
      alt: "Charmaine in a leather jacket and sunglasses, holding a coffee in front of a red wall",
    } as FunMedia,
    window: "new_message.eml",
    emailLabel: "Email",
    button: "Write me",
    links: contactLinks,
  },
  footer: {
    tagline: "running Charmaine.OS",
  },
  layout: {} as Record<string, BlockLayout>,
};

export type SiteContent = typeof defaultContent;

/** Blank items used by the editor's "+ Add" buttons. */
export const templates = {
  stat: { value: "0", label: "new stat" } as Stat,
  strength: "New skill",
  project: (): Project => ({
    slug: `project-${Math.random().toString(36).slice(2, 8)}`,
    title: "New project",
    org: "Company",
    year: "2026",
    line: "One line about it.",
    metric: { value: "1", label: "headline number" },
    problem: "The problem.",
    did: "What I did.",
    result: "The result.",
  }),
  sideProject: {
    title: "New side project",
    line: "One line about it.",
    links: [],
    note: "",
  } as SideProject,
  link: { label: "Link", href: "https://" } as Link,
  job: {
    company: "Company",
    location: "City",
    period: "2026",
    roles: [],
  } as Job,
  role: {
    title: "Role",
    period: "2026",
    bullets: ["One line about the scope."],
  } as Role,
  bullet: "New bullet.",
  education: {
    school: "School",
    degree: "Degree",
    period: "Years",
    note: "",
  } as Education,
  extra: { label: "Label", value: "Value" } as Extra,
  article: {
    title: "New article",
    outlet: "Outlet",
    date: "2026",
    href: "https://",
  } as Article,
  media: { caption: "Coming soon" } as FunMedia,
  funItem: (): FunItem => ({
    slug: `fun-${Math.random().toString(36).slice(2, 8)}`,
    title: "New thing",
    file: "new_folder/",
    line: "One line about it.",
    links: [],
    shape: "portrait",
    media: [{ caption: "Coming soon" }],
  }),
};
