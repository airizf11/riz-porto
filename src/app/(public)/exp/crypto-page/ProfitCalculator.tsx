// src/app/(public)/exp/crypto-page/ProfitCalculator.tsx
"use client";
import { useState, useMemo, useEffect } from "react";
import { ArrowRightLeft } from "lucide-react";

interface Coin {
  id: string;
  name: string;
  symbol: string;
}
interface ProfitCalculatorProps {
  coins: Coin[];
  currencies: string[];
  currentPrices: { [key: string]: number | null };
}

export function ProfitCalculator({
  coins,
  currencies,
  currentPrices,
}: ProfitCalculatorProps) {
  const [calcCoin, setCalcCoin] = useState("bitcoin");
  const [calcCurrency, setCalcCurrency] = useState("usd");
  const [investment, setInvestment] = useState("");
  const [buyPrice, setBuyPrice] = useState("");
  const [targetPrice, setTargetPrice] = useState("");
  const [amountOfCoin, setAmountOfCoin] = useState("");

  const currentPriceForCalc = currentPrices[calcCoin];

  useEffect(() => {
    const inv = parseFloat(investment);
    const buy = parseFloat(buyPrice);
    if (inv > 0 && buy > 0) {
      setAmountOfCoin((inv / buy).toPrecision(8));
    }
  }, [investment, buyPrice]);

  useEffect(() => {
    const amount = parseFloat(amountOfCoin);
    const buy = parseFloat(buyPrice);
    if (amount > 0 && buy > 0) {
      setInvestment(
        (amount * buy).toFixed(calcCurrency.toLowerCase() === "idr" ? 0 : 2)
      );
    }
  }, [amountOfCoin, buyPrice, calcCurrency]);

  const results = useMemo(() => {
    const amount = parseFloat(amountOfCoin);
    const buy = parseFloat(buyPrice);
    const target = parseFloat(targetPrice);

    if (!amount || !buy) return null;

    let profitAtTarget = 0,
      percentageAtTarget = 0,
      currentProfit = 0,
      totalValueAtTarget = 0,
      currentTotalValue = 0;

    if (target > 0) {
      profitAtTarget = (target - buy) * amount;
      percentageAtTarget = (target / buy - 1) * 100;
      totalValueAtTarget = target * amount;
    }

    if (currentPriceForCalc) {
      currentProfit = (currentPriceForCalc - buy) * amount;
      currentTotalValue = currentPriceForCalc * amount;
    }

    return {
      profitAtTarget,
      percentageAtTarget,
      currentProfit,
      totalValueAtTarget,
      currentTotalValue,
    };
  }, [amountOfCoin, buyPrice, targetPrice, currentPriceForCalc]);

  const formatCurrency = (value: number, currency: string) => {
    const isIdr = currency.toLowerCase() === "idr";
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: currency.toUpperCase(),
      minimumFractionDigits: isIdr ? 0 : 2,
      maximumFractionDigits: isIdr ? 0 : 8,
    }).format(value);
  };

  return (
    <div className="p-6 bg-dark/50 rounded-xl border border-light/10 mt-8">
      <h3 className="heading text-2xl text-secondary mb-4">
        Profit & Loss Simulator
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-4 mb-6 items-end">
        {/* Input untuk memilih Koin dan Mata Uang */}
        <div className="lg:col-span-2">
          <label className="text-xs text-light/70 block mb-1">Coin</label>
          <select
            value={calcCoin}
            onChange={(e) => setCalcCoin(e.target.value)}
            className="w-full p-2 bg-neutral-800 rounded mt-1 border border-light/20"
          >
            {coins.map((c) => (
              <option key={c.id} value={c.id}>
                {c.symbol}
              </option>
            ))}
          </select>
        </div>
        <div className="lg:col-span-2">
          <label className="text-xs text-light/70 block mb-1">Currency</label>
          <select
            value={calcCurrency}
            onChange={(e) => setCalcCurrency(e.target.value)}
            className="w-full p-2 bg-neutral-800 rounded mt-1 border border-light/20"
          >
            {currencies.map((c) => (
              <option key={c} value={c}>
                {c.toUpperCase()}
              </option>
            ))}
          </select>
        </div>

        {/* Input untuk Investasi atau Jumlah Koin */}
        <div className="lg:col-span-3">
          <label className="text-xs text-light/70 block mb-1">Investment</label>
          <input
            type="number"
            value={investment}
            onChange={(e) => setInvestment(e.target.value)}
            placeholder={`e.g., 1000`}
            className="w-full p-2 bg-neutral-800 rounded mt-1 border border-light/20"
          />
        </div>
        <div className="lg:col-span-1 flex items-center justify-center text-light/50 pt-6">
          <ArrowRightLeft size={18} />
        </div>
        <div className="lg:col-span-4">
          <label className="text-xs text-light/70 block mb-1">
            Amount of Coin
          </label>
          <input
            type="number"
            value={amountOfCoin}
            onChange={(e) => setAmountOfCoin(e.target.value)}
            placeholder={`e.g., 0.1`}
            className="w-full p-2 bg-neutral-800 rounded mt-1 border border-light/20"
          />
        </div>

        {/* Input untuk Harga Beli dan Jual */}
        <div className="lg:col-span-6">
          <label className="text-xs text-light/70 block mb-1">
            Buy Price (per coin)
          </label>
          <input
            type="number"
            value={buyPrice}
            onChange={(e) => setBuyPrice(e.target.value)}
            placeholder={`Price when you bought`}
            className="w-full p-2 bg-neutral-800 rounded mt-1 border border-light/20"
          />
        </div>
        <div className="lg:col-span-6">
          <label className="text-xs text-light/70 block mb-1">
            Target Sell Price (per coin)
          </label>
          <input
            type="number"
            value={targetPrice}
            onChange={(e) => setTargetPrice(e.target.value)}
            placeholder={`Your dream price`}
            className="w-full p-2 bg-neutral-800 rounded mt-1 border border-light/20"
          />
        </div>
      </div>

      {results && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-center">
          <div className="bg-dark p-4 rounded-lg">
            <p className="text-sm text-light/70">Potential P/L at Target</p>
            <p
              className={`text-2xl font-bold ${
                results.profitAtTarget >= 0 ? "text-green-400" : "text-red-400"
              }`}
            >
              {targetPrice
                ? formatCurrency(results.profitAtTarget, calcCurrency)
                : "-"}
              {targetPrice && (
                <span className="text-lg ml-2">
                  ({results.percentageAtTarget.toFixed(2)}%)
                </span>
              )}
            </p>
            {targetPrice && (
              <p className="text-xs text-light/50 mt-1">
                Total value:{" "}
                {formatCurrency(results.totalValueAtTarget, calcCurrency)}
              </p>
            )}
          </div>
          {currentPriceForCalc ? (
            <div className="bg-dark p-4 rounded-lg">
              <p className="text-sm text-light/70">Current Unrealized P/L</p>
              <p
                className={`text-2xl font-bold ${
                  results.currentProfit >= 0 ? "text-green-400" : "text-red-400"
                }`}
              >
                {formatCurrency(results.currentProfit, calcCurrency)}
              </p>
              <p className="text-xs text-light/50 mt-1">
                Current value:{" "}
                {formatCurrency(results.currentTotalValue, calcCurrency)}
              </p>
            </div>
          ) : (
            <div className="bg-dark p-4 rounded-lg">
              <p className="text-sm text-light/70">Current Unrealized P/L</p>
              <p className="text-xl font-bold text-light/50">
                Select coin in main chart to see live P/L
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
