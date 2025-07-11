// src/app/sitemap.ts
import { MetadataRoute } from "next";
import { supabase } from "@/lib/supabase";

const BASE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://akuriziyan.vercel.app";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes = [
    "/",
    "/contact",
    "/projects",
    "/articles",
    "/tags",
    "/blog",
    "/crypto",
  ].map((route) => ({
    url: `${BASE_URL}${route}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: route === "/" ? 1.0 : 0.8,
  }));

  try {
    console.log("Fetching projects for sitemap...");
    const { data: projects, error } = await supabase
      .from("projects")
      .select("slug, updated_at");

    if (error) {
      throw new Error(`Supabase error fetching projects: ${error.message}`);
    }

    const projectRoutes = projects
      ? projects.map((project) => ({
          url: `${BASE_URL}/projects/${project.slug}`,
          lastModified: new Date(project.updated_at || new Date()),
          changeFrequency: "weekly" as const,
        }))
      : [];

    console.log(
      `Sitemap generated with ${staticRoutes.length} static and ${projectRoutes.length} project routes.`
    );

    const { data: contents } = await supabase
      .from("content_items")
      .select("slug, content_type, updated_at")
      .eq("status", "published");

    if (!contents) {
      return staticRoutes;
    }

    const dynamicRoutes = contents.map((item) => ({
      url: `${BASE_URL}/${item.content_type}s/${item.slug}`,
      lastModified: new Date(item.updated_at || new Date()),
    }));

    const { data: tags } = await supabase.from("tags").select("slug");
    const tagRoutes = tags
      ? tags.map((tag) => ({
          url: `${BASE_URL}/tags/${tag.slug}`,
          lastModified: new Date(),
          changeFrequency: "weekly" as const,
        }))
      : [];

    return [...staticRoutes, ...projectRoutes, ...dynamicRoutes, ...tagRoutes];
  } catch (error) {
    console.error("Failed to generate dynamic sitemap routes:", error);
    return staticRoutes;
  }
}
