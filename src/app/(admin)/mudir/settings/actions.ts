// src/app/(admin)/mudir/settings/actions.ts
/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export type FormState = {
  message: string;
  success: boolean;
};

export async function updateSiteSettings(
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  const supabase = await createClient();

  const entries = Array.from(formData.entries()) as [string, string][];

  const updatePromises = entries.map(([key, value]) =>
    supabase.from("site_settings").update({ value: value }).eq("key", key)
  );

  try {
    const results = await Promise.all(updatePromises);

    const firstError = results.find((result) => result.error);
    if (firstError) {
      throw firstError.error;
    }

    revalidatePath("/");
    revalidatePath("/about");

    return { message: "Settings updated successfully!", success: true };
  } catch (error: any) {
    return {
      message: `Error updating settings: ${error.message}`,
      success: false,
    };
  }
}
