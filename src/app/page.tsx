// src/app/page.tsx
import { HeroSection } from "@/components/HeroSection";
import { AboutSection } from "@/components/AboutSection";
import { ProjectsSection } from "@/components/ProjectsSection";
import { SocialsSection } from "@/components/SocialsSection";
import { QuoteSection } from "@/components/QuoteSection";
import { Footer } from "@/components/Footer";
import { SectionSeparator } from "@/components/SectionSeparator"; // <-- Import

export default function HomePage() {
  return (
    <main className="flex flex-col items-center justify-center">
      <HeroSection />
      <AboutSection />
      <SectionSeparator color="accent" />
      <ProjectsSection />
      <SectionSeparator color="tertiary" />
      <SocialsSection />
      <QuoteSection />
      <Footer />
    </main>
  );
}
