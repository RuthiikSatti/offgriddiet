import type { Metadata } from "next";
import { getAllArticles } from "@/lib/journal";
import { siteConfig } from "@/lib/site";
import { ArticleCard } from "@/components/sections/ArticleCard";
import { FollowForm } from "@/components/FollowForm";
import { FadeUp } from "@/components/motion/FadeUp";
import { StaggerGroup, StaggerItem } from "@/components/motion/StaggerGroup";

export const metadata: Metadata = {
  title: "Writing — Weekly Gardening Research",
  description:
    "Practical, evidence-led gardening writing: why crops fail, what to plant when, and the research notes behind each finding.",
  alternates: { canonical: "/journal" },
};

export default function JournalPage() {
  const articles = getAllArticles();

  return (
    <>
      <section className="pb-14 pt-32 sm:pt-40">
        <div className="container-page">
          <FadeUp immediate>
            <p className="label-mono">Writing</p>
            <h1 className="mt-6 max-w-2xl text-balance font-heading text-[2.25rem] font-semibold leading-[1.05] tracking-tight text-ink sm:text-5xl">
              One practical read a week.
            </h1>
            <p className="mt-7 max-w-xl text-lg leading-relaxed text-bark">
              No fluff, no filler. What the evidence supports, what it
              doesn&apos;t, and what to actually do about it.
            </p>
          </FadeUp>
        </div>
      </section>

      <section className="pb-20 md:pb-28">
        <div className="container-page">
          {articles.length === 0 ? (
            <p className="border-t border-line pt-8 text-bark">
              The first articles are being planted. Check back soon.
            </p>
          ) : (
            <StaggerGroup className="grid gap-10 sm:grid-cols-2 sm:gap-8 lg:grid-cols-3">
              {articles.map((a) => (
                <StaggerItem key={a.slug} className="h-full">
                  <ArticleCard article={a} showCover />
                </StaggerItem>
              ))}
            </StaggerGroup>
          )}
        </div>
      </section>

      <section className="section pt-0">
        <div className="container-page">
          <div className="hairline max-w-xl pt-14">
            <p className="label-mono">The weekly letter</p>
            <h2 className="mt-5 font-heading text-2xl font-semibold tracking-tight text-ink">
              Never miss an issue
            </h2>
            <p className="mt-4 text-[15px] leading-relaxed text-bark">
              {siteConfig.followPerk}
            </p>
            <div className="mt-7 max-w-md">
              <FollowForm source="journal-index" cta={siteConfig.followCta} />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
