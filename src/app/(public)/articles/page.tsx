// src/app/(public)/articles/page.tsx
import { createClient } from "@/lib/supabase/server";
import { Metadata } from "next";
import Link from "next/link";
import { Calendar, ArrowRight, ArrowLeft } from "lucide-react";

export const metadata: Metadata = {
  title: "All Articles | Riziyan's Blog",
  description:
    "A collection of articles on technology, development, and personal insights.",
};

async function getAllArticles() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("content_items")
    .select("id, title, slug, excerpt, created_at")
    .eq("status", "published")
    .eq("content_type", "article")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching articles:", error);
    return [];
  }
  return data;
}

export default async function ArticlesPage() {
  const allArticles = await getAllArticles();

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
          <h1 className="heading text-4xl md:text-6xl text-secondary mb-4">
            Library of Thoughts
          </h1>
          <p className="narrative text-xl text-light/80">
            Insights and tutorials from my journey in tech and beyond.
          </p>
        </div>

        <div className="space-y-10">
          {allArticles.length > 0 ? (
            allArticles.map((article) => (
              <Link
                href={`/articles/${article.slug}`}
                key={article.id}
                className="block group"
              >
                <article className="p-6 rounded-xl transition-all border-2 border-transparent group-hover:border-secondary/30 group-hover:bg-dark/50">
                  <header>
                    <h2 className="heading text-3xl text-light group-hover:text-secondary transition-colors">
                      {article.title}
                    </h2>
                    <div className="flex items-center gap-2 text-sm text-light/50 mt-2">
                      <Calendar className="w-4 h-4" />
                      <time dateTime={article.created_at}>
                        {new Date(article.created_at).toLocaleDateString(
                          "en-US",
                          { year: "numeric", month: "long", day: "numeric" }
                        )}
                      </time>
                    </div>
                  </header>
                  <p className="narrative text-light/80 mt-4">
                    {article.excerpt}
                  </p>
                  <div className="inline-flex items-center gap-2 mt-4 font-semibold text-secondary">
                    Read more
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </div>
                </article>
              </Link>
            ))
          ) : (
            <p className="text-center text-light/70">
              No articles published yet. The ink is still drying!
            </p>
          )}
        </div>
      </div>
    </main>
  );
}
