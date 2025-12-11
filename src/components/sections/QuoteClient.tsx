// src/components/sections/QuoteClient.tsx
"use client";

import { motion } from "framer-motion";
import { Quote } from "lucide-react";

interface QuoteData {
  title: string;
  author_name: string;
}

export const QuoteClient = ({ quote }: { quote: QuoteData }) => {
  return (
    <section className="relative w-full py-24 md:py-32 bg-background/50 border-y border-border/40 overflow-hidden">
      {/* Background Decor: Giant Quote Icon Watermark */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none select-none">
        <Quote
          className="w-[200px] h-[200px] md:w-[300px] md:h-[300px] text-accent/5 -rotate-12"
          strokeWidth={1}
        />
      </div>

      <div className="container mx-auto max-w-4xl px-8 relative z-10 text-center">
        <motion.figure
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex flex-col items-center justify-center gap-6"
        >
          {/* Small decorative icon */}
          <div className="bg-accent/10 p-3 rounded-full mb-2">
            <Quote className="w-6 h-6 text-accent fill-accent/20" />
          </div>

          <blockquote className="relative">
            <p className="narrative text-3xl md:text-5xl font-medium text-foreground leading-tight md:leading-snug italic">
              &ldquo;{quote.title}&rdquo;
            </p>
          </blockquote>

          <figcaption className="mt-4 flex items-center gap-4">
            <span className="h-px w-8 bg-muted-foreground/40"></span>
            <span className="text-muted-foreground text-lg tracking-wide uppercase font-sans font-medium">
              {quote.author_name || "Unknown"}
            </span>
            <span className="h-px w-8 bg-muted-foreground/40"></span>
          </figcaption>
        </motion.figure>
      </div>
    </section>
  );
};
