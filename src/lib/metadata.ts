// src/lib/metadata.ts
import type { Metadata } from "next";

const siteConfig = {
  title: "Riziyan - Digital Explorer & Creator",
  description:
    "I build and share things for the curious mind. A personal portfolio for tech, education, and content creation.",
  url: "https://akuriziyan.vercel.app",
  ogImage:
    "https://eweydsgczhxcnmnmstsg.supabase.co/storage/v1/object/public/assets/public/profile-picture.jpg",
  author: "Riziyan",
  twitterHandle: "@altriziyan",
};

export function constructMetadata({
  title = siteConfig.title,
  description = siteConfig.description,
  image = siteConfig.ogImage,
  icons = "/favicon.ico",
  noIndex = false,
}: {
  title?: string;
  description?: string;
  image?: string;
  icons?: string;
  noIndex?: boolean;
} = {}): Metadata {
  return {
    title: {
      default: title,
      template: `%s | Riziyan`,
    },
    description: description,
    metadataBase: new URL(siteConfig.url),

    openGraph: {
      title: title,
      description: description,
      url: siteConfig.url,
      siteName: siteConfig.title,
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: description,
        },
      ],
      locale: "id_ID",
      type: "website",
    },

    twitter: {
      card: "summary_large_image",
      title: title,
      description: description,
      images: [image],
      creator: siteConfig.twitterHandle,
    },

    icons: {
      icon: icons,
    },

    ...(noIndex && {
      robots: {
        index: false,
        follow: false,
      },
    }),
  };
}
