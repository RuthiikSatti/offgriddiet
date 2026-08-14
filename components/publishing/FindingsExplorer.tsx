"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, ChevronDown, FlaskConical, Sprout } from "lucide-react";
import { findings } from "@/lib/publication";

export function FindingsExplorer({ limit }: { limit?: number }) {
  const [open, setOpen] = useState<string | null>(null);
  const visible = limit ? findings.slice(0, limit) : findings;

  return (
    <div className="grid gap-4">
      {visible.map((finding, index) => {
        const isOpen = open === finding.number;
        return (
          <motion.article
            key={finding.number}
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.55, delay: index * 0.08 }}
            className="overflow-hidden border border-forest/15 bg-white shadow-soft"
          >
            <button
              type="button"
              onClick={() => setOpen(isOpen ? null : finding.number)}
              aria-expanded={isOpen}
              className="group flex w-full items-start gap-4 p-5 text-left sm:gap-7 sm:p-7"
            >
              <span className="mt-0.5 font-mono text-xs font-bold tracking-[0.18em] text-sprout">{finding.number}</span>
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2 font-mono text-[10px] uppercase tracking-[0.16em] text-stone">
                  <span>{finding.topic}</span><span className="text-sprout">/</span><span>{finding.evidence}</span>
                </div>
                <h2 className="mt-3 font-heading text-2xl font-extrabold uppercase leading-[0.98] text-forest sm:text-3xl">{finding.title}</h2>
                <p className="mt-3 max-w-3xl text-sm leading-relaxed text-stone sm:text-base">{finding.summary}</p>
              </div>
              <ChevronDown className={`mt-1 h-5 w-5 shrink-0 text-forest transition-transform duration-300 ${isOpen ? "rotate-180" : "group-hover:translate-y-0.5"}`} />
            </button>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.35, ease: "easeInOut" }}
                  className="overflow-hidden"
                >
                  <div className="grid gap-6 border-t border-forest/10 bg-cream/60 p-5 sm:grid-cols-[1.1fr_0.9fr] sm:p-7">
                    <div>
                      <p className="flex items-center gap-2 font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-forest"><Sprout className="h-3.5 w-3.5 text-sprout" /> Try this</p>
                      <ul className="mt-3 space-y-2 text-sm leading-relaxed text-forest/80">
                        {finding.whatToTry.map((step) => <li key={step} className="flex gap-2"><span className="text-sprout">—</span><span>{step}</span></li>)}
                      </ul>
                    </div>
                    <div>
                      <p className="flex items-center gap-2 font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-forest"><FlaskConical className="h-3.5 w-3.5 text-sun" /> Evidence notes</p>
                      <p className="mt-3 text-sm leading-relaxed text-stone">{finding.note}</p>
                      <div className="mt-4 flex flex-wrap gap-x-4 gap-y-2">
                        {finding.sources.map((source) => (
                          <a key={source.href} href={source.href} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 text-xs font-semibold text-forest underline decoration-sprout/60 underline-offset-4 transition-colors hover:text-sprout">
                            {source.publisher}<ArrowUpRight className="h-3 w-3" />
                          </a>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.article>
        );
      })}
    </div>
  );
}
