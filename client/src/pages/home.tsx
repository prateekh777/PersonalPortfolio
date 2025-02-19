import { HeroSection } from "@/components/sections/HeroSection";
import { GridSection } from "@/components/sections/GridSection";

const gridItems = [
  {
    title: "Skills Honed, Stories Told - My Journey",
    icon: "PenTool",
  },
  {
    title: "Turning Puzzles into Pathways",
    icon: "Code",
  },
  {
    title: "Things I've built Creations That Speak, Solutions That Sing",
    icon: "Lightbulb",
  },
  {
    title: "Where AI Meets Soul - Let's Explore Together",
    icon: "Brain",
  },
  {
    title: "Conversations Open Doors - Let's Talk",
    icon: "MessageSquare",
  },
  {
    title: "The Universe is Speaking—Here's How I Listen",
    icon: "Radio",
  },
];

export default function Home() {
  return (
    <div className="min-h-screen">
      <HeroSection
        title="Hello"
        subtitle="— It's D.Nova a design wizard"
        videoUrl="/SampleVideo_1280x720_10mb.mp4"
        stats={[
          { label: "Project completed", value: "200+" },
          { label: "Startup rated", value: "50+" },
        ]}
      />
      <GridSection title="The Sanctuary" items={gridItems} />
    </div>
  );
}