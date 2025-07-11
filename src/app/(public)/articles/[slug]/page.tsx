// src/app/(public)/articles/[slug]/page.tsx
/* eslint-disable @typescript-eslint/no-explicit-any */
import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { MarkdownRenderer } from "@/components/MarkdownRenderer";
import { Calendar, Hash } from "lucide-react";
import type { Database } from "@/types/supabase";

interface ArticlePageProps {
  params: Promise<{ slug: string }>;
}

type ArticleWithTags = Database["public"]["Tables"]["content_items"]["Row"] & {
  tags: Database["public"]["Tables"]["tags"]["Row"][] | null;
};

export async function generateMetadata({
  params,
}: ArticlePageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const article = await getArticleBySlug(resolvedParams.slug);

  if (!article) return { title: "Article Not Found" };

  return {
    title: `${article.title} | Riziyan's Blog`,
    description: article.excerpt,
    openGraph: {
      title: article.title ?? "Untitled",
      description: article.excerpt || "",
      type: "article",
      publishedTime: article.created_at,
      images: article.cover_image_url ? [article.cover_image_url] : [],
    },
  };
}

async function getArticleBySlug(slug: string): Promise<ArticleWithTags | null> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("content_items")
    .select(`*, content_tags(tags(*))`)
    .eq("slug", slug)
    .eq("content_type", "article")
    .eq("status", "published")
    .single();

  if (error) return null;

  const transformedData = {
    ...data,
    tags: data.content_tags.map((item: any) => item.tags),
  };
  return transformedData;
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const resolvedParams = await params;
  const article = await getArticleBySlug(resolvedParams.slug);

  if (!article) notFound();

  const topicTags = article.tags?.filter((t) => t.tag_type === "topic");

  return (
    <main className="min-h-screen bg-dark text-light">
      <article className="container mx-auto max-w-6xl px-4 py-12 md:py-20">
        <div className="mb-8 text-sm text-light/60">
          <Link href="/" className="hover:text-light transition-colors">
            Home
          </Link>
          <span className="mx-2">/</span>
          <Link href="/articles" className="hover:text-light transition-colors">
            Articles
          </Link>
          <span className="mx-2">/</span>
          <span className="text-light font-semibold">{article.title}</span>
        </div>
        <header className="text-center mb-12">
          <h1 className="heading text-4xl md:text-6xl text-light mb-4">
            {article.title}
          </h1>
          <div className="flex items-center justify-center gap-4 text-sm text-light/60">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-12" />
              <time dateTime={article.created_at}>
                {new Date(article.created_at).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </time>
            </div>
          </div>
        </header>

        {article.cover_image_url && (
          <div className="relative aspect-video w-full rounded-xl overflow-hidden mb-12 border border-light/10">
            <Image
              src={article.cover_image_url}
              alt={article.title ?? "Article cover image"}
              fill
              className="object-cover"
              priority
            />
          </div>
        )}

        <MarkdownRenderer content={article.content || ""} />

        {topicTags && topicTags.length > 0 && (
          <footer className="mt-16 pt-8 border-t border-light/10">
            <h3 className="flex items-center gap-2 font-semibold mb-4 text-light/80">
              <Hash className="w-5 h-5" />
              Tags
            </h3>
            <div className="flex flex-wrap gap-3">
              {topicTags.map((tag) => (
                <Link
                  href={`/tags/${tag.slug}`}
                  key={tag.id}
                  className="bg-secondary/50 text-light px-3 py-1 rounded-full text-sm hover:bg-secondary/70 transition-colors"
                >
                  {tag.name}
                </Link>
              ))}
            </div>
          </footer>
        )}
      </article>
    </main>
  );
}
