// src/app/(public)/exp/crypto-tracker/tracker-client.tsx
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useEffect, useMemo } from "react";
import { PriceChart } from "./PriceChart";

type InitialData = {
  initialPrice: number | null;
  initialChartData: { timestamp: number; price: number }[];
};

type CryptoData = {
  currentPrice: number | null;
  chartData: { timestamp: number; price: number }[];
};

const COINS = [
  { id: "bitcoin", name: "Bitcoin (BTC)" },
  { id: "ethereum", name: "Ethereum (ETH)" },
  { id: "solana", name: "Solana (SOL)" },
  { id: "dogecoin", name: "Dogecoin (DOGE)" },
];
const CURRENCIES = ["usd", "idr", "eur", "jpy"];
const TIME_RANGES = [
  { value: "1", label: "1D" },
  { value: "7", label: "7D" },
  { value: "30", label: "30D" },
  { value: "90", label: "90D" },
  { value: "365", label: "1Y" },
];

export default function CryptoTrackerClient({
  initialData,
}: {
  initialData: InitialData;
}) {
  const [selectedCoin, setSelectedCoin] = useState("bitcoin");
  const [selectedCurrency, setSelectedCurrency] = useState("usd");
  const [timeRange, setTimeRange] = useState("30");

  const [data, setData] = useState<CryptoData>({
    currentPrice: initialData.initialPrice,
    chartData: initialData.initialChartData,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      setError(null);
      try {
        const [priceResponse, chartResponse] = await Promise.all([
          fetch(
            `https://api.coingecko.com/api/v3/simple/price?ids=${selectedCoin}&vs_currencies=${selectedCurrency}`
          ),
          fetch(
            `https://api.coingecko.com/api/v3/coins/${selectedCoin}/market_chart?vs_currency=${selectedCurrency}&days=${timeRange}`
          ),
        ]);

        if (!priceResponse.ok || !chartResponse.ok) {
          throw new Error(
            "Failed to fetch data from CoinGecko API. May be rate-limited."
          );
        }

        const priceData = await priceResponse.json();
        const chartDataRaw = await chartResponse.json();

        setData({
          currentPrice: priceData[selectedCoin]?.[selectedCurrency] || null,
          chartData: chartDataRaw.prices.map((p: [number, number]) => ({
            timestamp: p[0],
            price: p[1],
          })),
        });
      } catch (err: any) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    }

    if (
      selectedCoin !== "bitcoin" ||
      selectedCurrency !== "usd" ||
      timeRange !== "30"
    ) {
      fetchData();
    } else {
      setData({
        currentPrice: initialData.initialPrice,
        chartData: initialData.initialChartData,
      });
    }
  }, [selectedCoin, selectedCurrency, timeRange, initialData]);

  const currentCoinName = useMemo(
    () => COINS.find((c) => c.id === selectedCoin)?.name,
    [selectedCoin]
  );
  const formattedPrice = useMemo(() => {
    if (data.currentPrice === null) return "...";
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: selectedCurrency.toUpperCase(),
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(data.currentPrice);
  }, [data.currentPrice, selectedCurrency]);

  return (
    <div>
      {/* Kontrol UI */}
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

      {/* Tampilan Utama (Chart & Harga) */}
      <div className="p-6 bg-dark/70 rounded-xl border border-light/10 min-h-[32rem] flex flex-col justify-center">
        {isLoading ? (
          <div className="text-center text-light/70">Loading new data...</div>
        ) : error ? (
          <div className="text-center text-red-400">Error: {error}</div>
        ) : (
          <>
            <div className="mb-6 px-4">
              <h2 className="text-2xl text-light/80">{currentCoinName}</h2>
              <p className="text-5xl font-bold text-accent">{formattedPrice}</p>
            </div>
            <PriceChart data={data.chartData} currency={selectedCurrency} />
          </>
        )}
      </div>
    </div>
  );
}
