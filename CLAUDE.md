# Off Grid Diet — project context for Claude Code

Read this before making changes.

## What this is (do not drift from this)

Off Grid Diet is a **gardening research and writing project**. It maps why
home food crops fail — using documented reports from real growers — and
publishes findings plus one practical read a week.

**There is no app and no product.** An earlier version of this site pitched a
"preventive gardening coach" in development, with a waitlist. Both are gone.
Do not reintroduce: an app, a launch, a waitlist, pricing, early access, or
any "coming soon" framing. If a sentence implies something is being sold or
awaited, it's wrong.

The research's through-line is still prevention vs. identification — by the
time a leaf yellows, the conditions that caused it were set weeks earlier —
but that is framed as **a finding about gardening**, never as a product claim
or a competitor comparison.

Founding evidence: a Reddit carrot-failure post with 2,586 upvotes, and 8
recurring failure modes grouped from real threads, of which most published
advice covers 1 well. This pair is the strongest material on the site.

## The ask is a newsletter, nothing more

Every CTA offers what arrives immediately: **one practical gardening read a
week plus the research notes**. The component is `components/FollowForm.tsx`;
the copy lives in `siteConfig.followPerk` / `followCta`.

The email plumbing underneath is unchanged and provider-agnostic
(`lib/subscribe.ts`, `app/api/subscribe/route.ts`, MailerLite / Buttondown /
Resend, with a no-key console fallback).

## Design system — light, minimal, earthy

This is a reading site, so the ground is light and everything is tuned for
long-form legibility: warm limestone paper, deep olive ink, **hairlines
instead of cards**. Structure comes from whitespace and rules, not boxes — if
you find yourself adding a bordered panel with a background fill, that's
usually the wrong instinct here.

Deliberately **not** the cream + terracotta + display-serif look that every
generated garden site lands on: the neutral is grey-warm rather than
yellow-cream, the warmth comes from olive and clay rather than orange, and
headings are a grotesque at 600 weight, not a fashion serif at 800.

**Three grounds** give the scroll a rhythm — alternating bands, not one flat
page: `paper` (default) → `parchment` (Evidence, Footer) → `sage` (FollowCta).
An earlier pass used a single ground and read as black-and-white; if you add a
section, decide which band it sits on.

| Token | Role |
| --- | --- |
| `paper` / `parchment` / `sage` | the three grounds |
| `line` | hairlines — the main structural device |
| `ink` | primary text, deep olive-black · 13.59:1 |
| `bark` | secondary text · 5.99:1 |
| `leaf` | dominant accent: growth, links, primary action · 5.78:1 |
| `ochre` | harvest gold — figures, marks, illustration |
| `beet` | deep contrast note + semantic "visible damage" · 7.09:1 |
| `rust` | semantic warmth · 4.52:1 |

⚠️ **`ochre` is 2.89:1 on paper — graphics and large figures only, never body
text.** Use `ochre-deep` (5.23:1) when it needs to be text.

Type: **Fraunces** (display — a soft, slightly wonky variable serif; SOFT and
WONK axes are what keep it off the Playfair-on-cream cliché) / **Inter** (body)
/ **JetBrains Mono** (labels, dates, figures).

**Illustration is part of the system, not decoration.**
`components/graphics/Botanical.tsx` holds hand-authored line-art marks
(`Sprout`, `Root`, `LeafSpray`, `SeedRow`, `FrondBackdrop`, `SectionMark`).
They're SVG rather than generated raster so each is well under 1 kB, stays
crisp, and inherits `currentColor` to re-theme with the palette. A research
publication about plants should look like one before you read a word. There's
also a 3.5% `feTurbulence` paper grain on `body::after` — it's what stops the
large flat colour bands reading as flat digital blocks.

