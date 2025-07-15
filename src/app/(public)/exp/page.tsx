// src/app/(public)/exp/page.tsx
/* eslint-disable @typescript-eslint/no-explicit-any */
import { createClient } from "@/lib/supabase/server";
import { Metadata } from "next";
import { ExperimentCard } from "@/components/ExperimentCard";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const metadata: Metadata = {
  title: "The Lab of Riziyan's Experiments ",
  description:
    "A digital playground for exploring new technologies, ideas, creative projects and more.",
};

async function getExperiments() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("content_items")
    .select(
      `
        id, title, slug, excerpt, cover_image_url, 
        content_tags(tags(name, slug, tag_type))
    `
    )
    .eq("content_type", "experiment")
    .eq("status", "published")
    .order("order_index", { ascending: true });

  if (error) {
    console.error("Error fetching experiments:", error.message);
    return [];
  }

  return data.map((item) => ({
    ...item,
    tags: item.content_tags.map((ct: any) => ct.tags),
  }));
}

export default async function ExperimentsPage() {
  const experiments = await getExperiments();

  return (
    <main className="min-h-screen bg-dark text-light">
      <div className="container mx-auto max-w-6xl px-4 py-12 md:py-20">
        <Link
          href="/"
          className="group inline-flex items-center gap-2 text-light/70 hover:text-light mb-12 transition-colors"
        >
          <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
          Back to Home
        </Link>
        <header className="text-center mb-16">
          <h1 className="heading text-6xl md:text-6xl text-accent mb-8">
            My Experiment Laboratory
          </h1>
          <p className="narrative text-xl text-light/80 max-w-3xl mx-auto">
            Welcome to my digital playground. This is where I experiment with
            new technologies, build fun utilities, explore creative ideas and
            more things.
          </p>
        </header>

        {experiments.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {experiments.map((exp) => (
              <ExperimentCard key={exp.id} experiment={exp} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="text-light/70 text-lg">
              The lab is currently empty. Check back soon for new experiments!
            </p>
          </div>
        )}
      </div>
    </main>
  );
}
