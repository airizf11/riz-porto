// src/app/(admin)/mudir/projects/actions.ts
"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";

export type FormState = {
  errors?: {
    id?: string[];
    name?: string[];
    slug?: string[];
    description?: string[];
    stack?: string[];
    image_url?: string[];
    live_url?: string[];
    repo_url?: string[];
    case_study?: string[];
    is_featured?: string[];
    order_index?: string[];
  };
  message: string | null;
};

const projectSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(3, "Name is required"),
  slug: z
    .string()
    .min(3, "Slug is required")
    .regex(
      /^[a-z0-9-]+$/,
      "Slug can only contain lowercase letters, numbers, and hyphens"
    ),
  description: z.string().min(10, "Description is required"),
  stack: z.string().optional(),
  image_url: z.string().url("Must be a valid URL").optional().or(z.literal("")),
  live_url: z.string().url("Must be a valid URL").optional().or(z.literal("")),
  repo_url: z.string().url("Must be a valid URL").optional().or(z.literal("")),
  case_study: z.string().optional(),
  is_featured: z.preprocess((val) => val === "on", z.boolean()),
  order_index: z.coerce.number().optional(),
});

export async function createOrUpdateProject(
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  const supabase = await createClient();

  const validatedFields = projectSchema.safeParse(
    Object.fromEntries(formData.entries())
  );

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Validation failed.",
    };
  }

  const { id, ...projectData } = validatedFields.data;

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { message: "Not authenticated" };

  if (id) {
    const { error } = await supabase
      .from("projects")
      .update(projectData)
      .eq("id", id);
    if (error) return { message: `Database Error: ${error.message}` };
  } else {
    const { error } = await supabase.from("projects").insert(projectData);
    if (error) return { message: `Database Error: ${error.message}` };
  }

  revalidatePath("/");
  revalidatePath("/projects");
  revalidatePath(`/projects/${projectData.slug}`);

  redirect("/mudir/projects");
}

export async function deleteProject(id: string) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    throw new Error("Not authenticated");
  }

  const { error } = await supabase.from("projects").delete().eq("id", id);

  if (error) {
    console.error("Supabase delete error:", error);
    throw new Error("Failed to delete project.");
  }

  revalidatePath("/");
  revalidatePath("/projects");
  revalidatePath("/mudir/projects");
}
