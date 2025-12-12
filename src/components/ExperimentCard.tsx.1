// src/components/ExperimentCard.tsx
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, FlaskConical } from "lucide-react";

type Tag = { name: string; slug: string; tag_type: "tech" | "topic" };
type Experiment = {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  cover_image_url: string | null;
  tags: Tag[];
};

function StatusBadge({ tags }: { tags: Tag[] }) {
  const statusTag = tags.find((t) =>
    ["live", "beta", "work-in-progress", "archived"].includes(t.slug)
  );

  if (!statusTag) return null;

  const styles: { [key: string]: string } = {
    live: "bg-green-500/20 text-green-300 border-green-500/30",
    beta: "bg-yellow-500/20 text-yellow-300 border-yellow-500/30",
    "work-in-progress": "bg-blue-500/20 text-blue-300 border-blue-500/30",
    archived: "bg-gray-500/20 text-gray-400 border-gray-500/30",
  };

  return (
    <div
      className={`absolute top-3 right-3 px-2 py-1 text-xs font-bold rounded-full border backdrop-blur-sm ${
        styles[statusTag.slug] || styles.archived
      }`}
    >
      {statusTag.name}
    </div>
  );
}

export function ExperimentCard({ experiment }: { experiment: Experiment }) {
  const url = `/exp/${experiment.slug}`;

  return (
    <Link
      href={url}
      className="group block bg-dark/50 rounded-2xl border border-light/10 overflow-hidden transition-all duration-300 hover:border-accent hover:shadow-2xl hover:shadow-accent/10 hover:-translate-y-2"
    >
      <div className="relative aspect-video">
        {experiment.cover_image_url ? (
          <Image
            src={experiment.cover_image_url}
            alt={`Cover for ${experiment.title}`}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full bg-neutral-800 flex items-center justify-center">
            <FlaskConical className="w-12 h-12 text-light/20" />
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
        <StatusBadge tags={experiment.tags} />
      </div>
      <div className="p-5">
        <h3 className="heading text-xl text-light group-hover:text-accent transition-colors">
          {experiment.title}
        </h3>
        <p className="text-sm text-light/70 mt-2 h-10">{experiment.excerpt}</p>
        <div className="flex justify-end mt-4">
          <div className="flex items-center gap-1 text-sm font-semibold text-accent/80">
            Open Page
            <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </div>
        </div>
      </div>
    </Link>
  );
}
