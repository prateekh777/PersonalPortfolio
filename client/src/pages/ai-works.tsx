import { useEffect, useRef } from "react";
import { type AiWork } from "../types/ai-work";
import { aiWorksData } from "../data/ai-works-data";
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

// Project-specific color palette
const COLORS = {
  primary: "#222222",
  secondary: "#7B7B7B",
  tertiary: "#F8F8F8",
  white: "#FFFFFF",
  background: "rgb(150, 140, 120)"
};

export default function AiWorks() {
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  
  // Setup scroll animation when component mounts
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1
    };
    
    const handleIntersection = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in');
        }
      });
    };
    
    const observer = new IntersectionObserver(handleIntersection, observerOptions);
    
    cardsRef.current.forEach(card => {
      if (card) observer.observe(card);
    });
    
    return () => {
      cardsRef.current.forEach(card => {
        if (card) observer.unobserve(card);
      });
    };
  }, []);

  return (
    <div 
      className="min-h-screen py-16 px-4 md:px-8"
      style={{ backgroundColor: COLORS.background }}
    >
      <div className="max-w-6xl mx-auto space-y-12">
        <div className="flex items-center gap-4">
          <Brain className="h-10 w-10" style={{ color: COLORS.primary }} />
          <h1 className="text-5xl font-bold" style={{ color: COLORS.primary }}>AI Works</h1>
        </div>
        
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-2">
          {aiWorksData.map((work, index) => (
            <div 
              key={work.id}
              ref={el => cardsRef.current[index] = el}
              className="opacity-0 translate-y-10 transition-all duration-700 ease-out"
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              <Card className="overflow-hidden h-full flex flex-col shadow-lg border-0" 
                style={{ backgroundColor: COLORS.white, borderRadius: '0.75rem' }}>
                
                {work.imageUrl && (
                  <div className="aspect-video w-full overflow-hidden">
                    {work.mediaType === 'video' ? (
                      <video 
                        src={work.imageUrl} 
                        className="w-full h-full object-cover"
                        autoPlay
                        muted
                        loop
                        playsInline
                      />
                    ) : (
                      <img
                        src={work.imageUrl}
                        alt={work.title}
                        className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                      />
                    )}
                  </div>
                )}
                
                <CardHeader>
                  <CardTitle style={{ color: COLORS.primary }}>{work.title}</CardTitle>
                </CardHeader>
                
                <CardContent className="flex-1">
                  <p className="mb-4" style={{ color: COLORS.secondary }}>{work.description}</p>
                  <div className="flex flex-wrap gap-2 mt-4">
                    {work.technologies.map((tech) => (
                      <Badge key={tech} variant="outline" 
                        style={{ 
                          backgroundColor: COLORS.tertiary, 
                          color: COLORS.primary,
                          borderColor: COLORS.primary 
                        }}>
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
                
                {work.demoUrl && (
                  <CardFooter className="pt-4">
                    <Button
                      className="w-full"
                      style={{ 
                        backgroundColor: COLORS.primary,
                        color: COLORS.white,
                        borderColor: COLORS.primary 
                      }}
                      onClick={() => work.demoUrl && window.open(work.demoUrl as string, "_blank")}
                    >
                      <ExternalLink className="mr-2 h-4 w-4" />
                      View Demo
                    </Button>
                  </CardFooter>
                )}
              </Card>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
