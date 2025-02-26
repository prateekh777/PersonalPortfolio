import { useQuery } from "@tanstack/react-query";
import { type CaseStudy } from "@shared/schema";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";

export default function CaseStudies() {
  const { data: caseStudies, isLoading } = useQuery<CaseStudy[]>({
    queryKey: ["/api/case-studies"],
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
      <h1 className="text-4xl font-bold">Case Studies</h1>
      <div className="grid gap-6 md:grid-cols-2">
        {caseStudies?.map((study) => (
          <Card key={study.id}>
            {study.imageUrl && (
              <img
                src={study.imageUrl}
                alt={study.title}
                className="aspect-video w-full object-cover"
              />
            )}
            <CardHeader>
              <CardTitle>{study.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4 text-muted-foreground">{study.description}</p>
              <div className="mb-4">
                <h3 className="mb-2 font-semibold">Outcome</h3>
                <p className="text-muted-foreground">{study.outcome}</p>
              </div>
              <div className="flex flex-wrap gap-2">
                {study.technologies?.map((tech) => (
                  <Badge key={tech} variant="secondary">
                    {tech}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
