// src/app/projects/[slug]/page.tsx
import { supabase } from "@/lib/supabase";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ExternalLink, Github, ArrowLeft } from "lucide-react";
import type { Metadata } from "next";
import { marked } from "marked";

interface ProjectPageProps {
  params?: Promise<{
    slug: string;
  }>;
}

type Project = {
  name: string;
  description: string;
  stack: string | null;
  image_url: string | null;
  live_url: string | null;
  repo_url: string | null;
  case_study: string | null;
};

async function getProject(slug: string): Promise<Project | null> {
  const { data, error } = await supabase
    .from("projects")
    .select(
      "name, description, stack, image_url, live_url, repo_url, case_study"
    )
    .eq("slug", slug)
    .single();

  if (error || !data) {
    return null;
  }
  return data;
}

export async function generateMetadata({
  params,
}: ProjectPageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const slug = resolvedParams?.slug;

  if (!slug) {
    return {
      title: "Project Not Found",
    };
  }

  const project = await getProject(slug);

  if (!project) {
    return {
      title: "Project Not Found",
    };
  }

  return {
    title: `${project.name} | Riziyan's Portfolio`,
    description: project.description,
  };
}

export default async function ProjectDetailPage({ params }: ProjectPageProps) {
  const resolvedParams = await params;
  const slug = resolvedParams?.slug;

  if (!slug) {
    notFound();
  }

  const project = await getProject(slug);

  if (!project) {
    notFound();
  }

  const stackArray = project.stack
    ? project.stack.split(",").map((s) => s.trim())
    : [];

  const caseStudyHtml = project.case_study
    ? await marked.parse(project.case_study)
    : "<p>Detail studi kasus untuk proyek ini akan segera ditambahkan.</p>";

  const ProjectSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: project.name,
    applicationCategory: "DeveloperApplication",
    author: {
      "@type": "Person",
      name: "Riziyan",
      url: "https://akuriziyan.vercel.app",
    },
    description: project.description,
  };

  return (
    <main className="min-h-screen bg-dark text-light">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(ProjectSchema) }}
      />

      <div className="container mx-auto max-w-4xl px-4 py-12 md:py-20">
        <Link
          href="/#projects"
          className="group inline-flex items-center gap-2 text-light/70 hover:text-light mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
          Back to All Projects
        </Link>

        <div className="text-center mb-12">
          <h1 className="heading text-4xl md:text-6xl text-accent mb-4">
            {project.name}
          </h1>
          <p className="narrative text-xl text-light/80">
            {project.description}
          </p>
        </div>

        {project.image_url && (
          <div className="relative aspect-video rounded-xl overflow-hidden shadow-2xl border-2 border-light/10 mb-12">
            <Image
              src={project.image_url}
              alt={`Preview of ${project.name}`}
              fill
              sizes="(max-width: 768px) 100vw, 896px"
              className="object-cover"
            />
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <h2 className="heading text-2xl text-secondary mb-4">
              About This Project
            </h2>
            <div
              className="prose prose-invert prose-lg text-light/90"
              dangerouslySetInnerHTML={{ __html: caseStudyHtml }}
            ></div>
          </div>

          <div className="flex flex-col gap-4">
            <h3 className="heading text-2xl text-secondary mb-2">Tech Stack</h3>
            <div className="flex flex-wrap gap-2">
              {stackArray.map((tech) => (
                <span
                  key={tech}
                  className="text-sm bg-secondary/50 text-light px-3 py-1 rounded-full"
                >
                  {tech}
                </span>
              ))}
            </div>

            <h3 className="heading text-2xl text-secondary mt-6 mb-2">Links</h3>
            <div className="flex flex-col gap-3">
              {project.live_url && (
                <a
                  href={project.live_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2 bg-primary text-dark font-bold rounded-lg transition-transform hover:scale-105 active:scale-95"
                >
                  <ExternalLink className="w-4 h-4" /> Live Demo
                </a>
              )}
              {project.repo_url && (
                <a
                  href={project.repo_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2 border-2 border-light/50 text-light font-bold rounded-lg transition-colors hover:bg-light/10 active:bg-light/20"
                >
                  <Github className="w-4 h-4" /> Source Code
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
