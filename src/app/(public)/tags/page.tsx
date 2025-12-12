// src/app/(public)/tags/page.tsx
import Link from "next/link";
import { ArrowLeft, Cpu, Hash, Tag as TagIcon } from "lucide-react";
import { Metadata } from "next";

// Services & Components
import { getAllTags } from "@/services/content";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

export const metadata: Metadata = {
  title: "Explore Tags",
  description: "Browse content by specific technologies, topics, and concepts.",
};

export default async function TagsPage() {
  const tags = await getAllTags();

  // Pisahkan Tech vs Topic
  const techTags = tags
    .filter((tag) => tag.tag_type === "tech")
    .sort((a, b) => b.count - a.count); // Urutkan yang paling banyak kontennya

  const topicTags = tags
    .filter((tag) => tag.tag_type === "topic")
    .sort((a, b) => b.count - a.count);

  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="container mx-auto max-w-5xl px-4 py-12 md:py-20">
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
          <div className="inline-flex items-center justify-center p-3 mb-6 bg-primary/10 rounded-full border border-primary/20">
            <TagIcon className="w-8 h-8 text-primary" />
          </div>
          <h1 className="heading text-4xl md:text-6xl font-bold text-foreground mb-6">
            Explore by <span className="text-primary">Tag</span>
          </h1>
          <p className="narrative text-xl text-muted-foreground max-w-2xl mx-auto">
            Dive into specific topics. From coding languages to abstract ideas.
          </p>
        </div>

        <div className="space-y-16">
          {/* SECTION 1: Technologies */}
          <section>
            <div className="flex items-center gap-3 mb-8">
              <div className="p-2 bg-secondary/10 rounded-lg">
                <Cpu className="w-6 h-6 text-secondary" />
              </div>
              <h2 className="text-2xl font-bold text-foreground">
                Technologies & Tools
              </h2>
            </div>

            <div className="flex flex-wrap gap-3">
              {techTags.length > 0 ? (
                techTags.map((tag) => (
                  <Link
                    href={`/tags/${tag.slug}`}
                    key={tag.id}
                    className="group"
                  >
                    <Badge
                      variant="secondary"
                      className="text-base py-2 px-4 hover:bg-secondary hover:text-secondary-foreground transition-all cursor-pointer border border-transparent hover:border-secondary/50 hover:shadow-lg hover:shadow-secondary/20"
                    >
                      {tag.name}
                      <span className="ml-2 text-xs opacity-60 bg-background/20 px-1.5 py-0.5 rounded-full">
                        {tag.count}
                      </span>
                    </Badge>
                  </Link>
                ))
              ) : (
                <p className="text-muted-foreground italic">
                  No tech tags found.
                </p>
              )}
            </div>
          </section>

          <Separator className="bg-border/60" />

          {/* SECTION 2: Topics */}
          <section>
            <div className="flex items-center gap-3 mb-8">
              <div className="p-2 bg-accent/10 rounded-lg">
                <Hash className="w-6 h-6 text-accent" />
              </div>
              <h2 className="text-2xl font-bold text-foreground">
                Topics & Concepts
              </h2>
            </div>

            <div className="flex flex-wrap gap-3">
              {topicTags.length > 0 ? (
                topicTags.map((tag) => (
                  <Link
                    href={`/tags/${tag.slug}`}
                    key={tag.id}
                    className="group"
                  >
                    <Badge
                      variant="outline"
                      className="text-base py-2 px-4 hover:bg-accent hover:text-accent-foreground border-accent/30 transition-all cursor-pointer hover:shadow-lg hover:shadow-accent/20"
                    >
                      {tag.name}
                      <span className="ml-2 text-xs opacity-60 bg-foreground/10 px-1.5 py-0.5 rounded-full">
                        {tag.count}
                      </span>
                    </Badge>
                  </Link>
                ))
              ) : (
                <p className="text-muted-foreground italic">
                  No topic tags found.
                </p>
              )}
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
