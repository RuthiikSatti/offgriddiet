import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ForecastRail } from "@/components/sections/ForecastRail";
import { FrondBackdrop, Root } from "@/components/graphics/Botanical";

/**
 * Hero. Typographic and quiet, with an illustrated layer — a research
 * publication about plants should look like one before you read a word.
 *
 * Server component; entrance is CSS, collapsed by the reduced-motion block in
 * globals.css.
 */
const RISE = "motion-safe:animate-fade-up";

export function Hero() {
  return (
    <section className="relative overflow-hidden pb-16 pt-32 sm:pt-40 md:pb-24">
      {/* Illustrated backdrop — low opacity, behind the type, never competing */}
      <FrondBackdrop
        className="pointer-events-none absolute -right-16 -top-8 hidden h-[34rem] w-auto text-leaf/[0.13] md:block lg:-right-4"
      />

      <div className="container-page relative">
        <div className="flex items-center gap-4">
          <Root className="h-9 w-auto shrink-0 text-ochre" strokeWidth={1.4} />
          <p className={`label-mono ${RISE}`}>Gardening research · est. 2026</p>
        </div>

        <h1
          className={`mt-7 max-w-3xl text-balance font-heading text-[2.5rem] font-semibold leading-[1.02] tracking-tight text-ink sm:text-[3.25rem] lg:text-[4rem] ${RISE}`}
          style={{ animationDelay: "70ms" }}
        >
          Most home gardens fail for reasons you{" "}
          <em className="not-italic text-leaf">could have seen coming</em>.
        </h1>

        <p
          className={`mt-7 max-w-xl text-lg leading-relaxed text-bark ${RISE}`}
          style={{ animationDelay: "140ms" }}
        >
          Off Grid Diet is a research project about why home food crops fail. We
          map documented failures from real growers, publish what the evidence
          actually supports, and send one practical read a week.
        </p>

        <div
          className={`mt-9 flex flex-wrap items-center gap-x-7 gap-y-3 ${RISE}`}
          style={{ animationDelay: "210ms" }}
        >
          <Link
            href="/journal"
            className="group inline-flex items-center gap-2 rounded-md bg-ink px-5 py-3 font-medium text-paper transition-colors hover:bg-leaf"
          >
            Read the writing
            <ArrowRight className="h-4 w-4 transition-transform motion-safe:group-hover:translate-x-0.5" />
          </Link>
          <Link
            href="#follow"
            className="inline-flex items-center border-b border-line pb-1 text-bark transition-colors hover:border-leaf hover:text-leaf"
          >
            Subscribe to the weekly letter
          </Link>
        </div>

        <div
          className={`mt-20 rounded-lg border border-line bg-sage/60 p-7 sm:p-10 ${RISE}`}
          style={{ animationDelay: "280ms" }}
        >
          <ForecastRail />
        </div>
      </div>
    </section>
  );
}
