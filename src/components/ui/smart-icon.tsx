// src/components/ui/smart-icon.tsx
"use client";

import {
  FaGithub,
  FaLinkedin,
  FaInstagram,
  FaTiktok,
  FaYoutube,
  FaXTwitter,
  FaDiscord,
  FaMedium,
  FaDribbble,
  FaWhatsapp,
  FaSpotify,
} from "react-icons/fa6";
import {
  Globe,
  Mail, // Link2, ExternalLink
} from "lucide-react";
// import { cn } from "@/lib/utils";

interface SmartIconProps {
  url?: string | null;
  name?: string | null; // Opsional: kalau mau paksa icon by name (misal "email")
  className?: string;
}

export function SmartIcon({ url, name, className }: SmartIconProps) {
  // 1. Cek by Name (Prioritas 1)
  if (name?.toLowerCase() === "email") return <Mail className={className} />;

  // 2. Cek by URL (Prioritas 2)
  if (url) {
    const u = url.toLowerCase();

    // Social / Brand Detection
    if (u.includes("github")) return <FaGithub className={className} />;
    if (u.includes("linkedin")) return <FaLinkedin className={className} />;
    if (u.includes("instagram")) return <FaInstagram className={className} />;
    if (u.includes("tiktok")) return <FaTiktok className={className} />;
    if (u.includes("youtube") || u.includes("youtu.be"))
      return <FaYoutube className={className} />;
    if (u.includes("twitter") || u.includes("x.com"))
      return <FaXTwitter className={className} />;
    if (u.includes("discord")) return <FaDiscord className={className} />;
    if (u.includes("medium")) return <FaMedium className={className} />;
    if (u.includes("dribbble")) return <FaDribbble className={className} />;
    if (u.includes("wa.me") || u.includes("whatsapp"))
      return <FaWhatsapp className={className} />;
    if (u.includes("spotify")) return <FaSpotify className={className} />;
  }

  // 3. Fallback (Kalau gak dikenali)
  return <Globe className={className} />;
}
