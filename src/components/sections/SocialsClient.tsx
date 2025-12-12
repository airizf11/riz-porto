// src/components/sections/SocialsClient.tsx
"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { SmartIcon } from "@/components/ui/smart-icon";

interface SocialLink {
  name: string;
  url: string;
  desc: string;
  imageUrl?: string;
}

interface SocialGroup {
  category: string;
  color: string;
  links: SocialLink[];
}

export const SocialsClient = ({
  socialGroups,
}: {
  socialGroups: SocialGroup[];
}) => {
  return (
    <section className="relative w-full py-24 md:py-32 bg-background border-b border-border/40 overflow-hidden">
      {/* Background Decor: Subtle gradient spot */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-secondary/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="container mx-auto max-w-6xl px-4 md:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16 md:mb-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-sm font-bold tracking-widest text-secondary uppercase mb-3">
              Network
            </h2>
            <h3 className="heading text-3xl md:text-5xl font-bold text-foreground">
              Find Me <span className="text-secondary">Online</span>
            </h3>
            <p className="mt-4 text-muted-foreground max-w-lg mx-auto text-lg">
              Connect with me across different platforms. From code repositories
              to content creation.
            </p>
          </motion.div>
        </div>

        {/* Groups Loop */}
        <div className="flex flex-col gap-16">
          {socialGroups.map((group, groupIndex) => (
            <motion.div
              key={group.category}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: groupIndex * 0.1 }}
            >
              {/* Category Header */}
              <div className="flex items-center gap-4 mb-8">
                {/* 
                   NOTE: Pastikan class utility (bg-primary, bg-secondary, text-pink-500, dll)
                   ter-safelist jika menggunakan dynamic class seperti di bawah ini.
                */}
                <div
                  className={cn(
                    "h-8 w-1 rounded-full",
                    group.color.replace("text-", "bg-")
                  )}
                />
                <h3 className="text-2xl font-bold text-foreground">
                  {group.category}
                </h3>
                <div className="h-[1px] flex-1 bg-border/60" />
              </div>

              {/* Grid Links */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {group.links.map((link) => {
                  return (
                    <a
                      href={link.url}
                      key={link.name}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group block h-full"
                    >
                      <Card className="relative h-full overflow-hidden border-border/50 bg-muted/20 transition-all duration-500 hover:border-primary/50 hover:shadow-xl hover:shadow-primary/5">
                        <div className="relative aspect-[16/9] w-full overflow-hidden">
                          {link.imageUrl ? (
                            <Image
                              src={link.imageUrl}
                              alt={`Cover for ${link.name}`}
                              fill
                              sizes="(max-width: 768px) 100vw, 33vw"
                              className="object-cover transition-transform duration-700 group-hover:scale-110"
                            />
                          ) : (
                            <div className="w-full h-full bg-secondary/5 flex items-center justify-center">
                              {/* UPDATE: Menggunakan SmartIcon (Ukuran Besar) */}
                              <SmartIcon
                                url={link.url}
                                className="w-12 h-12 text-muted-foreground/20"
                              />
                            </div>
                          )}

                          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent opacity-90 transition-opacity duration-300 group-hover:opacity-80" />

                          <div className="absolute top-4 right-4 translate-x-4 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100">
                            <Badge
                              variant="secondary"
                              className="rounded-full p-2"
                            >
                              <ExternalLink className="w-4 h-4" />
                            </Badge>
                          </div>
                        </div>

                        <CardContent className="relative -mt-12 p-6 pt-0">
                          <div className="flex items-center gap-3 mb-2">
                            <div
                              className={cn(
                                "flex items-center justify-center w-10 h-10 rounded-full bg-background/80 backdrop-blur-sm border border-border shadow-sm",
                                group.color
                              )}
                            >
                              {/* UPDATE: Menggunakan SmartIcon (Ukuran Kecil) */}
                              <SmartIcon url={link.url} className="w-5 h-5" />
                            </div>
                            <h4 className="font-bold text-xl text-foreground group-hover:text-primary transition-colors">
                              {link.name}
                            </h4>
                          </div>
                          <p className="text-sm text-muted-foreground line-clamp-2 pl-[3.25rem]">
                            {link.desc}
                          </p>
                        </CardContent>
                      </Card>
                    </a>
                  );
                })}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
