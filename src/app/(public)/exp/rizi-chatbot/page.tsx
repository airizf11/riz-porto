// src/app/(public)/exp/rizi-chatbot/page.tsx
/* eslint-disable react/no-unescaped-entities */
import { Metadata } from "next";
import { ChatbotInterface } from "@/components/ChatbotInterface";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const metadata: Metadata = {
  title: "Rizi-Bot | AI Chat Assistant Experiment ",
  description:
    "Chat with a personalized AI assistant trained on Riziyan's personal data, projects, articles and more.",
};

export default function RiziChatbotPage() {
  return (
    <main className="min-h-screen bg-dark text-light flex flex-col items-center justify-center">
      {/* Kontainer untuk memusatkan antarmuka chatbot */}
      <div className="w-full max-w-6xl h-[85vh] md:h-[90vh] flex flex-col p-8">
        <Link
          href="/"
          className="group inline-flex items-center gap-2 text-light/70 hover:text-light mb-12 transition-colors"
        >
          <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
          Back to Home
        </Link>
        <header className="text-center mb-6">
          <h1 className="heading text-4xl md:text-5xl text-accent">
            Rizi-Bot{" "}
            <span className="text-sm align-top font-semibold bg-yellow-500/20 text-yellow-300 border border-yellow-500/30 px-2 py-1 rounded-full">
              BETA
            </span>
          </h1>
          <p className="narrative text-light/80 mt-4">
            An experimental AI assistant. Ask me anything about Riziyan's work.
          </p>
        </header>

        <ChatbotInterface />
      </div>
    </main>
  );
}
