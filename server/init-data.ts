import { storage } from "./storage";
import { insertAiWorkSchema, insertProjectSchema, insertCaseStudySchema, insertInterestSchema } from "@shared/schema";

const aiWorks = [
  {
    title: "AI Screen Reader: A Real-Time Voice Tutor",
    description: "A screen reader that not only reads but also teaches and interacts in real time. I envisioned a tool that could transform passive screen consumption into an active learning experience. Inspired by Google AI Studio, I built an AI screen reader that analyzes text on a screen, explains its content, and engages in interactive discussions with the user.",
    imageUrl: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80",
    demoUrl: null,
    technologies: ["OpenAI Whisper", "GPT Models", "Voice Synthesis", "Real-time Analysis"],
    mediaType: "image"
  },
  {
    title: "Flashcards for Spelling Bee: A Niece's Overnight Hack",
    description: "When my niece needed a study tool, I built one overnight. My niece had just qualified for the next round of a Spelling Bee competition. She needed a quick and efficient way to memorize hundreds of words but struggled with traditional methods. That night, I wrote a Python script that converted word lists into Anki flashcards, complete with pronunciation and example sentences.",
    imageUrl: "/assets/Screen Recording 2025-03-05 at 1.mp4",
    mediaType: "video",
    demoUrl: null,
    technologies: ["Python", "Pandas", "Anki API", "Spaced Repetition"]
  },
  {
    title: "Automated Work Logging with AI",
    description: "Screenshots, AI analysis, and smart documentation in one flow. Every day, we spend hours working on projects but rarely document them efficiently. I built an AI-driven automation tool that takes periodic screenshots, feeds them into ChatGPT for contextual analysis, and allows users to add prompts for insights—all in a single step.",
    imageUrl: "https://images.unsplash.com/photo-1495511167051-13bb07bde85b?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80",
    demoUrl: null,
    technologies: ["Python", "OpenCV", "OpenAI API", "Automation"],
    mediaType: "image"
  },
  {
    title: "Building a Website in 40 Hours for $30 with AI",
    description: "AI-powered coding made website building accessible and rapid. I wanted to test how far AI tools could go in helping non-developers build a functional, professional website. My challenge was to create a fully operational site from scratch in under 40 hours while spending no more than $30.",
    imageUrl: "https://images.unsplash.com/photo-1593720213428-28a5b9e94613?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80",
    demoUrl: null,
    technologies: ["Replit", "ChatGPT", "Vercel", "Bootstrap"],
    mediaType: "image"
  },
  {
    title: "Omi Apps: Capturing Memories with Voice Transcription",
    description: "An app that turns your voice into retrievable memories. In a world where we take thousands of photos but forget key moments, I wanted a way to record fleeting thoughts, experiences, and insights effortlessly. I developed an AI-powered voice recording app that transcribes and categorizes memories for later retrieval.",
    imageUrl: "https://images.unsplash.com/photo-1530811761207-8d9d22f0a141?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80",
    demoUrl: null,
    technologies: ["Whisper", "Speech-to-Text", "Custom Tagging", "Search System"],
    mediaType: "image"
  },
  {
    title: "AI-Assisted Code Editing & Component Isolation",
    description: "A methodology for efficient AI-driven app development. AI-assisted coding is powerful but often chaotic. I needed a way to ensure modular development where AI-generated components don't interfere with each other. By designing a structured workflow where components are developed and validated independently before integration, I was able to build AI apps more efficiently.",
    imageUrl: "https://images.unsplash.com/photo-1580894732444-8ecded7900cd?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80",
    demoUrl: null,
    technologies: ["GitHub Copilot", "OpenAI API", "Modular Development", "Code Validation"],
    mediaType: "image"
  },
  {
    title: "Interactive AI Voice Agent for Live Video Analysis",
    description: "An AI-driven assistant that understands what you see and speaks to you in real time. Inspired by real-time streaming analytics, I built a voice AI assistant that can analyze a video feed and provide contextual information on the fly. The goal was to enhance remote learning and research workflows by making visual content interactive.",
    imageUrl: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80",
    demoUrl: null,
    technologies: ["OpenCV", "Whisper", "GPT Models", "Real-time Context Extraction"],
    mediaType: "image"
  }
];

