export type SourceLink = {
  label: string;
  publisher: string;
  href: string;
};

export type Finding = {
  number: string;
  title: string;
  summary: string;
  topic: string;
  evidence: "Extension guidance" | "USDA framework" | "Community signal";
  whatToTry: string[];
  note: string;
  sources: SourceLink[];
};

export type Resource = {
  title: string;
  publisher: string;
  href: string;
  topic: "Start growing" | "Small spaces" | "Soil" | "Pests" | "Root crops";
  type: "Guide" | "Framework" | "Reference";
  bestFor: string;
  summary: string;
  reviewed: string;
};

export const findings: Finding[] = [
  {
    number: "01",
    title: "Carrot emergence is a moisture-management period",
    summary: "Carrots are direct-seeded and may take up to three weeks to emerge. The useful work is keeping the seed zone evenly moist while you wait—not planting once and hoping.",
    topic: "Root crops",
    evidence: "Extension guidance",
    whatToTry: [
      "Direct-seed carrots in a loose, stone-free bed.",
      "Check that the seed zone stays evenly moist until seedlings emerge.",
      "Adjust sowing dates and watering to your local conditions."
    ],
    note: "This is cited educational guidance, not a diagnosis. Seed age, temperature, crusting, and sowing depth can all affect emergence.",
    sources: [
      { label: "Growing carrots and parsnips", publisher: "University of Minnesota Extension", href: "https://extension.umn.edu/vegetables/growing-carrots-and-parsnips" },
      { label: "Carrots: How to Grow It", publisher: "South Dakota State University Extension", href: "https://extension.sdstate.edu/carrots-how-grow-it" }
    ]
  },
  {
    number: "02",
    title: "Thinning makes room for the roots you want",
    summary: "Crowded carrot seedlings compete for space. Extension guides commonly recommend thinning to roughly 2–3 inches so the remaining roots can size up.",
    topic: "Root crops",
    evidence: "Extension guidance",
    whatToTry: [
      "Wait until seedlings are established before thinning.",
      "Leave roughly 2–3 inches between the remaining plants.",
      "Treat slim roots as a clue to investigate—not proof that spacing was the only issue."
    ],
    note: "Soil compaction, variety, fertility, water, and harvest timing can also affect root size and shape.",
    sources: [
      { label: "How to Grow Carrots in Your Garden", publisher: "Utah State University Extension", href: "https://extension.usu.edu/yardandgarden/research/carrots-in-the-garden" },
      { label: "Carrots: How to Grow It", publisher: "South Dakota State University Extension", href: "https://extension.sdstate.edu/carrots-how-grow-it" }
    ]
  },
  {
    number: "03",
    title: "Before treating a garden problem, identify it",
    summary: "Integrated pest management starts with prevention, observation, and identification. Pesticides are one tool—not the automatic first answer to chewed leaves or a stressed plant.",
    topic: "Plant health",
    evidence: "USDA framework",
    whatToTry: [
      "Inspect plants and note the damage before choosing a treatment.",
      "Check for site, water, or cultural issues alongside pests.",
      "Use local Extension guidance and follow every product label when escalation is needed."
    ],
    note: "This is a prevention-first framework. It does not replace local pest identification, label directions, or professional guidance for safety-sensitive decisions.",
    sources: [
      { label: "Practice Integrated Pest Management", publisher: "USDA People’s Garden", href: "https://www.usda.gov/about-usda/general-information/initiatives-and-highlighted-programs/peoples-garden/gardening-advice/practice-integrated-pest-management-ipm" },
      { label: "IPM — Prevent, Identify, and Manage Plant Problems", publisher: "University of Maryland Extension", href: "https://extension.umd.edu/resource/ipm-prevent-identify-and-manage-plant-problems" }
    ]
  }
];

