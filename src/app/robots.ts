// src/app/robots.ts
import { MetadataRoute } from "next";

const baseUrl =
  process.env.NEXT_PUBLIC_SITE_URL || "https://akuriziyan.vercel.app";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        // disallow: '/admin/',
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
