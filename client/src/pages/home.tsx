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
  return (
    <div className="min-h-screen">
      <HeroSection
        title="Hello, I'm Prateek H"
        subtitle="– Welcome to My Creative Playground"
        videoUrl="/SampleVideo_1280x720_10mb.mp4"
      />
      <GridSection title="The Sanctuary" items={gridItems} />
    </div>
  );
}