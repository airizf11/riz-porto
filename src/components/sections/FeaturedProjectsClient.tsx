// src/components/sections/FeaturedProjectsClient.tsx
"use client";

import Link from "next/link";
import { ArrowRight, FlaskConical } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ProjectCard } from "@/components/ProjectCard";

// Kita definisikan tipe data yang diharapkan UI
interface ProjectUI {
  id: string;
  slug: string;
  name: string;
  description: string;
  stack: string | null;
  image_url: string | null;
  live_url: string | null;
  repo_url: string | null;
}

export const FeaturedProjectsClient = ({
  projects,
}: {
  projects: ProjectUI[];
}) => {
  return (
    <section
      id="projects"
      className="relative w-full py-24 md:py-32 bg-background border-b border-border/40 overflow-hidden"
    >
      {/* Background Patterns */}
      <div className="absolute inset-0 bg-[radial-gradient(var(--border)_1px,transparent_1px)] [background-size:20px_20px] opacity-30 pointer-events-none" />
      <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-background to-transparent pointer-events-none" />
      <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-background to-transparent pointer-events-none" />

      <div className="container mx-auto max-w-6xl px-4 md:px-8 relative z-10">
        <div className="text-center mb-20 md:mb-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-sm font-bold tracking-widest text-primary uppercase mb-3">
              Selected Work
            </h2>
            <h3 className="heading text-3xl md:text-5xl font-bold text-foreground">
              Featured{" "}
              <span className="text-primary decoration-wavy underline decoration-primary/30 underline-offset-8">
                Projects
              </span>
            </h3>
            <p className="mt-4 text-muted-foreground max-w-2xl mx-auto text-lg">
              A curated selection of my technical experiments and
              production-ready applications.
            </p>
          </motion.div>
        </div>

        <div className="flex flex-col gap-24 md:gap-32">
          {projects.map((project, index) => (
            <motion.div
              key={project.slug}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
            >
              <ProjectCard
                project={project}
                orientation={index % 2 === 1 ? "right" : "left"}
              />
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mt-24 text-center"
        >
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            {/* Tombol Existing: All Projects */}
            <Button
              asChild
              size="lg"
              variant="secondary"
              className="rounded-full px-8 h-12 text-base font-bold w-full sm:w-auto shadow-lg shadow-primary/5"
            >
              <Link href="/projects">
                View All Projects <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </Button>

            {/* Tombol Baru: The Lab / Experiments */}
            <Button
              asChild
              size="lg"
              variant="outline" // Pake outline biar secondary visual-nya
              className="rounded-full px-8 h-12 text-base font-medium w-full sm:w-auto border-dashed border-border hover:border-accent transition-colors"
            >
              <Link href="/exp">
                Visit The Lab <FlaskConical className="ml-2 w-4 h-4" />
              </Link>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
