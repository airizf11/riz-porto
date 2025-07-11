// src/app/(public)/blog/page.tsx
import { createClient } from "@/lib/supabase/server";
import { Metadata } from "next";
import { ContentItemCard } from "@/components/ContentItemCard";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const metadata: Metadata = {
  title: "Blog & Updates | Riziyan's Digital Garden",
  description:
    "A unified stream of all my latest projects, articles, reviews, and thoughts.",
};

async function getAllPublishedContent() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("content_items")
    .select(
      `
            id,
            title,
            slug,
            excerpt,
            content_type
        `
    )
    .eq("status", "published")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching published content:", error);
    return [];
  }
  return data;
}

export default async function BlogHubPage() {
  const allContent = await getAllPublishedContent();

  return (
    <main className="min-h-screen bg-dark text-light">
      <div className="container mx-auto max-w-4xl px-4 py-12 md:py-20">
        <Link
          href="/"
          className="group inline-flex items-center gap-2 text-light/70 hover:text-light mb-12 transition-colors"
        >
          <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
          Back to Home
        </Link>
        <div className="text-center mb-16">
          <h1 className="heading text-4xl md:text-6xl text-primary mb-4">
            Digital Garden
          </h1>
          <p className="narrative text-xl text-light/80">
            An ever-growing collection of my projects, articles, and ideas.
          </p>
          {/* TODO Filter */}
        </div>

        <div className="space-y-8">
          {allContent.length > 0 ? (
            allContent.map((item) => (
              <ContentItemCard key={item.id} item={item} />
            ))
          ) : (
            <p className="text-center text-light/70">
              No content published yet. Check back soon!
            </p>
          )}
        </div>
      </div>
    </main>
  );
}
