import { cn } from "@/lib/utils";
import { FadeUp } from "@/components/motion/FadeUp";

type Props = {
  eyebrow?: string;
  title: string;
  description?: string;
  className?: string;
  /**
   * Render as the page's <h1>. Use on pages where this heading IS the page
   * title — a page with no h1 is a real SEO and screen-reader defect.
   */
  as?: "h1" | "h2";
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  className,
  as: Heading = "h2",
}: Props) {
  return (
    <FadeUp className={cn("max-w-2xl", className)}>
      {eyebrow && <p className="label-mono mb-5">{eyebrow}</p>}
      <Heading className="text-balance font-heading text-2xl font-semibold leading-tight tracking-tight text-ink sm:text-3xl">
        {title}
      </Heading>
      {description && (
        <p className="mt-5 text-[15px] leading-relaxed text-bark sm:text-base">
          {description}
        </p>
      )}
    </FadeUp>
  );
}
