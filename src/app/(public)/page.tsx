// src/app/(public)/page.tsx
import { Suspense } from "react";
import { HeroSection } from "@/components/HeroSection";
import { AboutSection } from "@/components/AboutSection";
import { ProjectsSection } from "@/components/ProjectsSection";
import { SocialsSection } from "@/components/SocialsSection";
import { QuoteSection } from "@/components/QuoteSection";
import { Footer } from "@/components/Footer";
import { HomeContactSection } from "@/components/HomeContactSection";
import { Divider } from "@/components/Divider";
import { ProjectsSkeleton } from "@/components/ProjectsSkeleton";
import { QuoteSkeleton } from "@/components/QuoteSkeleton";

export default function HomePage() {
  return (
    <main className="flex flex-col items-center justify-center">
      <HeroSection />
      <Divider />
      <AboutSection />
      <Divider />
      <Suspense fallback={<ProjectsSkeleton />}>
        <ProjectsSection />
      </Suspense>
      <Divider />
      <SocialsSection />
      <Divider />
      <Suspense fallback={<QuoteSkeleton />}>
        <QuoteSection />
      </Suspense>
      <Divider />
      <HomeContactSection />
      <Footer />
    </main>
  );
}
