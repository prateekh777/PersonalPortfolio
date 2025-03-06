import { 
  Section, 
  Project, 
  CaseStudy, 
  AiWork, 
  Interest 
} from "@shared/schema";

// Mock data for Sections
export const sectionsData: Record<string, Section[]> = {
  home: [
    {
      id: "1",
      title: "The Sanctuary",
      content: "Welcome to my creative space",
      type: "home",
      order: 1,
      mediaUrls: [],
      stats: []
    }
  ],
  expertise: [
    {
      id: "2",
      title: "Technical Leadership",
      content: "Leading technical teams to success",
      type: "expertise",
      order: 1,
      mediaUrls: [],
      stats: []
    }
  ]
};

// Mock data for Projects
export const projectsData: Project[] = [
  {
    id: "1",
    title: "Smart Learning Platform",
    subtitle: "AI-powered education system",
    description: "Developed an intelligent learning platform that adapts to individual student needs through machine learning algorithms, providing personalized learning paths and immediate feedback.",
    imageUrl: "https://images.unsplash.com/photo-1610116306796-6fea9f4fae38?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80",
    projectUrl: "https://example.com/project1",
    tags: ["React", "Node.js", "Machine Learning", "Education Technology"],
    position: "Full Stack Developer"
  },
  {
    id: "2",
    title: "Healthcare Management System",
    subtitle: "Digital transformation for clinics",
    description: "Built a comprehensive healthcare management system that streamlines patient scheduling, medical records, billing, and telemedicine in a unified platform.",
    imageUrl: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80",
    projectUrl: "https://example.com/project2",
    tags: ["React", "Express", "MongoDB", "Healthcare"],
    position: "Backend Lead"
  },
  {
    id: "3",
    title: "E-Commerce Analytics Dashboard",
    subtitle: "Real-time business intelligence",
    description: "Created an advanced analytics dashboard for e-commerce businesses that provides real-time insights on sales, customer behavior, inventory, and marketing performance.",
    imageUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80",
    projectUrl: "https://example.com/project3",
    tags: ["Vue.js", "Python", "Data Visualization", "E-Commerce"],
    position: "Frontend Developer"
  }
];

// Mock data for Case Studies
export const caseStudiesData: CaseStudy[] = [
  {
    id: "1",
    title: "Increasing and Maintaining Conversion Rate from Demo Participants to Paid Customers in an EdTech Setup",
    description: "A comprehensive case study on improving conversion rates in educational technology products.",
    outcome: "We improved the conversion rate from demo sessions to paid customers by 30% within three months and maintained the uplift over time by establishing a structured, insight-driven approach to trial sessions.",
    technologies: ["Analytics", "CRM", "User Research"],
    imageUrl: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80"
  },
  {
    id: "2",
    title: "Designing a Scalable Microservices Architecture for a Fintech Application",
    description: "How we transformed a monolithic finance application into a flexible microservices architecture.",
    outcome: "Reduced deployment times by 75% and increased system reliability with 99.99% uptime while enabling independent scaling of critical components.",
    technologies: ["Kubernetes", "Docker", "Go", "AWS"],
    imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80"
  },
  {
    id: "3",
    title: "Optimizing Database Performance for High-Load E-commerce Platform",
    description: "A deep dive into database optimization strategies for handling peak season traffic.",
    outcome: "Achieved 5x improvement in query response times and successfully handled 10x normal traffic volume during Black Friday sale without performance degradation.",
    technologies: ["PostgreSQL", "Redis", "Query Optimization", "Caching"],
    imageUrl: "https://images.unsplash.com/photo-1520333789090-1afc82db536a?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80"
  }
];

