import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { ResourceLibrary } from "@/components/publishing/ResourceLibrary";
import { FadeUp } from "@/components/motion/FadeUp";

export const metadata: Metadata = {
  title: "Resource Library",
  description:
    "A practical library of public gardening guides from Extension services and USDA agencies.",
  alternates: { canonical: "/library" },
};

export default function LibraryPage() {
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

            <p className="label-mono mt-10">Library</p>
            <h1 className="mt-6 max-w-2xl text-balance font-heading text-[2.25rem] font-semibold leading-[1.05] tracking-tight text-ink sm:text-5xl">
              Keep the useful stuff close.
            </h1>

            <div className="mt-8 grid max-w-3xl gap-8 md:grid-cols-2">
              <p className="text-lg leading-relaxed text-bark">
                A living shelf of guides, tools, and references selected for
                practical clarity. No affiliate links, no sponsored placements.
              </p>
              <p className="border-l-2 border-leaf pl-6 text-sm leading-relaxed text-ink/80">
                We prioritise public Extension programmes and government
                sources, and flag when regional conditions or local rules should
                guide the final call.
              </p>
            </div>
          </FadeUp>
        </div>
      </section>

      <section className="section pt-0">
        <div className="container-page">
          <ResourceLibrary />
        </div>
      </section>
    </>
  );
}
