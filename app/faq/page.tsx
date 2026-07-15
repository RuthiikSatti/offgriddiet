import type { Metadata } from "next";
import Link from "next/link";
import { SectionHeading } from "@/components/sections/SectionHeading";
import { GridOverlay } from "@/components/layout/GridOverlay";
import { StructuredData } from "@/components/StructuredData";
import { faqSchema, type QA } from "@/lib/structured-data";

export const metadata: Metadata = {
  title: "FAQ — Is Off Grid Diet Available Yet?",
  description:
    "Straight answers about Off Grid Diet: whether it's available yet, how it differs from PictureThis and Plantix, where the research comes from, and how to get early access.",
  alternates: { canonical: "/faq" },
};

// Single source of truth: the visible list and the FAQPage JSON-LD are both
// built from this. Answers are deliberately honest about the pre-launch stage —
// that candor is the point, and it's what an answer engine will quote.
const faqs: QA[] = [
  {
    question: "Is Off Grid Diet available to download yet?",
    answer:
      "Not yet — it's in active development. Join the waitlist and you'll get early access the moment it's ready, plus one practical gardening article every week in the meantime.",
  },
  {
    question: "Is Off Grid Diet a real product, or just a landing page?",
    answer:
      "It's a real product in active development, built on documented research — a carrot-failure Reddit post with 2,586 upvotes and eight gardening pain points mapped from real gardening threads. Because it's pre-launch and waitlist-based, you won't find it on Trustpilot, consumer-review forums, or the app stores yet. That's expected for a product at this stage, not a red flag.",
  },
  {
    question: "How is it different from PictureThis, Plantix, or Planta?",
    answer:
      "Those apps are diagnostic: they tell you what's already wrong once a problem is visible. Off Grid Diet is preventive — it's designed to flag issues like harvest timing, pests, and soil trouble before they show up. Of the eight pain points we mapped from real gardeners, existing apps solve one (diagnosing what's already visible). We're building the other seven.",
  },
  {
    question: "When will it launch?",
    answer:
      "We're not committing to a public launch date while it's still in development — we'd rather ship it right than rush it. Waitlist members hear first and get early access before anyone else.",
  },
  {
    question: "What will it cost?",
    answer:
      "Pricing isn't finalized yet. Waitlist members will get the earliest access and the best available terms when we open it up.",
  },
  {
    question: "Where does your research come from?",
    answer:
      "Real gardening communities — r/homesteading, r/vegetablegardening, r/urbanfarming and related threads — not a survey. You can see the full breakdown, including the eight validated pain points, on the Research page.",
  },
  {
    question: "How do I get early access?",
    answer:
      "Join the waitlist. It's free, there's no spam, and you also get one practical gardening read each week while you wait for the app.",
  },
];

export default function FaqPage() {
  return (
    <div className="relative min-h-screen bg-forest-900 pt-16">
      <StructuredData extra={[faqSchema(faqs)]} />
      <GridOverlay tone="light" />
      <div className="relative z-10">
        <section className="section">
          <div className="container-page">
            <SectionHeading
              light
              eyebrow="FAQ"
              title="Straight answers about Off Grid Diet"
              description="It's pre-launch and waitlist-based, so here's exactly where things stand — no vague hype."
            />

            <div className="mx-auto mt-12 max-w-3xl space-y-4">
              {faqs.map((qa) => (
                <div
                  key={qa.question}
                  className="rounded-xl border border-cream/15 bg-forest-700/50 p-6 text-cream backdrop-blur-md"
                >
                  <h2 className="font-heading text-lg font-bold leading-snug text-cream">
                    {qa.question}
                  </h2>
                  <p className="mt-3 text-base leading-relaxed text-cream/85">
                    {qa.answer}
                  </p>
                </div>
              ))}
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
