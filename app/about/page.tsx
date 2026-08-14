import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { FadeUp } from "@/components/motion/FadeUp";
import { ForecastRail } from "@/components/sections/ForecastRail";

export const metadata: Metadata = {
  title: "About — Why This Research Exists",
  description:
    "Off Grid Diet is a gardening research project. It started from a documented pattern of repeat crop failures among home growers. Here's the story, the method, and who writes it.",
  alternates: { canonical: "/about" },
};

const sections = [
  {
    kicker: "01",
    heading: "It started with a pattern, not a theory",
    body: "One gardener wrote about failing to grow carrots five years in a row — changing the soil, the spacing, and the timing every season, and never learning why it kept failing. The post drew 2,586 upvotes and a flood of growers describing the exact same multi-year mystery. That's not one person's bad luck. It's a documented, repeated problem, and it's what this project set out to understand.",
  },
  {
    kicker: "02",
    heading: "Eight failure modes, mapped from real threads",
    body: "We read gardening communities rather than running a survey — r/homesteading, r/vegetablegardening, r/urbanfarming and related threads — and grouped what people actually described into eight recurring failure modes: harvest timing, overnight pest damage, cost versus yield, soil confusion, small-space constraints, food-security anxiety, the multi-year failure loop, and the beginner knowledge gap.",
  },
  {
    kicker: "03",
    heading: "The gap is prevention, not identification",
    body: "Most published gardening advice is good at one thing: naming a problem once it's visible. But by the time a leaf yellows or a root forks, the conditions that caused it were set weeks earlier. The interesting question — the one this project keeps returning to — is what was already measurable before anything looked wrong.",
  },
  {
    kicker: "04",
    heading: "How we publish",
    body: "Findings are written up with their sources attached, and we separate cited guidance from community signal from things we genuinely don't know. Where we prioritise sources, it's public Extension programmes and government agencies. If a claim isn't supported, we say so rather than rounding it up. Everything goes out free, one read a week.",
  },
];

export default function AboutPage() {
  return (
    <>
      <section className="pb-16 pt-32 sm:pt-40">
        <div className="container-page">
          <FadeUp immediate>
            <p className="label-mono">About</p>
            <h1 className="mt-6 max-w-3xl text-balance font-heading text-[2.25rem] font-semibold leading-[1.05] tracking-tight text-ink sm:text-5xl">
              A research project about why home food crops fail.
            </h1>
            <p className="mt-7 max-w-xl text-lg leading-relaxed text-bark">
              Off Grid Diet reads what growers actually report, maps the
              patterns, and publishes what the evidence supports.
            </p>
          </FadeUp>

          <FadeUp delay={0.12} className="hairline mt-16 pt-12">
            <ForecastRail />
          </FadeUp>
        </div>
      </section>

      <section className="section pt-0">
        <div className="container-page">
          <div className="max-w-2xl">
            {sections.map((s, i) => (
              <FadeUp
                key={s.kicker}
                delay={i * 0.06}
                className="border-t border-line py-10"
              >
                <p className="font-mono text-[11px] tracking-[0.16em] text-bark">
                  {s.kicker}
                </p>
                <h2 className="mt-4 font-heading text-xl font-semibold leading-snug tracking-tight text-ink sm:text-2xl">
                  {s.heading}
                </h2>
                <p className="mt-4 text-[15px] leading-relaxed text-bark">
                  {s.body}
                </p>
              </FadeUp>
            ))}
          </div>

          <FadeUp delay={0.2} className="mt-12 flex flex-wrap gap-x-8 gap-y-3">
            <Link
              href="/#follow"
              className="group inline-flex items-center gap-2 border-b border-ink pb-1 font-medium text-ink transition-colors hover:border-leaf hover:text-leaf"
            >
              Subscribe
              <ArrowRight className="h-4 w-4 transition-transform motion-safe:group-hover:translate-x-0.5" />
            </Link>
            <Link
              href="/research"
              className="inline-flex items-center border-b border-transparent pb-1 text-bark transition-colors hover:border-bark hover:text-ink"
            >
              See the research
            </Link>
          </FadeUp>
        </div>
      </section>
    </>
  );
}
