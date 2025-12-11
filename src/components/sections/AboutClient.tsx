// src/components/sections/AboutClient.tsx
"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface AboutClientProps {
  headline: string;
  narrative: string;
  imageUrl: string;
}

export const AboutClient = ({
  headline,
  narrative,
  imageUrl,
}: AboutClientProps) => {
  return (
    <section className="relative w-full py-24 md:py-32 bg-background overflow-hidden">
      {/* Background Blobs */}
      <div className="absolute top-1/2 right-[-10%] w-[500px] h-[500px] bg-accent/15 rounded-full blur-[120px] pointer-events-none -translate-y-1/2" />
      <div className="absolute bottom-[-10%] left-[-5%] w-[300px] h-[300px] bg-secondary/20 rounded-full blur-[100px] pointer-events-none" />

      <div className="container mx-auto px-4 md:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-center">
          {/* Text Content */}
          <div className="order-2 md:order-1">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <h2 className="text-sm font-bold tracking-widest text-accent uppercase mb-4">
                About Me
              </h2>

              <h3
                className="heading text-3xl md:text-5xl font-bold mb-6 text-foreground leading-tight"
                dangerouslySetInnerHTML={{ __html: headline }}
              />

              <div
                className="narrative text-lg md:text-xl text-muted-foreground leading-relaxed space-y-4 mb-8"
                dangerouslySetInnerHTML={{ __html: narrative }}
              />

              <div className="flex flex-wrap gap-4">
                <Button
                  variant="default"
                  className="rounded-full pl-6 pr-6"
                  asChild
                >
                  <Link href="/exp">
                    See My Experiments <ArrowUpRight className="ml-2 w-4 h-4" />
                  </Link>
                </Button>
              </div>
            </motion.div>
          </div>

          {/* Image Content */}
          <div className="order-1 md:order-2 flex justify-center md:justify-end">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, rotate: 3 }}
              whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="relative w-full max-w-md aspect-square"
            >
              {/* Decorative Borders */}
              <div className="absolute inset-0 border-2 border-secondary/30 rounded-3xl translate-x-4 translate-y-4" />
              <div className="absolute inset-0 border-2 border-accent/30 rounded-3xl -translate-x-4 -translate-y-4" />

              {/* Main Image Container */}
              <div className="relative h-full w-full rounded-2xl overflow-hidden shadow-2xl shadow-black/50 border border-border/50 bg-card">
                <Image
                  src={imageUrl}
                  alt="Riziyan Profile"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover transition-transform duration-700 hover:scale-105"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/40 to-transparent" />
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};
