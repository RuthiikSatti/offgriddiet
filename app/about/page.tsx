import type { Metadata } from "next";
import Link from "next/link";
import { SectionHeading } from "@/components/sections/SectionHeading";
import { GridOverlay } from "@/components/layout/GridOverlay";
import { FadeUp } from "@/components/motion/FadeUp";

export const metadata: Metadata = {
  title: "About — Why We're Building Off Grid Diet",
  description:
    "Off Grid Diet is a preventive gardening app in development. It started from a documented pattern of repeat gardening failures and a gap every plant app leaves wide open. Here's the story and the approach.",
  alternates: { canonical: "/about" },
};

const glass =
  "rounded-xl border border-cream/15 bg-forest-700/50 p-7 text-cream backdrop-blur-md";

export default function AboutPage() {
  return (
    <div className="relative min-h-screen bg-forest-900 pt-16">
      <GridOverlay tone="light" />
      <div className="relative z-10">
        <section className="section">
          <div className="container-page">
            <SectionHeading
              light
              eyebrow="About"
              title="We're building the gardening app that warns you first."
              description="Off Grid Diet is a preventive gardening app in active development. This is where it came from and why it works differently."
            />

            <div className="mx-auto mt-12 max-w-3xl space-y-6">
              <FadeUp className={glass}>
                <h2 className="font-heading text-xl font-bold text-cream">
                  It started with a pattern, not a hunch
                </h2>
                <p className="mt-3 text-base leading-relaxed text-cream/85">
                  One gardener wrote about failing to grow carrots five years in
                  a row — changing the soil, the spacing, and the timing every
                  season, and never learning why it kept failing. The post drew
                  2,586 upvotes and a flood of gardeners describing the exact
                  same multi-year mystery. That&apos;s not one person&apos;s bad
                  luck. It&apos;s a documented, repeated problem — and it&apos;s
                  the reason Off Grid Diet exists.
                </p>
              </FadeUp>

              <FadeUp className={glass}>
                <h2 className="font-heading text-xl font-bold text-cream">
                  Eight problems. Today&apos;s apps solve one.
                </h2>
                <p className="mt-3 text-base leading-relaxed text-cream/85">
                  We mapped eight recurring pain points from real gardening
                  threads across Reddit — harvest timing, overnight pest damage,
                  cost vs. yield, soil confusion, small-space growing, and the
                  multi-year failure loop among them. Every plant app on the
                  market today solves exactly one of them: identifying what&apos;s
                  already wrong, after it&apos;s visible. The other seven are
                  wide open.
                </p>
              </FadeUp>

              <FadeUp className={glass}>
                <h2 className="font-heading text-xl font-bold text-cream">
                  Preventive, not diagnostic
                </h2>
                <p className="mt-3 text-base leading-relaxed text-cream/85">
                  Apps like PictureThis and Plantix are diagnostic — you point a
                  camera at a sick plant and they name the disease. Useful, but
                  by then the damage is done. Off Grid Diet is built to flag
                  what&apos;s coming — timing, pests, soil, and what to do this
                  week for your specific climate and crops — before the yellow
                  leaves show up. It&apos;s the difference between a smoke
                  detector and an autopsy.
                </p>
              </FadeUp>

              <FadeUp className={glass}>
                <h2 className="font-heading text-xl font-bold text-cream">
                  Where things stand
                </h2>
                <p className="mt-3 text-base leading-relaxed text-cream/85">
                  Off Grid Diet is pre-launch and in active development. Because
                  it&apos;s early and waitlist-based, you won&apos;t find it on
                  review platforms or the app stores yet — so we&apos;re being
                  upfront about exactly what&apos;s built, what&apos;s coming,
                  and the evidence behind it. If you want the app that prevents
                  the next failure instead of narrating the last one, join the
                  waitlist — you&apos;ll get early access and a practical
                  gardening read every week while you wait.
                </p>
              </FadeUp>
            </div>

            <div className="mx-auto mt-10 flex max-w-3xl flex-wrap justify-center gap-3">
              <Link
                href="/#waitlist"
                className="bg-sprout px-6 py-3 font-mono text-xs font-bold uppercase tracking-widest text-forest-900 transition-colors hover:bg-sprout-light"
              >
                Join the Waitlist
              </Link>
              <Link
                href="/research"
                className="border border-cream/40 px-6 py-3 font-mono text-xs font-bold uppercase tracking-widest text-cream transition-colors hover:bg-cream/10"
              >
                See the Research
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
