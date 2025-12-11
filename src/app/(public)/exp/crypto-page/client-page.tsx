// src/app/(public)/exp/crypto-page/client-page.tsx
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useEffect, useMemo } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import Link from "next/link";
import { PriceChart } from "./PriceChart";

// --- PUSAT KONFIGURASI ---
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
const TIME_RANGES = [
  { value: "1h", label: "1H" },
  { value: "12h", label: "12H" },
  { value: "1", label: "1D" },
  { value: "7", label: "7D" },
  { value: "30", label: "30D" },
];

// Tipe data
type InitialData = { currentPrice: number | null; chartData: any[] };
type CryptoData = { currentPrice: number | null; chartData: any[] };

export default function CryptoPageClient({
  initialData,
}: {
  initialData: InitialData;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Inisialisasi state dari URL, dengan fallback
  const [selectedCoin, setSelectedCoin] = useState(
    () => searchParams.get("coin") || "bitcoin"
  );
  const [selectedCurrency, setSelectedCurrency] = useState(
    () => searchParams.get("currency") || "usd"
  );
  const [timeRange, setTimeRange] = useState(
    () => searchParams.get("time") || "30"
  );

  const [data, setData] = useState<CryptoData>(initialData);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Effect untuk mengambil data saat state berubah
  useEffect(() => {
    // Update URL saat state berubah
    const params = new URLSearchParams(searchParams.toString());
    params.set("coin", selectedCoin);
    params.set("currency", selectedCurrency);
    params.set("time", timeRange);
    // `router.replace` digunakan untuk update URL tanpa menambah histori browser
    router.replace(`${pathname}?${params.toString()}`);

    async function fetchData() {
      setIsLoading(true);
      setError(null);
      try {
        // Untuk pilihan jam, kita tetap request data 1 hari
        const days = ["1h", "12h"].includes(timeRange) ? "1" : timeRange;
        const apiParams = new URLSearchParams({
          coin: selectedCoin,
          currency: selectedCurrency,
          days,
        });
        const response = await fetch(`/api/crypto?${apiParams.toString()}`);

        if (!response.ok)
          throw new Error((await response.json()).error || "API Error");

        const fetchedData = await response.json();

        // Filter data chart untuk pilihan jam
        if (timeRange.endsWith("h")) {
          const hours = parseInt(timeRange.replace("h", ""));
          const now = Date.now();
          const startTime = now - hours * 60 * 60 * 1000;
          fetchedData.chartData = fetchedData.chartData.filter(
            (d: any) => d.timestamp >= startTime
          );
        }

        setData(fetchedData);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();
  }, [
    selectedCoin,
    selectedCurrency,
    timeRange,
    router,
    pathname,
    searchParams,
  ]);

  const currentCoinInfo = useMemo(
    () => COINS.find((c) => c.id === selectedCoin),
    [selectedCoin]
  );

  // Effect untuk update judul halaman (SEO)
  useEffect(() => {
    if (currentCoinInfo && data.currentPrice) {
      const formattedPrice = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: selectedCurrency.toUpperCase(),
      }).format(data.currentPrice);
      document.title = `${currentCoinInfo.name} ${formattedPrice} | Riziyan's Tracker`;
    }
  }, [currentCoinInfo, selectedCurrency, data.currentPrice]);

  return (
    <>
      <div className="text-center mb-8">
        <h1 className="heading text-4xl md:text-6xl text-accent mb-4">
          {currentCoinInfo?.name || "Crypto Tracker"}
        </h1>
        <p className="narrative text-xl text-light/80">
          Live price charts and simulator.
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 mb-8 bg-dark/50 rounded-lg border border-light/10">
        <div>
          <label className="text-xs text-light/70 block mb-1">Coin</label>
          <select
            value={selectedCoin}
            onChange={(e) => setSelectedCoin(e.target.value)}
            className="w-full p-2 bg-neutral-800 rounded border border-light/20 focus:ring-2 focus:ring-accent outline-none"
          >
            {COINS.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="text-xs text-light/70 block mb-1">Currency</label>
          <select
            value={selectedCurrency}
            onChange={(e) => setSelectedCurrency(e.target.value)}
            className="w-full p-2 bg-neutral-800 rounded border border-light/20 focus:ring-2 focus:ring-accent outline-none"
          >
            {CURRENCIES.map((c) => (
              <option key={c} value={c}>
                {c.toUpperCase()}
              </option>
            ))}
          </select>
        </div>
        <div className="col-span-2">
          <label className="text-xs text-light/70 block mb-1">Time Range</label>
          <div className="grid grid-cols-5 gap-1 p-1 bg-neutral-800 rounded-lg border border-light/20">
            {TIME_RANGES.map((r) => (
              <button
                key={r.value}
                onClick={() => setTimeRange(r.value)}
                className={`p-2 rounded-md text-sm font-semibold transition-colors ${
                  timeRange === r.value
                    ? "bg-secondary text-light"
                    : "hover:bg-neutral-700"
                }`}
              >
                {r.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="p-6 bg-dark/70 rounded-xl border border-light/10 min-h-[32rem] flex flex-col justify-center">
        {isLoading ? (
          <div className="text-center text-light/70">Loading chart data...</div>
        ) : error ? (
          <div className="text-center text-red-400">Error: {error}</div>
        ) : (
          <PriceChart data={data.chartData} currency={selectedCurrency} />
        )}
      </div>

      <Link
        href={{
          pathname: "/exp/crypto-page/calc",
          query: { coin: selectedCoin, currency: selectedCurrency },
        }}
        className="block text-center mt-8 text-secondary hover:text-accent transition-colors font-semibold"
      >
        Go to Profit & Loss Simulator →
      </Link>
    </>
  );
}
