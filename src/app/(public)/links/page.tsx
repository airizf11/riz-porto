// src/app/(public)/links/page.tsx
import Link from "next/link";
import { Metadata } from "next";
import { ArrowLeft, Share2 } from "lucide-react";

// Services & Components
import { createClient } from "@/lib/supabase/server";
import { getSiteSettings } from "@/services/content";
import { LinkCard } from "@/components/ui/link-card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";

export const metadata: Metadata = {
  title: "Quick Links ",
  description:
    "A curated collection of my latest projects, social media, and other resources.",
};

// Fetcher Data (Simple Query)
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
  // Fetch Data Parallel
  const [links, settings] = await Promise.all([
    getQuickLinks(),
    getSiteSettings(),
  ]);

  // Data Preparation
  const profileImage = settings.about_image_url || "/avatar-placeholder.jpg";
  const rawHeadline = settings.hero_headline || "Riziyan";
  // Membersihkan tag HTML dari headline (misal <b>Riziyan</b> jadi Riziyan)
  const cleanHeadline = rawHeadline.replace(/<[^>]*>?/gm, "");

  return (
    <main className="min-h-screen bg-background text-foreground flex flex-col items-center py-12 md:py-16 px-4 relative overflow-hidden">
      {/* --- BACKGROUND DECOR --- */}
      {/* Dot Pattern (Technical Vibe) */}
      <div className="absolute inset-0 bg-[radial-gradient(var(--border)_1px,transparent_1px)] [background-size:20px_20px] opacity-20 pointer-events-none" />
      {/* Top Glow (Soft Vibe) */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />

      {/* --- CONTENT CONTAINER --- */}
      <div className="w-full max-w-md relative z-10 space-y-8">
        {/* 1. PROFILE HEADER */}
        <header className="flex flex-col items-center text-center space-y-4 animate-in fade-in slide-in-from-top-4 duration-700">
          <div className="relative group">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-primary to-secondary rounded-full opacity-30 group-hover:opacity-70 blur transition duration-500" />
            <Avatar className="w-28 h-28 border-4 border-background shadow-2xl relative">
              <AvatarImage
                src={profileImage}
                alt="Profile"
                className="object-cover"
              />
              <AvatarFallback className="text-2xl font-bold bg-muted">
                RZ
              </AvatarFallback>
            </Avatar>
          </div>

          <div className="space-y-2">
            <h1 className="text-2xl font-bold tracking-tight text-foreground flex items-center justify-center gap-2">
              {cleanHeadline}{" "}
              <Share2 className="w-4 h-4 text-muted-foreground/50" />
            </h1>
            <p className="text-muted-foreground text-sm max-w-xs mx-auto leading-relaxed">
              Digital Explorer & Developer. Collecting dots and connecting them.
            </p>
          </div>
        </header>

        <Separator className="bg-border/50 w-1/2 mx-auto" />

        {/* 2. LINKS GRID */}
        <div className="space-y-4">
          {links.length > 0 ? (
            links.map((link, index) => (
              // Staggered Animation Effect using 'style' delay
              <div
                key={link.id}
                className="animate-in fade-in slide-in-from-bottom-4 duration-700 fill-mode-backwards"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {/* Komponen Smart Card yang otomatis cari gambar preview */}
                <LinkCard link={link} />
              </div>
            ))
          ) : (
            <p className="text-center text-muted-foreground text-sm py-8">
              No links active at the moment.
            </p>
          )}
        </div>

        {/* 3. FOOTER */}
        <footer className="pt-8 text-center animate-in fade-in duration-1000 delay-500">
          <Button
            variant="ghost"
            className="text-muted-foreground hover:text-foreground group"
            asChild
          >
            <Link href="/">
              <ArrowLeft className="w-4 h-4 mr-2 transition-transform group-hover:-translate-x-1" />
              Back to Website
            </Link>
          </Button>
          <div className="mt-6">
            <p className="text-[10px] text-muted-foreground/40 uppercase tracking-widest">
              © {new Date().getFullYear()} Riziyan
            </p>
          </div>
        </footer>
      </div>
    </main>
  );
}
