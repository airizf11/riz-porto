// src/app/(admin)/mudir/socials/actions.ts
"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { z } from "zod";

const socialLinkSchema = z.object({
  id: z.string().uuid().optional(),
  name: z.string().min(2, "Name is required"),
  url: z.string().url("Must be a valid URL"),
  description: z.string().optional(),
  image_url: z.string().url("Must be a valid URL").optional().or(z.literal("")),
  icon_id: z.string().optional(),
  category: z.string().min(2, "Category is required"),
  order_index: z.coerce.number().default(99),
});

export async function createOrUpdateSocialLink(formData: FormData) {
  const validatedFields = socialLinkSchema.safeParse(
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

  if (id) {
    const { error } = await supabase
      .from("social_links")
      .update(linkData)
      .eq("id", id);
    if (error) throw new Error(`Failed to update link: ${error.message}`);
  } else {
    const { error } = await supabase.from("social_links").insert(linkData);
    if (error) throw new Error(`Failed to create link: ${error.message}`);
  }

  revalidatePath("/");
}

export async function deleteSocialLink(id: string) {
  const supabase = await createClient();
  const { error } = await supabase.from("social_links").delete().eq("id", id);
  if (error) throw new Error(`Failed to delete link: ${error.message}`);
  revalidatePath("/");
}
