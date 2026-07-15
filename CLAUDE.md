# Off Grid Diet — project context for Claude Code

Read this before making changes. It's the handoff from a planning session in
Claude.ai (chat) — decisions and reasoning live here so they don't need to
be re-explained.

## Positioning (do not drift from this)

Off Grid Diet is a preventive gardening app. The wedge against every
competitor (PictureThis, Plantix, Planta, GrowVeg) is: they are diagnostic
(tell you what already died), we are preventive (flag it before it's
visible). Any copy that reads as diagnostic — "diagnose what went wrong,"
"tell us what's wrong," symptom-checker language — contradicts the core
positioning and should be rewritten, not just tolerated.

Founding evidence: a Reddit carrot-failure post with 2,586 upvotes, and a
mapping of 8 documented gardening pain points, of which existing apps only
solve 1 (the "diagnose after it's visible" one). This stat pair is the
single strongest piece of evidence on the site — always prefer surfacing
it over generic claims.

## Current site structure (as of this session)

`app/page.tsx` renders just `<LoadingScreen />` + `<ChapterHero>`. The old
3 post-video sections (`AppTeaser`, `JournalPreview`, `FinalCta`) are no
longer used on the homepage — deliberately. Do not re-add them as separate
sections; their content now lives inside `ChapterHero`'s final beat. Their
files are still in the repo but unreferenced; safe to delete once you've
confirmed the new layout works, or leave them — Next.js won't bundle
unused components.

`components/sections/ChapterHero.tsx` is a 650vh scroll-video story
(`bg-grow.mp4`) driven by Framer Motion, 5 beats:
1. Seed (`o0`) — hook
2. The pattern (`o1`) — 2,586 upvotes stat
3. The gap (`o2`) — 8 → 1 pain points stat
4. The build (`o3`) — 7-problem chip list
5. Final panel (`o4`) — brand headline, 2 trimmed feature cards (folded
   in from the old `AppTeaser`), a visual article teaser card with a
   cover image (folded in from `JournalPreview`), and the embedded
   `<WaitlistForm>` (folded in from `FinalCta`)

The final panel is a full-screen overlay that's transparent during beats
1–4. Its `pointerEvents` is gated on `finalPointer` (a `useTransform` of
scroll progress) so it stays inert — no captured scroll, no invisible
focusable form — until the final beat is actually on screen. If you edit
that panel, keep that gate.

Reasoning for the fold-in: the page previously had 8 total scroll
sections (5 video + 3 static). That was too much scrolling for a
pre-launch waitlist page. The fix was to compact to 5 total by moving the
3 static sections' *content* into the video's final beat, not to extend
the video or add a 6th beat. `Footer.tsx` (global, in `app/layout.tsx`)
already has its own waitlist form — keep that as the persistent fallback
for anyone landing on a direct `#waitlist` link; don't remove it.

First pass at the final beat crammed too much text in (4 feature cards +
article link + form + button). Second pass trimmed to 2 feature cards and
turned the article link into a small image card instead of bare text —
if it still feels dense, cut further before adding more.

## Open TODOs, in priority order

1. ~~**Make the carrot cover image permanent.**~~ **Done.** The image now
   lives at `public/images/journal/why-your-carrots-failed.png` and the
   frontmatter `cover:` points at the local path
   `/images/journal/why-your-carrots-failed.png` (no more ephemeral
   CloudFront URL). Note: the PNG is ~2 MB — worth compressing later.
2. **Decide on the 3 now-unused files** (`AppTeaser.tsx`, `JournalPreview.tsx`,
   `FinalCta.tsx`) — delete or leave as dead code, either is fine.
3. **FAQ page + comparison table** — don't exist yet, not in the nav.
   Comparison should be explicit against PictureThis, Plantix, Planta,
   GrowVeg, framed around preventive vs. diagnostic.
4. **Off-site presence** (Reddit engagement, real reviews) — this matters
   more than any further on-site polish for getting cited by AI answer
   engines. A pre-launch site with zero third-party mentions won't get
   recommended by ChatGPT/Perplexity no matter how good the on-page copy
   is. Don't let on-site iteration crowd this out.

## Working style for this project

- The person prefers direct, critical feedback over agreement — point out
  problems plainly, don't soften findings.
- Prefers seeing actual verified diffs (typechecked/built) over
  descriptions of what to change.
- Test scroll-heavy changes on an actual phone, not just desktop — several
  past decisions were made from screenshots that didn't reveal mobile feel.
