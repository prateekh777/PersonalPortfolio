import { useEffect } from "react";
import { ProjectSection } from "@/components/sections/ProjectSection";
import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";

import { projectsData } from "@/data/mockData";
import { Project } from "@/types/project";

export default function Projects() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  // Use React Query to fetch projects (with mock data)
  const { data: projects = [], isLoading, error } = useQuery({
    queryKey: ['/api/projects'],
    initialData: projectsData.map(project => ({
      ...project,
      id: Number(project.id), // Convert string ID to number
      position: project.id.includes("2") || project.id.includes("4") || project.id.includes("6") ? "right" : "left" // Alternate positions
    }))
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        duration: 0.6,
      },
    },
  };

  const titleVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <motion.div
      className="container mx-auto max-w-6xl space-y-12 py-16"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <motion.div variants={titleVariants}>
        <h1 className="text-4xl flex items=center justify-center font-bold">Projects</h1>
        <p className="mt-4 flex items=center justify-center text-xl text-muted-foreground">
          Discover side hustles that make this world a better place!
        </p>
      </motion.div>

      <div className="space-y-16 divide-y divide-border">
        {isLoading ? (
          <div className="py-10 text-center">Loading projects...</div>
        ) : error ? (
          <div className="py-10 text-center text-red-500">Error loading projects</div>
        ) : (
          projects.map((project: Project, index: number) => (
            <ProjectSection key={project.id} project={project} index={index} />
          ))
        )}
      </div>
    </motion.div>
  );
}