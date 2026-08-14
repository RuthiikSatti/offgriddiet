import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { getArticleBySlug, getArticleSlugs, formatDate } from "@/lib/journal";
import { siteConfig } from "@/lib/site";
import { FollowForm } from "@/components/FollowForm";

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
      ...(article.cover
        ? { images: [{ url: `${siteConfig.url}${article.cover}` }] }
        : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: article.title,
      description: article.description,
      ...(article.cover ? { images: [`${siteConfig.url}${article.cover}`] } : {}),
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
    ...(article.cover
      ? { image: `${siteConfig.url}${article.cover}` }
      : {}),
    ...(article.tags.length ? { keywords: article.tags.join(", ") } : {}),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <article className="pb-4 pt-32 md:pt-40">
        <div className="container-prose">
          <Link
            href="/journal"
            className="inline-flex items-center gap-1.5 rounded-sm text-sm text-bark transition-colors hover:text-ink"
          >
            <ArrowLeft className="h-3.5 w-3.5" /> Writing
          </Link>

          <div className="mt-10 flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-[11px] uppercase tracking-[0.14em] text-bark">
            <time dateTime={article.date}>{formatDate(article.date)}</time>
            <span aria-hidden="true">·</span>
            <span>{article.readingMinutes} min read</span>
          </div>

          <h1 className="mt-5 text-balance font-heading text-[2rem] font-semibold leading-[1.08] tracking-tight text-ink sm:text-[2.5rem]">
            {article.title}
          </h1>

          <p className="mt-6 text-lg leading-relaxed text-bark">
            {article.description}
          </p>

          <div className="mt-7 flex flex-wrap gap-x-4 gap-y-1.5 font-mono text-[10px] uppercase tracking-[0.14em] text-bark">
            {article.tags.map((t) => (
              <span key={t}>{t}</span>
            ))}
          </div>
        </div>

        {article.cover && (
          <div className="container-prose mt-12">
            <div className="overflow-hidden rounded-md bg-parchment">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={article.cover}
                alt=""
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        )}

        <div className="container-prose mt-12">
          <div
            className="prose prose-lg max-w-none
              prose-headings:font-heading prose-headings:font-semibold prose-headings:tracking-tight prose-headings:text-ink
              prose-h2:mt-14 prose-h2:text-[1.375rem]
              prose-h3:text-lg
              prose-p:text-ink/85 prose-p:leading-[1.75]
              prose-a:text-leaf prose-a:underline-offset-4
              prose-strong:font-semibold prose-strong:text-ink
              prose-li:text-ink/85 prose-li:leading-[1.75]
              prose-blockquote:border-l-leaf prose-blockquote:font-normal prose-blockquote:not-italic prose-blockquote:text-bark
              prose-hr:border-line
              prose-em:text-bark"
          >
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {article.content}
            </ReactMarkdown>
          </div>
        </div>
      </article>

      <section className="section">
        <div className="container-prose">
          <div className="hairline pt-12">
            <p className="label-mono">The weekly letter</p>
            <h2 className="mt-5 font-heading text-2xl font-semibold tracking-tight text-ink">
              Get the next one in your inbox
            </h2>
            <p className="mt-4 text-[15px] leading-relaxed text-bark">
              {siteConfig.followPerk}
            </p>
            <div className="mt-7 max-w-md">
              <FollowForm
                source={`article:${article.slug}`}
                cta={siteConfig.followCta}
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
