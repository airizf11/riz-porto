// src/app/(public)/exp/projects/page.tsx
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { createClient } from "@/lib/supabase/server";
import { ProjectCard } from "@/components/ProjectCard"; // Kita akan update komponen ini
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "All My Projects ",
  description: "A gallery of all my development projects, and more...",
};

async function getAllProjects() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("content_items")
    .select(
      `
        id, title, slug, excerpt, cover_image_url, live_url, repo_url, 
        content_tags (tags (id, name, tag_type))
    `
    )
    .eq("content_type", "project")
    .eq("status", "published")
    .order("order_index", { ascending: true, nullsFirst: false });

  if (error) {
    console.error("Error fetching all projects:", error.message);
    return [];
  }

  return data.map((project) => ({
    ...project,
    name: project.title,
    description: project.excerpt,
    image_url: project.cover_image_url,
    stack: project.content_tags
      .filter((ct: any) => ct.tags.tag_type === "tech")
      .map((ct: any) => ct.tags.name)
      .join(", "),
  }));
}

export default async function AllProjectsPage() {
  const allProjects = await getAllProjects();

  return (
    <main className="min-h-screen bg-dark text-light">
      <div className="container mx-auto max-w-6xl px-4 py-12 md:py-20">
        <Link
          href="/"
          className="group inline-flex items-center gap-2 text-light/70 hover:text-light mb-12 transition-colors"
        >
          <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
          Back to Home
        </Link>
        <div className="text-center mb-16">
          <h1 className="heading text-4xl md:text-6xl text-primary mb-4">
            My Project Gallery
          </h1>
          <p className="narrative text-xl text-light/80">
            A collection of things I've built and learned from.
          </p>
        </div>

        {allProjects.length > 0 ? (
          <div className="flex flex-col gap-16 md:gap-24">
            {allProjects.map((project, index) => (
              <ProjectCard
                key={project.id}
                project={project}
                orientation={index % 2 === 1 ? "right" : "left"}
              />
            ))}
          </div>
        ) : (
          <div className="text-center text-light/70">
            <p>No projects found. Check back later!</p>
          </div>
        )}
      </div>
    </main>
  );
}
