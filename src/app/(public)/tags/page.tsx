// src/app/(public)/tags/page.tsx
import { createClient } from "@/lib/supabase/server";
import { Metadata } from "next";
import Link from "next/link";
import {
  ArrowLeft,
  // Tag,
  Cpu,
  MessageSquare,
} from "lucide-react";

export const metadata: Metadata = {
  title: "All Tags ",
  description:
    "Explore all topics, concepts, and technologies discussed on my personal site.",
};

async function getAllTagsWithCount() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("tags")
    .select("*, content_tags(count)");

  if (error) {
    console.error("Error fetching tags with count:", error);
    return [];
  }
  return data;
}

export default async function TagsPage() {
  const tags = await getAllTagsWithCount();

  const techTags = tags
    .filter((tag) => tag.tag_type === "tech")
    .sort(
      (a, b) =>
        (b.content_tags[0]?.count || 0) - (a.content_tags[0]?.count || 0)
    );
  const topicTags = tags
    .filter((tag) => tag.tag_type === "topic")
    .sort(
      (a, b) =>
        (b.content_tags[0]?.count || 0) - (a.content_tags[0]?.count || 0)
    );

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
        <div className="text-center mb-16">
          <h1 className="heading text-4xl md:text-6xl text-primary mb-8">
            Explore by Tag
          </h1>
          <p className="narrative text-xl text-light/80">
            Find content based on specific topics and technologies.
          </p>
        </div>

        <section className="mb-16">
          <h2 className="heading text-3xl mb-8 border-l-4 border-secondary pl-4 flex items-center gap-3">
            <Cpu className="w-8 h-8 text-secondary" />
            Technologies
          </h2>
          <div className="flex flex-wrap gap-4">
            {techTags.map((tag) => (
              <Link
                href={`/tags/${tag.slug}`}
                key={tag.id}
                className="block bg-dark/50 border border-light/10 rounded-lg px-4 py-2 text-light hover:bg-secondary/20 hover:border-secondary/50 transition-all transform hover:scale-105"
              >
                <span className="font-semibold">{tag.name}</span>
                <span className="ml-2 text-xs bg-secondary text-dark rounded-full px-2 py-0.5">
                  {tag.content_tags[0]?.count || 0}
                </span>
              </Link>
            ))}
          </div>
        </section>

        <section>
          <h2 className="heading text-3xl mb-8 border-l-4 border-accent pl-4 flex items-center gap-3">
            <MessageSquare className="w-8 h-8 text-accent" />
            Topics & Concepts
          </h2>
          <div className="flex flex-wrap gap-4">
            {topicTags.map((tag) => (
              <Link
                href={`/tags/${tag.slug}`}
                key={tag.id}
                className="block bg-dark/50 border border-light/10 rounded-lg px-4 py-2 text-light hover:bg-accent/20 hover:border-accent/50 transition-all transform hover:scale-105"
              >
                <span className="font-semibold">{tag.name}</span>
                <span className="ml-2 text-xs bg-accent text-dark rounded-full px-2 py-0.5">
                  {tag.content_tags[0]?.count || 0}
                </span>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
