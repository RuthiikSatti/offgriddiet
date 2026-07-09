import { MessageSquareQuote, TrendingUp, SearchX, CheckCircle2 } from "lucide-react";
import { SectionHeading } from "@/components/sections/SectionHeading";
import { FadeUp } from "@/components/motion/FadeUp";
import { StaggerGroup, StaggerItem } from "@/components/motion/StaggerGroup";
import { PainPoints } from "@/components/sections/PainPoints";

const stats = [
  {
    value: "2,586",
    label: "upvotes on the Reddit post that sparked this",
  },
  {
    value: "8",
    label: "validated pain points, pulled from real gardening threads (not a survey)",
  },
  {
    value: "1 of 8",
    label: "problems today's apps actually solve well — the other 7 are wide open",
  },
];

const glassCard =
  "rounded-xl border border-cream/15 bg-forest-700/50 p-7 text-cream backdrop-blur-md shadow-soft";

export function Research() {
  return (
    <section id="research" className="section scroll-mt-20">
      <div className="container-page">
        <SectionHeading
          light
          eyebrow="The Research"
          title="This isn't a hunch. It's a documented, repeated problem."
          description="Off Grid Diet started from real, searchable evidence that thousands of people share the exact same struggles — and that nothing on the market properly solves most of them."
        />

        {/* Stat row */}
        <StaggerGroup className="mt-12 grid gap-6 sm:grid-cols-3">
          {stats.map((s) => (
            <StaggerItem
              key={s.label}
              className="rounded-xl border border-cream/15 bg-forest-700/50 p-6 text-center text-cream backdrop-blur-md"
            >
              <div className="font-heading text-4xl font-extrabold text-sprout-light">
                {s.value}
              </div>
              <p className="mt-2 text-sm text-cream/80">{s.label}</p>
            </StaggerItem>
          ))}
        </StaggerGroup>

        <div className="mt-8 grid gap-6 lg:grid-cols-2">
          {/* Viral post story */}
          <FadeUp className={`flex flex-col ${glassCard}`}>
            <div className="flex items-center gap-2 text-sprout-light">
              <TrendingUp className="h-5 w-5" />
              <span className="text-sm font-semibold uppercase tracking-wide">
                The post that started it
              </span>
            </div>
            <blockquote className="mt-4 flex-1">
              <MessageSquareQuote className="h-8 w-8 text-sprout/60" />
              <p className="mt-3 text-base leading-relaxed text-cream/90">
                One of the posts that shaped this whole project came from a home
                gardener who&apos;d tried to grow carrots for five consecutive
                years and failed every single time — never quite figuring out
                why, despite changing the soil, spacing, and timing each season.
                It struck a nerve: <span className="font-bold text-cream">2,586 upvotes</span>,
                and dozens of gardeners chiming in with their own version of the
                same multi-year mystery failure. That&apos;s not one
                person&apos;s bad luck. That&apos;s a pattern nothing currently
                helps with.
              </p>
            </blockquote>
            <p className="mt-4 text-xs leading-relaxed text-cream/60">
              Sourced from r/homesteading, r/vegetablegardening, r/urbanfarming,
              and related communities — real threads, real frustration.
            </p>
          </FadeUp>

          {/* Pain points */}
          <FadeUp className={glassCard}>
            <div className="flex items-center gap-2 text-sprout-light">
              <CheckCircle2 className="h-5 w-5" />
              <span className="text-sm font-semibold uppercase tracking-wide">
                8 validated pain points
              </span>
            </div>
            <div className="mt-4">
              <PainPoints />
            </div>
          </FadeUp>
        </div>

        {/* Competitor gap */}
        <FadeUp className={`mt-6 ${glassCard}`}>
          <div className="flex items-center gap-2 text-sprout-light">
            <SearchX className="h-5 w-5" />
            <span className="text-sm font-semibold uppercase tracking-wide">
              The competitor gap
            </span>
          </div>
          <p className="mt-4 max-w-4xl text-base leading-relaxed text-cream/90 sm:text-lg">
            Plant-ID apps like PictureThis and Plantix are good at one thing:
            telling you what&apos;s already wrong, after it&apos;s visible.
            That&apos;s genuinely useful — but it&apos;s the one problem in this
            space that&apos;s actually solved. Nothing on the market today helps
            with harvest timing, warns you before pests strike, tracks whether
            your garden is actually worth the money and effort, or remembers
            what went wrong last season so you don&apos;t repeat it. That last
            one — the multi-year failure loop, like the carrot story — is the
            biggest gap of all. Off Grid Diet is built for the seven problems
            nobody else is solving, not the one everybody already does.
          </p>
        </FadeUp>
      </div>
    </section>
  );
}
