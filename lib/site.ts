/** Central site config for Off Grid Diet. */
export const siteConfig = {
  name: "Off Grid Diet",
  tagline: "Field notes on growing food that survives.",
  description:
    "Off Grid Diet is a gardening research project. We map why home food crops fail — using documented evidence from real growers — and publish one practical read a week.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://offgriddiet.com",
  ogImage: "/images/og-default.jpg",

  /**
   * The ask. This is a research and writing project, not a product — there is
   * no app, no waitlist, and nothing to wait for. Don't reintroduce any of
   * that framing; the subscription has to be worth it on its own terms.
   */
  followPerk:
    "One practical gardening read a week, plus the research notes as we map what fails and why. No spam.",
  followCta: "Subscribe",

  contactEmail: "hello@offgriddiet.com",
  foundingYear: "2026",

  social: {
    twitter: "",
    instagram: "",
    reddit: "",
    linkedin: "",
    productHunt: "",
  },

  /**
   * Four primary destinations. /findings, /library and /faq stay live and in
   * the sitemap, reachable from /research and the footer — a few full pages
   * read as more credible than many thin ones, which also matters for being
   * cited by answer engines.
   */
  nav: [
    { label: "Home", href: "/" },
    { label: "Writing", href: "/journal" },
    { label: "Research", href: "/research" },
    { label: "About", href: "/about" },
  ],

  secondaryNav: [
    { label: "Findings", href: "/findings" },
    { label: "Library", href: "/library" },
    { label: "FAQ", href: "/faq" },
  ],
} as const;

export type SiteConfig = typeof siteConfig;
