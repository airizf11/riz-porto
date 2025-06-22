// src/app/(admin)/mudir/projects/new/page.tsx
import { ProjectForm } from "@/components/admin/ProjectForm";

export default function NewProjectPage() {
  return (
    <div>
      <h2 className="text-3xl font-bold mb-8">Add New Project</h2>
      <ProjectForm />
    </div>
  );
}
