import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, CalendarDays, Clock } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import {
  getArticleBySlug,
  getArticleSlugs,
  formatDate,
} from "@/lib/journal";
import { siteConfig } from "@/lib/site";
import { WaitlistForm } from "@/components/WaitlistForm";

type Params = { params: { slug: string } };

export function generateStaticParams() {
  return getArticleSlugs().map((slug) => ({ slug }));
}

export function generateMetadata({ params }: Params): Metadata {
  const article = getArticleBySlug(params.slug);
  if (!article) return {};
  return {
    title: article.title,
    description: article.description,
    alternates: { canonical: `/journal/${article.slug}` },
    openGraph: {
      type: "article",
      title: article.title,
      description: article.description,
      publishedTime: article.date,
      url: `${siteConfig.url}/journal/${article.slug}`,
    },
    twitter: {
      card: "summary_large_image",
      title: article.title,
      description: article.description,
    },
  };
}

export default function ArticlePage({ params }: Params) {
  const article = getArticleBySlug(params.slug);
  if (!article) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: article.title,
    description: article.description,
    datePublished: article.date,
    author: { "@type": "Organization", name: article.author },
    publisher: { "@type": "Organization", name: siteConfig.name },
    mainEntityOfPage: `${siteConfig.url}/journal/${article.slug}`,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <article className="pb-8 pt-28 md:pt-32">
        <div className="container-prose">
          <Link
            href="/journal"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-stone transition-colors hover:text-forest"
          >
            <ArrowLeft className="h-4 w-4" /> The Harvest
          </Link>

          <div className="mt-6 flex flex-wrap gap-1.5">
            {article.tags.map((t) => (
              <span
                key={t}
                className="rounded-full bg-sprout/12 px-2.5 py-0.5 text-xs font-medium text-forest-700"
              >
                {t}
              </span>
            ))}
          </div>

          <h1 className="mt-4 font-heading text-3xl font-semibold leading-tight text-forest text-balance sm:text-4xl">
            {article.title}
          </h1>

          <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-stone">
            <span className="inline-flex items-center gap-1.5">
              <CalendarDays className="h-4 w-4" />
              {formatDate(article.date)}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Clock className="h-4 w-4" />
              {article.readingMinutes} min read
            </span>
          </div>
        </div>

        <div className="container-prose mt-8">
          <div className="prose prose-lg max-w-none prose-headings:font-heading prose-headings:text-forest prose-p:text-ink/90 prose-a:text-sprout prose-strong:text-forest prose-li:text-ink/90">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {article.content}
            </ReactMarkdown>
          </div>
        </div>
      </article>

      <section className="section">
        <div className="container-prose">
          <div className="rounded-2xl bg-forest p-8 text-center text-cream shadow-soft">
            <h2 className="font-heading text-2xl font-semibold">
              Get the next one in your inbox
            </h2>
            <p className="mx-auto mt-2 max-w-md text-cream/80">
              {siteConfig.waitlistPerk}
            </p>
            <div className="mx-auto mt-5 max-w-md">
              <WaitlistForm source={`article:${article.slug}`} variant="light" />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
