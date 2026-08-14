"use client";

import { useReveal } from "@/components/motion/useReveal";
import { SeedRow, Sprout } from "@/components/graphics/Botanical";

/**
 * The detection-window graphic — the site's signature element.
 *
 * It states a research finding, not a product claim: the conditions that cause
 * a crop to fail are measurable well before the plant shows any symptom, which
 * is why "my carrots failed and I don't know why" is such a common story.
 *
 * Colour is semantic: `leaf` is the detectable state, `beet` is visible damage.
 * Don't recolour these.
 *
 * Animation is CSS transitions on a `.reveal` class rather than Framer Motion,
 * so server and client render identical markup — Framer strips transforms
 * client-side under prefers-reduced-motion and trips hydration.
 */

const EARLY_AT = 8; // % along the rail
const LATE_AT = 92;

export function ForecastRail({ className = "" }: { className?: string }) {
  const { ref, shown } = useReveal<HTMLDivElement>();
  const rv = (delay: string) => ({
    className: `reveal${shown ? " reveal-in" : ""}`,
    style: { transitionDelay: delay },
  });

  return (
    <div ref={ref} className={className}>
      <p {...rv("0s")} className={`label-mono reveal${shown ? " reveal-in" : ""}`}>
        The detection window
      </p>

      <p
        className={`reveal${
          shown ? " reveal-in" : ""
        } mt-4 max-w-xl font-heading text-xl font-semibold leading-snug tracking-tight text-ink sm:text-2xl`}
        style={{ transitionDelay: "0.06s" }}
      >
        A failing crop is measurable about{" "}
        <em className="not-italic text-leaf">three weeks</em> before it looks
        like anything is wrong.
      </p>

      {/* The rail */}
      <div className="relative mt-12 h-6" aria-hidden="true">
        <div
          style={{
            transitionDelay: "0.25s",
            transitionDuration: "0.9s",
            transformOrigin: "left",
            // Must carry the centering translate too — an inline transform
            // replaces Tailwind's -translate-y-1/2 rather than composing with it.
            transform: `translateY(-50%) scaleX(${shown ? 1 : 0})`,
          }}
          className="absolute left-0 top-1/2 h-[2px] w-full rounded-full bg-gradient-to-r from-leaf via-ochre to-beet transition-transform ease-out"
        />

        <span
          style={{ left: `${EARLY_AT}%`, transitionDelay: "0.05s" }}
          className={`absolute top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-leaf bg-paper transition-opacity duration-500 ${
            shown ? "opacity-100" : "opacity-0"
          }`}
        />
        <span
          style={{ left: `${LATE_AT}%`, transitionDelay: "0.95s" }}
          className={`absolute top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-beet transition-opacity duration-500 ${
            shown ? "opacity-100" : "opacity-0"
          }`}
        />
      </div>

      {/* Labels as a 2-col grid rather than absolutely-positioned text — keeps
          it readable at 375px without overlapping the markers. */}
      <div className="mt-5 grid grid-cols-2 gap-6">
        <div {...rv("0.15s")}>
          <SeedRow className="mb-3 h-4 w-14 text-leaf-soft" />
          <p className="font-mono text-[11px] font-medium uppercase tracking-[0.16em] text-leaf">
            Day 0
          </p>
          <p className="mt-2 text-sm leading-snug text-ink">
            Soil, moisture and timing have already decided the outcome
          </p>
        </div>

        <div
          className={`reveal${shown ? " reveal-in" : ""} flex flex-col items-end text-right`}
          style={{ transitionDelay: "1.05s" }}
        >
          <Sprout className="mb-3 h-5 w-4 text-beet-soft" />
          <p className="font-mono text-[11px] font-medium uppercase tracking-[0.16em] text-beet">
            Day 19
          </p>
          <p className="mt-2 text-sm leading-snug text-ink">
            The grower sees the first symptom and starts guessing
          </p>
        </div>
      </div>

      <p className="sr-only">
        Timeline: the conditions that cause a crop to fail are measurable from
        day zero, before symptoms appear. The grower typically notices the first
        visible symptom around day nineteen. The roughly nineteen days between
        are what this research is about.
      </p>
    </div>
  );
}
