# Publishing a Field Journal article

Each article is one markdown file in `content/journal/`. Drop a new file there
and it automatically:

- appears at the top of `/journal`,
- shows on the home page's "Field Journal" preview,
- gets its own page at `/journal/your-file-name`,
- is added to the sitemap so Google can find it.

## The easiest workflow

Write the article however is easiest — a Google Doc, an email, even a voice note
you type out — and hand it over. It gets turned into a file like the one below.

## The file format

Filename becomes the URL. Use lowercase words separated by hyphens:
`content/journal/watering-in-a-heatwave.md` → `/journal/watering-in-a-heatwave`

Top of the file is the "frontmatter" (the part between the `---` lines):

```markdown
---
title: "Watering in a Heatwave Without Killing Your Plants"
description: "One or two sentences that show up in Google results and on the card. Make it useful and specific."
date: "2026-07-08"
author: "Off Grid Diet"
tags: ["watering", "summer", "beginner"]
---

Write the article body here in plain markdown.

## A subheading

Normal paragraphs. **Bold** for emphasis. Bullet lists:

- point one
- point two

That's it — save the file and it's published on the next deploy.
```

## Notes

- `date` controls the order (newest first). Use `YYYY-MM-DD`.
- `description` is your SEO summary — write it for a human searching Google.
- `tags` are optional; the first two show on the article card.
- One new article a week keeps the site fresh and climbing in search.
