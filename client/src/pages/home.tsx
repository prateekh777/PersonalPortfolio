import { HeroSection } from "@/components/sections/HeroSection";
import { GridSection } from "@/components/sections/GridSection";

const gridItems = [
  {
    title: "Skills Honed, Stories Told - My Journey",
    icon: "/images/gradients/1.png",
  },
  {
    title: "Turning Puzzles into Pathways",
    icon: "/images/gradients/2.png",
  },
  {
    title: "Things I've built Creations That Speak, Solutions That Sing",
    icon: "/images/gradients/3.png",
  },
  {
    title: "Where AI Meets Soul - Let's Explore Together",
    icon: "/images/gradients/4.png",
  },
  {
    title: "Conversations Open Doors - Let's Talk",
    icon: "/images/gradients/5.png",
  },
  {
    title: "The Universe is Speaking—Here's How I Listen",
    icon: "/images/gradients/6.png",
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