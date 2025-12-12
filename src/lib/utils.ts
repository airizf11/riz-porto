// src/lib/utils.ts
import { clsx, type ClassValue } from "clsx";
import { Metadata } from "next";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// 2. Robust Absolute URL
// Otomatis deteksi: Production Domain -> Vercel Preview -> Localhost
export function absoluteUrl(path: string) {
  if (process.env.NEXT_PUBLIC_SITE_URL) {
    return `${process.env.NEXT_PUBLIC_SITE_URL}${path}`;
  }
  if (process.env.NEXT_PUBLIC_VERCEL_URL) {
    return `https://${process.env.NEXT_PUBLIC_VERCEL_URL}${path}`;
  }
  return `http://localhost:3000${path}`;
}

// 3. Centralized Config (Biar gampang ganti teks kedepannya)
const siteConfig = {
  title: "Riziyan - Digital Explorer & Creator",
  description:
    "I build and share things for the curious mind. A personal portfolio for tech, education, content creation and more.",
  url: "https://akuriziyan.vercel.app",
  ogImage:
    "https://eweydsgczhxcnmnmstsg.supabase.co/storage/v1/object/public/assets/public/profile-picture.jpg", // Fallback image (Profile Picture lo)
  twitterHandle: "@altriziyan",
};

interface MetadataProps {
  title?: string;
  description?: string;
  image?: string;
  icons?: string;
  noIndex?: boolean;
}

// 4. Perfect Metadata Constructor
export function constructMetadata({
  title = siteConfig.title,
  description = siteConfig.description,
  image = siteConfig.ogImage,
  icons = "/favicon.ico",
  noIndex = false,
}: MetadataProps = {}): Metadata {
  return {
    title: {
      default: title,
      template: `%s | Riziyan`,
    },
    description,
    // Base URL penting buat SEO resolve relative links
    metadataBase: new URL(absoluteUrl("/")),

    // Keywords bantu indexing Google
    keywords: [
      "Riziyan",
      "Portfolio",
      "Web Developer",
      "Content Creator",
      "Next.js",
      "React",
      "Indonesia",
    ],

    authors: [
      {
        name: "Riziyan",
        url: siteConfig.url,
      },
    ],
    creator: "Riziyan",

    openGraph: {
      type: "website",
      locale: "id_ID",
      url: siteConfig.url,
      title,
      description,
      siteName: "Riziyan Portfolio",
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },

    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
      creator: siteConfig.twitterHandle,
    },

    icons,

    // Logic NoIndex (Buat halaman admin/private)
    ...(noIndex && {
      robots: {
        index: false,
        follow: false,
      },
    }),
  };
}
