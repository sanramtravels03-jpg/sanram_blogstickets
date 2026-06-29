// app/api/aviation-news/route.ts

import { NextResponse } from "next/server";
import { getAviationNews } from "@/lib/aviationNews";

export const dynamic = "force-dynamic"; // ← this is the fix

export async function GET() {
  const articles = await getAviationNews();

  return NextResponse.json({
    status: "ok",
    totalResults: articles.length,
    articles,
    message: "API Working",
  });
}