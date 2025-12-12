// src/app/(public)/links/page.tsx
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft } from "lucide-react";
import { Metadata } from "next";

// Services & Components
import { createClient } from "@/lib/supabase/server";
import { getSiteSettings } from "@/services/content";
import { SmartIcon } from "@/components/ui/smart-icon";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export const metadata: Metadata = {
  title: "Quick Links ",
  description:
    "A curated list of my important links, products, social media, and other.",
};

// Fetcher khusus halaman ini (Simple enough to keep here)
async function getQuickLinks() {
  const supabase = await createClient();
  const { data } = await supabase
    .from("quick_links")
    .select("*")
    .eq("is_active", true)
    .order("order_index", { ascending: true });
  return data || [];
}

export default async function LinksPage() {
  const [links, settings] = await Promise.all([
    getQuickLinks(),
    getSiteSettings(),
  ]);

  // Fallback data kalau settings kosong
  const profileImage = settings.about_image_url || "/avatar-placeholder.jpg";
  const headline = settings.hero_headline
    ? settings.hero_headline.replace(/<[^>]*>?/gm, "") // Strip HTML tags
    : "Riziyan";

  return (
    <main className="min-h-screen bg-background text-foreground flex flex-col items-center py-12 md:py-20 px-4">
      {/* Container "Linktree" Style (Sempit di tengah) */}
      <div className="w-full max-w-md space-y-8">
        {/* 1. Header Profile */}
        <div className="flex flex-col items-center text-center space-y-4">
          <Avatar className="w-28 h-28 border-4 border-background shadow-xl ring-2 ring-border">
            <AvatarImage
              src={profileImage}
              alt="Riziyan"
              className="object-cover"
            />
            <AvatarFallback>RZ</AvatarFallback>
          </Avatar>

          <div className="space-y-2">
            <h1 className="text-2xl font-bold tracking-tight text-foreground">
              {headline}
            </h1>
            <p className="text-muted-foreground text-sm max-w-xs mx-auto">
              Digital Explorer & Creator. Sharing code, stories, and
              experiments.
            </p>
          </div>
        </div>

        {/* 2. Links List */}
        <div className="flex flex-col gap-4 w-full">
          {links.map((link) => (
            <a
              key={link.id}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group block w-full"
            >
              <Card className="flex items-center p-2 pl-3 bg-card/50 hover:bg-card border-border/50 hover:border-primary/50 transition-all duration-300 hover:scale-[1.02] hover:shadow-lg shadow-sm">
                {/* Icon Container */}
                <div className="flex-shrink-0 w-10 h-10 flex items-center justify-center rounded-lg bg-background/80 text-secondary group-hover:text-primary transition-colors border border-border/50">
                  {/* SmartIcon otomatis deteksi tipe link */}
                  <SmartIcon url={link.url} className="w-5 h-5" />
                </div>

                {/* Text Content */}
                <div className="flex-grow px-4">
                  <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors text-sm md:text-base">
                    {link.title}
                  </h3>
                  {link.description && (
                    <p className="text-xs text-muted-foreground line-clamp-1">
                      {link.description}
                    </p>
                  )}
                </div>

                {/* Optional Image Thumbnail (Kalau ada di DB) */}
                {link.image_url && (
                  <div className="flex-shrink-0 w-12 h-12 relative rounded-md overflow-hidden mr-1">
                    <Image
                      src={link.image_url}
                      alt=""
                      fill
                      className="object-cover"
                    />
                  </div>
                )}
              </Card>
            </a>
          ))}
        </div>

        {/* 3. Footer Action */}
        <div className="pt-8 text-center">
          <Button
            variant="ghost"
            className="text-muted-foreground hover:text-foreground"
            asChild
          >
            <Link href="/">
              <ArrowLeft className="w-4 h-4 mr-2" /> Back to Website
            </Link>
          </Button>
        </div>
      </div>
    </main>
  );
}
