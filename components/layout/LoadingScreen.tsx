"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

/**
 * Full-screen intro that covers the initial paint (fonts + hero video loading)
 * with a seed-growing-into-a-plant animation, then fades away. Renders visible
 * on first paint (SSR) so there's no flash of the poster/fallback fonts.
 */
export function LoadingScreen() {
  const [done, setDone] = useState(false);

  // Lock scrolling (and pin to the top) while the intro plays, so scrolling
  // can't slide the page underneath the loader or dismiss it early.
  useEffect(() => {
    if (!done) {
      window.scrollTo(0, 0);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [done]);

  useEffect(() => {
    const MIN_MS = 2000; // let the grow animation play out
    const start = Date.now();
    let timer: ReturnType<typeof setTimeout>;

    const finish = () => {
      const wait = Math.max(0, MIN_MS - (Date.now() - start));
      timer = setTimeout(() => setDone(true), wait);
    };

    // Wait for the fonts to load (the real flash), plus the min animation time —
    // not the full hero video download (the poster covers that gracefully).
    const fonts = (document as Document & { fonts?: { ready: Promise<unknown> } })
      .fonts?.ready;
    if (fonts && typeof fonts.then === "function") fonts.then(finish);
    else finish();

    // Safety cap so it never gets stuck.
    const cap = setTimeout(() => setDone(true), 4500);

    return () => {
      clearTimeout(timer);
      clearTimeout(cap);
    };
  }, []);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          key="loader"
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-forest-900"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
        >
          <GrowPlant />
          <motion.p
            className="mt-8 font-mono text-xs uppercase tracking-[0.35em] text-sprout-light"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 1] }}
            transition={{ duration: 2, times: [0, 0.3, 1] }}
          >
            Growing…
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

const SPROUT = "#8FBF63";
const SOIL = "#5B4636";

function GrowPlant() {
  const leaf = {
    initial: { scale: 0, opacity: 0 },
    animate: { scale: 1, opacity: 1 },
  };
  return (
    <svg
      width="120"
      height="150"
      viewBox="0 0 120 150"
      fill="none"
      aria-hidden="true"
    >
      {/* soil line */}
      <motion.line
        x1="30"
        y1="140"
        x2="90"
        y2="140"
        stroke={SOIL}
        strokeWidth="3"
        strokeLinecap="round"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
      />
      {/* seed */}
      <motion.ellipse
        cx="60"
        cy="134"
        rx="6"
        ry="4"
        fill={SOIL}
        initial={{ opacity: 1, scale: 1 }}
        animate={{ opacity: [1, 1, 0.4], scale: [1, 1, 0.8] }}
        transition={{ duration: 1, times: [0, 0.4, 1] }}
        style={{ transformBox: "fill-box", transformOrigin: "center" }}
      />
      {/* stem */}
      <motion.path
        d="M60 134 C60 100 60 80 60 45"
        stroke={SPROUT}
        strokeWidth="4"
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1.2, delay: 0.3, ease: "easeOut" }}
      />
      {/* lower leaves */}
      <motion.path
        d="M60 100 C40 96 30 104 34 116 C48 116 58 110 60 100 Z"
        fill={SPROUT}
        variants={leaf}
        initial="initial"
        animate="animate"
        transition={{ duration: 0.5, delay: 0.9, ease: "backOut" }}
        style={{ transformBox: "fill-box", transformOrigin: "90% 20%" }}
      />
      <motion.path
        d="M60 92 C80 88 90 96 86 108 C72 108 62 102 60 92 Z"
        fill={SPROUT}
        variants={leaf}
        initial="initial"
        animate="animate"
        transition={{ duration: 0.5, delay: 1.1, ease: "backOut" }}
        style={{ transformBox: "fill-box", transformOrigin: "10% 20%" }}
      />
      {/* top leaves */}
      <motion.path
        d="M60 66 C44 60 34 68 38 80 C52 80 60 74 60 66 Z"
        fill="#A9D17E"
        variants={leaf}
        initial="initial"
        animate="animate"
        transition={{ duration: 0.5, delay: 1.35, ease: "backOut" }}
        style={{ transformBox: "fill-box", transformOrigin: "90% 20%" }}
      />
      <motion.path
        d="M60 60 C76 54 86 62 82 74 C68 74 60 68 60 60 Z"
        fill="#A9D17E"
        variants={leaf}
        initial="initial"
        animate="animate"
        transition={{ duration: 0.5, delay: 1.5, ease: "backOut" }}
        style={{ transformBox: "fill-box", transformOrigin: "10% 20%" }}
      />
      {/* top bud */}
      <motion.circle
        cx="60"
        cy="44"
        r="6"
        fill="#A9D17E"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, delay: 1.65, ease: "backOut" }}
        style={{ transformBox: "fill-box", transformOrigin: "center" }}
      />
    </svg>
  );
}
