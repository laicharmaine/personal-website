/**
 * Site content for Charmaine Lai. Facts and numbers come from her résumé
 * or from verified public sources (links checked Oct 2026).
 */

export const site = {
  name: "Charmaine Lai",
  tagline: "Marketer turned product builder · Northwestern MBAi ’28",
  program: "Northwestern MBAi ’28",
  location: "Evanston, IL (from the Bay Area)",
  target: "Bay Area",
  email: "charmaine.lai@kellogg.northwestern.edu",
  linkedin: "https://www.linkedin.com/in/charmaine-lai",
  linkedinLabel: "linkedin.com/in/charmaine-lai",
  github: "https://github.com/laicharmaine",
  headline:
    "I spent almost five years at Numenta taking brain-inspired AI from research lab to market: launching a generative AI platform, rebuilding the website, and writing for 22k+ readers.",
  lookingFor: "Summer 2027 PM / PMM internship",
};

export const cat = {
  handle: "@litto_lychee",
  followers: "450k+",
  tiktok: "https://www.tiktok.com/@litto_lychee",
  instagram: "https://www.instagram.com/litto_lychee/",
};

export const nav = [
  { href: "/", label: "Home" },
  { href: "/experience", label: "Experience" },
  { href: "/projects", label: "Projects" },
  { href: "/writing", label: "Writing" },
  { href: "/contact", label: "Contact" },
] as const;

export type EducationItem = {
  school: string;
  detail: string;
  degree: string;
  period: string;
  location: string;
  bullets: string[];
};

export const education: EducationItem[] = [
  {
    school: "Northwestern University",
    detail: "Kellogg School of Management + McCormick School of Engineering",
    degree: "Joint degree: MBA + MS in Artificial Intelligence (MBAi)",
    period: "2026 – Mar 2028",
    location: "Evanston, IL",
    bullets: [],
  },
  {
    school: "University of California, Berkeley",
    detail: "",
    degree: "BS, Environmental Economics and Policy",
    period: "2016 – 2020",
    location: "Berkeley, CA",
    bullets: [
      "DeCal course instructor",
      "Executive Director, AFX Dance",
      "President, Asian American Association",
      "Co-Founder, Humanity First",
    ],
  },
];

export type Role = { title: string; period: string; bullets: string[] };
export type Job = { company: string; location: string; period: string; roles: Role[] };

export const experience: Job[] = [
  {
    company: "YES International Ltd",
    location: "Hong Kong",
    period: "2025 – 2026",
    roles: [
      {
        title: "Product Consultant",
        period: "2025 – 2026",
        bullets: [
          "Analyzed market and procurement dynamics in China’s railroad sector, then turned buyer requirements into prioritized product capabilities and deployment recommendations, unlocking $7M in potential opportunities.",
        ],
      },
    ],
  },
  {
    company: "Numenta",
    location: "Redwood City, CA",
    period: "2020 – 2025",
    roles: [
      {
        title: "Marketing Manager",
        period: "Sep 2023 – Jun 2025",
        bullets: [
          "Led commercialization of NuPIC 1.0/2.0, a CPU-based generative AI platform, through market research and a multi-channel strategy that landed three strategic partnerships in the first quarter after launch.",
          "Created and ran dogfooding sessions that shaped three product iterations and sharpened go-to-market messaging; wrote the API documentation to speed up developer adoption.",
          "Ran Numenta’s presence at 5+ industry conferences (1.5k+ attendees): booth, collateral, and on-site demos, driving a 110% increase in event-driven leads.",
          "Wrote blogs and articles reaching 22k+ readers, including a front-page feature in Intel’s Parallel Universe Magazine (1M+ online reach) and posts that trended on Hacker News.",
        ],
      },
      {
        title: "Senior Marketing Specialist",
        period: "Sep 2021 – Aug 2023",
        bullets: [
          "Organized and hosted Brains@Bay, a quarterly neuroscience + AI meetup (200+ attendees), raising Numenta’s visibility across both research communities.",
          "Coordinated a full website and brand revamp aligned with product strategy, lifting traffic by up to 65% year over year; owned post-launch upkeep across domain, front end, and back end.",
        ],
      },
      {
        title: "Marketing Associate",
        period: "Aug 2020 – Aug 2021",
        bullets: [
          "Ran multi-channel marketing for Jeff Hawkins’ A Thousand Brains, including a companion podcast series and live events. Bill Gates picked it as one of his five favorite books of 2021.",
        ],
      },
    ],
  },
];

