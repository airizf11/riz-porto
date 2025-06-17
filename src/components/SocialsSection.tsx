// src/components/SocialsSection.tsx
/* eslint-disable @typescript-eslint/no-unused-vars */
import { AnimatedSection } from "./AnimatedSection";
import { FaYoutube, FaTiktok, FaInstagram, FaTwitch } from "react-icons/fa";
import {
  Brain,
  Gamepad2,
  MessageSquareText,
  Music,
  Clapperboard,
} from "lucide-react";

const socialLinks = [
  {
    icon: <Brain />,
    name: "Rizyan Channel",
    desc: "Gadget, tech, & breakdowns",
    color: "text-primary",
  },
  {
    icon: <Gamepad2 />,
    name: "RizianSG",
    desc: "Gaming & live content",
    color: "text-accent",
  },
  {
    icon: <MessageSquareText />,
    name: "Rizian Day",
    desc: "Thoughts & reflections",
    color: "text-tertiary",
  },
  {
    icon: <FaTiktok />,
    name: "@akuriziyan",
    desc: "Random ideas & creative bits",
    color: "text-light",
  },
  {
    icon: <Music />,
    name: "RiFe M Musik",
    desc: "Music & covers",
    color: "text-secondary",
  },
  {
    icon: <Clapperboard />,
    name: "Rizian Live",
    desc: "Former game stream archives",
    color: "text-light/60",
  },
  {
    icon: <FaInstagram />,
    name: "Instagram",
    desc: "Mix of life",
    color: "text-pink-400",
  },
];

export const SocialsSection = () => {
  return (
    <AnimatedSection className="w-full py-20 md:py-32 bg-dark/95 backdrop-blur-sm">
      <div className="container mx-auto max-w-6xl px-8">
        <h2 className="heading text-4xl md:text-5xl text-center mb-12">
          Find Me <span className="text-tertiary">Online</span>
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {socialLinks.map((link, index) => (
            <a
              href="#"
              key={index}
              className="group flex items-center gap-4 bg-dark/50 border border-light/10 rounded-xl p-4 transition-all duration-300 hover:border-tertiary/50 hover:bg-dark/20 hover:scale-105"
            >
              <div className={`text-3xl ${link.color}`}>{link.icon}</div>
              <div>
                <h4 className="font-bold text-light">{link.name}</h4>
                <p className="text-sm text-light/70">{link.desc}</p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </AnimatedSection>
  );
};
