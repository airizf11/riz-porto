// src/app/(admin)/mudir/projects/[slug]/page.tsx
import { createClient } from "@/lib/supabase/server";
import { ProjectForm } from "@/components/admin/ProjectForm";
import { notFound } from "next/navigation";
import type { Database } from "@/types/supabase";

async function getProjectBySlug(slug: string) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("projects")
    .select("*")
    .eq("slug", slug)
    .single();

  if (error) {
    console.error(`Error fetching project for edit: ${slug}`, error);
    return null;
  }
  return data as Database["public"]["Tables"]["projects"]["Row"] | null;
}

interface EditProjectPageProps {
  params: Promise<{ slug: string }>;
}

export default async function EditProjectPage({
  params,
}: EditProjectPageProps) {
  const resolvedParams = await params;

  if (!resolvedParams?.slug) {
    notFound();
  }

  const project = await getProjectBySlug(resolvedParams.slug);

  if (!project) {
    notFound();
  }

  return (
    <div>
      <h2 className="text-3xl font-bold mb-8">
        Edit: <span className="text-accent">{project.name}</span>
      </h2>
      <ProjectForm project={project} />
    </div>
  );
}
