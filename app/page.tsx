import { getAllArticles } from "@/lib/journal";
import { ChapterHero } from "@/components/sections/ChapterHero";
import { LoadingScreen } from "@/components/layout/LoadingScreen";

export default function HomePage() {
  const articles = getAllArticles();

  return (
    <>
      {/* Seed-to-plant intro that hides the initial font/video load */}
      <LoadingScreen />

      {/* Chaptered scroll-video narrative: seed → struggle → signal → harvest →
          brand, features, Harvest teaser, and waitlist — all in the final beat.
          The page ends on video; the global Footer is the only non-video
          content below it. */}
      <ChapterHero latestArticle={articles[0]} />
    </>
  );
}
