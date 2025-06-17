// src/components/AboutSection.tsx
import Image from "next/legacy/image";
import { AnimatedSection } from "./AnimatedSection";

export const AboutSection = () => {
  return (
    <AnimatedSection className="w-full py-20 md:py-32 bg-dark/95 backdrop-blur-sm">
      <div className="container mx-auto max-w-6xl px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 items-center">
          <div className="md:col-span-2 text-center md:text-left">
            <h2 className="heading text-4xl md:text-5xl mb-6">
              Driven by <span className="text-accent">curiosity</span>, built by{" "}
              <span className="text-secondary">collaboration</span>.
            </h2>
            <p className="narrative text-xl md:text-2xl text-light/80 leading-relaxed">
              I’m a self-taught web explorer working collaboratively with AI to
              build tools and stories that matter. From managing YouTube
              channels and recording Islamic talks to developing research tools
              like <b className="font-bold text-light">Apdetax</b>, I mix code,
              content, and curiosity — all driven by purpose.
            </p>
          </div>
          <div className="flex justify-center md:justify-end">
            <div className="relative w-60 h-60 md:w-72 md:h-72 rounded-full overflow-hidden border-4 border-secondary/50 shadow-lg">
              <Image
                src="/images/profile-picture.jpg"
                alt="Riziyan"
                layout="fill"
                objectFit="cover"
                className="transition-transform duration-500 hover:scale-110"
              />
            </div>
          </div>
        </div>
      </div>
    </AnimatedSection>
  );
};
