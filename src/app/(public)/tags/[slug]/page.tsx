// src/app/(public)/tags/[slug]/page.tsx
import Link from "next/link";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { ArrowLeft, Hash, Cpu, LayoutGrid } from "lucide-react";

// Services & Components
import { getContentByTag } from "@/services/content";
import { constructMetadata } from "@/lib/utils";
import { ContentItemCard } from "@/components/ContentItemCard";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface TagDetailPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: TagDetailPageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const data = await getContentByTag(resolvedParams.slug);

  if (!data) {
    return constructMetadata({ title: "Tag Not Found", noIndex: true });
  }

  return constructMetadata({
    title: `Content tagged "${data.tag.name}"`,
    description: `Browse all projects, articles, and experiments related to ${data.tag.name}.`,
  });
}

export default async function TagDetailPage({ params }: TagDetailPageProps) {
  const resolvedParams = await params;
  const data = await getContentByTag(resolvedParams.slug);

  if (!data) {
    notFound();
  }

  const { tag, items } = data;
  const isTech = tag.tag_type === "tech";

  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="container mx-auto max-w-6xl px-4 py-12 md:py-20">
        {/* Navigation */}
        <div className="mb-12">
          <Button
            variant="ghost"
            className="pl-0 hover:pl-2 transition-all"
            asChild
          >
            <Link
              href="/tags"
              className="gap-2 text-muted-foreground hover:text-foreground"
            >
              <ArrowLeft className="w-4 h-4" /> Back to All Tags
            </Link>
          </Button>
        </div>

        {/* Tag Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 mb-6">
            <Badge
              variant={isTech ? "secondary" : "outline"}
              className={`px-4 py-1.5 text-sm rounded-full ${
                !isTech ? "border-accent text-accent hover:bg-accent/10" : ""
              }`}
            >
              {isTech ? (
                <Cpu className="w-4 h-4 mr-2" />
              ) : (
                <Hash className="w-4 h-4 mr-2" />
              )}
              <span className="capitalize">{tag.tag_type}</span>
            </Badge>
            <Badge
              variant="outline"
              className="px-4 py-1.5 text-sm rounded-full bg-muted/50 text-muted-foreground border-transparent"
            >
              {items.length} Items
            </Badge>
          </div>

          <h1 className="heading text-4xl md:text-6xl font-bold text-foreground mb-6">
            {tag.name}
          </h1>
          <p className="narrative text-xl text-muted-foreground max-w-2xl mx-auto">
            Explore a curated collection of my work related to{" "}
            <span
              className={
                isTech ? "text-secondary font-bold" : "text-accent font-bold"
              }
            >
              {tag.name}
            </span>
            .
          </p>
        </div>

        {/* Content Grid */}
        {items.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {items.map((item) => (
              <div key={item.id} className="h-full">
                <ContentItemCard item={item} />
              </div>
            ))}
          </div>
        ) : (
          /* Empty State */
          <div className="flex flex-col items-center justify-center py-24 text-center border border-dashed border-border rounded-2xl bg-muted/20">
            <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mb-4">
              <LayoutGrid className="w-8 h-8 text-muted-foreground" />
            </div>
            <h3 className="text-xl font-bold text-foreground">
              No Content Found
            </h3>
            <p className="text-muted-foreground mt-2 max-w-md">
              There are no published items with this tag yet.
            </p>
          </div>
        )}
      </div>
    </main>
  );
}
