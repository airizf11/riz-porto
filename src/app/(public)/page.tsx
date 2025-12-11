// src/app/(public)/page.tsx
import { Suspense } from "react";
import { HeroSection } from "@/components/sections/HeroSection";
import { AboutSection } from "@/components/sections/AboutSection";
import { ProjectsSection } from "@/components/sections/ProjectsSection";
import { SocialsSection } from "@/components/sections/SocialsSection";
import { QuoteSection } from "@/components/sections/QuoteSection";
import { HomeContactSection } from "@/components/sections/HomeContactSection";
import { Divider } from "@/components/common/Divider";
import { ProjectsSkeleton } from "@/components/ProjectsSkeleton";
import { QuoteSkeleton } from "@/components/QuoteSkeleton";
import { getSiteSettings } from "@/lib/data";

export default async function HomePage() {
  const settings = await getSiteSettings();

  const heroHeadline = settings.hero_headline || "Headline Coming Soon.";
  const heroSubtitle = settings.hero_subtitle || "Subtitle Coming Soon.";
  return (
    <main className="flex flex-col items-center justify-center">
      <HeroSection headline={heroHeadline} subtitle={heroSubtitle} />
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
    </main>
  );
}
