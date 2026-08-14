import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { ArticleMeta } from "@/lib/journal";
import { ArticleCard } from "@/components/sections/ArticleCard";
import { FadeUp } from "@/components/motion/FadeUp";

export function HarvestPreview({ articles }: { articles: ArticleMeta[] }) {
  if (!articles.length) return null;

  return (
    <section className="section">
      <div className="container-page">
        <FadeUp className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="label-mono">Writing</p>
            <h2 className="mt-5 max-w-lg text-balance font-heading text-2xl font-semibold leading-tight tracking-tight text-ink sm:text-3xl">
              Practical reads, published weekly
            </h2>
          </div>
          <Link
            href="/journal"
            className="group inline-flex items-center gap-2 border-b border-line pb-1 text-sm font-medium text-ink transition-colors hover:border-leaf hover:text-leaf"
          >
            All writing
            <ArrowRight className="h-4 w-4 transition-transform motion-safe:group-hover:translate-x-0.5" />
          </Link>
        </FadeUp>

        <div className="mt-14 grid gap-10 sm:grid-cols-2 sm:gap-8">
          {articles.slice(0, 2).map((a, i) => (
            <FadeUp key={a.slug} delay={i * 0.08} className="h-full">
              <ArticleCard article={a} showCover />
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}
