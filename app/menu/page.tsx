import type { Metadata } from "next";
import DigitalMenu from "@/components/DigitalMenu";
import { generateMenuSchema } from "@/lib/menuData";

export const metadata: Metadata = {
  title: "Menu | High-End Thai Cuisine in Riverside | Gra Pow",
  description: "Explore our menu of authentic Thai dishes, from world-famous Tom Yum Goong to our signature Basil Smash. Optimized for flavor and experience.",
};

export default function MenuPage() {
  const jsonLd = generateMenuSchema();

  return (
    <main>
       <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <DigitalMenu />
    </main>
  );
}
