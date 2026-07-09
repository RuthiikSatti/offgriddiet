import { CalendarClock, Stethoscope, Sprout, Map } from "lucide-react";
import { SectionHeading } from "@/components/sections/SectionHeading";
import { StaggerGroup, StaggerItem } from "@/components/motion/StaggerGroup";
import { siteConfig } from "@/lib/site";

const features = [
  {
    icon: Stethoscope,
    title: "Diagnose what went wrong",
    body: "Describe the problem — yellowing leaves, stunted roots, pests — and get the likely cause and the fix, in plain language.",
  },
  {
    icon: CalendarClock,
    title: "Know what to do this week",
    body: "A living plan for your climate and crops: what to sow, water, feed, and harvest right now — not a generic calendar.",
  },
  {
    icon: Sprout,
    title: "Grow a real food supply",
    body: "Build from a few pots to a plot that genuinely offsets your grocery bill, one manageable step at a time.",
  },
  {
    icon: Map,
    title: "Made for off-grid & self-sufficient",
    body: "Designed for people growing to actually eat — resilient, low-input methods, not just pretty flower beds.",
  },
];

export function AppTeaser() {
  return (
    <section className="pb-8 pt-16 md:pt-24">
      <div className="container-page">
        <SectionHeading
          light
          eyebrow="What's growing"
          title="The app that tells you what your garden needs — before it fails"
          description={`${siteConfig.name} turns 'I have no idea why this died' into 'I know exactly what to do next.'`}
        />
        <StaggerGroup className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((f) => (
            <StaggerItem key={f.title}>
              <div className="card-lift h-full rounded-xl border border-cream/15 bg-forest-700/50 p-6 text-cream backdrop-blur-md">
                <span className="flex h-12 w-12 items-center justify-center rounded-lg bg-sprout/20 text-sprout-light">
                  <f.icon className="h-6 w-6" />
                </span>
                <h3 className="mt-4 font-heading text-lg font-semibold text-cream">
                  {f.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-cream/80">
                  {f.body}
                </p>
              </div>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </div>
    </section>
  );
}
