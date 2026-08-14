import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { FindingsExplorer } from "@/components/publishing/FindingsExplorer";
import { FadeUp } from "@/components/motion/FadeUp";

export const metadata: Metadata = {
  title: "Findings",
  description:
    "Practical gardening findings with clear evidence notes, limitations, and next steps.",
  alternates: { canonical: "/findings" },
};

export default function FindingsPage() {
  return (
    <>
      <section className="pb-14 pt-32 sm:pt-40">
        <div className="container-page">
          <FadeUp immediate>
            <Link
              href="/research"
              className="inline-flex items-center gap-1.5 rounded-sm text-sm text-bark transition-colors hover:text-ink"
            >
              <ArrowLeft className="h-3.5 w-3.5" /> Research
            </Link>

            <p className="label-mono mt-10">Findings</p>
            <h1 className="mt-6 max-w-2xl text-balance font-heading text-[2.25rem] font-semibold leading-[1.05] tracking-tight text-ink sm:text-5xl">
              Evidence you can grow with.
            </h1>
            <p className="mt-7 max-w-xl text-lg leading-relaxed text-bark">
              Each note separates cited guidance, community signal, and what we
              still don&apos;t know. Start with the practical next step — then
              make it fit your garden.
            </p>
          </FadeUp>
        </div>
      </section>

      <section className="section pt-0">
        <div className="container-page">
          <div className="mb-12 grid gap-4 border-t border-line pt-6 md:grid-cols-2">
            <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-bark">
              Issue 01 · August 2026
            </p>
            <p className="max-w-md text-sm leading-relaxed text-bark md:justify-self-end md:text-right">
              Evidence links open to their original public publishers.
              Recommendations are for learning — not a substitute for local
              Extension advice or product labels.
            </p>
          </div>
          <FindingsExplorer />
        </div>
      </section>
    </>
  );
}
