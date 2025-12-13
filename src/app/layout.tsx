// src/app/layout.tsx
import type { Metadata } from "next";
import { Inter, Lora } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";
import { constructMetadata } from "@/lib/utils";

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

export const metadata: Metadata = constructMetadata();

const PersonSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Riziyan",
  url: "https://akuriziyan.vercel.app",
  sameAs: [
    "https://github.com/airizf11",
    "https://www.youtube.com/rizyanchannel",
    "https://instagram.com/rizyan.people",
    "https://tiktok.com/@rizyan.gt",
    "https://blog.riziyan.my.id",
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${lora.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(PersonSchema) }}
        />
      </head>
      <body>
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
