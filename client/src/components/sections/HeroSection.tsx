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
    <section className="relative h-screen w-full overflow-hidden">
      {/* Dark overlay for better text contrast */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-black/60" />

      {/* Laptop background image */}
      <div className="absolute inset-0 -z-10">
        <img
          src="/laptop-bg.jpg"
          alt="Laptop Frame"
          className="h-full w-full object-cover"
          style={{
            objectFit: 'cover',
            width: '100vw',
            height: '100vh'
          }}
        />
      </div>

      {/* Stats Overlay */}
      <div className="absolute right-4 top-20 z-20 flex flex-wrap gap-4 sm:right-6 sm:top-24 md:right-8 md:gap-8">
        {stats.map((stat, index) => (
          <div key={index} className="text-right">
            <div className="text-2xl font-bold text-white sm:text-3xl md:text-4xl">
              {stat.value}
            </div>
            <div className="text-xs text-white/70 sm:text-sm">
              {stat.label}
            </div>
          </div>
        ))}
      </div>

      {/* Main Content */}
      <div className="absolute inset-0 z-10 flex flex-col items-center justify-end pb-16 pt-20 sm:pb-24 md:pb-32">
        <div className="container mx-auto text-center">
          <h1 className="mb-4 text-5xl font-bold leading-none text-white sm:text-7xl md:text-[90px] lg:text-[120px]">
            {title}
          </h1>
          <p className="text-lg text-white/70 sm:text-xl">
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