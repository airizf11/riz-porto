// src/components/ChatbotInterface.tsx
"use client";

import { useState, useEffect, useRef, FormEvent } from "react";
import {
  Bot,
  // User,
  CornerDownLeft,
  Loader,
} from "lucide-react";
import { MarkdownRenderer } from "./MarkdownRenderer";
import { AnimatePresence, motion } from "framer-motion";

type Message = {
  id: string;
  role: "user" | "assistant";
  content: string;
};

const initialMessage: Message = {
  id: "init",
  role: "assistant",
  content:
    "Hello! I'm Rizi-Bot. I have been trained on Riziyan's personal data. Feel free to ask me anything about his projects, articles, skills or other.",
};

export function ChatbotInterface() {
  const [messages, setMessages] = useState<Message[]>([initialMessage]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input,
    };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: [...messages, userMessage] }),
      });

      if (!response.ok || !response.body)
        throw new Error(`API error: ${response.statusText}`);

      const assistantMessageId = (Date.now() + 1).toString();
      setMessages((prev) => [
        ...prev,
        { id: assistantMessageId, role: "assistant", content: "" },
      ]);

      const reader = response.body.getReader();
      const decoder = new TextDecoder();

      while (true) {
        const { value, done } = await reader.read();
        if (done) break;

        const chunkText = decoder.decode(value);
        setMessages((prev) =>
          prev.map((msg) =>
            msg.id === assistantMessageId
              ? { ...msg, content: msg.content + chunkText }
              : msg
          )
        );
      }
    } catch (error) {
      console.error("Chat submission error:", error);
      setMessages((prev) => [
        ...prev,
        {
          id: "error",
          role: "assistant",
          content:
            "Sorry, I'm having trouble connecting right now. Please try again later.",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col flex-1 bg-dark/80 backdrop-blur-xl border border-light/20 rounded-2xl shadow-2xl overflow-hidden">
      <div className="flex-1 p-4 sm:p-6 space-y-5 overflow-y-auto">
        <AnimatePresence>
          {messages.map((m, i) => (
            <motion.div
              key={m.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.1 * i }}
              className={`flex gap-3 text-sm ${
                m.role === "user" ? "justify-end" : "justify-start"
              }`}
            >
              {m.role === "assistant" && (
                <div className="w-8 h-8 rounded-full bg-secondary flex-shrink-0 flex items-center justify-center">
                  <Bot size={18} />
                </div>
              )}
              <div
                className={`p-3 rounded-xl max-w-md prose prose-sm prose-invert prose-p:my-0 ${
                  m.role === "user"
                    ? "bg-primary text-dark rounded-br-none"
                    : "bg-neutral-800 text-light rounded-bl-none"
                }`}
              >
                <MarkdownRenderer content={m.content} />
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
        {isLoading && messages[messages.length - 1]?.role === "user" && (
          <div className="flex justify-start gap-3">
            <div className="w-8 h-8 rounded-full bg-secondary flex-shrink-0 flex items-center justify-center">
              <Bot size={18} />
            </div>
            <div className="p-3 rounded-lg bg-neutral-800">
              <Loader size={18} className="animate-spin" />
            </div>
          </div>
        )}
        <div ref={scrollRef}></div>
      </div>

      <footer className="p-4 border-t border-light/10">
        <form onSubmit={handleSubmit} className="relative">
          <input
            className="w-full bg-neutral-800 border border-light/20 rounded-lg p-4 pr-14 focus:ring-2 focus:ring-accent outline-none placeholder:text-light/40"
            value={input}
            placeholder="Ask about projects, skills, etc..."
            onChange={(e) => setInput(e.target.value)}
            disabled={isLoading}
          />
          <button
            type="submit"
            className="absolute right-3 top-1/2 -translate-y-1/2 p-2 text-light/50 hover:text-light transition-colors disabled:opacity-50"
            disabled={isLoading || !input.trim()}
          >
            <CornerDownLeft size={20} />
          </button>
        </form>
      </footer>
    </div>
  );
}
