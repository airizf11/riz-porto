// src/app/(admin)/mudir/socials/page.tsx
import { createClient } from "@/lib/supabase/server";
import { createOrUpdateSocialLink, deleteSocialLink } from "./actions";
import { Trash2 } from "lucide-react";

async function getSocialLinks() {
  const supabase = await createClient();
  const { data } = await supabase
    .from("social_links")
    .select("*")
    .order("order_index", { ascending: true });
  return data ?? [];
}

export default async function SocialLinksPage() {
  const links = await getSocialLinks();

  return (
    <div className="space-y-12">
      <div>
        <h2 className="text-3xl font-bold">Manage Social Links</h2>
        <p className="text-light/60 mt-2">
          Add, edit, and reorder your social media and professional links.
        </p>
      </div>

      <div className="bg-dark p-6 rounded-lg border border-light/10">
        <h3 className="text-xl font-bold mb-4">Add New Link</h3>
        <form
          action={createOrUpdateSocialLink}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
        >
          <input
            type="text"
            name="name"
            placeholder="Name (e.g., GitHub)"
            className="p-2 bg-neutral-800 rounded"
            required
          />
          <input
            type="url"
            name="url"
            placeholder="URL"
            className="p-2 bg-neutral-800 rounded"
            required
          />
          <input
            type="text"
            name="description"
            placeholder="Description"
            className="p-2 bg-neutral-800 rounded"
          />
          <input
            type="url"
            name="image_url"
            placeholder="Image URL"
            className="p-2 bg-neutral-800 rounded"
          />
          <input
            type="text"
            name="icon_id"
            placeholder="Icon ID (e.g., FaGithub)"
            className="p-2 bg-neutral-800 rounded"
          />
          <input
            type="text"
            name="category"
            placeholder="Category (e.g., Code & Professional)"
            className="p-2 bg-neutral-800 rounded"
            required
          />
          <input
            type="number"
            name="order_index"
            placeholder="Order"
            defaultValue={99}
            className="p-2 bg-neutral-800 rounded"
          />
          <button
            type="submit"
            className="bg-primary text-dark font-bold rounded-lg lg:col-span-3"
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
              className="flex items-center gap-4 bg-dark/50 p-4 rounded-lg border border-light/10"
            >
              <div className="flex-grow">
                <p className="font-bold">
                  {link.name}{" "}
                  <span className="text-xs text-light/50">
                    ({link.category})
                  </span>
                </p>
                <p className="text-sm text-light/70">{link.url}</p>
              </div>
              <form action={deleteSocialLink.bind(null, link.id)}>
                <button
                  type="submit"
                  className="text-red-500 hover:text-red-400 p-2"
                >
                  <Trash2 size={18} />
                </button>
              </form>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
