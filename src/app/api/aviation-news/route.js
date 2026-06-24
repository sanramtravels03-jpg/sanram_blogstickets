import { NextResponse } from "next/server";
import { getAviationNews } from "@/lib/aviationNews";

export async function GET() {
  const articles = await getAviationNews();

  return NextResponse.json({
    status: "ok",
    totalResults: articles.length,
    articles,
     message: "API Working",
  });
}