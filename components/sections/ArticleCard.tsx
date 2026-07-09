import Link from "next/link";
import { CalendarDays, Clock, ArrowRight } from "lucide-react";
import { type ArticleMeta, formatDate } from "@/lib/journal";
import { cn } from "@/lib/utils";

export function ArticleCard({
  article,
  glass = false,
}: {
  article: ArticleMeta;
  /** Glass style for use over the video background (home page). */
  glass?: boolean;
}) {
  return (
    <Link
      href={`/journal/${article.slug}`}
      className={cn(
        "card-lift group flex h-full flex-col rounded-xl border p-6 shadow-soft",
        glass
          ? "border-cream/15 bg-forest-700/50 backdrop-blur-md"
          : "border-border bg-card"
      )}
    >
      <div
        className={cn(
          "flex flex-wrap items-center gap-x-4 gap-y-1 text-xs",
          glass ? "text-cream/70" : "text-stone"
        )}
      >
        <span className="inline-flex items-center gap-1.5">
          <CalendarDays className="h-3.5 w-3.5" />
          {formatDate(article.date)}
        </span>
        <span className="inline-flex items-center gap-1.5">
          <Clock className="h-3.5 w-3.5" />
          {article.readingMinutes} min read
        </span>
      </div>

      <h3
        className={cn(
          "mt-3 font-heading text-xl font-semibold leading-snug",
          glass ? "text-cream" : "text-forest"
        )}
      >
        {article.title}
      </h3>
      <p
        className={cn(
          "mt-2 flex-1 text-sm leading-relaxed",
          glass ? "text-cream/80" : "text-stone"
        )}
      >
        {article.description}
      </p>

      <div className="mt-4 flex items-center justify-between">
        <div className="flex flex-wrap gap-1.5">
          {article.tags.slice(0, 2).map((t) => (
            <span
              key={t}
              className={cn(
                "rounded-full px-2.5 py-0.5 text-xs font-medium",
                glass
                  ? "bg-sprout/20 text-sprout-light"
                  : "bg-sprout/12 text-forest-700"
              )}
            >
              {t}
            </span>
          ))}
        </div>
        <span
          className={cn(
            "inline-flex items-center gap-1 text-sm font-semibold transition-transform group-hover:translate-x-0.5",
            glass ? "text-sprout-light" : "text-forest"
          )}
        >
          Read <ArrowRight className="h-4 w-4" />
        </span>
      </div>
    </Link>
  );
}
