// src/components/ui/smart-icon.tsx
"use client";

import {
  // Socials Mainstream
  FaGithub,
  FaLinkedin,
  FaInstagram,
  FaTiktok,
  FaYoutube,
  FaXTwitter,
  FaFacebook,
  FaThreads,
  FaTelegram,
  FaReddit,
  FaWhatsapp,

  // Streaming & Music
  FaTwitch,
  FaSpotify,
  FaSoundcloud,
  FaApple,

  // Gaming
  FaSteam,
  FaGamepad,

  // Developer & Tech
  FaDiscord,
  FaStackOverflow,
  FaGitlab,
  FaBitbucket,
  FaCodepen,
  FaDev,
  FaDocker,

  // Design & Creative
  FaDribbble,
  FaBehance,
  FaFigma,
  FaMedium,

  // Support / Funding
  FaPatreon,
  FaMugHot, // MugHot buat Ko-fi / BuyMeACoffee
  FaPaypal,

  // AI & Tools
  FaRobot,
  FaTrello,
  FaSlack,
} from "react-icons/fa6";
import {
  Globe,
  Mail, // Link2,
  FileText,
  Database,
} from "lucide-react";
// import { cn } from "@/lib/utils";

interface SmartIconProps {
  url?: string | null;
  name?: string | null; // Opsional: kalau mau paksa icon by name (misal "email")
  className?: string;
}

export function SmartIcon({ url, name, className }: SmartIconProps) {
  // 1. Cek by Name (Prioritas 1)
  if (name) {
    const n = name.toLowerCase();
    if (n === "email" || n === "mail") return <Mail className={className} />;
    if (n === "resume" || n === "cv") return <FileText className={className} />;
    if (n === "database") return <Database className={className} />;
  }

  // 2. Cek by URL (Prioritas 2)
  if (url) {
    const u = url.toLowerCase();

    // --- SOCIALS ---
    if (u.includes("github")) return <FaGithub className={className} />;
    if (u.includes("linkedin")) return <FaLinkedin className={className} />;
    if (u.includes("instagram")) return <FaInstagram className={className} />;
    if (u.includes("tiktok")) return <FaTiktok className={className} />;
    if (u.includes("youtube") || u.includes("youtu.be"))
      return <FaYoutube className={className} />;
    if (u.includes("twitter") || u.includes("x.com"))
      return <FaXTwitter className={className} />;
    if (u.includes("facebook") || u.includes("fb.com"))
      return <FaFacebook className={className} />;
    if (u.includes("threads.net")) return <FaThreads className={className} />;
    if (u.includes("t.me") || u.includes("telegram"))
      return <FaTelegram className={className} />;
    if (u.includes("reddit")) return <FaReddit className={className} />;
    if (u.includes("wa.me") || u.includes("whatsapp"))
      return <FaWhatsapp className={className} />;

    // --- STREAMING & GAMING ---
    if (u.includes("twitch")) return <FaTwitch className={className} />;
    if (u.includes("steam")) return <FaSteam className={className} />;
    if (u.includes("roblox")) return <FaGamepad className={className} />; // Roblox pake Gamepad
    if (u.includes("spotify")) return <FaSpotify className={className} />;
    if (u.includes("soundcloud")) return <FaSoundcloud className={className} />;
    if (u.includes("music.apple")) return <FaApple className={className} />;

    // --- DEV & TECH ---
    if (u.includes("discord")) return <FaDiscord className={className} />;
    if (u.includes("stackoverflow"))
      return <FaStackOverflow className={className} />;
    if (u.includes("gitlab")) return <FaGitlab className={className} />;
    if (u.includes("bitbucket")) return <FaBitbucket className={className} />;
    if (u.includes("codepen")) return <FaCodepen className={className} />;
    if (u.includes("dev.to")) return <FaDev className={className} />;
    if (u.includes("docker")) return <FaDocker className={className} />;

    // --- DESIGN & CREATIVE ---
    if (u.includes("dribbble")) return <FaDribbble className={className} />;
    if (u.includes("behance")) return <FaBehance className={className} />;
    if (u.includes("figma")) return <FaFigma className={className} />;
    if (u.includes("medium")) return <FaMedium className={className} />;

    // --- SUPPORT / FUNDING ---
    if (u.includes("patreon")) return <FaPatreon className={className} />;
    if (
      u.includes("ko-fi") ||
      u.includes("buymeacoffee") ||
      u.includes("saweria") ||
      u.includes("trakteer")
    ) {
      return <FaMugHot className={className} />;
    }
    if (u.includes("paypal")) return <FaPaypal className={className} />;

    // --- AI & TOOLS ---
    if (
      u.includes("chatgpt") ||
      u.includes("openai") ||
      u.includes("claude") ||
      u.includes("gemini")
    ) {
      return <FaRobot className={className} />;
    }
    if (u.includes("notion")) return <FileText className={className} />; // Notion pake FileText (clean)
    if (u.includes("trello")) return <FaTrello className={className} />;
    if (u.includes("slack")) return <FaSlack className={className} />;
  }

  // 3. Fallback (Kalau gak dikenali)
  return <Globe className={className} />;
}
