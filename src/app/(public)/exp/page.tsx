// src/app/(public)/exp/page.tsx
import Link from "next/link";
import { ArrowLeft, FlaskConical } from "lucide-react";
import { Metadata } from "next";

// Services & Components
import { getExperiments } from "@/services/content";
import { ContentItemCard } from "@/components/ContentItemCard";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "The Lab | Riziyan's Experiments",
  description:
    "A digital playground for exploring new technologies, ideas, creative projects and more.",
};

export default async function ExperimentsPage() {
  const experiments = await getExperiments();

  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="container mx-auto max-w-6xl px-4 py-12 md:py-20">
        {/* Navigation Header */}
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

        {/* Page Title */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center p-3 mb-6 bg-accent/10 rounded-full border border-accent/20">
            <FlaskConical className="w-8 h-8 text-accent" />
          </div>
          <h1 className="heading text-4xl md:text-6xl font-bold text-foreground mb-6">
            The <span className="text-accent">Laboratory</span>
          </h1>
          <p className="narrative text-xl text-muted-foreground max-w-2xl mx-auto">
            Welcome to my digital playground. Expect bugs, broken layouts, and
            wild ideas.
          </p>
        </div>

        {/* Experiments Grid */}
        {experiments.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {experiments.map((exp) => (
              <div key={exp.id} className="h-full">
                {/* 
                  ContentItemCard akan otomatis mendeteksi tipe 'experiment'
                  dan menampilkan ikon FlaskConical warna Amber.
                */}
                <ContentItemCard item={exp} />
              </div>
            ))}
          </div>
        ) : (
          /* Empty State */
          <div className="flex flex-col items-center justify-center py-24 text-center border border-dashed border-border rounded-2xl bg-muted/20">
            <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mb-4">
              <FlaskConical className="w-8 h-8 text-muted-foreground" />
            </div>
            <h3 className="text-xl font-bold text-foreground">Lab is Empty</h3>
            <p className="text-muted-foreground mt-2 max-w-md">
              The scientists are currently on break. Check back later for new
              experiments!
            </p>
          </div>
        )}
      </div>
    </main>
  );
}
