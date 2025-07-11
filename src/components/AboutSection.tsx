// src/components/AboutSection.tsx
import Image from "next/image";
import { AnimatedSection } from "./AnimatedSection";
import { getSiteSettings } from "@/lib/data";

export const AboutSection = async () => {
  const settings = await getSiteSettings();

  const headline = settings.about_headline || "Headline coming soon.";
  const narrative = settings.about_narrative || "Narrative coming soon.";
  const imageUrl = settings.about_image_url || "https://placehold.co/300";

  return (
    <AnimatedSection className="w-full py-20 md:py-32 bg-dark/95 backdrop-blur-sm">
      <div className="container mx-auto max-w-6xl px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 items-center">
          <div className="md:col-span-2 text-center md:text-left">
            <h2
              className="heading text-4xl md:text-5xl mb-6"
              dangerouslySetInnerHTML={{ __html: headline }}
            />
            <p
              className="narrative text-xl md:text-2xl text-light/80 leading-relaxed"
              dangerouslySetInnerHTML={{ __html: narrative }}
            />
          </div>
          <div className="flex justify-center md:justify-end">
            <div className="relative w-60 h-60 md:w-72 md:h-72 rounded-full overflow-hidden border-4 border-secondary/50 shadow-lg">
              <Image
                src={imageUrl}
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
