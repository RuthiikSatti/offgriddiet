"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  useMotionValueEvent,
} from "framer-motion";
import { GridOverlay } from "@/components/layout/GridOverlay";

const DURATION = 15.04;

/**
 * Linear scroll→time map: the video advances with every bit of scroll (never
 * freezes). The footage settles on its own at the camera stops (0, 2, 6, 10,
 * 15s); we reveal each chapter's glass card in a window around the matching
 * scroll position (stop fraction = time / duration).
 */
function scrollToTime(u: number): number {
  return Math.min(Math.max(u, 0), 1) * DURATION;
}

type Side = "left" | "right" | "center";
type Chapter = {
  side: Side;
  tag: string;
  stat?: { n: string; unit: string };
  title: string;
  body: string;
  chips?: string[];
};

const chapters: Chapter[] = [
  {
    side: "right",
    tag: "00:00 · SEED",
    title: "It starts with a seed.",
    body: "Every plate of homegrown food begins with one small decision to try.",
  },
  {
    side: "left",
    tag: "00:02 · THE PATTERN",
    stat: { n: "2,586", unit: "upvotes on one carrot-failure post" },
    title: "Then it fails. Again.",
    body: "Five straight years of failed carrots, from one gardener — and a flood of “me too” in the replies. This isn't bad luck. It's a documented pattern.",
  },
  {
    side: "right",
    tag: "00:06 · THE GAP",
    stat: { n: "8 → 1", unit: "pain points · solved by today's apps" },
    title: "Eight problems. One solved.",
    body: "We mapped 8 real pain points from gardening threads across Reddit. Every plant app on the market solves exactly one: telling you what's already wrong, after it's visible.",
  },
  {
    side: "left",
    tag: "00:10 · THE BUILD",
    stat: { n: "7", unit: "problems nobody else is solving" },
    title: "We're building the other seven.",
    body: "The gaps everyone ignores — that's what Off Grid Diet is for:",
    chips: [
      "Harvest timing",
      "Pest warnings",
      "Cost vs yield",
      "Soil & compost clarity",
      "Balcony & small-space",
      "Multi-year failure memory",
      "Beginner guidance",
    ],
  },
];

function align(side: Side) {
  if (side === "right") return "ml-auto";
  if (side === "left") return "mr-auto";
  return "mx-auto";
}

