// src/components/QuoteSection.tsx
/* eslint-disable react/no-unescaped-entities */
import { AnimatedSection } from "./AnimatedSection";

const quotes = [
  "Semua bisa dimulai dari penasaran.",
  "Aku tidak ahli, tapi aku berproses.",
];

export const QuoteSection = () => {
  return (
    <AnimatedSection className="w-full py-20 bg-dark">
      <div className="container mx-auto max-w-4xl px-8 text-center">
        <blockquote className="narrative text-3xl md:text-4xl text-accent italic">
          "{quotes[0]}"
        </blockquote>
      </div>
    </AnimatedSection>
  );
};
