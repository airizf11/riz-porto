// src/app/(public)/blog/page.tsx
import Link from "next/link";
import { ArrowLeft, Sparkles } from "lucide-react";
import { Metadata } from "next";

// Services & Components
import { getUnifiedStream } from "@/services/content"; // Import fungsi baru
import { ContentItemCard } from "@/components/ContentItemCard";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "The Stream ",
  description:
    "A unified timeline of my latest projects, articles, experiments, and thoughts.",
};

export default async function BlogHubPage() {
  // 1. Fetch SEMUA tipe konten sekaligus
  const allContent = await getUnifiedStream();

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
            The <span className="text-primary">Stream</span>
          </h1>
          <p className="narrative text-xl text-muted-foreground max-w-2xl mx-auto">
            Everything I create, collected in one place. Projects, articles,
            experiments, and random thoughts.
          </p>
        </div>

        {/* Unified Content Grid */}
        {allContent.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {allContent.map((item) => (
              <div key={item.id} className="h-full">
                {/* 
                  ContentItemCard sudah kita upgrade sebelumnya untuk handle:
                  - Project (Folder Icon, Blue)
                  - Article (File Icon, Green)
                  - Experiment (Flask Icon, Amber)
                  - Quote (Quote Icon, Pink)
                */}
                <ContentItemCard item={item} />
              </div>
            ))}
          </div>
        ) : (
          /* Empty State */
          <div className="flex flex-col items-center justify-center py-24 text-center border border-dashed border-border rounded-2xl bg-muted/20">
            <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mb-4">
              <Sparkles className="w-8 h-8 text-muted-foreground" />
            </div>
            <h3 className="text-xl font-bold text-foreground">
              Stream is Empty
            </h3>
            <p className="text-muted-foreground mt-2 max-w-md">
              The universe is quiet right now.
            </p>
          </div>
        )}
      </div>
    </main>
  );
}
