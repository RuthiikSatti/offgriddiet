import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SectionHeading } from "@/components/sections/SectionHeading";
import { FadeUp } from "@/components/motion/FadeUp";
import { StaggerGroup, StaggerItem } from "@/components/motion/StaggerGroup";
import { PainPoints } from "@/components/sections/PainPoints";
import { SectionMark } from "@/components/graphics/Botanical";

const stats = [
  {
    value: "2,586",
    tint: "text-ochre",
    label: "upvotes on the post that started this",
  },
  {
    value: "8",
    tint: "text-leaf",
    label: "failure modes, grouped from real threads rather than a survey",
  },
  {
    value: "1 of 8",
    tint: "text-beet",
    label: "covered well by most published advice — identifying visible damage",
  },
];

/** Findings and Library left the primary nav; they're reachable from here. */
const deeper = [
  {
    href: "/findings",
    label: "Findings archive",
    body: "Every finding we've written up, with its evidence notes and sources.",
  },
  {
    href: "/library",
    label: "Resource library",
    body: "The public Extension and government sources behind the research.",
  },
];

export function Research() {
  return (
    <section id="research" className="section scroll-mt-20">
      <div className="container-page">
        <SectionHeading
          as="h1"
          eyebrow="The research"
          title="This isn't a hunch. It's a documented, repeated problem."
          description="The project started from real, searchable evidence that thousands of growers share the same struggles — and that most published advice covers only one of them well."
        />

        <StaggerGroup className="mt-16 grid gap-10 sm:grid-cols-3 sm:gap-8">
          {stats.map((s) => (
            <StaggerItem key={s.label} className="border-t border-line pt-6">
              <div className={`figure-display text-5xl leading-none ${s.tint}`}>
                {s.value}
              </div>
              <p className="mt-3 text-sm leading-relaxed text-bark">
                {s.label}
              </p>
            </StaggerItem>
          ))}
        </StaggerGroup>

        <div className="mt-20 grid gap-14 lg:grid-cols-2 lg:gap-16">
          <FadeUp className="hairline pt-8">
            <p className="label-mono">The post that started it</p>
            <blockquote className="mt-6 border-l-2 border-leaf pl-6">
              <p className="text-[15px] leading-relaxed text-ink/85">
                One of the posts that shaped this project came from a home
                gardener who&apos;d tried to grow carrots for five consecutive
                years and failed every time — never quite figuring out why,
                despite changing the soil, spacing, and timing each season. It
                struck a nerve:{" "}
                <span className="font-semibold text-ink">2,586 upvotes</span>,
                and dozens of growers describing their own version of the same
                multi-year mystery failure. That&apos;s not one person&apos;s bad
                luck. That&apos;s a pattern.
              </p>
            </blockquote>
            <p className="mt-7 text-xs leading-relaxed text-bark">
              Sourced from r/homesteading, r/vegetablegardening, r/urbanfarming
              and related communities — real threads, read by hand.
            </p>
          </FadeUp>

          <FadeUp className="hairline pt-8">
            <p className="label-mono">Eight failure modes</p>
            <div className="mt-6">
              <PainPoints />
            </div>
          </FadeUp>
        </div>

        <FadeUp className="hairline mt-16 max-w-3xl pt-8">
          <p className="label-mono">Where the advice runs out</p>
          <p className="mt-6 text-[15px] leading-relaxed text-ink/85">
            Published gardening advice is good at one thing: telling you
            what&apos;s already wrong, once it&apos;s visible. That&apos;s
            genuinely useful — but it&apos;s the one problem in this space
            that&apos;s well covered. Far less is written about harvest timing,
            what precedes a pest wave, whether a plot is actually worth the money
            and effort, or how to carry what went wrong last season into the
            next one. That last one — the multi-year failure loop, like the
            carrot story — is the biggest gap of all, and it&apos;s where most of
            this research is pointed.
          </p>
        </FadeUp>

        <SectionMark mark="seed" className="mt-16" />

        <div className="mt-16 grid gap-10 sm:grid-cols-2 sm:gap-8">
          {deeper.map((d, i) => (
            <FadeUp key={d.href} delay={i * 0.06}>
              <Link
                href={d.href}
                className="group flex h-full flex-col border-t border-line pt-6 transition-colors hover:border-ink/40"
              >
                <span className="inline-flex items-center gap-2 font-heading text-lg font-semibold tracking-tight text-ink transition-colors group-hover:text-leaf">
                  {d.label}
                  <ArrowRight className="h-4 w-4 transition-transform motion-safe:group-hover:translate-x-0.5" />
                </span>
                <span className="mt-3 text-sm leading-relaxed text-bark">
                  {d.body}
                </span>
              </Link>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}
