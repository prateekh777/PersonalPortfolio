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
  // Scroll indicator visibility
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
      {/* Video Background */}
      <div className="absolute inset-0">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="h-full w-full object-cover"
        >
          <source src={videoUrl} type="video/mp4" />
        </video>
        {/* Overlay */}
        <div className="absolute inset-0 bg-background/60 backdrop-blur-sm" />
      </div>

      {/* Stats */}
      <div className="absolute right-8 top-8 flex gap-8">
        {stats.map((stat, index) => (
          <div key={index} className="text-right">
            <div className="text-4xl font-bold">{stat.value}</div>
            <div className="text-sm text-muted-foreground">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Content */}
      <div className="relative flex h-full items-center justify-center">
        <div className="text-center">
          <h1 className="mb-4 text-[120px] font-bold leading-none">{title}</h1>
          <p className="text-xl text-muted-foreground">{subtitle}</p>
        </div>
      </div>

      {/* Scroll Indicator */}
      {showScroll && (
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <ArrowDown className="h-6 w-6" />
        </div>
      )}
    </section>
  );
}
