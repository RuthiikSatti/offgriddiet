import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

/**
 * The Field Journal content pipeline.
 * Articles are plain markdown files in /content/journal/*.md with frontmatter.
 * To publish a new article, drop a new .md file in that folder (see
 * PUBLISHING.md for the template) — it automatically appears in the list,
 * gets its own page, and is added to the sitemap.
 */

const JOURNAL_DIR = path.join(process.cwd(), "content", "journal");

export type Article = {
  slug: string;
  title: string;
  description: string;
  date: string; // ISO yyyy-mm-dd
  author: string;
  tags: string[];
  cover?: string;
  content: string;
  readingMinutes: number;
};

export type ArticleMeta = Omit<Article, "content">;

function ensureDir(): string[] {
  if (!fs.existsSync(JOURNAL_DIR)) return [];
  return fs.readdirSync(JOURNAL_DIR).filter((f) => f.endsWith(".md"));
}

export function getArticleSlugs(): string[] {
  return ensureDir().map((f) => f.replace(/\.md$/, ""));
}

export function getArticleBySlug(slug: string): Article | null {
  const full = path.join(JOURNAL_DIR, `${slug}.md`);
  if (!fs.existsSync(full)) return null;
  const raw = fs.readFileSync(full, "utf8");
  const { data, content } = matter(raw);
  const words = content.trim().split(/\s+/).length;
  return {
    slug,
    title: data.title ?? slug,
    description: data.description ?? "",
    date: data.date ? String(data.date).slice(0, 10) : "1970-01-01",
    author: data.author ?? "Off Grid Diet",
    tags: Array.isArray(data.tags) ? data.tags : [],
    cover: data.cover ?? undefined,
    content,
    readingMinutes: Math.max(1, Math.round(words / 200)),
  };
}

export function getAllArticles(): ArticleMeta[] {
  return getArticleSlugs()
    .map((slug) => {
      const a = getArticleBySlug(slug);
      if (!a) return null;
      // strip heavy content field from list payloads
      const { content: _content, ...meta } = a;
      void _content;
      return meta;
    })
    .filter((a): a is ArticleMeta => a !== null)
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function formatDate(iso: string): string {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}