export const volunteering = [
  {
    org: "Tri-Valley Animal Rescue",
    role: "Shelter Volunteer (2022 – 2024), now Administrative Volunteer",
  },
  {
    org: "SuperTech FT",
    role: "Digital & Public Communication Volunteer Lead (2023)",
  },
];

export const skills = {
  product: [
    "Market research",
    "Go-to-market strategy",
    "Dogfooding & user feedback",
    "Prioritizing product capabilities",
    "API documentation",
  ],
  marketing: [
    "Positioning & messaging",
    "Multi-channel campaigns",
    "Technical content & blogging",
    "Events & community",
    "Website & brand",
  ],
  tools: [
    "Google Analytics",
    "Jira · Shortcut",
    "Zapier",
    "WordPress (HTML/CSS)",
    "Adobe Photoshop",
    "Final Cut Pro",
  ],
  languages: ["English (native)", "Cantonese (native)", "Mandarin (fluent)"],
  certifications: [
    "Python for Everybody (University of Michigan)",
    "IBM Data Science",
    "Google Project Management",
    "Writing in the Sciences (Stanford)",
  ],
};

export type Link = { label: string; href: string };

export type Project = {
  slug: string;
  title: string;
  org: string;
  period: string;
  metric?: { value: string; label: string };
  problem: string;
  did: string;
  result: string;
  tags: string[];
  links?: Link[];
};

/** Work case studies, framed problem → what I did → result. */
export const projects: Project[] = [
  {
    slug: "nupic-launch",
    title: "Launching NuPIC, generative AI on CPUs",
    org: "Numenta",
    period: "2023 – 2025",
    metric: { value: "3", label: "strategic partnerships in the launch quarter" },
    problem:
      "Numenta was bringing a CPU-based generative AI platform to market and needed to know who would buy it, why, and how to reach them.",
    did: "Ran the market research and multi-channel go-to-market, set up dogfooding sessions with the team, wrote the API docs, and took NuPIC to 5+ industry conferences with live demos.",
    result:
      "Three strategic partnerships in the first quarter, three product iterations shaped by dogfooding, and a 110% jump in event-driven leads.",
    tags: ["Go-to-market", "AI platform", "Dogfooding"],
  },
  {
    slug: "numenta-website",
    title: "Rebuilding Numenta’s website and brand",
    org: "Numenta",
    period: "2021 – 2023",
    metric: { value: "65%", label: "year-over-year traffic lift (up to)" },
    problem:
      "The website and brand no longer matched where the product strategy was heading.",
    did: "Coordinated a full website and brand revamp around the product strategy, then owned the site after launch: domain, front-end, and back-end updates.",
    result: "Website traffic up by as much as 65% year over year.",
    tags: ["Brand", "Web", "Positioning"],
  },
  {
    slug: "a-thousand-brains",
    title: "Launching A Thousand Brains",
    org: "Numenta",
    period: "2020 – 2021",
    metric: { value: "Top 5", label: "on Bill Gates’ favorite books of 2021" },
    problem:
      "Jeff Hawkins’ book on the brain and the future of AI needed a launch that reached past the neuroscience crowd.",
    did: "Ran multi-channel marketing for the launch, created a companion podcast series, and hosted live events.",
    result:
      "Bill Gates named it one of his five favorite books of 2021.",
    tags: ["Launch", "Podcast", "Events"],
  },
  {
    slug: "brains-at-bay",
    title: "Hosting Brains@Bay",
    org: "Numenta",
    period: "2021 – 2023",
    metric: { value: "200+", label: "attendees at a quarterly meetup" },
    problem:
      "Numenta wanted a bigger voice in the conversation between neuroscience and AI research.",
    did: "Organized and hosted Brains@Bay, a quarterly meetup where neuroscience and AI researchers present and trade ideas.",
    result:
      "200+ attendees and more visibility for Numenta in both research communities.",
    tags: ["Community", "Events", "Research"],
  },
  {
    slug: "railroad-product",
    title: "Product strategy for China’s railroad sector",
    org: "YES International",
    period: "2025 – 2026",
    metric: { value: "$7M", label: "in potential opportunities" },
    problem:
      "The client needed to know what railroad buyers in China actually require, and which product capabilities to lead with.",
    did: "Analyzed market and procurement dynamics, translated buyer requirements into prioritized product capabilities, and wrote deployment recommendations.",
    result: "Unlocked $7M in potential opportunities.",
    tags: ["Product strategy", "B2B", "Market analysis"],
  },
];

