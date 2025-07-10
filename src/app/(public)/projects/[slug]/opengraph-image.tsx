// src/app/projects/[slug]/opengraph-image.tsx
/* eslint-disable react/no-unescaped-entities */
import { ImageResponse } from "next/og";
import { supabase } from "@/lib/supabase";

export const alt = "Riziyan - Project Detail";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";
export const runtime = "edge";

async function getProjectForOG(slug: string) {
  const { data } = await supabase
    .from("projects")
    .select("name, description")
    .eq("slug", slug)
    .single();
  return data;
}

export default async function Image({ params }: { params: { slug: string } }) {
  const project = await getProjectForOG(params.slug);

  return new ImageResponse(
    (
      <div
        style={{
          background: "#1c1c1c",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          color: "#fff1d0",
          fontFamily: '"Inter", sans-serif',
          padding: "60px",
        }}
      >
        <div style={{ fontSize: 24, color: "#f0c606" }}>
          Riziyan's Portfolio
        </div>
        <h1
          style={{
            fontSize: 72,
            fontWeight: 700,
            textAlign: "center",
            lineHeight: 1.1,
            margin: "20px 0",
          }}
        >
          {project?.name || "My Project"}
        </h1>
        <p
          style={{
            fontSize: 28,
            textAlign: "center",
            maxWidth: "80%",
            color: "rgba(255, 241, 208, 0.8)",
          }}
        >
          {project?.description || "A glimpse into my work and passion."}
        </p>
      </div>
    ),
    {
      ...size,
    }
  );
}
