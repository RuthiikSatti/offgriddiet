type Pain = { title: string; detail: string };

// The three strongest hooks lead; all eight are rendered in the HTML (no
// hidden/expander content) so the full evidence is visible and verifiable.
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
    <ol className="space-y-3">
      {painPoints.map((p, i) => (
        <li
          key={p.title}
          className="rounded-lg border border-cream/10 bg-cream/5 p-4"
        >
          <p className="font-heading text-sm font-bold uppercase tracking-tight text-cream">
            <span className="text-sprout-light">{i + 1}.</span> {p.title}
          </p>
          <p className="mt-1 text-sm leading-relaxed text-cream/80">
            {p.detail}
          </p>
        </li>
      ))}
    </ol>
  );
}