function GlassCard({ c }: { c: Chapter }) {
  return (
    <div className="relative">
      {/* liquid-glass bubbles */}
      <div className="pointer-events-none absolute -left-10 -top-12 h-40 w-40 rounded-full bg-sprout/25 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-14 right-2 h-48 w-48 rounded-full bg-forest-700/50 blur-3xl" />

      <div className="relative overflow-hidden rounded-[2rem] border border-cream/25 bg-forest-900/40 p-7 shadow-lift backdrop-blur-md sm:p-9">
        {/* glass sheen */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-cream/15 via-transparent to-transparent" />
        <div className="relative">
          <p className="font-mono text-[11px] font-bold uppercase tracking-[0.25em] text-sprout-light">
            [ {c.tag} ]
          </p>

          {c.stat && (
            <div className="mt-3 flex items-baseline gap-3">
              <span className="font-heading text-6xl font-extrabold leading-none text-sprout-light drop-shadow sm:text-7xl">
                {c.stat.n}
              </span>
              <span className="max-w-[9rem] font-mono text-[11px] uppercase leading-tight tracking-widest text-cream/75">
                {c.stat.unit}
              </span>
            </div>
          )}

          <h2 className="mt-4 font-heading text-3xl font-extrabold uppercase leading-[0.95] tracking-tight text-cream sm:text-4xl">
            {c.title}
          </h2>
          <p className="mt-3 text-base leading-relaxed text-cream/90 sm:text-lg">
            {c.body}
          </p>

          {c.chips && (
            <div className="mt-4 flex flex-wrap gap-2">
              {c.chips.map((chip) => (
                <span
                  key={chip}
                  className="rounded-full border border-cream/20 bg-cream/5 px-3 py-1 font-mono text-[10px] uppercase tracking-wider text-cream/85"
                >
                  {chip}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export function ChapterHero() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const target = useRef(0);
  const [videoOk, setVideoOk] = useState(true);

  const { scrollYProgress } = useScroll({
    target: wrapRef,
    offset: ["start start", "end end"],
  });
  const progress = useSpring(scrollYProgress, {
    stiffness: 180,
    damping: 34,
    mass: 0.25,
  });
  useMotionValueEvent(progress, "change", (v) => {
    target.current = v;
  });

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    let raf = 0;
    let current = 0;

    const prime = () => {
      const p = v.play();
      if (p && typeof p.then === "function") p.then(() => v.pause()).catch(() => {});
    };
    v.addEventListener("loadedmetadata", prime, { once: true });

    const tick = () => {
      const dur = v.duration || DURATION;
      const goal = Math.min(scrollToTime(target.current), dur - 0.05);
      current = goal;
      if (!v.seeking && Math.abs(v.currentTime - current) > 0.02) {
        try {
          v.currentTime = current;
        } catch {
          /* not seekable yet */
        }
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      v.removeEventListener("loadedmetadata", prime);
    };
  }, []);

  // Each chapter visible in a wide window (long readable plateau) around its
  // stop, with quick edge fades so cards never overlap mid-travel.
  const o0 = useTransform(progress, [0, 0.1, 0.13], [1, 1, 0]);
  const o1 = useTransform(progress, [0.15, 0.19, 0.33, 0.37], [0, 1, 1, 0]);
  const o2 = useTransform(progress, [0.39, 0.43, 0.57, 0.61], [0, 1, 1, 0]);
  const o3 = useTransform(progress, [0.63, 0.67, 0.82, 0.86], [0, 1, 1, 0]);
  const o4 = useTransform(progress, [0.88, 0.93, 1.0], [0, 1, 1]);
  const hint = useTransform(progress, [0, 0.05], [1, 0]);
  const opacities = [o0, o1, o2, o3];

  return (
    <section ref={wrapRef} className="relative h-[650vh]">
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-forest-900">
        {/* Poster fallback */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url(/images/hero-poster.jpg)" }}
          aria-hidden="true"
        />
        {videoOk && (
          <video
            ref={videoRef}
            className="absolute inset-0 h-full w-full object-cover"
            muted
            playsInline
            preload="auto"
            poster="/images/hero-poster.jpg"
            onError={() => setVideoOk(false)}
          >
            <source src="/videos/bg-grow.mp4" type="video/mp4" />
          </video>
        )}

        <div
          className="absolute inset-0 bg-gradient-to-b from-forest-900/45 via-forest-900/30 to-forest-900/65"
          aria-hidden="true"
        />
        <GridOverlay tone="light" />

        {/* Chapter cards */}
        {chapters.map((c, i) => (
          <motion.div
            key={i}
            style={{ opacity: opacities[i] }}
            className="pointer-events-none absolute inset-0 flex items-center"
          >
            <div className="container-page w-full">
              <div className={`w-full max-w-lg ${align(c.side)}`}>
                <GlassCard c={c} />
              </div>
            </div>
          </motion.div>
        ))}

        {/* Final centre panel — brand + CTA */}
        <motion.div
          style={{ opacity: o4 }}
          className="absolute inset-0 flex items-center"
        >
          <div className="container-page w-full text-center">
            <p className="font-mono text-xs font-bold uppercase tracking-[0.25em] text-sprout-light">
              [ 00:15 · OFF GRID DIET ]
            </p>
            <h2 className="mx-auto mt-4 max-w-4xl font-heading text-4xl font-extrabold uppercase leading-[0.9] tracking-tight text-cream drop-shadow sm:text-7xl">
              Grow food that actually survives.
            </h2>
            <div className="pointer-events-auto mt-8 flex flex-wrap justify-center gap-3">
              <Link
                href="#waitlist"
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
        </motion.div>

        {/* Scroll hint */}
        <motion.div
          style={{ opacity: hint }}
          className="absolute bottom-6 left-1/2 -translate-x-1/2 font-mono text-[11px] uppercase tracking-[0.25em] text-cream/70"
        >
          Scroll to grow ↓
        </motion.div>
      </div>
    </section>
  );
}
