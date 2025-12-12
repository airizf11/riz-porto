// src/components/ContentItemCard.tsx
import Link from "next/link";
import {
  ArrowUpRight,
  FileText,
  FlaskConical,
  FolderGit2,
  Quote,
  Star,
  CalendarDays,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardHeader,
  CardFooter,
} from "@/components/ui/card";
import type { ContentItem } from "@/services/content";

// --- HELPERS ---
const getContentUrl = (item: ContentItem): string => {
  const typeToPathMap: Record<string, string> = {
    project: "/projects",
    article: "/articles",
    review: "/reviews",
    experiment: "/exp",
    quote: `/blog#quote-${item.slug}`, // Anchor link untuk quote
  };

  const basePath = typeToPathMap[item.content_type] || "/blog";

  // Kalau link anchor (#), jangan tambah slug lagi
  if (basePath.includes("#")) {
    return basePath;
  }

  return `${basePath}/${item.slug}`;
};

const getContentTypeConfig = (type: string) => {
  switch (type) {
    case "project":
      return { icon: FolderGit2, label: "Project", color: "text-blue-400" };
    case "article":
      return { icon: FileText, label: "Article", color: "text-emerald-400" };
    case "experiment":
      return {
        icon: FlaskConical,
        label: "Experiment",
        color: "text-amber-400",
      };
    case "quote":
      return { icon: Quote, label: "Quote", color: "text-pink-400" };
    case "review":
      return { icon: Star, label: "Review", color: "text-purple-400" };
    default:
      return { icon: FileText, label: "Post", color: "text-muted-foreground" };
  }
};

const formatDate = (dateString: string | null | undefined) => {
  // 1. Cek kalau datanya null/undefined/kosong
  if (!dateString) return "Unknown Date";

  const date = new Date(dateString);

  // 2. Cek apakah hasil konversi Date-nya valid?
  // (isNaN pada date object berarti "Invalid Date")
  if (isNaN(date.getTime())) {
    return "Unknown Date";
  }

  // 3. Kalau aman, baru format pake Intl (Lebih konsisten dibanding toLocaleDateString)
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(date);
};

// --- COMPONENT ---
export function ContentItemCard({ item }: { item: ContentItem }) {
  const url = getContentUrl(item);
  const config = getContentTypeConfig(item.content_type);
  const TypeIcon = config.icon;

  return (
    <Link href={url} className="block group h-full">
      <Card className="h-full border-border/50 bg-card/50 hover:bg-card transition-all duration-300 hover:-translate-y-1 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5 overflow-hidden flex flex-col">
        {/* Header: Type Badge & Date */}
        <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
          <Badge
            variant="outline"
            className="flex items-center gap-1.5 px-2.5 py-0.5 text-xs font-medium border-border/50"
          >
            <TypeIcon className={cn("w-3 h-3", config.color)} />
            <span className="capitalize">{config.label}</span>
          </Badge>

          <div className="flex items-center text-xs text-muted-foreground">
            <CalendarDays className="w-3 h-3 mr-1.5" />
            <time dateTime={item.created_at}>
              {formatDate(item.created_at)}
            </time>
          </div>
        </CardHeader>

        {/* Content: Title & Excerpt */}
        <CardContent className="flex-grow space-y-3">
          <h3 className="heading text-xl font-bold text-foreground group-hover:text-primary transition-colors line-clamp-2 leading-tight">
            {item.title}
          </h3>
          <p className="text-muted-foreground text-sm line-clamp-3 leading-relaxed">
            {item.excerpt || "No description available."}
          </p>
        </CardContent>

        {/* Footer: Tags & Action Icon */}
        <CardFooter className="pt-2 flex items-center justify-between border-t border-border/30 mt-auto">
          {/* Tags (Limit 2 biar gak penuh) */}
          <div className="flex gap-2 overflow-hidden mask-linear-fade">
            {item.tags &&
              item.tags.slice(0, 2).map((tag) => (
                <span
                  key={tag.id}
                  className="text-xs text-muted-foreground bg-secondary/10 px-2 py-1 rounded-md whitespace-nowrap"
                >
                  #{tag.name}
                </span>
              ))}
          </div>

          <div className="text-muted-foreground group-hover:text-primary transition-colors duration-300">
            <ArrowUpRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
}
