// src/components/ProjectsSection.tsx
import Image from "next/legacy/image";
import { AnimatedSection } from "./AnimatedSection";

const projects = [
  {
    name: "ApdetaX",
    description:
      "A research companion that aggregates info from multiple sources, ideal for content creators, educators, and students.",
    stack: ["React", "Next.js", "Supabase", "OpenRouter API"],
    image: "/images/apdetax-preview.png",
    liveUrl: "https://apdetax.vercel.app",
    repoUrl: "#",
  },
  {
    name: "atList",
    description:
      "Stream helper can log chats, moderate like a pro, also engage your audience effortlessly.",
    stack: ["JavaScript", "Platform APIs", "Webhooks"],
    image: "/images/atlist-preview.png",
    liveUrl: "https://atlistapp.vercel.app",
    repoUrl: "#",
  },
];

export const ProjectsSection = () => {
  return (
    <AnimatedSection id="projects" className="w-full py-20 md:py-32 bg-dark">
      <div className="container mx-auto max-w-6xl px-8">
        <h2 className="heading text-4xl md:text-5xl text-center mb-16">
          Featured <span className="text-primary">Projects</span>
        </h2>
        <div className="flex flex-col gap-16 md:gap-24">
          {projects.map((project, index) => (
            <div
              key={index}
              className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center"
            >
              <div
                className={`relative group ${
                  index % 2 === 1 ? "md:order-last" : ""
                }`}
              >
                <div className="aspect-w-16 aspect-h-9 rounded-xl overflow-hidden shadow-2xl">
                  <Image
                    src={project.image}
                    alt={`Preview of ${project.name}`}
                    layout="fill"
                    objectFit="cover"
                    className="transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-dark/30 group-hover:bg-dark/10 transition-colors"></div>
                </div>
              </div>

              <div className="flex flex-col gap-4">
                <h3 className="heading text-3xl text-accent">{project.name}</h3>
                <p className="text-light/80 text-lg leading-relaxed">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2 my-2">
                  {project.stack.map((tech) => (
                    <span
                      key={tech}
                      className="text-sm bg-secondary/50 text-light px-3 py-1 rounded-full"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                <div className="flex items-center gap-4 mt-4">
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-5 py-2 bg-primary text-dark font-bold rounded-lg transition-transform hover:scale-105 active:scale-95"
                  >
                    Live Demo
                  </a>
                  <a
                    href={project.repoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-5 py-2 border-2 border-light/50 text-light font-bold rounded-lg transition-colors hover:bg-light/10 active:bg-light/20"
                  >
                    Source Code
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="text-center mt-16">
          <button className="text-accent font-bold hover:underline text-lg">
            See All Projects
          </button>
        </div>
      </div>
    </AnimatedSection>
  );
};
