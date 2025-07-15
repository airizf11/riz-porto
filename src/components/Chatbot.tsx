// src/components/Chatbot.tsx
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useState, useEffect, useRef, FormEvent } from "react";
import { Bot, User, CornerDownLeft, Loader, X } from "lucide-react";
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
    "Hi! I'm Rizi-Bot. Feel free to ask me anything about Riziyan's projects, articles, skills and more...",
};

export function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
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
          content: "Sorry, I'm having trouble connecting right now.",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="flex flex-col w-[22rem] h-[36rem] bg-dark/80 backdrop-blur-xl border border-light/20 rounded-2xl shadow-2xl transition-all"
          >
            <header className="p-4 border-b border-light/10 flex justify-between items-center">
              <div>
                <h3 className="font-bold text-lg text-light">
                  Chat with Rizi-Bot
                </h3>
                <p className="text-sm text-light/60">Your guide to this site</p>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-light/60 hover:text-light"
              >
                <X size={20} />
              </button>
            </header>

            <div className="flex-1 p-4 space-y-5 overflow-y-auto">
              {messages.map((m) => (
                <div
                  key={m.id}
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
                    className={`p-3 rounded-xl max-w-xs ${
                      m.role === "user"
                        ? "bg-primary text-dark rounded-br-none"
                        : "bg-neutral-800 text-light rounded-bl-none"
                    }`}
                  >
                    <MarkdownRenderer content={m.content} />
                  </div>
                </div>
              ))}
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
                  className="w-full bg-neutral-800 border border-light/20 rounded-lg p-3 pr-12 focus:ring-2 focus:ring-accent outline-none placeholder:text-light/40"
                  value={input}
                  placeholder="Ask about projects..."
                  onChange={(e) => setInput(e.target.value)}
                  disabled={isLoading}
                />
                <button
                  type="submit"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-light/50 hover:text-light transition-colors"
                  disabled={isLoading || !input.trim()}
                >
                  <CornerDownLeft size={20} />
                </button>
              </form>
            </footer>
          </motion.div>
        )}

        {/* Tombol Toggle Chat */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="mt-4 float-right w-16 h-16 bg-primary rounded-full flex items-center justify-center shadow-lg transform transition-all hover:scale-110 active:scale-95"
        >
          {isOpen ? (
            <X size={28} className="text-dark" />
          ) : (
            <Bot size={28} className="text-dark" />
          )}
        </button>
      </AnimatePresence>
    </div>
  );
}
