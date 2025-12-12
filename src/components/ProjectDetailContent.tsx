// src/components/ProjectDetailContent.tsx
"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import { FaGithub } from "react-icons/fa6";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MarkdownRenderer } from "./MarkdownRenderer";
import type { Project } from "@/services/projects";

interface ProjectDetailContentProps {
  project: Project;
}

export function ProjectDetailContent({ project }: ProjectDetailContentProps) {
  // Service kita udah return stack sebagai string "React, Next.js", jadi aman di-split
  const stackArray = project.stack
    ? project.stack.split(",").map((s) => s.trim())
    : [];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: "easeInOut" }}
    >
      {/* Breadcrumb Navigation */}
      <div className="mb-8 flex items-center gap-2 text-sm text-muted-foreground">
        <Link href="/" className="hover:text-primary transition-colors">
          Home
        </Link>
        <span>/</span>
        <Link href="/projects" className="hover:text-primary transition-colors">
          Projects
        </Link>
        <span>/</span>
        <span className="text-foreground font-semibold truncate max-w-[200px]">
          {project.name}
        </span>
      </div>

      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="heading text-4xl md:text-6xl font-bold text-foreground mb-4">
          {project.name}
        </h1>
        <p className="narrative text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
          {project.description}
        </p>
      </div>

      {/* Featured Image */}
      {project.image_url && (
        <motion.div
          className="relative aspect-video w-full rounded-xl overflow-hidden shadow-2xl border border-border/50 bg-muted mb-16"
          whileHover={{ scale: 1.01, transition: { duration: 0.4 } }}
        >
          <Image
            src={project.image_url}
            alt={`Preview of ${project.name}`}
            fill
            sizes="(max-width: 1200px) 100vw, 1200px"
            className="object-cover"
            priority
          />
        </motion.div>
      )}

      {/* Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Main Content (Left) */}
        <div className="lg:col-span-2">
          <div className="flex items-center gap-4 mb-6 pb-4 border-b border-border">
            <h2 className="heading text-2xl font-bold text-secondary">
              Case Study
            </h2>
          </div>

          <div className="prose prose-lg prose-invert max-w-none text-muted-foreground">
            {/* Menggunakan 'project.content' bukan 'case_study' */}
            <MarkdownRenderer
              content={project.content || "Case study content is coming soon."}
            />
          </div>
        </div>

        {/* Sidebar (Right) */}
        <aside className="lg:col-span-1">
          <div className="sticky top-24 flex flex-col gap-8 p-6 bg-card/50 backdrop-blur-sm border border-border rounded-xl shadow-sm">
            {/* Tech Stack */}
            <div>
              <h3 className="heading text-lg font-bold text-foreground mb-4 flex items-center gap-2">
                Tech Stack
              </h3>
              <div className="flex flex-wrap gap-2">
                {stackArray.length > 0 ? (
                  stackArray.map((tech) => (
                    <Badge
                      key={tech}
                      variant="secondary"
                      className="px-3 py-1 text-sm"
                    >
                      {tech}
                    </Badge>
                  ))
                ) : (
                  <p className="text-sm text-muted-foreground italic">
                    Not specified.
                  </p>
                )}
              </div>
            </div>

            {/* Action Links */}
            {(project.live_url || project.repo_url) && (
              <div className="space-y-4 pt-4 border-t border-border">
                <h3 className="heading text-lg font-bold text-foreground mb-2">
                  Project Links
                </h3>

                {project.live_url && (
                  <Button
                    asChild
                    className="w-full rounded-lg font-bold"
                    size="lg"
                  >
                    <a
                      href={project.live_url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <ExternalLink className="w-4 h-4 mr-2" /> Live Demo
                    </a>
                  </Button>
                )}

                {project.repo_url && (
                  <Button
                    asChild
                    variant="outline"
                    className="w-full rounded-lg"
                    size="lg"
                  >
                    <a
                      href={project.repo_url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <FaGithub className="w-4 h-4 mr-2" /> Source Code
                    </a>
                  </Button>
                )}
              </div>
            )}
          </div>
        </aside>
      </div>
    </motion.div>
  );
}
