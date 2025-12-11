// src/components/sections/HeroSection.tsx
"use client";

import { motion, Variants } from "framer-motion";
import { ArrowRight, Mail } from "lucide-react";
import Link from "next/link";

// Shadcn & Utils
import { Button } from "@/components/ui/button";

interface HeroSectionProps {
  headline: string;
  subtitle: string;
}

export const HeroSection = ({ headline, subtitle }: HeroSectionProps) => {
  // Animation variants biar code JSX lebih bersih
  const fadeInUp: Variants = {
    hidden: { opacity: 0, y: 30 },
    // 3. Ubah argument jadi 'any' atau 'number' (Custom variants args emang agak tricky di TS)
    visible: (delay: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        delay: delay,
        // 4. Easing Array: Kunci utamanya disini
        ease: [0.21, 0.47, 0.32, 0.98], // Smooth cubic bezier
      },
    }),
  };

  return (
    <section className="relative w-full h-screen min-h-[600px] flex items-center justify-center bg-background overflow-hidden">
      {/* Background decoration (Optional: Spotlights/Gradients) */}
      <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] bg-primary/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[400px] h-[400px] bg-secondary/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="container px-4 md:px-6 relative z-10">
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto space-y-8">
          {/* Headline */}
          <motion.div
            custom={0.2}
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
          >
            <h1
              className="heading text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-foreground leading-[1.1]"
              dangerouslySetInnerHTML={{ __html: headline }}
            />
          </motion.div>

          {/* Subtitle */}
          <motion.p
            custom={0.4}
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            className="narrative text-lg md:text-2xl text-muted-foreground max-w-2xl leading-relaxed"
          >
            {subtitle}
          </motion.p>

          {/* Buttons Action */}
          <motion.div
            custom={0.6}
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto pt-4"
          >
            <Button
              asChild
              size="lg"
              className="rounded-full text-base font-bold h-12 px-8 shadow-lg shadow-primary/20 hover:shadow-primary/40 transition-all hover:scale-105"
            >
              <Link href="/projects">
                Explore My Work
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>

            <Button
              asChild
              variant="outline"
              size="lg"
              className="rounded-full text-base font-bold h-12 px-8 border-2 hover:bg-muted/50 transition-all hover:scale-105"
            >
              <Link href="/contact">
                Contact Me
                <Mail className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
