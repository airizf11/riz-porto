// src/app/(admin)/mudir/aichat/page.tsx
import { createClient } from "@/lib/supabase/server";
import AiDashboardClient from "./client-page";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI Chat Management | Admin Panel",
  description: "Manage the knowledge base for the personalized AI chatbot.",
};

async function getAiManagementData() {
  const supabase = await createClient();
  const { data: manualKnowledge } = await supabase
    .from("manual_knowledge")
    .select("*")
    .order("created_at", { ascending: false });

  // can fetch statistik lain

  return { manualKnowledge: manualKnowledge ?? [] };
}

export default async function AiChatManagementPageContainer() {
  const data = await getAiManagementData();
  return <AiDashboardClient initialKnowledge={data.manualKnowledge} />;
}
