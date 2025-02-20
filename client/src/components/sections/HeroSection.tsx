import { useState, useEffect } from 'react';
import { ArrowDown } from 'lucide-react';

interface HeroSectionProps {
  title: string;
  subtitle: string;
  videoUrl: string;
}

export function HeroSection({ title, subtitle, videoUrl }: HeroSectionProps) {
  const [showScroll, setShowScroll] = useState(true);
  const [videoError, setVideoError] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScroll(window.scrollY < 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section className="relative w-full" style={{ height: 'calc(100vh - 64px)' }}>
      {/* Main Frame - Laptop Screen Background */}
      <div className="absolute inset-0 -z-10">
        <img
          src="/laptop-bg.jpg"
          alt="Laptop Frame"
          className="h-full w-full object-cover"
        />
      </div>

      {/* Video Frame */}
      <div 
        className="absolute left-1/2 top-1/2 z-0 w-[62%] aspect-video"
        style={{
          transform: 'translate(-50%, -58%) perspective(1000px) rotateX(5deg)',
        }}
      >
        {!videoError && (
          <video
            autoPlay
            muted
            loop
            playsInline
            onError={() => setVideoError(true)}
            className="h-full w-full rounded-lg object-cover"
          >
            <source src={videoUrl} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        )}
      </div>

      {/* Dark overlay for better text contrast */}
      <div className="absolute inset-0 z-10 bg-gradient-to-b from-black/20 to-black/40" />

      {/* Title and Subtitle Container */}
      <div 
        className="absolute left-1/2 top-[68%] z-20 w-[62%] transform -translate-x-1/2 -translate-y-1/2"
        style={{
          transform: 'translate(-50%, -50%) perspective(1000px) rotateX(5deg)',
        }}
      >
        <div className="text-center">
          <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-none text-white">
            {title}
          </h1>
          <p className="mt-2 text-sm sm:text-base md:text-lg lg:text-xl font-light tracking-wide text-white/90">
            {subtitle}
          </p>
        </div>
      </div>

      {/* Scroll Indicator */}
      {showScroll && (
        <div className="absolute bottom-4 sm:bottom-6 left-1/2 z-20 -translate-x-1/2 animate-bounce">
          <ArrowDown className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
        </div>
      )}
    </section>
  );
}