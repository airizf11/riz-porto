// src/app/(public)/projects/[slug]/page.tsx
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { constructMetadata } from "@/lib/utils";
// import { getProjectBySlug } from "@/lib/data";
import { ProjectDetailContent } from "@/components/ProjectDetailContent";
import { getProjectBySlug } from "@/services/projects";

interface ProjectPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: ProjectPageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const project = await getProjectBySlug(resolvedParams.slug);

  if (!project) {
    return constructMetadata({ title: "Project Not Found", noIndex: true });
  }

  return constructMetadata({
    title: project.name,
    description: project.description,
    image: project.image_url || undefined,
  });
}

export default async function ProjectDetailPage({ params }: ProjectPageProps) {
  const resolvedParams = await params;

  // Fetch Data (Logic query & mapping udah diurus service)
  const project = await getProjectBySlug(resolvedParams.slug);

  if (!project) {
    notFound();
  }

  // Schema Markup for SEO
  const ProjectSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: project.name,
    applicationCategory: "DeveloperApplication",
    author: {
      "@type": "Person",
      name: "Riziyan",
    },
    description: project.description,
  };

  return (
    <main className="min-h-screen bg-background text-foreground">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(ProjectSchema) }}
      />
      <div className="container mx-auto max-w-5xl px-4 py-12 md:py-20">
        <ProjectDetailContent project={project} />
      </div>
    </main>
  );
}
