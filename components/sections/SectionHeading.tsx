import { cn } from "@/lib/utils";
import { FadeUp } from "@/components/motion/FadeUp";

type Props = {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  light?: boolean;
  className?: string;
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
  light = false,
  className,
}: Props) {
  return (
    <FadeUp
      className={cn(
        "max-w-3xl",
        align === "center" ? "mx-auto text-center" : "",
        className
      )}
    >
      {eyebrow && (
        <p
          className={cn(
            "mb-4 font-mono text-xs font-bold uppercase tracking-[0.25em]",
            light ? "text-sprout-light" : "text-sprout"
          )}
        >
          [ {eyebrow} ]
        </p>
      )}
      <h2
        className={cn(
          "font-heading text-3xl font-extrabold uppercase leading-[0.95] tracking-tight text-balance sm:text-5xl",
          light ? "text-cream" : "text-forest"
        )}
      >
        {title}
      </h2>
      {description && (
        <p
          className={cn(
            "mt-5 text-base leading-relaxed sm:text-lg",
            light ? "text-cream/80" : "text-stone"
          )}
        >
          {description}
        </p>
      )}
    </FadeUp>
  );
}
