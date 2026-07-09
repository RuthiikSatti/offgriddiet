import type { Metadata } from "next";
import { Research } from "@/components/sections/Research";
import { GridOverlay } from "@/components/layout/GridOverlay";

export const metadata: Metadata = {
  title: "The Research — The Documented Case for Off Grid Diet",
  description:
    "The evidence behind Off Grid Diet: 8 validated gardening pain points pulled from real Reddit threads, the 2,586-upvote carrot-failure post, and the gap today's plant apps leave wide open.",
  alternates: { canonical: "/research" },
};

export default function ResearchPage() {
  return (
    <div className="relative min-h-screen bg-forest-900 pt-16">
      <GridOverlay tone="light" />
      <div className="relative z-10">
        <Research />
      </div>
    </div>
  );
}
