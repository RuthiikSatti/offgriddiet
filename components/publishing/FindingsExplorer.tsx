"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, ChevronDown } from "lucide-react";
import { findings } from "@/lib/publication";
import { FadeUp } from "@/components/motion/FadeUp";

export function FindingsExplorer({ limit }: { limit?: number }) {
  const [open, setOpen] = useState<string | null>(null);
  const reduce = useReducedMotion();
  const visible = limit ? findings.slice(0, limit) : findings;

  return (
    <div>
      {visible.map((finding, index) => {
        const isOpen = open === finding.number;
        const panelId = `finding-panel-${finding.number}`;

        return (
          <FadeUp
            key={finding.number}
            delay={Math.min(index, 5) * 0.06}
            className="border-t border-line last:border-b"
          >
            <button
              type="button"
              onClick={() => setOpen(isOpen ? null : finding.number)}
              aria-expanded={isOpen}
              aria-controls={panelId}
              className="group flex w-full items-start gap-5 py-8 text-left sm:gap-8"
            >
              <span className="mt-1 font-mono text-xs tracking-[0.16em] text-bark">
                {finding.number}
              </span>

              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2 font-mono text-[10px] uppercase tracking-[0.16em] text-bark">
                  <span>{finding.topic}</span>
                  <span aria-hidden="true">/</span>
                  <span>{finding.evidence}</span>
                </div>
                <h2 className="mt-3 font-heading text-xl font-semibold leading-snug tracking-tight text-ink transition-colors group-hover:text-leaf sm:text-2xl">
                  {finding.title}
                </h2>
                <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-bark">
                  {finding.summary}
                </p>
              </div>

              <ChevronDown
                className={`mt-1 h-5 w-5 shrink-0 text-bark transition-transform duration-300 ${
                  isOpen ? "rotate-180 text-ink" : "group-hover:translate-y-0.5"
                }`}
                aria-hidden="true"
              />
            </button>

            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  id={panelId}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: reduce ? 0.15 : 0.32, ease: "easeInOut" }}
                  className="overflow-hidden"
                >
                  <div className="grid gap-10 pb-10 sm:grid-cols-[1.1fr_0.9fr] sm:pl-[3.25rem]">
                    <div>
                      <p className="label-mono text-leaf">Try this</p>
                      <ul className="mt-4 space-y-2.5 text-[15px] leading-relaxed text-ink/85">
                        {finding.whatToTry.map((step) => (
                          <li key={step} className="flex gap-3">
                            <span
                              className="mt-[0.6rem] h-1 w-1 shrink-0 rounded-full bg-leaf"
                              aria-hidden="true"
                            />
                            <span>{step}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <p className="label-mono">Evidence notes</p>
                      <p className="mt-4 text-sm leading-relaxed text-bark">
                        {finding.note}
                      </p>
                      <div className="mt-5 flex flex-wrap gap-x-5 gap-y-2">
                        {finding.sources.map((source) => (
                          <a
                            key={source.href}
                            href={source.href}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-1 rounded-sm text-xs font-medium text-ink underline decoration-line underline-offset-4 transition-colors hover:text-leaf hover:decoration-leaf"
                          >
                            {source.publisher}
                            <ArrowUpRight className="h-3 w-3" />
                          </a>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </FadeUp>
        );
      })}
    </div>
  );
}
