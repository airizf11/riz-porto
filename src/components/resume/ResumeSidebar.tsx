// src/components/resume/ResumeSidebar.tsx
/* eslint-disable react/no-unescaped-entities */
import { Code2, GraduationCap, User } from "lucide-react";

import { type ResumeData } from "@/data/resume";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

interface ResumeSidebarProps {
  basics: ResumeData["basics"];
  skills: ResumeData["skills"];
  education: ResumeData["education"];
}

export function ResumeSidebar({
  basics,
  skills,
  education,
}: ResumeSidebarProps) {
  return (
    <aside className="space-y-10 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-100">
      {/* --- ABOUT SUMMARY --- */}
      <section>
        <h3 className="text-sm font-bold tracking-widest text-muted-foreground uppercase mb-4 flex items-center gap-2">
          <User className="w-4 h-4 text-primary" /> About
        </h3>
        <p className="text-muted-foreground leading-relaxed text-sm md:text-base">
          {basics.summary}
        </p>
      </section>

      <Separator className="bg-border/60" />

      {/* --- SKILLS --- */}
      <section>
        <h3 className="text-sm font-bold tracking-widest text-muted-foreground uppercase mb-5 flex items-center gap-2">
          <Code2 className="w-4 h-4 text-primary" /> Skills
        </h3>
        <div className="space-y-6">
          {skills.map((skillGroup) => (
            <div key={skillGroup.category}>
              <h4 className="text-xs font-semibold text-foreground/80 mb-3 uppercase tracking-wide">
                {skillGroup.category}
              </h4>
              <div className="flex flex-wrap gap-2">
                {skillGroup.items.map((item) => (
                  <Badge
                    key={item}
                    variant="secondary"
                    className="font-normal px-2.5 py-1 bg-secondary/30 hover:bg-secondary/50 text-secondary-foreground transition-colors cursor-default"
                  >
                    {item}
                  </Badge>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <Separator className="bg-border/60" />

      {/* --- EDUCATION --- */}
      <section>
        <h3 className="text-sm font-bold tracking-widest text-muted-foreground uppercase mb-5 flex items-center gap-2">
          <GraduationCap className="w-4 h-4 text-primary" /> Education
        </h3>
        <div className="space-y-6">
          {education.map((edu) => (
            <div
              key={edu.school}
              className="relative pl-4 border-l-2 border-border/50"
            >
              <h4 className="font-bold text-foreground text-base">
                {edu.school}
              </h4>
              <p className="text-sm text-primary font-medium mt-0.5">
                {edu.degree}
              </p>
              <p className="text-xs text-muted-foreground mt-1 font-mono">
                {edu.start} — {edu.end}
              </p>
              {edu.description && (
                <p className="text-xs text-muted-foreground mt-2 italic leading-relaxed">
                  "{edu.description}"
                </p>
              )}
            </div>
          ))}
        </div>
      </section>
    </aside>
  );
}
