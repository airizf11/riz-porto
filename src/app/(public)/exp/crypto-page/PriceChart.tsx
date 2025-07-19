// src/app/(public)/exp/crypto-page/PriceChart.tsx
"use client";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import { useMemo } from "react";

interface PriceChartProps {
  data: { timestamp: number; price: number }[];
  currency: string;
}

const formatDate = (timestamp: number) => {
  return new Date(timestamp).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });
};

const formatCurrency = (value: number, currency: string) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currency.toUpperCase(),
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
};

export function PriceChart({ data, currency }: PriceChartProps) {
  const yAxisDomain = useMemo((): [number, number] | [string, string] => {
    if (!data || data.length === 0) return ["auto", "auto"];

    const prices = data.map((p) => p.price);
    const minPrice = Math.min(...prices);
    const maxPrice = Math.max(...prices);

    const padding = (maxPrice - minPrice) * 0.1;

    const domainMin = Math.max(0, minPrice - padding);
    const domainMax = maxPrice + padding;

    return [domainMin, domainMax];
  }, [data]);

  if (!data || data.length === 0) {
    return (
      <div className="h-96 flex items-center justify-center bg-dark/50 rounded-lg text-light/70">
        No chart data available.
      </div>
    );
  }

  return (
    <div className="h-96 w-full">
      <ResponsiveContainer>
        <AreaChart
          data={data}
          margin={{ top: 5, right: 20, bottom: 5, left: 0 }}
        >
          <defs>
            <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#f0c606" stopOpacity={0.4} />
              <stop offset="95%" stopColor="#f0c606" stopOpacity={0} />
            </linearGradient>
          </defs>
          <Tooltip
            contentStyle={{
              backgroundColor: "rgba(28, 28, 28, 0.8)",
              borderColor: "rgb(240 198 6 / 0.5)",
              backdropFilter: "blur(4px)",
              borderRadius: "0.5rem",
              color: "#fff1d0",
            }}
            labelStyle={{ color: "#fff1d0" }}
            itemStyle={{ color: "#f0c606", fontWeight: "bold" }}
            labelFormatter={formatDate}
            formatter={(value: number) => [
              formatCurrency(value, currency),
              "Price",
            ]}
          />
          <XAxis
            dataKey="timestamp"
            tickFormatter={formatDate}
            stroke="rgb(255 241 208 / 0.5)"
            dy={10}
            fontSize={12}
          />
          <YAxis
            dataKey="price"
            orientation="right"
            stroke="rgb(255 241 208 / 0.5)"
            dx={10}
            fontSize={12}
            tickFormatter={(value) => {
              if (value > 1_000_000)
                return `${(value / 1_000_000).toFixed(1)}M`;
              if (value > 1_000) return `${(value / 1_000).toFixed(1)}K`;
              return value.toFixed(0);
            }}
            domain={yAxisDomain}
            allowDataOverflow={true}
          />
          <CartesianGrid stroke="rgb(255 241 208 / 0.05)" vertical={false} />
          <Area
            type="monotone"
            dataKey="price"
            stroke="#f0c606"
            strokeWidth={2}
            fill="url(#colorPrice)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
