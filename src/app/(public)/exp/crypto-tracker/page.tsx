// src/app/(public)/exp/crypto-tracker/page.tsx
import { Metadata } from "next";
import CryptoTrackerClient from "./tracker-client";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const metadata: Metadata = {
  title: "Crypto Tracker | Experiments ",
  description:
    "Live price charts for major cryptocurrencies with currency and time range selection.",
};

async function getInitialData() {
  const coin = "bitcoin";
  const currency = "usd";
  const days = "7";
  try {
    const [priceResponse, chartResponse] = await Promise.all([
      fetch(
        `https://api.coingecko.com/api/v3/simple/price?ids=${coin}&vs_currencies=${currency}`
      ),
      fetch(
        `https://api.coingecko.com/api/v3/coins/${coin}/market_chart?vs_currency=${currency}&days=${days}`
      ),
    ]);

    if (!priceResponse.ok || !chartResponse.ok) throw new Error();

    const priceData = await priceResponse.json();
    const chartDataRaw = await chartResponse.json();

    return {
      initialPrice: priceData[coin]?.[currency] || null,
      initialChartData: chartDataRaw.prices.map((p: [number, number]) => ({
        timestamp: p[0],
        price: p[1],
      })),
    };
  } catch (error) {
    console.error("Failed to fetch initial crypto data on server:", error);
    return { initialPrice: null, initialChartData: [] };
  }
}

export default async function CryptoTrackerPageContainer() {
  const initialData = await getInitialData();

  return (
    <main className="min-h-screen bg-dark text-light">
      <div className="container mx-auto max-w-6xl px-4 py-12 md:py-20">
        <Link
          href="/"
          className="group inline-flex items-center gap-2 text-light/70 hover:text-light mb-12 transition-colors"
        >
          <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
          Back to Home
        </Link>
        <div className="text-center mb-8">
          <h1 className="heading text-4xl md:text-6xl text-accent mb-8">
            Crypto Tracker
          </h1>
          <p className="narrative text-xl text-light/80">
            Interactive price charts for top cryptocurrencies.
          </p>
        </div>

        <CryptoTrackerClient initialData={initialData} />

        <div className="text-center mt-12 text-sm text-light/50">
          Data provided by{" "}
          <a
            href="https://www.coingecko.com"
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-accent"
          >
            CoinGecko
          </a>
          .
        </div>
      </div>
    </main>
  );
}
