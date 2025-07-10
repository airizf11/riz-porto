// src/app/(admin)/mudir/content/[id]/page.tsx
/* eslint-disable @typescript-eslint/no-explicit-any */
import { createClient } from "@/lib/supabase/server";
import { ContentForm } from "@/components/admin/ContentForm";
import { notFound } from "next/navigation";
import { Database } from "@/types/supabase";

interface EditContentPageProps {
  params: Promise<{ id: string }>;
}

type ContentItemWithTags =
  Database["public"]["Tables"]["content_items"]["Row"] & {
    tags: Database["public"]["Tables"]["tags"]["Row"][] | null;
  };

async function getContentItemById(
  id: string
): Promise<ContentItemWithTags | null> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("content_items")
    .select(
      `
            *, 
            content_tags ( 
                tags ( * )
            )
        `
    )
    .eq("id", id)
    .single();

  if (error) {
    console.error(`Error fetching content item with id ${id}:`, error);
    return null;
  }

  const transformedData = {
    ...data,
    tags: data.content_tags.map((item: any) => item.tags),
  };

  return transformedData;
}

export default async function EditContentPage({
  params,
}: EditContentPageProps) {
  const resolvedParams = await params;
  const id = resolvedParams?.id;

  if (!id) {
    notFound();
  }

  const contentItem = await getContentItemById(id);

  if (!contentItem) {
    notFound();
  }

  return (
    <div>
      <h2 className="text-3xl font-bold mb-8">
        Edit: <span className="text-accent">{contentItem.title}</span>
      </h2>
      <ContentForm contentItem={contentItem} />
    </div>
  );
}
