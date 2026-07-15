/**
 * JSON-LD structured data for Off Grid Diet.
 *
 * This is what answer engines (ChatGPT, Perplexity, Google AI Overviews) and
 * crawlers read to understand that this is a real, describable entity — the
 * single most useful on-site signal for a pre-launch product that has no
 * third-party review footprint yet. Keep it truthful; don't assert reviews,
 * ratings, or availability we don't have.
 */
import { siteConfig } from "@/lib/site";

const ORG_ID = `${siteConfig.url}/#organization`;

export function organizationSchema() {
  // Only publish social links that actually exist — no dead `sameAs` entries.
  const sameAs = Object.values(siteConfig.social).filter(Boolean);
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": ORG_ID,
    name: siteConfig.name,
    url: siteConfig.url,
    logo: `${siteConfig.url}/images/og-default.jpg`,
    image: `${siteConfig.url}${siteConfig.ogImage}`,
    description: siteConfig.description,
    email: siteConfig.contactEmail,
    foundingDate: siteConfig.foundingYear,
    slogan: siteConfig.tagline,
    ...(sameAs.length ? { sameAs } : {}),
  };
}

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${siteConfig.url}/#website`,
    name: siteConfig.name,
    url: siteConfig.url,
    description: siteConfig.description,
    publisher: { "@id": ORG_ID },
  };
}

export type QA = { question: string; answer: string };

export function faqSchema(items: QA[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((qa) => ({
      "@type": "Question",
      name: qa.question,
      acceptedAnswer: { "@type": "Answer", text: qa.answer },
    })),
  };
}
