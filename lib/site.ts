/**
 * Central site config for Off Grid Diet.
 * Values wrapped in [PLACEHOLDER - ...] should be replaced before launch.
 */
export const siteConfig = {
  name: "Off Grid Diet",
  tagline: "Grow your own food. Actually keep it alive.",
  description:
    "Off Grid Diet is sprouting — a smarter way to grow a self-sufficient food supply and finally figure out why your garden keeps failing. Join the waitlist and harvest a fresh gardening tip every week.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://offgriddiet.com",
  ogImage: "/images/og-default.jpg",

  // The value proposition for joining the list
  waitlistPerk:
    "Get early access the moment the app is ripe — plus one practical gardening article harvested for you every week, free.",

  contactEmail: "hello@offgriddiet.com",

  nav: [
    { label: "Home", href: "/" },
    { label: "The Harvest", href: "/journal" },
    { label: "The Research", href: "/research" },
  ],
} as const;

export type SiteConfig = typeof siteConfig;
