import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { type ArticleMeta, formatDate } from "@/lib/journal";
import { cn } from "@/lib/utils";

/**
 * Minimal article entry: hairline, type, whitespace. No card, no border box —
 * structure comes from the rule above it and the space around it.
 */
export function ArticleCard({
  article,
  showCover = false,
}: {
  article: ArticleMeta;
  showCover?: boolean;
}) {
  return (
    <Link
      href={`/journal/${article.slug}`}
      className={cn(
        "group flex h-full flex-col border-t border-line pt-6 transition-colors hover:border-ink/40"
      )}
    >
      {showCover && article.cover && (
        <div className="mb-6 aspect-[16/10] overflow-hidden rounded-md bg-parchment">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={article.cover}
            alt=""
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-500 motion-safe:group-hover:scale-[1.02]"
          />
        </div>
      )}

      <div className="flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-[11px] uppercase tracking-[0.14em] text-bark">
        <time dateTime={article.date}>{formatDate(article.date)}</time>
        <span aria-hidden="true">·</span>
        <span>{article.readingMinutes} min</span>
      </div>

      <h3 className="mt-4 font-heading text-xl font-semibold leading-snug tracking-tight text-ink transition-colors group-hover:text-leaf">
        {article.title}
      </h3>
      <p className="mt-3 flex-1 text-[15px] leading-relaxed text-bark">
        {article.description}
      </p>

      <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-ink">
        Read
        <ArrowRight className="h-4 w-4 transition-transform motion-safe:group-hover:translate-x-0.5" />
      </span>
    </Link>
  );
}
