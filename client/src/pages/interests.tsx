import { useQuery } from "@tanstack/react-query";
import { type Interest } from "@shared/schema";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function Interests() {
  const { data: interests, isLoading } = useQuery<Interest[]>({
    queryKey: ["/api/interests"],
  });

  if (isLoading) {
    return (
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Skeleton className="h-[300px]" />
        <Skeleton className="h-[300px]" />
        <Skeleton className="h-[300px]" />
      </div>
    );
  }

  const categories = Array.from(
    new Set(interests?.map((interest) => interest.category)),
  );

  return (
    <div className="space-y-12 pt-16">
      <h1 className="text-4xl font-bold">My Interests</h1>
      <Tabs defaultValue={categories[0]} className="w-full">
        <TabsList className="mb-8">
          {categories.map((category) => (
            <TabsTrigger key={category} value={category} className="capitalize">
              {category}
            </TabsTrigger>
          ))}
        </TabsList>
        {categories.map((category) => (
          <TabsContent key={category} value={category}>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {interests
                ?.filter((interest) => interest.category === category)
                .map((interest) => (
                  <Card key={interest.id}>
                    {interest.imageUrl && (
                      <img
                        src={interest.imageUrl}
                        alt={interest.title}
                        className="aspect-video w-full object-cover"
                      />
                    )}
                    <CardHeader>
                      <CardTitle>{interest.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">
                        {interest.description}
                      </p>
                    </CardContent>
                  </Card>
                ))}
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
