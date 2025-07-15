// src/app/(admin)/mudir/content/actions.ts
/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";

export type FormState = {
  errors?: {
    id?: string[];
    name?: string[];
    slug?: string[];
    description?: string[];
    stack?: string[];
    image_url?: string[];
    live_url?: string[];
    repo_url?: string[];
    case_study?: string[];
    is_featured?: string[];
    order_index?: string[];
  };
  message: string | null;
};

const contentItemSchema = z.object({
  id: z.string().optional(),
  title: z.string().min(3, "Title is required"),
  slug: z
    .string()
    .min(3, "Slug is required")
    .regex(
      /^[a-z0-9-]+$/,
      "Slug can only contain lowercase letters, numbers, and hyphens"
    ),
  content_type: z.enum(["project", "article", "quote", "review", "experiment"]),
  status: z.enum(["draft", "published"]),
  content: z.string().optional(),
  excerpt: z.string().optional(),
  cover_image_url: z
    .string()
    .url("Must be a valid URL")
    .optional()
    .or(z.literal("")),
  is_featured: z.preprocess((val) => val === "on", z.boolean()),
  order_index: z.coerce.number().optional(),
  live_url: z.string().url("Must be a valid URL").optional().or(z.literal("")),
  repo_url: z.string().url("Must be a valid URL").optional().or(z.literal("")),
  author_name: z.string().optional(),
});

const tagsSchema = z.object({
  topic_tags: z.string().optional(),
  tech_tags: z.string().optional(),
});

async function processTags(
  supabase: any,
  tagString: string | undefined,
  type: "topic" | "tech"
): Promise<string[]> {
  if (!tagString) return [];

  const tagNames = tagString
    .split(",")
    .map((t) => t.trim())
    .filter(Boolean);
  if (tagNames.length === 0) return [];

  const { data: existingTags, error: selectError } = await supabase
    .from("tags")
    .select("id, name")
    .in("name", tagNames);

  if (selectError)
    throw new Error(`Failed to select tags: ${selectError.message}`);

  const existingTagNames = existingTags.map((t: { name: any }) => t.name);
  const newTagNames = tagNames.filter(
    (name) => !existingTagNames.includes(name)
  );

  const newTagsToInsert = newTagNames.map((name) => ({
    name,
    slug: name.toLowerCase().replace(/\s+/g, "-"),
    tag_type: type,
  }));

  let newTagIds: string[] = [];
  if (newTagsToInsert.length > 0) {
    const { data: insertedTags, error: insertError } = await supabase
      .from("tags")
      .insert(newTagsToInsert)
      .select("id");

    if (insertError)
      throw new Error(`Failed to insert new tags: ${insertError.message}`);
    newTagIds = insertedTags.map((t: { id: any }) => t.id);
  }

  return [...existingTags.map((t: { id: any }) => t.id), ...newTagIds];
}

export async function createOrUpdateContent(
  prevState: any,
  formData: FormData
): Promise<any> {
  const supabase = await createClient();

  const validatedContent = contentItemSchema.safeParse(
    Object.fromEntries(formData.entries())
  );
  const validatedTags = tagsSchema.safeParse(
    Object.fromEntries(formData.entries())
  );

  if (!validatedContent.success) {
    return {
      errors: validatedContent.error.flatten().fieldErrors,
      message: "Content validation failed.",
    };
  }
  if (!validatedTags.success) {
    return {
      errors: validatedTags.error.flatten().fieldErrors,
      message: "Tags validation failed.",
    };
  }

  const { id, ...contentData } = validatedContent.data;
  const { topic_tags, tech_tags } = validatedTags.data;

  try {
    const topicTagIds = await processTags(supabase, topic_tags, "topic");
    const techTagIds = await processTags(supabase, tech_tags, "tech");
    const allTagIds = [...new Set([...topicTagIds, ...techTagIds])];

    let contentItemId = id;

    if (id) {
      // Update
      const { error } = await supabase
        .from("content_items")
        .update(contentData)
        .eq("id", id);
      if (error) throw new Error(`Database Error (Update): ${error.message}`);
    } else {
      // Create
      const { data: newContent, error } = await supabase
        .from("content_items")
        .insert(contentData)
        .select("id")
        .single();
      if (error || !newContent)
        throw new Error(`Database Error (Create): ${error.message}`);
      contentItemId = newContent.id;
    }

    if (!contentItemId) throw new Error("Content Item ID is missing.");

    const { error: deleteTagsError } = await supabase
      .from("content_tags")
      .delete()
      .eq("content_item_id", contentItemId);
    if (deleteTagsError)
      throw new Error(`Failed to clear old tags: ${deleteTagsError.message}`);

    if (allTagIds.length > 0) {
      const tagsToLink = allTagIds.map((tagId) => ({
        content_item_id: contentItemId!,
        tag_id: tagId,
      }));
      const { error: linkTagsError } = await supabase
        .from("content_tags")
        .insert(tagsToLink);
      if (linkTagsError)
        throw new Error(`Failed to link new tags: ${linkTagsError.message}`);
    }
  } catch (error: any) {
    return { message: error.message };
  }

  revalidatePath("/");
  revalidatePath(`/${contentData.content_type}s`);
  revalidatePath(`/${contentData.content_type}s/${contentData.slug}`);
  revalidatePath("/mudir");

  redirect("/mudir/content");
}

export async function deleteContent(id: string) {
  const supabase = await createClient();
  const { error } = await supabase.from("content_items").delete().eq("id", id);
  if (error) throw new Error("Failed to delete content.");

  revalidatePath("/");
  revalidatePath("/mudir/content");
}
