// src/app/(admin)/mudir/content/[id]/page.tsx
import { createClient } from "@/lib/supabase/server";
import { ContentForm } from "@/components/admin/ContentForm";
import { notFound } from "next/navigation";

async function getContentItemById(id: string) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("content_items")
    .select(`*, tags (*)`)
    .eq("id", id)
    .single();

  if (error) notFound();
  return data;
}

export default async function EditContentPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const contentItem = await getContentItemById((await params).id);

  return (
    <div>
      <h2 className="text-3xl font-bold mb-8">
        Edit: <span className="text-accent">{contentItem.title}</span>
      </h2>
      <ContentForm contentItem={contentItem} />
    </div>
  );
}
