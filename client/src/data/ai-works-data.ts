import { type AiWork } from "../types/ai-work";

export const aiWorksData: AiWork[] = [
  {
    id: 1,
    title: "AI Screen Reader: A Real-Time Voice Tutor",
    description: "A screen reader that not only reads but also understands content. Standard screen readers simply vocalize text, but they lack comprehension. I built an AI-powered tool that understands the content it reads, providing context, explanations, and relevant information—transforming passive listening into interactive learning.",
    imageUrl: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80",
    mediaType: "image",
    demoUrl: null,
    technologies: ["OpenAI Whisper", "GPT Models", "Voice Synthesis", "Real-time Analysis"]
  },
  {
    id: 2,
    title: "Flashcards for Spelling Bee: A Niece's Overnight Hack",
    description: "When my niece needed a study tool, I built one overnight. My niece had just qualified for the next round of a Spelling Bee competition. She needed a quick and efficient way to memorize hundreds of words but struggled with traditional methods. That night, I wrote a Python script that converted word lists into Anki flashcards, complete with pronunciation and example sentences.",
    imageUrl: "/assets/SampleVideo_1280x720_10mb.mp4",
    mediaType: "video",
    demoUrl: null,
    technologies: ["Python", "Pandas", "Anki API", "Spaced Repetition"]
  },
  {
    id: 3,
    title: "Automated Work Logging with AI",
    description: "Screenshots, AI analysis, and smart documentation in one flow. Every day, we spend hours working on projects but rarely document them efficiently. I built an AI-driven automation tool that takes periodic screenshots, feeds them into ChatGPT for contextual analysis, and allows users to add prompts for insights—all in a single step.",
    imageUrl: "https://images.unsplash.com/photo-1495511167051-13bb07bde85b?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80",
    mediaType: "image",
    demoUrl: null,
    technologies: ["Python", "OpenCV", "OpenAI API", "Automation"]
  },
  {
    id: 4,
    title: "Building a Website in 40 Hours for $30 with AI",
    description: "AI-powered coding made website building accessible and rapid. I wanted to test how far AI tools could go in helping non-developers build a functional, professional website. My challenge was to create a fully operational site from scratch in under 40 hours while spending no more than $30.",
    imageUrl: "https://images.unsplash.com/photo-1593720213428-28a5b9e94613?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80",
    mediaType: "image",
    demoUrl: null,
    technologies: ["Replit", "ChatGPT", "Vercel", "Bootstrap"]
  },
  {
    id: 5,
    title: "Omi Apps: Capturing Memories with Voice Transcription",
    description: "An app that turns your voice into retrievable memories. In a world where we take thousands of photos but forget key moments, I wanted a way to record fleeting thoughts, experiences, and insights effortlessly. I developed an AI-powered voice recording app that transcribes and categorizes memories for later retrieval.",
    imageUrl: "https://images.unsplash.com/photo-1530811761207-8d9d22f0a141?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80",
    mediaType: "image",
    demoUrl: null,
    technologies: ["Whisper", "Speech-to-Text", "Custom Tagging", "Search System"]
  },
  {
    id: 6,
    title: "AI-Assisted Code Editing & Component Isolation",
    description: "A methodology for efficient AI-driven app development. AI-assisted coding is powerful but often chaotic. I needed a way to ensure modular development where AI-generated components don't interfere with each other. By designing a structured workflow where components are developed and validated independently before integration, I was able to build AI apps more efficiently.",
    imageUrl: "https://images.unsplash.com/photo-1580894732444-8ecded7900cd?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80",
    mediaType: "image",
    demoUrl: null,
    technologies: ["GitHub Copilot", "OpenAI API", "Modular Development", "Code Validation"]
  },
  {
    id: 7,
    title: "Interactive AI Voice Agent for Live Video Analysis",
    description: "An AI-driven assistant that understands what you see and speaks to you in real time. Inspired by real-time streaming analytics, I built a voice AI assistant that can analyze a video feed and provide contextual information on the fly. The goal was to enhance remote learning and research workflows by making visual content interactive.",
    imageUrl: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80",
    mediaType: "image",
    demoUrl: null,
    technologies: ["OpenCV", "Whisper", "GPT Models", "Real-time Context Extraction"]
  }
];