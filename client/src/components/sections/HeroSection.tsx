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
    <section className="relative min-h-screen w-full overflow-hidden bg-black">
      {/* Background laptop frame */}
      <div className="absolute inset-0">
        <img
          src="/laptop image_fixed.jpg"
          alt="Laptop Frame"
          className="h-full w-full object-cover opacity-80"
        />
      </div>

      {/* Video container positioned within laptop screen */}
      <div 
        className="absolute left-1/2 top-1/2 w-[60%] -translate-x-1/2 -translate-y-[58%]"
        style={{
          aspectRatio: '16/10',
          transform: 'translate(-50%, -58%) perspective(1000px) rotateX(5deg)',
        }}
      >
        <video
          autoPlay
          muted
          loop
          playsInline
          className="h-full w-full object-cover rounded-lg"
        >
          <source src={videoUrl} type="video/mp4" />
        </video>
      </div>

      {/* Stats */}
      <div className="absolute right-8 top-8 flex gap-8">
        {stats.map((stat, index) => (
          <div key={index} className="text-right">
            <div className="text-4xl font-bold text-white">{stat.value}</div>
            <div className="text-sm text-white/70">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Content */}
      <div className="relative flex min-h-screen items-end justify-center pb-32">
        <div className="text-center">
          <h1 className="mb-4 text-[120px] font-bold leading-none text-white">{title}</h1>
          <p className="text-xl text-white/70">{subtitle}</p>
        </div>
      </div>

      {/* Scroll Indicator */}
      {showScroll && (
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <ArrowDown className="h-6 w-6 text-white" />
        </div>
      )}
    </section>
  );
}