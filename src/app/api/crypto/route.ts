// src/app/api/crypto/route.ts
/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest, NextResponse } from "next/server";

const CMC_API_KEY = process.env.CMC_API_KEY;

export async function GET(request: NextRequest) {
  if (!CMC_API_KEY) {
    return NextResponse.json(
      { error: "CMC API Key not configured" },
      { status: 500 }
    );
  }

  const { searchParams } = new URL(request.url);
  const coin = searchParams.get("coin");
  const currency = searchParams.get("currency");
  const days = searchParams.get("days");

  if (!coin || !currency || !days) {
    return NextResponse.json(
      { error: "Missing required query parameters: coin, currency, days" },
      { status: 400 }
    );
  }

  const coinSymbolMap: { [key: string]: string } = {
    bitcoin: "BTC",
    ethereum: "ETH",
    solana: "SOL",
    ripple: "XRP",
    cardano: "ADA",
    dogecoin: "DOGE",
    "shiba-inu": "SHIB",
    chainlink: "LINK",
    "the-hype": "HYPE",
  };
  const symbol = coin ? coinSymbolMap[coin.toLowerCase()] : undefined;
  if (!symbol) {
    return NextResponse.json(
      { error: `Invalid or unsupported coin specified: ${coin}` },
      { status: 400 }
    );
  }

  try {
    // 1. Ambil harga terbaru dari CoinMarketCap (lebih andal)
    const priceUrl = `https://pro-api.coinmarketcap.com/v2/cryptocurrency/quotes/latest?symbol=${symbol}&convert=${currency.toUpperCase()}`;
    const priceResponse = await fetch(priceUrl, {
      headers: { "X-CMC_PRO_API_KEY": CMC_API_KEY },
    });
    if (!priceResponse.ok) throw new Error("Failed to fetch from CMC");
    const priceData = await priceResponse.json();
    const currentPrice =
      priceData.data[symbol][0].quote[currency.toUpperCase()].price;

    // 2. Ambil data chart dari CoinGecko (tetap gratis dan bagus untuk chart)
    const chartUrl = `https://api.coingecko.com/api/v3/coins/${coin}/market_chart?vs_currency=${currency}&days=${days}`;
    const chartResponse = await fetch(chartUrl);
    if (!chartResponse.ok) throw new Error("Failed to fetch from CoinGecko");
    const chartDataRaw = await chartResponse.json();
    const chartData = chartDataRaw.prices.map((p: [number, number]) => ({
      timestamp: p[0],
      price: p[1],
    }));

    const responseData = { currentPrice, chartData };

    return NextResponse.json(responseData, {
      headers: {
        "Cache-Control": "public, s-maxage=60, stale-while-revalidate=120",
      },
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
