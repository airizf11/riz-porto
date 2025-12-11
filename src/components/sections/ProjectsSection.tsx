// src/components/sections/ProjectsSection.tsx
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/no-unescaped-entities */
import { FolderOpen } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { FeaturedProjectsClient } from "./FeaturedProjectsClient";

export const ProjectsSection = async () => {
  // 1. UPDATE: Fetch ke 'content_items' bukan 'projects'
  const { data: rawData, error } = await supabase
    .from("content_items")
    .select(
      `
      id, 
      slug, 
      title, 
      excerpt, 
      cover_image_url, 
      live_url, 
      repo_url, 
      is_featured,
      content_tags ( tags (name) )
      `
    )
    .eq("content_type", "project")
    .eq("is_featured", true) // Ambil yang featured aja
    .order("order_index", { ascending: true, nullsFirst: false });

  if (error) {
    return (
      <section className="py-24 bg-background border-b border-border/40">
        <div className="container mx-auto text-center px-4">
          <div className="p-6 border border-destructive/50 bg-destructive/10 rounded-xl inline-block">
            <p className="text-destructive font-medium">
              Failed to load projects: {error.message}
            </p>
          </div>
        </div>
      </section>
    );
  }

  if (!rawData || rawData.length === 0) {
    return (
      <section className="py-32 bg-background border-b border-border/40">
        <div className="container mx-auto text-center px-4 flex flex-col items-center">
          <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mb-4">
            <FolderOpen className="w-8 h-8 text-muted-foreground" />
          </div>
          <h3 className="text-xl font-bold text-foreground">
            No Featured Projects
          </h3>
          <p className="text-muted-foreground mt-2 max-w-md">
            I'm currently cooking something new. Check back later!
          </p>
        </div>
      </section>
    );
  }

  // 2. MAPPING: Ubah format data DB biar sesuai props UI
  // content_items pake 'title' & 'excerpt', tapi ProjectCard butuh 'name' & 'description'
  const projects = rawData.map((item: any) => ({
    id: item.id,
    slug: item.slug,
    name: item.title, // Map title -> name
    description: item.excerpt, // Map excerpt -> description
    image_url: item.cover_image_url,
    live_url: item.live_url,
    repo_url: item.repo_url,
    // Flatten tags array jadi string "React, Next.js"
    stack: item.content_tags?.map((t: any) => t.tags.name).join(", ") || "",
  }));

  return <FeaturedProjectsClient projects={projects} />;
};
