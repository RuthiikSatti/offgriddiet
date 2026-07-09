import { cn } from "@/lib/utils";

/**
 * Vertical grid lines (agri-tech / editorial vibe). Absolutely fills its
 * nearest positioned parent, so drop it inside any `relative` container above
 * the background but behind the content. `tone` sets line colour.
 */
export function GridOverlay({
  tone = "light",
  className,
}: {
  tone?: "light" | "dark";
  className?: string;
}) {
  const line =
    tone === "light" ? "rgba(247,242,231,0.10)" : "rgba(31,61,43,0.10)";
  return (
    <div
      aria-hidden="true"
      className={cn("pointer-events-none absolute inset-0", className)}
      style={{
        backgroundImage: `repeating-linear-gradient(to right, ${line} 0, ${line} 1px, transparent 1px, transparent calc(100% / 7))`,
      }}
    />
  );
}
