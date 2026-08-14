"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { siteConfig } from "@/lib/site";

/**
 * Persistent follow CTA.
 *
 * Two rules it must obey:
 *  1. Never cover the thing it points at — it hides while any signup form is
 *     on screen, otherwise on mobile it sits directly over the form you just
 *     scrolled to.
 *  2. Never appear before the hero's own CTA has had its turn.
 *
 * Deliberately plain CSS rather than AnimatePresence: an exit animation that
 * fails to complete (which is what happens under prefers-reduced-motion) leaves
 * an invisible but still-clickable bar pinned across the bottom of the screen.
 * `visibility: hidden` also drops it out of the tab order while hidden, so
 * keyboard users never land on an invisible control.
 */
export function StickyFollow() {
  const [past, setPast] = useState(false);
  const [formVisible, setFormVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setPast(window.scrollY > window.innerHeight * 0.6);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  useEffect(() => {
    // Observe every signup form on the page, not just #follow — the footer
    // carries one too, and the button would otherwise sit on top of it.
    const targets = document.querySelectorAll("[data-follow-form]");
    if (!targets.length) return;
    const seen = new Set<Element>();
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) seen.add(entry.target);
          else seen.delete(entry.target);
        }
        setFormVisible(seen.size > 0);
      },
      { rootMargin: "-10% 0px -10% 0px" }
    );
    targets.forEach((t) => io.observe(t));
    return () => io.disconnect();
  }, []);

  const visible = past && !formVisible;

  return (
    <div
      aria-hidden={!visible}
      className={`fixed inset-x-0 bottom-0 z-40 flex justify-center px-4 pb-[max(1rem,env(safe-area-inset-bottom))] transition-all duration-300 ease-out sm:inset-x-auto sm:right-6 sm:justify-end ${
        visible
          ? "visible translate-y-0 opacity-100"
          : "invisible translate-y-3 opacity-0"
      }`}
    >
      <Link
        href="/#follow"
        tabIndex={visible ? undefined : -1}
        className="group inline-flex w-full max-w-sm items-center justify-center gap-2.5 rounded-full bg-ink px-6 py-3.5 text-sm font-medium text-paper shadow-soft transition-colors hover:bg-leaf focus-visible:ring-2 focus-visible:ring-leaf focus-visible:ring-offset-2 focus-visible:ring-offset-paper sm:w-auto sm:py-3"
      >
        {siteConfig.followCta}
        <ArrowRight className="h-4 w-4 transition-transform motion-safe:group-hover:translate-x-0.5" />
      </Link>
    </div>
  );
}
