import type { Metadata } from "next";
import { ResourceLibrary } from "@/components/publishing/ResourceLibrary";

export const metadata: Metadata = {
  title: "Resource Library",
  description: "A practical library of public gardening guides from Extension services and USDA agencies.",
};

export default function LibraryPage() {
  return <>
    <section className="bg-cream pb-16 pt-32 md:pb-20 md:pt-40"><div className="container-page"><p className="font-mono text-xs font-bold uppercase tracking-[0.24em] text-sprout">[ The resource library ]</p><h1 className="mt-5 max-w-5xl font-heading text-5xl font-extrabold uppercase leading-[0.88] tracking-tight text-forest sm:text-7xl">Keep the useful<br />stuff close.</h1><div className="mt-7 grid max-w-4xl gap-5 md:grid-cols-2"><p className="text-base leading-relaxed text-stone sm:text-lg">A living shelf of guides, tools, and references selected for practical clarity. No affiliate links, no sponsored placements.</p><p className="border-l-2 border-sprout pl-5 text-sm leading-relaxed text-forest/80">We prioritize public Extension programs and government sources, and flag when regional conditions or local rules should guide the final call.</p></div></div></section>
    <section className="border-t border-forest/15 bg-white py-14 md:py-20"><div className="container-page"><ResourceLibrary /></div></section>
  </>;
}
