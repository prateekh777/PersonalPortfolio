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

      {/* Main Container */}
      <div className="relative mx-auto flex h-screen max-h-[900px] w-full items-center justify-center px-4">
        {/* Laptop Frame Background */}
        <div className="absolute inset-0">
          <img
            src="/laptop-bg.jpg"
            alt="Laptop Frame"
            className="h-full w-full object-cover"
          />
        </div>

        {/* Content Container */}
        <div className="relative w-full max-w-[1200px]">
          {/* Screen Content Area */}
          <div className="relative mx-auto" style={{ width: '71.6%' }}>
            {/* Video Container */}
            <div 
              className="relative overflow-hidden"
              style={{
                paddingTop: '56.25%',
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
                  className="absolute inset-0 h-full w-full object-cover"
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

      {/* Scroll Indicator */}
      {showScroll && (
        <div className="absolute bottom-8 left-1/2 z-20 -translate-x-1/2 animate-bounce">
          <ArrowDown className="h-6 w-6 text-white" />
        </div>
      )}
    </section>
  );
}