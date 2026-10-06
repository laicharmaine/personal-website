# Charmaine Lai — personal site / portfolio

Recruiting-focused personal website for **Charmaine Lai** (Northwestern Kellogg MBAi → PM / PMM, exploring consulting, summer 2027).

Built with **Next.js (App Router)**, **TypeScript**, and **Tailwind CSS**.

## Local development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

```bash
npm run build   # production build
npm start       # serve the production build
npm run lint    # ESLint
```

## Deploy (Vercel recommended)

1. Push this repo to GitHub (already done if you're reading this on GitHub).
2. Go to [vercel.com/new](https://vercel.com/new) and import `laicharmaine/personal-website`.
3. Leave framework defaults (Next.js). Deploy.
4. Optional: add a custom domain in Vercel → Project → Settings → Domains.

## What's placeholder vs real

| Area | Status |
|------|--------|
| Site structure, nav, design system | **Real** — keep or tweak |
| Home intro / headline | **Draft** — rewrite in your voice |
| Experience employers, dates, bullets | **Placeholders** (`[Company]`, `[DRAFT]…`) |
| Education undergrad row | **Placeholder** |
| Project case-study cards | **Stubs** — titles/tags are draft |
| Writing posts | **Draft stubs** in `lib/content.ts` |
| Contact email & LinkedIn URL | **Placeholders** — update before sharing |
| Skills tool list | Mixed draft / learning notes |

**Single source of truth for copy:** [`lib/content.ts`](./lib/content.ts).

## Pages

| Route | Purpose |
|-------|---------|
| `/` | Home / About |
| `/experience` | Education, work, skills (timeline) |
| `/projects` | Case-study cards |
| `/writing` | Post list |
| `/writing/[slug]` | Individual draft posts |
| `/contact` | Email (mailto) + LinkedIn |

## Design notes

- **Accent:** warm coral (`#E85A4F`) on cream background — marketing personality, not stiff corporate.
- **Fonts:** Fraunces (display) + Plus Jakarta Sans (body) via `next/font`.
- **Motion:** light CSS fade-up only; respects `prefers-reduced-motion`.

## License

Personal portfolio — all rights reserved unless you choose otherwise.
