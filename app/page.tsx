import { HeroSlider } from "@/components/hero-slider";
import { MenuCategorized } from "@/components/menu-categorized";
import { StorySection } from "@/components/story-section";
import { SiteHeader } from "@/components/site-header";
import { WhatIsHappening } from "@/components/what-is-happening";
import { CustomFooter } from "@/components/custom-footer";
import { ChatBot } from "@/components/chat-bot";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#050505] text-[#f0f0f0] overflow-x-hidden selection:bg-primary selection:text-black">
      <SiteHeader />
      
      <HeroSlider />
      
      <div className="h-32 w-full bg-linear-to-b from-transparent to-[#050505] relative -mt-32 z-20 pointer-events-none" />

      <StorySection />
      
      <MenuCategorized />

      <WhatIsHappening />

      <CustomFooter />

      <ChatBot />
    </main>
  );
}
