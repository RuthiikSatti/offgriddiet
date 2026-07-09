import { getAllArticles } from "@/lib/journal";
import { ChapterHero } from "@/components/sections/ChapterHero";
import { GridOverlay } from "@/components/layout/GridOverlay";
import { LoadingScreen } from "@/components/layout/LoadingScreen";
import { AppTeaser } from "@/components/sections/AppTeaser";
import { JournalPreview } from "@/components/sections/JournalPreview";
import { FinalCta } from "@/components/sections/FinalCta";

export default function HomePage() {
  const articles = getAllArticles();

  return (
    <>
      {/* Seed-to-plant intro that hides the initial font/video load */}
      <LoadingScreen />

      {/* Chaptered scroll-video narrative: seed → struggle → signal → harvest → brand */}
      <ChapterHero />

      {/* Everything after the narrative, on a dark backdrop with the grid */}
      <div className="relative z-10 bg-forest-900">
        <GridOverlay tone="light" />
        <div className="relative z-10">
          {/* The articles — The Harvest */}
          <JournalPreview articles={articles} />
          {/* The upcoming app + waitlist, together */}
          <AppTeaser />
          <FinalCta />
        </div>
      </div>
    </>
  );
}
