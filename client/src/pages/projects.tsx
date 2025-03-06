import { useEffect } from "react";
import { ProjectSection } from "@/components/sections/ProjectSection";
import { motion } from "framer-motion";

import { Project } from "@/types/project";

export default function Projects() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  // Static project data
  const projects: Project[] = [
    {
      id: 1,
      title: "Edoflip",
      subtitle: "1:1 Live Tutoring for Smarter Learning",
      description:
        "Edoflip is a platform for personalized tutoring that helps students excel. With expert tutors and tailored learning plans, we’ve helped thousands of students in the US and EU boost their confidence, improve grades, and achieve academic success—one session at a time",
      imageUrl:
        "/images/Edoflip Large Image.png?q=80&w=2342&auto=format&fit=crop",
      projectUrl: "https://example.com/ecommerce",
      tags: ["React", "Node.js", "PostgreSQL", "Stripe"],
      position: "left",
    },
    {
      id: 2,
      title: "🎵 Singalala ",
      subtitle: "Custom Songs for Life’s Special Moments",
      description:
        "Singalala turns emotions into melodies—personalized songs crafted for birthdays, weddings, and unforgettable celebrations. A unique blend of music, technology, and storytelling.",
      imageUrl:
        "/images/Singalala Large Image.png?q=80&w=2342&auto=format&fit=crop",
      projectUrl: "https://www.singalala.com",
      tags: ["React Native", "PlanetScale", "Music API", "AWS S2"],
      position: "right",
    },
    {
      id: 3,
      title: "⚡ Greetude Energy",
      subtitle: "Smart Solar Solutions for a Sustainable Future",
      description:
        "Greetude Energy made clean energy more accessible and efficient. By combining advanced technology with intelligent energy management, we’ve helped homes and businesses reduce costs, lower carbon footprints, and embrace a greener future.",
      imageUrl:
        "/images/Greetude Large Image.png?q=80&w=2342&auto=format&fit=crop",
      projectUrl: "https://example.com/smarthome",
      tags: ["IoT", "Edge Computing", "Security Protocols", "WebSockets"],
      position: "left",
    },
  ];

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
        {projects.map((project, index) => (
          <ProjectSection key={project.id} project={project} index={index} />
        ))}
      </div>
    </motion.div>
  );
}
