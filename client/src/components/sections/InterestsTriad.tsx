import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface TriadSection {
  id: 'spirituality' | 'science' | 'startups';
  title: string;
  description: string;
  color: string;
  icon: string; // Path to SVG icon
}

export function InterestsTriad() {
  const [activeSection, setActiveSection] = useState<TriadSection['id'] | null>(null);
  const [isSmallScreen, setIsSmallScreen] = useState(false);

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

  const sections: TriadSection[] = [
    {
      id: 'spirituality',
      title: 'Spirituality',
      description: 'Spirituality gives purpose and strength, diving deep into the nature of consciousness. It provides the foundation for growth and understanding of self.',
      color: 'rgba(142, 68, 173, 0.9)', // Purple for spirituality
      icon: '/icons/spirituality.svg' // Will create this SVG
    },
    {
      id: 'science',
      title: 'Science',
      description: 'Science corroborates this strength, validates it and supports it through analysis, experimentation, and discovery of fundamental principles.',
      color: 'rgba(52, 152, 219, 0.9)', // Blue for science
      icon: '/icons/science.svg' // Will create this SVG
    },
    {
      id: 'startups',
      title: 'Startups',
      description: 'With spirituality and science combined, we produce impact through startups - the actualisation of deep synthesis leading to the expression of beauty.',
      color: 'rgba(46, 204, 113, 0.9)', // Green for startups
      icon: '/icons/startups.svg' // Will create this SVG
    }
  ];

  // Handle triangle section click
  const handleSectionClick = (id: TriadSection['id']) => {
    setActiveSection(activeSection === id ? null : id);
  };

  // Mobile version is a simple stack
  if (isSmallScreen) {
    return (
      <div className="w-full space-y-6 py-6">
        {sections.map((section) => (
          <motion.div
            key={section.id}
            className="rounded-xl p-5 shadow-lg"
            style={{ backgroundColor: section.color }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            onClick={() => handleSectionClick(section.id)}
          >
            <div className="flex items-center space-x-4">
              <div 
                className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center"
                aria-label={`${section.title} icon`}
              >
                <img src={section.icon} alt={section.title} className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white">{section.title}</h3>
            </div>
            
            <motion.div 
              className="mt-3 text-white/90 text-sm"
              initial={{ height: 0, opacity: 0 }}
              animate={{ 
                height: activeSection === section.id ? 'auto' : 0,
                opacity: activeSection === section.id ? 1 : 0
              }}
              transition={{ duration: 0.3 }}
            >
              {section.description}
            </motion.div>
          </motion.div>
        ))}
      </div>
    );
  }

  // Desktop version uses a triangle visualization
  return (
    <div className="w-full py-8 relative">
      <svg width="0" height="0" className="absolute">
        <defs>
          {/* Gradient definitions for the connecting lines */}
          <linearGradient id="gradient-spirituality-science" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="rgba(142, 68, 173, 0.7)" />
            <stop offset="100%" stopColor="rgba(52, 152, 219, 0.7)" />
          </linearGradient>
          <linearGradient id="gradient-science-startups" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="rgba(52, 152, 219, 0.7)" />
            <stop offset="100%" stopColor="rgba(46, 204, 113, 0.7)" />
          </linearGradient>
          <linearGradient id="gradient-startups-spirituality" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="rgba(46, 204, 113, 0.7)" />
            <stop offset="100%" stopColor="rgba(142, 68, 173, 0.7)" />
          </linearGradient>
        </defs>
      </svg>

      <div className="relative h-[500px] w-full flex items-center justify-center">
        {/* Triangle Container */}
        <div className="relative w-[450px] h-[400px]">
          {/* Connection lines forming the triangle */}
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 450 400" fill="none">
            <path 
              d="M225,50 L100,320 L350,320 Z" 
              stroke="url(#gradient-spirituality-science)" 
              strokeWidth="3" 
              fill="none"
              strokeDasharray={activeSection ? "5,5" : "0"} 
            />
          </svg>

          {/* Spirituality Node - Top */}
          <motion.div
            className="absolute top-0 left-1/2 -translate-x-1/2 w-28 h-28 rounded-full shadow-lg cursor-pointer z-10"
            style={{ 
              backgroundColor: sections[0].color,
              boxShadow: activeSection === 'spirituality' ? '0 0 20px rgba(142, 68, 173, 0.7)' : ''
            }}
            whileHover={{ scale: 1.05 }}
            onClick={() => handleSectionClick('spirituality')}
          >
            <div className="w-full h-full flex flex-col items-center justify-center text-white p-2">
              <img src={sections[0].icon} alt="Spirituality" className="w-10 h-10 mb-1" />
              <span className="text-xs font-semibold text-center">{sections[0].title}</span>
            </div>
          </motion.div>

          {/* Science Node - Bottom Left */}
          <motion.div
            className="absolute bottom-0 left-[100px] -translate-x-1/2 w-28 h-28 rounded-full shadow-lg cursor-pointer z-10"
            style={{ 
              backgroundColor: sections[1].color,
              boxShadow: activeSection === 'science' ? '0 0 20px rgba(52, 152, 219, 0.7)' : ''
            }}
            whileHover={{ scale: 1.05 }}
            onClick={() => handleSectionClick('science')}
          >
            <div className="w-full h-full flex flex-col items-center justify-center text-white p-2">
              <img src={sections[1].icon} alt="Science" className="w-10 h-10 mb-1" />
              <span className="text-xs font-semibold text-center">{sections[1].title}</span>
            </div>
          </motion.div>

          {/* Startups Node - Bottom Right */}
          <motion.div
            className="absolute bottom-0 right-[100px] translate-x-1/2 w-28 h-28 rounded-full shadow-lg cursor-pointer z-10"
            style={{ 
              backgroundColor: sections[2].color,
              boxShadow: activeSection === 'startups' ? '0 0 20px rgba(46, 204, 113, 0.7)' : ''
            }}
            whileHover={{ scale: 1.05 }}
            onClick={() => handleSectionClick('startups')}
          >
            <div className="w-full h-full flex flex-col items-center justify-center text-white p-2">
              <img src={sections[2].icon} alt="Startups" className="w-10 h-10 mb-1" />
              <span className="text-xs font-semibold text-center">{sections[2].title}</span>
            </div>
          </motion.div>

          {/* Center content - the synthesis */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ 
              opacity: activeSection ? 1 : 0,
              scale: activeSection ? 1 : 0.8
            }}
            transition={{ duration: 0.5 }}
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 rounded-full bg-white shadow-xl flex items-center justify-center"
          >
            <div className="text-center p-2">
              <div className="text-xs font-medium text-gray-800">
                {activeSection ? sections.find(s => s.id === activeSection)?.description : "Click a node to learn more"}
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Description text below */}
      <div className="text-center mt-8 px-4 max-w-2xl mx-auto">
        <p className="text-sm text-gray-700">
          Through my work, I seek to blend these three dimensions—bringing the depth of 
          <span className="font-semibold text-[rgba(142,68,173,0.9)]"> spiritual awareness</span>, 
          the rigor of <span className="font-semibold text-[rgba(52,152,219,0.9)]">scientific inquiry</span>, 
          and the dynamism of <span className="font-semibold text-[rgba(46,204,113,0.9)]">entrepreneurship</span> 
          into everything I do.
        </p>
      </div>
    </div>
  );
}