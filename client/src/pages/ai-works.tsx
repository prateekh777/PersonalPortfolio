import { type AiWork } from "@shared/schema";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Brain, ChevronRight, Sparkles, Code, FileAudio, FileText, Zap, Monitor, X, ArrowUpRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Animation variants for scroll animations
const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.5,
      ease: "easeOut"
    }
  })
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

// Function to get appropriate icon for each project
const getProjectIcon = (title: string) => {
  if (title.includes("Screen Reader")) return <Monitor className="h-6 w-6" />;
  if (title.includes("Flashcards") || title.includes("Spelling")) return <FileText className="h-6 w-6" />;
  if (title.includes("Logging")) return <Code className="h-6 w-6" />;
  if (title.includes("Website")) return <Monitor className="h-6 w-6" />;
  if (title.includes("Voice") || title.includes("Omi Apps")) return <FileAudio className="h-6 w-6" />;
  if (title.includes("Component") || title.includes("Code Editing")) return <Code className="h-6 w-6" />;
  if (title.includes("Video Analysis")) return <Monitor className="h-6 w-6" />;
  return <Sparkles className="h-6 w-6" />;
};

// Hardcoded AI works data
const aiWorksData: AiWork[] = [
  {
    id: "1",
    title: "AI Screen Reader: A Real-Time Voice Tutor",
    description: "A screen reader that not only reads but also teaches and interacts in real time. I envisioned a tool that could transform passive screen consumption into an active learning experience. Inspired by Google AI Studio, I built an AI screen reader that analyzes text on a screen, explains its content, and engages in interactive discussions with the user.",
    imageUrl: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80",
    mediaType: "image",
    demoUrl: null,
    technologies: [
      "OpenAI Whisper",
      "GPT Models",
      "Voice Synthesis",
      "Real-time Analysis"
    ]
  },
  {
    id: "2",
    title: "Flashcards for Spelling Bee: A Niece's Overnight Hack",
    description: "When my niece needed a study tool, I built one overnight. My niece had just qualified for the next round of a Spelling Bee competition. She needed a quick and efficient way to memorize hundreds of words but struggled with traditional methods. That night, I wrote a Python script that converted word lists into Anki flashcards, complete with pronunciation and example sentences.",
    imageUrl: "/assets/Screen Recording 2025-03-05 at 1.mp4",
    mediaType: "video",
    demoUrl: null,
    technologies: [
      "Python",
      "Pandas",
      "Anki API",
      "Spaced Repetition"
    ]
  },
  {
    id: "3",
    title: "Automated Work Logging with AI",
    description: "Screenshots, AI analysis, and smart documentation in one flow. Every day, we spend hours working on projects but rarely document them efficiently. I built an AI-driven automation tool that takes periodic screenshots, feeds them into ChatGPT for contextual analysis, and allows users to add prompts for insights—all in a single step.",
    imageUrl: "https://images.unsplash.com/photo-1495511167051-13bb07bde85b?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80",
    mediaType: "image",
    demoUrl: null,
    technologies: [
      "Python",
      "OpenCV",
      "OpenAI API",
      "Automation"
    ]
  },
  {
    id: "4",
    title: "Building a Website in 40 Hours for $30 with AI",
    description: "AI-powered coding made website building accessible and rapid. I wanted to test how far AI tools could go in helping non-developers build a functional, professional website. My challenge was to create a fully operational site from scratch in under 40 hours while spending no more than $30.",
    imageUrl: "https://images.unsplash.com/photo-1593720213428-28a5b9e94613?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80",
    mediaType: "image",
    demoUrl: null,
    technologies: [
      "Replit",
      "ChatGPT",
      "Vercel",
      "Bootstrap"
    ]
  },
  {
    id: "5",
    title: "Omi Apps: Capturing Memories with Voice Transcription",
    description: "An app that turns your voice into retrievable memories. In a world where we take thousands of photos but forget key moments, I wanted a way to record fleeting thoughts, experiences, and insights effortlessly. I developed an AI-powered voice recording app that transcribes and categorizes memories for later retrieval.",
    imageUrl: "https://images.unsplash.com/photo-1530811761207-8d9d22f0a141?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80",
    mediaType: "image",
    demoUrl: null,
    technologies: [
      "Whisper",
      "Speech-to-Text",
      "Custom Tagging",
      "Search System"
    ]
  },
  {
    id: "6",
    title: "AI-Assisted Code Editing & Component Isolation",
    description: "A methodology for efficient AI-driven app development. AI-assisted coding is powerful but often chaotic. I needed a way to ensure modular development where AI-generated components don't interfere with each other. By designing a structured workflow where components are developed and validated independently before integration, I was able to build AI apps more efficiently.",
    imageUrl: "https://images.unsplash.com/photo-1580894732444-8ecded7900cd?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80",
    mediaType: "image",
    demoUrl: null,
    technologies: [
      "GitHub Copilot",
      "OpenAI API",
      "Modular Development",
      "Code Validation"
    ]
  },
  {
    id: "7",
    title: "Interactive AI Voice Agent for Live Video Analysis",
    description: "An AI-driven assistant that understands what you see and speaks to you in real time. Inspired by real-time streaming analytics, I built a voice AI assistant that can analyze a video feed and provide contextual information on the fly. The goal was to enhance remote learning and research workflows by making visual content interactive.",
    imageUrl: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80",
    mediaType: "image",
    demoUrl: null,
    technologies: [
      "OpenCV",
      "Whisper",
      "GPT Models",
      "Real-time Context Extraction"
    ]
  }
];