const projects = [
  {
    title: "Portfolio Website",
    subtitle: "Personal Showcase",
    description: "A modern portfolio website built with React and Tailwind CSS to showcase my projects and skills",
    imageUrl: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80",
    projectUrl: "https://github.com/yourusername/portfolio",
    tags: ["React", "Tailwind CSS", "JavaScript", "Responsive Design"],
    position: "Full Stack Developer"
  },
  {
    title: "E-Commerce Platform",
    subtitle: "Online Shopping Experience",
    description: "A complete e-commerce solution with product listings, shopping cart, and payment processing",
    imageUrl: "https://images.unsplash.com/photo-1556742031-c6961e8560b0?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80",
    projectUrl: "https://github.com/yourusername/ecommerce",
    tags: ["Node.js", "MongoDB", "Express", "React", "Redux", "PayPal API"],
    position: "Lead Developer"
  },
  {
    title: "Task Management App",
    subtitle: "Productivity Tool",
    description: "A task management application to help users organize their daily activities and improve productivity",
    imageUrl: "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80",
    projectUrl: "https://github.com/yourusername/task-manager",
    tags: ["React Native", "Firebase", "Mobile Development", "Cross-platform"],
    position: "Mobile Developer"
  }
];

const interests = [
  {
    title: "Quantum Computing",
    description: "Exploring the fascinating world of quantum computing and its potential applications in cryptography and optimization problems.",
    mediaUrl: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    category: "science",
    mediaType: "image"
  },
  {
    title: "Meditation & Mindfulness",
    description: "Practicing daily meditation and mindfulness techniques to improve focus, reduce stress, and enhance overall well-being.",
    mediaUrl: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    category: "spirituality",
    mediaType: "image"
  },
  {
    title: "Venture Capital",
    description: "Following trends in early-stage investments and analyzing what makes startups successful in today's rapidly changing market.",
    mediaUrl: "https://images.unsplash.com/photo-1559067096-49ebca3406aa?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    category: "startups",
    mediaType: "image"
  }
];

export async function initData() {
  console.log("Initializing data...");
  
  try {
    // Initialize AI works if needed
    await initializeAiWorks();
    
    // Initialize projects if needed
    await initializeProjects();
    
    // Initialize interests if needed
    await initializeInterests();
    
    console.log("Data initialization completed!");
  } catch (error) {
    console.error("Error during data initialization:", error);
    console.log("Continuing with application startup despite initialization error");
  }
}

async function initializeAiWorks() {
  // Check if we already have AI works
  const existingWorks = await storage.getAiWorks();
  
  // Only seed if we don't have any works yet
  if (existingWorks.length === 0) {
    console.log("No AI works found, seeding initial data...");
    
    for (const work of aiWorks) {
      try {
        // Validate the data using the schema
        const validWork = insertAiWorkSchema.parse(work);
        
        // Create the AI work in storage
        const created = await storage.createAiWork(validWork);
        console.log(`Created AI work: ${created.title}`);
      } catch (error) {
        console.error(`Failed to create AI work: ${work.title}`, error);
      }
    }
  } else {
    console.log(`Found ${existingWorks.length} existing AI works, skipping initialization`);
  }
}

async function initializeProjects() {
  // Check if we already have projects
  const existingProjects = await storage.getProjects();
  
  // Only seed if we don't have any projects yet
  if (existingProjects.length === 0) {
    console.log("No projects found, seeding initial project data...");
    
    for (const project of projects) {
      try {
        // Validate the data using the schema
        const validProject = insertProjectSchema.parse(project);
        
        // Create the project in storage
        const created = await storage.createProject(validProject);
        console.log(`Created project: ${created.title}`);
      } catch (error) {
        console.error(`Failed to create project: ${project.title}`, error);
      }
    }
  } else {
    console.log(`Found ${existingProjects.length} existing projects, skipping initialization`);
  }
}

async function initializeInterests() {
  // Check if we already have interests
  const existingInterests = await storage.getInterests();
  
  // Only seed if we don't have any interests yet
  if (existingInterests.length === 0) {
    console.log("No interests found, seeding initial interest data...");
    
    for (const interest of interests) {
      try {
        // Validate the data using the schema
        const validInterest = insertInterestSchema.parse(interest);
        
        // Create the interest in storage
        const created = await storage.createInterest(validInterest);
        console.log(`Created interest: ${created.title}`);
      } catch (error) {
        console.error(`Failed to create interest: ${interest.title}`, error);
      }
    }
  } else {
    console.log(`Found ${existingInterests.length} existing interests, skipping initialization`);
  }
}