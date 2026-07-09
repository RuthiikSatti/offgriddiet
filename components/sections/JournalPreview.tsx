import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { type ArticleMeta } from "@/lib/journal";
import { SectionHeading } from "@/components/sections/SectionHeading";
import { ArticleCard } from "@/components/sections/ArticleCard";
import { FadeUp } from "@/components/motion/FadeUp";
import { StaggerGroup, StaggerItem } from "@/components/motion/StaggerGroup";

export function JournalPreview({ articles }: { articles: ArticleMeta[] }) {
  if (articles.length === 0) return null;

  return (
    <section className="section">
      <div className="container-page">
        <SectionHeading
          light
          eyebrow="The Harvest"
          title="Fresh gardening wisdom, harvested weekly"
          description="Every week we dig up one practical, plant-tested read — the fixes and timing that keep real food growing. Pull up a stool and start reading."
        />

        <StaggerGroup className="mt-12 grid gap-6 md:grid-cols-3">
          {articles.slice(0, 3).map((a) => (
            <StaggerItem key={a.slug}>
              <ArticleCard article={a} glass />
            </StaggerItem>
          ))}
        </StaggerGroup>

        <FadeUp className="mt-10 text-center">
          <Link
            href="/journal"
            className="inline-flex h-12 items-center justify-center gap-2 rounded-lg bg-sprout px-7 text-base font-semibold text-forest-900 transition-all hover:bg-sprout-light"
          >
            Browse The Harvest
            <ArrowRight className="h-4 w-4" />
          </Link>
        </FadeUp>
      </div>
    </section>
  );
}
