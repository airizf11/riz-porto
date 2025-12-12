// src/app/(public)/exp/rizi-chatbot/page.tsx
import { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Sparkles } from "lucide-react";

import { ChatbotInterface } from "@/components/ChatbotInterface";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export const metadata: Metadata = {
  title: "Rizi-Bot | AI Assistant",
  description:
    "Chat with a personalized AI assistant trained on Riziyan's personal data, projects, articles, and more.",
};

export default function RiziChatbotPage() {
  return (
    <main className="min-h-screen bg-background text-foreground flex flex-col items-center justify-center relative overflow-hidden">
      {/* Background Decor (AI/Tech Vibe) */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-secondary/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="w-full max-w-6xl h-screen md:h-[90vh] flex flex-col p-4 md:p-8 relative z-10">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row items-center justify-between mb-6 md:mb-8 gap-4">
          <Button
            variant="ghost"
            className="pl-0 hover:pl-2 transition-all text-muted-foreground hover:text-foreground self-start md:self-auto"
            asChild
          >
            <Link href="/exp">
              <ArrowLeft className="w-4 h-4 mr-2" /> Back to Lab
            </Link>
          </Button>

          <div className="text-center md:text-right">
            <div className="flex items-center justify-center md:justify-end gap-3 mb-1">
              <h1 className="heading text-3xl md:text-4xl font-bold text-foreground">
                Rizi-Bot
              </h1>
              <Badge
                variant="outline"
                className="border-accent text-accent bg-accent/5 px-2 py-0.5 text-xs tracking-widest"
              >
                BETA v1.1
              </Badge>
            </div>
            <p className="text-sm text-muted-foreground flex items-center justify-center md:justify-end gap-1.5">
              <Sparkles className="w-3 h-3 text-secondary" />
              Powered by Vercel AI SDK & OpenRouter
            </p>
          </div>
        </div>

        {/* Chat Interface Container */}
        <div className="flex-1 min-h-0 relative rounded-2xl overflow-hidden shadow-2xl border border-border/50 bg-card/30 backdrop-blur-sm">
          <ChatbotInterface />
        </div>
      </div>
    </main>
  );
}
