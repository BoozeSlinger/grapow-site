"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";

// Data derived from research
const CATEGORIES = ["Popular", "Appetizers", "Main Courses", "Cocktails"];

const MENU_ITEMS = [
  {
    id: 1,
    name: "Pad Gra Pow",
    description: "Signature dish with minced chicken, Thai basil, chili garlic sauce, and a fried egg.",
    price: "$20.00",
    category: "Popular",
    image: "/images/pad-gra-pow.png", // Generated
    tags: ["Spicy", "Chef's Choice"]
  },
  {
    id: 2,
    name: "Lycheetini",
    description: "Absolut Elyx Vodka, Soho Lychee, and fresh sour mix. A sweet, floral start to the night.",
    price: "$14.00",
    category: "Cocktails",
    image: "/images/lychee-martini.png", // Generated
    tags: ["Sweet", "Vodka"]
  },
  {
    id: 3,
    name: "Satay Chicken",
    description: "Grilled marinated chicken skewers served with peanut sauce and cucumber relish.",
    price: "$14.00",
    category: "Appetizers",
    image: null, // Fallback needed
    tags: []
  },
  {
    id: 4,
    name: "Tuna Tar Tar",
    description: "Fresh tuna with spicy Japanese tartare sauce served on wonton crisps.",
    price: "$15.00",
    category: "Appetizers",
    image: null,
    tags: ["Raw", "Spicy"]
  },
  {
    id: 5,
    name: "Gra Pow Mule",
    description: "Absolut Vodka, Ginger Beer, Yuzu Liquor, and Lime.",
    price: "$13.00",
    category: "Cocktails",
    image: null,
    tags: ["Refreshing"]
  }
];

export function MenuGallery() {
  const [activeCategory, setActiveCategory] = useState("Popular");

  const filteredItems = activeCategory === "Popular" 
    ? MENU_ITEMS 
    : MENU_ITEMS.filter(item => item.category === activeCategory || (activeCategory === "Main Courses" && item.category === "Popular")); // simplified logic

  return (
    <section className="py-24 bg-background relative z-10">
      <div className="container mx-auto px-4">
        <div className="mb-16">
          <h2 className="text-5xl md:text-7xl font-kanit text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-500 mb-6">
            THE MENU
          </h2>
          <ScrollArea className="w-full whitespace-nowrap pb-4">
            <div className="flex w-max space-x-4">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`
                    px-6 py-2 rounded-full border transition-all duration-300 text-lg font-outfit uppercase tracking-widest
                    ${activeCategory === cat 
                      ? "bg-primary text-black border-primary shadow-[0_0_20px_rgba(0,217,249,0.3)]" 
                      : "bg-transparent text-muted-foreground border-zinc-800 hover:border-zinc-500 hover:text-white"
                    }
                  `}
                >
                  {cat}
                </button>
              ))}
            </div>
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
        </div>

        {/* Broken Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 md:gap-y-24">
          {filteredItems.map((item, index) => (
            <motion.div
              key={item.id}
              layoutId={`item-${item.id}`}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              className={`
                group relative
                ${index % 3 === 0 ? "lg:col-span-8" : "lg:col-span-4"}
                ${index % 2 === 1 ? "md:translate-y-12" : ""} 
              `}
            >
              <Dialog>
                <DialogTrigger asChild>
                  <div className="cursor-pointer relative overflow-hidden rounded-lg border border-zinc-900 bg-card hover:border-zinc-700 transition-colors duration-500">
                    {/* Image Area */}
                    <div className={`aspect-[4/3] w-full overflow-hidden relative ${!item.image ? "bg-zinc-900 flex items-center justify-center p-8" : ""}`}>
                      {item.image ? (
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          className="object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                      ) : (
                         <div className="text-center">
                            <span className="text-4xl opacity-20">🍽️</span>
                         </div>
                      )}
                      
                      {/* Overlay */}
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                        <span className="text-white font-kanit tracking-widest border border-white px-4 py-2 uppercase">View Dish</span>
                      </div>
                    </div>

                    {/* Content Area */}
                    <div className="p-6">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="text-2xl font-kanit text-white group-hover:text-primary transition-colors">{item.name}</h3>
                        <span className="text-xl font-outfit text-primary">{item.price}</span>
                      </div>
                      <p className="text-muted-foreground font-outfit line-clamp-2">{item.description}</p>
                      
                      {/* Tags */}
                      <div className="flex gap-2 mt-4">
                        {item.tags.map(tag => (
                          <span key={tag} className="text-xs uppercase tracking-wider text-accent border border-accent/20 px-2 py-1 rounded">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </DialogTrigger>
                
                {/* Lightbox Content */}
                <DialogContent className="bg-[#0a0a0a] border-zinc-800 max-w-4xl p-0 overflow-hidden text-white">
                    <div className="grid md:grid-cols-2">
                        <div className="relative h-[300px] md:h-full bg-zinc-900">
                            {item.image ? (
                                <Image src={item.image} alt={item.name} fill className="object-cover" />
                            ) : (
                                <div className="absolute inset-0 flex items-center justify-center text-zinc-700">No Image Available</div>
                            )}
                        </div>
                        <div className="p-8 md:p-12 flex flex-col justify-center">
                            <span className="text-accent uppercase tracking-widest text-sm mb-2">{item.category}</span>
                            <h2 className="text-4xl md:text-5xl font-kanit mb-4">{item.name}</h2>
                            <p className="text-zinc-400 text-lg mb-8 font-outfit font-light">{item.description}</p>
                            <div className="flex items-center justify-between">
                                <span className="text-3xl font-kanit text-primary">{item.price}</span>
                                {/* Mock Order Button */}
                                <Button className="bg-white text-black hover:bg-zinc-200">Add to Order</Button>
                            </div>
                        </div>
                    </div>
                </DialogContent>
              </Dialog>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
