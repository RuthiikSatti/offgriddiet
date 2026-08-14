import type { Metadata } from "next";
import { FindingsExplorer } from "@/components/publishing/FindingsExplorer";

export const metadata: Metadata = {
  title: "Findings",
  description: "Practical gardening findings with clear evidence notes, limitations, and next steps.",
};

export default function FindingsPage() {
  return <>
    <section className="relative overflow-hidden bg-forest pb-20 pt-32 text-cream md:pb-28 md:pt-40">
      <div className="pointer-events-none absolute inset-0 opacity-25 [background-image:linear-gradient(rgba(247,242,231,0.15)_1px,transparent_1px),linear-gradient(90deg,rgba(247,242,231,0.15)_1px,transparent_1px)] [background-size:48px_48px]" />
      <div className="container-page relative"><p className="font-mono text-xs font-bold uppercase tracking-[0.24em] text-sprout-light">[ Off Grid Diet / Findings ]</p><h1 className="mt-5 max-w-5xl font-heading text-5xl font-extrabold uppercase leading-[0.88] tracking-tight sm:text-7xl">Evidence you<br />can grow with.</h1><p className="mt-7 max-w-2xl text-base leading-relaxed text-cream/75 sm:text-lg">Each note separates cited guidance, community signals, and what we still do not know. Start with the practical next step—then make it fit your garden.</p></div>
    </section>
    <section className="bg-cream py-16 md:py-24"><div className="container-page"><div className="mb-10 grid gap-4 border-b border-forest/15 pb-8 md:grid-cols-2"><p className="font-mono text-[10px] uppercase tracking-[0.16em] text-stone">Issue 01 · August 2026</p><p className="text-sm leading-relaxed text-stone md:text-right">Evidence links open to their original public publishers. Recommendations are for learning—not a substitute for local Extension advice or product labels.</p></div><FindingsExplorer /></div></section>
  </>;
}
