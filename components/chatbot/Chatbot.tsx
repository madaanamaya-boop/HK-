"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { MessageSquareText, X, Send, Sparkles } from "lucide-react";
import { getBotReply, BOT_GREETING, type BotReply } from "@/lib/chatbot";
import { submitLead } from "@/lib/leads";
import { mobileRegex } from "@/lib/validators";
import { cn } from "@/lib/utils";

interface ChatMessage {
  id: number;
  role: "user" | "bot";
  text: string;
  links?: BotReply["links"];
  quickReplies?: string[];
}

type LeadStage = null | "name" | "mobile" | "done";

let messageId = 0;
const nextId = () => ++messageId;

export function Chatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const [leadStage, setLeadStage] = useState<LeadStage>(null);
  const [leadName, setLeadName] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Seed greeting on first open
  useEffect(() => {
    if (open && messages.length === 0) {
      setMessages([
        {
          id: nextId(),
          role: "bot",
          text: BOT_GREETING.text,
          quickReplies: BOT_GREETING.quickReplies,
        },
      ]);
    }
  }, [open, messages.length]);

  // Auto-scroll to the latest message
  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, typing]);

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open, typing]);

  const pushBot = (reply: Omit<ChatMessage, "id" | "role">, delay = 500) => {
    setTyping(true);
    window.setTimeout(() => {
      setTyping(false);
      setMessages((prev) => [...prev, { id: nextId(), role: "bot", ...reply }]);
    }, delay);
  };

  const handleLeadFlow = async (text: string) => {
    if (leadStage === "name") {
      if (text.trim().length < 2) {
        pushBot({ text: "Could you share your full name, please?" });
        return;
      }
      setLeadName(text.trim());
      setLeadStage("mobile");
      pushBot({ text: `Thank you, ${text.trim()}. And your 10-digit mobile number?` });
      return;
    }
    if (leadStage === "mobile") {
      const mobile = text.replace(/[\s-]/g, "");
      if (!mobileRegex.test(mobile)) {
        pushBot({ text: "That doesn't look like a valid 10-digit Indian mobile number. Could you re-check and share it again?" });
        return;
      }
      setLeadStage("done");
      const res = await submitLead({ name: leadName, mobile, source: "chatbot", consent: true });
      pushBot({
        text: res.success
          ? "Perfect — your callback request is registered. An HK FINCORP expert will call you shortly for a free consultation. Is there anything else I can help you with?"
          : "I couldn't register your request just now. Please try again in a moment, or reach us directly on WhatsApp or phone from the Contact page.",
        quickReplies: ["Check EMI", "Home Loan", "Documents Required"],
      });
      setLeadStage(null);
      return;
    }
  };

  const send = async (raw?: string) => {
    const text = (raw ?? input).trim();
    if (!text || typing) return;
    setInput("");
    setMessages((prev) => [...prev, { id: nextId(), role: "user", text }]);

    if (leadStage === "name" || leadStage === "mobile") {
      await handleLeadFlow(text);
      return;
    }

    const reply = getBotReply(text);
    if (reply.collectLead) {
      setLeadStage("name");
    }
    pushBot({ text: reply.text, links: reply.links, quickReplies: reply.quickReplies });
  };

  return (
    <>
      {/* Launcher */}
      <motion.button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? "Close chat assistant" : "Open chat assistant"}
        aria-expanded={open}
        aria-controls="hkf-chatbot"
        initial={{ opacity: 0, scale: 0.6 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1, duration: 0.4 }}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        className="grad-fill fixed bottom-40 right-4 z-40 flex h-14 w-14 items-center justify-center rounded-full text-white shadow-gold lg:bottom-6 lg:right-6"
      >
        {open ? <X className="h-6 w-6" aria-hidden="true" /> : <MessageSquareText className="h-6 w-6" aria-hidden="true" />}
      </motion.button>

      {/* Panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            id="hkf-chatbot"
            role="dialog"
            aria-label="HK FINCORP chat assistant"
            initial={{ opacity: 0, y: 24, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.97 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="fixed bottom-56 right-4 z-40 flex h-[min(560px,calc(100dvh-16rem))] w-[calc(100vw-2rem)] max-w-sm flex-col overflow-hidden rounded-3xl bg-white shadow-2xl lg:bottom-24 lg:right-6"
          >
            {/* Header */}
            <div className="grad-fill flex items-center gap-3 px-5 py-4">
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white/20">
                <Sparkles className="h-4.5 w-4.5 text-white" aria-hidden="true" />
              </span>
              <div className="flex-1">
                <p className="font-display text-sm font-bold text-white">HK FINCORP Assistant</p>
                <p className="text-xs text-white/80">Typically replies instantly</p>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close chat"
                className="rounded-lg p-1.5 text-white/80 transition-colors hover:bg-white/20 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-500"
              >
                <X className="h-4.5 w-4.5" aria-hidden="true" />
              </button>
            </div>

            {/* Messages */}
            <div ref={scrollRef} className="thin-scroll flex-1 space-y-4 overflow-y-auto bg-ivory-50 px-4 py-5">
              {messages.map((m) => (
                <div key={m.id} className={cn("flex", m.role === "user" ? "justify-end" : "justify-start")}>
                  <div className="max-w-[85%] space-y-2">
                    <div
                      className={cn(
                        "rounded-2xl px-4 py-3 text-sm leading-relaxed",
                        m.role === "user"
                          ? "grad-fill rounded-br-md text-white"
                          : "rounded-bl-md bg-white text-midnight-700 shadow-sm"
                      )}
                    >
                      {m.text}
                    </div>
                    {m.links && m.links.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {m.links.map((l) =>
                          l.href.startsWith("http") ? (
                            <a
                              key={l.href}
                              href={l.href}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="grad-fill rounded-full px-3.5 py-1.5 text-xs font-semibold text-white transition-opacity hover:opacity-90"
                            >
                              {l.label}
                            </a>
                          ) : (
                            <Link
                              key={l.href}
                              href={l.href}
                              onClick={() => setOpen(false)}
                              className="grad-fill rounded-full px-3.5 py-1.5 text-xs font-semibold text-white transition-opacity hover:opacity-90"
                            >
                              {l.label}
                            </Link>
                          )
                        )}
                      </div>
                    )}
                    {m.role === "bot" && m.quickReplies && m.quickReplies.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {m.quickReplies.map((q) => (
                          <button
                            key={q}
                            type="button"
                            onClick={() => send(q)}
                            className="rounded-full border border-midnight-900/10 bg-white px-3.5 py-1.5 text-xs font-medium text-midnight-700 transition-all hover:border-gold-500 hover:bg-gold-500/5 hover:text-gold-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-500"
                          >
                            {q}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}
              {typing && (
                <div className="flex justify-start" aria-label="Assistant is typing">
                  <div className="flex items-center gap-1.5 rounded-2xl rounded-bl-md border border-midnight-900/8 bg-white px-4 py-3.5 shadow-sm">
                    {[0, 1, 2].map((i) => (
                      <motion.span
                        key={i}
                        className="h-1.5 w-1.5 rounded-full bg-gold-500"
                        animate={{ opacity: [0.3, 1, 0.3] }}
                        transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Composer */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                void send();
              }}
              className="flex items-center gap-2 border-t border-midnight-900/8 bg-white px-4 py-3"
            >
              <input
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={
                  leadStage === "name"
                    ? "Type your name…"
                    : leadStage === "mobile"
                      ? "Type your mobile number…"
                      : "Ask about loans, insurance, documents…"
                }
                aria-label="Type your message"
                className="flex-1 rounded-full border border-midnight-900/10 bg-ivory-100 px-4 py-2.5 text-sm text-midnight-900 placeholder:text-midnight-500 focus:border-gold-500 focus:bg-white focus:outline-none focus:ring-4 focus:ring-gold-500/12"
              />
              <button
                type="submit"
                aria-label="Send message"
                disabled={!input.trim() || typing}
                className="grad-fill flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-white transition-opacity hover:opacity-90 disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-500 focus-visible:ring-offset-2"
              >
                <Send className="h-4.5 w-4.5" aria-hidden="true" />
              </button>
            </form>
            <p className="border-t border-midnight-900/8 bg-ivory-100 px-4 py-2 text-center text-[10px] leading-snug text-midnight-600">
              Guidance only — final terms subject to lender/insurer policies. Not financial advice.
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
