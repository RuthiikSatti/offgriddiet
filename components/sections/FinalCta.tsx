import { WaitlistForm } from "@/components/WaitlistForm";
import { FadeUp } from "@/components/motion/FadeUp";
import { siteConfig } from "@/lib/site";

export function FinalCta() {
  return (
    <section id="waitlist" className="scroll-mt-20 pb-16 pt-6 md:pb-24">
      <div className="container-page">
        <FadeUp className="mx-auto max-w-3xl overflow-hidden rounded-3xl bg-forest px-6 py-12 text-center text-cream shadow-lift sm:px-12 sm:py-16">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-sprout-light">
            Plant your seed here
          </p>
          <h2 className="mt-3 font-heading text-3xl font-semibold leading-tight text-balance sm:text-4xl">
            Get the weekly harvest — and first pick of the app
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-lg text-cream/80">
            One handful of practical, plant-tested gardening in your inbox every
            week. Plus early access the moment {siteConfig.name} is ripe — built
            for people who want to actually eat what they grow.
          </p>
          <div className="mx-auto mt-7 max-w-lg">
            <WaitlistForm source="final-cta" variant="light" />
          </div>
        </FadeUp>
      </div>
    </section>
  );
}
