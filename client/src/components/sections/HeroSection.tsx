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
    <section className="relative min-h-[400px] xs:min-h-[450px] sm:min-h-[500px] h-[95vh] sm:h-[92vh] md:h-[88vh] lg:h-[85vh] xl:h-[82vh] 2xl:h-[78vh] w-full overflow-hidden">
      {/* SVG Mask Definition */}
      <svg width="0" height="0" className="absolute">
        <defs>
          <clipPath id="laptop-screen-mask" clipPathUnits="objectBoundingBox">
            <path d="M0.125,0.16 H0.875 Q0.89,0.16 0.89,0.175 V0.825 Q0.89,0.84 0.875,0.84 H0.125 Q0.11,0.84 0.11,0.825 V0.175 Q0.11,0.16 0.125,0.16 Z" />
          </clipPath>
        </defs>
      </svg>

      {/* Main Frame - Laptop Screen Background */}
      <div className="absolute inset-0 -z-10">
        <img
          src="/laptop-bg.jpg"
          alt="Laptop Frame"
          className="h-full w-full object-contain md:object-cover"
        />
      </div>

      {/* Video Container */}
      <div 
        className="absolute z-10"
        style={{
          top: '8.5%',
          left: '14.2%',
          width: '71.6%',
          height: '72%',
          clipPath: 'url(#laptop-screen-mask)',
          backgroundColor: '#000',
        }}
      >
        {!videoError && (
          <video
            autoPlay
            muted
            loop
            playsInline
            onError={() => setVideoError(true)}
            className="h-full w-full object-cover"
          >
            <source src={videoUrl} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        )}
      </div>

      {/* Dark overlay for better text contrast */}
      <div className="absolute inset-0 z-20 bg-gradient-to-b from-black/20 to-black/40" />

      {/* Title and Subtitle Container */}
      <div 
        className="absolute z-30"
        style={{
          top: 'calc(8.5% + 72%)',
          left: '14.2%',
          width: '71.6%',
          transform: 'translateY(-120%)',
        }}
      >
        <div className="text-center">
          <h1 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-none text-white">
            {title}
          </h1>
          <p className="mt-2 text-xs xs:text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl font-light tracking-wide text-white/90">
            {subtitle}
          </p>
        </div>
      </div>

      {/* Scroll Indicator */}
      {showScroll && (
        <div className="absolute bottom-2 xs:bottom-3 sm:bottom-4 md:bottom-6 lg:bottom-8 left-1/2 z-40 -translate-x-1/2 animate-bounce">
          <ArrowDown className="h-4 w-4 xs:h-5 xs:w-5 sm:h-6 sm:w-6 text-white" />
        </div>
      )}
    </section>
  );
}