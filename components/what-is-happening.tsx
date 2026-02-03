"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const EVENTS = [
  {
    date: "Feb 14",
    title: "Valentine's Night in the Lounge",
    desc: "Special Prix-Fixe menu and romantic cocktails.",
    category: "Special Event",
    image: "/images/valentine-event.png"
  },
  {
    date: "Every Sat",
    title: "Cinematic Nightlife: Live DJs",
    desc: "Riverside's best beats spinning until 2 AM.",
    category: "Lounge",
    image: "/images/dj-event.png"
  },
  {
    date: "Daily",
    title: "New Sushi Arrivals",
    desc: "Fresh daily catch from our master sushi chefs.",
    category: "Dining",
    image: "/images/sushi-event.png"
  }
];

export function WhatIsHappening() {
  return (
    <section className="py-32 bg-black border-y border-zinc-900 overflow-hidden" id="happening">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-4">
            <div>
                 <motion.h2 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    className="text-primary font-montserrat uppercase tracking-[0.5em] text-[10px] font-bold mb-4"
                 >
                    The Latest
                 </motion.h2>
                 <motion.h3 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="text-4xl md:text-7xl font-cormorant text-white uppercase tracking-tighter italic"
                 >
                    What&apos;s <span className="text-primary italic">Happening</span>
                 </motion.h3>
            </div>
            <Link href="/blog" className="text-zinc-500 hover:text-white transition-colors font-montserrat uppercase tracking-[0.4em] text-[10px] flex items-center gap-2 mb-2 font-bold">
                View All Posts <ArrowUpRight className="w-4 h-4 text-cta gold-glow" />
            </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {EVENTS.map((event, idx) => (
                <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    className="group cursor-pointer"
                >
                    <div className={`relative overflow-hidden mb-8 transition-all duration-700 ${idx === 1 ? "rounded-[3rem_1rem_3rem_1rem]" : "rounded-[1rem_3rem_1rem_3rem]"} group-hover:rounded-2xl border border-zinc-800`}>
                        <div className="aspect-video relative overflow-hidden">
                            {/* Cinematic Overlay */}
                            <div className="absolute inset-0 bg-linear-to-t from-black via-black/20 to-transparent z-10 opacity-60 group-hover:opacity-40 transition-opacity" />
                            <div className="absolute inset-0 bg-primary/10 mix-blend-overlay z-10" />
                            
                            <Image 
                                src={event.image} 
                                alt={event.title} 
                                fill 
                                className="object-cover transition-transform duration-1000 group-hover:scale-110 grayscale group-hover:grayscale-0"
                            />

                            {/* Date Badge */}
                            <div className="absolute top-4 left-4 z-20 bg-black/80 backdrop-blur-md border border-white/5 px-4 py-2 flex flex-col items-center">
                                 <span className="text-primary font-montserrat text-[10px] uppercase tracking-widest font-bold">{event.date.split(' ')[0]}</span>
                                 <span className="text-white font-cormorant text-xl leading-tight italic">{event.date.split(' ')[1] || ""}</span>
                            </div>
                        </div>
                    </div>

                    <div className="px-2">
                        <span className="text-cta font-montserrat text-[10px] tracking-[0.4em] uppercase block mb-3 opacity-60 group-hover:opacity-100 transition-opacity font-bold">{event.category}</span>
                        <h4 className="text-3xl font-cormorant text-white mb-4 leading-[1.1] transition-colors group-hover:text-primary italic uppercase">{event.title}</h4>
                        <p className="text-zinc-500 font-montserrat font-light text-[15px] group-hover:text-zinc-300 transition-colors leading-relaxed">{event.desc}</p>
                        
                        <div className="mt-8 flex items-center gap-2 text-white/20 group-hover:text-cta transition-all">
                             <div className="h-px w-8 bg-current transition-all group-hover:w-16 shadow-[0_0_10px_rgba(202,138,4,0.4)]" />
                             <span className="text-[10px] uppercase tracking-[0.4em] font-black font-montserrat">Read More</span>
                        </div>
                    </div>
                </motion.div>
            ))}
        </div>
      </div>
    </section>
  );
}
