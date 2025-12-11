// src/components/sections/QuoteSection.tsx
import { getPublishedQuotes } from "@/lib/data";
import { QuoteClient } from "./QuoteClient";

export const QuoteSection = async () => {
  const quotes = await getPublishedQuotes();

  const defaultQuote = {
    title: "Semua bisa dimulai dari penasaran.",
    author_name: "Riziyan",
  };

  // Logic Random dimainkan di Server biar HTML yang dikirim ke browser udah fix
  // (Mencegah layout shift / hydration mismatch antara server vs client)
  const selectedQuote =
    quotes && quotes.length > 0
      ? quotes[Math.floor(Math.random() * quotes.length)]
      : defaultQuote;

  return <QuoteClient quote={selectedQuote} />;
};
