// src/app/(admin)/mudir/links/page.tsx
/* eslint-disable react/no-unescaped-entities */
import { createClient } from "@/lib/supabase/server";
import { createOrUpdateQuickLink, deleteQuickLink } from "./actions";
import { Trash2 } from "lucide-react";

async function getAllLinks() {
  const supabase = await createClient();
  const { data } = await supabase
    .from("quick_links")
    .select("*")
    .order("order_index", { ascending: true });
  return data ?? [];
}

export default async function ManageLinksPage() {
  const links = await getAllLinks();

  return (
    <div className="space-y-12">
      <div>
        <h2 className="text-3xl font-bold">Manage Quick Links</h2>
        <p className="text-light/60 mt-2">
          Add, edit, and reorder the links shown on your /links page.
        </p>
      </div>

      <div className="bg-dark p-6 rounded-lg border border-light/10">
        <h3 className="text-xl font-bold mb-4">Add New Link</h3>
        <form action={createOrUpdateQuickLink} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              name="title"
              placeholder="Title"
              className="p-2 bg-neutral-800 rounded border border-light/20 w-full"
              required
            />
            <input
              type="url"
              name="url"
              placeholder="URL"
              className="p-2 bg-neutral-800 rounded border border-light/20 w-full"
              required
            />
          </div>
          <textarea
            name="description"
            placeholder="Short Description (optional)"
            rows={2}
            className="p-2 bg-neutral-800 rounded border border-light/20 w-full"
          ></textarea>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              name="icon_id"
              placeholder="Icon ID (e.g., FaYoutube)"
              className="p-2 bg-neutral-800 rounded border border-light/20 w-full"
            />
            <input
              type="url"
              name="image_url"
              placeholder="Image URL (optional)"
              className="p-2 bg-neutral-800 rounded border border-light/20 w-full"
            />
          </div>
          <div className="flex items-center gap-6 pt-2">
            <input
              type="number"
              name="order_index"
              placeholder="Order"
              defaultValue={99}
              className="p-2 bg-neutral-800 rounded border border-light/20 w-24"
            />
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                name="is_active"
                defaultChecked
                className="h-5 w-5 rounded bg-neutral-700 text-secondary focus:ring-secondary"
              />{" "}
              Active
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                name="is_highlighted"
                className="h-5 w-5 rounded bg-neutral-700 text-accent focus:ring-accent"
              />{" "}
              Highlighted
            </label>
          </div>
          <button
            type="submit"
            className="w-full bg-primary text-dark font-bold rounded-lg py-3 mt-4"
          >
            Add Link
          </button>
        </form>
      </div>

      <div>
        <h3 className="text-xl font-bold mb-4">Existing Links</h3>
        <div className="space-y-4">
          {links.map((link) => (
            <div
              key={link.id}
              className={`flex items-center gap-4 p-4 rounded-lg border ${
                link.is_highlighted
                  ? "border-accent/50 bg-accent/10"
                  : "border-light/10 bg-dark/50"
              } ${!link.is_active ? "opacity-50" : ""}`}
            >
              <div className="flex-grow">
                <p className="font-bold">
                  {link.title}{" "}
                  <span className="text-xs text-light/50">
                    (Order: {link.order_index})
                  </span>
                </p>
                <p className="text-sm text-secondary truncate">{link.url}</p>
                {link.description && (
                  <p className="text-sm text-light/60 mt-1 fst-italic">
                    "{link.description}"
                  </p>
                )}
              </div>
              <form action={deleteQuickLink.bind(null, link.id)}>
                <button
                  type="submit"
                  className="text-red-500 hover:text-red-400 p-2"
                  title="Delete Link"
                >
                  <Trash2 size={18} />
                </button>
              </form>
            </div>
          ))}
          {links.length === 0 && (
            <p className="text-center text-light/50 py-8">
              No links found. Add one using the form above!
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
