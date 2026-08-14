import Link from "next/link";
import { siteConfig } from "@/lib/site";
import { FollowForm } from "@/components/FollowForm";
import { Root } from "@/components/graphics/Botanical";

export function Footer() {
  return (
    <footer className="border-t border-line bg-parchment">
      <div className="container-page grid gap-12 py-16 md:grid-cols-[1.2fr_1fr] md:gap-20">
        <div>
          <div className="flex items-center gap-3">
            <Root className="h-8 w-auto shrink-0 text-ochre" strokeWidth={1.4} />
            <p className="font-heading text-base font-semibold tracking-tight text-ink">
              {siteConfig.name}
            </p>
          </div>
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-bark">
            A gardening research project. We map why home food crops fail, using
            documented evidence from real growers, and publish what we find.
          </p>

          <div className="mt-8 flex flex-wrap gap-x-6 gap-y-2.5 text-sm">
            {siteConfig.nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-sm text-bark transition-colors hover:text-ink"
              >
                {item.label}
              </Link>
            ))}
          </div>
          <div className="mt-3 flex flex-wrap gap-x-6 gap-y-2.5 text-sm">
            {siteConfig.secondaryNav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-sm text-bark/80 transition-colors hover:text-ink"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>

        <div>
          <p className="label-mono">The weekly letter</p>
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-bark">
            {siteConfig.followPerk}
          </p>
          <div className="mt-5">
            <FollowForm source="footer" stacked cta={siteConfig.followCta} />
          </div>
        </div>
      </div>

      <div className="border-t border-line">
        <div className="container-page flex flex-col items-start justify-between gap-2 py-6 text-xs text-bark sm:flex-row sm:items-center">
          <p>
            © {new Date().getFullYear()} {siteConfig.name}
          </p>
          <a
            href={`mailto:${siteConfig.contactEmail}`}
            className="rounded-sm transition-colors hover:text-ink"
          >
            {siteConfig.contactEmail}
          </a>
        </div>
      </div>
    </footer>
  );
}