export default function AiWorks() {
  // State for tracking which card is hovered
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);
  
  // State for tracking which project description is in full view
  const [activeDescription, setActiveDescription] = useState<AiWork | null>(null);
  
  // Ref for the section to trigger animations on scroll
  const sectionRef = useRef<HTMLDivElement>(null);
  
  // State to track if the hero section is in view
  const [heroInView, setHeroInView] = useState(false);
  
  useEffect(() => {
    // Set hero in view after component mounts
    setTimeout(() => setHeroInView(true), 300);
    
    // Function to handle scroll animations
    const handleScroll = () => {
      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect();
        const isInView = rect.top < window.innerHeight && rect.bottom >= 0;
        if (isInView) {
          sectionRef.current.classList.add('in-view');
        }
      }
    };

    // Initialize scroll position
    handleScroll();
    
    // Add scroll event listener
    window.addEventListener('scroll', handleScroll);
    
    // Cleanup
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="bg-[rgb(150,140,120)] text-gray-50 min-h-screen">
      {/* Hero Section with animation */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={heroInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 1 }}
        className="relative bg-[#222222] overflow-hidden"
      >
        <div className="max-w-7xl mx-auto">
          <div className="relative z-10 pb-8 sm:pb-16 md:pb-20 lg:pb-28 xl:pb-32 pt-20 px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={heroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              <div className="flex items-center gap-4 mb-6">
                <Brain className="h-10 w-10 text-[#F8F8F8]" />
                <h1 className="text-5xl font-bold text-[#F8F8F8]">AI Works</h1>
              </div>
              <p className="mt-3 max-w-2xl text-xl text-[#F8F8F8] font-medium sm:mt-5">
                A collection of AI-powered solutions I've built to solve real-world problems and 
                explore the potential of artificial intelligence in everyday applications.
              </p>
              <div className="mt-8 flex">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button 
                    className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm bg-[#222222] text-[#F8F8F8] hover:bg-[#333333] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[#222222] focus:ring-[#F8F8F8]"
                    onClick={() => {
                      if (sectionRef.current) {
                        sectionRef.current.scrollIntoView({ behavior: 'smooth' });
                      }
                    }}
                  >
                    Explore AI Projects <ChevronRight className="ml-2 h-4 w-4" />
                  </Button>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
        
        {/* Abstract background pattern */}
        <motion.div 
          className="absolute inset-0 opacity-30"
          initial={{ opacity: 0 }}
          animate={heroInView ? { opacity: 0.3 } : { opacity: 0 }}
          transition={{ duration: 1.2, delay: 0.5 }}
        >
          <div className="absolute inset-0" style={{
            backgroundImage: "radial-gradient(circle at 30% 70%, rgba(248, 248, 248, 0.1) 0%, transparent 40%), radial-gradient(circle at 70% 30%, rgba(248, 248, 248, 0.15) 0%, transparent 40%)"
          }}></div>
        </motion.div>
      </motion.div>

      {/* Projects Grid with staggered animation */}
      <div ref={sectionRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 bg-[rgb(150,140,120)]">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid gap-12 md:grid-cols-2"
        >
          {aiWorksData.map((work, i) => (
            <motion.div
              key={work.id}
              custom={i}
              variants={fadeInUp}
              whileHover={{ 
                y: -10,
                transition: { duration: 0.3 }
              }}
              className="h-full"
              onMouseEnter={() => setHoveredCard(work.id)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <Card className="h-full flex flex-col overflow-hidden bg-[#222222] border-none shadow-xl">
                <div className="relative overflow-hidden">
                  {work.mediaType === 'video' ? (
                    <motion.video
                      src={typeof work.imageUrl === 'string' ? work.imageUrl : "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80"}
                      className="aspect-video w-full object-cover transition-transform duration-700"
                      autoPlay
                      muted
                      loop
                      playsInline
                      animate={{
                        scale: hoveredCard === work.id ? 1.05 : 1
                      }}
                    />
                  ) : (
                    <motion.img
                      src={typeof work.imageUrl === 'string' ? work.imageUrl : "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80"}
                      alt={work.title}
                      className="aspect-video w-full object-cover transition-transform duration-700"
                      animate={{
                        scale: hoveredCard === work.id ? 1.05 : 1
                      }}
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#222222]/60" />
                  <div className="absolute bottom-4 left-4 flex items-center gap-2">
                    <div className="bg-[#F8F8F8] p-2 rounded-full">
                      <div className="text-[#222222]">
                        {getProjectIcon(work.title)}
                      </div>
                    </div>
                  </div>
                </div>
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-2xl font-bold text-[#F8F8F8]">{work.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="flex-1 pt-0">
                  <div className="mb-3">
                    <p className="text-[#F8F8F8] font-medium leading-relaxed line-clamp-3">{work.description}</p>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="text-[#F8F8F8]/80 hover:text-[#F8F8F8] hover:bg-transparent p-0 h-auto mt-1 flex items-center" 
                      onClick={(e) => {
                        e.stopPropagation();
                        setActiveDescription(work);
                      }}
                    >
                      Read More <ArrowUpRight className="ml-1 h-3 w-3" />
                    </Button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {work.technologies?.map((tech) => (
                      <Badge key={tech} variant="secondary" className="bg-[#F8F8F8]/10 text-[#F8F8F8] hover:bg-[#F8F8F8]/20">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
      
      {/* Impact Section */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="bg-[#222222]/90 py-20 relative overflow-hidden"
      >
        <div className="absolute inset-0 opacity-20" style={{
          backgroundImage: "radial-gradient(circle at 20% 50%, rgba(248, 248, 248, 0.1) 0%, transparent 30%), radial-gradient(circle at 80% 70%, rgba(248, 248, 248, 0.1) 0%, transparent 30%)"
        }}></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[#F8F8F8] sm:text-4xl mb-4">AI-Driven Solutions</h2>
            <p className="text-[#F8F8F8] max-w-3xl mx-auto text-lg font-medium">
              Each of these projects started as an idea to solve a specific problem. While they are still evolving, 
              they demonstrate how AI can be leveraged to create practical and innovative solutions for everyday challenges.
            </p>
          </div>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="grid md:grid-cols-3 gap-6 text-center"
          >
            <div className="bg-[#F8F8F8]/5 p-8 rounded-lg">
              <div className="bg-[#F8F8F8]/10 h-14 w-14 rounded-full flex items-center justify-center mx-auto mb-4">
                <Zap className="h-6 w-6 text-[#F8F8F8]" />
              </div>
              <h3 className="text-xl font-bold text-[#F8F8F8] mb-2">Rapid Prototyping</h3>
              <p className="text-[#F8F8F8] font-medium">
                Using AI tools to quickly build functional prototypes and test ideas without extensive development time.
              </p>
            </div>
            
            <div className="bg-[#F8F8F8]/5 p-8 rounded-lg">
              <div className="bg-[#F8F8F8]/10 h-14 w-14 rounded-full flex items-center justify-center mx-auto mb-4">
                <Brain className="h-6 w-6 text-[#F8F8F8]" />
              </div>
              <h3 className="text-xl font-bold text-[#F8F8F8] mb-2">Practical AI</h3>
              <p className="text-[#F8F8F8] font-medium">
                Building solutions that apply AI capabilities to solve real-world problems and enhance everyday tasks.
              </p>
            </div>
            
            <div className="bg-[#F8F8F8]/5 p-8 rounded-lg">
              <div className="bg-[#F8F8F8]/10 h-14 w-14 rounded-full flex items-center justify-center mx-auto mb-4">
                <Sparkles className="h-6 w-6 text-[#F8F8F8]" />
              </div>
              <h3 className="text-xl font-bold text-[#F8F8F8] mb-2">Innovation</h3>
              <p className="text-[#F8F8F8] font-medium">
                Exploring creative applications of AI technologies to push boundaries and discover new possibilities.
              </p>
            </div>
          </motion.div>
        </div>
      </motion.div>
      
      {/* Call to Action Section */}
      <motion.div 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="bg-[#222222] py-16"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-extrabold text-[#F8F8F8] sm:text-4xl">
            <span className="block">Interested in AI collaboration?</span>
          </h2>
          <p className="mt-4 text-lg leading-6 text-[#F8F8F8] font-medium">
            Let's explore how we can leverage artificial intelligence to solve real-world problems or create innovative experiences.
          </p>
          <div className="mt-8 flex justify-center">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-[#222222] bg-[#F8F8F8] hover:bg-[#F8F8F8]/90"
                onClick={() => window.location.href = '/contact'}
              >
                Get in Touch
              </Button>
            </motion.div>
          </div>
        </div>
      </motion.div>
      
      {/* Full description modal */}
      <AnimatePresence>
        {activeDescription && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50"
              onClick={() => setActiveDescription(null)}
            />
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
            >
              <div 
                className="relative bg-[#222222] rounded-lg shadow-xl max-w-2xl w-full max-h-[80vh] overflow-hidden flex flex-col"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex justify-between items-start p-5 border-b border-[#F8F8F8]/10">
                  <h3 className="text-xl sm:text-2xl font-bold text-[#F8F8F8]">
                    {activeDescription.title}
                  </h3>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-[#F8F8F8]/70 hover:text-[#F8F8F8]"
                    onClick={() => setActiveDescription(null)}
                  >
                    <X className="h-5 w-5" />
                  </Button>
                </div>
                <div className="p-5 overflow-y-auto flex-1">
                  <div className="flex items-center mb-4 flex-wrap gap-2">
                    {activeDescription.technologies?.map((tech) => (
                      <Badge key={tech} variant="secondary" className="bg-[#F8F8F8]/10 text-[#F8F8F8] hover:bg-[#F8F8F8]/20">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                  <div className="my-4">
                    <div className="aspect-video overflow-hidden rounded-lg bg-[#1A1A1A]/50 relative">
                      {activeDescription.mediaType === 'video' ? (
                        <video
                          src={typeof activeDescription.imageUrl === 'string' ? activeDescription.imageUrl : "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80"}
                          className="w-full h-full object-cover"
                          autoPlay
                          muted
                          loop
                          playsInline
                          controls
                        />
                      ) : (
                        <img
                          src={typeof activeDescription.imageUrl === 'string' ? activeDescription.imageUrl : "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80"}
                          alt={activeDescription.title}
                          className="w-full h-full object-cover"
                        />
                      )}
                      <div className="absolute bottom-3 left-3 bg-[#F8F8F8] p-2 rounded-full">
                        <div className="text-[#222222]">
                          {getProjectIcon(activeDescription.title)}
                        </div>
                      </div>
                    </div>
                  </div>
                  <p className="text-[#F8F8F8] font-medium leading-relaxed">{activeDescription.description}</p>
                </div>
                <div className="p-4 border-t border-[#F8F8F8]/10 flex justify-end">
                  <Button 
                    variant="default"
                    className="bg-[#F8F8F8] text-[#222222] hover:bg-[#F8F8F8]/90"
                    onClick={() => setActiveDescription(null)}
                  >
                    Close
                  </Button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
