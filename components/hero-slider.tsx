"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

const SLIDES = [
  {
    image: "/images/bar-interior.jpg",
    title: "Modern Thai Soul",
    subtitle: "Experience the Nightlife of Riverside",
    accent: "Est. 2006"
  },
  {
    image: "/images/thai-dish.png",
    title: "Award Winning",
    subtitle: "Best Thai Food in Riverside 2022",
    accent: "Authentic"
  }
];

export function HeroSlider() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % SLIDES.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative h-screen w-full bg-black overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 1.5, ease: [0.33, 1, 0.68, 1] }}
          className="absolute inset-0 z-0"
        >
          <div className="absolute inset-0 bg-linear-to-b from-black/40 via-transparent to-black z-10" />
          <Image
            src={SLIDES[current].image}
            alt="GraPow Hero"
            fill
            className="object-cover brightness-50"
            priority
          />
        </motion.div>
      </AnimatePresence>

      <div className="relative z-20 h-full flex flex-col items-center justify-center text-center px-4 pt-32">
        {/* Transparent Logo Overlay - Enlarged Pro Max */}
        <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="mb-12 relative"
        >
            <div className="absolute inset-0 blur-[100px] bg-primary/20 rounded-full" />
            <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 blur-[60px] bg-cta/10 h-1/2 rounded-full" />
            <Image 
                src="/images/grapow-logo.png" 
                alt="Gra Pow Logo" 
                width={500} 
                height={250} 
                className="relative z-10 drop-shadow-[0_0_50px_rgba(0,0,0,0.9)] filter brightness-0 invert"
                priority
            />
        </motion.div>

        <div className="overflow-hidden mb-4">
             <motion.span 
                key={`accent-${current}`}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="block text-primary font-montserrat uppercase tracking-[0.6em] text-[10px] font-bold"
             >
                {SLIDES[current].accent}
             </motion.span>
        </div>

        <div className="overflow-hidden mb-8">
            <motion.h1 
                key={`title-${current}`}
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                transition={{ duration: 0.8, delay: 0.5, ease: [0.33, 1, 0.68, 1] }}
                className="text-6xl md:text-9xl font-cormorant font-bold text-white tracking-tighter uppercase italic leading-none"
            >
                {SLIDES[current].title}
            </motion.h1>
        </div>

        <motion.p 
            key={`sub-${current}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="text-zinc-300 font-montserrat font-light text-lg md:text-xl max-w-2xl tracking-wide opacity-80"
        >
            {SLIDES[current].subtitle}
        </motion.p>

        {/* Scroll Indicator */}
        <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
            className="absolute bottom-12 flex flex-col items-center gap-4"
        >
            <span className="text-[9px] uppercase tracking-[0.4em] font-bold text-zinc-500 font-montserrat">Scroll Down</span>
            <div className="w-px h-20 bg-linear-to-b from-cta to-transparent" />
        </motion.div>
      </div>

      {/* Slide Indicators */}
      <div className="absolute right-8 top-1/2 -translate-y-1/2 flex flex-col gap-5 z-30">
        {SLIDES.map((_, idx) => (
            <button
                key={idx}
                onClick={() => setCurrent(idx)}
                className={`w-px h-10 transition-all duration-700 ${idx === current ? "bg-cta scale-x-[4] shadow-[0_0_15px_rgba(202,138,4,0.8)]" : "bg-white/10"}`}
            />
        ))}
      </div>
    </section>
  );
}
