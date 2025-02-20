import { useEffect, useState } from "react";

const Hero = () => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
  }, []);

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200">
      {/* Background blur effect */}
      <div className="absolute inset-0 bg-white/30 backdrop-blur-md"></div>
      
      {/* Content container */}
      <div className="relative max-w-7xl mx-auto px-4 pt-24 pb-12 flex flex-col items-center justify-center min-h-screen">
        {/* Laptop container */}
        <div className={`w-full max-w-3xl transition-all duration-1000 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="relative w-full aspect-[16/10] bg-gray-900 rounded-lg shadow-2xl overflow-hidden">
            <img 
              src="/attached_assets/laptop image_fixed.jpg" 
              alt="Laptop Display"
              className="w-full h-full object-cover"
            />
            {/* Content overlay */}
            <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Hello, I'm Prateek H
              </h1>
              <p className="text-lg md:text-xl opacity-90">
                Welcome to my Creative Playground
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
