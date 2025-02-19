import { useState, useEffect } from 'react';
import { ArrowDown } from 'lucide-react';

interface Stat {
  label: string;
  value: string;
}

interface HeroSectionProps {
  title: string;
  subtitle: string;
  videoUrl: string;
  stats: Stat[];
}

export function HeroSection({ title, subtitle, videoUrl, stats }: HeroSectionProps) {
  const [showScroll, setShowScroll] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      setShowScroll(window.scrollY < 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section className="relative min-h-screen w-full overflow-hidden">
      {/* Background laptop frame - full screen */}
      <div className="absolute inset-0 z-0">
        <img
          src="/laptop-bg.jpg"
          alt="Laptop Frame"
          className="h-screen w-full object-cover"
        />
      </div>

      {/* Video container positioned within laptop screen */}
      <div 
        className="absolute left-1/2 top-1/2 w-[56%] -translate-x-1/2 -translate-y-[58%] transform-gpu"
        style={{
          aspectRatio: '16/9',
          perspective: '1000px',
          transform: 'translate(-50%, -58%) rotateX(5deg)',
        }}
      >
        <video
          autoPlay
          muted
          loop
          playsInline
          className="h-full w-full rounded-lg object-cover"
        >
          <source src={videoUrl} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>

      {/* Stats */}
      <div className="absolute right-4 top-4 z-20 flex flex-wrap gap-4 sm:right-6 sm:top-6 md:right-8 md:top-8 md:gap-8">
        {stats.map((stat, index) => (
          <div key={index} className="text-right">
            <div className="text-2xl font-bold text-white sm:text-3xl md:text-4xl">{stat.value}</div>
            <div className="text-xs text-white/70 sm:text-sm">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Content */}
      <div className="relative z-20 flex min-h-screen items-end justify-center pb-16 sm:pb-24 md:pb-32">
        <div className="text-center">
          <h1 className="mb-4 text-5xl font-bold leading-none text-white sm:text-7xl md:text-[90px] lg:text-[120px]">{title}</h1>
          <p className="text-lg text-white/70 sm:text-xl">{subtitle}</p>
        </div>
      </div>

      {/* Scroll Indicator */}
      {showScroll && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 animate-bounce z-20 sm:bottom-6 md:bottom-8">
          <ArrowDown className="h-5 w-5 text-white sm:h-6 sm:w-6" />
        </div>
      )}
    </section>
  );
}