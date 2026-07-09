import type { Metadata } from "next";
import { getAllArticles } from "@/lib/journal";
import { siteConfig } from "@/lib/site";
import { ArticleCard } from "@/components/sections/ArticleCard";
import { WaitlistForm } from "@/components/WaitlistForm";
import { FadeUp } from "@/components/motion/FadeUp";
import { StaggerGroup, StaggerItem } from "@/components/motion/StaggerGroup";

export const metadata: Metadata = {
  title: "The Harvest — Weekly Gardening Tips",
  description:
    "The Harvest: practical, no-nonsense gardening articles every week — why crops fail, what to plant when, and how to grow a self-sufficient food supply that actually works.",
  alternates: { canonical: "/journal" },
};

export default function JournalPage() {
  const articles = getAllArticles();

  return (
    <>
      <section className="bg-forest pt-28 pb-16 text-cream md:pt-32">
        <div className="container-page">
          <FadeUp immediate>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-sprout-light">
              The Harvest
            </p>
            <h1 className="mt-3 max-w-2xl font-heading text-4xl font-semibold leading-tight text-balance sm:text-5xl">
              Gardening that works — one practical read a week.
            </h1>
            <p className="mt-4 max-w-xl text-lg text-cream/80">
              No fluff, no filler. Just the fixes, timing, and tips that keep
              real food growing — freshly harvested every week.
            </p>
          </FadeUp>
        </div>
      </section>

      <section className="section">
        <div className="container-page">
          {articles.length === 0 ? (
            <p className="text-center text-stone">
              The first articles are being planted. Check back soon 🌱
            </p>
          ) : (
            <StaggerGroup className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {articles.map((a) => (
                <StaggerItem key={a.slug}>
                  <ArticleCard article={a} />
                </StaggerItem>
              ))}
            </StaggerGroup>
          )}
        </div>
      </section>

      {/* Waitlist */}
      <section className="section pt-0">
        <div className="container-page">
          <div className="mx-auto max-w-3xl rounded-2xl bg-forest p-8 text-center text-cream shadow-soft md:p-12">
            <h2 className="font-heading text-3xl font-semibold">
              Never miss a harvest
            </h2>
            <p className="mx-auto mt-3 max-w-lg text-cream/80">
              {siteConfig.waitlistPerk}
            </p>
            <div className="mx-auto mt-6 max-w-lg">
              <WaitlistForm source="journal-index" variant="light" />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
