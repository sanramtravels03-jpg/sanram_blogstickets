import Hero from "@/components/Hero";
import LatestNews from "@/components/LatestNews";
import { getAviationNews } from "@/lib/aviationNews";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function HomePage() {
  const articles = await getAviationNews();

  return (
    <>
      <Hero />
      <LatestNews articles={articles} />
    </>
  );
}