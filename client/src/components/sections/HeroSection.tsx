import { useState, useEffect } from "react";
import { ArrowDown } from "lucide-react";

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

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section className="relative min-h-[400px] xs:min-h-[450px] sm:min-h-[500px] h-[95vh] sm:h-[92vh] md:h-[88vh] lg:h-[85vh] xl:h-[82vh] 2xl:h-[78vh] w-full overflow-hidden">
      {/* Main Frame - Laptop Screen Background */}
      <div className="absolute inset-0 -z-10 flex items-center justify-center backdrop-blur-sm">
        <img
          src="/laptop-bg.jpg"
          alt="Laptop Frame"
          className="opacity-90"
        />
      </div>

      {/* Video Frame - 16:9 aspect ratio, aligned to top of main frame */}
      <div
        className="relative left-1/2 top-1/2 z-0 w-[45%] -translate-x-1/2 -translate-y-[60%] shadow-xl"
        style={{
          aspectRatio: "16/9",
          transform: "translate(-50%, -60%) perspective(1000px) rotateX(5deg)",
        }}
      >
        {!videoError && (
          <video
            autoPlay
            muted
            loop
            playsInline
            onError={() => setVideoError(true)}
            className="h-full w-full rounded-lg object-cover"
          >
            <source src={videoUrl} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        )}
      </div>

      {/* Overlay for better text contrast */}
      <div className="absolute inset-0 z-10 bg-gradient-to-b from-transparent to-[#222222]/15 backdrop-blur-[1px]" />

      {/* Title and Subtitle Container */}
      <div
        className="absolute left-1/2 z-20 w-[65%]"
        style={{
          top: "calc(25% + 16.875vw - 10px)",
          transform: "translate(-50%, -50%) perspective(1000px) rotateX(5deg)",
        }}
      >
        <div className="text-center">
          <h1 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-none text-[#FFFFFF] drop-shadow-md">
            {title}
          </h1>
          <p className="mt-2 text-xs xs:text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl font-light tracking-wide text-[#F8F8F8] drop-shadow-md">
            {subtitle}
          </p>
        </div>
      </div>

      {/* Scroll Indicator */}
      {showScroll && (
        <div className="absolute bottom-2 xs:bottom-3 sm:bottom-4 md:bottom-6 lg:bottom-8 left-1/2 z-20 -translate-x-1/2 animate-bounce">
          <ArrowDown className="h-4 w-4 xs:h-5 xs:w-5 sm:h-6 sm:w-6 text-[#FFFFFF] drop-shadow-md" />
        </div>
      )}
    </section>
  );
}
