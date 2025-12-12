// src/services/projects.ts
/* eslint-disable @typescript-eslint/no-explicit-any */
import { createClient } from "@/lib/supabase/server";
import { cache } from "react";

export type Project = {
  id: string;
  slug: string;
  name: string; // Mapped from title
  description: string; // Mapped from excerpt
  content: string; // Markdown content
  image_url: string | null; // Mapped from cover_image_url
  live_url: string | null;
  repo_url: string | null;
  stack: string; // Flattened from tags relation
  is_featured: boolean;
  published_at: string;
};

// Query String Standar biar gak ngetik ulang-ulang
// Mengambil data project beserta tags-nya
const PROJECT_SELECT_QUERY = `
  id,
  slug,
  title,
  excerpt,
  content,
  cover_image_url,
  live_url,
  repo_url,
  is_featured,
  created_at,
  order_index,
  content_tags (
    tags (name)
  )
`;

// Helper: Mapper dari Raw DB Response ke Tipe Project UI
function mapToProject(item: any): Project {
  return {
    id: item.id,
    slug: item.slug,
    name: item.title, // DB: title -> UI: name
    description: item.excerpt || "", // DB: excerpt -> UI: description
    content: item.content || "",
    image_url: item.cover_image_url,
    live_url: item.live_url,
    repo_url: item.repo_url,
    is_featured: item.is_featured,
    published_at: item.created_at,
    // Logic Flatten Tags: Ambil array tags, join jadi string "React, Next.js"
    stack: item.content_tags
      ? item.content_tags
          .map((t: any) => t.tags?.name)
          .filter(Boolean)
          .join(", ")
      : "",
  };
}

export const getFeaturedProjects = cache(async (): Promise<Project[]> => {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("content_items")
    .select(PROJECT_SELECT_QUERY)
    .eq("content_type", "project")
    .eq("status", "published")
    .eq("is_featured", true)
    .order("order_index", { ascending: true, nullsFirst: false });

  if (error) {
    console.error("[Service Error] getFeaturedProjects:", error.message);
    return [];
  }

  return (data || []).map(mapToProject);
});

export const getAllProjects = cache(async (): Promise<Project[]> => {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("content_items")
    .select(PROJECT_SELECT_QUERY)
    .eq("content_type", "project")
    .eq("status", "published")
    .order("order_index", { ascending: true, nullsFirst: false });

  if (error) {
    console.error("[Service Error] getAllProjects:", error.message);
    return [];
  }

  return (data || []).map(mapToProject);
});

export const getProjectBySlug = cache(
  async (slug: string): Promise<Project | null> => {
    if (!slug) return null;

    const supabase = await createClient();

    const { data, error } = await supabase
      .from("content_items")
      .select(PROJECT_SELECT_QUERY)
      .eq("content_type", "project")
      .eq("status", "published")
      .eq("slug", slug)
      .single();

    if (error) {
      if (error.code !== "PGRST116") {
        // Ignore 'No Rows Found' error
        console.error(
          `[Service Error] getProjectBySlug (${slug}):`,
          error.message
        );
      }
      return null;
    }

    return mapToProject(data);
  }
);
