// src/components/ui/link-card.tsx
"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, Loader2 } from "lucide-react";

import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { SmartIcon } from "@/components/ui/smart-icon";
// import { cn } from "@/lib/utils";

interface LinkCardProps {
  link: {
    id: string;
    title: string;
    url: string;
    description: string | null;
    image_url: string | null;
  };
}

export function LinkCard({ link }: LinkCardProps) {
  const [previewData, setPreviewData] = useState<{
    image: string | null;
    title: string | null;
  } | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // 1. Jika sudah ada image_url di DB, gak perlu cari lagi
    if (link.image_url) return;

    // 2. Jika tidak ada, panggil API Autopreview kita
    async function fetchMetadata() {
      setLoading(true);
      try {
        const res = await fetch(
          `/api/metadata?url=${encodeURIComponent(link.url)}`
        );
        const data = await res.json();
        if (data.image) {
          setPreviewData({ image: data.image, title: data.title });
        }
      } catch (error) {
        console.error("LinkCard Preview Error:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchMetadata();
  }, [link.url, link.image_url]);

  const displayImage = link.image_url || previewData?.image;

  return (
    <motion.a
      href={link.url}
      target="_blank"
      rel="noopener noreferrer"
      className="block group outline-none"
      whileHover={{ y: -4 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      <Card className="overflow-hidden bg-card/40 backdrop-blur-sm border-border/50 group-hover:border-primary/50 group-hover:shadow-xl group-hover:shadow-primary/5 transition-all duration-300">
        <div className="flex items-stretch h-24 md:h-28">
          {/* --- PREVIEW IMAGE / ICON SECTION --- */}
          <div className="relative w-24 md:w-28 flex-shrink-0 bg-muted/30 border-r border-border/50">
            <AnimatePresence mode="wait">
              {loading ? (
                /* 1. Loading State */
                <motion.div
                  key="loading"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="w-full h-full flex items-center justify-center"
                >
                  <Skeleton className="w-full h-full rounded-none" />
                  <Loader2 className="absolute w-5 h-5 animate-spin text-muted-foreground/40" />
                </motion.div>
              ) : displayImage ? (
                /* 2. Success State: Image Found */
                <motion.div
                  key="image"
                  initial={{ opacity: 0, scale: 1.1 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="w-full h-full"
                >
                  <Image
                    src={displayImage}
                    alt={link.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                    sizes="120px"
                  />
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors" />
                </motion.div>
              ) : (
                /* 3. Fallback State: No Image Found */
                <motion.div
                  key="fallback"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="w-full h-full flex items-center justify-center bg-secondary/5"
                >
                  <SmartIcon
                    url={link.url}
                    className="w-8 h-8 text-secondary group-hover:text-primary transition-colors"
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* --- TEXT CONTENT SECTION --- */}
          <div className="flex flex-col justify-center flex-grow px-4 md:px-6 py-2 min-w-0">
            <div className="flex items-center justify-between gap-2 mb-1">
              <h3 className="font-bold text-foreground group-hover:text-primary transition-colors truncate text-base md:text-lg">
                {link.title}
              </h3>
              <ExternalLink className="w-3.5 h-3.5 text-muted-foreground/40 group-hover:text-primary transition-all opacity-0 group-hover:opacity-100" />
            </div>

            <p className="text-xs md:text-sm text-muted-foreground line-clamp-2 leading-relaxed">
              {link.description || "Visit link to learn more."}
            </p>

            <div className="mt-2 flex items-center gap-1.5">
              <div className="w-1.5 h-1.5 rounded-full bg-secondary/40" />
              <span className="text-[10px] uppercase tracking-widest font-mono text-muted-foreground/60 truncate">
                {new URL(link.url).hostname}
              </span>
            </div>
          </div>
        </div>
      </Card>
    </motion.a>
  );
}
