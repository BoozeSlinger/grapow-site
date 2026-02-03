"use client";

import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Instagram, Facebook, ArrowUp } from "lucide-react";
import Link from "next/link";

export function CustomFooter() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative bg-black pt-32 pb-12 border-t border-zinc-900 overflow-hidden" id="contact">
      {/* Background Glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-primary/5 blur-[150px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-16 mb-24">
          <div className="md:col-span-2">
            <Link href="/" className="inline-block mb-8">
               <span className="text-4xl font-cormorant font-bold text-white tracking-[0.2em] italic">
                    GRA<span className="text-primary not-italic">POW</span>
                </span>
            </Link>
            <p className="text-zinc-500 font-montserrat font-light text-lg max-w-sm mb-12 tracking-wide">
              Transforming traditional Thai cuisine into a cinematic nightlife experience since 2006. Located in the heart of Riverside.
            </p>
            <div className="flex gap-4">
               <SocialLink href="#" icon={<Instagram className="w-5 h-5" />} />
               <SocialLink href="#" icon={<Facebook className="w-5 h-5" />} />
            </div>
          </div>

          <div>
             <h4 className="text-white font-montserrat font-bold uppercase tracking-[0.4em] text-[10px] mb-8">Visit Us</h4>
             <ul className="space-y-6">
                <ContactItem icon={<MapPin className="w-4 h-4 text-cta gold-glow" />} text="497 E Alessandro Blvd, Riverside, CA" />
                <ContactItem icon={<Phone className="w-4 h-4 text-cta gold-glow" />} text="(951) 780-1111" />
                <ContactItem icon={<Mail className="w-4 h-4 text-cta gold-glow" />} text="hello@grapow.com" />
             </ul>
          </div>

          <div>
             <h4 className="text-white font-montserrat font-bold uppercase tracking-[0.4em] text-[10px] mb-8">Hours</h4>
             <div className="space-y-6 font-montserrat text-[13px] tracking-wide font-light">
                <div>
                    <span className="block text-primary font-black uppercase tracking-[0.4em] text-[9px] mb-2">Dining Room</span>
                    <span className="text-zinc-500">Sun - Thu: 11AM - 9PM</span>
                    <span className="block text-zinc-500">Fri - Sat: 11AM - 10PM</span>
                </div>
                <div>
                    <span className="block text-primary font-black uppercase tracking-[0.4em] text-[9px] mb-2">Sports Bar & Lounge</span>
                    <span className="text-zinc-500">Sun - Thu: til Midnight</span>
                    <span className="block text-zinc-500">Fri - Sat: til 2AM</span>
                </div>
             </div>
          </div>
        </div>

        <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="flex flex-col md:flex-row items-center gap-4 text-[9px] font-montserrat text-zinc-600 uppercase tracking-[0.4em] font-bold">
                <span>© 2026 Gra Pow Riverside</span>
                <span className="hidden md:block w-1.5 h-1.5 border border-zinc-800 rounded-full" />
                <Link href="#" className="hover:text-primary transition-colors">Privacy Policy</Link>
                <span className="hidden md:block w-1.5 h-1.5 border border-zinc-800 rounded-full" />
                <Link href="#" className="hover:text-primary transition-colors">Accessibility</Link>
            </div>
            
            <motion.button
                whileHover={{ y: -5, boxShadow: "0 0 20px rgba(220,38,38,0.3)" }}
                onClick={scrollToTop}
                className="w-12 h-12 rounded-full bg-zinc-950 border border-zinc-900 flex items-center justify-center text-primary hover:border-primary transition-all duration-300"
            >
                <ArrowUp className="w-6 h-6" />
            </motion.button>
        </div>
      </div>
    </footer>
  );
}

function ContactItem({ icon, text }: { icon: React.ReactNode, text: string }) {
    return (
        <li className="flex gap-4 items-center group cursor-pointer">
            <div className="p-2.5 rounded-xl bg-white/5 group-hover:bg-primary/20 transition-all duration-500 border border-white/5 group-hover:border-primary/20">
                {icon}
            </div>
            <span className="text-zinc-500 group-hover:text-white transition-colors font-montserrat text-sm font-light tracking-wide">{text}</span>
        </li>
    )
}

function SocialLink({ href, icon }: { href: string, icon: React.ReactNode }) {
    return (
        <Link href={href} className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center text-zinc-500 hover:bg-cta hover:text-white border border-white/5 hover:border-cta/50 transition-all duration-500 gold-glow hover:scale-110">
            {icon}
        </Link>
    )
}
