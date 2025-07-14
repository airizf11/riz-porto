// src/app/(public)/links/page.tsx
/* eslint-disable @typescript-eslint/no-explicit-any */
import { createClient } from "@/lib/supabase/server";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { iconMap } from "@/lib/data";
import { ArrowLeft, Link2 } from "lucide-react";

export const metadata: Metadata = {
  title: "My Quick Links ",
  description: "A curated list of my important and featured links.",
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

function QuickLinkCard({ link }: { link: any }) {
  const Icon =
    link.icon_id && iconMap[link.icon_id] ? iconMap[link.icon_id] : Link2;

  const highlightClasses =
    "border-accent/80 bg-accent/10 shadow-lg shadow-accent/10";
  const standardClasses = "border-light/10 hover:border-secondary/50";

  return (
    <Link
      href={link.url}
      target="_blank"
      rel="noopener noreferrer"
      className={`group block overflow-hidden rounded-2xl border ${
        link.is_highlighted ? highlightClasses : standardClasses
      } transition-all duration-300 hover:scale-[1.02]`}
    >
      <div className="flex items-center">
        <div className="flex-shrink-0 w-30 h-30 flex items-center justify-center bg-dark/50">
          <Icon className="w-10 h-10 text-light/80 group-hover:text-accent transition-colors" />
        </div>

        <div className="flex-grow p-4">
          <h3 className="text-xl font-bold text-light group-hover:text-accent transition-colors">
            {link.title}
          </h3>
          {link.description && (
            <p className="text-sm text-light/70 mt-1">{link.description}</p>
          )}
        </div>

        {link.image_url && (
          <div className="flex-shrink-0  w-30 h-20 relative sm:block">
            <Image
              src={link.image_url}
              alt={`Preview for ${link.title}`}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-110"
            />
          </div>
        )}
      </div>
    </Link>
  );
}

export default async function LinksPage() {
  const links = await getActiveLinks();

  return (
    <main className="min-h-screen bg-dark text-light">
      <div className="container mx-auto max-w-6xl px-4 py-12 md:py-20">
        <Link
          href="/"
          className="group inline-flex items-center gap-2 text-light/70 hover:text-light mb-12 transition-colors"
        >
          <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
          Back to Home
        </Link>
        <header className="text-center mb-16">
          <div className="relative w-28 h-28 mx-auto mb-4 rounded-full overflow-hidden border-2 border-secondary">
            <Image
              src="https://eweydsgczhxcnmnmstsg.supabase.co/storage/v1/object/public/assets/public/profile-picture.jpg"
              alt="Riziyan"
              fill
              className="object-cover"
            />
          </div>
          <h1 className="heading text-4xl md:text-6xl text-primary">
            Quick Links
          </h1>
          <p className="narrative text-xl text-light/80 mt-2">
            A curated list of my important Links, products and more.
          </p>
        </header>

        <div className="space-y-6">
          {links.map((link) => (
            <QuickLinkCard key={link.id} link={link} />
          ))}
        </div>
      </div>
    </main>
  );
}
