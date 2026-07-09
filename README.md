# Off Grid Diet — pre-launch site

The pre-launch home for **Off Grid Diet**, an app that helps people grow a
self-sufficient food supply and figure out why their garden keeps failing. This
site exists before the app to do three things:

1. **Collect an audience** — turn visitors into a waitlist/email list.
2. **Prove the idea** — a research/credibility section backed by documented evidence.
3. **Get found** — the **Field Journal** (weekly SEO articles) that brings people in from Google.

## Tech stack

- **Next.js 14** (App Router) + **TypeScript**
- **Tailwind CSS** + earthy design system
- **Framer Motion** — including a **scroll-scrubbed video hero** (scroll drives the video)
- **React Hook Form + Zod** for the waitlist form
- Markdown-powered blog (`gray-matter` + `react-markdown`)
- Waitlist provider-ready (MailerLite / Buttondown / Resend) with a no-key fallback

## Getting started

```bash
npm install
cp .env.local.example .env.local   # optional — works without it
npm run dev                        # http://localhost:3000
```

Works on first run with no config: the waitlist form succeeds (emails are logged
to the console until you connect a provider), and the hero falls back to its
poster image if the video is missing.

## Key things to configure

| What | Where |
| --- | --- |
| Site copy, tagline, nav | `lib/site.ts` |
| Waitlist email provider | `.env.local` (see `.env.local.example`) — **MailerLite recommended** |
| The Research/proof numbers | `components/sections/Research.tsx` (marked `[PLACEHOLDER]`) |
| Hero video | `public/videos/bg-grow.mp4` (poster: `public/images/hero-poster.jpg`) |

## Writing articles

Drop a markdown file in `content/journal/`. See **[PUBLISHING.md](PUBLISHING.md)**
for the one-minute guide and template. New files appear automatically in the
list, get their own page, and are added to the sitemap.

## The scroll video

The hero (`components/sections/ScrollVideoHero.tsx`) maps scroll progress onto the
video's playback time with a smoothing loop. For best performance, compress
`bg-grow.mp4` to ~5–8 MB (e.g. `ffmpeg -i in.mp4 -crf 28 -vf scale=1280:-2 out.mp4`)
— it currently ships at full size and still works, just with a heavier first load.

## Deploy

Push to GitHub, import at [vercel.com/new](https://vercel.com/new), add the env
vars, and deploy. Set your domain and update `NEXT_PUBLIC_SITE_URL`.

## Project structure

```
app/              # home, /journal, /journal/[slug], /api/subscribe, sitemap, robots
components/
  layout/         # Navbar, Footer
  sections/       # ScrollVideoHero, AppTeaser, Research, JournalPreview, FinalCta, ArticleCard
  motion/         # FadeUp, StaggerGroup
  ui/             # button, sonner
  WaitlistForm.tsx
content/journal/  # the articles (markdown)
lib/              # site config, journal pipeline, subscribe helper, schemas, utils
```
