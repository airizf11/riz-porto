// src/components/resume/ResumeExperience.tsx
import Link from "next/link";
import { Briefcase, CalendarDays, ExternalLink, MapPin } from "lucide-react";

import { type Job } from "@/data/resume";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface ResumeExperienceProps {
  jobs: Job[];
}

export function ResumeExperience({ jobs }: ResumeExperienceProps) {
  return (
    <section className="animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-200">
      {/* Section Header */}
      <h3 className="text-sm font-bold tracking-widest text-muted-foreground uppercase mb-6 flex items-center gap-2">
        <Briefcase className="w-4 h-4 text-primary" /> Work Experience
      </h3>

      <div className="space-y-8 relative pl-2">
        {/* Timeline Vertical Line */}
        <div className="absolute left-2 top-3 bottom-4 w-px bg-gradient-to-b from-border via-border to-transparent" />

        {jobs.map((job, index) => {
          const isCurrent = job.end.toLowerCase() === "present";

          return (
            <div
              key={`${job.company}-${index}`}
              className="relative pl-8 group"
            >
              {/* Timeline Dot */}
              <div
                className={cn(
                  "absolute left-0 top-1.5 w-4 h-4 rounded-full border-2 transition-colors duration-300 z-10",
                  isCurrent
                    ? "bg-primary border-primary shadow-[0_0_10px_rgba(var(--primary),0.5)]"
                    : "bg-background border-muted-foreground/30 group-hover:border-primary/50"
                )}
              >
                {isCurrent && (
                  <span className="absolute inset-0 rounded-full bg-primary/30 animate-ping" />
                )}
              </div>

              <Card className="border-border/40 bg-card/40 hover:bg-card/60 hover:border-primary/20 transition-all duration-300 shadow-sm hover:shadow-md">
                <CardContent className="p-5 md:p-6">
                  {/* Header Job */}
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 mb-4">
                    <div>
                      <h4 className="text-lg md:text-xl font-bold text-foreground leading-tight">
                        {job.role}
                      </h4>

                      <div className="flex items-center gap-2 mt-1">
                        {job.link ? (
                          <Link
                            href={job.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-primary hover:text-primary/80 font-medium flex items-center gap-1 text-sm md:text-base transition-colors"
                          >
                            {job.company}
                            <ExternalLink className="w-3 h-3" />
                          </Link>
                        ) : (
                          <span className="text-muted-foreground font-medium text-sm md:text-base">
                            {job.company}
                          </span>
                        )}

                        <span className="text-muted-foreground/40">•</span>

                        <span className="text-xs text-muted-foreground flex items-center gap-1">
                          <MapPin className="w-3 h-3" /> {job.location}
                        </span>
                      </div>
                    </div>

                    <div className="flex flex-row sm:flex-col items-center sm:items-end gap-2 shrink-0">
                      <Badge
                        variant="outline"
                        className="font-mono text-xs text-muted-foreground border-border/50 bg-muted/20"
                      >
                        <CalendarDays className="w-3 h-3 mr-1.5 opacity-70" />
                        {job.start} — {job.end}
                      </Badge>

                      {/* Location Type Badge (Remote/On-site) */}
                      {job.location_type && (
                        <Badge
                          variant="secondary"
                          className={cn(
                            "text-[10px] px-1.5 py-0",
                            job.location_type === "Remote"
                              ? "bg-green-500/10 text-green-500 hover:bg-green-500/20"
                              : "bg-blue-500/10 text-blue-500 hover:bg-blue-500/20"
                          )}
                        >
                          {job.location_type}
                        </Badge>
                      )}
                    </div>
                  </div>

                  {/* Job Description */}
                  <ul className="list-disc list-outside ml-4 space-y-2 text-muted-foreground/90">
                    {job.description.map((point, i) => (
                      <li
                        key={i}
                        className="text-sm leading-relaxed pl-1 marker:text-primary/50"
                      >
                        {point}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>
          );
        })}
      </div>
    </section>
  );
}