export type SideProject = {
  title: string;
  period: string;
  body: string;
  tags: string[];
  links?: Link[];
  note?: string;
};

export const sideProjects: SideProject[] = [
  {
    title: "Tabby: split the bar tab",
    period: "2026",
    body: "Whoever covers the happy-hour tab shouldn’t have to chase the whole cohort on Venmo. Tabby reads the receipt, makes one shareable link, and everyone taps what they actually had. No accounts, Venmo and Zelle built in.",
    tags: ["Built it", "Mobile web", "AI receipt scan"],
    links: [{ label: "Try Tabby", href: "https://tabby-wmtt.onrender.com" }],
  },
  {
    title: "@litto_lychee, the cat account",
    period: "Ongoing",
    body: "I’m the Meowmager behind Lychee, a flame-point Siamese (with a side of Taro), followed by 450k+ people across TikTok and Instagram. Turns out audience instincts transfer.",
    tags: ["Social", "Content", "Audience growth"],
    links: [
      { label: "TikTok", href: "https://www.tiktok.com/@litto_lychee" },
      { label: "Instagram", href: "https://www.instagram.com/litto_lychee/" },
    ],
  },
  {
    title: "Dayline: my day on one screen",
    period: "2026",
    body: "A personal dashboard that pulls my Notion to-dos, every calendar, and my summer 2027 recruiting pipeline into one calm view, with a job kanban and keyboard shortcuts.",
    tags: ["Built it", "Notion API", "Personal tool"],
    note: "Private: it runs on my real data.",
  },
];

export type Article = {
  title: string;
  outlet: string;
  date: string;
  description: string;
  href: string;
  byline?: string;
  hn?: { href: string; points: number };
};

/** Published writing, verified by byline. Numenta’s own blog is offline, so
 *  links point to Numenta’s Medium mirror or the Internet Archive. */
export const articles: Article[] = [
  {
    title: "Usher in a New Era of Accelerated AI on Intel CPUs",
    outlet: "Intel Developer · Parallel Universe Magazine",
    date: "Feb 2024",
    description:
      "How NuPIC runs large language models at scale on Intel CPUs, up to 17x faster than an NVIDIA A100 on BERT-Large, no GPUs required.",
    href: "https://www.intel.com/content/www/us/en/developer/articles/technical/usher-in-a-new-era-of-accelerated-ai-on-cpus.html",
  },
  {
    title: "AI is harming our planet: addressing AI’s staggering energy cost",
    outlet: "Numenta blog (archived)",
    date: "May 2022",
    description:
      "Why deep learning burns so much energy, and four brain-inspired fixes: sparsity, structured data, continual learning, and better hardware.",
    href: "https://web.archive.org/web/2023/https://www.numenta.com/blog/2022/05/24/ai-is-harming-our-planet/",
    byline: "with Subutai Ahmad, Donna Dubinsky, and Christy Maver",
    hn: { href: "https://news.ycombinator.com/item?id=31662560", points: 93 },
  },
  {
    title: "How do I Pursue a Career in Brain-Based AI?",
    outlet: "Numenta on Medium",
    date: "Apr 2022",
    description:
      "Practical advice I gathered from Numenta’s research team for students who want to work on brain-based AI.",
    href: "https://medium.com/@Numenta/how-do-i-pursue-a-career-in-brain-based-ai-2014d0ecfe",
    hn: { href: "https://news.ycombinator.com/item?id=30993653", points: 34 },
  },
  {
    title: "Comparing Hinton’s GLOM Model to Numenta’s Thousand Brains Theory",
    outlet: "Numenta on Medium",
    date: "Apr 2021",
    description:
      "Where Geoffrey Hinton’s GLOM and the Thousand Brains Theory agree, and where they split: movement, hierarchy, and biology.",
    href: "https://medium.com/@Numenta/comparing-hintons-glom-model-to-numenta-s-thousand-brains-theory-88ed999ab13d",
  },
];
