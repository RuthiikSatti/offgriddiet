# Off Grid Diet

**Off Grid Diet** is a gardening research and writing project. It maps why home
food crops fail — using documented reports from real growers rather than a
survey — and publishes the findings plus one practical read a week.

There is **no app and no product.** An earlier version of this site pitched a
"preventive gardening coach" in development with a waitlist; both were removed.
Don't reintroduce an app, a launch, pricing, early access, or "coming soon"
framing anywhere in the copy.

The site does three things:

1. **Publish research** — findings with their sources attached (`/findings`,
   `/library`, `/research`).
2. **Publish writing** — one practical read a week (`/journal`).
3. **Build a readership** — a free weekly letter. The ask is the writing
   itself, not a queue for something unbuilt.

## Tech stack

- **Next.js 14** (App Router) + **TypeScript**
- **Tailwind CSS** with a light, minimal, earthy design system (see
  `tailwind.config.ts`)
- **React Hook Form + Zod** for the subscribe form
- Markdown-powered articles (`gray-matter` + `react-markdown`)
- Email provider-ready (MailerLite / Buttondown / Resend) with a no-key fallback
- **Framer Motion** only for the findings accordion. Scroll reveals are CSS
  (see below), which is both a hydration fix and ~40 kB less JS per route.

## Design system

A reading site: warm limestone paper, deep olive ink, **hairlines instead of
cards**. Structure comes from whitespace and rules — a bordered panel with a
background fill is usually the wrong instinct here.

Deliberately not the cream + terracotta + display-serif look every generated
garden site lands on: the neutral is grey-warm rather than yellow-cream, warmth
comes from olive and clay rather than orange, and headings are a grotesque at
600 weight.

Three grounds alternate down the page so the scroll has a rhythm: `paper` →
`parchment` → `sage`.

| Token | Role |
| --- | --- |
| `paper` / `parchment` / `sage` | the three grounds |
| `line` | hairlines — the main structural device |
| `ink` / `bark` | primary / secondary text |
| `leaf` | dominant accent: growth, links, primary action |
| `ochre` | harvest gold — figures and illustration |
| `beet` / `rust` | deep contrast + semantic "visible damage" |

Contrast verified: ink 13.59, bark 5.99, leaf 5.78, beet 7.09 on paper.
**`ochre` is 2.89:1 — graphics only; use `ochre-deep` (5.23:1) for text.**

Typefaces: **Fraunces** (display, soft/wonky variable serif) / **Inter** (body)
/ **JetBrains Mono** (labels).

`components/graphics/Botanical.tsx` holds the hand-authored line-art marks —
SVG, sub-1 kB each, `currentColor` so they re-theme with the palette. Plus a
3.5% grain wash on `body::after`.

The signature element is the **detection-window rail**
(`components/sections/ForecastRail.tsx`) — it states a research finding, not a
product claim.

## Motion

Scroll reveals are CSS (`.reveal` / `.reveal-in` in `globals.css`, triggered by
`components/motion/useReveal.ts`), **not** Framer Motion. Framer strips
transforms client-side under `prefers-reduced-motion` while the server can't
know that preference, so any SSR'd motion component with a transform in
`initial` trips a React hydration mismatch. Reduced motion is handled entirely
in CSS, and `useReveal` carries a 3s failsafe so content can never be stranded
at `opacity: 0`.

## Getting started

```bash
npm install
```

```bash
npm run dev
```

Works on first run with no config: the subscribe form succeeds and emails are
logged to the console until you connect a provider.

## Key things to configure

| What | Where |
| --- | --- |
| Site copy, tagline, nav, the ask | `lib/site.ts` |
| Email provider | `.env.local` (see `.env.local.example`) — **MailerLite recommended** |
| Research figures | `components/sections/Research.tsx`, `components/sections/Evidence.tsx` |
| Findings & library data | `lib/publication.ts` |

`public/videos/bg-grow.mp4` is currently **unused** — the hero is typographic.
The file is kept in case it's wanted later as a contained band.

## Writing articles

Drop a markdown file in `content/journal/`. See **[PUBLISHING.md](PUBLISHING.md)**
for the template. New files appear automatically in the list, get their own
page, and are added to the sitemap.

## Deploy

Push to GitHub, import at [vercel.com/new](https://vercel.com/new), add the env
vars, and deploy. Set your domain and update `NEXT_PUBLIC_SITE_URL`.

## Project structure

```
app/              # /, /journal, /journal/[slug], /research, /findings,
                  # /library, /about, /faq, /api/subscribe, sitemap, robots
components/
  layout/         # Navbar, Footer, StickyFollow
  motion/         # useReveal, FadeUp, StaggerGroup (CSS-driven)
  sections/       # Hero, ForecastRail, Evidence, HarvestPreview, FollowCta,
                  # Research, PainPoints, ArticleCard, SectionHeading
  publishing/     # FindingsExplorer, ResourceLibrary
  ui/             # button, sonner
  FollowForm.tsx  # email capture
content/journal/  # the articles (markdown)
lib/              # site config, journal pipeline, subscribe helper, schemas,
                  # structured data, publication data
```
