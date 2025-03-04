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
    <div className="space-y-12 pt-16 container mx-auto">
      <h1 className="text-4xl font-bold text-center">My Interests</h1>
      <p className="text-lg text-muted-foreground text-center max-w-2xl mx-auto">
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>About Me</title>
            <style>
                body {
                    font-family: Arial, sans-serif;
                    margin: 40px;
                    line-height: 1.6;
                    color: #333;
                }
                h1, h2 {
                    color: #222;
                }
                .container {
                    max-width: 800px;
                    margin: auto;
                }
                .highlight {
                    font-weight: bold;
                    color: #0056b3;
                }
            </style>
        </head>
        <body>
            <div class="container">
                <h1>About Me</h1>
                <p>I find myself at the intersection of <span class="highlight">spirituality, science, and startups</span>&mdash;three seemingly different worlds that, to me, are deeply interconnected.</p>

                <h2>Spirituality: The Depth Within</h2>
                <p>From an early age, I have been drawn to exploring the <span class="highlight">nature of consciousness</span>&mdash;not just as a concept but as a lived experience. Meditation has been my anchor, offering clarity amid the noise of the world. It’s not just about stillness; it’s about <span class="highlight">understanding the deeper rhythms of life</span>, the subtle forces that shape our thoughts, emotions, and the reality we create. My journey with the <span class="highlight">Art of Living</span> and my immersion in texts like the <i>Yoga Vashishtha</i> and <i>Patanjali’s Yoga Sutras</i> continue to expand my understanding of self and existence.</p>

                <h2>Science: The Curiosity That Never Ends</h2>
                <p>While spirituality takes me inward, <span class="highlight">science</span> propels me outward. I’ve always been fascinated by the fundamental principles governing our universe, from <span class="highlight">physics to artificial intelligence</span>. Understanding how things work—whether it's the fabric of space-time or the algorithms shaping the future—fuels my curiosity. I believe that at its core, science is a pursuit of <span class="highlight">truth, pattern recognition, and deeper understanding</span>&mdash;much like meditation but in a different form.</p>

                <h2>Startups: The Art of Building</h2>
                <p>If spirituality is about being and science is about knowing, then <span class="highlight">startups</span> are about creating. I thrive in the energy of building something from the ground up—whether it’s an AI-driven automation tool, an edtech venture, or a creative platform like <span class="highlight">Singalala</span>. Startups excite me because they embody the <span class="highlight">alchemy of vision, problem-solving, and resilience</span>. They are not just businesses; they are ideas brought to life, constantly evolving, adapting, and finding meaning in the chaos.</p>

                <p>Through my work, I seek to blend these three dimensions—bringing the depth of <span class="highlight">spiritual awareness</span>, the rigor of <span class="highlight">scientific inquiry</span>, and the dynamism of <span class="highlight">entrepreneurship</span> into everything I do. If you're someone who shares a love for any of these, let’s connect and explore the endless possibilities of what we can build together.</p>
            </div>
        </body>
        </html>
      </p>
      
      {/* First Section: Orbiting Interests Visualization */}
      <section className="py-12">
        <InterestOrbits />
      </section>
      
      {/* Second Section: Hobbies Carousel */}
      <section className="mb-16">
        <HobbiesCarousel />
      </section>
    </div>
  );
}
