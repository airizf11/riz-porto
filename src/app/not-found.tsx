// src/app/not-found.tsx
/* eslint-disable react/no-unescaped-entities */
"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, Home, FileQuestion, Search } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

export default function NotFound() {
  return (
    <main className="min-h-screen bg-background text-foreground flex items-center justify-center relative overflow-hidden">
      {/* --- BACKGROUND DECOR --- */}
      {/* Grid Pattern (Technical Vibe) */}
      <div className="absolute inset-0 bg-[radial-gradient(var(--border)_1px,transparent_1px)] [background-size:20px_20px] opacity-20 pointer-events-none" />

      {/* Ambient Glows (Dreamy Vibe) */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-secondary/5 rounded-full blur-[100px] pointer-events-none" />

      {/* --- CONTENT --- */}
      <div className="container px-4 relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="max-w-2xl mx-auto"
        >
          {/* 404 Visual */}
          <div className="relative mb-8 inline-block">
            <h1 className="text-[10rem] md:text-[12rem] font-bold leading-none text-muted-foreground/10 select-none">
              404
            </h1>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-background/50 backdrop-blur-sm p-4 rounded-3xl border border-border shadow-2xl">
              <FileQuestion className="w-16 h-16 text-primary animate-pulse" />
            </div>
          </div>

          {/* Narrative */}
          <h2 className="heading text-3xl md:text-5xl font-bold text-foreground mb-4">
            Lost in the <span className="text-secondary">Void?</span>
          </h2>
          <p className="narrative text-lg md:text-xl text-muted-foreground mb-10 leading-relaxed max-w-lg mx-auto">
            The page you are looking for doesn't exist, has been moved, or
            perhaps... it was just a figment of our imagination.
          </p>

          <Separator className="bg-border/60 mb-10 max-w-xs mx-auto" />

          {/* Actions */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              asChild
              size="lg"
              className="rounded-full font-bold shadow-lg shadow-primary/10 w-full sm:w-auto"
            >
              <Link href="/">
                <Home className="w-4 h-4 mr-2" /> Return Home
              </Link>
            </Button>

            <Button
              asChild
              variant="outline"
              size="lg"
              className="rounded-full w-full sm:w-auto"
            >
              <Link href="/blog">
                <Search className="w-4 h-4 mr-2" /> Browse Content
              </Link>
            </Button>

            <Button
              asChild
              variant="ghost"
              size="lg"
              className="rounded-full w-full sm:w-auto text-muted-foreground hover:text-foreground"
            >
              <Link href="/contact">
                Report Issue <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
              </Link>
            </Button>
          </div>
        </motion.div>
      </div>
    </main>
  );
}