// Mock data for AI Works
export const aiWorksData: AiWork[] = [
  {
    id: "1",
    title: "AI Screen Reader: A Real-Time Voice Tutor",
    description: "A screen reader that not only reads but also teaches and interacts in real time. I envisioned a tool that could transform passive screen consumption into an active learning experience. Inspired by Google AI Studio, I built an AI screen reader that analyzes text on a screen, explains its content, and engages in interactive discussions with the user.",
    imageUrl: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80",
    mediaType: "image",
    demoUrl: "",
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
    demoUrl: "",
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
    description: "Productivity tool that learns your work patterns and documents daily tasks for you. Tired of manually recording time logs for client billing, I created a Python tool that monitors active applications and infers what task you're working on. It creates concise work summaries and activity logs with minimal overhead.",
    imageUrl: "https://images.unsplash.com/photo-1549692520-acc6669e2f0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80",
    mediaType: "image",
    demoUrl: "https://github.com/example/auto-worklog",
    technologies: [
      "Python",
      "Machine Learning",
      "Application Monitoring",
      "Text Generation"
    ]
  },
  {
    id: "4",
    title: "Smart Website Chatbot with Content Awareness",
    description: "How I built a chatbot that actually knows the content of my website. Frustrated with chatbots that can't answer questions about the website they're on, I developed a solution. This chatbot indexes website content on-demand and uses vector embeddings to find relevant information when answering questions, drastically improving user experience.",
    imageUrl: "https://images.unsplash.com/photo-1531746790731-6c087fecd65a?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80",
    mediaType: "image",
    demoUrl: "",
    technologies: [
      "JavaScript",
      "OpenAI API",
      "Vector Database",
      "Web Scraping"
    ]
  },
  {
    id: "5",
    title: "Voice Assistant for Omi Apps",
    description: "A multilingual voice assistant for seniors navigating mobile apps. When my grandmother struggled with using her smartphone, I built a solution. This assistant recognizes voice commands in multiple languages and helps seniors navigate complex apps with natural language instructions and audio feedback, bridging the digital divide.",
    imageUrl: "https://images.unsplash.com/photo-1544777181-b5940c8c28e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80",
    mediaType: "image",
    demoUrl: "",
    technologies: [
      "React Native",
      "Speech Recognition",
      "Multilingual NLP",
      "Accessibility Design"
    ]
  },
  {
    id: "6",
    title: "AI-Powered Code Editing Component",
    description: "Building a smarter code editor that understands your project. Developer tools often lack contextual awareness of a project's codebase. I built a custom VS Code component that maintains an understanding of project structure and code patterns. It suggests more relevant completions and helps maintain consistency in large projects.",
    imageUrl: "https://images.unsplash.com/photo-1542903660-eedba2cda473?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80",
    mediaType: "image",
    demoUrl: "https://marketplace.visualstudio.com/example",
    technologies: [
      "TypeScript",
      "VS Code API",
      "Code Analysis",
      "Language Models"
    ]
  },
  {
    id: "7",
    title: "Video Analysis for Youth Sports",
    description: "Helping young athletes improve through AI video analysis. As a volunteer youth basketball coach, I wanted to provide professional-level feedback to young players. I developed a tool that analyzes smartphone recordings of games, tracks player movements, and identifies areas for improvement in technique and strategy.",
    imageUrl: "https://images.unsplash.com/photo-1546519638-68e109498ffc?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80",
    mediaType: "image",
    demoUrl: "",
    technologies: [
      "Python",
      "Computer Vision",
      "Motion Tracking",
      "Sports Analytics"
    ]
  }
];

// Mock data for Interests
export const interestsData: Interest[] = [
  {
    id: "1",
    title: "Quantum Computing",
    description: "Exploring the fascinating world of quantum computing and its potential applications in cryptography and optimization problems.",
    mediaUrl: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    mediaType: "image",
    category: "science"
  },
  {
    id: "2",
    title: "Meditation & Mindfulness",
    description: "Practicing daily meditation and mindfulness techniques to improve focus, reduce stress, and enhance overall well-being.",
    mediaUrl: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    mediaType: "image",
    category: "spirituality"
  },
  {
    id: "3",
    title: "Venture Capital",
    description: "Following trends in early-stage investments and analyzing what makes startups successful in today's rapidly changing market.",
    mediaUrl: "https://images.unsplash.com/photo-1559067096-49ebca3406aa?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    mediaType: "image",
    category: "startups"
  }
];