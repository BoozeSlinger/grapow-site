"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { Menu, X, ChevronRight } from "lucide-react";
import Link from "next/link";

const NAV_ITEMS = [
  { name: "Menu", href: "/menu" },
  { name: "Lounge", href: "#happening" },
  { name: "Events", href: "#happening" },
  { name: "Story", href: "#story" },
  { name: "Contact", href: "#contact" },
];

export function SiteHeader() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { scrollY } = useScroll();
  
  // Dynamic opacity and blur based on scroll
  const navBg = useTransform(scrollY, [0, 50], ["rgba(0,0,0,0)", "rgba(0,0,0,0.8)"]);
  const navBlur = useTransform(scrollY, [0, 50], ["blur(0px)", "blur(20px)"]);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.header 
      style={{ backgroundColor: navBg, backdropFilter: navBlur }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${scrolled ? "py-4 border-b border-white/3" : "py-10"}`}
    >
      <nav className="container mx-auto px-8 flex justify-between items-center">
        <Link href="/" className="group flex items-center gap-4">
            <div className="relative overflow-hidden w-12 h-12 flex items-center justify-center">
                 <motion.div 
                    animate={{ rotate: [0, 90, 180, 270, 360] }}
                    transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-0 border border-primary/20 rounded-lg group-hover:border-cta/40 transition-colors"
                 />
                 <span className="text-primary font-cormorant font-bold text-2xl tracking-tighter epic-glow">GP</span>
            </div>
            <div className="flex flex-col">
                <span className="text-2xl font-cormorant font-bold text-white tracking-[0.15em] group-hover:text-primary transition-colors leading-none uppercase italic">
                    GRA<span className="text-primary not-italic">POW</span>
                </span>
                <span className="text-[8px] font-montserrat font-bold text-zinc-600 uppercase tracking-[0.4em] mt-1 group-hover:text-zinc-400 transition-colors px-0.5">Riverside, CA</span>
            </div>
        </Link>

        {/* Desktop Nav - Clean, Organic Luxe */}
        <div className="hidden md:flex items-center gap-14">
          {NAV_ITEMS.map((item) => (
            <Link 
                key={item.name} 
                href={item.href}
                className="relative group text-[11px] font-montserrat font-bold uppercase tracking-[0.5em] text-zinc-500 hover:text-white transition-all duration-500 py-2"
            >
              {item.name}
              <motion.span 
                className="absolute -bottom-1 left-0 w-0 h-[1.5px] bg-cta shadow-[0_0_15px_rgba(202,138,4,0.6)] transition-all duration-500 group-hover:w-full"
                layoutId="nav-underline"
              />
            </Link>
          ))}
          <Link 
            href="#contact"
            className="group relative text-[11px] font-montserrat font-black uppercase tracking-[0.5em] text-cta hover:text-white transition-all duration-500 ml-6 flex items-center gap-2"
          >
            <span className="w-1.5 h-1.5 bg-cta rounded-full animate-pulse group-hover:scale-150 transition-transform gold-glow" />
            Reservations
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button 
          onClick={() => setIsOpen(!isOpen)} 
          className="md:hidden text-white w-12 h-12 flex items-center justify-center hover:bg-white/5 rounded-full transition-colors"
        >
          {isOpen ? <X strokeWidth={1} /> : <Menu strokeWidth={1} />}
        </button>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
            animate={{ opacity: 1, backdropFilter: "blur(40px)" }}
            exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
            className="fixed inset-0 bg-black/90 z-40 flex flex-col p-8 pt-40 gap-10"
          >
             {NAV_ITEMS.map((item, idx) => (
                <motion.div
                    key={item.name}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.1 }}
                >
                    <Link 
                        href={item.href} 
                        onClick={() => setIsOpen(false)}
                        className="text-5xl font-cormorant font-bold text-white flex items-center justify-between group uppercase italic tracking-tighter"
                    >
                        <span className="group-hover:text-cta transition-colors">{item.name}</span>
                        <ChevronRight className="text-cta group-hover:translate-x-4 transition-transform w-10 h-10 stroke-1 gold-glow" />
                    </Link>
                </motion.div>
             ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
