// src/app/(admin)/mudir/aichat/actions.ts
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use server";

import { createClient } from "@/lib/supabase/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { revalidatePath } from "next/cache";
import { z } from "zod";

// Tipe untuk state form, untuk memberikan feedback ke UI di client
export type GenerateEmbeddingsState = {
  message: string;
  success: boolean;
  processedCount: number;
};

// Fungsi untuk membagi teks menjadi potongan-potongan kecil (chunking)
// Ini penting karena model embedding memiliki batas input.
function chunkText(text: string, chunkSize = 500, overlap = 50): string[] {
  const chunks: string[] = [];
  if (!text) return chunks;

  let i = 0;
  while (i < text.length) {
    chunks.push(text.substring(i, i + chunkSize));
    i += chunkSize - overlap;
  }
  return chunks;
}

// === FUNGSI UNTUK MANAJEMEN PENGETAHUAN MANUAL ===

// 1. Menambah Pengetahuan Manual Baru
export async function addManualKnowledge(formData: FormData) {
  const contentSchema = z
    .string()
    .min(10, "Content must be at least 10 characters.");
  const validation = contentSchema.safeParse(formData.get("content"));

  if (!validation.success) {
    throw new Error(validation.error.errors[0].message);
  }

  const supabase = await createClient();
  const { error } = await supabase
    .from("manual_knowledge")
    .insert({ content: validation.data });

  if (error) throw new Error(`Failed to add knowledge: ${error.message}`);

  revalidatePath("/mudir/aichat"); // Revalidasi halaman admin untuk menampilkan data baru
}

// 2. Menghapus Pengetahuan Manual
export async function deleteManualKnowledge(id: string) {
  if (!id) throw new Error("Invalid ID for deletion.");

  const supabase = await createClient();
  const { error } = await supabase
    .from("manual_knowledge")
    .delete()
    .eq("id", id);

  if (error) throw new Error(`Failed to delete knowledge: ${error.message}`);

  revalidatePath("/mudir/aichat");
}

// 3. Mengupdate Pengetahuan Manual
export async function updateManualKnowledge(formData: FormData) {
  const id = formData.get("id") as string;
  const content = formData.get("content") as string;

  if (!id || !content || content.trim().length < 10) {
    throw new Error("Invalid data for update.");
  }

  const supabase = await createClient();
  const { error } = await supabase
    .from("manual_knowledge")
    .update({ content })
    .eq("id", id);

  if (error) throw new Error(`Failed to update knowledge: ${error.message}`);

  revalidatePath("/mudir/aichat");
}

// === FUNGSI UTAMA UNTUK GENERATE EMBEDDINGS ===

export async function generateEmbeddings(
  prevState: GenerateEmbeddingsState,
  formData: FormData
): Promise<GenerateEmbeddingsState> {
  const apiKey = process.env.GOOGLE_API_KEY;
  if (!apiKey) {
    return {
      message: "Google API Key is not configured.",
      success: false,
      processedCount: 0,
    };
  }

  const genAI = new GoogleGenerativeAI(apiKey);
  const embeddingModel = genAI.getGenerativeModel({
    model: "text-embedding-004",
  });
  const supabase = await createClient();

  try {
    // Hapus SEMUA embedding lama untuk memulai dari awal yang bersih
    // Ini adalah cara paling sederhana untuk memastikan konsistensi.
    const { error: deleteError } = await supabase
      .from("embeddings")
      .delete()
      .neq("id", "00000000-0000-0000-0000-000000000000");
    if (deleteError)
      throw new Error(`Could not clear old embeddings: ${deleteError.message}`);

    // Ambil semua sumber data secara paralel
    const [{ data: contentItems }, { data: manualItems }] = await Promise.all([
      supabase
        .from("content_items")
        .select("id, title, content, excerpt")
        .in("content_type", ["project", "article", "review"]),
      supabase.from("manual_knowledge").select("id, content"),
    ]);

    const embeddingsToInsert = [];

    // Proses content_items (proyek, artikel, dll.)
    for (const item of contentItems || []) {
      const combinedText = `Title: ${item.title}\nDescription: ${
        item.excerpt
      }\n\n${item.content || ""}`;
      const chunks = chunkText(combinedText);
      for (const chunk of chunks) {
        const result = await embeddingModel.embedContent(chunk);
        embeddingsToInsert.push({
          content_item_id: item.id,
          content: chunk,
          embedding: result.embedding.values,
        });
      }
    }

    // Proses manual_knowledge
    for (const item of manualItems || []) {
      // Untuk data manual, kita tidak perlu menggabungkan apa-apa
      const chunks = chunkText(item.content);
      for (const chunk of chunks) {
        const result = await embeddingModel.embedContent(chunk);
        embeddingsToInsert.push({
          content_item_id: null, // content_item_id adalah null untuk data manual
          content: chunk,
          embedding: result.embedding.values,
        });
      }
    }

    // Simpan semua embedding baru ke database dalam satu batch
    if (embeddingsToInsert.length > 0) {
      // Supabase memiliki batas sekitar 1000 baris per insert, jadi kita bisa pecah jika perlu
      // Untuk sekarang, kita asumsikan jumlahnya masih di bawah itu.
      const { error: insertError } = await supabase
        .from("embeddings")
        .insert(embeddingsToInsert);
      if (insertError)
        throw new Error(`Failed to insert embeddings: ${insertError.message}`);
    }

    return {
      message: `Successfully generated and stored ${embeddingsToInsert.length} knowledge chunks from all sources.`,
      success: true,
      processedCount: embeddingsToInsert.length,
    };
  } catch (error: any) {
    return {
      message: `An error occurred: ${error.message}`,
      success: false,
      processedCount: 0,
    };
  }
}
