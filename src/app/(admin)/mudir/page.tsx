// src/app/(admin)/mudir/page.tsx
/* eslint-disable react/no-unescaped-entities */
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import {
  ArrowUpRight,
  GitMerge, // MessageSquare,
  PenSquare,
  Quote,
} from "lucide-react";
import React from "react";

function StatCard({
  title,
  value,
  icon,
}: {
  title: string;
  value: number;
  icon: React.ReactNode;
}) {
  return (
    <div className="bg-dark p-6 rounded-lg border border-light/10">
      <div className="flex items-center gap-4">
        <div className="p-3 bg-secondary/30 rounded-lg">{icon}</div>
        <div>
          <p className="text-light/70">{title}</p>
          <p className="text-3xl font-bold">{value}</p>
        </div>
      </div>
    </div>
  );
}

async function getDashboardStats() {
  const supabase = await createClient();

  const [
    { count: projectCount },
    { count: articleCount },
    { count: quoteCount },
    { data: recentItems },
  ] = await Promise.all([
    supabase
      .from("content_items")
      .select("*", { count: "exact", head: true })
      .eq("content_type", "project"),
    supabase
      .from("content_items")
      .select("*", { count: "exact", head: true })
      .eq("content_type", "article")
      .eq("status", "published"),
    supabase
      .from("content_items")
      .select("*", { count: "exact", head: true })
      .eq("content_type", "quote")
      .eq("status", "published"),
    supabase
      .from("content_items")
      .select("id, title, updated_at, content_type")
      .order("updated_at", { ascending: false, nullsFirst: false })
      .limit(5),
  ]);

  return {
    projectCount: projectCount ?? 0,
    articleCount: articleCount ?? 0,
    quoteCount: quoteCount ?? 0,
    recentItems: recentItems ?? [],
  };
}

export default async function MudirDashboard() {
  const { projectCount, articleCount, quoteCount, recentItems } =
    await getDashboardStats();

  return (
    <div className="space-y-12">
      <div>
        <h1 className="text-4xl font-bold">Dashboard</h1>
        <p className="text-light/60 mt-2">
          Welcome back! Here's a quick overview of your personal platform.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <StatCard
          title="Total Projects"
          value={projectCount}
          icon={<GitMerge className="text-secondary" />}
        />
        <StatCard
          title="Published Articles"
          value={articleCount}
          icon={<PenSquare className="text-secondary" />}
        />
        <StatCard
          title="Published Quotes"
          value={quoteCount}
          icon={<Quote className="text-secondary" />}
        />
      </div>

      <div>
        <h2 className="text-2xl font-bold mb-4">Recent Activity</h2>
        <div className="bg-dark rounded-lg border border-light/10">
          <ul className="divide-y divide-light/10">
            {recentItems.map((item) => (
              <li
                key={item.id}
                className="p-4 flex justify-between items-center hover:bg-dark/70 transition-colors"
              >
                <div>
                  <span className="font-semibold">{item.title}</span>
                  <p className="text-sm text-light/50">
                    <span className="capitalize">{item.content_type}</span> -
                    Updated{" "}
                    {new Date(
                      item.updated_at || Date.now()
                    ).toLocaleDateString()}
                  </p>
                </div>
                <Link
                  href={`/mudir/content/${item.id}`}
                  className="p-2 text-light/70 hover:text-light transition-colors"
                >
                  <ArrowUpRight className="w-5 h-5" />
                </Link>
              </li>
            ))}
            {recentItems.length === 0 && (
              <li className="p-8 text-center text-light/50">
                No recent activity.
              </li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}
