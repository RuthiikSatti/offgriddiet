import { getAllArticles } from "@/lib/journal";
import { ChapterHero } from "@/components/sections/ChapterHero";
import { LoadingScreen } from "@/components/layout/LoadingScreen";
import { PublishingHub } from "@/components/sections/PublishingHub";

export default function HomePage() {
  const articles = getAllArticles();

  return (
    <>
      <LoadingScreen />
      <ChapterHero latestArticle={articles[0]} />
      <PublishingHub />
    </>
  );
}
