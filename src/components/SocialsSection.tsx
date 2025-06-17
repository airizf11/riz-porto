// src/components/SocialsSection.tsx
/* eslint-disable @typescript-eslint/no-unused-vars */
import { AnimatedSection } from "./AnimatedSection";
import { FaYoutube, FaTiktok, FaInstagram, FaGithub } from "react-icons/fa";
import { Brain, MessageSquareText, Code } from "lucide-react";

const socialGroups = [
  {
    category: "YouTube Channels",
    color: "text-primary",
    links: [
      {
        icon: <FaYoutube />,
        name: "Rizyan Channel",
        desc: "Gadget, tech, & breakdowns",
        color: "text-primary",
        url: "https://www.youtube.com/rizyanchannel",
      },
      {
        icon: <FaYoutube />,
        name: "RizianSG",
        desc: "Gaming & live content",
        color: "text-accent",
        url: "https://www.youtube.com/@riziansg",
      },
      {
        icon: <FaYoutube />,
        name: "Rizian Day",
        desc: "Thoughts & reflections",
        color: "text-tertiary",
        url: "https://www.youtube.com/@rizianday",
      },
      {
        icon: <FaYoutube />,
        name: "RiFe M Musik",
        desc: "Music & covers",
        color: "text-secondary",
        url: "https://www.youtube.com/@RiFeMusik",
      },
      {
        icon: <FaYoutube />,
        name: "Rizian Live",
        desc: "Former game stream archives",
        color: "text-light/60",
        url: "https://www.youtube.com/@rizianlive",
      },
    ],
  },
  {
    category: "Code & Professional",
    color: "text-light",
    links: [
      {
        icon: <FaGithub />,
        name: "GitHub",
        desc: "My code & projects",
        url: "https://github.com/your-username",
      },
    ],
  },
  {
    category: "Social Media",
    color: "text-tertiary",
    links: [
      {
        icon: <FaInstagram />,
        name: "Instagram",
        desc: "Mix of life",
        url: "#",
      },
      {
        icon: <FaTiktok />,
        name: "@akuriziyan",
        desc: "Random ideas & creative bits",
        url: "#",
      },
    ],
  },
];

export const SocialsSection = () => {
  return (
    <AnimatedSection className="w-full py-20 md:py-32 bg-dark/95 backdrop-blur-sm">
      <div className="container mx-auto max-w-6xl px-8">
        <h2 className="heading text-4xl md:text-5xl text-center mb-16">
          Find Me <span className="text-tertiary">Online</span>
        </h2>
        <div className="flex flex-col gap-12">
          {socialGroups.map((group) => (
            <div key={group.category}>
              <h3
                className={`heading text-2xl mb-6 border-l-4 pl-4 ${group.color.replace(
                  "text-",
                  "border-"
                )}`}
              >
                {group.category}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {group.links.map((link) => (
                  <a
                    href={link.url}
                    key={link.name}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center gap-4 bg-dark/50 border border-light/10 rounded-xl p-4 transition-all duration-300 hover:border-tertiary/50 hover:bg-dark/20 hover:scale-105"
                  >
                    <div className={`text-3xl ${group.color}`}>{link.icon}</div>
                    <div>
                      <h4 className="font-bold text-light">{link.name}</h4>
                      <p className="text-sm text-light/70">{link.desc}</p>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </AnimatedSection>
  );
};
