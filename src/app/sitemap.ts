// src/app/sitemap.ts
import { MetadataRoute } from "next";
import { supabase } from "@/lib/supabase";

const BASE_URL = "https://akuriziyan.vercel.app";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes = [
    "/",
    "/contact",
    "/projects",
    // jika nanti ada '/blog' dll
  ].map((route) => ({
    url: `${BASE_URL}${route}`,
    lastModified: new Date(),
  }));

  const { data: projects } = await supabase
    .from("projects")
    .select("slug, created_at");

  const projectRoutes = projects
    ? projects.map((project) => ({
        url: `${BASE_URL}/projects/${project.slug}`,
        lastModified: new Date(project.created_at),
      }))
    : [];

  // Nanti bisa tambah fetch untuk blog posts di sini

  return [...staticRoutes, ...projectRoutes];
}
