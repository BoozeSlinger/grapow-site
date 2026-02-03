"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Star } from "lucide-react";

const MENU_DATA = [
  {
    category: "Favorites",
    items: [
      { name: "Pad Gra Pow", price: "$20", desc: "Our signature masterpiece. Hand-minced pork, sacred basil, and a perfect wok-fried egg.", image: "/images/pad-gra-pow.png", tag: "Award Winner" },
      { name: "Dragon Wings", price: "$16", desc: "Crispy wings tossed in our secret spicy Szechuan red wine glaze. Fierce and flavorful.", image: "/images/thai-dish.png", tag: "Signature" },
      { name: "Satay Chicken", price: "$15", desc: "Grilled skewers marinated in rare spices, served with our golden peanut velvet sauce.", image: "/images/thai-dish.png" },
    ]
  },
  {
    category: "Thai Soul",
    items: [
      { name: "Pad Thai", price: "$19", desc: "The gold standard. Silky rice noodles, fresh sprouts, and crushed peanuts in a tamarind glaze.", image: "/images/pad-thai-epic.png", tag: "Best Seller" },
      { name: "Yellow Curry", price: "$19", desc: "A golden infusion of turmeric and coconut milk with tender chicken and velvet potatoes.", image: "/images/thai-dish.png" },
      { name: "Drunken Noodles", price: "$19", desc: "Bold wide noodles, bird's eye chili, and sacred basil. Not for the faint of heart.", image: "/images/thai-dish.png" },
    ]
  },
  {
    category: "Sushi & Poke",
    items: [
      { name: "Signature Sashimi Platter", price: "$32", desc: "An opulent selection of the ocean's finest, accented with 24k edible gold leaf.", image: "/images/sushi-combo.png", tag: "Award Winner" },
      { name: "Spicy Tuna Poke Bowl", price: "$22", desc: "Fresh sashimi-grade tuna, avocado cream, and our signature spicy glow sauce.", image: "/images/poke-bowl.png", tag: "Fresh Daily" },
      { name: "The Hangover Roll", price: "$18", desc: "Tempura shrimp, spicy crab, and avocado crowned with torched unagi.", image: "/images/sushi-event.png" },
    ]
  },
  {
    category: "The Lounge",
    items: [
      { name: "The Midnight Owl", price: "$16", desc: "Small-batch bourbon, house-made espresso syrup, and toasted vanilla bean ash.", image: "/images/cocktail-thumb.png", tag: "Signature" },
      { name: "Spicy Thai Margarita", price: "$15", desc: "Tequila reposado, bird's eye chili, and cilantro agave with a volcanic salt rim.", image: "/images/cocktail-thumb.png" },
      { name: "Lychee Martini", price: "$15", desc: "Ultra-premium vodka and fresh lychee elixir, garnished with a hand-carved fruit pearl.", image: "/images/lychee-martini.png" },
    ]
  }
];

