// src/lib/data.ts
import { supabase } from "@/lib/supabase";
import { cache } from "react";
import {
  FaYoutube,
  FaTiktok,
  FaInstagram,
  FaGithub,
  FaLinkedin,
} from "react-icons/fa";

type Project = {
  name: string;
  description: string;
  stack: string | null;
  image_url: string | null;
  live_url: string | null;
  repo_url: string | null;
  case_study: string | null;
};

export const getProjectBySlug = cache(
  async (slug: string): Promise<Project | null> => {
    console.log(`[DATA FETCH] Fetching project by slug: ${slug}`);

    const { data, error } = await supabase
      .from("projects")
      .select(
        "name, description, stack, image_url, live_url, repo_url, case_study"
      )
      .eq("slug", slug)
      .single();

    if (error || !data) {
      console.error(`Error fetching project ${slug}:`, error?.message);
      return null;
    }
    return data;
  }
);

export const socialGroups = [
  {
    category: "Code & Professional",
    color: "text-light",
    borderColor: "border-light",
    links: [
      {
        icon: FaGithub,
        name: "GitHub",
        desc: "My code & projects",
        url: "https://github.com/airizf11",
        imageUrl:
          "https://eweydsgczhxcnmnmstsg.supabase.co/storage/v1/object/public/assets/public/airizf1101.jpg",
      },
      {
        icon: FaLinkedin,
        name: "LinkedIn",
        desc: "",
        url: "https://linkedin.com/in/rizkifebrianm",
        imageUrl:
          "https://eweydsgczhxcnmnmstsg.supabase.co/storage/v1/object/public/assets/public/linkedin01.jpg",
      },
    ],
  },
  {
    category: "Social Media",
    color: "text-tertiary",
    borderColor: "border-tertiary",
    links: [
      {
        icon: FaInstagram,
        name: "Instagram",
        desc: "Mix of life",
        url: "https://instagram.com/rizyan.people",
        imageUrl:
          "https://eweydsgczhxcnmnmstsg.supabase.co/storage/v1/object/public/assets/public/rizyan.people01.jpg",
      },
      {
        icon: FaTiktok,
        name: "@akuriziyan",
        desc: "Random ideas & creative bits",
        url: "https://www.tiktok.com/@akuriziyan",
        imageUrl:
          "https://eweydsgczhxcnmnmstsg.supabase.co/storage/v1/object/public/assets/public/akuriziyan-tt01.jpg",
      },
    ],
  },
  {
    category: "YouTube Channels",
    color: "text-primary",
    borderColor: "border-primary",
    links: [
      {
        icon: FaYoutube,
        name: "Rizyan Channel",
        desc: "Gadget, tech, & breakdowns",
        url: "https://www.youtube.com/rizyanchannel",
        imageUrl:
          "https://eweydsgczhxcnmnmstsg.supabase.co/storage/v1/object/public/assets/public/rizyanch01.jpg",
      },
      {
        icon: FaYoutube,
        name: "Rizian Day",
        desc: "Thoughts & reflections",
        url: "https://www.youtube.com/@rizianday",
        imageUrl:
          "https://eweydsgczhxcnmnmstsg.supabase.co/storage/v1/object/public/assets/public/rizianday01.jpg",
      },
      {
        icon: FaYoutube,
        name: "RizianSG",
        desc: "Gaming & live content",
        url: "https://www.youtube.com/@riziansg",
        imageUrl:
          "https://eweydsgczhxcnmnmstsg.supabase.co/storage/v1/object/public/assets/public/riziansg01.jpg",
      } /*
      {
        icon: FaYoutube,
        name: "RiFe M Musik",
        desc: "Music & covers",
        url: "https://www.youtube.com/@rifemusik",
        imageUrl: "https://placehold.co/600x400/9b59b6/ffffff?text=Gaming",
      },
      {
        icon: FaYoutube,
        name: "Rizian Live",
        desc: "Former game stream archives",
        url: "https://www.youtube.com/@rizianlive",
        imageUrl:
          "https://eweydsgczhxcnmnmstsg.supabase.co/storage/v1/object/public/assets/public/rizianlive01.jpg",
      }, */,
    ],
  },
];

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
