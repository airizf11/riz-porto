// src/components/ProjectDetailContent.tsx
"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { ExternalLink, Github } from "lucide-react";
import { TechStackItem } from "./TechStackItem";
import type { Database } from "@/types/supabase";

type Project = Database["public"]["Tables"]["projects"]["Row"];

interface ProjectDetailContentProps {
  project: Project;
}

export function ProjectDetailContent({ project }: ProjectDetailContentProps) {
  const stackArray = project.stack
    ? project.stack.split(",").map((s) => s.trim())
    : [];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: "easeInOut" }}
    >
      <div className="mb-8 text-sm text-light/60">
        <Link href="/" className="hover:text-light transition-colors">
          Home
        </Link>
        <span className="mx-2">/</span>
        <Link href="/projects" className="hover:text-light transition-colors">
          Projects
        </Link>
        <span className="mx-2">/</span>
        <span className="text-light font-semibold">{project.name}</span>
      </div>

      <div className="text-center mb-12">
        <h1 className="heading text-4xl md:text-6xl text-accent mb-4">
          {project.name}
        </h1>
        <p className="narrative text-xl text-light/80">{project.description}</p>
      </div>

      {project.image_url && (
        <motion.div
          className="relative aspect-video rounded-xl overflow-hidden shadow-2xl border-2 border-light/10 mb-12"
          whileHover={{ scale: 1.02, transition: { duration: 0.3 } }}
        >
          <Image
            src={project.image_url}
            alt={`Preview of ${project.name}`}
            fill
            sizes="(max-width: 768px) 100vw, 896px"
            className="object-cover"
            priority
          />
        </motion.div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
        <div className="md:col-span-2">
          <h2 className="heading text-2xl text-secondary mb-4 border-l-4 border-secondary pl-4">
            About This Project
          </h2>
          <article className="prose prose-invert prose-lg max-w-none text-light/90">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {project.case_study ||
                "Detail studi kasus untuk proyek ini akan segera ditambahkan."}
            </ReactMarkdown>
          </article>
        </div>

        <div className="md:col-span-1">
          <aside className="sticky top-24 flex flex-col gap-8 p-6 bg-dark/70 backdrop-blur-sm border border-light/10 rounded-xl">
            <div>
              <h3 className="heading text-2xl text-secondary mb-4">
                Tech Stack
              </h3>
              <ul className="flex flex-col gap-3">
                {stackArray.length > 0 ? (
                  stackArray.map((tech) => (
                    <TechStackItem key={tech} name={tech} />
                  ))
                ) : (
                  <p className="text-light/50 italic">
                    Tech stack not specified.
                  </p>
                )}
              </ul>
            </div>

            {(project.live_url || project.repo_url) && (
              <div>
                <h3 className="heading text-2xl text-secondary mt-6 mb-4">
                  Links
                </h3>
                <div className="flex flex-col gap-3">
                  {project.live_url && (
                    <a
                      href={project.live_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 px-5 py-3 bg-primary text-dark font-bold rounded-lg transition-transform hover:scale-105 active:scale-95"
                    >
                      <ExternalLink className="w-4 h-4" /> Live Demo
                    </a>
                  )}
                  {project.repo_url && (
                    <a
                      href={project.repo_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 px-5 py-3 border-2 border-light/50 text-light font-bold rounded-lg transition-colors hover:bg-light/10 active:bg-light/20"
                    >
                      <Github className="w-4 h-4" /> Source Code
                    </a>
                  )}
                </div>
              </div>
            )}
          </aside>
        </div>
      </div>
    </motion.div>
  );
}
