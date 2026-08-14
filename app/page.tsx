import { getAllArticles } from "@/lib/journal";
import { Hero } from "@/components/sections/Hero";
import { Evidence } from "@/components/sections/Evidence";
import { HarvestPreview } from "@/components/sections/HarvestPreview";
import { FollowCta } from "@/components/sections/FollowCta";

export default function HomePage() {
  const articles = getAllArticles();

  return (
    <>
      <Hero />
      <Evidence />
      <HarvestPreview articles={articles} />
      <FollowCta />
    </>
  );
}
