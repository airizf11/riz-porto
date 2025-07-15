// src/app/(public)/exp/projects/[slug]/page.tsx
/* eslint-disable @typescript-eslint/no-explicit-any */
import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { MarkdownRenderer } from "@/components/MarkdownRenderer";
import { ExternalLink, Github, Layers } from "lucide-react";
import type { Database } from "@/types/supabase";

interface ProjectPageProps {
  params: Promise<{ slug: string }>;
}

type ProjectWithTags = Database["public"]["Tables"]["content_items"]["Row"] & {
  tags: Database["public"]["Tables"]["tags"]["Row"][] | null;
};

export async function generateMetadata({
  params,
}: ProjectPageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const project = await getProjectBySlug(resolvedParams.slug);

  if (!project) return { title: "Project Not Found" };

  return {
    title: `${project.title} | Riziyan's Project`,
    description: project.excerpt,
    openGraph: {
      title: project.title ?? undefined,
      description: project.excerpt || "",
      images: project.cover_image_url ? [project.cover_image_url] : [],
    },
  };
}

async function getProjectBySlug(slug: string): Promise<ProjectWithTags | null> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("content_items")
    .select(`*, content_tags(tags(*))`)
    .eq("slug", slug)
    .eq("content_type", "project")
    .single();

  if (error) return null;

  const transformedData = {
    ...data,
    tags: data.content_tags.map((item: any) => item.tags),
  };
  return transformedData;
}

function TechStackItem({ name }: { name: string }) {
  return (
    <li className="flex items-center gap-3 p-3 bg-dark/50 border border-light/10 rounded-lg">
      <Layers className="w-5 h-5 text-secondary" />
      <span className="font-medium text-light">{name}</span>
    </li>
  );
}

export default async function ProjectDetailPage({ params }: ProjectPageProps) {
  const resolvedParams = await params;
  const project = await getProjectBySlug(resolvedParams.slug);

  if (!project) notFound();

  const techStack = project.tags?.filter((t) => t.tag_type === "tech");

  return (
    <main className="min-h-screen bg-dark text-light">
      <div className="container mx-auto max-w-4xl px-4 py-12 md:py-20">
        <div className="mb-8 text-sm text-light/60">
          <Link href="/" className="hover:text-light">
            Home
          </Link>
          <span className="mx-2">/</span>
          <Link href="/exp/projects" className="hover:text-light">
            Projects
          </Link>
          <span className="mx-2">/</span>
          <span className="text-light font-semibold">{project.title}</span>
        </div>

        <header className="text-center mb-12">
          <h1 className="heading text-4xl md:text-6xl text-accent mb-4">
            {project.title}
          </h1>
          <p className="narrative text-xl text-light/80">{project.excerpt}</p>
        </header>

        {project.cover_image_url && (
          <div className="relative aspect-video rounded-xl overflow-hidden shadow-2xl border-2 border-light/10 mb-12">
            <Image
              src={project.cover_image_url}
              alt={`Preview of ${project.title}`}
              fill
              className="object-cover"
              priority
            />
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          <div className="md:col-span-2">
            <h2 className="heading text-2xl text-secondary mb-4 border-l-4 border-secondary pl-4">
              About This Project
            </h2>
            <MarkdownRenderer
              content={project.content || "Case study coming soon."}
            />
          </div>
          <aside className="md:col-span-1">
            <div className="sticky top-24 flex flex-col gap-8 p-6 bg-dark/70 backdrop-blur-sm border border-light/10 rounded-xl">
              {/* Bagian Tech Stack */}
              <div>
                <h3 className="heading text-2xl text-secondary mb-4">
                  Tech Stack
                </h3>
                <ul className="flex flex-col gap-3">
                  {techStack && techStack.length > 0 ? (
                    techStack.map((tech) => (
                      <TechStackItem key={tech.id} name={tech.name} />
                    ))
                  ) : (
                    <p className="text-light/50 italic">
                      Tech stack not specified.
                    </p>
                  )}
                </ul>
              </div>

              {/* Bagian Links */}
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
                        className="inline-flex items-center justify-center gap-2 px-5 py-3 bg-primary text-dark font-bold rounded-lg transition-transform hover:scale-105"
                      >
                        <ExternalLink className="w-4 h-4" /> Live Demo
                      </a>
                    )}
                    {project.repo_url && (
                      <a
                        href={project.repo_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-2 px-5 py-3 border-2 border-light/50 text-light font-bold rounded-lg hover:bg-light/10"
                      >
                        <Github className="w-4 h-4" /> Source Code
                      </a>
                    )}
                  </div>
                </div>
              )}
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}
