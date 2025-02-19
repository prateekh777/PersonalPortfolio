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
    <section className="relative min-h-[80vh] w-full overflow-hidden">
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

      {/* Main Frame Container */}
      <div className="relative flex h-full min-h-[500px] w-full flex-col items-center justify-center">
        {/* Laptop Background */}
        <div className="absolute inset-0 -z-10">
          <img
            src="/laptop-bg.jpg"
            alt="Laptop Frame"
            className="h-full w-full object-contain md:object-cover"
          />
        </div>

        {/* Screen Content Container */}
        <div className="relative w-full">
          {/* Video Container with SVG Mask */}
          <div 
            className="relative mx-auto"
            style={{
              width: '71.6%',
              paddingTop: '51.552%', // 72% of 71.6% to maintain aspect ratio
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
          </div>

          {/* Content Container */}
          <div className="mx-auto mt-4 flex w-[71.6%] flex-col items-center space-y-4 px-4">
            <div className="title-container text-center">
              <h1 
                className="font-bold leading-tight text-white"
                style={{
                  fontSize: 'clamp(1.5rem, 5vw, 3.2rem)',
                }}
              >
                {title}
              </h1>
            </div>
            <div className="subtitle-container text-center" style={{ marginBottom: 'max(5%, 20px)' }}>
              <p 
                className="font-light tracking-wide text-white/90"
                style={{
                  fontSize: 'clamp(0.875rem, 2vw, 1.25rem)',
                }}
              >
                {subtitle}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      {showScroll && (
        <div 
          className="absolute left-1/2 z-20 -translate-x-1/2 animate-bounce"
          style={{
            bottom: 'min(3vh, 30px)',
          }}
        >
          <ArrowDown className="h-6 w-6 text-white" />
        </div>
      )}
    </section>
  );
}