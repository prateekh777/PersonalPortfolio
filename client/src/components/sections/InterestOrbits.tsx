import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { LucideChevronLeft, LucideChevronRight, Play } from 'lucide-react';
import './InterestOrbits.css';

// Define interest category types
type InterestCategory = 'startups' | 'science' | 'spirituality';

// Define the interest data structure
interface InterestItem {
  id: number;
  title: string;
  description: string;
  mediaUrl: string; 
  mediaType?: 'image' | 'video'; // Default is image if not specified
}

// Hardcoded data for each category
const INTERESTS_DATA: Record<InterestCategory, InterestItem[]> = {
  startups: [
    { id: 1, title: 'Awards Building Edtech', description: 'When you win it fully!', mediaUrl: '/Interests/Startups/BC Award_2.jpg', mediaType: 'image' },
    { id: 2, title: 'Some more Edtech', description: 'Creating new opportunities', mediaUrl: '/Interests/Startups/BC Award.jpg', mediaType: 'image' },
    { id: 3, title: 'Blitz scale it with passion', description: 'Speed matters', mediaUrl: '/Interests/Startups/BC Video.mp4', mediaType: 'video' },
    { id: 10, title: 'Love it when you do it', description: 'Education for all', mediaUrl: '/Interests/Startups/Edoflip Speech.mp4', mediaType: 'video' },
    { id: 13, title: 'For the Climate', description: 'For everyones Future', mediaUrl: '/Interests/Startups/Public Speaking Greetude.jpg', mediaType: 'image' },
    { id: 14, title: 'Helping Startup Ecosystem', description: 'Learn and share at the same time', mediaUrl: '/Interests/Startups/Startup India Prateek.jpg', mediaType: 'image' },
  ],
  science: [
    { id: 4, title: 'Chemistry at Play', description: 'On Stage for Kids', mediaUrl: '/Interests/Science/Prateek%20Chemistry.jpg', mediaType: 'image' },
    { id: 5, title: 'Observations evaluated', description: 'The WoW effect!', mediaUrl: '/Interests/Science/Prateek Teaching.mp4', mediaType: 'video' },
    { id: 6, title: 'Planets and Planeteriums!', description: 'Always wondered about the larger universe!', mediaUrl: '/Interests/Science/Science Prateek.jpg', mediaType: 'image' },
    { id: 11, title: 'How to Wonder', description: 'Exploring mysteries together', mediaUrl: '/Interests/Science/Speaker KPS.jpg', mediaType: 'image' },
  ],
  spirituality: [
    { id: 7, title: 'Meditation', description: 'Finding inner peace', mediaUrl: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773', mediaType: 'image' },
    { id: 8, title: 'Yoga', description: 'Balancing mind and body', mediaUrl: 'https://images.unsplash.com/photo-1545389336-cf090694435e', mediaType: 'image' },
    { id: 9, title: 'Mindfulness Practice', description: 'Guided meditation session', mediaUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4', mediaType: 'video' },
    { id: 12, title: 'Nature', description: 'Connecting with the world', mediaUrl: 'https://images.unsplash.com/photo-1518173946687-a4c8892bbd9f', mediaType: 'image' },
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
    <>
      <div className="relative w-full h-[450px] sm:h-[500px] flex items-center justify-center overflow-hidden" 
        style={{ background: 'rgba(150, 140, 120, 0.05)' }}>
        {/* Main central circle */}
        <div 
          className="absolute z-10 w-28 h-28 sm:w-36 sm:h-36 rounded-full shadow-md orbit-item clickable-pulse"
        >
          <div className="orbit-content">
            <div className="orbit-image-container">
              <div className="w-20 h-20 sm:w-28 sm:h-28 rounded-full overflow-hidden">
                <img 
                  src="/Interests/Hobbies/Main image.jpg" 
                  alt="Central" 
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = 'https://via.placeholder.com/200?text=Interests';
                  }}
                />
              </div>
              <div className="orbit-title text-xs sm:text-sm text-[#222222]">Interests</div>
            </div>
          </div>
        </div>
        
        {/* Orbiting circles (using CSS animations for the orbiting effect) */}
        <div className="absolute w-[260px] h-[260px] sm:w-[300px] sm:h-[300px] rounded-full border border-dashed border-[#7B7B7B]/30">
          {/* Startups orbit */}
          <div className="orbit-circle" style={{ animation: 'orbit 20s linear infinite' }}>
            <div 
              className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 sm:w-28 sm:h-28 rounded-full shadow-md orbit-item clickable-pulse"
              onClick={() => handleOpenCategory('startups')}
            >
              <div className="orbit-content">
                <div className="orbit-image-container">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full overflow-hidden">
                    <img 
                      src={PLACEHOLDER_IMAGES.startups} 
                      alt="Startups" 
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = 'https://via.placeholder.com/120?text=Startups';
                      }}
                    />
                  </div>
                  <div className="orbit-title text-[10px] sm:text-xs text-[#222222]">Startups</div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Science orbit (120 degrees offset) */}
          <div className="orbit-circle" style={{ animation: 'orbit 20s linear infinite', animationDelay: '-6.66s' }}>
            <div 
              className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 sm:w-28 sm:h-28 rounded-full shadow-md orbit-item clickable-pulse"
              onClick={() => handleOpenCategory('science')}
            >
              <div className="orbit-content">
                <div className="orbit-image-container">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full overflow-hidden">
                    <img 
                      src={PLACEHOLDER_IMAGES.science} 
                      alt="Science" 
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = 'https://via.placeholder.com/120?text=Science';
                      }}
                    />
                  </div>
                  <div className="orbit-title text-[10px] sm:text-xs text-[#222222]">Science</div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Spirituality orbit (240 degrees offset) */}
          <div className="orbit-circle" style={{ animation: 'orbit 20s linear infinite', animationDelay: '-13.33s' }}>
            <div 
              className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 sm:w-28 sm:h-28 rounded-full shadow-md orbit-item clickable-pulse"
              onClick={() => handleOpenCategory('spirituality')}
            >
              <div className="orbit-content">
                <div className="orbit-image-container">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full overflow-hidden">
                    <img 
                      src={PLACEHOLDER_IMAGES.spirituality} 
                      alt="Spirituality" 
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = 'https://via.placeholder.com/120?text=Spirituality';
                      }}
                    />
                  </div>
                  <div className="orbit-title text-[10px] sm:text-xs text-[#222222]">Spirituality</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Instruction text below the orbits */}
        <div className="absolute bottom-2 left-0 right-0 text-center sm:text-left sm:left-8 sm:right-auto text-xs text-[#7B7B7B]">
          <p className="italic">Click on sphere to know more...</p>
        </div>
      </div>
        
      {/* Dialog for showing selected category images */}
      <Dialog open={activeCategory !== null} onOpenChange={handleCloseDialog}>
        <DialogContent className="sm:max-w-[90vw] max-h-[90vh] overflow-auto p-5" 
          style={{ background: '#F8F8F8', borderColor: '#222222' }}>
          <DialogHeader>
            <DialogTitle className="text-xl capitalize mb-3" style={{ color: '#222222' }}>
              {activeCategory} Interests
            </DialogTitle>
          </DialogHeader>
          
          <Carousel className="w-full" opts={{ loop: true }}>
            <CarouselContent className="-ml-2 md:-ml-4">
              {activeCategory && INTERESTS_DATA[activeCategory].map((item) => (
                <CarouselItem key={item.id} className="pl-2 md:pl-4 sm:basis-1/2 md:basis-1/3 lg:basis-1/4">
                  <div className="p-1">
                    <div className="bg-white rounded-lg overflow-hidden shadow-md p-2 h-full border border-[#7B7B7B]/10">
                      <div className="aspect-square w-full overflow-hidden rounded-md mb-2">
                        {item.mediaType === 'video' ? (
                          <div className="video-container">
                            <video 
                              src={item.mediaUrl}
                              className="w-full h-full object-cover"
                              controls
                              muted
                              loop
                              poster={`https://via.placeholder.com/300/222222/FFFFFF?text=${item.title}`}
                            />
                            <div className="play-indicator">
                              <Play size={16} />
                            </div>
                          </div>
                        ) : (
                          <img 
                            src={item.mediaUrl} 
                            alt={item.title}
                            className="w-full h-full object-cover transition-all hover:scale-105"
                            onError={(e) => {
                              (e.target as HTMLImageElement).src = `https://via.placeholder.com/300?text=${item.title}`;
                            }}
                          />
                        )}
                      </div>
                      <div className="pt-1">
                        <h3 className="font-medium text-sm mb-0.5" style={{ color: '#222222' }}>{item.title}</h3>
                        <p className="text-xs" style={{ color: '#7B7B7B' }}>{item.description}</p>
                      </div>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="left-3 lg:left-6 carousel-control" />
            <CarouselNext className="right-3 lg:right-6 carousel-control" />
          </Carousel>
        </DialogContent>
      </Dialog>
    </>
  );
}