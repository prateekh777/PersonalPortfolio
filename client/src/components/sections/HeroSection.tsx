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
      <svg className="absolute -z-50 h-0 w-0">
        <defs>
          <mask id="laptop-screen-mask">
            <path
              d="M100,91 L710,91 Q725,91 725,106 L725,456 Q725,471 710,471 L100,471 Q85,471 85,456 L85,106 Q85,91 100,91 Z"
              fill="white"
              transform="scale(0.00142857)"
            />
          </mask>
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

      {/* Video Container with SVG Mask */}
      <div 
        className="absolute"
        style={{
          top: '8.5%',
          left: '14.2%',
          width: '71.6%',
          height: '72%',
          maskImage: 'url(#laptop-screen-mask)',
          WebkitMaskImage: 'url(#laptop-screen-mask)',
        }}
      >
        {!videoError && (
          <video
            autoPlay
            muted
            loop
            playsInline
            onError={() => setVideoError(true)}
            className="h-full w-full object-cover rounded-lg"
          >
            <source src={videoUrl} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        )}
      </div>

      {/* Content Container */}
      <div 
        className="absolute left-1/2 z-20 w-[71.6%]"
        style={{
          top: 'calc(8.5% + 72%)',
          transform: 'translateX(-50%)',
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
        <div className="absolute bottom-2 xs:bottom-3 sm:bottom-4 md:bottom-6 lg:bottom-8 left-1/2 z-20 -translate-x-1/2 animate-bounce">
          <ArrowDown className="h-4 w-4 xs:h-5 xs:w-5 sm:h-6 sm:w-6 text-white" />
        </div>
      )}
    </section>
  );
}