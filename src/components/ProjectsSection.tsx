// src/components/ProjectsSection.tsx
import { supabase } from "@/lib/supabase";
import { AnimatedSection } from "./AnimatedSection";
import { ProjectCard } from "./ProjectCard";
// import { LayoutGrid, Link } from "lucide-react";

export const ProjectsSection = async () => {
  const { data: projectsFromDB, error } = await supabase
    .from("projects")
    .select(
      "id, slug, name, description, stack, image_url, live_url, repo_url, is_featured"
    )
    .eq("is_featured", true)
    .order("order_index", { ascending: true, nullsFirst: false });

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
          {projectsFromDB.map((project, index) => (
            <ProjectCard
              key={project.slug}
              project={project}
              // Terapkan layout zig-zag
              orientation={index % 2 === 1 ? "right" : "left"}
            />
          ))}
        </div>
        {/* <div className="mt-20 text-center">
          <Link
            href="/projects"
            className="group inline-flex items-center justify-center gap-3 px-8 py-4 border-2 border-secondary/50 text-secondary font-bold rounded-full transition-all duration-300 hover:bg-secondary/20 hover:border-secondary hover:scale-105 active:scale-95"
          >
            <LayoutGrid className="w-5 h-5 transition-transform group-hover:rotate-6" />
            <span>View All Projects</span>
          </Link>
        </div> */}
      </div>
    </AnimatedSection>
  );
};
