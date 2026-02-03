"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";

export function StorySection() {
  return (
    <section className="py-32 relative z-10 overflow-hidden" id="story">
        {/* Abstract Cinematic Background Elements */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-accent/5 blur-[100px] rounded-full translate-y-1/2 -translate-x-1/2 pointer-events-none" />

        <div className="container mx-auto px-4 max-w-5xl text-center">
             <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1 }}
             >
                 <div className="flex justify-center gap-2 mb-8 items-center text-primary/30">
                    <Star className="w-3 h-3 fill-current" />
                    <Star className="w-3 h-3 fill-current" />
                    <Star className="w-3 h-3 fill-current" />
                </div>
                <h3 className="text-primary font-montserrat uppercase tracking-[0.6em] text-[10px] font-bold mb-6">Riverside&apos;s Finest</h3>
                <h2 className="text-4xl md:text-7xl font-cormorant text-white leading-[1.1] tracking-tighter mb-12 uppercase italic">
                    The Art of Thai <br /> <span className="text-primary not-italic">& Modern Nightlife</span>
                </h2>
                <div className="grid md:grid-cols-2 gap-12 text-left items-center pt-8 border-t border-white/5">
                    <p className="text-zinc-400 font-montserrat font-light text-xl leading-relaxed tracking-wide opacity-80">
                        Since <span className="text-white font-bold">2006</span>, Gra Pow has been the heart of Riverside&apos;s dining scene. We blend traditional Thai flavors with a modern sports bar atmosphere to create something truly unique.
                    </p>
                    <div className="space-y-6">
                         <div className="flex gap-4 items-start pb-6 border-b border-white/5">
                             <span className="text-primary font-bold font-cormorant text-3xl">01</span>
                             <div>
                                 <h4 className="text-white font-bold font-montserrat uppercase tracking-widest text-[10px] mb-2 px-0.5">Award Winning Soul</h4>
                                 <p className="text-zinc-500 text-[13px] font-montserrat font-light leading-relaxed">Voted Best Thai in the Inland Empire for our authentic recipes and chef-driven approach.</p>
                             </div>
                         </div>
                         <div className="flex gap-4 items-start">
                             <span className="text-primary font-bold font-cormorant text-3xl">02</span>
                             <div>
                                 <h4 className="text-white font-bold font-montserrat uppercase tracking-widest text-[10px] mb-2 px-0.5">Immersive Experience</h4>
                                 <p className="text-zinc-500 text-[13px] font-montserrat font-light leading-relaxed">From fresh sushi to late-night lounge beats, every visit is a journey of the senses.</p>
                             </div>
                         </div>
                    </div>
                </div>
             </motion.div>
        </div>
    </section>
  );
}
