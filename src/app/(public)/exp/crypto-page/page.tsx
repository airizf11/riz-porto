// src/app/(public)/exp/crypto-page/page.tsx
import { Metadata } from "next";
import CryptoPageClient from "./client-page";

export const metadata: Metadata = {
  title: "Interactive Crypto Tracker | Riziyan's Experiments",
  description:
    "Live price charts for major cryptocurrencies with currency and time range selection.",
};

async function getInitialData(coin: string, currency: string) {
  const days = "7";
  try {
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
    const response = await fetch(
      `${siteUrl}/api/crypto?coin=${coin}&currency=${currency}&days=${days}`
    );

    if (!response.ok) {
      console.error("Initial fetch failed:", await response.text());
      throw new Error("Failed to fetch initial data");
    }
    return await response.json();
  } catch (error) {
    console.error("Failed to fetch initial crypto data on server:", error);
    return { currentPrice: null, chartData: [] };
  }
}

export default async function CryptoPageContainer({
  searchParams,
}: {
  // 1. Ubah tipe searchParams jadi Promise
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) {
  // 2. Await searchParams sebelum dipake
  const resolvedParams = await searchParams;

  const initialCoin = resolvedParams.coin || "bitcoin";
  const initialCurrency = resolvedParams.currency || "usd";

  const initialData = await getInitialData(initialCoin, initialCurrency);

  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="container mx-auto max-w-5xl px-4 py-12 md:py-20">
        {/* Pass data ke Client Component */}
        <CryptoPageClient initialData={initialData} />

        <div className="text-center mt-8 text-sm text-muted-foreground">
          Data provided by{" "}
          <a
            href="https://www.coinmarketcap.com"
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-accent transition-colors"
          >
            CoinMarketCap
          </a>{" "}
          &{" "}
          <a
            href="https://www.coingecko.com"
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-accent transition-colors"
          >
            CoinGecko
          </a>
          .
        </div>
      </div>
    </main>
  );
}
