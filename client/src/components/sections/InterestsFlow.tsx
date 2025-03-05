import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export function InterestsFlow() {
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const [activeState, setActiveState] = useState<'inactive' | 'flowing' | 'pulse'>('inactive');
  const [hoverElement, setHoverElement] = useState<'spirituality' | 'science' | 'startups' | null>(null);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsSmallScreen(window.innerWidth < 768);
    };
    
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    
    // Set initial animation state after mounting
    const timer = setTimeout(() => {
      setActiveState('flowing');
    }, 800);
    
    return () => {
      window.removeEventListener('resize', checkScreenSize);
      clearTimeout(timer);
    };
  }, []);

  // Start the flow animation cycle
  useEffect(() => {
    if (activeState === 'flowing') {
      const timer = setTimeout(() => {
        setActiveState('pulse');
      }, 3000);
      
      return () => clearTimeout(timer);
    }
    
    if (activeState === 'pulse') {
      const timer = setTimeout(() => {
        setActiveState('flowing');
      }, 2000);
      
      return () => clearTimeout(timer);
    }
  }, [activeState]);

  // Mobile version
  if (isSmallScreen) {
    return (
      <div className="w-full space-y-6 px-4 py-6">
        <div className="relative bg-gray-50 rounded-xl p-4 overflow-hidden">
          <div className="text-center text-sm text-gray-500 mb-4">
            How spirituality and science combine to create impact
          </div>
          
          <div className="flex flex-col space-y-4">
            {/* Spirituality */}
            <motion.div
              className="bg-purple-100 rounded-lg p-4 z-10"
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex items-center">
                <div className="w-10 h-10 bg-purple-600 rounded-full flex items-center justify-center text-white">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 2C8.13 2 5 5.13 5 9C5 14.25 12 22 12 22C12 22 19 14.25 19 9C19 5.13 15.87 2 12 2Z" fill="currentColor"/>
                  </svg>
                </div>
                <h3 className="ml-3 text-lg font-medium">Spirituality</h3>
              </div>
              <p className="mt-2 text-sm">Provides purpose and inner strength, forming the foundation of authentic growth.</p>
              
              {/* Animated downward arrow */}
              <motion.div 
                className="w-full flex justify-center mt-2"
                animate={{ y: [0, 5, 0] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 4L12 20M12 20L18 14M12 20L6 14" stroke="#A78BFA" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </motion.div>
            </motion.div>
            
            {/* Science */}
            <motion.div
              className="bg-blue-100 rounded-lg p-4 z-10"
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="flex items-center">
                <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M13 6H11V8.33L8.43 9.6L7.5 8.09L5.7 9.12L6.64 10.63L4 11.94V14.06L6.64 15.37L5.7 16.88L7.5 17.91L8.43 16.4L11 17.67V20H13V17.67L15.57 16.4L16.5 17.91L18.3 16.88L17.36 15.37L20 14.06V11.94L17.36 10.63L18.3 9.12L16.5 8.09L15.57 9.6L13 8.33V6Z" fill="currentColor"/>
                  </svg>
                </div>
                <h3 className="ml-3 text-lg font-medium">Science</h3>
              </div>
              <p className="mt-2 text-sm">Validates and corroborates inner wisdom through analysis and discovery.</p>
              
              {/* Animated downward arrow */}
              <motion.div 
                className="w-full flex justify-center mt-2"
                animate={{ y: [0, 5, 0] }}
                transition={{ repeat: Infinity, duration: 1.5, delay: 0.3 }}
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 4L12 20M12 20L18 14M12 20L6 14" stroke="#60A5FA" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </motion.div>
            </motion.div>
            
            {/* Convergence point with ripple effect */}
            <motion.div
              className="relative h-16 flex justify-center items-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <motion.div
                className="absolute w-8 h-8 bg-gradient-to-r from-purple-300 to-blue-300 rounded-full"
                animate={{ 
                  scale: [1, 1.5, 1],
                  opacity: [0.7, 1, 0.7]
                }}
                transition={{ repeat: Infinity, duration: 2 }}
              />
              <motion.div
                className="absolute w-12 h-12 border-2 border-gray-300 rounded-full"
                animate={{ 
                  scale: [1, 2],
                  opacity: [0.3, 0]
                }}
                transition={{ repeat: Infinity, duration: 2, delay: 0.5 }}
              />
              <motion.div
                className="absolute w-16 h-16 border border-gray-200 rounded-full"
                animate={{ 
                  scale: [1, 2.5],
                  opacity: [0.2, 0]
                }}
                transition={{ repeat: Infinity, duration: 2, delay: 0.7 }}
              />
            </motion.div>
            
            {/* Startups/Impact */}
            <motion.div
              className="bg-green-100 rounded-lg p-4 z-10"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              <div className="flex items-center">
                <div className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center text-white">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M13.5 2L12 5L10.5 2H4L6 7H3L5 12H9V19C9 19.55 9.45 20 10 20H14C14.55 20 15 19.55 15 19V12H19L21 7H18L20 2H13.5Z" fill="currentColor"/>
                  </svg>
                </div>
                <h3 className="ml-3 text-lg font-medium">Impact</h3>
              </div>
              <p className="mt-2 text-sm">The synthesis of inner wisdom and scientific approach creates meaningful impact through entrepreneurship.</p>
              
              {/* Starburst effect */}
              <motion.div 
                className="w-full flex justify-center mt-2"
                animate={{ 
                  scale: [1, 1.2, 1],
                  rotate: [0, 5, 0, -5, 0]
                }}
                transition={{ repeat: Infinity, duration: 3 }}
              >
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2L14 8L20 8L15 12L17 18L12 14L7 18L9 12L4 8L10 8L12 2Z" fill="#4ADE80" />
                </svg>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    );
  }

  // Desktop version with more sophisticated animation
  return (
    <div className="w-full h-[500px] relative overflow-hidden py-2">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-50 to-white z-0"></div>
      
      {/* Flow Description */}
      <div className="absolute top-4 left-1/2 transform -translate-x-1/2 text-gray-500 text-sm z-20">
        Click on any element to see how they flow together
      </div>
      
      {/* Spirituality Node - Left */}
      <motion.div
        className="absolute top-1/3 left-[15%] w-36 h-36 rounded-full cursor-pointer shadow-lg z-10"
        style={{ 
          backgroundColor: 'rgba(142, 68, 173, 0.9)',
          boxShadow: hoverElement === 'spirituality' ? '0 0 30px rgba(142, 68, 173, 0.6)' : '0 0 15px rgba(142, 68, 173, 0.3)'
        }}
        whileHover={{ scale: 1.05 }}
        onHoverStart={() => setHoverElement('spirituality')}
        onHoverEnd={() => setHoverElement(null)}
        onClick={() => setActiveState(activeState === 'flowing' ? 'pulse' : 'flowing')}
      >
        <div className="w-full h-full flex flex-col items-center justify-center text-white p-3">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="mb-2">
            <path d="M12 2C8.13 2 5 5.13 5 9C5 14.25 12 22 12 22C12 22 19 14.25 19 9C19 5.13 15.87 2 12 2Z" fill="white"/>
            <circle cx="12" cy="9" r="2" fill="white" fillOpacity="0.6"/>
          </svg>
          <span className="text-sm font-semibold text-center">Spirituality</span>
          <span className="text-xs text-center mt-1 opacity-80">Inner Purpose</span>
        </div>
        
        {/* Energy waves emanating from spirituality */}
        <motion.div
          className="absolute -inset-3 rounded-full border-2 border-purple-300 z-0"
          animate={activeState === 'flowing' ? { 
            scale: [1, 1.3, 1.5],
            opacity: [0.7, 0.3, 0]
          } : { scale: 1, opacity: 0 }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeOut" }}
        />
        <motion.div
          className="absolute -inset-6 rounded-full border border-purple-200 z-0"
          animate={activeState === 'flowing' ? { 
            scale: [1, 1.4, 1.7],
            opacity: [0.5, 0.2, 0]
          } : { scale: 1, opacity: 0 }}
          transition={{ repeat: Infinity, duration: 2.5, ease: "easeOut", delay: 0.3 }}
        />
      </motion.div>
      
      {/* Science Node - Right */}
      <motion.div
        className="absolute top-1/3 right-[15%] w-36 h-36 rounded-full cursor-pointer shadow-lg z-10"
        style={{ 
          backgroundColor: 'rgba(52, 152, 219, 0.9)',
          boxShadow: hoverElement === 'science' ? '0 0 30px rgba(52, 152, 219, 0.6)' : '0 0 15px rgba(52, 152, 219, 0.3)'
        }}
        whileHover={{ scale: 1.05 }}
        onHoverStart={() => setHoverElement('science')}
        onHoverEnd={() => setHoverElement(null)}
        onClick={() => setActiveState(activeState === 'flowing' ? 'pulse' : 'flowing')}
      >
        <div className="w-full h-full flex flex-col items-center justify-center text-white p-3">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="mb-2">
            <path d="M13 6H11V8.33L8.43 9.6L7.5 8.09L5.7 9.12L6.64 10.63L4 11.94V14.06L6.64 15.37L5.7 16.88L7.5 17.91L8.43 16.4L11 17.67V20H13V17.67L15.57 16.4L16.5 17.91L18.3 16.88L17.36 15.37L20 14.06V11.94L17.36 10.63L18.3 9.12L16.5 8.09L15.57 9.6L13 8.33V6Z" fill="white"/>
            <circle cx="12" cy="13" r="2" fill="white" fillOpacity="0.6"/>
          </svg>
          <span className="text-sm font-semibold text-center">Science</span>
          <span className="text-xs text-center mt-1 opacity-80">Validation</span>
        </div>
        
        {/* Energy waves emanating from science */}
        <motion.div
          className="absolute -inset-3 rounded-full border-2 border-blue-300 z-0"
          animate={activeState === 'flowing' ? { 
            scale: [1, 1.3, 1.5],
            opacity: [0.7, 0.3, 0]
          } : { scale: 1, opacity: 0 }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeOut" }}
        />
        <motion.div
          className="absolute -inset-6 rounded-full border border-blue-200 z-0"
          animate={activeState === 'flowing' ? { 
            scale: [1, 1.4, 1.7],
            opacity: [0.5, 0.2, 0]
          } : { scale: 1, opacity: 0 }}
          transition={{ repeat: Infinity, duration: 2.5, ease: "easeOut", delay: 0.3 }}
        />
      </motion.div>
      
      {/* Flow lines connecting to center */}
      <svg className="absolute inset-0 w-full h-full z-5" viewBox="0 0 100 100" preserveAspectRatio="none">
        {/* Curved path from spirituality to center */}
        <motion.path
          d="M25,33 Q50,45 50,65"
          stroke="url(#gradient-spirituality-center)"
          strokeWidth="1.5"
          fill="none"
          strokeDasharray="5,3"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={activeState !== 'inactive' ? { 
            pathLength: 1, 
            opacity: 1
          } : { pathLength: 0, opacity: 0 }}
          transition={{ duration: 1.5 }}
        />
        
        {/* Curved path from science to center */}
        <motion.path
          d="M75,33 Q50,45 50,65"
          stroke="url(#gradient-science-center)"
          strokeWidth="1.5"
          fill="none"
          strokeDasharray="5,3"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={activeState !== 'inactive' ? { 
            pathLength: 1, 
            opacity: 1
          } : { pathLength: 0, opacity: 0 }}
          transition={{ duration: 1.5 }}
        />
        
        {/* Flow particles on spirituality path */}
        {Array.from({ length: 5 }).map((_, i) => (
          <motion.circle
            key={`sp-${i}`}
            r="0.7"
            fill="rgba(142, 68, 173, 0.8)"
            initial={{ opacity: 0 }}
            animate={activeState === 'flowing' ? {
              opacity: [0, 1, 0],
              offsetDistance: ["0%", "100%"],
            } : { opacity: 0 }}
            transition={{
              repeat: Infinity,
              duration: 3,
              delay: i * 0.5,
              ease: "easeInOut",
            }}
            style={{
              offsetPath: "path('M25,33 Q50,45 50,65')",
            }}
          />
        ))}
        
        {/* Flow particles on science path */}
        {Array.from({ length: 5 }).map((_, i) => (
          <motion.circle
            key={`sc-${i}`}
            r="0.7"
            fill="rgba(52, 152, 219, 0.8)"
            initial={{ opacity: 0 }}
            animate={activeState === 'flowing' ? {
              opacity: [0, 1, 0],
              offsetDistance: ["0%", "100%"],
            } : { opacity: 0 }}
            transition={{
              repeat: Infinity,
              duration: 3,
              delay: i * 0.5,
              ease: "easeInOut",
            }}
            style={{
              offsetPath: "path('M75,33 Q50,45 50,65')",
            }}
          />
        ))}
        
        {/* Gradient definitions */}
        <defs>
          <linearGradient id="gradient-spirituality-center" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="rgba(142, 68, 173, 0.8)" />
            <stop offset="100%" stopColor="rgba(46, 204, 113, 0.8)" />
          </linearGradient>
          <linearGradient id="gradient-science-center" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="rgba(52, 152, 219, 0.8)" />
            <stop offset="100%" stopColor="rgba(46, 204, 113, 0.8)" />
          </linearGradient>
        </defs>
      </svg>
      
      {/* Central convergence with ripple and pulse effects */}
      <div className="absolute left-1/2 bottom-[22%] transform -translate-x-1/2">
        {/* Convergence point indicator */}
        <motion.div
          className="absolute -inset-4 rounded-full"
          style={{ backgroundColor: 'rgba(220, 220, 220, 0.2)' }}
          animate={activeState === 'pulse' ? { 
            scale: [1, 1.3, 1],
          } : { scale: 1 }}
          transition={{ repeat: Infinity, duration: 2, delay: 0.2 }}
        />
        
        {/* Ripple effects */}
        <motion.div 
          className="absolute -inset-10 rounded-full border-2"
          style={{ borderColor: 'rgba(46, 204, 113, 0.3)' }}
          animate={activeState === 'flowing' ? { 
            scale: [0.8, 1.5, 2],
            opacity: [0.7, 0.3, 0]
          } : { scale: 0.8, opacity: 0 }}
          transition={{ repeat: Infinity, duration: 2 }}
        />
        
        <motion.div 
          className="absolute -inset-16 rounded-full border"
          style={{ borderColor: 'rgba(46, 204, 113, 0.2)' }}
          animate={activeState === 'flowing' ? { 
            scale: [0.8, 1.5, 2.2],
            opacity: [0.5, 0.2, 0]
          } : { scale: 0.8, opacity: 0 }}
          transition={{ repeat: Infinity, duration: 2.5, delay: 0.3 }}
        />
      </div>
      
      {/* Startups/Impact Node - Bottom */}
      <motion.div
        className="absolute bottom-[6%] left-1/2 transform -translate-x-1/2 w-40 h-40 rounded-full cursor-pointer shadow-lg z-10"
        style={{ 
          backgroundColor: 'rgba(46, 204, 113, 0.9)',
          boxShadow: hoverElement === 'startups' ? '0 0 30px rgba(46, 204, 113, 0.6)' : '0 0 15px rgba(46, 204, 113, 0.3)'
        }}
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, delay: 0.5 }}
        whileHover={{ scale: 1.05 }}
        onHoverStart={() => setHoverElement('startups')}
        onHoverEnd={() => setHoverElement(null)}
        onClick={() => setActiveState(activeState === 'flowing' ? 'pulse' : 'flowing')}
      >
        <div className="w-full h-full flex flex-col items-center justify-center text-white p-3">
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="mb-2">
            <path d="M13.5 2L12 5L10.5 2H4L6 7H3L5 12H9V19C9 19.55 9.45 20 10 20H14C14.55 20 15 19.55 15 19V12H19L21 7H18L20 2H13.5Z" fill="white"/>
            <circle cx="12" cy="10" r="1.5" fill="white" fillOpacity="0.6"/>
          </svg>
          <span className="text-base font-semibold text-center">Impact Through Startups</span>
          <span className="text-xs text-center mt-1 opacity-80">The Beautiful Expression</span>
          
          {/* Starburst effect for startups/impact */}
          <motion.div
            className="absolute inset-0 rounded-full"
            animate={activeState === 'pulse' ? {
              boxShadow: ['0 0 10px rgba(46, 204, 113, 0.5)', '0 0 25px rgba(46, 204, 113, 0.8)', '0 0 10px rgba(46, 204, 113, 0.5)']
            } : {}}
            transition={{ repeat: Infinity, duration: 2 }}
          />
        </div>
      </motion.div>
      
      {/* Explanatory text */}
      <div className="absolute bottom-[1%] left-0 right-0 text-center">
        <p className="text-xs text-gray-500 italic">When inner wisdom meets scientific validation, impactful innovation emerges</p>
      </div>
    </div>
  );
}