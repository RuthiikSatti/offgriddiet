/** Central site config for Off Grid Diet. */
export const siteConfig = {
  name: "Off Grid Diet",
  tagline: "Grow your own food. Actually keep it alive.",
  description:
    "Practical gardening findings, useful public resources, and the Weekly Harvest for people learning to grow more of their own food.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://offgriddiet.com",
  ogImage: "/images/og-default.jpg",

  waitlistPerk:
    "Get one practical gardening read each week, follow the research, and be first to know when the companion app is ready.",

  contactEmail: "hello@offgriddiet.com",
  foundingYear: "2026",

  social: {
    twitter: "",
    instagram: "",
    reddit: "",
    linkedin: "",
    productHunt: "",
  },

  nav: [
    { label: "Home", href: "/" },
    { label: "The Harvest", href: "/journal" },
    { label: "Findings", href: "/findings" },
    { label: "Library", href: "/library" },
    { label: "Our Research", href: "/research" },
    { label: "About / Join", href: "/about" },
  ],
} as const;

export type SiteConfig = typeof siteConfig;
