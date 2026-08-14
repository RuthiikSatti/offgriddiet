import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { FadeUp } from "@/components/motion/FadeUp";
import { StructuredData } from "@/components/StructuredData";
import { faqSchema, type QA } from "@/lib/structured-data";

export const metadata: Metadata = {
  title: "FAQ — About the Research",
  description:
    "Straight answers about Off Grid Diet: what the project is, where the research comes from, how findings are sourced, and what subscribing gets you.",
  alternates: { canonical: "/faq" },
};

/**
 * Single source of truth: the visible list and the FAQPage JSON-LD are both
 * built from this, so every answer has to be literally true — an answer engine
 * may quote it verbatim. Don't add claims about products, launches, pricing or
 * access; there is nothing being sold here.
 */
const faqs: QA[] = [
  {
    question: "What is Off Grid Diet?",
    answer:
      "It's a gardening research project. We map why home food crops fail — using documented reports from real growers rather than a survey — and publish the findings as free weekly writing. There's no product, no app, and nothing for sale.",
  },
  {
    question: "Where does your research come from?",
    answer:
      "Two places. The failure patterns come from real gardening communities — r/homesteading, r/vegetablegardening, r/urbanfarming and related threads — read and grouped by hand. The horticultural guidance comes from public sources, prioritising Extension programmes and government agencies, which are linked from each finding and collected in the Library.",
  },
  {
    question: "How is this different from ordinary gardening advice?",
    answer:
      "Most gardening advice is good at naming a problem once it's visible. Our interest is the period before that: by the time a leaf yellows or a root forks, the soil, moisture and timing conditions that caused it were set weeks earlier. We focus on what was already measurable during that window.",
  },
  {
    question: "Can I trust the findings?",
    answer:
      "Check them — that's why sources are attached. Each finding separates cited guidance from community signal from things we genuinely don't know, and links out to the original publisher. Where regional conditions or local rules should change the answer, we say so. Recommendations are for learning and are not a substitute for local Extension advice or product labels.",
  },
  {
    question: "How often do you publish?",
    answer:
      "One practical read a week, plus research notes as findings are added. Everything is free.",
  },
  {
    question: "What do I get if I subscribe?",
    answer:
      "One practical gardening read a week and the research notes as we map what fails and why. It's free, there's no spam, and you can unsubscribe in a click. You're not signing up to wait for anything — the first letter lands within the week.",
  },
  {
    question: "Are you selling anything, or using affiliate links?",
    answer:
      "No. There are no affiliate links and no sponsored placements in the Library or in any finding. Sources are chosen for practical clarity, not commercial relationships.",
  },
];

export default function FaqPage() {
  return (
    <>
      {/* base={false}: the root layout already emits Organization + WebSite. */}
      <StructuredData base={false} extra={[faqSchema(faqs)]} />

      <section className="pb-14 pt-32 sm:pt-40">
        <div className="container-page">
          <FadeUp immediate>
            <p className="label-mono">FAQ</p>
            <h1 className="mt-6 max-w-2xl text-balance font-heading text-[2.25rem] font-semibold leading-[1.05] tracking-tight text-ink sm:text-5xl">
              Straight answers about the research
            </h1>
          </FadeUp>
        </div>
      </section>

      <section className="section pt-0">
        <div className="container-page">
          <div className="max-w-2xl">
            {faqs.map((qa, i) => (
              <FadeUp
                key={qa.question}
                delay={Math.min(i, 4) * 0.05}
                className="border-t border-line py-9"
              >
                <h2 className="font-heading text-lg font-semibold leading-snug tracking-tight text-ink">
                  {qa.question}
                </h2>
                <p className="mt-4 text-[15px] leading-relaxed text-bark">
                  {qa.answer}
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
