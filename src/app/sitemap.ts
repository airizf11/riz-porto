// src/app/sitemap.ts
import { MetadataRoute } from "next";
import { supabase } from "@/lib/supabase";

const BASE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://akuriziyan.vercel.app";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes = ["/", "/contact", "/tags", "/projects"].map((route) => ({
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
    return [...staticRoutes, ...projectRoutes];
  } catch (error) {
    console.error("Failed to generate dynamic sitemap routes:", error);
    return staticRoutes;
  }
}
