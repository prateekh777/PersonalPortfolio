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
    <section className="relative min-h-screen w-full overflow-hidden">
      {/* SVG Mask Definition */}
      <svg width="0" height="0" className="absolute">
        <defs>
          <mask id="laptop-screen-mask" maskUnits="userSpaceOnUse">
            <path
              d="M85,91 L725,91 Q740,91 740,106 L740,456 Q740,471 725,471 L85,471 Q70,471 70,456 L70,106 Q70,91 85,91 Z"
              fill="white"
            />
          </mask>
        </defs>
      </svg>

      {/* Main Container */}
      <div className="relative mx-auto flex min-h-[600px] w-full items-center justify-center px-4 py-12">
        {/* Laptop Frame Container */}
        <div className="relative w-full max-w-[1200px]">
          <div className="relative" style={{ paddingTop: '56.25%' }}> {/* 16:9 aspect ratio */}
            {/* Laptop Background Image */}
            <img
              src="/laptop-bg.jpg"
              alt="Laptop Frame"
              className="absolute inset-0 h-full w-full object-contain"
            />

            {/* Screen Content Container */}
            <div 
              className="absolute"
              style={{
                top: '8.5%',
                left: '14.2%',
                width: '71.6%',
                height: '72%',
              }}
            >
              {/* Video with Mask */}
              <div 
                className="relative h-full w-full overflow-hidden"
                style={{
                  mask: 'url(#laptop-screen-mask)',
                  WebkitMask: 'url(#laptop-screen-mask)',
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

                {/* Content Overlay */}
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/30">
                  <h1 
                    className="text-center font-bold text-white"
                    style={{ fontSize: 'clamp(1.5rem, 4vw, 2.5rem)' }}
                  >
                    {title}
                  </h1>
                  <p 
                    className="mt-2 text-center font-light text-white/90"
                    style={{ fontSize: 'clamp(0.875rem, 1.5vw, 1.125rem)' }}
                  >
                    {subtitle}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      {showScroll && (
        <div className="absolute bottom-8 left-1/2 z-20 -translate-x-1/2 animate-bounce">
          <ArrowDown className="h-6 w-6 text-white" />
        </div>
      )}
    </section>
  );
}