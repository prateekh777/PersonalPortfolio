import { HeroSection } from "@/components/sections/HeroSection";
import { GridSection } from "@/components/sections/GridSection";

const gridItems = [
  {
    title: "Skills Honed, Stories Told - My Journey",
    gradient: "gradient-1",
  },
  {
    title: "Turning Puzzles into Pathways",
    gradient: "gradient-2",
  },
  {
    title: "Things I've built Creations That Speak, Solutions That Sing",
    gradient: "gradient-3",
  },
  {
    title: "Where AI Meets Soul - Let's Explore Together",
    gradient: "gradient-4",
  },
  {
    title: "Conversations Open Doors - Let's Talk",
    gradient: "gradient-5",
  },
  {
    title: "The Universe is Speaking—Here's How I Listen",
    gradient: "gradient-6",
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