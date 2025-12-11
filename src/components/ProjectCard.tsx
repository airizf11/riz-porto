// src/components/ProjectCard.tsx
import Image from "next/image";
import Link from "next/link";
import { ExternalLink, ArrowUpRight, Layers } from "lucide-react";

// Shadcn & Utils
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { FaGithub } from "react-icons/fa6";

// Definisi type biar aman (sesuai query Supabase lo)
type Project = {
  slug: string;
  name: string;
  description: string;
  stack: string | null;
  image_url: string | null;
  live_url: string | null;
  repo_url: string | null;
};

interface ProjectCardProps {
  project: Project;
  orientation?: "left" | "right";
}

export const ProjectCard = ({
  project,
  orientation = "left",
}: ProjectCardProps) => {
  const stackArray = project.stack
    ? project.stack.split(",").map((s) => s.trim())
    : [];

  // Logic buat nentuin urutan di desktop (Zig-Zag Layout)
  // Kalau orientation 'right', gambar pindah ke kanan (order-last)
  const imageOrderClass = orientation === "right" ? "md:order-last" : "";
  const textAlignClass =
    orientation === "right" ? "md:text-right" : "md:text-left";
  const itemsAlignClass =
    orientation === "right" ? "md:items-end" : "md:items-start";

  return (
    <Card className="border-none bg-transparent shadow-none">
      <CardContent className="p-0 grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
        {/* --- IMAGE SECTION --- */}
        <div className={cn("group relative w-full", imageOrderClass)}>
          <Link href={`/projects/${project.slug}`} className="block w-full">
            <div className="relative aspect-video w-full overflow-hidden rounded-xl border border-border/50 bg-muted shadow-lg transition-all duration-500 hover:shadow-xl hover:shadow-primary/5 hover:border-primary/50">
              {project.image_url ? (
                <Image
                  src={project.image_url}
                  alt={`Preview of ${project.name}`}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
              ) : (
                // Fallback kalau ga ada gambar
                <div className="flex h-full w-full items-center justify-center bg-card">
                  <Layers className="h-12 w-12 text-muted-foreground/20" />
                </div>
              )}

              {/* Overlay Hover Effect */}
              <div className="absolute inset-0 bg-background/60 opacity-0 transition-opacity duration-300 group-hover:opacity-100 flex items-center justify-center backdrop-blur-[2px]">
                <Button
                  variant="secondary"
                  className="rounded-full pointer-events-none"
                >
                  View Case Study
                </Button>
              </div>
            </div>
          </Link>
        </div>

        {/* --- CONTENT SECTION --- */}
        <div
          className={cn(
            "flex flex-col gap-4 text-center",
            textAlignClass,
            itemsAlignClass
          )}
        >
          {/* Header */}
          <div>
            <Link
              href={`/projects/${project.slug}`}
              className="group/title inline-flex items-center gap-2"
            >
              <h3 className="heading text-3xl font-bold text-foreground transition-colors group-hover/title:text-primary">
                {project.name}
              </h3>
              <ArrowUpRight className="w-6 h-6 text-muted-foreground opacity-0 -translate-x-2 translate-y-2 transition-all group-hover/title:opacity-100 group-hover/title:translate-x-0 group-hover/title:translate-y-0" />
            </Link>
          </div>

          {/* Description */}
          <p className="text-muted-foreground text-lg leading-relaxed max-w-lg">
            {project.description}
          </p>

          {/* Tech Stack Badges */}
          <div
            className={cn(
              "flex flex-wrap gap-2 my-2 justify-center",
              orientation === "right" ? "md:justify-end" : "md:justify-start"
            )}
          >
            {stackArray.map((tech, index) => (
              <Badge
                key={`${tech}-${index}`} // Ganti key jadi unik
                variant="secondary"
                className="px-3 py-1 text-xs font-medium bg-secondary/50 hover:bg-secondary text-secondary-foreground border-transparent"
              >
                {tech}
              </Badge>
            ))}
          </div>

          {/* Action Buttons */}
          <div
            className={cn(
              "flex items-center gap-3 mt-4 justify-center",
              orientation === "right" ? "md:justify-end" : "md:justify-start"
            )}
          >
            {/* Primary Action */}
            <Button
              asChild
              className="rounded-full font-bold shadow-md shadow-primary/20"
            >
              <Link href={`/projects/${project.slug}`}>See Details</Link>
            </Button>

            {/* Live Demo */}
            {project.live_url && (
              <Button
                asChild
                variant="outline"
                className="rounded-full border-primary/20 hover:bg-primary/5 hover:text-primary hover:border-primary/50"
              >
                <a
                  href={project.live_url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <ExternalLink className="mr-2 h-4 w-4" /> Visit
                </a>
              </Button>
            )}

            {/* Repo Link (Icon Only) */}
            {project.repo_url && (
              <Button
                asChild
                variant="ghost"
                size="icon"
                className="rounded-full text-muted-foreground hover:text-foreground"
              >
                <a
                  href={project.repo_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="View Source Code"
                >
                  <FaGithub className="h-5 w-5" />
                </a>
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
