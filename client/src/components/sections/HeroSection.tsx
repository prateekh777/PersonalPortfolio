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
    <section className="relative h-screen max-h-[1080px] w-full overflow-hidden">
      {/* Main Frame - Laptop Screen Background */}
      <div className="absolute inset-0 -z-10">
        <img
          src="/laptop-bg.jpg"
          alt="Laptop Frame"
          className="h-full w-full object-contain"
        />
      </div>

      {/* Content Container - maintains aspect ratio and positioning */}
      <div className="absolute left-1/2 top-[54%] w-[45%] sm:w-[50%] md:w-[45%] lg:w-[40%] -translate-x-1/2 -translate-y-1/2">
        {/* Video Container */}
        <div className="relative w-full aspect-video overflow-hidden">
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

        {/* Text Container */}
        <div className="mt-4 text-center">
          <h1 className="text-xl xs:text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white">
            {title}
          </h1>
          <p className="mt-1 text-xs xs:text-sm sm:text-base md:text-lg lg:text-xl font-light tracking-wide text-white/90">
            {subtitle}
          </p>
        </div>
      </div>

      {/* Dark overlay for better text contrast */}
      <div className="absolute inset-0 z-10 bg-gradient-to-b from-black/20 to-black/40 sm:from-black/15 sm:to-black/35 lg:from-black/10 lg:to-black/30 aspect-[16/9]" />

      {/* Scroll Indicator */}
      {showScroll && (
        <div className="absolute bottom-2 xs:bottom-3 sm:bottom-4 md:bottom-6 lg:bottom-8 left-1/2 z-20 -translate-x-1/2 animate-bounce">
          <ArrowDown className="h-4 w-4 xs:h-5 xs:w-5 sm:h-6 sm:w-6 text-white" />
        </div>
      )}
    </section>
  );
}