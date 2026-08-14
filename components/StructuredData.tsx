/**
 * Renders JSON-LD <script> tags. Server component — no client JS shipped.
 *
 * Organization + WebSite are emitted site-wide from the root layout. Pages that
 * add their own graph (e.g. an FAQPage) must pass `base={false}`, otherwise the
 * site-wide entities get emitted a second time on that page and parsers see
 * duplicate @id'd nodes.
 */
import { organizationSchema, websiteSchema } from "@/lib/structured-data";

export function StructuredData({
  extra = [],
  base = true,
}: {
  extra?: object[];
  /** Emit the site-wide Organization + WebSite graphs. Root layout only. */
  base?: boolean;
}) {
  const graphs = base
    ? [organizationSchema(), websiteSchema(), ...extra]
    : extra;

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
