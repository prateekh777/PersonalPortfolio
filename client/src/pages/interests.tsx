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
        Explore my diverse interests across startups, science, and spirituality. Click on any orbit to discover more.
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
