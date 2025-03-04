import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { LucideChevronLeft, LucideChevronRight } from 'lucide-react';
import './InterestOrbits.css';

// Define interest category types
type InterestCategory = 'startups' | 'science' | 'spirituality';

// Define the interest data structure
interface InterestItem {
  id: number;
  title: string;
  description: string;
  imageUrl: string; 
}

// Mock data for each category (will be replaced with API data later)
const MOCK_INTERESTS: Record<InterestCategory, InterestItem[]> = {
  startups: [
    { id: 1, title: 'Startup 1', description: 'Building innovative solutions', imageUrl: 'https://images.unsplash.com/photo-1661956602944-249bcd04b63f' },
    { id: 2, title: 'Startup 2', description: 'Creating new opportunities', imageUrl: 'https://images.unsplash.com/photo-1559136555-9303baea8ebd' },
    { id: 3, title: 'Startup 3', description: 'Changing how we work', imageUrl: 'https://images.unsplash.com/photo-1551434678-e076c223a692' },
    { id: 10, title: 'Startup 4', description: 'Exploring business models', imageUrl: 'https://images.unsplash.com/photo-1559136555-9303baea8ebd' },
  ],
  science: [
    { id: 4, title: 'Physics', description: 'Understanding physical laws', imageUrl: 'https://images.unsplash.com/photo-1636466497217-26a8cbeaf0aa' },
    { id: 5, title: 'Biology', description: 'Exploring living systems', imageUrl: 'https://images.unsplash.com/photo-1576086213369-97a306d36557' },
    { id: 6, title: 'Technology', description: 'Advancing human capabilities', imageUrl: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158' },
    { id: 11, title: 'Chemistry', description: 'Matter and its transformations', imageUrl: 'https://images.unsplash.com/photo-1581092335878-2d9ff86ca2bf' },
  ],
  spirituality: [
    { id: 7, title: 'Meditation', description: 'Finding inner peace', imageUrl: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773' },
    { id: 8, title: 'Yoga', description: 'Balancing mind and body', imageUrl: 'https://images.unsplash.com/photo-1545389336-cf090694435e' },
    { id: 9, title: 'Philosophy', description: 'Exploring meaning and purpose', imageUrl: 'https://images.unsplash.com/photo-1490730141103-6cac27aaab94' },
    { id: 12, title: 'Nature', description: 'Connecting with the world', imageUrl: 'https://images.unsplash.com/photo-1518173946687-a4c8892bbd9f' },
  ],
};

// More reliable placeholder images with sizes optimized for our component
const PLACEHOLDER_IMAGES: Record<InterestCategory | 'central', string> = {
  central: 'https://images.unsplash.com/photo-1580927752452-89d86da3fa0a?w=200&h=200&fit=crop&crop=faces',
  startups: 'https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=120&h=120&fit=crop&crop=faces',
  science: 'https://images.unsplash.com/photo-1636466497217-26a8cbeaf0aa?w=120&h=120&fit=crop&crop=faces',
  spirituality: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=120&h=120&fit=crop&crop=faces',
};

export function InterestOrbits() {
  const [activeCategory, setActiveCategory] = useState<InterestCategory | null>(null);
  
  const handleOpenCategory = (category: InterestCategory) => {
    setActiveCategory(category);
  };

  const handleCloseDialog = () => {
    setActiveCategory(null);
  };

  return (
    <div className="relative w-full h-[600px] flex items-center justify-center">
      {/* Main central circle */}
      <div 
        className="absolute z-10 w-40 h-40 rounded-full bg-background shadow-md flex flex-col items-center justify-center clickable-pulse"
      >
        <div className="w-32 h-32 rounded-full overflow-hidden">
          <img 
            src={PLACEHOLDER_IMAGES.central} 
            alt="Central" 
            className="w-full h-full object-cover"
            onError={(e) => {
              (e.target as HTMLImageElement).src = 'https://via.placeholder.com/200?text=Interests';
            }}
          />
        </div>
        <span className="mt-2 font-medium">Interests</span>
      </div>
      
      {/* Orbiting circles (using CSS animations for the orbiting effect) */}
      <div className="absolute w-[500px] h-[500px] rounded-full border border-dashed border-muted-foreground/30">
        {/* Startups orbit */}
        <div className="orbit-circle" style={{ animation: 'orbit 20s linear infinite' }}>
          <div 
            className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 rounded-full bg-background shadow-md flex flex-col items-center justify-center orbit-item clickable-pulse"
            onClick={() => handleOpenCategory('startups')}
          >
            <div className="w-24 h-24 rounded-full overflow-hidden">
              <img 
                src={PLACEHOLDER_IMAGES.startups} 
                alt="Startups" 
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = 'https://via.placeholder.com/120?text=Startups';
                }}
              />
            </div>
            <span className="mt-2 font-medium">Startups</span>
          </div>
        </div>
        
        {/* Science orbit (120 degrees offset) */}
        <div className="orbit-circle" style={{ animation: 'orbit 20s linear infinite', animationDelay: '-6.66s' }}>
          <div 
            className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 rounded-full bg-background shadow-md flex flex-col items-center justify-center orbit-item clickable-pulse"
            onClick={() => handleOpenCategory('science')}
          >
            <div className="w-24 h-24 rounded-full overflow-hidden">
              <img 
                src={PLACEHOLDER_IMAGES.science} 
                alt="Science" 
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = 'https://via.placeholder.com/120?text=Science';
                }}
              />
            </div>
            <span className="mt-2 font-medium">Science</span>
          </div>
        </div>
        
        {/* Spirituality orbit (240 degrees offset) */}
        <div className="orbit-circle" style={{ animation: 'orbit 20s linear infinite', animationDelay: '-13.33s' }}>
          <div 
            className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 rounded-full bg-background shadow-md flex flex-col items-center justify-center orbit-item clickable-pulse"
            onClick={() => handleOpenCategory('spirituality')}
          >
            <div className="w-24 h-24 rounded-full overflow-hidden">
              <img 
                src={PLACEHOLDER_IMAGES.spirituality} 
                alt="Spirituality" 
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = 'https://via.placeholder.com/120?text=Spirituality';
                }}
              />
            </div>
            <span className="mt-2 font-medium">Spirituality</span>
          </div>
        </div>
      </div>
      
      {/* Dialog for showing selected category images */}
      <Dialog open={activeCategory !== null} onOpenChange={handleCloseDialog}>
        <DialogContent className="sm:max-w-[90vw] max-h-[90vh] overflow-auto p-6">
          <DialogHeader>
            <DialogTitle className="text-2xl capitalize mb-4">
              {activeCategory} Interests
            </DialogTitle>
          </DialogHeader>
          
          <Carousel className="w-full">
            <CarouselContent className="-ml-2 md:-ml-4">
              {activeCategory && MOCK_INTERESTS[activeCategory].map((item) => (
                <CarouselItem key={item.id} className="pl-2 md:pl-4 sm:basis-1/2 md:basis-1/3 lg:basis-1/4">
                  <div className="p-1">
                    <div className="bg-background rounded-lg overflow-hidden shadow-lg p-3 h-full">
                      <div className="aspect-square w-full overflow-hidden rounded-md mb-3">
                        <img 
                          src={item.imageUrl} 
                          alt={item.title}
                          className="w-full h-full object-cover transition-all hover:scale-105"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = `https://via.placeholder.com/300?text=${item.title}`;
                          }}
                        />
                      </div>
                      <div className="pt-2">
                        <h3 className="font-medium text-base mb-1">{item.title}</h3>
                        <p className="text-sm text-muted-foreground">{item.description}</p>
                      </div>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="left-2 carousel-control" />
            <CarouselNext className="right-2 carousel-control" />
          </Carousel>
        </DialogContent>
      </Dialog>
    </div>
  );
}