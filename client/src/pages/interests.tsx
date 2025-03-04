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
      <div className="space-y-10 pt-12">
        <h1 className="text-3xl font-bold">My Interests</h1>
        <Skeleton className="h-[600px] w-full" />
      </div>
    );
  }

  return (
    <div className="space-y-10 pt-12 container mx-auto" 
      style={{ background: 'rgba(150, 140, 120, 0.05)' }}>
      <h1 className="text-3xl font-bold text-center text-[#222222]">My Interests</h1>
      <div className="text-base max-w-2xl mx-auto">
        <div className="container">
          <h1 className="text-2xl font-bold mb-3 text-[#222222]">About Me</h1>
          <p className="text-sm text-[#222222]">I find myself at the intersection of <span className="highlight">spirituality, science, and startups</span>&mdash;three seemingly different worlds that, to me, are deeply interconnected.</p>

          <h2 className="text-xl font-bold mt-5 mb-2 text-[#222222]">Spirituality: The Depth Within</h2>
          <p className="text-sm text-[#222222]">From an early age, I have been drawn to exploring the <span className="highlight">nature of consciousness</span>&mdash;not just as a concept but as a lived experience. Meditation has been my anchor, offering clarity amid the noise of the world. It's not just about stillness; it's about <span className="highlight">understanding the deeper rhythms of life</span>, the subtle forces that shape our thoughts, emotions, and the reality we create. My journey with the <span className="highlight">Art of Living</span> and my immersion in texts like the <i>Yoga Vashishtha</i> and <i>Patanjali's Yoga Sutras</i> continue to expand my understanding of self and existence.</p>

          <h2 className="text-xl font-bold mt-5 mb-2 text-[#222222]">Science: The Curiosity That Never Ends</h2>
          <p className="text-sm text-[#222222]">While spirituality takes me inward, <span className="highlight">science</span> propels me outward. I've always been fascinated by the fundamental principles governing our universe, from <span className="highlight">physics to artificial intelligence</span>. Understanding how things work—whether it's the fabric of space-time or the algorithms shaping the future—fuels my curiosity. I believe that at its core, science is a pursuit of <span className="highlight">truth, pattern recognition, and deeper understanding</span>&mdash;much like meditation but in a different form.</p>

          <h2 className="text-xl font-bold mt-5 mb-2 text-[#222222]">Startups: The Art of Building</h2>
          <p className="text-sm text-[#222222]">If spirituality is about being and science is about knowing, then <span className="highlight">startups</span> are about creating. I thrive in the energy of building something from the ground up—whether it's an AI-driven automation tool, an edtech venture, or a creative platform like <span className="highlight">Singalala</span>. Startups excite me because they embody the <span className="highlight">alchemy of vision, problem-solving, and resilience</span>. They are not just businesses; they are ideas brought to life, constantly evolving, adapting, and finding meaning in the chaos.</p>

          <p className="text-sm text-[#222222] mt-4">Through my work, I seek to blend these three dimensions—bringing the depth of <span className="highlight">spiritual awareness</span>, the rigor of <span className="highlight">scientific inquiry</span>, and the dynamism of <span className="highlight">entrepreneurship</span> into everything I do. If you're someone who shares a love for any of these, let's connect and explore the endless possibilities of what we can build together.</p>
        </div>
      </div>

      {/* First Section: Orbiting Interests Visualization */}
      <section className="py-0">
        <InterestOrbits />
      </section>

      {/* Second Section: Hobbies Carousel */}
      <section className="mb-12">
        <HobbiesCarousel />
      </section>
    </div>
  );
}