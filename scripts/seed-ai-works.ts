import { storage } from "../server/storage";
import { insertAiWorkSchema } from "../shared/schema";

async function seedAiWorks() {
  console.log("Seeding AI Works...");

  // First, let's clear existing AI works to avoid duplicates
  try {
    const existingWorks = await storage.getAiWorks();
    for (const work of existingWorks) {
      await storage.deleteAiWork(work.id);
      console.log(`Deleted existing AI work: ${work.title}`);
    }
  } catch (error) {
    console.error("Error while clearing existing AI works:", error);
  }

  const aiWorks = [
    {
      title: "Quantum Art Generator",
      description: "Blending quantum computing principles with artistic expression, this AI creates unique visual compositions inspired by quantum phenomena. Each piece reflects the uncertainty and entanglement principles through vibrant, mathematically-driven patterns.",
      imageUrl: "https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80",
      demoUrl: "https://example.com/quantum-art",
      technologies: ["Quantum Computing", "TensorFlow Quantum", "WebGL", "React"]
    },
    {
      title: "MelodyMind: AI Music Composer",
      description: "A revolutionary AI system that composes original music across multiple genres by understanding emotional contexts and musical theory. Creates complete compositions from simple prompts like 'joyful jazz with piano' or 'melancholic orchestral sunset'.",
      imageUrl: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80",
      demoUrl: "https://example.com/melodymind",
      technologies: ["Magenta.js", "Transformer Models", "Web Audio API", "PyTorch"]
    },
    {
      title: "NeuroPaint: Neural Style Transfer Studio",
      description: "Advanced neural style transfer platform that allows artists to blend techniques from historical masters with contemporary content. Features exceptional control over stylistic elements and can generate high-resolution artwork suitable for professional printing.",
      imageUrl: "https://images.unsplash.com/photo-1578301978693-85fa9c0320b9?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80",
      demoUrl: "https://example.com/neuropaint",
      technologies: ["Convolutional Neural Networks", "PyTorch", "React", "WebAssembly"]
    },
    {
      title: "DreamscapeVR: Neural Environment Generator",
      description: "Creates immersive 3D virtual environments from text descriptions or sketches. The system generates fully explorable worlds with consistent physics, lighting, and interactive elements, revolutionizing VR content creation for game developers and experience designers.",
      imageUrl: "https://images.unsplash.com/photo-1617839570187-629154a3a26e?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80",
      demoUrl: "https://example.com/dreamscape-vr",
      technologies: ["Neural Radiance Fields", "Three.js", "WebXR", "CUDA"]
    },
    {
      title: "EmotionLens: Real-time Sentiment Analysis",
      description: "Computer vision system that recognizes micro-expressions and emotional states in real-time video, providing unprecedented insights for healthcare, education, and customer experience research. Features privacy-first design with on-device processing.",
      imageUrl: "https://images.unsplash.com/photo-1542596594-649edbc13630?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80",
      demoUrl: "https://example.com/emotion-lens",
      technologies: ["Computer Vision", "TensorFlow.js", "WebRTC", "Emotional AI"]
    },
    {
      title: "BioSynthesis: AI for Drug Discovery",
      description: "Revolutionizing pharmaceutical research by using deep learning to predict protein folding and drug interactions. This system has accelerated early-stage drug discovery from years to weeks by identifying promising molecular compounds for specific therapeutic targets.",
      imageUrl: "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80",
      demoUrl: "https://example.com/biosynthesis",
      technologies: ["AlphaFold", "Molecular Dynamics", "Python", "CUDA"]
    },
    {
      title: "NeuroScript: AI Screenwriting Assistant",
      description: "Creative collaboration tool that helps screenwriters develop compelling narratives, characters, and dialogue. Unlike general text generators, NeuroScript understands narrative structure, pacing, and character arcs specific to visual storytelling media.",
      imageUrl: "https://images.unsplash.com/photo-1485846234645-a62644f84728?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80",
      demoUrl: "https://example.com/neuroscript",
      technologies: ["GPT Architecture", "Narrative AI", "React", "NLP"]
    },
    {
      title: "ClimateForecaster: AI Weather Prediction",
      description: "High-precision climate modeling system that combines satellite imagery, historical data, and physics-based simulations to predict weather patterns and climate trends with unprecedented accuracy, helping communities prepare for extreme weather events.",
      imageUrl: "https://images.unsplash.com/photo-1527482797697-8795b05a13fe?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80",
      demoUrl: "https://example.com/climate-forecaster",
      technologies: ["Graphcast", "Physics-informed Neural Networks", "Python", "D3.js"]
    },
    {
      title: "LanguageBridge: Real-time Neural Translation",
      description: "Breakthrough in multilingual communication that enables natural, bidirectional conversation across 95+ languages with near-native fluency. Features voice cloning to maintain speaker identity across languages and cultural context adaptation.",
      imageUrl: "https://images.unsplash.com/photo-1516321497487-e288fb19713f?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80",
      demoUrl: "https://example.com/language-bridge",
      technologies: ["Transformer Models", "Voice Synthesis", "WebRTC", "Cultural NLP"]
    },
    {
      title: "SonicSculptor: AI Audio Enhancement",
      description: "Professional-grade audio processing system that can isolate voices, remove background noise, enhance clarity, and even reconstruct damaged audio recordings. Uses specialized neural networks trained on vast audio datasets to achieve studio-quality results.",
      imageUrl: "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80",
      demoUrl: "https://example.com/sonic-sculptor",
      technologies: ["Audio Neural Networks", "DSP", "WebAssembly", "Spectral Analysis"]
    },
    {
      title: "EcoSentinel: Environmental Monitoring AI",
      description: "Combines satellite imagery, sensor networks, and predictive models to monitor ecosystems for signs of deforestation, pollution, and biodiversity changes. Provides early warning systems for environmental threats and validates conservation efforts.",
      imageUrl: "https://images.unsplash.com/photo-1586170737883-7d3a6c3cb06a?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80",
      demoUrl: "https://example.com/ecosentinel",
      technologies: ["Computer Vision", "Satellite Imagery", "IoT Integration", "GeoAI"]
    },
    {
      title: "TactileTech: Haptic Feedback Simulation",
      description: "Revolutionary system that creates realistic tactile sensations in virtual environments by combining AI-driven physics simulations with advanced haptic hardware. Enables users to feel textures, resistance, and physical properties of virtual objects.",
      imageUrl: "https://images.unsplash.com/photo-1593508512255-86ab42a8e620?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80",
      demoUrl: "https://example.com/tactile-tech",
      technologies: ["Physics Simulation", "Neural Haptics", "WebXR", "C++"]
    }
  ];

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

  console.log("AI Works seeding completed!");
}

// Run the seeding function
seedAiWorks().catch(console.error);