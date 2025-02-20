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
    <section className="relative min-h-[calc(100vh-4rem)] w-full overflow-hidden">
      {/* Background with blur effect */}
      <div className="absolute inset-0 bg-gradient-to-b from-background/80 to-background/40 backdrop-blur-[2px]" />

      {/* Main content container */}
      <div className="relative z-10 mx-auto flex h-full max-w-7xl flex-col items-center justify-center px-4">
        {/* Laptop frame container */}
        <div className="relative w-full max-w-4xl">
          <img
            src="/laptop-bg.jpg"
            alt="Laptop Frame"
            className="w-full"
          />

          {/* Video container with proper positioning */}
          <div className="absolute left-[21%] top-[6%] h-[67%] w-[58%]">
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
        </div>

        {/* Text content */}
        <div className="mt-8 text-center">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
            {title}
          </h1>
          <p className="mt-4 text-lg text-muted-foreground sm:text-xl">
            {subtitle}
          </p>
        </div>

        {/* Scroll indicator */}
        {showScroll && (
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
            <ArrowDown className="h-6 w-6" />
          </div>
        )}
      </div>
    </section>
  );
}