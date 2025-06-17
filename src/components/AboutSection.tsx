// src/components/AboutSection.tsx
import { AnimatedSection } from "./AnimatedSection";

export const AboutSection = () => {
  return (
    <AnimatedSection className="w-full py-20 md:py-32 bg-dark/95 backdrop-blur-sm">
      <div className="container mx-auto max-w-4xl px-8 text-center">
        <h2 className="heading text-4xl md:text-5xl mb-6">
          Driven by <span className="text-accent">curiosity</span>, built by{" "}
          <span className="text-secondary">collaboration</span>.
        </h2>
        <p className="narrative text-xl md:text-2xl text-light/80 leading-relaxed">
          I’m a self-taught web explorer working collaboratively with AI to
          build tools and stories that matter. From managing YouTube channels
          and recording Islamic talks to developing research tools like{" "}
          <b className="font-bold text-light">Apdetax</b>, I mix code, content,
          and curiosity — all driven by purpose.
        </p>
      </div>
    </AnimatedSection>
  );
};
