import { useQuery } from "@tanstack/react-query";
import { type Section } from "@shared/schema";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function Expertise() {
  const { data: sections, isLoading } = useQuery<Section[]>({
    queryKey: ["/api/sections/expertise"],
  });

  if (isLoading) {
    return (
      <div className="grid gap-6 md:grid-cols-2">
        <Skeleton className="h-[300px]" />
        <Skeleton className="h-[300px]" />
        <Skeleton className="h-[300px]" />
        <Skeleton className="h-[300px]" />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <h1 className="text-4xl font-bold">Expertise</h1>
      <div className="grid gap-6 md:grid-cols-2">
        {sections?.map((section) => (
          <Card key={section.id}>
            <CardContent className="p-6">
              <h2 className="mb-4 text-2xl font-bold">{section.title}</h2>
              <p className="text-muted-foreground">{section.content}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
