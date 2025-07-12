// src/app/(public)/articles/[slug]/opengraph-image.tsx
import { ImageResponse } from "next/og";
import { createClient } from "@/lib/supabase/server";

export const alt = "Riziyan's Article";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export const runtime = "edge";

async function getArticleTitle(slug: string) {
  const supabase = await createClient();
  const { data } = await supabase
    .from("content_items")
    .select("title")
    .eq("slug", slug)
    .eq("content_type", "article")
    .single();
  return data;
}

export default async function Image({ params }: { params: { slug: string } }) {
  const article = await getArticleTitle(params.slug);
  const title = article?.title || "My Article";

  const interRegular = await fetch(
    new URL(
      "https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwApi_hb0.woff"
    )
  ).then((res) => res.arrayBuffer());

  const interBold = await fetch(
    new URL(
      "https://fonts.gstatic.com/s/inter/v12/UcC73FwrK3iLTeHuS_FVl3w_bA.woff"
    )
  ).then((res) => res.arrayBuffer());

  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "space-between",
          padding: "80px",
          backgroundColor: "rgb(28,28,28)",
          color: "rgb(255,241,208)",
          fontFamily: '"Inter"',
        }}
      >
        <h1
          style={{
            fontSize: 68,
            lineHeight: 1.1,
            fontWeight: 700,
            color: "white",
            textAlign: "left",
            textWrap: "balance",
          }}
        >
          {title}
        </h1>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "24px",
            fontSize: 28,
          }}
        >
          <div
            style={{
              width: 60,
              height: 60,
              borderRadius: "9999px",
              backgroundColor: "rgb(8,103,136)",
            }}
          ></div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            <span style={{ fontWeight: 700, color: "white" }}>Riziyan</span>
            <span style={{ color: "rgb(255,241,208, 0.7)" }}>
              akuriziyan.vercel.app
            </span>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        {
          name: "Inter",
          data: interRegular,
          style: "normal",
          weight: 400,
        },
        {
          name: "Inter",
          data: interBold,
          style: "normal",
          weight: 700,
        },
      ],
    }
  );
}
