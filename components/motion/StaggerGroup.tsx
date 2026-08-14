"use client";

import {
  Children,
  isValidElement,
  cloneElement,
  type HTMLAttributes,
  type ReactNode,
  type ReactElement,
} from "react";
import { cn } from "@/lib/utils";
import { useReveal } from "@/components/motion/useReveal";

/**
 * Reveals children in sequence, 60ms apart. CSS-driven for the same
 * hydration-safety reason as FadeUp — see components/motion/useReveal.ts.
 */
export function StaggerGroup({
  children,
  className,
  ...props
}: HTMLAttributes<HTMLDivElement> & { children?: ReactNode }) {
  const { ref, shown } = useReveal<HTMLDivElement>();

  return (
    <div ref={ref} className={cn(className)} {...props}>
      {Children.map(children, (child, i) => {
        if (!isValidElement(child)) return child;
        const el = child as ReactElement<{
          className?: string;
          style?: React.CSSProperties;
        }>;
        return cloneElement(el, {
          className: cn("reveal", shown && "reveal-in", el.props.className),
          style: { transitionDelay: `${i * 0.06}s`, ...el.props.style },
        });
      })}
    </div>
  );
}

/**
 * Marks a direct child of StaggerGroup. It's a plain wrapper — StaggerGroup
 * injects the reveal classes and the per-item delay.
 */
export function StaggerItem({
  children,
  className,
  ...props
}: HTMLAttributes<HTMLDivElement> & { children?: ReactNode }) {
  return (
    <div className={cn(className)} {...props}>
      {children}
    </div>
  );
}
