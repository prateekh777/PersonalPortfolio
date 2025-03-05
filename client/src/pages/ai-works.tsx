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
import { ExternalLink, Brain, ChevronRight, X, Lightbulb, MessageSquare } from "lucide-react";

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
  const bannerRef = useRef<HTMLDivElement | null>(null);
  const collaborateBannerRef = useRef<HTMLDivElement | null>(null);
  const [activeCard, setActiveCard] = useState<number | null>(null);
  const [selectedProject, setSelectedProject] = useState<AiWork | null>(null);
  const [isOverlayOpen, setIsOverlayOpen] = useState(false);
  
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
    
    // Observe banner elements
    if (bannerRef.current) {
      observer.observe(bannerRef.current);
    }
    
    if (collaborateBannerRef.current) {
      observer.observe(collaborateBannerRef.current);
    }
    
    return () => {
      cardsRef.current.forEach(card => {
        if (card) observer.unobserve(card);
      });
      
      if (bannerRef.current) observer.unobserve(bannerRef.current);
      if (collaborateBannerRef.current) observer.unobserve(collaborateBannerRef.current);
    };
  }, []);

  // Handle body scroll lock when overlay is open
  useEffect(() => {
    if (isOverlayOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOverlayOpen]);

  // Function to handle video hover effects
  const handleCardHover = (index: number) => {
    setActiveCard(index);
  };

  const handleCardLeave = () => {
    setActiveCard(null);
  };

  // Function to open project detail overlay
  const openProjectOverlay = (project: AiWork) => {
    setSelectedProject(project);
    setIsOverlayOpen(true);
  };

  // Function to close project detail overlay
  const closeProjectOverlay = () => {
    setIsOverlayOpen(false);
    setTimeout(() => setSelectedProject(null), 300); // Clear selected project after animation completes
  };

  // Truncate description text for card display
  const truncateDescription = (text: string, maxLength = 150) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  };

  return (
    <div 
      className="min-h-screen py-16 px-4 md:px-8"
      style={{ backgroundColor: COLORS.background }}
    >
      <div className="max-w-6xl mx-auto space-y-12">
        <div className="flex flex-col md:flex-row items-center gap-4 mb-8 ai-card-enter">
          <Brain className="h-12 w-12" style={{ color: COLORS.primary }} />
          <div>
            <h1 className="text-5xl font-bold relative overflow-hidden ai-title-shimmer" style={{ color: COLORS.primary }}>
              AI Works
            </h1>
            <p className="text-lg mt-2" style={{ color: COLORS.secondary }}>
              A collection of my projects exploring the intersection of AI and everyday problems
            </p>
          </div>
        </div>
        
        {/* AI Projects Introduction Banner */}
        <div 
          ref={bannerRef}
          className="bg-gradient-to-r from-gray-900 to-gray-800 rounded-xl p-6 md:p-8 opacity-0 transition-all duration-1000 ease-out"
          style={{ transform: 'translateY(30px)' }}
        >
          <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
            <div className="p-3 rounded-full bg-white/10">
              <Lightbulb className="h-8 w-8 text-yellow-400" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white mb-2">From Ideas to Real-World AI Solutions</h2>
              <p className="text-gray-300">
                These projects represent my journey through practical AI applications. Each one began with a specific 
                challenge—often encountered in everyday life—that I solved using AI and programming. My approach 
                focuses on creating accessible, efficient tools that solve real problems, not just technical 
                exercises.
              </p>
            </div>
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
                    {truncateDescription(work.description)}
                    <Button 
                      variant="link" 
                      className="ml-1 p-0 h-auto font-medium"
                      style={{ color: COLORS.primary }}
                      onClick={() => openProjectOverlay(work)}
                    >
                      Read more
                      <ChevronRight className="h-3 w-3 ml-1" />
                    </Button>
                  </p>
                  <div className="flex flex-wrap gap-2 mt-4">
                    {work.technologies.map((tech, techIndex) => (
                      <Badge 
                        key={tech} 
                        variant="outline" 
                        className={`transition-colors duration-300 ${activeCard === index ? 'tech-badge-pop' : ''}`}
                        style={{ 
                          backgroundColor: activeCard === index ? COLORS.primary : COLORS.tertiary, 
                          color: activeCard === index ? COLORS.white : COLORS.primary,
                          borderColor: COLORS.primary,
                          animationDelay: `${techIndex * 50}ms`
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
        
        {/* Collaboration Banner */}
        <div 
          ref={collaborateBannerRef}
          className="mt-16 bg-gradient-to-r from-indigo-600 to-indigo-800 rounded-xl p-6 md:p-8 opacity-0 transition-all duration-1000 ease-out"
          style={{ transform: 'translateY(30px)' }}
        >
          <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
            <div className="p-4 rounded-full bg-white/10">
              <MessageSquare className="h-10 w-10 text-white" />
            </div>
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-white mb-2">Let's Collaborate on AI Projects</h2>
              <p className="text-indigo-100 mb-4">
                Have an interesting AI challenge or problem? I'm always looking to collaborate on projects 
                that push the boundaries of what's possible with AI technology. Whether you're a business 
                looking to innovate or a fellow developer with a creative idea, I'd love to hear from you.
              </p>
              <div className="flex flex-wrap gap-3">
                <a href="/contact">
                  <Button
                    className="transition-all duration-300 hover:translate-y-[-2px]"
                    style={{ 
                      backgroundColor: 'white',
                      color: COLORS.primary,
                      borderColor: 'white',
                    }}
                  >
                    Get in Touch
                  </Button>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Project Detail Overlay */}
      {isOverlayOpen && selectedProject && (
        <div 
          className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4 md:p-8 overlay-enter"
          onClick={closeProjectOverlay}
        >
          <div 
            className="bg-white rounded-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto overlay-card-enter"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative">
              {selectedProject.imageUrl && (
                <div className="h-60 sm:h-80 overflow-hidden">
                  {selectedProject.mediaType === 'video' ? (
                    <video 
                      src={selectedProject.imageUrl} 
                      className="w-full h-full object-cover"
                      autoPlay
                      muted
                      loop
                      playsInline
                    />
                  ) : (
                    <img
                      src={selectedProject.imageUrl}
                      alt={selectedProject.title}
                      className="w-full h-full object-cover"
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                </div>
              )}
              
              <Button 
                className="absolute top-4 right-4 rounded-full w-10 h-10 p-0 flex items-center justify-center"
                style={{ backgroundColor: 'rgba(255, 255, 255, 0.3)', backdropFilter: 'blur(4px)' }}
                onClick={closeProjectOverlay}
              >
                <X className="h-5 w-5" style={{ color: COLORS.white }} />
              </Button>
              
              <div className="absolute bottom-4 left-6 right-6">
                <h2 className="text-3xl font-bold" style={{ color: COLORS.white }}>
                  {selectedProject.title}
                </h2>
              </div>
            </div>
            
            <div className="p-6">
              <div className="mb-8">
                <p className="text-lg leading-relaxed" style={{ color: COLORS.secondary }}>
                  {selectedProject.description}
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold mb-3" style={{ color: COLORS.primary }}>Technologies</h3>
                <div className="flex flex-wrap gap-2">
                  {selectedProject.technologies.map((tech) => (
                    <Badge 
                      key={tech} 
                      variant="outline" 
                      className="tech-badge-pop"
                      style={{ 
                        backgroundColor: COLORS.tertiary, 
                        color: COLORS.primary,
                        borderColor: COLORS.primary
                      }}
                    >
                      {tech}
                    </Badge>
                  ))}
                </div>
              </div>
              
              {selectedProject.demoUrl && (
                <div className="mt-8">
                  <Button
                    className="w-full"
                    style={{ 
                      backgroundColor: COLORS.primary,
                      color: COLORS.white,
                      borderColor: COLORS.primary
                    }}
                    onClick={() => selectedProject.demoUrl && window.open(selectedProject.demoUrl, "_blank")}
                  >
                    <ExternalLink className="mr-2 h-4 w-4" />
                    View Demo
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
