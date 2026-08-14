import Link from "next/link";
import { ArrowRight, BookOpenText, FlaskConical } from "lucide-react";
import { FindingsExplorer } from "@/components/publishing/FindingsExplorer";
import { ResourceLibrary } from "@/components/publishing/ResourceLibrary";
import { FadeUp } from "@/components/motion/FadeUp";

export function PublishingHub() {
  return <>
    <section className="relative overflow-hidden bg-cream py-20 md:py-28">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-[linear-gradient(to_bottom,rgba(31,61,43,0.08),transparent)]" />
      <div className="container-page">
        <FadeUp className="max-w-3xl">
          <p className="font-mono text-xs font-bold uppercase tracking-[0.22em] text-sprout">[ Research worth using ]</p>
          <h2 className="mt-4 font-heading text-4xl font-extrabold uppercase leading-[0.93] tracking-tight text-forest sm:text-6xl">A field notebook,<br />not a feed.</h2>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-stone sm:text-lg">Short, practical findings with the evidence and limitations left intact. We keep community signals separate from cited guidance, so you can decide what fits your own garden.</p>
        </FadeUp>
        <div className="mt-12"><FindingsExplorer limit={3} /></div>
        <FadeUp className="mt-8"><Link href="/findings" className="inline-flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-[0.14em] text-forest underline decoration-sprout decoration-2 underline-offset-8 hover:text-sprout">Explore all findings <ArrowRight className="h-4 w-4" /></Link></FadeUp>
      </div>
    </section>
    <section className="bg-forest py-20 md:py-28">
      <div className="container-page">
        <FadeUp className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div className="max-w-2xl"><p className="font-mono text-xs font-bold uppercase tracking-[0.22em] text-sprout-light">[ The practical library ]</p><h2 className="mt-4 font-heading text-4xl font-extrabold uppercase leading-[0.93] tracking-tight text-cream sm:text-6xl">Good sources,<br />less noise.</h2><p className="mt-5 text-base leading-relaxed text-cream/75 sm:text-lg">A growing shelf of public guides and frameworks from Extension services and USDA agencies. Each resource explains who it is for and where local context matters.</p></div>
          <BookOpenText className="h-12 w-12 text-sprout-light/60" />
        </FadeUp>
        <div className="mt-12 [&_article]:bg-cream"><ResourceLibrary limit={4} /></div>
        <FadeUp className="mt-8"><Link href="/library" className="inline-flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-[0.14em] text-cream underline decoration-sprout-light decoration-2 underline-offset-8 hover:text-sprout-light">Browse the library <ArrowRight className="h-4 w-4" /></Link></FadeUp>
      </div>
    </section>
    <section className="border-y border-forest/15 bg-sun/20 py-14">
      <div className="container-page grid gap-6 md:grid-cols-[auto_1fr_auto] md:items-center"><FlaskConical className="h-9 w-9 text-forest" /><div><p className="font-heading text-2xl font-extrabold uppercase text-forest">Help shape the next field note.</p><p className="mt-1 max-w-2xl text-sm leading-relaxed text-forest/75">Have a growing question, a practical resource, or an experiment worth documenting? Join the Weekly Harvest and reply when it lands.</p></div><Link href="/#waitlist" className="inline-flex items-center justify-center border border-forest bg-forest px-5 py-3 font-mono text-xs font-bold uppercase tracking-[0.12em] text-cream transition-colors hover:bg-forest-700">Join the Harvest</Link></div>
    </section>
  </>;
}
