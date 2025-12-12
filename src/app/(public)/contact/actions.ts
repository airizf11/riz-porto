// src/app/(public)/contact/actions.ts
"use server";

import { supabase } from "@/lib/supabase";
import { revalidatePath } from "next/cache";
import { z } from "zod";

// 1. Definisikan Schema Validasi Zod
const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters."),
  email: z.string().email("Invalid email address."),
  message: z.string().min(10, "Message must be at least 10 characters."),
});

// 2. Definisikan Tipe State untuk UI
export type ContactFormState = {
  errors?: {
    name?: string[];
    email?: string[];
    message?: string[];
  };
  message: string;
  success: boolean; // Wajib ada boolean (true/false)
};

export async function submitContactForm(
  prevState: ContactFormState, // Tipe state sebelumnya
  formData: FormData // Payload dari form
): Promise<ContactFormState> {
  // Harus return tipe yang sama

  // A. Validasi Input
  const validatedFields = contactSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    message: formData.get("message"),
  });

  // B. Kalau Validasi Gagal
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Validation failed. Please check your inputs.",
      success: false,
    };
  }

  // C. Kirim ke Supabase
  const { error } = await supabase
    .from("contacts")
    .insert([validatedFields.data]);

  // D. Kalau Database Error
  if (error) {
    console.error("Supabase error:", error);
    return {
      message: "Failed to send message. Please try again later.",
      success: false,
    };
  }

  // E. Sukses!
  revalidatePath("/contact");
  return {
    message: "Message sent successfully! Thank you.",
    success: true,
    errors: {}, // Reset errors
  };
}
