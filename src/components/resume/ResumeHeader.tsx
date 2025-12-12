// src/components/resume/ResumeHeader.tsx
"use client";

import Link from "next/link";
import { Download, Eye, MapPin, Globe, FileWarning } from "lucide-react";

import { type ResumeData } from "@/data/resume";
import { SmartIcon } from "@/components/ui/smart-icon";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface ResumeHeaderProps {
  basics: ResumeData["basics"];
  socials: ResumeData["socials"];
}

export function ResumeHeader({ basics, socials }: ResumeHeaderProps) {
  // Logic Cek PDF
  const hasPdf = !!basics.pdfUrl && basics.pdfUrl.trim().length > 0;

  return (
    <div className="flex flex-col md:flex-row gap-8 items-center md:items-start justify-between mb-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* --- LEFT: Profile Info --- */}
      <div className="flex flex-col md:flex-row gap-6 items-center md:items-start text-center md:text-left">
        {/* Avatar */}
        <Avatar className="w-32 h-32 border-4 border-background shadow-xl ring-1 ring-border/50">
          {/* Ganti src ini dengan URL foto asli lo nanti */}
          <AvatarImage
            src="https://eweydsgczhxcnmnmstsg.supabase.co/storage/v1/object/public/assets/public/profile-picture.jpg"
            alt={basics.name}
            className="object-cover"
          />
          <AvatarFallback className="text-2xl font-bold bg-muted text-muted-foreground">
            {basics.initials}
          </AvatarFallback>
        </Avatar>

        <div className="space-y-2">
          <h1 className="heading text-4xl md:text-5xl font-bold text-foreground tracking-tight">
            {basics.name}
          </h1>
          <p className="text-xl text-primary font-medium">{basics.label}</p>

          {/* Meta Info */}
          <div className="flex flex-wrap gap-4 text-sm text-muted-foreground justify-center md:justify-start items-center">
            {basics.location && (
              <span className="flex items-center gap-1.5">
                <MapPin className="w-4 h-4" /> {basics.location}
              </span>
            )}
            {basics.website && (
              <Link
                href={basics.website}
                target="_blank"
                className="flex items-center gap-1.5 hover:text-primary transition-colors decoration-dotted hover:underline underline-offset-4"
              >
                <Globe className="w-4 h-4" /> Website
              </Link>
            )}
          </div>

          {/* Social Icons Row */}
          <div className="flex gap-2 justify-center md:justify-start pt-3">
            {socials.map((social) => (
              <Button
                key={social.network}
                variant="outline"
                size="icon"
                className="w-9 h-9 rounded-full border-border/60 hover:bg-primary/10 hover:text-primary hover:border-primary/50 transition-all"
                asChild
              >
                <a
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.network}
                >
                  <SmartIcon url={social.url} className="w-4 h-4" />
                </a>
              </Button>
            ))}
          </div>
        </div>
      </div>

      {/* --- RIGHT: Actions (PDF Logic) --- */}
      <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
        {hasPdf ? (
          <>
            {/* Preview Button */}
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline" className="gap-2 w-full sm:w-auto">
                  <Eye className="w-4 h-4" /> Preview
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-4xl w-full h-[80vh] p-0 overflow-hidden bg-background/95 backdrop-blur-xl">
                <DialogHeader className="p-4 border-b border-border/50 bg-muted/20">
                  <DialogTitle>Resume Preview</DialogTitle>
                </DialogHeader>
                <div className="w-full h-full bg-muted/30 flex items-center justify-center">
                  <iframe
                    src={basics.pdfUrl}
                    className="w-full h-full border-none"
                    title="Resume PDF"
                  />
                </div>
              </DialogContent>
            </Dialog>

            {/* Download Button */}
            <Button
              asChild
              className="gap-2 shadow-lg shadow-primary/20 w-full sm:w-auto font-bold"
            >
              <a
                href={basics.pdfUrl}
                target="_blank"
                rel="noopener noreferrer"
                download
              >
                <Download className="w-4 h-4" /> Download PDF
              </a>
            </Button>
          </>
        ) : (
          /* Fallback Button (Disabled) */
          <Button
            disabled
            variant="secondary"
            className="gap-2 w-full sm:w-auto opacity-80 cursor-not-allowed"
          >
            <FileWarning className="w-4 h-4" /> PDF currently unavailable.
          </Button>
        )}
      </div>
    </div>
  );
}
