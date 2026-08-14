"use client";

import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";
import { useReveal } from "@/components/motion/useReveal";

type FadeUpProps = HTMLAttributes<HTMLDivElement> & {
  children?: ReactNode;
  /** Seconds of stagger delay. */
  delay?: number;
  /** Reveal on mount instead of waiting for the viewport. */
  immediate?: boolean;
};

/**
 * Scroll reveal: 12px of travel, 500ms, no more. The motion budget for this
 * site is restraint. Reduced motion is handled entirely in CSS (globals.css).
 */
export function FadeUp({
  children,
  className,
  delay = 0,
  immediate = false,
  style,
  ...props
}: FadeUpProps) {
  const { ref, shown } = useReveal<HTMLDivElement>(immediate);

  return (
    <div
      ref={ref}
      className={cn("reveal", shown && "reveal-in", className)}
      style={{ transitionDelay: delay ? `${delay}s` : undefined, ...style }}
      {...props}
    >
      {children}
    </div>
  );
}
