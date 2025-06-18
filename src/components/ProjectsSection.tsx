// src/components/ProjectsSection.tsx
import Image from "next/image";
import { supabase } from "@/lib/supabase";
import { AnimatedSection } from "./AnimatedSection";
import { ExternalLink, Github, Eye } from "lucide-react";
import Link from "next/link";

type ProjectFromDB = {
  id: number;
  slug: string;
  name: string;
  description: string;
  stack: string | null;
  image_url: string | null;
  live_url: string | null;
  repo_url: string | null;
  is_featured: boolean;
};

export const ProjectsSection = async () => {
  const { data: projectsFromDB, error } = await supabase
    .from("projects")
    .select(
      "id, slug, name, description, stack, image_url, live_url, repo_url, is_featured"
    )
    .eq("is_featured", true)
    .order("created_at", { ascending: true });

  if (error) {
    console.error("Error fetching projects:", error.message);
    return (
      <section id="projects" className="w-full py-20 md:py-32 bg-dark">
        <div className="container mx-auto px-8 text-center">
          <p className="text-red-400">Error: Could not load projects data.</p>
        </div>
      </section>
    );
  }

  if (!projectsFromDB || projectsFromDB.length === 0) {
    return (
      <section id="projects" className="w-full py-20 md:py-32 bg-dark">
        <div className="container mx-auto px-8 text-center">
          <p className="text-light/70">
            No featured projects to display at the moment.
          </p>
        </div>
      </section>
    );
  }

  return (
    <AnimatedSection id="projects" className="w-full py-20 md:py-32 bg-dark">
      <div className="container mx-auto max-w-6xl px-8">
        <h2 className="heading text-4xl md:text-5xl text-center mb-16">
          Featured <span className="text-primary">Projects</span>
        </h2>

        <div className="flex flex-col gap-16 md:gap-24">
          {projectsFromDB.map((project: ProjectFromDB, index) => {
            const stackArray = project.stack
              ? project.stack.split(",").map((s) => s.trim())
              : [];

            return (
              <div
                key={project.id}
                className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center"
              >
                <div
                  className={`group ${index % 2 === 1 ? "md:order-last" : ""}`}
                >
                  <Link href={`/projects/${project.slug}`} className="block">
                    <div className="relative aspect-video rounded-xl overflow-hidden shadow-2xl border-2 border-light/10 group-hover:border-accent transition-all duration-300">
                      {project.image_url && (
                        <Image
                          src={project.image_url}
                          alt={`Preview of ${project.name}`}
                          fill
                          sizes="(max-width: 768px) 100vw, 50vw"
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      )}
                      <div className="absolute inset-0 bg-dark/40 group-hover:bg-dark/10 transition-colors duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                        <div className="text-center text-light p-4">
                          <Eye className="w-10 h-10 mx-auto" />
                          <p className="mt-2 font-semibold tracking-wider">
                            View Case Study
                          </p>
                        </div>
                      </div>
                    </div>
                  </Link>
                </div>

                <div className="flex flex-col gap-4 text-center md:text-left">
                  <h3 className="heading text-3xl text-accent">
                    {project.name}
                  </h3>
                  <p className="text-light/80 text-lg leading-relaxed">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-2 my-2 justify-center md:justify-start">
                    {stackArray.map((tech) => (
                      <span
                        key={tech}
                        className="text-sm bg-secondary/50 text-light px-3 py-1 rounded-full"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center gap-4 mt-4 justify-center md:justify-start">
                    <Link
                      href={`/projects/${project.slug}`}
                      className="inline-flex items-center gap-2 px-5 py-2 bg-primary text-dark font-bold rounded-lg transition-transform hover:scale-105 active:scale-95"
                    >
                      <Eye className="w-4 h-4" /> Case Study
                    </Link>
                    {project.live_url && (
                      <a
                        href={project.live_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-5 py-2 border-2 border-light/50 text-light font-bold rounded-lg transition-colors hover:bg-light/10 active:bg-light/20"
                      >
                        <ExternalLink className="w-4 h-4" /> Live Demo
                      </a>
                    )}
                    {project.repo_url && (
                      <a
                        href={project.repo_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-light/70 hover:text-light transition-colors"
                      >
                        <Github className="w-5 h-5" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </AnimatedSection>
  );
};
