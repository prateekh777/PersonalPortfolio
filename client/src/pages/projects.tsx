import { useQuery } from "@tanstack/react-query";
import { type Project } from "@shared/schema";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink, Github } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

export default function Projects() {
  const { data: projects, isLoading } = useQuery<Project[]>({
    queryKey: ["/api/projects"],
  });

  if (isLoading) {
    return (
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Skeleton className="h-[400px]" />
        <Skeleton className="h-[400px]" />
        <Skeleton className="h-[400px]" />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <h1 className="text-4xl font-bold">Projects</h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {projects?.map((project) => (
          <Card key={project.id} className="flex flex-col">
            {project.imageUrl && (
              <img
                src={project.imageUrl}
                alt={project.title}
                className="aspect-video w-full object-cover"
              />
            )}
            <CardHeader>
              <CardTitle>{project.title}</CardTitle>
            </CardHeader>
            <CardContent className="flex-1">
              <p className="mb-4 text-muted-foreground">{project.description}</p>
              <div className="flex flex-wrap gap-2">
                {project.tags?.map((tag) => (
                  <Badge key={tag} variant="secondary">
                    {tag}
                  </Badge>
                ))}
              </div>
            </CardContent>
            {project.projectUrl && (
              <CardFooter className="pt-4">
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => window.open(project.projectUrl, "_blank")}
                >
                  <ExternalLink className="mr-2 h-4 w-4" />
                  View Project
                </Button>
              </CardFooter>
            )}
          </Card>
        ))}
      </div>
    </div>
  );
}
