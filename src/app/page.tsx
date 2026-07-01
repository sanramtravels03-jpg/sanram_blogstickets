import Hero from "@/components/Hero";
import LatestNews from "@/components/LatestNews";
import { getAviationNews } from "@/lib/aviationNews";

export const revalidate = 43200; // 12 hours

export default async function HomePage() {
  const articles = await getAviationNews();

  return (
    <>
      <Hero />
      <LatestNews articles={articles} />
    </>
  );
}