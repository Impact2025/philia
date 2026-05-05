"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Send, Loader2 } from "lucide-react";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const SUGGESTED_QUESTIONS = [
  "Wat doet Stichting Philia?",
  "Hoe werkt Vrijwilligersmatch.nl?",
  "Hoe kan ik meedoen?",
  "Wie is Vincent van Münster?",
];

export default function PhilChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      // Welcome message
      setMessages([
        {
          role: "assistant",
          content:
            "Hoi! Ik ben Phil, de assistent van Stichting Philia. Waarmee kan ik je helpen?",
        },
      ]);
    }
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 300);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async (text?: string) => {
    const messageText = text || input.trim();
    if (!messageText || isLoading) return;

    setInput("");
    const userMessage: Message = { role: "user", content: messageText };
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setIsLoading(true);

    try {
      const response = await fetch("/api/ai/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: newMessages.map((m) => ({ role: m.role, content: m.content })),
        }),
      });

      if (!response.ok) {
        throw new Error("API error");
      }

      const reader = response.body?.getReader();
      if (!reader) throw new Error("No reader");

      const decoder = new TextDecoder();
      let assistantContent = "";
      setMessages((prev) => [...prev, { role: "assistant", content: "" }]);

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });
        const lines = chunk.split("\n");

        for (const line of lines) {
          if (line.startsWith("data: ")) {
            const data = line.slice(6);
            if (data === "[DONE]") continue;
            try {
              const parsed = JSON.parse(data);
              if (parsed.content) {
                assistantContent += parsed.content;
                setMessages((prev) => {
                  const updated = [...prev];
                  updated[updated.length - 1] = {
                    role: "assistant",
                    content: assistantContent,
                  };
                  return updated;
                });
              }
            } catch {
              // skip
            }
          }
        }
      }
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            "Sorry, ik kan momenteel niet antwoorden. Probeer het later opnieuw of stuur een e-mail naar info@stichtingphilia.nl.",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <>
      {/* Chat panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="fixed bottom-28 right-8 z-50 w-[calc(100vw-40px)] sm:w-[380px] bg-white shadow-2xl overflow-hidden flex flex-col border border-black/10"
            style={{ height: "520px" }}
          >
            {/* Header */}
            <div className="bg-primary px-5 py-4 flex items-center justify-between flex-shrink-0">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-accent rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-sm font-serif">P</span>
                </div>
                <div>
                  <p className="text-white font-medium text-sm">Phil</p>
                  <p className="text-white/50 text-xs">Assistent van Stichting Philia</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-white/50 hover:text-white transition-colors"
                aria-label="Sluiten"
              >
                <X size={18} />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[85%] px-4 py-3 rounded-2xl text-sm leading-relaxed ${
                      msg.role === "user"
                        ? "bg-purple-600 text-white rounded-br-sm"
                        : "bg-gray-100 text-dark rounded-bl-sm"
                    }`}
                  >
                    {msg.content || (
                      <span className="flex space-x-1 py-1">
                        <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                        <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                        <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                      </span>
                    )}
                  </div>
                </div>
              ))}

              {/* Suggested questions (only on first message) */}
              {messages.length === 1 && (
                <div className="space-y-2 pt-2">
                  <p className="text-gray-400 text-xs px-1">Veelgestelde vragen:</p>
                  <div className="flex flex-wrap gap-2">
                    {SUGGESTED_QUESTIONS.map((q) => (
                      <button
                        key={q}
                        onClick={() => sendMessage(q)}
                        className="text-xs px-3 py-1.5 bg-purple-50 text-purple-600 border border-purple-200 rounded-full hover:bg-purple-100 transition-colors text-left"
                      >
                        {q}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-4 border-t border-border flex-shrink-0">
              <div className="flex items-center space-x-2 bg-gray-50 border border-border rounded-xl px-4 py-3 focus-within:border-purple-300 transition-colors">
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Stel een vraag..."
                  className="flex-1 bg-transparent text-sm text-dark placeholder-gray-400 outline-none"
                  disabled={isLoading}
                />
                <button
                  onClick={() => sendMessage()}
                  disabled={!input.trim() || isLoading}
                  className="text-purple-600 disabled:text-gray-300 hover:text-purple-700 transition-colors"
                  aria-label="Verstuur"
                >
                  {isLoading ? (
                    <Loader2 size={18} className="animate-spin" />
                  ) : (
                    <Send size={18} />
                  )}
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toggle button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-8 right-8 z-50 w-16 h-16 bg-primary text-white rounded-full shadow-2xl flex items-center justify-center hover:scale-110 transition-transform"
        aria-label="Chat openen"
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div key="x" initial={{ rotate: -90 }} animate={{ rotate: 0 }} exit={{ rotate: 90 }}>
              <X size={22} />
            </motion.div>
          ) : (
            <motion.div key="chat" initial={{ rotate: 90 }} animate={{ rotate: 0 }} exit={{ rotate: -90 }}>
              <span className="material-symbols-outlined text-3xl group-hover:rotate-12 transition-transform">chat_bubble</span>
            </motion.div>
          )}
        </AnimatePresence>
        {!isOpen && (
          <div className="absolute -top-1 -right-1 w-4 h-4 bg-accent rounded-full border-2 border-white animate-pulse" />
        )}
      </motion.button>
    </>
  );
}