export const resources: Resource[] = [
  { title: "Growing carrots and parsnips", publisher: "University of Minnesota Extension", href: "https://extension.umn.edu/vegetables/growing-carrots-and-parsnips", topic: "Root crops", type: "Guide", bestFor: "Planning a first carrot bed", summary: "Direct seeding, deep loose soil, germination timing, thinning, and water needs for root crops.", reviewed: "2026-08" },
  { title: "How to Grow Carrots in Your Garden", publisher: "Utah State University Extension", href: "https://extension.usu.edu/yardandgarden/research/carrots-in-the-garden", topic: "Root crops", type: "Guide", bestFor: "A step-by-step carrot routine", summary: "Practical sowing depth, thinning, irrigation, and troubleshooting guidance for home gardeners.", reviewed: "2026-08" },
  { title: "Carrots: How to Grow It", publisher: "South Dakota State University Extension", href: "https://extension.sdstate.edu/carrots-how-grow-it", topic: "Root crops", type: "Guide", bestFor: "Clear beginner benchmarks", summary: "A concise reference on emergence moisture, spacing, weekly water needs, and local adaptation.", reviewed: "2026-08" },
  { title: "Beginner’s Guide to Vegetable Gardening", publisher: "Iowa State University Extension and Outreach", href: "https://yardandgarden.extension.iastate.edu/how-to/beginners-guide-vegetable-gardening", topic: "Start growing", type: "Guide", bestFor: "Planning a first garden", summary: "A practical starting point for garden location, size, timing, care, and crop-specific follow-up guides.", reviewed: "2026-08" },
  { title: "Growing Vegetables in Containers", publisher: "University of Maryland Extension", href: "https://extension.umd.edu/resource/growing-vegetables-containers", topic: "Small spaces", type: "Guide", bestFor: "Balconies and patios", summary: "How to start small, match crops to available sun, and manage container watering.", reviewed: "2026-08" },
  { title: "Container Vegetable Gardening — Four Keys to Success", publisher: "Penn State Extension", href: "https://extension.psu.edu/container-vegetable-gardening-four-keys-to-success", topic: "Small spaces", type: "Guide", bestFor: "Choosing containers and media", summary: "Container size, drainage, soilless mixes, compact varieties, and water/fertility management.", reviewed: "2026-08" },
  { title: "Practice Integrated Pest Management", publisher: "USDA People’s Garden", href: "https://www.usda.gov/about-usda/general-information/initiatives-and-highlighted-programs/peoples-garden/gardening-advice/practice-integrated-pest-management-ipm", topic: "Pests", type: "Framework", bestFor: "Prevention-first plant care", summary: "USDA’s plain-language introduction to IPM, which combines prevention, observation, and multiple control methods.", reviewed: "2026-08" },
  { title: "IPM — Prevent, Identify, and Manage Plant Problems", publisher: "University of Maryland Extension", href: "https://extension.umd.edu/resource/ipm-prevent-identify-and-manage-plant-problems", topic: "Pests", type: "Guide", bestFor: "A garden-problem triage sequence", summary: "Research-based cultural, physical, biological, and low-risk approaches before escalating treatment.", reviewed: "2026-08" },
  { title: "Improving Garden Soils with Organic Matter", publisher: "Oregon State University Extension Service", href: "https://extension.oregonstate.edu/catalog/ec-1561-improving-garden-soils-organic-matter", topic: "Soil", type: "Reference", bestFor: "Choosing compost and amendments", summary: "A technical, practical reference on composted materials, soil structure, cover, and avoiding unnecessary tillage.", reviewed: "2026-08" },
  { title: "Soil Health", publisher: "USDA Natural Resources Conservation Service", href: "https://www.nrcs.usda.gov/conservation-basics/soil/soil-health", topic: "Soil", type: "Framework", bestFor: "A long-term soil mental model", summary: "Four adaptable principles: keep living roots where feasible, minimize disturbance, maintain cover, and increase diversity.", reviewed: "2026-08" }
];
