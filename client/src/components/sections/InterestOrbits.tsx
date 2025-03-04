import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
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
    { id: 1, title: 'Startup 1', description: 'Description for startup 1', imageUrl: '/placeholder-startup-1.jpg' },
    { id: 2, title: 'Startup 2', description: 'Description for startup 2', imageUrl: '/placeholder-startup-2.jpg' },
    { id: 3, title: 'Startup 3', description: 'Description for startup 3', imageUrl: '/placeholder-startup-3.jpg' },
  ],
  science: [
    { id: 4, title: 'Science 1', description: 'Description for science 1', imageUrl: '/placeholder-science-1.jpg' },
    { id: 5, title: 'Science 2', description: 'Description for science 2', imageUrl: '/placeholder-science-2.jpg' },
    { id: 6, title: 'Science 3', description: 'Description for science 3', imageUrl: '/placeholder-science-3.jpg' },
  ],
  spirituality: [
    { id: 7, title: 'Spirituality 1', description: 'Description for spirituality 1', imageUrl: '/placeholder-spirituality-1.jpg' },
    { id: 8, title: 'Spirituality 2', description: 'Description for spirituality 2', imageUrl: '/placeholder-spirituality-2.jpg' },
    { id: 9, title: 'Spirituality 3', description: 'Description for spirituality 3', imageUrl: '/placeholder-spirituality-3.jpg' },
  ],
};

// Placeholder image URLs (temporary)
const PLACEHOLDER_IMAGES: Record<InterestCategory | 'central', string> = {
  central: 'https://via.placeholder.com/100?text=Me',
  startups: 'https://via.placeholder.com/60?text=Startups',
  science: 'https://via.placeholder.com/60?text=Science',
  spirituality: 'https://via.placeholder.com/60?text=Spirit',
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
        className="absolute z-10 w-32 h-32 rounded-full bg-background shadow-md flex flex-col items-center justify-center cursor-pointer hover:scale-105 transition-transform"
        style={{ 
          border: '2px solid var(--primary)'
        }}
      >
        <div className="w-24 h-24 rounded-full overflow-hidden">
          <img 
            src={PLACEHOLDER_IMAGES.central} 
            alt="Central" 
            className="w-full h-full object-cover"
          />
        </div>
        <span className="mt-2 text-sm font-medium">Interests</span>
      </div>
      
      {/* Orbiting planets (using CSS animations for the orbiting effect) */}
      <div className="absolute w-[500px] h-[500px] rounded-full border border-dashed border-muted-foreground/30">
        {/* Startups orbit */}
        <div className="orbit-circle" style={{ animation: 'orbit 20s linear infinite' }}>
          <div 
            className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 rounded-full bg-background shadow-md flex flex-col items-center justify-center cursor-pointer hover:scale-110 transition-transform"
            onClick={() => handleOpenCategory('startups')}
          >
            <div className="w-12 h-12 rounded-full overflow-hidden">
              <img 
                src={PLACEHOLDER_IMAGES.startups} 
                alt="Startups" 
                className="w-full h-full object-cover"
              />
            </div>
            <span className="mt-1 text-xs font-medium">Startups</span>
          </div>
        </div>
        
        {/* Science orbit (120 degrees offset) */}
        <div className="orbit-circle" style={{ animation: 'orbit 20s linear infinite', animationDelay: '-6.66s' }}>
          <div 
            className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 rounded-full bg-background shadow-md flex flex-col items-center justify-center cursor-pointer hover:scale-110 transition-transform"
            onClick={() => handleOpenCategory('science')}
          >
            <div className="w-12 h-12 rounded-full overflow-hidden">
              <img 
                src={PLACEHOLDER_IMAGES.science} 
                alt="Science" 
                className="w-full h-full object-cover"
              />
            </div>
            <span className="mt-1 text-xs font-medium">Science</span>
          </div>
        </div>
        
        {/* Spirituality orbit (240 degrees offset) */}
        <div className="orbit-circle" style={{ animation: 'orbit 20s linear infinite', animationDelay: '-13.33s' }}>
          <div 
            className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 rounded-full bg-background shadow-md flex flex-col items-center justify-center cursor-pointer hover:scale-110 transition-transform"
            onClick={() => handleOpenCategory('spirituality')}
          >
            <div className="w-12 h-12 rounded-full overflow-hidden">
              <img 
                src={PLACEHOLDER_IMAGES.spirituality} 
                alt="Spirituality" 
                className="w-full h-full object-cover"
              />
            </div>
            <span className="mt-1 text-xs font-medium">Spirituality</span>
          </div>
        </div>
      </div>
      
      {/* Dialog for showing selected category images */}
      <Dialog open={activeCategory !== null} onOpenChange={handleCloseDialog}>
        <DialogContent className="sm:max-w-[80vw] max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl capitalize">
              {activeCategory} Interests
            </DialogTitle>
          </DialogHeader>
          
          <Carousel className="w-full">
            <CarouselContent>
              {activeCategory && MOCK_INTERESTS[activeCategory].map((item) => (
                <CarouselItem key={item.id} className="sm:basis-1/2 md:basis-1/3">
                  <div className="p-2">
                    <div className="bg-background rounded-lg overflow-hidden shadow-md p-2">
                      <div className="aspect-square w-full overflow-hidden rounded-md">
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
                        <h3 className="font-medium text-sm">{item.title}</h3>
                        <p className="text-xs text-muted-foreground">{item.description}</p>
                      </div>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </DialogContent>
      </Dialog>
      
      {/* CSS for animations is added to the head of the document */}
    </div>
  );
}