"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send, Calendar, Clock, MapPin, Search, ChevronDown } from "lucide-react";
import { restaurantInfo, initialMessages, ChatMessage } from "@/lib/restaurantData";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>(initialMessages);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleOptionClick = (option: string) => {
    addMessage(option, 'user');
    processInput(option);
  };

  const handleSend = () => {
    if (!inputValue.trim()) return;
    addMessage(inputValue, 'user');
    processInput(inputValue);
    setInputValue("");
  };

  const addMessage = (content: string, role: 'user' | 'bot', type: ChatMessage['type'] = 'text') => {
    setMessages(prev => [...prev, { id: Date.now().toString(), role, content, type }]);
  };

  const processInput = (text: string) => {
    setIsTyping(true);
    const lowerText = text.toLowerCase();

    setTimeout(() => {
      setIsTyping(false);
      
      if (lowerText.includes("hour") || lowerText.includes("open") || lowerText.includes("close")) {
        addMessage(`We are open:\nMon-Thu: ${restaurantInfo.hours["Mon-Thu"]}\nFri-Sat: ${restaurantInfo.hours["Fri-Sat"]}\nSun: ${restaurantInfo.hours["Sun"]}`, 'bot');
      } 
      else if (lowerText.includes("location") || lowerText.includes("where") || lowerText.includes("address") || lowerText.includes("direction")) {
        addMessage(`We are located at: ${restaurantInfo.location.address}. ${restaurantInfo.location.directions}`, 'bot');
      }
      else if (lowerText.includes("reserve") || lowerText.includes("book") || lowerText.includes("table")) {
        addMessage("I can help with that! Please fill out the details below so our host can confirm your table.", 'bot');
        addMessage("", 'bot', 'reservation-form');
      }
      else if (lowerText.includes("happy hour")) {
        addMessage(restaurantInfo.happyHour.details, 'bot');
      }
      else {
        addMessage("I'm trained on Gra Pow's specific services. You can ask about Hours, Location, or Reservations!", 'bot');
      }
    }, 1000); // Simulated delay
  };

  return (
    <>
      {/* Floating Toggle */}
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-8 right-8 z-50 w-16 h-16 bg-gradient-to-tr from-yellow-600 to-yellow-400 rounded-full shadow-[0_0_20px_rgba(202,138,4,0.5)] flex items-center justify-center text-black border-2 border-white/20"
      >
        {isOpen ? <X className="w-8 h-8" /> : <MessageCircle className="w-8 h-8" />}
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            className="fixed bottom-28 right-8 z-50 w-[90vw] md:w-[400px] h-[600px] bg-[#0a0a0a] border border-white/10 rounded-2xl shadow-2xl flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="p-4 bg-white/5 border-b border-white/10 flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-yellow-500/20 flex items-center justify-center border border-yellow-500/50">
                <span className="text-xl">🤖</span>
              </div>
              <div>
                <h3 className="font-display font-bold text-white tracking-wide">Gra Pow Assistant</h3>
                <span className="flex items-center gap-1 text-[10px] text-green-400 uppercase tracking-wider">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                  Online
                </span>
              </div>
            </div>

            {/* Messages Area */}
            <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] p-3 rounded-2xl text-sm leading-relaxed ${
                      msg.role === 'user'
                        ? 'bg-yellow-600 text-white rounded-br-none'
                        : 'bg-white/10 text-gray-200 rounded-bl-none border border-white/5'
                    }`}
                  >
                    {msg.type === 'reservation-form' ? (
                      <ReservationForm onSubmit={() => {
                        addMessage("Reservation request sent! We'll email you a confirmation shortly.", 'bot');
                      }}/>
                    ) : (
                      <div className="whitespace-pre-line">{msg.content}</div>
                    )}
                  </div>
                </div>
              ))}
              
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-white/10 p-3 rounded-2xl rounded-bl-none flex gap-1">
                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:0.2s]" />
                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:0.4s]" />
                  </div>
                </div>
              )}
            </div>

            {/* Quick Options */}
            {!isTyping && messages[messages.length - 1]?.role === 'bot' && messages[messages.length - 1].options && (
               <div className="p-2 flex gap-2 overflow-x-auto">
                  {messages[messages.length - 1].options?.map(opt => (
                    <button 
                      key={opt}
                      onClick={() => handleOptionClick(opt)}
                      className="whitespace-nowrap px-3 py-1.5 rounded-full border border-yellow-500/30 text-yellow-500 text-xs hover:bg-yellow-500/10 transition-colors"
                    >
                      {opt}
                    </button>
                  ))}
               </div>
            )}

            {/* Input Area */}
            <div className="p-4 border-t border-white/10 bg-black/50 backdrop-blur-md">
              <div className="relative">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Ask about hours, menu, or parking..."
                  className="w-full bg-white/5 border border-white/10 rounded-full py-3 px-4 pr-12 text-sm text-white focus:outline-none focus:border-yellow-500/50 transition-colors"
                />
                <button
                  onClick={handleSend}
                  className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-yellow-600 rounded-full text-white hover:bg-yellow-500 transition-colors"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function ReservationForm({ onSubmit }: { onSubmit: () => void }) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({ date: "", time: "", guests: "2", name: "", email: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate API Call
    console.log("Submitting Reservation:", formData);
    onSubmit();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 min-w-[250px]">
      <div className="space-y-2">
        <Label className="text-xs uppercase tracking-wider text-yellow-500">Party Size</Label>
        <div className="flex gap-2">
          {[2, 4, 6, 8].map(num => (
            <button
              key={num}
              type="button"
              onClick={() => setFormData({...formData, guests: num.toString()})}
              className={`flex-1 py-2 text-xs border rounded ${formData.guests === num.toString() ? 'bg-yellow-600 border-yellow-600 text-black' : 'border-white/20 text-white'}`}
            >
              {num}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2">
        <div className="space-y-2">
           <Label className="text-xs uppercase tracking-wider text-gray-400">Date</Label>
           <Input 
             type="date" 
             className="bg-black/50 border-white/20 text-xs h-8"
             onChange={(e) => setFormData({...formData, date: e.target.value})}
             required
           />
        </div>
        <div className="space-y-2">
           <Label className="text-xs uppercase tracking-wider text-gray-400">Time</Label>
           <Input 
             type="time" 
             className="bg-black/50 border-white/20 text-xs h-8"
             onChange={(e) => setFormData({...formData, time: e.target.value})}
             required
           />
        </div>
      </div>

      <div className="space-y-2">
        <Input 
          placeholder="Your Name" 
          className="bg-black/50 border-white/20 text-xs" 
          onChange={(e) => setFormData({...formData, name: e.target.value})}
          required
        />
        <Input 
          placeholder="Email (for confirmation)" 
          type="email"
          className="bg-black/50 border-white/20 text-xs" 
          onChange={(e) => setFormData({...formData, email: e.target.value})}
          required
        />
      </div>

      <Button type="submit" className="w-full bg-yellow-600 hover:bg-yellow-500 text-black font-bold text-xs uppercase tracking-widest">
        Request Booking
      </Button>
      <p className="text-[10px] text-center text-gray-500">
        You will receive an email confirmation shortly.
      </p>
    </form>
  )
}
