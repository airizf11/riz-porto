// src/app/(admin)/mudir/links/actions.ts
"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { z } from "zod";

const quickLinkSchema = z.object({
  id: z.string().uuid().optional(),
  title: z.string().min(2, "Title is required"),
  url: z.string().url("Must be a valid URL"),
  description: z.string().optional(),
  image_url: z.string().url("Must be a valid URL").optional().or(z.literal("")),
  icon_id: z.string().optional(),
  order_index: z.coerce.number().default(99),
  is_active: z.preprocess((val) => val === "on", z.boolean()),
  is_highlighted: z.preprocess((val) => val === "on", z.boolean()),
});

export async function createOrUpdateQuickLink(formData: FormData) {
  const validatedFields = quickLinkSchema.safeParse(
    Object.fromEntries(formData.entries())
  );

  if (!validatedFields.success) {
    throw new Error(
      `Validation failed: ${JSON.stringify(
        validatedFields.error.flatten().fieldErrors
      )}`
    );
  }

  const supabase = await createClient();
  const { id, ...linkData } = validatedFields.data;

  const { error } = id
    ? await supabase.from("quick_links").update(linkData).eq("id", id)
    : await supabase.from("quick_links").insert(linkData);

  if (error) {
    throw new Error(`Database Error: ${error.message}`);
  }

  revalidatePath("/links");
}

export async function deleteQuickLink(id: string) {
  const supabase = await createClient();
  const { error } = await supabase.from("quick_links").delete().eq("id", id);

  if (error) {
    throw new Error(`Failed to delete link: ${error.message}`);
  }
  revalidatePath("/links");
}
