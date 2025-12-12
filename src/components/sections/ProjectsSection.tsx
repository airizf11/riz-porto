// src/components/sections/ProjectsSection.tsx
/* eslint-disable react/no-unescaped-entities */
import { FolderOpen } from "lucide-react";
import { FeaturedProjectsClient } from "./FeaturedProjectsClient";
import { getFeaturedProjects } from "@/services/projects";

export const ProjectsSection = async () => {
  const projects = await getFeaturedProjects();

  if (!projects || projects.length === 0) {
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

  return <FeaturedProjectsClient projects={projects} />;
};