export function MenuCategorized() {
  const [active, setActive] = useState(0);

  return (
    <section className="py-32 bg-black relative z-10" id="menu">
      {/* Background Liquid Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 blur-[180px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-4">
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-center mb-24"
        >
             <h2 className="text-primary font-montserrat uppercase tracking-[0.6em] text-[10px] font-bold mb-4">Epicurean Journey</h2>
             <h3 className="text-6xl md:text-9xl font-cormorant text-white uppercase tracking-tighter leading-none italic">
                The <span className="text-primary not-italic">Menu</span>
             </h3>
        </motion.div>

        {/* Epic Tabs */}
        <div className="flex justify-center mb-20 overflow-x-auto no-scrollbar">
            <div className="flex bg-white/[0.02] p-1.5 rounded-full border border-white/[0.05] backdrop-blur-3xl">
                {MENU_DATA.map((cat, idx) => (
                    <button
                        key={cat.category}
                        onClick={() => setActive(idx)}
                        className={`relative px-8 py-3 rounded-full text-[9px] font-montserrat uppercase tracking-[0.4em] transition-all duration-700 whitespace-nowrap font-bold ${active === idx ? "text-black font-extrabold" : "text-zinc-500 hover:text-zinc-300"}`}
                    >
                        {active === idx && (
                            <motion.div 
                                layoutId="epic-tab" 
                                className="absolute inset-0 bg-primary rounded-full z-0 shadow-[0_0_40px_rgba(220,38,38,0.3)]"
                                transition={{ type: "spring", bounce: 0.1, duration: 0.8 }}
                            />
                        )}
                        <span className="relative z-10">{cat.category}</span>
                    </button>
                ))}
            </div>
        </div>

        <AnimatePresence mode="wait">
            <motion.div
                key={active}
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.02 }}
                transition={{ duration: 0.8, ease: [0.33, 1, 0.68, 1] }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
                {MENU_DATA[active].items.map((item, idx) => (
                    <motion.div 
                        key={idx} 
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.05, duration: 0.8 }}
                        className="group relative overflow-hidden rounded-[2.5rem] bg-white/[0.01] border border-white/5 hover:border-primary/40 transition-all duration-1000 shadow-[0_10px_40px_rgba(0,0,0,0.6)]"
                    >
                        {/* High-End Image Layout */}
                        <div className="aspect-[4/5] relative overflow-hidden">
                             <Image 
                                src={item.image || "/images/thai-dish.png"} 
                                alt={item.name} 
                                fill 
                                className="object-cover transition-transform duration-2000 group-hover:scale-110 brightness-[0.7] group-hover:brightness-100" 
                             />
                             {/* Gradient Overlays */}
                             <div className="absolute inset-0 bg-linear-to-t from-black via-black/50 to-transparent opacity-90 group-hover:opacity-75 transition-opacity duration-1000" />
                             
                             {/* Floating Price */}
                             <div className="absolute top-8 right-8 z-20">
                                 <motion.div 
                                    whileHover={{ scale: 1.1, rotate: 5 }}
                                    className="bg-black/60 backdrop-blur-3xl border border-white/10 px-5 py-2.5 rounded-2xl shadow-2xl"
                                 >
                                     <span className="text-cta font-bold font-montserrat text-xl tracking-tighter gold-glow">{item.price}</span>
                                 </motion.div>
                             </div>

                             {/* Floating Tag */}
                             {item.tag && (
                                <div className="absolute top-8 left-8 z-20">
                                    <div className="bg-primary/20 backdrop-blur-3xl border border-primary/40 px-4 py-2 rounded-xl flex items-center gap-2 shadow-[0_0_20px_rgba(220,38,38,0.25)]">
                                        <Star className="w-3 h-3 text-primary fill-current animate-pulse" />
                                        <span className="text-primary font-bold font-montserrat text-[8px] uppercase tracking-[0.4em]">{item.tag}</span>
                                    </div>
                                </div>
                             )}

                             {/* Bottom Content Overlay */}
                             <div className="absolute bottom-0 left-0 right-0 p-10 z-20 translate-y-8 group-hover:translate-y-0 transition-transform duration-1000 ease-[0.33,1,0.68,1]">
                                <h4 className="text-3xl font-cormorant text-white leading-tight mb-4 group-hover:text-primary transition-colors tracking-tighter uppercase italic">{item.name}</h4>
                                <p className="text-zinc-400 font-montserrat font-light text-[13px] leading-relaxed opacity-0 group-hover:opacity-100 transition-all duration-1000 delay-100 max-w-[90%] tracking-wide">{item.desc}</p>
                             </div>

                             {/* Hover Internal Glow */}
                             <div className="absolute inset-x-0 bottom-0 h-1/2 bg-linear-to-t from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000 pointer-events-none" />
                        </div>
                    </motion.div>
                ))}
            </motion.div>
        </AnimatePresence>

        <div className="mt-24 text-center">
            <motion.button 
                whileHover={{ scale: 1.05, letterSpacing: "0.6em" }}
                whileTap={{ scale: 0.98 }}
                className="group relative px-16 py-6 bg-transparent border border-white/5 text-white font-montserrat uppercase tracking-[0.5em] text-[10px] font-black transition-all overflow-hidden rounded-full backdrop-blur-md"
            >
                <span className="relative z-10">Download Full Menu</span>
                <div className="absolute inset-0 bg-primary translate-y-full group-hover:translate-y-0 transition-transform duration-700 ease-[0.33,1,0.68,1]" />
                <span className="absolute inset-0 z-10 flex items-center justify-center opacity-0 group-hover:opacity-100 text-white transition-opacity duration-500">Download Full Menu</span>
            </motion.button>
        </div>
      </div>
    </section>
  );
}
