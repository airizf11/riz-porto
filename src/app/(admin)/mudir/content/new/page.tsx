// src/app/(admin)/mudir/content/new/page.tsx
import { ContentForm } from "@/components/admin/ContentForm";

export default function NewContentPage() {
  return (
    <div>
      <h2 className="text-3xl font-bold mb-8">Add New Content</h2>
      <ContentForm />
    </div>
  );
}
