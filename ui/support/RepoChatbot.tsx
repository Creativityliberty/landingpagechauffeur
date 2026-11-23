"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Send } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { CONFIG } from "@/config";
import { useLanguage } from "@/lib/i18n";
import { BrandCrest } from "@/ui/icons/BrandIcons";

interface Message {
  role: "user" | "assistant";
  content: string;
}

interface RepoChatbotProps {
  isDarkMode: boolean;
  isOpen: boolean;
  onClose: () => void;
}

export function RepoChatbot({ isDarkMode, isOpen, onClose }: RepoChatbotProps) {
  const { locale, t } = useLanguage();
  const [messages, setMessages] = useState<Message[]>([
    { role: "assistant", content: t.support.chatGreeting },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const theme = isDarkMode ? CONFIG.theme.modes.dark : CONFIG.theme.modes.light;

  // Reset initial greeting when locale changes before conversation starts
  useEffect(() => {
    setMessages((prev) =>
      prev.length <= 1
        ? [{ role: "assistant", content: t.support.chatGreeting }]
        : prev,
    );
  }, [locale, t.support.chatGreeting]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  const handleSend = async (text: string = input) => {
    if (!text.trim() || isLoading) return;

    const userMsg: Message = { role: "user", content: text };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsLoading(true);

    try {
      const res = await fetch("/api/repo-chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: messages.concat(userMsg).map((m) => ({
            role: m.role === "assistant" ? "model" : "user",
            content: m.content,
          })),
        }),
      });
      const data = await res.json();
      if (data.content) {
        setMessages((prev) => [
          ...prev,
          { role: "assistant", content: data.content },
        ]);
      } else {
        setMessages((prev) => [
          ...prev,
          {
            role: "assistant",
            content:
              "I couldn't reach the concierge service right now. Please use the quotation form or WhatsApp directly.",
          },
        ]);
      }
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            "Connection error. Please reach us directly on WhatsApp or via the booking request form.",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="md:hidden fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm"
          />

          <motion.div
            initial={{ opacity: 0, y: "100%" }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-x-0 bottom-0 top-24 md:top-auto md:inset-auto md:bottom-24 md:right-8 md:w-[420px] md:h-[620px] z-[110] flex flex-col overflow-hidden shadow-2xl rounded-t-[2rem] md:rounded-[2rem] border"
            style={{
              borderColor: theme.border,
              backgroundColor: isDarkMode ? "#0B192C" : "#FFFFFF",
              color: theme.text,
            }}
          >
            {/* Header */}
            <div
              className="p-5 border-b flex items-center justify-between"
              style={{
                backgroundColor: isDarkMode ? "#06101E" : "#F8FAFC",
                borderColor: theme.border,
              }}
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#06101E] border border-[#C8A45D]/40 flex items-center justify-center text-[#C8A45D]">
                  <BrandCrest size={20} />
                </div>
                <div>
                  <h3 className="font-bold text-sm tracking-wide">
                    {t.support.chatTitle}
                  </h3>
                  <p className="text-[11px]" style={{ color: theme.muted }}>
                    {t.support.chatSubtitle}
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="p-2 rounded-full hover:bg-white/10 transition-colors cursor-pointer"
                aria-label="Close chat"
              >
                <X size={18} />
              </button>
            </div>

            {/* Messages */}
            <div
              ref={scrollRef}
              className="flex-1 overflow-y-auto p-5 space-y-4"
            >
              {messages.map((m, i) => (
                <div
                  key={i}
                  className={`flex ${
                    m.role === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-[85%] p-3.5 rounded-2xl text-sm leading-relaxed ${
                      m.role === "user"
                        ? "bg-[#C8A45D] text-[#06101E] font-semibold rounded-br-none"
                        : "border rounded-bl-none"
                    }`}
                    style={
                      m.role === "assistant"
                        ? {
                            backgroundColor: isDarkMode ? "#06101E" : "#F8FAFC",
                            borderColor: theme.border,
                          }
                        : undefined
                    }
                  >
                    {m.role === "assistant" ? (
                      <div className="prose prose-sm max-w-none dark:prose-invert prose-a:text-[#C8A45D]">
                        <ReactMarkdown remarkPlugins={[remarkGfm]}>
                          {m.content}
                        </ReactMarkdown>
                      </div>
                    ) : (
                      m.content
                    )}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div
                    className="p-3 rounded-2xl border text-xs"
                    style={{ borderColor: theme.border }}
                  >
                    ...
                  </div>
                </div>
              )}
            </div>

            {/* Input */}
            <div
              className="p-4 border-t space-y-3"
              style={{
                backgroundColor: isDarkMode ? "#06101E" : "#FFFFFF",
                borderColor: theme.border,
              }}
            >
              {messages.length === 1 && !isLoading && (
                <div className="flex gap-2 overflow-x-auto pb-1">
                  {t.support.chatSuggestions.map((sug) => (
                    <button
                      key={sug}
                      type="button"
                      onClick={() => handleSend(sug)}
                      className="shrink-0 px-3 py-1.5 rounded-full text-xs font-medium border border-[#C8A45D]/35 hover:bg-[#C8A45D]/15 transition-colors cursor-pointer"
                    >
                      {sug}
                    </button>
                  ))}
                </div>
              )}

              <div className="relative flex items-center">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSend()}
                  placeholder={t.support.chatPlaceholder}
                  className="w-full border rounded-full py-3 pl-4 pr-12 text-sm focus:border-[#C8A45D]"
                  style={{
                    backgroundColor: isDarkMode ? "#0B192C" : "#F8FAFC",
                    borderColor: theme.border,
                    color: theme.text,
                  }}
                />
                <button
                  type="button"
                  onClick={() => handleSend()}
                  disabled={!input.trim() || isLoading}
                  className="absolute right-1.5 w-9 h-9 rounded-full bg-[#C8A45D] text-[#06101E] flex items-center justify-center disabled:opacity-40 cursor-pointer"
                  aria-label="Send"
                >
                  <Send size={15} />
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
