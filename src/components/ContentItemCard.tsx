// src/components/ContentItemCard.tsx
import Link from "next/link";
import {
  ArrowUpRight,
  FlaskConical,
  GitMerge,
  PenSquare,
  Quote,
  Star,
} from "lucide-react";
import React from "react";

type ContentItem = {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  content_type: string;
};

const getContentUrl = (item: {
  content_type: string;
  slug: string;
}): string => {
  const typeToPathMap: { [key: string]: string } = {
    project: "/projects",
    article: "/articles",
    review: "/reviews",
    experiment: "/exp",
    quote: `/blog#quote-${item.slug}`,
  };

  const basePath = typeToPathMap[item.content_type] || "/blog";

  if (basePath.includes("#")) {
    return basePath;
  }

  return `${basePath}/${item.slug}`;
};

const ContentTypeIcon = ({ type }: { type: string }) => {
  const iconMap: { [key: string]: React.ElementType } = {
    project: GitMerge,
    article: PenSquare,
    review: Star,
    quote: Quote,
    experiment: FlaskConical,
  };
  const Icon = iconMap[type] || PenSquare;
  return <Icon className="w-4 h-4 text-secondary" />;
};

export function ContentItemCard({ item }: { item: ContentItem }) {
  const url = getContentUrl(item);

  return (
    <Link
      href={url}
      className="block group p-6 bg-dark/50 border border-light/10 rounded-xl hover:border-secondary transition-all transform hover:-translate-y-1"
    >
      <div className="flex justify-between items-start">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <ContentTypeIcon type={item.content_type} />
            <span className="text-sm font-semibold uppercase tracking-wider text-secondary">
              {item.content_type}
            </span>
          </div>
          <h3 className="heading text-2xl text-light group-hover:text-accent transition-colors">
            {item.title}
          </h3>
          <p className="narrative text-light/70 mt-2">{item.excerpt}</p>
        </div>
        <ArrowUpRight className="w-6 h-6 text-light/40 group-hover:text-accent transition-all transform group-hover:rotate-45" />
      </div>
    </Link>
  );
}
