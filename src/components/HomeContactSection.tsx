// src/components/HomeContactSection.tsx
import { AnimatedSection } from "./AnimatedSection";
import { ContactInfo } from "./ContactInfo";
import Link from "next/link";
import { MessageSquarePlus } from "lucide-react";

export const HomeContactSection = () => {
  return (
    <AnimatedSection
      id="contact"
      className="w-full py-20 md:py-32 bg-dark/95 backdrop-blur-sm"
    >
      <div className="container mx-auto max-w-4xl px-8 text-center">
        <h2 className="heading text-4xl md:text-5xl mb-12">
          Ready to <span className="text-secondary">Collaborate</span>?
        </h2>
        <div className="flex flex-col md:flex-row justify-center items-center gap-12 md:gap-20">
          <ContactInfo className="text-left" />
          <div className="w-px h-24 bg-light/20 hidden md:block"></div>
          <div className="text-center">
            <h3 className="heading text-2xl text-accent mb-4">
              Or Send a Detailed Message
            </h3>
            <p className="text-light/80 mb-6">
              If you have more details to share, feel free to use the contact
              form.
            </p>
            <Link
              href="/contact"
              className="group inline-flex items-center justify-center gap-2 px-6 py-3 bg-primary text-dark font-bold rounded-full transition-transform hover:scale-105 active:scale-95"
            >
              Go to Contact Page <MessageSquarePlus className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </div>
    </AnimatedSection>
  );
};
