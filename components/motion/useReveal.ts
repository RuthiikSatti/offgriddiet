"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Scroll-reveal trigger.
 *
 * Returns a ref to attach and whether the element has entered the viewport.
 * The actual animation is CSS (see `.reveal` in globals.css) rather than
 * Framer Motion, because Framer strips transforms on the client when the user
 * has prefers-reduced-motion set while the server can't know that preference —
 * which renders mismatched inline styles and trips React hydration.
 *
 * The timeout is a safety net: content must never stay permanently invisible
 * because an IntersectionObserver didn't fire.
 */
export function useReveal<T extends HTMLElement>(immediate = false) {
  const ref = useRef<T>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    if (immediate) {
      setShown(true);
      return;
    }
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") {
      setShown(true);
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setShown(true);
          io.disconnect();
        }
      },
      { rootMargin: "0px 0px -80px 0px" }
    );
    io.observe(el);

    const failsafe = window.setTimeout(() => setShown(true), 3000);
    return () => {
      io.disconnect();
      window.clearTimeout(failsafe);
    };
  }, [immediate]);

  return { ref, shown };
}
