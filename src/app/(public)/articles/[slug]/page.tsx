// src/app/(public)/articles/[slug]/page.tsx
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { CalendarDays, ArrowLeft, Hash } from "lucide-react";

// Services & Utils
import { getContentBySlug } from "@/services/content";
import { constructMetadata } from "@/lib/utils";
import { MarkdownRenderer } from "@/components/MarkdownRenderer";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

interface ArticlePageProps {
  params: Promise<{ slug: string }>;
}

// 1. Generate Metadata SEO
export async function generateMetadata({
  params,
}: ArticlePageProps): Promise<Metadata> {
  const resolvedParams = await params;
  // Fetch spesifik tipe 'article'
  const article = await getContentBySlug(resolvedParams.slug, "article");

  if (!article) {
    return constructMetadata({ title: "Article Not Found", noIndex: true });
  }

  return constructMetadata({
    title: article.title,
    description: article.excerpt,
    image: article.cover_image_url || undefined,
  });
}

// 2. Main Page Component
export default async function ArticlePage({ params }: ArticlePageProps) {
  const resolvedParams = await params;
  const article = await getContentBySlug(resolvedParams.slug, "article");

  if (!article) notFound();

  // Helper date format
  const formattedDate = new Date(article.created_at).toLocaleDateString(
    "en-US",
    {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    }
  );

  // 3. Schema Markup (Structured Data for Google)
  const ArticleSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: article.title,
    description: article.excerpt,
    datePublished: article.created_at,
    dateModified: article.updated_at,
    author: {
      "@type": "Person",
      name: "Riziyan", // Bisa diganti dynamic kalau ada field author
    },
    image: article.cover_image_url ? [article.cover_image_url] : [],
  };

  return (
    <main className="min-h-screen bg-background text-foreground">
      {/* Inject Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(ArticleSchema) }}
      />

      <article className="container mx-auto max-w-4xl px-4 py-12 md:py-20">
        {/* Navigation Breadcrumb */}
        <div className="mb-8 flex items-center gap-2 text-sm text-muted-foreground">
          <Link href="/" className="hover:text-primary transition-colors">
            Home
          </Link>
          <span>/</span>
          <Link
            href="/articles"
            className="hover:text-primary transition-colors"
          >
            Articles
          </Link>
          <span>/</span>
          <span className="text-foreground font-semibold truncate max-w-[200px]">
            {article.title}
          </span>
        </div>

        {/* Article Header */}
        <header className="text-center mb-12">
          <div className="flex items-center justify-center gap-2 mb-6">
            <Badge
              variant="secondary"
              className="px-3 py-1 text-xs uppercase tracking-widest"
            >
              Article
            </Badge>
            <div className="flex items-center text-xs text-muted-foreground">
              <CalendarDays className="w-3 h-3 mr-1.5" />
              <time dateTime={article.created_at}>{formattedDate}</time>
            </div>
          </div>

          <h1 className="heading text-3xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight">
            {article.title}
          </h1>

          {article.excerpt && (
            <p className="narrative text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              {article.excerpt}
            </p>
          )}
        </header>

        {/* Cover Image */}
        {article.cover_image_url && (
          <div className="relative aspect-video w-full rounded-2xl overflow-hidden mb-12 border border-border/50 bg-muted shadow-lg">
            <Image
              src={article.cover_image_url}
              alt={article.title}
              fill
              className="object-cover"
              priority
              sizes="(max-width: 1200px) 100vw, 1200px"
            />
          </div>
        )}

        {/* Markdown Content */}
        <div className="prose prose-lg prose-invert max-w-none mx-auto mb-16">
          <MarkdownRenderer content={article.content} />
        </div>

        <Separator className="my-12 bg-border/60" />

        {/* Footer: Tags & Back Button */}
        <footer className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          {/* Tags List */}
          {article.tags && article.tags.length > 0 && (
            <div className="flex flex-col gap-3">
              <h3 className="flex items-center gap-2 text-sm font-semibold text-muted-foreground">
                <Hash className="w-4 h-4" /> Related Topics
              </h3>
              <div className="flex flex-wrap gap-2">
                {article.tags.map((tag) => (
                  <Link href={`/tags/${tag.slug}`} key={tag.id}>
                    <Badge
                      variant="outline"
                      className="hover:bg-accent/10 hover:text-accent hover:border-accent/30 transition-all cursor-pointer px-3 py-1"
                    >
                      {tag.name}
                    </Badge>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Back Button */}
          <Button
            asChild
            variant="ghost"
            className="group text-muted-foreground hover:text-foreground"
          >
            <Link href="/articles">
              <ArrowLeft className="w-4 h-4 mr-2 transition-transform group-hover:-translate-x-1" />
              Back to All Articles
            </Link>
          </Button>
        </footer>
      </article>
    </main>
  );
}
