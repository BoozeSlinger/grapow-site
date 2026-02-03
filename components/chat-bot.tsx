"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, X, Send, Bot } from "lucide-react";
import { KNOWLEDGE_BASE } from "@/lib/knowledge-base";

type Message = {
  id: string;
  role: "user" | "assistant";
  content: string;
};

export function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { id: "1", role: "assistant", content: "Sawatdee! I'm your Gra Pow AI guide. How can I help you with our menu or a reservation tonight?" }
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
        scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const generateResponse = (text: string) => {
    const input = text.toLowerCase();
    
    if (input.includes("reservation") || input.includes("book") || input.includes("table")) {
        return KNOWLEDGE_BASE.faqs[0].a;
    }
    if (input.includes("menu") || input.includes("food") || input.includes("eat")) {
        return `We have an extensive menu! Guests love our ${KNOWLEDGE_BASE.menu.popular.join(", ")}. Would you like to see appetizers, entrees, sushi, or our lounge drinks?`;
    }
    if (input.includes("hour") || input.includes("open") || input.includes("close")) {
        return `Dining: ${KNOWLEDGE_BASE.restaurant.hours.dining}. The Bar is open late: ${KNOWLEDGE_BASE.restaurant.hours.bar}.`;
    }
    if (input.includes("sushi") || input.includes("poke")) {
        return `Our Sushi Bar won Best of the Inland Empire in 2021! We offer ${KNOWLEDGE_BASE.menu.sushi.slice(0, 5).join(", ")} and more.`;
    }
    if (input.includes("location") || input.includes("address") || input.includes("where")) {
        return `We are located at ${KNOWLEDGE_BASE.restaurant.location}. Come visit us!`;
    }
    if (input.includes("phone") || input.includes("call")) {
        return `You can reach us at ${KNOWLEDGE_BASE.restaurant.phone}.`;
    }
    if (input.includes("award") || input.includes("best")) {
        return `Gra Pow is proud to be award-winning! ${KNOWLEDGE_BASE.restaurant.awards[0]} and ${KNOWLEDGE_BASE.restaurant.awards[1]}.`;
    }

    return "I'm not quite sure about that, but I can tell you about our award-winning Thai food, sushi, lounge cocktails, or help you with reservations!";
  };

  const handleSend = () => {
    if (!input.trim()) return;

    const userMsg: Message = { id: Date.now().toString(), role: "user", content: input };
    setMessages(prev => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);

    setTimeout(() => {
        const botMsg: Message = { id: (Date.now() + 1).toString(), role: "assistant", content: generateResponse(input) };
        setMessages(prev => [...prev, botMsg]);
        setIsTyping(false);
    }, 1200);
  };

  return (
    <>
      {/* Pro Max FAB */}
        <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.1, rotate: 10 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(true)}
        className="fixed bottom-8 right-8 z-50 w-16 h-16 bg-primary text-white rounded-full shadow-[0_0_40px_rgba(220,38,38,0.5)] flex items-center justify-center border-none cursor-pointer overflow-hidden group"
      >
        <div className="absolute inset-0 bg-cta translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
        <MessageSquare className="w-8 h-8 relative z-10" />
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 100 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 100 }}
            className="fixed bottom-28 right-4 md:right-8 z-50 w-[calc(100vw-2rem)] md:w-[420px] h-[650px] shadow-2xl flex flex-col overflow-hidden rounded-[2.5rem] opulent-glass"
          >
            {/* Header */}
            <div className="p-8 bg-black/40 border-b border-white/5 flex justify-between items-center backdrop-blur-3xl">
              <div className="flex items-center gap-4">
                <div className="relative w-12 h-12 rounded-2xl bg-primary/20 flex items-center justify-center text-primary border border-primary/30 overflow-hidden">
                   <div className="absolute inset-0 bg-primary/10 animate-pulse" />
                   <Bot className="w-7 h-7 relative z-10" />
                </div>
                <div>
                  <h3 className="font-cormorant font-bold text-white text-xl leading-tight uppercase italic">Gra Pow AI</h3>
                  <div className="flex items-center gap-1.5 pt-1">
                     <span className="w-1.5 h-1.5 bg-cta rounded-full animate-pulse gold-glow" />
                     <span className="text-cta text-[10px] uppercase tracking-[0.2em] font-bold font-montserrat">Live Assistance</span>
                  </div>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)} 
                className="w-10 h-10 rounded-full flex items-center justify-center text-zinc-500 hover:text-white hover:bg-white/5 transition-all"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Messages */}
            <div ref={scrollRef} className="flex-1 overflow-y-auto p-8 space-y-8 no-scrollbar">
              {messages.map((m) => (
                <motion.div
                  key={m.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div className={`max-w-[85%] p-5 rounded-4xl shadow-lg ${m.role === "user" ? "bg-primary text-white font-medium" : "bg-white/5 text-zinc-100 border border-white/5"} ${m.role === "user" ? "rounded-tr-none border-none" : "rounded-tl-none"}`}>
                     <p className="font-montserrat text-[14px] leading-relaxed tracking-wide font-light">{m.content}</p>
                  </div>
                </motion.div>
              ))}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-white/5 p-5 rounded-4xl rounded-tl-none border border-white/5">
                    <div className="flex gap-1.5">
                        <motion.div animate={{ opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 1 }} className="w-2 h-2 bg-cta rounded-full gold-glow" />
                        <motion.div animate={{ opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 1, delay: 0.2 }} className="w-2 h-2 bg-cta rounded-full gold-glow" />
                        <motion.div animate={{ opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 1, delay: 0.4 }} className="w-2 h-2 bg-cta rounded-full gold-glow" />
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Input */}
            <div className="p-8 bg-black/40 border-t border-white/5 backdrop-blur-3xl">
              <div className="relative flex items-center group">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleSend()}
                  placeholder="Ask anything..."
                  className="w-full bg-white/5 border border-white/10 text-white p-5 pr-14 rounded-2xl focus:border-primary focus:outline-none transition-all font-montserrat placeholder:text-zinc-600 focus:bg-white/8 text-sm"
                />
                <button 
                  onClick={handleSend}
                  className="absolute right-3 w-10 h-10 flex items-center justify-center text-primary hover:text-cta transition-colors p-2"
                >
                  <Send className="w-6 h-6" />
                </button>
              </div>
              <p className="text-[9px] text-zinc-600 mt-5 text-center uppercase tracking-[0.4em] font-montserrat font-bold">
                 Premium Concierge Service
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
