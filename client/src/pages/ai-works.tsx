import { useEffect, useRef, useState } from "react";
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
import { ExternalLink, Brain, ExternalLinkIcon } from "lucide-react";

// Project-specific color palette - precisely matching requirements
const COLORS = {
  primary: "#222222",
  secondary: "#7B7B7B",
  tertiary: "#F8F8F8",
  white: "#FFFFFF",
  background: "rgb(150, 140, 120)" // Within range R(148-152), G(137-143), B(117-123)
};

export default function AiWorks() {
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const [activeCard, setActiveCard] = useState<number | null>(null);
  
  // Setup scroll animation when component mounts
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.15 // Slightly increased threshold for better timing
    };
    
    const handleIntersection = (entries: IntersectionObserverEntry[], observer: IntersectionObserver) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const element = entry.target as HTMLElement;
          element.style.opacity = '1';
          element.style.transform = 'translateY(0)';
          // Stop observing after animation is triggered
          observer.unobserve(entry.target);
        }
      });
    };
    
    const observer = new IntersectionObserver(handleIntersection, observerOptions);
    
    cardsRef.current.forEach(card => {
      if (card) {
        observer.observe(card);
      }
    });
    
    return () => {
      cardsRef.current.forEach(card => {
        if (card) observer.unobserve(card);
      });
    };
  }, []);

  // Function to handle video hover effects
  const handleCardHover = (index: number) => {
    setActiveCard(index);
  };

  const handleCardLeave = () => {
    setActiveCard(null);
  };

  return (
    <div 
      className="min-h-screen py-16 px-4 md:px-8"
      style={{ backgroundColor: COLORS.background }}
    >
      <div className="max-w-6xl mx-auto space-y-12">
        <div className="flex flex-col md:flex-row items-center gap-4 mb-8">
          <Brain className="h-12 w-12" style={{ color: COLORS.primary }} />
          <div>
            <h1 className="text-5xl font-bold" style={{ color: COLORS.primary }}>AI Works</h1>
            <p className="text-lg mt-2" style={{ color: COLORS.secondary }}>
              A collection of my projects exploring the intersection of AI and everyday problems
            </p>
          </div>
        </div>
        
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-2">
          {aiWorksData.map((work, index) => (
            <div 
              key={work.id}
              ref={el => cardsRef.current[index] = el}
              className="opacity-0 transition-all duration-1000 ease-out"
              style={{ 
                transform: 'translateY(30px)', 
                transitionDelay: `${index * 200}ms` 
              }}
              onMouseEnter={() => handleCardHover(index)}
              onMouseLeave={handleCardLeave}
            >
              <Card 
                className="overflow-hidden h-full flex flex-col shadow-xl border-0 hover:shadow-2xl transition-all duration-500" 
                style={{ 
                  backgroundColor: COLORS.white, 
                  borderRadius: '0.75rem',
                  transform: activeCard === index ? 'scale(1.02)' : 'scale(1)',
                  transition: 'transform 0.5s ease-out'
                }}
              >
                {work.imageUrl && (
                  <div className="aspect-video w-full overflow-hidden relative">
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
                        className="w-full h-full object-cover transition-transform duration-700"
                        style={{
                          transform: activeCard === index ? 'scale(1.08)' : 'scale(1)'
                        }}
                      />
                    )}
                    
                    {/* Overlay gradient for better text contrast */}
                    <div 
                      className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 transition-opacity duration-300"
                      style={{ opacity: activeCard === index ? 0.6 : 0 }}
                    />
                  </div>
                )}
                
                <CardHeader>
                  <CardTitle 
                    className="text-2xl transition-all duration-300"
                    style={{ 
                      color: COLORS.primary,
                      transform: activeCard === index ? 'translateY(-2px)' : 'translateY(0)'
                    }}
                  >
                    {work.title}
                  </CardTitle>
                </CardHeader>
                
                <CardContent className="flex-1">
                  <p 
                    className="mb-4 leading-relaxed" 
                    style={{ color: COLORS.secondary }}
                  >
                    {work.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mt-4">
                    {work.technologies.map((tech) => (
                      <Badge 
                        key={tech} 
                        variant="outline" 
                        className="transition-colors duration-300"
                        style={{ 
                          backgroundColor: activeCard === index ? COLORS.primary : COLORS.tertiary, 
                          color: activeCard === index ? COLORS.white : COLORS.primary,
                          borderColor: COLORS.primary 
                        }}
                      >
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
                
                {work.demoUrl && (
                  <CardFooter className="pt-4">
                    <Button
                      className="w-full transition-all duration-300"
                      style={{ 
                        backgroundColor: COLORS.primary,
                        color: COLORS.white,
                        borderColor: COLORS.primary,
                        transform: activeCard === index ? 'translateY(-2px)' : 'translateY(0)',
                        boxShadow: activeCard === index ? '0 10px 20px rgba(0, 0, 0, 0.1)' : 'none'
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
