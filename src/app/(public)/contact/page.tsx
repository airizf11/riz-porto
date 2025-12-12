// src/app/(public)/contact/page.tsx
/* eslint-disable react/no-unescaped-entities */
import Link from "next/link";
import { ArrowLeft, Mail, MapPin, MessageSquare } from "lucide-react";
import { Metadata } from "next";

import { Button } from "@/components/ui/button";
import { ContactForm } from "@/components/ContactForm";
import { Separator } from "@/components/ui/separator";

export const metadata: Metadata = {
  title: "Contact Me ",
  description: "Get in touch for projects, collaborations, or just to say hi.",
};

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-background text-foreground relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] pointer-events-none translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-secondary/5 rounded-full blur-[120px] pointer-events-none -translate-x-1/2 translate-y-1/2" />

      <div className="container mx-auto max-w-6xl px-4 py-12 md:py-20 relative z-10">
        {/* Navigation */}
        <div className="mb-12">
          <Button
            variant="ghost"
            className="pl-0 hover:pl-2 transition-all"
            asChild
          >
            <Link
              href="/"
              className="gap-2 text-muted-foreground hover:text-foreground"
            >
              <ArrowLeft className="w-4 h-4" /> Back to Home
            </Link>
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          {/* LEFT COLUMN: Context & Info */}
          <div className="space-y-8">
            <div>
              <div className="inline-flex items-center justify-center p-3 mb-6 bg-primary/10 rounded-full border border-primary/20">
                <MessageSquare className="w-6 h-6 text-primary" />
              </div>
              <h1 className="heading text-4xl md:text-5xl font-bold text-foreground mb-6 leading-tight">
                Let's start a <br />
                <span className="text-primary">Conversation.</span>
              </h1>
              <p className="narrative text-xl text-muted-foreground leading-relaxed">
                Have a project in mind, a question about my work, or just want
                to connect? I'm currently open for new opportunities and
                collaborations.
              </p>
            </div>

            <Separator className="bg-border/60" />

            <div className="space-y-6">
              {/* Email Direct */}
              <div className="flex items-start gap-4">
                <div className="p-2 bg-muted rounded-lg shrink-0">
                  <Mail className="w-5 h-5 text-foreground" />
                </div>
                <div>
                  <h3 className="font-bold text-foreground">Email Me</h3>
                  <a
                    href="mailto:rizian.business99@gmail.com"
                    className="text-muted-foreground hover:text-primary transition-colors block mt-1"
                  >
                    rizian.business99@gmail.com
                  </a>
                </div>
              </div>

              {/* Location / Status */}
              <div className="flex items-start gap-4">
                <div className="p-2 bg-muted rounded-lg shrink-0">
                  <MapPin className="w-5 h-5 text-foreground" />
                </div>
                <div>
                  <h3 className="font-bold text-foreground">Current Status</h3>
                  <div className="flex items-center gap-2 mt-2">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                    </span>
                    <span className="text-sm text-muted-foreground">
                      Available for work
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: Interactive Form */}
          <div className="lg:mt-8">
            {/* Form Logic dipisah ke Client Component biar page ini tetep Server Component (SEO Friendly) */}
            <ContactForm />
          </div>
        </div>
      </div>
    </main>
  );
}
