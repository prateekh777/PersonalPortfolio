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
import { ExternalLink, Brain, Sparkles, Bot } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AutoGPTAgent } from "@/components/AutoGPTAgent";
import { InteractiveAutoGPT } from "@/components/InteractiveAutoGPT";

export default function AiWorks() {
  const { data: aiWorks, isLoading } = useQuery<AiWork[]>({
    queryKey: ["/api/ai-works"],
  });

  if (isLoading) {
    return (
      <div className="space-y-12 pt-16">
        <div className="flex items-center gap-4">
          <Brain className="h-8 w-8 text-primary" />
          <h1 className="text-4xl font-bold">AI Works</h1>
        </div>
        <Skeleton className="h-[600px]" />
        <div className="grid gap-6 md:grid-cols-2">
          <Skeleton className="h-[400px]" />
          <Skeleton className="h-[400px]" />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-12 pt-16">
      <div className="flex items-center gap-4">
        <Brain className="h-8 w-8 text-primary" />
        <h1 className="text-4xl font-bold">AI Works</h1>
      </div>
      
      <div className="space-y-2 mb-12">
        <div className="flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-primary" />
          <h2 className="text-2xl font-semibold">Featured Agent</h2>
        </div>
        <AutoGPTAgent />
      </div>
      
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <Bot className="h-5 w-5 text-primary" />
          <h2 className="text-2xl font-semibold">Interactive AutoGPT Experience</h2>
        </div>
        <p className="text-muted-foreground mb-4">
          Try out a real autonomous agent that breaks down complex goals into manageable steps and executes them. 
          This interactive demo leverages the AutoGPT framework to showcase autonomous AI capabilities.
        </p>
        <div className="md:w-3/4 mx-auto">
          <InteractiveAutoGPT />
        </div>
      </div>

      <Tabs defaultValue="all" className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger value="all">All AI Projects</TabsTrigger>
          <TabsTrigger value="agents">Agents</TabsTrigger>
          <TabsTrigger value="tools">Tools</TabsTrigger>
          <TabsTrigger value="research">Research</TabsTrigger>
        </TabsList>
        
        <TabsContent value="all" className="grid gap-6 md:grid-cols-2">
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
                    onClick={() => {
                      if (work.demoUrl) {
                        window.open(work.demoUrl, "_blank");
                      }
                    }}
                  >
                    <ExternalLink className="mr-2 h-4 w-4" />
                    View Demo
                  </Button>
                </CardFooter>
              )}
            </Card>
          ))}
        </TabsContent>
        
        <TabsContent value="agents" className="grid gap-6 md:grid-cols-2">
          {aiWorks?.filter(work => 
            work.technologies?.some(tech => 
              ['Agent', 'Autonomous', 'LLM', 'GPT'].includes(tech)
            )
          ).map((work) => (
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
                    onClick={() => {
                      if (work.demoUrl) {
                        window.open(work.demoUrl, "_blank");
                      }
                    }}
                  >
                    <ExternalLink className="mr-2 h-4 w-4" />
                    View Demo
                  </Button>
                </CardFooter>
              )}
            </Card>
          ))}
        </TabsContent>
        
        <TabsContent value="tools" className="grid gap-6 md:grid-cols-2">
          {aiWorks?.filter(work => 
            work.technologies?.some(tech => 
              ['Tool', 'Utility', 'API'].includes(tech)
            )
          ).map((work) => (
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
                    onClick={() => {
                      if (work.demoUrl) {
                        window.open(work.demoUrl, "_blank");
                      }
                    }}
                  >
                    <ExternalLink className="mr-2 h-4 w-4" />
                    View Demo
                  </Button>
                </CardFooter>
              )}
            </Card>
          ))}
        </TabsContent>
        
        <TabsContent value="research" className="grid gap-6 md:grid-cols-2">
          {aiWorks?.filter(work => 
            work.technologies?.some(tech => 
              ['Research', 'Paper', 'Study'].includes(tech)
            )
          ).map((work) => (
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
                    onClick={() => {
                      if (work.demoUrl) {
                        window.open(work.demoUrl, "_blank");
                      }
                    }}
                  >
                    <ExternalLink className="mr-2 h-4 w-4" />
                    View Demo
                  </Button>
                </CardFooter>
              )}
            </Card>
          ))}
        </TabsContent>
      </Tabs>
    </div>
  );
}