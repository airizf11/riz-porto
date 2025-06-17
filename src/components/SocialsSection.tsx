// src/components/SocialsSection.tsx
import { AnimatedSection } from "./AnimatedSection";
import { socialGroups } from "@/lib/data";

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
                className={`heading text-2xl mb-6 border-l-4 pl-4 ${group.borderColor}`}
              >
                {group.category}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {group.links.map((link) => {
                  const Icon = link.icon;
                  return (
                    <a
                      href={link.url}
                      key={link.name}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center gap-4 bg-dark/50 border border-light/10 rounded-xl p-4 transition-all duration-300 hover:border-tertiary/50 hover:bg-dark/20 hover:scale-105"
                    >
                      <div className={`text-3xl ${group.color}`}>
                        <Icon />
                      </div>
                      <div>
                        <h4 className="font-bold text-light">{link.name}</h4>
                        <p className="text-sm text-light/70">{link.desc}</p>
                      </div>
                    </a>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </AnimatedSection>
  );
};
