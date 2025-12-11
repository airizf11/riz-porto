// src/components/sections/AboutSection.tsx
import { getSiteSettings } from "@/lib/data";
import { AboutClient } from "./AboutClient";

export const AboutSection = async () => {
  const settings = await getSiteSettings();

  const headline = settings.about_headline || "Driven by curiosity.";
  const narrative = settings.about_narrative || "I build things for the web.";
  const imageUrl =
    settings.about_image_url ||
    "https://eweydsgczhxcnmnmstsg.supabase.co/storage/v1/object/public/assets/public/profile-picture.jpg";

  return (
    <AboutClient
      headline={headline}
      narrative={narrative}
      imageUrl={imageUrl}
    />
  );
};
