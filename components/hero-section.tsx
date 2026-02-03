"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { Button } from "@/components/ui/button";

export function HeroSection() {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 200]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  return (
    <section className="relative h-screen w-full overflow-hidden flex items-center justify-center">
      {/* Background Parallax */}
      <motion.div 
        style={{ y: y1 }}
        className="absolute inset-0 z-0"
      >
        <div className="absolute inset-0 bg-black/60 z-10" /> {/* Overlay */}
        <Image
          src="/images/hero.png"
          alt="GraPow Bar Atmosphere"
          fill
          className="object-cover"
          priority
        />
      </motion.div>

      {/* Content */}
      <motion.div 
        style={{ opacity }}
        className="relative z-20 text-center px-4 max-w-4xl mx-auto"
      >
        <motion.span 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="block text-primary text-xl md:text-2xl font-kanit tracking-[0.2em] mb-4 uppercase"
        >
          Riverside, CA
        </motion.span>
        
        <motion.h1 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-7xl md:text-9xl font-kanit font-bold text-white mb-6 tracking-tighter mix-blend-overlay"
        >
          GRAPOW
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-lg md:text-2xl text-gray-200 font-outfit font-light mb-10 max-w-2xl mx-auto"
        >
          Where modern Thai soul meets <span className="text-accent font-caveat text-4xl ml-2">cinematic nightlife.</span>
        </motion.p>
        
        <motion.div
           initial={{ opacity: 0, y: 30 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 0.8, delay: 0.6 }}
        >
          <Button 
            size="lg" 
            className="bg-transparent border border-primary text-primary hover:bg-primary/10 hover:shadow-[0_0_20px_rgba(0,217,249,0.5)] transition-all duration-300 rounded-none text-lg px-8 py-6 uppercase tracking-widest"
          >
            Reserve Table
          </Button>
        </motion.div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2"
      >
        <span className="text-xs tracking-widest text-muted-foreground uppercase">Scroll</span>
        <div className="w-[1px] h-16 bg-gradient-to-b from-primary to-transparent" />
      </motion.div>
    </section>
  );
}
