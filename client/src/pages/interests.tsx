import { useQuery } from "@tanstack/react-query";
import { type Interest } from "@shared/schema";
import { Skeleton } from "@/components/ui/skeleton";
import { InterestOrbits } from "@/components/sections/InterestOrbits";
import { HobbiesCarousel } from "@/components/sections/HobbiesCarousel";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Interests() {
  const { data: interests, isLoading } = useQuery<Interest[]>({
    queryKey: ["/api/interests"],
  });

  if (isLoading) {
    return (
      <div className="space-y-12 pt-16">
        <h1 className="text-4xl font-bold">My Interests</h1>
        <Skeleton className="h-[600px] w-full" />
      </div>
    );
  }

  return (
    <div className="space-y-12 pt-16 container mx-auto" style={{ backgroundColor: "rgb(150, 140, 120)" }}>
      <h1 className="text-3xl font-bold text-center" style={{ color: "#222222" }}>My Interests</h1>
      <div className="text-lg text-muted-foreground max-w-2xl mx-auto" style={{ color: "#7B7B7B" }}>
        <div className="container">
          <h1 className="text-2xl font-bold mb-4" style={{ color: "#222222" }}>About Me</h1>
          <p>I find myself at the intersection of <span className="highlight" style={{ backgroundColor: "#222222", color: "#FFFFFF" }}>spirituality, science, and startups</span>&mdash;three seemingly different worlds that, to me, are deeply interconnected.</p>

          <h2 className="text-xl font-bold mt-4 mb-2" style={{ color: "#222222" }}>Spirituality: The Depth Within</h2>
          <p>From an early age, I have been drawn to exploring the <span className="highlight" style={{ backgroundColor: "#222222", color: "#FFFFFF" }}>nature of consciousness</span>&mdash;not just as a concept but as a lived experience. Meditation has been my anchor, offering clarity amid the noise of the world. It's not just about stillness; it's about <span className="highlight" style={{ backgroundColor: "#222222", color: "#FFFFFF" }}>understanding the deeper rhythms of life</span>, the subtle forces that shape our thoughts, emotions, and the reality we create. My journey with the <span className="highlight" style={{ backgroundColor: "#222222", color: "#FFFFFF" }}>Art of Living</span> and my immersion in texts like the <i>Yoga Vashishtha</i> and <i>Patanjali's Yoga Sutras</i> continue to expand my understanding of self and existence.</p>

          <h2 className="text-xl font-bold mt-4 mb-2" style={{ color: "#222222" }}>Science: The Curiosity That Never Ends</h2>
          <p>While spirituality takes me inward, <span className="highlight" style={{ backgroundColor: "#222222", color: "#FFFFFF" }}>science</span> propels me outward. I've always been fascinated by the fundamental principles governing our universe, from <span className="highlight" style={{ backgroundColor: "#222222", color: "#FFFFFF" }}>physics to artificial intelligence</span>. Understanding how things work—whether it's the fabric of space-time or the algorithms shaping the future—fuels my curiosity. I believe that at its core, science is a pursuit of <span className="highlight" style={{ backgroundColor: "#222222", color: "#FFFFFF" }}>truth, pattern recognition, and deeper understanding</span>&mdash;much like meditation but in a different form.</p>

          <h2 className="text-xl font-bold mt-4 mb-2" style={{ color: "#222222" }}>Startups: The Art of Building</h2>
          <p>If spirituality is about being and science is about knowing, then <span className="highlight" style={{ backgroundColor: "#222222", color: "#FFFFFF" }}>startups</span> are about creating. I thrive in the energy of building something from the ground up—whether it's an AI-driven automation tool, an edtech venture, or a creative platform like <span className="highlight" style={{ backgroundColor: "#222222", color: "#FFFFFF" }}>Singalala</span>. Startups excite me because they embody the <span className="highlight" style={{ backgroundColor: "#222222", color: "#FFFFFF" }}>alchemy of vision, problem-solving, and resilience</span>. They are not just businesses; they are ideas brought to life, constantly evolving, adapting, and finding meaning in the chaos.</p>

          <p>Through my work, I seek to blend these three dimensions—bringing the depth of <span className="highlight" style={{ backgroundColor: "#222222", color: "#FFFFFF" }}>spiritual awareness</span>, the rigor of <span className="highlight" style={{ backgroundColor: "#222222", color: "#FFFFFF" }}>scientific inquiry</span>, and the dynamism of <span className="highlight" style={{ backgroundColor: "#222222", color: "#FFFFFF" }}>entrepreneurship</span> into everything I do. If you're someone who shares a love for any of these, let's connect and explore the endless possibilities of what we can build together.</p>
        </div>
      </div>

      {/* First Section: Orbiting Interests Visualization */}
      <section className="py-10" style={{ backgroundColor: "rgb(150, 140, 120)" }}>
        <InterestOrbits />
      </section>

      {/* Second Section: Hobbies Carousel */}
      <section className="mb-14" style={{ backgroundColor: "rgb(150, 140, 120, 0.1)" }}>
        <HobbiesCarousel />
      </section>
    </div>
  );
}