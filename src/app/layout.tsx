// src/app/layout.tsx
import type { Metadata } from "next";
import { Inter, Lora } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";
import { aboutData } from "@/lib/data";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const lora = Lora({
  subsets: ["latin"],
  variable: "--font-lora",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Riziyan - Digital Explorer & Creator",
  description:
    "I build and share things for the curious mind. A personal portfolio for tech, education, and content creation.",
  openGraph: {
    title: "Riziyan - Digital Explorer & Creator",
    description: aboutData.narrative.replace(/<[^>]*>?/gm, ""),
    url: "https://akuriziyan.vercel.app",
    siteName: "Riziyan Portfolio",
    images: [
      {
        url: "https://eweydsgczhxcnmnmstsg.supabase.co/storage/v1/object/public/assets/public/profile-picture.jpg", // URL gambar profilmu
        width: 800,
        height: 600,
      },
    ],
    locale: "id_ID",
    type: "website",
  },
};

const PersonSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Riziyan",
  url: "https://akuriziyan.vercel.app",
  sameAs: [
    "https://github.com/airizf11",
    "https://www.youtube.com/rizyanchannel",
    "https://instagram.com/rizyan.people",
    "https://tiktok.com/@akuriziyan",
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${lora.variable}`}>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(PersonSchema) }}
        />
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
