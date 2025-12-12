// src/app/(public)/articles/page.tsx
import Link from "next/link";
import { ArrowLeft, PenTool } from "lucide-react";
import { Metadata } from "next";

// Services & Components
import { getAllArticles } from "@/services/content";
import { ContentItemCard } from "@/components/ContentItemCard";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "All Articles",
  description:
    "A collection of articles on technology, development, and personal insights.",
};

export default async function ArticlesPage() {
  const allArticles = await getAllArticles();

  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="container mx-auto max-w-6xl px-4 py-12 md:py-20">
        {/* Navigation Header */}
        <div className="mb-12">
          <Button
            variant="ghost"
            className="pl-0 hover:pl-2 transition-all"
            asChild
          >
            <Link
              href="/"
              className="gap-2 text-muted-foreground hover:text-foreground"
            >
              <ArrowLeft className="w-4 h-4" /> Back to Home
            </Link>
          </Button>
        </div>

        {/* Page Title */}
        <div className="text-center mb-16">
          <h1 className="heading text-4xl md:text-6xl font-bold text-foreground mb-6">
            Writing & <span className="text-primary">Thoughts</span>
          </h1>
          <p className="narrative text-xl text-muted-foreground max-w-2xl mx-auto">
            Insights, tutorials, and stories from my journey in tech and beyond.
          </p>
        </div>

        {/* Articles Grid */}
        {allArticles.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {allArticles.map((article) => (
              <div key={article.id} className="h-full">
                {/* Card otomatis handle styling & link */}
                <ContentItemCard item={article} />
              </div>
            ))}
          </div>
        ) : (
          /* Empty State */
          <div className="flex flex-col items-center justify-center py-24 text-center border border-dashed border-border rounded-2xl bg-muted/20">
            <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mb-4">
              <PenTool className="w-8 h-8 text-muted-foreground" />
            </div>
            <h3 className="text-xl font-bold text-foreground">
              No Articles Yet
            </h3>
            <p className="text-muted-foreground mt-2 max-w-md">
              The ink is still drying. Check back soon for new content!
            </p>
          </div>
        )}
      </div>
    </main>
  );
}
