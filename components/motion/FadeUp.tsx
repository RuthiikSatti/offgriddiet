"use client";

import { motion, type HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";

type FadeUpProps = HTMLMotionProps<"div"> & {
  delay?: number;
  immediate?: boolean;
};

/** Reusable fade-up-on-scroll wrapper used across sections. */
export function FadeUp({
  children,
  className,
  delay = 0,
  immediate = false,
  ...props
}: FadeUpProps) {
  return (
    <motion.div
      className={cn(className)}
      initial={{ opacity: 0, y: 18 }}
      {...(immediate
        ? { animate: { opacity: 1, y: 0 } }
        : {
            whileInView: { opacity: 1, y: 0 },
            viewport: { once: true, margin: "-80px" },
          })}
      transition={{ duration: 0.6, ease: "easeOut", delay }}
      {...props}
    >
      {children}
    </motion.div>
  );
}
