// src/app/api/metadata/route.ts
import { NextRequest, NextResponse } from "next/server";
import * as cheerio from "cheerio";

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const targetUrl = searchParams.get("url");

  if (!targetUrl) {
    return NextResponse.json(
      { error: "Missing 'url' parameter" },
      { status: 400 }
    );
  }

  try {
    // 1. Fetch HTML dari target URL
    // Kita pake User-Agent browser biar gak dikira bot jahat oleh website target
    const response = await fetch(targetUrl, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.0.0 Safari/537.36",
      },
      next: { revalidate: 3600 }, // Cache hasil fetch selama 1 jam di server Next.js
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch URL: ${response.statusText}`);
    }

    const html = await response.text();

    // 2. Parse HTML pake Cheerio
    const $ = cheerio.load(html);

    // 3. Extract Metadata (Prioritas: Open Graph > Twitter Card > HTML Standard)
    const getMetaTag = (name: string) =>
      $(`meta[property="${name}"]`).attr("content") ||
      $(`meta[name="${name}"]`).attr("content");

    const title =
      getMetaTag("og:title") ||
      getMetaTag("twitter:title") ||
      $("title").text();

    const description =
      getMetaTag("og:description") ||
      getMetaTag("twitter:description") ||
      getMetaTag("description");

    const image = getMetaTag("og:image") || getMetaTag("twitter:image");

    // 4. Return JSON
    return NextResponse.json(
      {
        title: title || null,
        description: description || null,
        image: image || null,
        url: targetUrl,
      },
      {
        // Cache di Browser User juga selama 1 jam biar cepet
        headers: {
          "Cache-Control":
            "public, s-maxage=3600, stale-while-revalidate=86400",
        },
      }
    );
  } catch (error) {
    console.error("Metadata Fetch Error:", error);
    // Tetap return 200 tapi data null, biar UI gak error/crash, cuma fallback aja
    return NextResponse.json({
      title: null,
      description: null,
      image: null,
    });
  }
}
