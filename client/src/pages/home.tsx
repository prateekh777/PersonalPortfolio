import { useEffect } from "react";
import { HeroSection } from "@/components/sections/HeroSection";
import { GridSection } from "@/components/sections/GridSection";

const gridItems = [
  {
    title: "Skills Honed, Stories Told - My Journey",
    icon: "/images/gradients/blue_card.png",
  },
  {
    title: "Turning Puzzles into Pathways",
    icon: "/images/gradients/black_card.png",
  },
  {
    title: "Things I've built Creations That Speak, Solutions That Sing",
    icon: "/images/gradients/red_card.png",
  },
  {
    title: "Where AI Meets Soul - Let's Explore Together",
    icon: "/images/gradients/yellow_card.png",
  },
  {
    title: "Conversations Open Doors - Let's Talk",
    icon: "/images/gradients/white_card.png",
  },
  {
    title: "The Universe is Speaking—Here's How I Listen",
    icon: "/images/gradients/green_card.png",
  },
];

export default function Home() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background element with improved blur gradient effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-[rgb(210,200,180)] via-[rgb(190,180,160)] to-[rgb(170,160,140)] bg-opacity-80 backdrop-blur-[6px] -z-10"></div>

      {/* Decorative accent elements */}
      <div className="absolute top-1/4 right-[5%] w-64 h-64 bg-white/10 rounded-full blur-3xl -z-5"></div>
      <div className="absolute bottom-1/3 left-[10%] w-48 h-48 bg-white/10 rounded-full blur-3xl -z-5"></div>

      {/* Hero section with animated entrance */}
      <div style={{ animation: "fadeIn 0.8s ease-out" }}>
        <HeroSection
          title="Hello, I'm Prateek Hakay"
          subtitle="– Welcome to My Creative Playground"
          videoUrl="/SampleVideo_1280x720_10mb.mp4"
        />
      </div>

      {/* Section transition element */}
      <div className="relative h-24 overflow-hidden">
        <div className="absolute w-full h-24 bg-gradient-to-b from-transparent to-[rgb(200,190,170)]/30"></div>
      </div>

      {/* Grid section with delayed animation */}
      <div style={{ animation: "fadeIn 0.8s ease-out 0.3s backwards" }}>
        <GridSection title="The Sanctuary" items={gridItems} />
      </div>

      {/* Animated scroll-to-top button (visible when scrolled) */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className="fixed bottom-6 right-6 z-50 p-2 rounded-full bg-[#333]/70 text-white shadow-lg hover:bg-[#222] transition-all duration-300 opacity-70 hover:opacity-100"
        style={{
          transform: "translateY(0)",
          transition: "all 0.3s ease",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="m18 15-6-6-6 6" />
        </svg>
      </button>
    </div>
  );
}
