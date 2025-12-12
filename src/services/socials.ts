// src/services/socials.ts
import { createClient } from "@/lib/supabase/server";
import { cache } from "react";

// 1. Definisi Tipe Data (Types)
// Kita HAPUS 'icon: React.ElementType' karena icon akan dideteksi otomatis di Client (SocialsClient)
export type SocialLinkItem = {
  name: string;
  url: string;
  desc: string;
  imageUrl: string | null;
};

export type SocialGroup = {
  category: string;
  color: string;
  links: SocialLinkItem[];
};

// 2. Helper: Warna Kategori
// Logic pewarnaan tetap di sini karena outputnya string (aman)
function getCategoryColor(category: string): string {
  switch (category) {
    case "Code & Professional":
      return "text-secondary"; // Biru
    case "Social Media":
      return "text-primary"; // Merah Brand
    case "Content Creation":
      return "text-accent"; // Kuning
    default:
      return "text-muted-foreground";
  }
}

/**
 * FETCH & GROUP: Ambil data social links dan kelompokkan by Category
 */
export const getGroupedSocialLinks = cache(async (): Promise<SocialGroup[]> => {
  const supabase = await createClient();

  // Ambil data raw dari DB
  const { data: rawLinks, error } = await supabase
    .from("social_links")
    .select("*")
    .order("order_index", { ascending: true });

  if (error || !rawLinks) {
    console.error("[Service Error] getGroupedSocialLinks:", error?.message);
    return [];
  }

  // Logic Grouping (Reduce)
  const groupedData = rawLinks.reduce<SocialGroup[]>((acc, link) => {
    // 1. Cek apakah grup kategori ini sudah ada?
    let group = acc.find((g) => g.category === link.category);

    // 2. Kalau belum ada, buat grup baru
    if (!group) {
      group = {
        category: link.category,
        color: getCategoryColor(link.category),
        links: [],
      };
      acc.push(group);
    }

    // 3. Masukkan link ke dalam grup
    // PENTING: Tidak ada mapping icon disini. Biarkan SmartIcon di client yang bekerja.
    group.links.push({
      name: link.name,
      url: link.url,
      desc: link.description || "",
      imageUrl: link.image_url || null,
    });

    return acc;
  }, []);

  return groupedData;
});
