// src/components/QuoteSection.tsx
/* eslint-disable react/no-unescaped-entities */
import { AnimatedSection } from "./AnimatedSection";
import { getPublishedQuotes } from "@/lib/data";

export const QuoteSection = async () => {
  const quotes = await getPublishedQuotes();

  if (!quotes || quotes.length === 0) {
    return (
      <AnimatedSection className="w-full py-20 bg-dark">
        <div className="container mx-auto max-w-4xl px-8 text-center">
          <blockquote className="narrative text-3xl md:text-4xl text-accent italic">
            "Semua bisa dimulai dari penasaran."
          </blockquote>
        </div>
      </AnimatedSection>
    );
  }

  const randomIndex = Math.floor(Math.random() * quotes.length);
  const quote = quotes[randomIndex];

  return (
    <AnimatedSection className="w-full py-20 bg-dark">
      <div className="container mx-auto max-w-4xl px-8 text-center">
        <blockquote className="narrative text-3xl md:text-4xl text-accent italic">
          "{quote.title}"
        </blockquote>
        {quote.author_name && (
          <p className="mt-4 text-light/70">- {quote.author_name}</p>
        )}
      </div>
    </AnimatedSection>
  );
};
