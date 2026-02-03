import type { Metadata } from "next";
import { Kanit, Outfit, Caveat } from "next/font/google";
import "./globals.css";

const kanit = Kanit({
  variable: "--font-kanit",
  weight: ["300", "400", "600", "700"],
  subsets: ["latin"],
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

const caveat = Caveat({
  variable: "--font-caveat",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "GraPow | Modern Thai & Bar | Best Thai Food Riverside, CA",
  description: "Award-winning Modern Thai soul meets cinematic nightlife. Best Thai Food 2022 & Best Sushi/Poke 2021 in the Inland Empire. Riverside's premier lounge & bar.",
  keywords: "Thai food Riverside, best Thai Inland Empire, Gra Pow, Riverside sports bar, cinematic nightlife Riverside, sushi Riverside, poke Riverside, Thai fusion",
  robots: "index, follow",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://grapow.org",
    title: "GraPow | Modern Thai & Bar",
    description: "Award-winning Thai fusion and cinematic nightlife in Riverside, CA.",
    images: [{ url: "/images/bar-interior.jpg", width: 1200, height: 630, alt: "GraPow Bar Atmosphere" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "GraPow Riverside",
    description: "Modern Thai soul meets cinematic nightlife.",
    images: ["/images/bar-interior.jpg"],
  },
  alternates: {
    canonical: "https://grapow.org",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Restaurant",
    "name": "Gra Pow",
    "image": "/images/grapow-logo.png",
    "@id": "https://grapow.org",
    "url": "https://grapow.org",
    "telephone": "(951) 780-1111",
    "priceRange": "$$",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "497 E Alessandro Blvd # D",
      "addressLocality": "Riverside",
      "addressRegion": "CA",
      "postalCode": "92508",
      "addressCountry": "US"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 33.8967,
      "longitude": -117.3456
    },
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Sunday"],
        "opens": "11:00",
        "closes": "21:00"
      },
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Friday", "Saturday"],
        "opens": "11:00",
        "closes": "22:00"
      }
    ],
    "servesCuisine": ["Thai", "Fusion", "Sushi", "Poke"],
    "menu": "https://grapow.org/menu",
    "acceptsReservations": "True"
  };

  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className={`${kanit.variable} ${outfit.variable} ${caveat.variable} antialiased font-[family-name:var(--font-outfit)] bg-[#050505] text-[#f0f0f0]`}
      >
        {children}
      </body>
    </html>
  );
}
