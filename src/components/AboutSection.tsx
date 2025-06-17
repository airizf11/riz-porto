// src/components/AboutSection.tsx
import Image from "next/image";
import { AnimatedSection } from "./AnimatedSection";
import { aboutData } from "@/lib/data";

export const AboutSection = () => {
  return (
    <AnimatedSection className="w-full py-20 md:py-32 bg-dark/95 backdrop-blur-sm">
      <div className="container mx-auto max-w-6xl px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 items-center">
          <div className="md:col-span-2 text-center md:text-left">
            <h2 className="heading text-4xl md:text-5xl mb-6">
              {aboutData.headline.part1}
              <span className="text-accent">
                {aboutData.headline.highlight1}
              </span>
              {aboutData.headline.part2}
              <span className="text-secondary">
                {aboutData.headline.highlight2}
              </span>
              {aboutData.headline.part3}
            </h2>
            <p
              className="narrative text-xl md:text-2xl text-light/80 leading-relaxed"
              dangerouslySetInnerHTML={{ __html: aboutData.narrative }}
            />
          </div>
          <div className="flex justify-center md:justify-end">
            <div className="relative w-60 h-60 md:w-72 md:h-72 rounded-full overflow-hidden border-4 border-secondary/50 shadow-lg">
              <Image
                src="https://eweydsgczhxcnmnmstsg.supabase.co/storage/v1/object/public/assets/public/profile-picture.jpg"
                alt="Riziyan"
                fill
                sizes="(max-width: 768px) 60vw, 30vw"
                className="object-cover transition-transform duration-500 hover:scale-110"
              />
            </div>
          </div>
        </div>
      </div>
    </AnimatedSection>
  );
};
