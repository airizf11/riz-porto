// src/app/(public)/projects/page.tsx
/* eslint-disable react/no-unescaped-entities */
import Link from "next/link";
import { ArrowLeft, FolderOpen } from "lucide-react";
import { Metadata } from "next";

// Import Service
import { getAllProjects } from "@/services/projects";
import { ProjectCard } from "@/components/ProjectCard";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "All My Projects ",
  description:
    "A gallery of all my web development and content creation projects.",
};

export default async function AllProjectsPage() {
  // Fetch pake Service
  const allProjects = await getAllProjects();

  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="container mx-auto max-w-6xl px-4 py-12 md:py-20">
        <div className="mb-12">
          <Button
            variant="ghost"
            className="pl-0 hover:pl-2 transition-all"
            asChild
          >
            <Link
              href="/"
              className="gap-2 text-muted-foreground hover:text-foreground"
            >
              <ArrowLeft className="w-4 h-4" /> Back to Home
            </Link>
          </Button>
        </div>

        <div className="text-center mb-16">
          <h1 className="heading text-4xl md:text-6xl font-bold text-primary mb-6">
            Project Gallery
          </h1>
          <p className="narrative text-xl text-muted-foreground max-w-2xl mx-auto">
            A collection of things I've built and learned from.
          </p>
        </div>

        {allProjects.length > 0 ? (
          <div className="flex flex-col gap-16 md:gap-24">
            {allProjects.map((project, index) => (
              <ProjectCard
                key={project.slug}
                project={project}
                orientation={index % 2 === 1 ? "right" : "left"}
              />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <FolderOpen className="w-12 h-12 text-muted-foreground/30 mb-4" />
            <p className="text-muted-foreground">
              No projects found. Check back later!
            </p>
          </div>
        )}
      </div>
    </main>
  );
}
