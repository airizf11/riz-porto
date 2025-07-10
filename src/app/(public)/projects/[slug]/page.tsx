// src/app/(public)/projects/[slug]/page.tsx
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { constructMetadata } from "@/lib/metadata";
import { getProjectBySlug } from "@/lib/data";
import { ProjectDetailContent } from "@/components/ProjectDetailContent";

interface ProjectPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: ProjectPageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const slug = resolvedParams?.slug;

  if (!slug) {
    return constructMetadata({ title: "Project Not Found" });
  }

  const project = await getProjectBySlug(slug);

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
  const slug = resolvedParams?.slug;

  if (!slug) {
    notFound();
  }

  const project = await getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

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
        <ProjectDetailContent project={project} />
      </div>
    </main>
  );
}
