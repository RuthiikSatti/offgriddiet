import { FollowForm } from "@/components/FollowForm";
import { FadeUp } from "@/components/motion/FadeUp";
import { LeafSpray } from "@/components/graphics/Botanical";
import { siteConfig } from "@/lib/site";

/**
 * The subscribe block. The id `follow` is load-bearing — the navbar, hero and
 * sticky CTA all target it, and StickyFollow hides itself while any signup
 * form is on screen.
 *
 * Sits on the sage band, the deepest ground on the page, so the one conversion
 * point reads as a distinct place rather than more of the same scroll.
 */
const gets = [
  "One practical gardening read a week",
  "Research notes as we map what fails and why",
  "Sources and working links, so you can check the claims",
];

export function FollowCta() {
  return (
    <section id="follow" className="section scroll-mt-24 bg-sage">
      <div className="container-page">
        <div className="grid gap-12 md:grid-cols-[1fr_1fr] md:gap-20">
          <FadeUp>
            <LeafSpray className="h-4 w-16 text-leaf" />
            <p className="label-mono mt-6">Subscribe</p>
            <h2 className="mt-5 max-w-md text-balance font-heading text-[1.75rem] font-semibold leading-tight tracking-tight text-ink sm:text-4xl">
              Get the research as it&apos;s published.
            </h2>
            <p className="mt-5 max-w-md text-[15px] leading-relaxed text-bark">
              A weekly letter about growing food that survives — what the
              evidence supports, what it doesn&apos;t, and what to actually do
              this week. The first one lands within the week.
            </p>
          </FadeUp>

          <FadeUp delay={0.08}>
            <ul className="space-y-3.5">
              {gets.map((g) => (
                <li key={g} className="flex items-start gap-3">
                  <span
                    className="mt-[0.45rem] h-1.5 w-1.5 shrink-0 rotate-45 bg-leaf"
                    aria-hidden="true"
                  />
                  <span className="text-[15px] leading-relaxed text-ink">
                    {g}
                  </span>
                </li>
              ))}
            </ul>

            <div className="mt-8 max-w-md">
              <FollowForm source="home-follow" cta={siteConfig.followCta} />
            </div>
          </FadeUp>
        </div>
      </div>
    </section>
  );
}
