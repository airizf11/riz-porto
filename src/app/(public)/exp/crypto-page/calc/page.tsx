// src/app/(public)/exp/crypto-page/calc/page.tsx
"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { ProfitCalculator } from "../ProfitCalculator";
import { Loader2 } from "lucide-react";

const COINS = [
  { id: "bitcoin", name: "Bitcoin (BTC)", symbol: "BTC" },
  { id: "ethereum", name: "Ethereum (ETH)", symbol: "ETH" },
  { id: "solana", name: "Solana (SOL)", symbol: "SOL" },
  { id: "ripple", name: "XRP (XRP)", symbol: "XRP" },
  { id: "cardano", name: "Cardano (ADA)", symbol: "ADA" },
  { id: "dogecoin", name: "Dogecoin (DOGE)", symbol: "DOGE" },
  { id: "shiba-inu", name: "Shiba Inu (SHIB)", symbol: "SHIB" },
  { id: "chainlink", name: "Chainlink (LINK)", symbol: "LINK" },
  { id: "the-hype", name: "Hype (HYPE)", symbol: "HYPE" },
];
const CURRENCIES = ["usd", "idr", "eur", "jpy", "gbp"];

// 1. Ini komponen Logic (Isinya useSearchParams)
function CalculatorContent() {
  const searchParams = useSearchParams();

  const initialCoin = searchParams.get("coin") || "bitcoin";
  const initialCurrency = searchParams.get("currency") || "usd";

  return (
    <>
      <div className="text-center mb-8">
        <h1 className="heading text-4xl md:text-6xl text-secondary mb-4">
          P/L Simulator
        </h1>
        <p className="narrative text-xl text-muted-foreground">
          Calculate potential profit and loss for your crypto investments.
        </p>
      </div>

      <ProfitCalculator
        coins={COINS}
        currencies={CURRENCIES}
        currentPrices={{}}
        initialCoin={initialCoin}
        initialCurrency={initialCurrency}
      />

      <Link
        href={{
          pathname: "/exp/crypto-page",
          query: { coin: initialCoin, currency: initialCurrency },
        }}
        className="block text-center mt-8 text-secondary hover:text-accent transition-colors font-semibold"
      >
        ← Back to Price Chart
      </Link>
    </>
  );
}

// 2. Ini Komponen Halaman (Wrapper Suspense)
export default function CalculatorPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="container mx-auto max-w-5xl px-4 py-12 md:py-20">
        {/* Suspense Boundary Wajib di Next.js 13+ kalau pake useSearchParams */}
        <Suspense
          fallback={
            <div className="flex flex-col items-center justify-center min-h-[400px]">
              <Loader2 className="w-10 h-10 animate-spin text-primary" />
              <p className="mt-4 text-muted-foreground">
                Loading calculator...
              </p>
            </div>
          }
        >
          <CalculatorContent />
        </Suspense>
      </div>
    </main>
  );
}
