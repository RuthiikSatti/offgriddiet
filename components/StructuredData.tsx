/**
 * Renders JSON-LD <script> tags. Server component — no client JS shipped.
 * Organization + WebSite are emitted site-wide from the root layout; pages can
 * pass page-specific graphs (e.g. an FAQPage) via `extra`.
 */
import { organizationSchema, websiteSchema } from "@/lib/structured-data";

export function StructuredData({ extra = [] }: { extra?: object[] }) {
  const graphs = [organizationSchema(), websiteSchema(), ...extra];
  return (
    <>
      {graphs.map((graph, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(graph) }}
        />
      ))}
    </>
  );
}
