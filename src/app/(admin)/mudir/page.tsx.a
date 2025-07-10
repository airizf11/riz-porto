// src/app/(admin)/mudir/page.tsx
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { Edit, PlusCircle } from "lucide-react";
import { DeleteProjectButton } from "@/components/admin/DeleteProjectButton";

async function getProjects() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("projects")
    .select("id, slug, name, created_at, is_featured")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching projects for admin:", error);
    return [];
  }
  return data;
}

export default async function MudirDashboard() {
  const projects = await getProjects();

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold">Projects</h2>
        <Link
          href="/mudir/projects/new"
          className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-dark font-bold rounded-lg transition-transform hover:scale-105"
        >
          <PlusCircle className="w-5 h-5" />
          Add New Project
        </Link>
      </div>

      <div className="bg-dark rounded-lg border border-light/10">
        <table className="w-full text-left">
          <thead className="border-b border-light/10">
            <tr>
              <th className="p-4">Name</th>
              <th className="p-4">Featured</th>
              <th className="p-4">Created At</th>
              <th className="p-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {projects.map((project) => (
              <tr
                key={project.slug}
                className="border-b border-light/10 last:border-b-0"
              >
                <td className="p-4 font-semibold">{project.name}</td>
                <td className="p-4">{project.is_featured ? "Yes" : "No"}</td>
                <td className="p-4 text-light/70">
                  {new Date(project.created_at).toLocaleDateString()}
                </td>
                <td className="p-4">
                  <div className="flex justify-end items-center gap-6">
                    <Link
                      href={`/mudir/projects/${project.slug}`}
                      className="flex items-center gap-2 font-bold text-secondary hover:text-secondary/80 transition-colors"
                    >
                      <Edit className="w-4 h-4" /> Edit
                    </Link>
                    <DeleteProjectButton id={project.id} />
                  </div>
                </td>
              </tr>
            ))}
            {projects.length === 0 && (
              <tr>
                <td colSpan={4} className="text-center p-8 text-light/50">
                  No projects found. Add one to get started!
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
