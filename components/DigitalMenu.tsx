"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { menuItems, menuCategories, MenuItem } from "@/lib/menuData";
import { cn } from "@/lib/utils";

export default function DigitalMenu() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredItems = activeCategory === "All" 
    ? menuItems 
    : menuItems.filter(item => item.category === activeCategory);

  return (
    <section className="py-24 bg-black min-h-screen relative overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/black-linen.png')] opacity-20" />
      <div className="absolute inset-0 bg-linear-to-b from-black via-transparent to-black pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-bold bg-clip-text text-transparent bg-linear-to-r from-yellow-500 via-yellow-200 to-yellow-600 font-display mb-6"
          >
            THE MENU
          </motion.h2>
          <p className="text-gray-400 font-mono tracking-widest text-sm uppercase">
            Modern Thai Soul / Authentic Flavors
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap justify-center gap-4 mb-16">
          <button
            onClick={() => setActiveCategory("All")}
            className={cn(
              "px-6 py-2 rounded-full border transition-all font-mono text-xs uppercase tracking-widest",
              activeCategory === "All"
                ? "bg-yellow-500 border-yellow-500 text-black font-bold"
                : "border-white/20 text-white hover:border-yellow-500 hover:text-yellow-500"
            )}
          >
            All
          </button>
          {menuCategories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={cn(
                "px-6 py-2 rounded-full border transition-all font-mono text-xs uppercase tracking-widest",
                activeCategory === cat
                  ? "bg-yellow-500 border-yellow-500 text-black font-bold"
                  : "border-white/20 text-white hover:border-yellow-500 hover:text-yellow-500"
              )}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Menu Grid */}
        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence>
            {filteredItems.map((item) => (
              <MenuCard key={item.id} item={item} />
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}

function MenuCard({ item }: { item: MenuItem }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.3 }}
      className="group relative bg-[#0a0a0a] border border-white/10 rounded-xl overflow-hidden hover:border-yellow-500/50 transition-colors"
    >
      <div className="aspect-[4/3] relative overflow-hidden">
        <Image
          src={item.image}
          alt={item.name}
          fill
          className="object-cover group-hover:scale-110 transition-transform duration-700"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-linear-to-t from-black/80 to-transparent" />
        
        {item.popular && (
          <div className="absolute top-4 right-4 bg-yellow-500 text-black text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest shadow-lg">
            Popular
          </div>
        )}
      </div>

      <div className="p-8 relative">
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-2xl font-bold text-white group-hover:text-yellow-500 transition-colors font-display">
            {item.name}
          </h3>
          <span className="text-xl font-mono text-yellow-500">{item.price}</span>
        </div>
        
        <p className="text-gray-400 text-sm leading-relaxed mb-6">
          {item.description}
        </p>

        <div className="flex gap-2">
           {item.spicy !== undefined && item.spicy > 0 && (
             <span className="text-red-500 text-xs flex items-center gap-1">
               {Array(item.spicy).fill(null).map((_, i) => (
                 <span key={i}>🌶️</span>
               ))}
             </span>
           )}
           {item.allergens?.map(allergen => (
             <span key={allergen} className="text-[10px] uppercase border border-white/10 px-2 py-1 rounded text-gray-500">
               Contains: {allergen}
             </span>
           ))}
        </div>
      </div>
    </motion.div>
  );
}
