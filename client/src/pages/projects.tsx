import { useQuery } from "@tanstack/react-query";
import { type Project } from "@shared/schema";
import { Skeleton } from "@/components/ui/skeleton";
import { ProjectSection } from "@/components/sections/ProjectSection";
import { motion } from "framer-motion";

export default function Projects() {
  const { data: projects, isLoading } = useQuery<Project[]>({
    queryKey: ["/api/projects"],
  });

  if (isLoading) {
    return (
      <div className="space-y-12">
        <Skeleton className="h-[50px] w-1/3" />
        <div className="space-y-16">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            <Skeleton className="h-[300px]" />
            <Skeleton className="h-[300px]" />
          </div>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            <Skeleton className="h-[300px]" />
            <Skeleton className="h-[300px]" />
          </div>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            <Skeleton className="h-[300px]" />
            <Skeleton className="h-[300px]" />
          </div>
        </div>
      </div>
    );
  }

  // If no projects exist, create some sample projects
  const sampleProjects = projects?.length ? projects : [
    {
      id: 1,
      title: "E-Commerce Platform",
      subtitle: "Modern shopping experience",
      description: "A fully-featured e-commerce platform with secure payments, product management, and customer analytics. Built with React, Node.js, and PostgreSQL.",
      imageUrl: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?q=80&w=2340&auto=format&fit=crop",
      projectUrl: "https://example.com/ecommerce",
      tags: ["React", "Node.js", "PostgreSQL", "Stripe"],
      position: "left",
    },
    {
      id: 2,
      title: "Health & Fitness App",
      subtitle: "Personal wellness tracker",
      description: "Mobile application for tracking fitness goals, nutrition, and daily health metrics. Features include workout routines, meal planning, and progress visualization.",
      imageUrl: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?q=80&w=2340&auto=format&fit=crop",
      projectUrl: "https://example.com/fitness",
      tags: ["React Native", "Firebase", "Health API", "Redux"],
      position: "right",
    },
    {
      id: 3,
      title: "Smart Home Dashboard",
      subtitle: "IoT control center",
      description: "Centralized dashboard for managing smart home devices, automations, and energy usage. Integrates with popular IoT ecosystems for seamless control of your connected home.",
      imageUrl: "https://images.unsplash.com/photo-1558002038-1055e2e28ed1?q=80&w=2342&auto=format&fit=crop",
      projectUrl: "https://example.com/smarthome",
      tags: ["IoT", "Vue.js", "MQTT", "WebSockets"],
      position: "left",
    }
  ];

  const displayProjects = projects?.length ? projects : sampleProjects;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.3,
        duration: 0.6
      }
    }
  };

  const titleVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  return (
    <motion.div 
      className="container mx-auto max-w-6xl space-y-12 py-16"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <motion.div variants={titleVariants}>
        <h1 className="text-4xl font-bold">Projects</h1>
        <p className="mt-4 text-xl text-muted-foreground">Discover our innovative solutions and case studies</p>
      </motion.div>
      
      <div className="space-y-16 divide-y divide-border">
        {displayProjects.map((project, index) => (
          <ProjectSection 
            key={project.id} 
            project={project} 
            index={index} 
          />
        ))}
      </div>
    </motion.div>
  );
}
