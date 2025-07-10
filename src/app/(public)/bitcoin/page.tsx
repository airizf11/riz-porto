// src/app/(public)/bitcoin/page.tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Bitcoin Price Tracker | Riziyan's Portfolio",
  description:
    "Live price tracking and simple data visualization for Bitcoin (BTC).",
};

type BitcoinPriceData = {
  bitcoin: {
    usd: number;
    idr: number;
  };
};

async function getBitcoinPrice(): Promise<BitcoinPriceData | null> {
  try {
    const response = await fetch(
      "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd,idr",
      {
        next: {
          revalidate: 60,
        },
      }
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch: ${response.statusText}`);
    }

    const data: BitcoinPriceData = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching Bitcoin price:", error);
    return null;
  }
}

const formatCurrency = (amount: number, currency: "USD" | "IDR") => {
  return new Intl.NumberFormat(currency === "USD" ? "en-US" : "id-ID", {
    style: "currency",
    currency: currency,
    maximumFractionDigits: 0,
  }).format(amount);
};

export default async function BitcoinTrackerPage() {
  const priceData = await getBitcoinPrice();

  return (
    <main className="min-h-screen bg-dark text-light">
      <div className="container mx-auto max-w-4xl px-4 py-12 md:py-20">
        <div className="text-center mb-12">
          <h1 className="heading text-4xl md:text-6xl text-accent mb-4">
            Bitcoin Tracker
          </h1>
          <p className="narrative text-xl text-light/80">
            Real-time price data for Bitcoin (BTC).
          </p>
        </div>

        {priceData ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="p-8 bg-dark/70 backdrop-blur-sm border border-light/10 rounded-xl text-center">
              <h2 className="text-2xl text-light/70 mb-2">Price (USD)</h2>
              <p className="text-5xl font-bold text-green-400">
                {formatCurrency(priceData.bitcoin.usd, "USD")}
              </p>
            </div>

            <div className="p-8 bg-dark/70 backdrop-blur-sm border border-light/10 rounded-xl text-center">
              <h2 className="text-2xl text-light/70 mb-2">Price (IDR)</h2>
              <p className="text-5xl font-bold text-secondary">
                {formatCurrency(priceData.bitcoin.idr, "IDR")}
              </p>
            </div>
          </div>
        ) : (
          <div className="text-center p-8 bg-red-900/50 border border-red-500/50 rounded-xl">
            <p className="text-xl text-red-300">
              Could not load Bitcoin price data. Please try again later.
            </p>
          </div>
        )}

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
          . Refreshes every minute.
        </div>
      </div>
    </main>
  );
}
