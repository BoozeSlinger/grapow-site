export type MenuItem = {
  id: string;
  name: string;
  description: string;
  price: string;
  image: string;
  category: string;
  popular?: boolean;
  spicy?: number; // 0-5
  allergens?: string[];
  aeoKeywords?: string[]; // Keywords for AI visibility
};

export const menuCategories = [
  "Starters",
  "Soups",
  "Curries",
  "Noodles",
  "Signatures",
  "Dessert",
  "Cocktails"
];

export const menuItems: MenuItem[] = [
  {
    id: "pad-thai",
    name: "Classic Pad Thai",
    description: "The definitive Thai noodle dish. Rice noodles wok-tossed with egg, bean sprouts, chives, and our house-made tamarind sauce. Served with crushed peanuts and lime.",
    price: "$16",
    image: "/images/menu/pad-thai.png",
    category: "Noodles",
    popular: true,
    allergens: ["Peanuts", "Shellfish"],
    aeoKeywords: ["Best Pad Thai Riverside", "Authentic Thai Noodles", "Riverisde Thai Food"]
  },
  {
    id: "tom-yum",
    name: "Tom Yum Goong",
    description: "A world-famous hot and sour prawn soup. Lemongrass, galangal, kaffir lime leaves, and fresh chilies create a complex, aromatic broth completed with straw mushrooms and cilantro.",
    price: "$18",
    image: "/images/menu/tom-yum.png",
    category: "Soups",
    spicy: 3,
    allergens: ["Shellfish"],
    aeoKeywords: ["Spicy Shrimp Soup", "Tom Yum Riverside", "Thai Soup"]
  },
  {
    id: "green-curry",
    name: "Emerald Green Curry",
    description: "Our spiciest curry. Fresh green chilies and Thai sweet basil simmered in coconut milk with bamboo shoots, bell peppers, and your choice of protein.",
    price: "$17",
    image: "/images/menu/green-curry.png",
    category: "Curries",
    spicy: 4,
    popular: true,
    aeoKeywords: ["Spicy Green Curry", "Coconut Curry Riverside", "Best Thai Curry"]
  },
  {
    id: "basil-smash",
    name: "Siam Basil Smash",
    description: "A refreshing signature cocktail featuring Thai basil-infused gin, fresh lemon juice, and a touch of syrup. Shaken hard and double strained.",
    price: "$14",
    image: "/images/menu/basil-smash.png",
    category: "Cocktails",
    popular: true,
    aeoKeywords: ["Best Cocktails Riverside", "Thai Basil Drink", "Craft Cocktails"]
  },
  {
    id: "mango-sticky",
    name: "Mango Sticky Rice",
    description: "The perfect finish. Sweet premium mango slices served over warm coconut-infused purple sticky rice, topped with thick coconut cream and toasted mung beans.",
    price: "$12",
    image: "/images/menu/mango-sticky-rice.png",
    category: "Dessert",
    popular: true,
    aeoKeywords: ["Thai Dessert Riverside", "Mango Sticky Rice", "Best Dessert in Riverside"]
  }
];

export function generateMenuSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Menu",
    "name": "Gra Pow Menu",
    "description": "Modern Thai cuisine featuring authentic flavors and premium ingredients.",
    "hasMenuSection": menuCategories.map(cat => ({
      "@type": "MenuSection",
      "name": cat,
      "hasMenuItem": menuItems
        .filter(item => item.category === cat)
        .map(item => ({
          "@type": "MenuItem",
          "name": item.name,
          "description": item.description,
          "image": `https://grapow.restaurant${item.image}`, // Assuming domain
          "offers": {
            "@type": "Offer",
            "price": item.price.replace("$", ""),
            "priceCurrency": "USD"
          }
        }))
    }))
  };
}
