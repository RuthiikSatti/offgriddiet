/**
 * Botanical line art.
 *
 * Hand-authored SVG rather than generated raster: each mark is well under 1 kB,
 * stays crisp at any size, and inherits `currentColor` so it re-themes with the
 * palette instead of being baked to one colour. Drawn in a field-guide /
 * seed-catalogue register — the illustrated layer is what stops a research
 * publication about plants reading as a generic text site.
 *
 * All marks are decorative: they render aria-hidden and carry no semantics.
 */

type MarkProps = {
  className?: string;
  /** Stroke weight. Thin marks want ~1.25, large hero marks ~1. */
  strokeWidth?: number;
};

const base = {
  fill: "none",
  stroke: "currentColor",
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

/** Two seed leaves on a stem — the "growth / early state" mark. */
export function Sprout({ className = "", strokeWidth = 1.25 }: MarkProps) {
  return (
    <svg
      viewBox="0 0 40 48"
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      <g {...base} strokeWidth={strokeWidth}>
        <path d="M20 46V18" />
        <path d="M20 26C20 26 9 25 6 16c9-2 14 4 14 10Z" />
        <path d="M20 22C20 22 22 10 32 8c1 9-6 13-12 14Z" />
        <path d="M12 20c3 1 6 3 8 6M26 14c-3 2-5 5-6 8" />
      </g>
    </svg>
  );
}

/** A tapered root with growth ridges — the carrot that started the project. */
export function Root({ className = "", strokeWidth = 1.25 }: MarkProps) {
  return (
    <svg
      viewBox="0 0 40 64"
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      <g {...base} strokeWidth={strokeWidth}>
        <path d="M20 60c-4-13-7-25-6-34h12c1 9-2 21-6 34Z" />
        <path d="M15 32h10M15.6 38h8.8M16.4 44h7.2M17.4 50h5.2" />
        <path d="M20 26V14" />
        <path d="M20 16c-1-5-5-8-9-9 0 5 3 8 9 9ZM20 15c1-5 5-9 9-10 0 5-3 9-9 10ZM20 14c0-5 1-9 0-12-2 3-2 8 0 12Z" />
      </g>
    </svg>
  );
}

/** A branch with alternating leaves — used as a section mark. */
export function LeafSpray({ className = "", strokeWidth = 1.25 }: MarkProps) {
  return (
    <svg
      viewBox="0 0 64 32"
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      <g {...base} strokeWidth={strokeWidth}>
        <path d="M2 16h60" />
        <path d="M16 16c0-5 4-9 10-10-1 6-4 9-10 10ZM30 16c0-5 4-9 10-10-1 6-4 9-10 10Z" />
        <path d="M23 16c0 5 3 9 9 10 0-6-3-9-9-10ZM37 16c0 5 3 9 9 10 0-6-3-9-9-10Z" />
      </g>
    </svg>
  );
}

/** Seeds under a soil horizon — the "day 0 / not yet visible" mark. */
export function SeedRow({ className = "", strokeWidth = 1.25 }: MarkProps) {
  return (
    <svg
      viewBox="0 0 64 32"
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      <g {...base} strokeWidth={strokeWidth}>
        <path d="M2 12h60" />
        <path d="M10 20a3 4 0 1 0 6 0 3 4 0 1 0-6 0ZM29 22a3 4 0 1 0 6 0 3 4 0 1 0-6 0ZM48 19a3 4 0 1 0 6 0 3 4 0 1 0-6 0Z" />
        <path d="M13 16v-2M32 18v-2M51 15v-2" />
      </g>
    </svg>
  );
}

/**
 * A large, quiet background frond for hero corners. Deliberately low-detail —
 * it sits at low opacity behind type and must not compete with it.
 */
export function FrondBackdrop({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 200 260"
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      <g {...base} strokeWidth={1}>
        <path d="M100 258C100 190 96 120 60 60" />
        {[0, 1, 2, 3, 4, 5, 6].map((i) => {
          const y = 210 - i * 26;
          const spread = 30 + i * 8;
          const lift = 16 + i * 3;
          return (
            <g key={i}>
              <path
                d={`M${98 - i * 5} ${y}c-${spread} -4 -${spread + 10} -${lift} -${
                  spread + 4
                } -${lift + 12}c${spread - 8} 4 ${spread - 4} ${lift} ${
                  spread + 4
                } ${lift + 12}Z`}
              />
              <path
                d={`M${102 - i * 5} ${y}c${spread} -4 ${spread + 10} -${lift} ${
                  spread + 4
                } -${lift + 12}c-${spread - 8} 4 -${spread - 4} ${lift} -${
                  spread + 4
                } ${lift + 12}Z`}
              />
            </g>
          );
        })}
      </g>
    </svg>
  );
}

/**
 * Section mark: a small botanical glyph on a hairline. Replaces the plain rule
 * so section breaks carry some of the illustrated character too.
 */
export function SectionMark({
  mark = "leaf",
  className = "",
}: {
  mark?: "leaf" | "sprout" | "seed";
  className?: string;
}) {
  const Glyph = mark === "sprout" ? Sprout : mark === "seed" ? SeedRow : LeafSpray;
  const box = mark === "sprout" ? "h-6 w-5" : "h-4 w-8";

  return (
    <div className={`flex items-center gap-4 ${className}`} aria-hidden="true">
      <span className="h-px flex-1 bg-line" />
      <Glyph className={`${box} shrink-0 text-leaf-soft`} />
      <span className="h-px flex-1 bg-line" />
    </div>
  );
}
