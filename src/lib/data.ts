// src/lib/data.ts
/* eslint-disable @typescript-eslint/no-explicit-any */
import { createClient } from "@/lib/supabase/server";
import {
  FaYoutube,
  FaTiktok,
  FaInstagram,
  FaGithub,
  FaLinkedin,
} from "react-icons/fa";
import React, { cache } from "react";
import { supabase } from "./supabase";

export const iconMap: { [key: string]: React.ElementType } = {
  FaYoutube,
  FaTiktok,
  FaInstagram,
  FaGithub,
  FaLinkedin,
};

export async function getGroupedSocialLinks() {
  const supabase = await createClient();
  const { data: links } = await supabase
    .from("social_links")
    .select("*")
    .order("order_index", { ascending: true });

  if (!links) return [];

  const grouped = links.reduce((acc, link) => {
    let group = acc.find(
      (g: { category: any }) => g.category === link.category
    );

    if (!group) {
      const color =
        link.category === "Code & Professional"
          ? "text-light"
          : link.category === "Social Media"
          ? "text-tertiary"
          : "text-primary";
      const borderColor = color.replace("text-", "border-");

      group = { category: link.category, color, borderColor, links: [] };
      acc.push(group);
    }

    group.links.push({
      icon: link.icon_id ? iconMap[link.icon_id] : null,
      name: link.name,
      desc: link.description || "",
      url: link.url,
      imageUrl: link.image_url || "",
    });

    return acc;
  }, [] as any[]);

  return grouped;
}

export async function getSiteSettings() {
  const supabase = await createClient();
  const { data } = await supabase.from("site_settings").select("key, value");

  if (!data) return {};

  const settings = data.reduce((acc, setting) => {
    acc[setting.key] = setting.value;
    return acc;
  }, {} as { [key: string]: string });

  return settings;
}

/*
export const aboutData = {
  headline: {
    part1: "Driven by ",
    highlight1: "curiosity, ",
    part2: "built by ",
    highlight2: "collaboration",
    part3: ".",
  },
  narrative: `I’m a self-taught web explorer working collaboratively with AI to
  build tools and stories that matter. From managing YouTube
  channels and recording Islamic talks to developing research tools
  like <b class="font-bold text-light">Apdetax</b>, I mix code,
  content, and curiosity — all driven by purpose.`,
};
*/

type Project = {
  case_study: string | null;
  created_at: string;
  description: string;
  id: string;
  image_url: string | null;
  is_featured: boolean;
  live_url: string | null;
  name: string;
  order_index: number | null;
  repo_url: string | null;
  slug: string | null;
  stack: string | null;
  updated_at: string | null;
};

export const getProjectBySlug = cache(
  async (slug: string): Promise<Project | null> => {
    console.log(`[DATA FETCH] Fetching project by slug: ${slug}`);

    const { data, error } = await supabase
      .from("projects")
      .select("*")
      .eq("slug", slug)
      .single();

    if (error || !data) {
      console.error(`Error fetching project ${slug}:`, error?.message);
      return null;
    }
    return data;
  }
);
