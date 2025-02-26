import { useQuery } from "@tanstack/react-query";
import { type AiWork } from "@shared/schema";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink, Brain } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

export default function AiWorks() {
  const { data: aiWorks, isLoading } = useQuery<AiWork[]>({
    queryKey: ["/api/ai-works"],
  });

  if (isLoading) {
    return (
      <div className="grid gap-6 md:grid-cols-2">
        <Skeleton className="h-[400px]" />
        <Skeleton className="h-[400px]" />
      </div>
    );
  }

  return (
    <div className="space-y-12 pt-16">
      <div className="flex items-center gap-4">
        <Brain className="h-8 w-8 text-primary" />
        <h1 className="text-4xl font-bold">AI Works</h1>
      </div>
      <div className="grid gap-6 md:grid-cols-2">
        {aiWorks?.map((work) => (
          <Card key={work.id} className="flex flex-col">
            {work.imageUrl && (
              <img
                src={work.imageUrl}
                alt={work.title}
                className="aspect-video w-full object-cover"
              />
            )}
            <CardHeader>
              <CardTitle>{work.title}</CardTitle>
            </CardHeader>
            <CardContent className="flex-1">
              <p className="mb-4 text-muted-foreground">{work.description}</p>
              <div className="flex flex-wrap gap-2">
                {work.technologies?.map((tech) => (
                  <Badge key={tech} variant="secondary">
                    {tech}
                  </Badge>
                ))}
              </div>
            </CardContent>
            {work.demoUrl && (
              <CardFooter className="pt-4">
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => window.open(work.demoUrl, "_blank")}
                >
                  <ExternalLink className="mr-2 h-4 w-4" />
                  View Demo
                </Button>
              </CardFooter>
            )}
          </Card>
        ))}
      </div>
    </div>
  );
}
