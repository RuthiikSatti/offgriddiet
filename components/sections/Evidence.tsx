import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { FadeUp } from "@/components/motion/FadeUp";
import { SectionMark } from "@/components/graphics/Botanical";

/**
 * The evidence pair, framed as documented findings rather than a product
 * argument. This is the strongest material on the site — a repeated,
 * searchable pattern and a gap in what's currently written about it.
 *
 * Sits on the parchment band: the first change of ground on the page, so the
 * scroll has some rhythm instead of one flat colour throughout.
 */
const stats = [
  {
    figure: "2,586",
    unit: "upvotes",
    tint: "text-ochre",
    body: "on a single post from a gardener who failed to grow carrots five years running — and the replies were full of people describing the same thing. It's a documented pattern, not bad luck.",
  },
  {
    figure: "8",
    unit: "recurring failure modes",
    tint: "text-leaf",
    body: "mapped from real gardening threads rather than a survey. Most published advice covers one of them well: identifying a problem once it's already visible.",
  },
];

export function Evidence() {
  return (
    <section className="section bg-parchment">
      <div className="container-page">
        <FadeUp>
          <p className="label-mono">What the research shows</p>
          <h2 className="mt-5 max-w-2xl text-balance font-heading text-[1.75rem] font-semibold leading-tight tracking-tight text-ink sm:text-4xl">
            We didn&apos;t start from a theory. We started from growers
            describing the same failures to each other.
          </h2>
        </FadeUp>

        <div className="mt-16 grid gap-14 sm:grid-cols-2 sm:gap-16">
          {stats.map((s, i) => (
            <FadeUp key={s.figure} delay={i * 0.08} className="hairline pt-8">
              <p className={`figure-display text-6xl leading-none ${s.tint}`}>
                {s.figure}
              </p>
              <p className="mt-4 font-mono text-[11px] uppercase tracking-[0.16em] text-bark">
                {s.unit}
              </p>
              <p className="mt-5 max-w-sm text-[15px] leading-relaxed text-bark">
                {s.body}
              </p>
            </FadeUp>
          ))}
        </div>

        <FadeUp delay={0.16}>
          <SectionMark mark="leaf" className="mt-16" />
          <div className="mt-10">
            <Link
              href="/research"
              className="group inline-flex items-center gap-2 border-b border-line pb-1 text-sm font-medium text-ink transition-colors hover:border-leaf hover:text-leaf"
            >
              See how we mapped it
              <ArrowRight className="h-4 w-4 transition-transform motion-safe:group-hover:translate-x-0.5" />
            </Link>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}
