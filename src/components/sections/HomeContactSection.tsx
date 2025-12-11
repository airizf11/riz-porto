/* eslint-disable react/no-unescaped-entities */
// src/components/sections/HomeContactSection.tsx
import Link from "next/link";
import {
  Mail,
  MessageSquare,
  ArrowRight, // Copy
} from "lucide-react";
import * as motion from "framer-motion/client";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
// import { cn } from "@/lib/utils";

export const HomeContactSection = () => {
  return (
    <section
      id="contact"
      className="relative w-full py-24 md:py-32 bg-background overflow-hidden"
    >
      <div className="container mx-auto max-w-5xl px-4 md:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="relative overflow-hidden rounded-3xl border border-border bg-card/50 shadow-2xl"
        >
          {/* Background Gradient Effect inside Card */}
          <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-primary/10 rounded-full blur-[100px] pointer-events-none -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-secondary/10 rounded-full blur-[80px] pointer-events-none translate-y-1/2 -translate-x-1/2" />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
            {/* Left Column: The Hook */}
            <div className="p-8 md:p-12 lg:p-16 flex flex-col justify-center">
              <h2 className="heading text-3xl md:text-4xl font-bold text-foreground mb-4">
                Ready to start a <span className="text-primary">project?</span>
              </h2>
              <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
                Whether you have a specific idea or just want to explore
                possibilities, I'm here to help you build digital experiences
                that matter.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  asChild
                  size="lg"
                  className="rounded-full font-bold shadow-lg shadow-primary/20"
                >
                  <Link href="/contact">
                    Send a Message <MessageSquare className="ml-2 w-4 h-4" />
                  </Link>
                </Button>

                {/* Secondary action if needed */}
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="rounded-full"
                >
                  <Link href="/projects">
                    Explore Portfolio <ArrowRight className="ml-2 w-4 h-4" />
                  </Link>
                </Button>
              </div>
            </div>

            {/* Right Column: Direct Info */}
            <div className="relative p-8 md:p-12 lg:p-16 bg-muted/30 flex flex-col justify-center border-t md:border-t-0 md:border-l border-border/50">
              <div className="space-y-8">
                {/* Email Block */}
                <div>
                  <h3 className="text-sm font-bold tracking-widest text-secondary uppercase mb-2">
                    Drop an Email
                  </h3>
                  <div className="flex items-center gap-3 text-foreground group">
                    <div className="bg-background p-2 rounded-lg border border-border">
                      <Mail className="w-5 h-5 text-primary" />
                    </div>
                    <a
                      href="mailto:rizian.business99@gmail.com"
                      className="text-lg md:text-xl font-medium hover:text-primary transition-colors"
                    >
                      rizian.business99@gmail.com
                    </a>
                  </div>
                </div>

                <Separator className="bg-border/60" />

                {/* Availability Status */}
                <div>
                  <h3 className="text-sm font-bold tracking-widest text-muted-foreground uppercase mb-3">
                    Current Status
                  </h3>
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-500/10 border border-green-500/20 text-green-500 text-sm font-medium">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                    </span>
                    Available for freelance
                  </div>
                  <p className="text-sm text-muted-foreground mt-2">
                    Typically replies within 24 hours.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
