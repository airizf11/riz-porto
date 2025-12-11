// src/app/(public)/contact/actions.ts
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { supabase } from "@/lib/supabase";
import { revalidatePath } from "next/cache";
import { z } from "zod";

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters."),
  email: z.string().email("Invalid email address."),
  message: z.string().min(10, "Message must be at least 10 characters."),
});

export async function submitContactForm(prevState: any, formData: FormData) {
  const validatedFields = contactSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    message: formData.get("message"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Validation failed.",
    };
  }

  const { data, error } = await supabase
    .from("contacts")
    .insert([validatedFields.data]);

  if (error) {
    console.error("Supabase error:", error);
    return { message: "Failed to send message. Please try again later." };
  }

  revalidatePath("/contact");
  return { message: "Message sent successfully! Thank you.", success: true };
}
