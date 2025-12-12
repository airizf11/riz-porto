// src/services/content.ts
/* eslint-disable @typescript-eslint/no-explicit-any */
import { createClient } from "@/lib/supabase/server";
import { cache } from "react";

// --- TYPES DEFINITION ---

export type Tag = {
  id: string;
  name: string;
  slug: string;
  tag_type: "tech" | "topic";
};

export type ContentItem = {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string; // Markdown content
  content_type: "article" | "project" | "experiment" | "quote" | "review";
  cover_image_url: string | null;
  created_at: string;
  updated_at: string;
  author_name?: string; // Khusus Quote
  tags: Tag[]; // Array tag yang sudah dirapikan
};

// Tipe khusus untuk Settings (Key-Value dari DB)
export type SiteSettings = Record<string, string>;

// --- HELPERS ---

// Helper untuk merapikan nested tags dari Supabase join
function transformContentData(row: any): ContentItem {
  return {
    ...row,
    // Flatten tags: dari [{ tags: {...} }] menjadi [{...}]
    tags: row.content_tags
      ? row.content_tags.map((ct: any) => ct.tags).filter(Boolean)
      : [],
  };
}

// --- SERVICE FUNCTIONS ---

/**
 * 1. GET SETTINGS: Ambil konfigurasi situs (Hero text, About text, dll)
 * Mengubah array [{key, value}] menjadi object { key: value } biar gampang dipake.
 */
export const getSiteSettings = cache(async (): Promise<SiteSettings> => {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("site_settings")
    .select("key, value");

  if (error) {
    console.error("[Service Error] getSiteSettings:", error.message);
    return {};
  }

  // Transform Array to Object
  const settings: SiteSettings = (data || []).reduce((acc, curr) => {
    acc[curr.key] = curr.value;
    return acc;
  }, {} as SiteSettings);

  return settings;
});

/**
 * 2. GET QUOTES: Ambil quotes untuk QuoteSection
 */
export const getPublishedQuotes = cache(async () => {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("content_items")
    .select("title, author_name")
    .eq("content_type", "quote")
    .eq("status", "published");

  if (error) {
    console.error("[Service Error] getPublishedQuotes:", error.message);
    return [];
  }

  return data || [];
});

/**
 * 3. GET ARTICLES: Ambil semua artikel blog
 */
export const getAllArticles = cache(async (): Promise<ContentItem[]> => {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("content_items")
    .select(
      `
      *,
      content_tags (
        tags (id, name, slug, tag_type)
      )
    `
    )
    .eq("content_type", "article")
    .eq("status", "published")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("[Service Error] getAllArticles:", error.message);
    return [];
  }

  return (data || []).map(transformContentData);
});

/**
 * 4. GET EXPERIMENTS: Ambil data eksperimen (Labs)
 */
export const getExperiments = cache(async (): Promise<ContentItem[]> => {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("content_items")
    .select(
      `
      *,
      content_tags (
        tags (id, name, slug, tag_type)
      )
    `
    )
    .eq("content_type", "experiment")
    .eq("status", "published")
    .order("order_index", { ascending: true }); // Experiment biasanya butuh urutan manual

  if (error) {
    console.error("[Service Error] getExperiments:", error.message);
    return [];
  }

  return (data || []).map(transformContentData);
});

/**
 * 5. GET DETAIL: Ambil satu konten (Artikel/Project/Exp) berdasarkan Slug
 */
export const getContentBySlug = cache(
  async (slug: string, type?: string): Promise<ContentItem | null> => {
    const supabase = await createClient();

    // 1. Buat Query Dasar (JANGAN panggil .single() dulu disini)
    let query = supabase
      .from("content_items")
      .select(
        `
        *,
        content_tags (
          tags (id, name, slug, tag_type)
        )
      `
      )
      .eq("slug", slug)
      .eq("status", "published");

    // 2. Tambahkan Filter Kondisional (Sekarang bisa karena belum di-single)
    if (type) {
      query = query.eq("content_type", type);
    }

    // 3. Baru panggil .single() saat eksekusi
    const { data, error } = await query.single();

    if (error) {
      if (error.code !== "PGRST116") {
        console.error(
          `[Service Error] getContentBySlug (${slug}):`,
          error.message
        );
      }
      return null;
    }

    return transformContentData(data);
  }
);

/**
 * 6. GET UNIFIED STREAM: Ambil SEMUA konten (Article, Project, Exp, Quote, Review)
 * Diurutkan dari yang paling baru (timeline style).
 */
export const getUnifiedStream = cache(async (): Promise<ContentItem[]> => {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("content_items")
    .select(
      `
      *,
      content_tags (
        tags (id, name, slug, tag_type)
      )
    `
    )
    .eq("status", "published")
    // Urutkan berdasarkan created_at desc (Terbaru di atas)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("[Service Error] getUnifiedStream:", error.message);
    return [];
  }

  return (data || []).map(transformContentData);
});

/**
 * 7. GET ALL TAGS: Ambil semua tag + hitung jumlah kontennya
 * Dipakai di halaman /tags
 */
export type TagWithCount = Tag & { count: number };

export const getAllTags = cache(async (): Promise<TagWithCount[]> => {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("tags")
    .select("*, content_tags(count)");

  if (error) {
    console.error("[Service Error] getAllTags:", error.message);
    return [];
  }

  return (data || []).map((tag: any) => ({
    id: tag.id,
    name: tag.name,
    slug: tag.slug,
    tag_type: tag.tag_type,
    // Ambil jumlah count dari relasi
    count: tag.content_tags?.[0]?.count || 0,
  }));
});

/**
 * 8. GET CONTENT BY TAG: Ambil detail tag & semua konten di dalamnya
 * Dipakai di halaman /tags/[slug]
 */
export const getContentByTag = cache(async (slug: string) => {
  const supabase = await createClient();

  // A. Ambil Info Tag
  const { data: tagData, error: tagError } = await supabase
    .from("tags")
    .select("*")
    .eq("slug", slug)
    .single();

  if (tagError || !tagData) return null;

  // B. Ambil Content yang punya tag ini via tabel junction 'content_tags'
  const { data: contentData, error: contentError } = await supabase
    .from("content_tags")
    .select(
      `
      content_items (
        *,
        content_tags ( tags (id, name, slug, tag_type) )
      )
    `
    )
    .eq("tag_id", tagData.id)
    .eq("content_items.status", "published"); // Pastikan cuma ambil yang published

  if (contentError) {
    console.error("[Service Error] getContentByTag:", contentError.message);
    return null;
  }

  // C. Bersihkan Struktur Data
  const items = (contentData || [])
    .map((row: any) => row.content_items)
    // Filter null (jika ada content yang draft/deleted tapi relasi masih ada)
    .filter((item: any) => item !== null)
    .map(transformContentData); // Reuse helper sakti kita

  return {
    tag: tagData as Tag,
    items: items as ContentItem[],
  };
});
