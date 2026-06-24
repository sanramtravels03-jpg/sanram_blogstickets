export async function getAviationNews() {
  const res = await fetch(
    "http://localhost:3000/api/aviation-news",
    {
      cache: "no-store",
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch news");
  }

  return res.json();
}