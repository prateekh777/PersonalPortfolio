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
    <section className="relative h-screen w-full overflow-hidden">
      {/* Main Frame - Laptop Screen Background */}
      <div className="absolute inset-0 -z-10 flex items-center justify-center">
        <img
          src="/laptop-bg.jpg"
          alt="Laptop Frame"
          className="h-full w-full object-contain md:object-cover"
        />
      </div>

      {/* Video Frame - 16:9 aspect ratio, aligned to top of main frame */}
      <div 
        className="absolute left-1/2 top-1/2 z-0 w-[58%] -translate-x-1/2 -translate-y-[60%]"
        style={{
          aspectRatio: '16/9',
          transform: 'translate(-50%, -60%) perspective(1000px) rotateX(5deg)',
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
      <div className="absolute inset-0 z-10 bg-gradient-to-b from-black/40 to-black/60" />

      {/* Title and Subtitle Container - Positioned between video and bottom of laptop */}
      <div 
        className="absolute left-1/2 z-20 w-[58%]"
        style={{
          top: 'calc(50% + 16.875vw - 10px)', // Position after video, lifted up by 10px
          transform: 'translate(-50%, -50%) perspective(1000px) rotateX(5deg)',
        }}
      >
        <div className="text-center flex flex-col gap-2">
          <h1 className="whitespace-nowrap text-[min(5vw,64px)] font-bold leading-none text-white">
            {title}
          </h1>
          <p className="whitespace-nowrap text-[min(1.5vw,20px)] font-light tracking-wide text-white/90">
            {subtitle}
          </p>
        </div>
      </div>

      {/* Scroll Indicator */}
      {showScroll && (
        <div className="absolute bottom-4 left-1/2 z-20 -translate-x-1/2 animate-bounce sm:bottom-6 md:bottom-8">
          <ArrowDown className="h-5 w-5 text-white sm:h-6 sm:w-6" />
        </div>
      )}
    </section>
  );
}