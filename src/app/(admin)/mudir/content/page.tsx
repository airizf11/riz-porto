// src/app/(admin)/mudir/content/page.tsx
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { Edit, PlusCircle } from "lucide-react";
import { DeleteContentButton } from "@/components/admin/DeleteContentButton";

async function getContentItems() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("content_items")
    .select("id, title, content_type, status, created_at")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching content items:", error);
    return [];
  }
  return data;
}

function ContentTypeBadge({ type }: { type: string }) {
  const typeStyles: { [key: string]: string } = {
    project: "bg-blue-900/50 text-blue-300 border-blue-500/30",
    article: "bg-green-900/50 text-green-300 border-green-500/30",
    quote: "bg-purple-900/50 text-purple-300 border-purple-500/30",
    review: "bg-yellow-900/50 text-yellow-300 border-yellow-500/30",
  };
  return (
    <span
      className={`px-2 py-1 text-xs font-semibold rounded-full border ${
        typeStyles[type] || "bg-gray-700"
      }`}
    >
      {type.charAt(0).toUpperCase() + type.slice(1)}
    </span>
  );
}

function StatusBadge({ status }: { status: string }) {
  const statusStyles =
    status === "published" ? "text-green-400" : "text-yellow-400";
  return (
    <span className={`font-bold ${statusStyles}`}>
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
}

export default async function ContentListPage() {
  const items = await getContentItems();

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold">Content Management</h2>
        <Link
          href="/mudir/content/new"
          className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-dark font-bold rounded-lg transition-transform hover:scale-105"
        >
          <PlusCircle className="w-5 h-5" />
          Add New Content
        </Link>
      </div>

      <div className="bg-dark rounded-lg border border-light/10 overflow-hidden">
        <table className="w-full text-left">
          <thead className="border-b border-light/10 bg-dark/50">
            <tr>
              <th className="p-4">Title</th>
              <th className="p-4">Type</th>
              <th className="p-4">Status</th>
              <th className="p-4">Created At</th>
              <th className="p-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr
                key={item.id}
                className="border-b border-light/10 last:border-b-0 hover:bg-dark/70 transition-colors"
              >
                <td className="p-4 font-semibold">{item.title}</td>
                <td className="p-4">
                  <ContentTypeBadge type={item.content_type} />
                </td>
                <td className="p-4">
                  <StatusBadge status={item.status} />
                </td>
                <td className="p-4 text-light/70">
                  {new Date(item.created_at).toLocaleDateString()}
                </td>
                <td className="p-4">
                  <div className="flex justify-end items-center gap-6">
                    <Link
                      href={`/mudir/content/${item.id}`}
                      className="flex items-center gap-2 font-bold text-secondary hover:text-secondary/80 transition-colors"
                    >
                      <Edit className="w-4 h-4" /> Edit
                    </Link>
                    <DeleteContentButton id={item.id} />
                  </div>
                </td>
              </tr>
            ))}
            {items.length === 0 && (
              <tr>
                <td colSpan={5} className="text-center p-8 text-light/50">
                  No content found. Add one to get started!
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
