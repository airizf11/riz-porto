// src/app/(public)/links/page.tsx
import { createClient } from "@/lib/supabase/server";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
// import { iconMap } from '@/lib/data';

export const metadata: Metadata = {
  title: "Quick Links ",
  description:
    "A curated list of my important links, projects, and social media.",
};

async function getActiveLinks() {
  const supabase = await createClient();
  const { data } = await supabase
    .from("quick_links")
    .select("*")
    .eq("is_active", true)
    .order("order_index", { ascending: true });
  return data ?? [];
}

export default async function LinksPage() {
  const links = await getActiveLinks();
  const profileImageUrl =
    "https://eweydsgczhxcnmnmstsg.supabase.co/storage/v1/object/public/assets/public/profile-picture.jpg";

  return (
    <div className="min-h-screen bg-dark text-light flex items-center justify-center p-4">
      <main className="w-full max-w-lg mx-auto">
        <header className="text-center mb-8">
          <div className="relative w-28 h-28 mx-auto mb-4 rounded-full overflow-hidden border-2 border-secondary">
            <Image
              src={profileImageUrl}
              alt="Riziyan"
              fill
              className="object-cover"
            />
          </div>
          <h1 className="text-2xl font-bold text-light">Riziyan</h1>
          <p className="text-light/70 mt-1">Digital Explorer & Creator</p>
        </header>

        <div className="space-y-4">
          {links.map((link) => {
            // const Icon = link.icon_id ? iconMap[link.icon_id] : null;

            // Tentukan kelas CSS berdasarkan is_highlighted
            const baseClasses =
              "block w-full p-4 rounded-lg text-center font-semibold transition-all duration-300 transform";
            const standardClasses =
              "bg-dark/50 border border-light/20 hover:bg-secondary/20 hover:border-secondary hover:scale-105";
            const highlightedClasses =
              "bg-accent/90 border border-accent text-dark shadow-lg shadow-accent/20 animate-pulse-slow hover:bg-accent hover:scale-105";

            return (
              <Link
                key={link.id}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`${baseClasses} ${
                  link.is_highlighted ? highlightedClasses : standardClasses
                }`}
              >
                {/* Nanti bisa tambahkan ikon di sini */}
                {link.title}
              </Link>
            );
          })}
        </div>

        <footer className="text-center mt-12">
          <Link
            href="/"
            className="text-sm text-light/50 hover:text-light transition-colors"
          >
            Back to Main Site
          </Link>
        </footer>
      </main>
    </div>
  );
}
