// src/app/(public)/tags/[slug]/page.tsx
/* eslint-disable @typescript-eslint/no-explicit-any */
import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { ContentItemCard } from "@/components/ContentItemCard"; // Komponen ini tetap kita gunakan

interface TagDetailPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: TagDetailPageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const slug = resolvedParams?.slug;

  if (!slug) {
    return { title: "Tag Not Found" };
  }

  const supabase = await createClient();
  const { data: tag } = await supabase
    .from("tags")
    .select("name")
    .eq("slug", slug)
    .single();

  if (!tag) {
    return { title: "Tag Not Found" };
  }

  return {
    title: `Content tagged with "${tag.name}" `,
    description: `Browse all projects, articles, and reviews tagged with ${tag.name}.`,
  };
}

async function getContentsByTagSlug(slug: string) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("tags")
    .select(
      `
        name,
        slug,
        content_tags (
            content_items (
                id,
                title,
                slug,
                excerpt,
                content_type
            )
        )
    `
    )
    .eq("slug", slug)
    .single();

  if (error || !data) {
    notFound();
  }

  const transformedData = {
    ...data,
    content_items: data.content_tags.map((item: any) => item.content_items),
  };

  return transformedData;
}

export default async function TagDetailPage({ params }: TagDetailPageProps) {
  const resolvedParams = await params;
  const slug = resolvedParams?.slug;

  if (!slug) {
    notFound();
  }

  const tagData = await getContentsByTagSlug(slug);

  return (
    <main className="min-h-screen bg-dark text-light">
      <div className="container mx-auto max-w-4xl px-4 py-12 md:py-20">
        <div className="text-center mb-16">
          <p className="narrative text-xl text-light/80 mb-2">
            Content tagged with
          </p>
          <h1 className="heading text-4xl md:text-6xl text-accent">
            {tagData.name}
          </h1>
        </div>

        <div className="space-y-8">
          {tagData.content_items.length > 0 ? (
            tagData.content_items.map((item) => (
              <ContentItemCard key={item.id} item={item} />
            ))
          ) : (
            <p className="text-center text-light/70">
              No content found for this tag yet.
            </p>
          )}
        </div>
      </div>
    </main>
  );
}
