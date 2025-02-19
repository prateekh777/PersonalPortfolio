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
    <section className="relative h-[100vh] w-full overflow-hidden bg-background">
      {/* Background laptop frame - absolute full coverage */}
      <div className="absolute inset-0">
        <div className="relative h-full w-full">
          <img
            src="/laptop-bg.jpg"
            alt="Laptop Frame"
            className="h-full w-full object-cover"
            style={{
              objectPosition: 'center center',
              minHeight: '100%',
              minWidth: '100%'
            }}
          />
        </div>
      </div>

      {/* Stats Overlay */}
      <div className="absolute right-4 top-4 z-20 flex flex-wrap gap-4 sm:right-6 sm:top-6 md:right-8 md:top-8 md:gap-8">
        {stats.map((stat, index) => (
          <div key={index} className="text-right">
            <div className="text-2xl font-bold text-white sm:text-3xl md:text-4xl">{stat.value}</div>
            <div className="text-xs text-white/70 sm:text-sm">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Content Overlay */}
      <div className="absolute inset-0 z-10 flex flex-col items-center justify-end pb-16 sm:pb-24 md:pb-32">
        <div className="text-center">
          <h1 className="mb-4 text-5xl font-bold leading-none text-white sm:text-7xl md:text-[90px] lg:text-[120px]">{title}</h1>
          <p className="text-lg text-white/70 sm:text-xl">{subtitle}</p>
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