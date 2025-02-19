import { useQuery } from "@tanstack/react-query";
import { type Section } from "@shared/schema";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function Home() {
  const { data: sections, isLoading } = useQuery<Section[]>({
    queryKey: ["/api/sections/home"],
  });

  if (isLoading) {
    return (
      <div className="space-y-8">
        <Skeleton className="h-[400px] w-full" />
        <Skeleton className="h-[400px] w-full" />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {sections?.map((section) => (
        <Card key={section.id}>
          <CardContent className="p-6">
            <h2 className="mb-4 text-2xl font-bold">{section.title}</h2>
            <p className="text-muted-foreground">{section.content}</p>
            {section.mediaUrls?.map((url, index) => (
              <img
                key={index}
                src={url}
                alt={`Media for ${section.title}`}
                className="mt-4 rounded-lg"
              />
            ))}
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
