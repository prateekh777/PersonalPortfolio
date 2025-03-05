import { useQuery } from "@tanstack/react-query";
import { type Interest } from "@shared/schema";
import { Skeleton } from "@/components/ui/skeleton";
import { InterestOrbits } from "@/components/sections/InterestOrbits";
import { HobbiesCarousel } from "@/components/sections/HobbiesCarousel";
import { InterestsVideoFlow } from "@/components/sections/InterestsVideoFlow";
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
    <div className="space-y-8 pt-16 px-4 sm:px-6 mx-auto max-w-screen-xl" 
      style={{ background: 'rgba(150, 140, 120, 0.05)' }}>
      <h1 className="text-2xl sm:text-3xl font-bold text-center text-[#222222]">My Interests</h1>
      
      {/* About Me Introduction */}
      <div className="text-base max-w-3xl mx-auto">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold mb-3 text-[#222222]">About Me</h1>
          <p className="text-sm text-[#222222] mb-8">I find myself at the intersection of 
            <span className="highlight highlight-spirituality"> spirituality</span>, 
            <span className="highlight highlight-science"> science</span>, and 
            <span className="highlight highlight-startups"> startups</span>
            &mdash;three seemingly different worlds that, to me, are deeply interconnected.
          </p>
          
          {/* Interactive Video Flow Visualization */}
          <div className="mb-10">
            <InterestsVideoFlow />
          </div>
          
          {/* Detailed Sections */}
          <div className="mt-12 space-y-8">
            <Card className="border-none shadow-sm bg-gradient-to-r from-purple-50 to-white overflow-hidden hover:shadow-md transition-all duration-300">
              <CardContent className="pt-6">
                <h2 className="text-lg sm:text-xl font-bold mb-2 text-[#222222]">Spirituality: The Depth Within</h2>
                <p className="text-sm text-[#222222]">From an early age, I have been drawn to exploring the <span className="highlight highlight-spirituality">nature of consciousness</span>&mdash;not just as a concept but as a lived experience. Meditation has been my anchor, offering clarity amid the noise of the world. It's not just about stillness; it's about <span className="highlight highlight-spirituality">understanding the deeper rhythms of life</span>, the subtle forces that shape our thoughts, emotions, and the reality we create. My journey with the <span className="highlight highlight-spirituality">Art of Living</span> and my immersion in texts like the <i>Yoga Vashishtha</i> and <i>Patanjali's Yoga Sutras</i> continue to expand my understanding of self and existence.</p>
              </CardContent>
            </Card>

            <Card className="border-none shadow-sm bg-gradient-to-r from-blue-50 to-white overflow-hidden hover:shadow-md transition-all duration-300">
              <CardContent className="pt-6">
                <h2 className="text-lg sm:text-xl font-bold mb-2 text-[#222222]">Science: The Curiosity That Never Ends</h2>
                <p className="text-sm text-[#222222]">While spirituality takes me inward, <span className="highlight highlight-science">science</span> propels me outward. I've always been fascinated by the fundamental principles governing our universe, from <span className="highlight highlight-science">physics to artificial intelligence</span>. Understanding how things work—whether it's the fabric of space-time or the algorithms shaping the future—fuels my curiosity. I believe that at its core, science is a pursuit of <span className="highlight highlight-science">truth, pattern recognition, and deeper understanding</span>&mdash;much like meditation but in a different form.</p>
              </CardContent>
            </Card>

            <Card className="border-none shadow-sm bg-gradient-to-r from-green-50 to-white overflow-hidden hover:shadow-md transition-all duration-300">
              <CardContent className="pt-6">
                <h2 className="text-lg sm:text-xl font-bold mb-2 text-[#222222]">Startups: The Art of Building</h2>
                <p className="text-sm text-[#222222]">If spirituality is about being and science is about knowing, then <span className="highlight highlight-startups">startups</span> are about creating. I thrive in the energy of building something from the ground up—whether it's an AI-driven automation tool, an edtech venture, or a creative platform like <span className="highlight highlight-startups">Singalala</span>. Startups excite me because they embody the <span className="highlight highlight-startups">alchemy of vision, problem-solving, and resilience</span>. They are not just businesses; they are ideas brought to life, constantly evolving, adapting, and finding meaning in the chaos.</p>
              </CardContent>
            </Card>
          </div>

          <p className="text-sm text-[#222222] mt-8 mb-6 text-center italic">Through my work, I seek to blend these three dimensions—bringing the depth of <span className="highlight highlight-spirituality">spiritual awareness</span>, the rigor of <span className="highlight highlight-science">scientific inquiry</span>, and the dynamism of <span className="highlight highlight-startups">entrepreneurship</span> into everything I do. If you're someone who shares a love for any of these, let's connect and explore the endless possibilities of what we can build together.</p>
        </div>
      </div>

      {/* First Section: Orbiting Interests Visualization */}
      <section className="flex justify-center mt-10">
        <InterestOrbits />
      </section>

      {/* Second Section: Hobbies Carousel */}
      <section className="mb-8 sm:mb-12">
        <HobbiesCarousel />
      </section>
    </div>
  );
}