Signature element: the **detection-window rail**
(`components/sections/ForecastRail.tsx`) — a `moss` marker at day 0, a `clay`
marker at day 19, the span between them labelled. It states a *research
finding* ("a failing crop is measurable about three weeks before it looks like
anything is wrong"), not a product claim. Keep it that way.

The scroll-scrubbed hero video (`public/videos/bg-grow.mp4`, 3.9 MB) is **no
longer used**. A dark 4 MB timelapse fought the light minimal page and the
primary action is now "read", not "convert". The asset is still in the repo if
it's ever wanted as a contained band.

## Motion rules (learned the hard way — read before adding animation)

**Do not put a transform in a Framer Motion `initial` on anything that is
server-rendered.** Framer strips transforms on the client when the user has
`prefers-reduced-motion` set, but the server can't know that preference, so the
server emits `transform:translateY(12px)` and the client emits `transform:none`
— a React hydration mismatch on every such element.

Scroll reveals are therefore **CSS**, not Framer: `.reveal` / `.reveal-in` in
`globals.css`, triggered by `components/motion/useReveal.ts`. Reduced motion is
handled entirely in CSS (`.reveal` resolves to its final state with
`!important`), so content can never be left stuck at `opacity: 0`. `useReveal`
also has a 3s failsafe timer for the same reason.

Framer Motion is now used **only** for the findings accordion's height
animation. Removing it from the rest cut ~40 kB of first-load JS on most routes.

Also: **never gate a persistent overlay's visibility on an exit animation.**
`StickyFollow` used `AnimatePresence`; under reduced motion the exit never
completed, leaving an invisible but still-clickable bar pinned across the
bottom of the screen. It's now plain CSS with `visibility: hidden` +
`aria-hidden` + `tabIndex={-1}` when hidden.

## Current structure

8 routes: `/`, `/journal`, `/journal/[slug]`, `/research`, `/findings`,
`/library`, `/about`, `/faq`. All are in `app/sitemap.ts` and all have exactly
one `<h1>` — keep both true.

Primary nav is **4 items** (Home, Writing, Research, About). `/findings`,
`/library` and `/faq` deliberately left the nav — a few full pages read as more
credible than many thin ones, which matters for answer-engine citation — but
they remain live URLs, linked from `/research` and the footer
(`siteConfig.secondaryNav`).

Homepage: `Hero` (typographic + detection-window rail) → `Evidence`
(2,586 / 8 failure modes) → `HarvestPreview` → `FollowCta`. There is
deliberately no product-feature section; `Prevention.tsx` (Predict / Remember /
Act) was deleted when the app framing went, because it was pure roadmap.

`StructuredData` emits Organization + WebSite from the root layout only. Pages
adding their own graph must pass `base={false}` (see `/faq`) or the site-wide
entities get emitted twice.

## Articles

`content/journal/*.md`, rendered by `lib/journal.ts`. Two published. Their
slugs, URLs, frontmatter and body copy are SEO assets — redesign how they're
presented, not what they say. (The only body edits ever made were the trailing
CTA line in each, which referenced the waitlist and then the app.)

## Open TODOs, in priority order

1. **Compress the carrot cover image** — `public/images/journal/why-your-carrots-failed.png`
   is ~2 MB. It's the only heavy asset left.
2. **Publish more findings.** `/findings` and `/library` are the credibility
   engine now that there's no product to point at, and both are thin. More
   sourced findings does more for this site than any further design work.
3. **Off-site presence** (Reddit engagement, real third-party mentions). Still
   matters more than on-site polish for getting cited by answer engines. A site
   with zero third-party mentions won't get recommended by ChatGPT/Perplexity
   no matter how good the on-page copy is.
4. **Name an author.** The FAQ deliberately avoids claiming who writes this,
   because it isn't known. A named human with a bio would materially help
   trust — and would let the JSON-LD carry a real `author`.

## Working style for this project

- Prefers direct, critical feedback over agreement — point out problems
  plainly, don't soften findings.
- Prefers seeing actual verified diffs (typechecked/built) over descriptions.
- Test scroll-heavy changes on an actual phone, not just desktop.
- **Verification caveat:** `IntersectionObserver` and `getComputedStyle` do not
  work reliably in the automated browser pane when it isn't compositing — a
  freshly-created IO never fires at all. Don't trust either to verify
  scroll-triggered behaviour there; check it on a real device.
- Running `npm run build` while `next dev` is live corrupts `.next` and the dev
  server starts 500ing with "Cannot find module './XXX.js'". Stop the dev
  server first, or `rm -rf .next` and rebuild.
- Tailwind escapes dots in arbitrary values (`text-[2.25rem]` compiles to
  `.text-\[2\.25rem\]`). Grepping the built CSS for `text-\[2.25rem\]` finds
  nothing and looks like a missing utility. Use `grep -F` on the escaped form.
