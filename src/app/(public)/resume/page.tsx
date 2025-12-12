// src/app/(public)/resume/page.tsx
import { Metadata } from "next";

// Data & Components
import { RESUME_DATA } from "@/data/resume";
import { ResumeHeader } from "@/components/resume/ResumeHeader";
import { ResumeExperience } from "@/components/resume/ResumeExperience";
import { ResumeSidebar } from "@/components/resume/ResumeSidebar";

export const metadata: Metadata = {
  title: `${RESUME_DATA.basics.name} | Resume`,
  description: `Professional resume of ${RESUME_DATA.basics.name} - ${RESUME_DATA.basics.label}. ${RESUME_DATA.basics.summary}`,
  openGraph: {
    title: `${RESUME_DATA.basics.name} - Resume`,
    description: RESUME_DATA.basics.headline,
    type: "profile",
    locale: "en_US", // Atau id_ID sesuaikan
  },
};

export default function ResumePage() {
  const { basics, skills, education, experience, socials } = RESUME_DATA;

  // --- SEO: STRUCTURED DATA (JSON-LD) ---
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: basics.name,
    jobTitle: basics.label,
    image:
      "https://eweydsgczhxcnmnmstsg.supabase.co/storage/v1/object/public/assets/public/profile-picture.jpg",
    telephone: basics.phone,
    url: basics.website,
    email: basics.email,
    address: {
      "@type": "PostalAddress",
      addressCountry: "ID",
      addressLocality: basics.location,
    },
    sameAs: socials.map((social) => social.url),
    knowsAbout: skills.flatMap((s) => s.items), // List semua skill
    worksFor: experience.map((job) => ({
      "@type": "Organization",
      name: job.company,
    })),
    alumniOf: education.map((edu) => ({
      "@type": "EducationalOrganization",
      name: edu.school,
    })),
  };

  return (
    <main className="min-h-screen bg-background text-foreground py-12 md:py-20 relative overflow-hidden">
      {/* SEO Script Injection */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Background Decor: Technical Dot Grid */}
      <div className="absolute inset-0 bg-[radial-gradient(var(--border)_1px,transparent_1px)] [background-size:20px_20px] opacity-20 pointer-events-none" />

      {/* Background Decor: Top Fade Gradient */}
      <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-background to-transparent pointer-events-none" />

      <div className="container mx-auto max-w-5xl px-4 relative z-10">
        {/* 1. HEADER (Profile & Actions) */}
        <ResumeHeader basics={basics} socials={socials} />

        {/* 2. MAIN GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16">
          {/* LEFT: Sidebar Information */}
          <div className="order-2 lg:order-1">
            <ResumeSidebar
              basics={basics}
              skills={skills}
              education={education}
            />
          </div>

          {/* RIGHT: Main Timeline */}
          <div className="order-1 lg:order-2 lg:col-span-2">
            <ResumeExperience jobs={experience} />
          </div>
        </div>
      </div>
    </main>
  );
}
