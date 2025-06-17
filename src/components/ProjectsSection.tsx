// src/components/ProjectsSection.tsx
import { AnimatedSection } from "./AnimatedSection";
import { Layers, ListChecks } from "lucide-react";

const projects = [
  {
    icon: <Layers className="w-8 h-8 text-tertiary" />,
    name: "ApdetaX",
    description:
      "A research companion that aggregates info from multiple sources, ideal for content creators, educators, and students.",
    stack: ["React", "Next.js", "Supabase", "OpenRouter API"],
  },
  {
    icon: <ListChecks className="w-8 h-8 text-accent" />,
    name: "atList",
    description:
      "Stream helper can log chats, moderate like a pro, also engage your audience effortlessly.",
    stack: ["Next.js", "Google API", "Webhooks"],
  },
];

export const ProjectsSection = () => {
  return (
    <AnimatedSection id="projects" className="w-full py-20 md:py-32 bg-dark">
      <div className="container mx-auto max-w-6xl px-8">
        <h2 className="heading text-4xl md:text-5xl text-center mb-12">
          Featured <span className="text-primary">Projects</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <div
              key={index}
              className="bg-dark/50 border border-light/10 rounded-xl p-6 flex flex-col gap-4 transition-all duration-300 hover:border-accent/50 hover:bg-dark/20 hover:-translate-y-2"
            >
              <div className="flex items-center gap-4">
                {project.icon}
                <h3 className="heading text-2xl">{project.name}</h3>
              </div>
              <p className="text-light/80 flex-grow">{project.description}</p>
              <div className="flex flex-wrap gap-2">
                {project.stack.map((tech) => (
                  <span
                    key={tech}
                    className="text-xs bg-secondary/50 text-light px-2 py-1 rounded-full"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div className="text-center mt-12">
          <button className="text-accent font-bold hover:underline">
            See All Projects
          </button>
        </div>
      </div>
    </AnimatedSection>
  );
};
