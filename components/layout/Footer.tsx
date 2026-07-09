import Link from "next/link";
import { Sprout } from "lucide-react";
import { siteConfig } from "@/lib/site";
import { WaitlistForm } from "@/components/WaitlistForm";

export function Footer() {
  return (
    <footer className="relative z-10 bg-forest text-cream">
      <div className="container-page grid gap-10 py-14 md:grid-cols-2">
        <div>
          <div className="flex items-center gap-2">
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-cream/10 text-sprout-light">
              <Sprout className="h-5 w-5" />
            </span>
            <span className="font-heading text-lg font-semibold">
              {siteConfig.name}
            </span>
          </div>
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-cream/70">
            {siteConfig.tagline} The app is still growing — join the waitlist and
            harvest one practical gardening read every week while you wait.
          </p>
          <ul className="mt-6 flex gap-5 text-sm text-cream/70">
            {siteConfig.nav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="hover:text-cream">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-heading text-lg font-semibold">
            Get the weekly harvest
          </h4>
          <p className="mt-2 text-sm text-cream/70">{siteConfig.waitlistPerk}</p>
          <div className="mt-4">
            <WaitlistForm source="footer" variant="light" cta="Join" />
          </div>
        </div>
      </div>

      <div className="border-t border-cream/10">
        <div className="container-page flex flex-col items-center justify-between gap-2 py-5 text-xs text-cream/50 sm:flex-row">
          <p>
            © {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
          </p>
          <p>Grown with care. No ads, no spam.</p>
        </div>
      </div>
    </footer>
  );
}
