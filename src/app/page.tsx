import Hero from "@/components/Hero";
import LatestNews from "@/components/LatestNews";
import { getAviationNews } from "@/lib/aviationNews";

export default async function HomePage() {
  const articles = await getAviationNews();

  return (
    <>
      <Hero />
      <LatestNews articles={articles} />
    </>
  );
}