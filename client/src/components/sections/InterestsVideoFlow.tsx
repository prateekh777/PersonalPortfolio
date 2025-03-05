import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export function InterestsVideoFlow() {
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const [activeSection, setActiveSection] = useState<'spirituality' | 'science' | 'startups' | null>(null);
  const [videoError, setVideoError] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsSmallScreen(window.innerWidth < 768);
    };
    
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    
    return () => {
      window.removeEventListener('resize', checkScreenSize);
    };
  }, []);

  // Section content
  const sections = {
    spirituality: {
      title: "Spirituality",
      description: "Gives purpose and strength, forming the foundation of authentic growth. It's the inner world where consciousness expands and resilience is found.",
      color: "rgba(142, 68, 173, 0.15)",
      textColor: "rgb(122, 48, 153)",
      borderColor: "rgba(142, 68, 173, 0.3)"
    },
    science: {
      title: "Science",
      description: "Corroborates the strength, validates it and supports it. Through analysis and discovery, inner wisdom finds its outer expression.",
      color: "rgba(52, 152, 219, 0.15)",
      textColor: "rgb(32, 132, 199)",
      borderColor: "rgba(52, 152, 219, 0.3)"
    },
    startups: {
      title: "Impact Through Startups",
      description: "The actualization of the deep synthesis of Science and Spirituality leads to the expression of beauty. When inner and outer worlds combine, we produce meaningful impact.",
      color: "rgba(46, 204, 113, 0.15)",
      textColor: "rgb(26, 184, 93)",
      borderColor: "rgba(46, 204, 113, 0.3)"
    }
  };

  // Mobile version
  if (isSmallScreen) {
    return (
      <div className="w-full py-6 px-4">
        <div className="relative w-full aspect-video mb-6 rounded-lg overflow-hidden">
          {/* Static gradient background fallback - always visible */}
          <div className="absolute inset-0 bg-gradient-to-br from-purple-900/30 via-blue-900/30 to-green-900/30 z-0"></div>
          
          {/* Video with error handling */}
          {!videoError ? (
            <>
              <video 
                src="/videos/interests-flow.mp4" 
                autoPlay 
                loop 
                muted 
                playsInline
                className="w-full h-full object-cover z-10"
                onError={() => setVideoError(true)}
              />
            </>
          ) : (
            <div className="absolute inset-0 z-20 flex items-center justify-center bg-black/20">
              <div className="text-center text-gray-200 p-2 rounded-lg">
                <p className="text-xs">Visualization in static mode</p>
              </div>
            </div>
          )}
        </div>

        <div className="space-y-4">
          {Object.entries(sections).map(([key, section]) => (
            <motion.div
              key={key}
              className="rounded-lg p-4 transition-all cursor-pointer"
              style={{ 
                backgroundColor: section.color,
                borderLeft: `3px solid ${section.borderColor}`
              }}
              onClick={() => setActiveSection(activeSection === key as any ? null : key as any)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <h3 className="font-semibold" style={{ color: section.textColor }}>{section.title}</h3>
              
              <AnimatePresence>
                {activeSection === key && (
                  <motion.p
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="text-sm mt-2 overflow-hidden"
                  >
                    {section.description}
                  </motion.p>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    );
  }

  // Desktop version with larger video and flowing text overlays
  return (
    <div className="w-full h-[580px] relative overflow-hidden rounded-xl">
      {/* Main background with optimized video loading */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-black/10 z-10" />
        
        {/* Static gradient background fallback - always visible */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-blue-900/20 to-green-900/20"></div>
        
        {/* Video with error handling */}
        {!videoError ? (
          <video 
            src="/videos/interests-flow.mp4" 
            autoPlay 
            loop 
            muted 
            playsInline
            className="w-full h-full object-cover"
            onError={() => setVideoError(true)}
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center text-gray-400 bg-black/20 p-4 rounded-lg backdrop-blur-sm">
              <p>Video visualization unavailable</p>
              <p className="text-xs mt-1">Interactive panels still available</p>
            </div>
          </div>
        )}
      </div>
      
      {/* Title Overlay */}
      <motion.div 
        className="absolute top-4 left-1/2 transform -translate-x-1/2 z-20 text-center"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7 }}
      >
        <h2 className="text-white text-2xl font-bold mb-1">The Synthesis of Inner and Outer Worlds</h2>
        <p className="text-white/80 text-sm">Click on each element to explore the connection</p>
      </motion.div>
      
      {/* Interactive panels */}
      <div className="absolute inset-0 z-10 flex items-center justify-center">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 w-full max-w-screen-lg px-4">
          {/* Spirituality */}
          <motion.div
            className="bg-white/90 backdrop-blur-sm rounded-xl p-5 shadow-lg cursor-pointer"
            style={{ 
              borderTop: activeSection === 'spirituality' ? '4px solid rgb(142, 68, 173)' : '4px solid transparent',
              transform: activeSection === 'spirituality' ? 'translateY(-8px)' : 'translateY(0)'
            }}
            whileHover={{ y: -5 }}
            onClick={() => setActiveSection(activeSection === 'spirituality' ? null : 'spirituality')}
            transition={{ duration: 0.3 }}
          >
            <h3 className="text-xl font-bold mb-2" style={{ color: 'rgb(142, 68, 173)' }}>Spirituality</h3>
            <p className="text-sm text-gray-700">
              Gives purpose and <span className="font-semibold">inner strength</span>, forming the foundation of authentic growth. 
              It's the inner world where consciousness expands and resilience is found.
            </p>
            
            {/* Flow indicator */}
            <motion.div 
              className="w-full flex justify-end mt-3" 
              animate={{ 
                x: activeSection === 'spirituality' ? [0, 10, 0] : 0
              }}
              transition={{ repeat: activeSection === 'spirituality' ? Infinity : 0, duration: 1.5 }}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="rgb(142, 68, 173)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </motion.div>
          </motion.div>
          
          {/* Science */}
          <motion.div
            className="bg-white/90 backdrop-blur-sm rounded-xl p-5 shadow-lg cursor-pointer"
            style={{ 
              borderTop: activeSection === 'science' ? '4px solid rgb(52, 152, 219)' : '4px solid transparent',
              transform: activeSection === 'science' ? 'translateY(-8px)' : 'translateY(0)'
            }}
            whileHover={{ y: -5 }}
            onClick={() => setActiveSection(activeSection === 'science' ? null : 'science')}
            transition={{ duration: 0.3 }}
          >
            <h3 className="text-xl font-bold mb-2" style={{ color: 'rgb(52, 152, 219)' }}>Science</h3>
            <p className="text-sm text-gray-700">
              Corroborates the strength, <span className="font-semibold">validates it and supports it</span>. 
              Through analysis and discovery, inner wisdom finds its outer expression.
            </p>
            
            {/* Flow indicator */}
            <motion.div 
              className="w-full flex justify-end mt-3" 
              animate={{ 
                x: activeSection === 'science' ? [0, 10, 0] : 0
              }}
              transition={{ repeat: activeSection === 'science' ? Infinity : 0, duration: 1.5 }}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="rgb(52, 152, 219)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </motion.div>
          </motion.div>
          
          {/* Startups/Impact */}
          <motion.div
            className="bg-white/90 backdrop-blur-sm rounded-xl p-5 shadow-lg cursor-pointer"
            style={{ 
              borderTop: activeSection === 'startups' ? '4px solid rgb(46, 204, 113)' : '4px solid transparent',
              transform: activeSection === 'startups' ? 'translateY(-8px)' : 'translateY(0)'
            }}
            whileHover={{ y: -5 }}
            onClick={() => setActiveSection(activeSection === 'startups' ? null : 'startups')}
            transition={{ duration: 0.3 }}
          >
            <h3 className="text-xl font-bold mb-2" style={{ color: 'rgb(46, 204, 113)' }}>Impact Through Startups</h3>
            <p className="text-sm text-gray-700">
              The <span className="font-semibold">actualization of the deep synthesis</span> of Science and Spirituality 
              leads to the expression of beauty. When inner and outer worlds combine, we produce meaningful impact.
            </p>
            
            {/* Final result indicator */}
            <motion.div 
              className="w-full flex justify-center mt-3" 
              animate={{ scale: activeSection === 'startups' ? [1, 1.1, 1] : 1 }}
              transition={{ repeat: activeSection === 'startups' ? Infinity : 0, duration: 1.5 }}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" fill="rgb(46, 204, 113)" fillOpacity="0.5" stroke="rgb(46, 204, 113)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </motion.div>
          </motion.div>
        </div>
      </div>
      
      {/* Flow animation overlays */}
      <AnimatePresence>
        {activeSection === 'spirituality' && (
          <motion.div 
            className="absolute z-20 inset-0 pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="h-full w-full flex items-center justify-center">
              <motion.div
                className="absolute w-40 h-40 rounded-full"
                style={{ 
                  background: 'radial-gradient(circle, rgba(142,68,173,0.3) 0%, rgba(142,68,173,0) 70%)',
                }}
                animate={{
                  scale: [1, 2, 1],
                  opacity: [0.7, 0.1, 0.7]
                }}
                transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
              />
            </div>
          </motion.div>
        )}
        
        {activeSection === 'science' && (
          <motion.div 
            className="absolute z-20 inset-0 pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="h-full w-full flex items-center justify-center">
              <motion.div
                className="absolute w-40 h-40 rounded-full"
                style={{ 
                  background: 'radial-gradient(circle, rgba(52,152,219,0.3) 0%, rgba(52,152,219,0) 70%)',
                }}
                animate={{
                  scale: [1, 2, 1],
                  opacity: [0.7, 0.1, 0.7]
                }}
                transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
              />
            </div>
          </motion.div>
        )}
        
        {activeSection === 'startups' && (
          <motion.div 
            className="absolute z-20 inset-0 pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="h-full w-full flex items-center justify-center">
              <motion.div
                className="absolute w-60 h-60 rounded-full"
                style={{ 
                  background: 'radial-gradient(circle, rgba(46,204,113,0.3) 0%, rgba(46,204,113,0) 70%)',
                }}
                animate={{
                  scale: [1, 1.7, 1],
                  opacity: [0.7, 0.2, 0.7]
                }}
                transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
              />
              <motion.div
                className="absolute w-20 h-20 rounded-full"
                style={{ 
                  background: 'radial-gradient(circle, rgba(46,204,113,0.5) 0%, rgba(46,204,113,0) 70%)',
                }}
                animate={{
                  scale: [1, 3, 1],
                  opacity: [0.8, 0.1, 0.8]
                }}
                transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Footer text */}
      <div className="absolute bottom-4 left-0 right-0 text-center z-20">
        <p className="text-white/80 text-sm italic">
          "The synthesis of inner wisdom and scientific approach creates meaningful impact through entrepreneurship."
        </p>
      </div>
    </div>
  );
}