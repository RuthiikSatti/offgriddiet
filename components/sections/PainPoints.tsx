type Pain = { title: string; detail: string; solved?: boolean };

// The three strongest hooks lead; all eight are rendered in the HTML (no
// hidden/expander content) so the full evidence is visible and verifiable.
// `solved: true` marks the one failure mode most published advice already
// covers well — it's what makes the "1 of 8" claim checkable, not asserted.
const painPoints: Pain[] = [
  {
    title: "Harvest timing failure",
    detail:
      "The 5-year carrot story: never knowing exactly when to pull, plant, or space — season after season, without ever learning why it failed.",
  },
  {
    title: "Overnight pest destruction",
    detail:
      "“Went to bed with a full row of seedlings. Woke up to stems. Didn’t see a single bug.”",
  },
  {
    title: "Cost-vs-yield frustration",
    detail:
      "A viral post doing the math on a single tomato costing $4.70 in seeds, soil, and time — sparking a wave of “is this even worth it?” replies.",
  },
  {
    title: "Plant diagnosis confusion",
    detail:
      "“I have no idea if this is a nutrient problem, a pest, or overwatering. The leaf just looks… wrong.”",
    solved: true,
  },
  {
    title: "Food scarcity anxiety",
    detail:
      "New gardeners driven less by hobby and more by real worry about grocery prices and supply reliability.",
  },
  {
    title: "Soil and composting confusion",
    detail:
      "“Every guide says ‘well-draining soil’ like that means anything when you’re staring at a bag of dirt at Home Depot.”",
  },
  {
    title: "Urban and balcony constraints",
    detail:
      "“Everything assumes I have a backyard. I have a 4x2 balcony and a dream.”",
  },
  {
    title: "Isolation & the new-gardener knowledge gap",
    detail:
      "First-timers with no one to ask, piecing together contradictory advice from five different YouTube videos.",
  },
];

export function PainPoints() {
  return (
    <ol className="divide-y divide-line border-y border-line">
      {painPoints.map((p, i) => (
        <li key={p.title} className="py-4">
          <div className="flex items-start justify-between gap-3">
            <p className="font-heading text-sm font-semibold leading-snug tracking-tight text-ink">
              <span className="font-mono font-normal text-bark">
                {String(i + 1).padStart(2, "0")}
              </span>{" "}
              {p.title}
            </p>
            {p.solved && (
              <span className="shrink-0 font-mono text-[9px] uppercase tracking-wider text-beet">
                Well covered
              </span>
            )}
          </div>
          <p className="mt-2 text-sm leading-relaxed text-bark">{p.detail}</p>
        </li>
      ))}
    </ol>
  );
}
