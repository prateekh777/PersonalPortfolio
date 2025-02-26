import { Project } from "@/types/project";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ExternalLink } from "lucide-react";
import { motion } from "framer-motion";

interface ProjectSectionProps {
  project: Project;
  index: number;
}

export function ProjectSection({ project, index }: ProjectSectionProps) {
  const isEven = index % 2 === 0;
  const position = project.position || (isEven ? "left" : "right");
  const isLeft = position === "left";

  const fadeInVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.6,
        delay: 0.1 * index
      }
    }
  };

  const handleOpenProject = () => {
    if (project.projectUrl) {
      window.open(project.projectUrl, "_blank");
    }
  };

  return (
    <motion.div 
      className="grid grid-cols-1 gap-12 py-16 md:grid-cols-2 md:items-center"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={fadeInVariants}
    >
      {isLeft ? (
        <>
          <div className="order-2 space-y-6 md:order-1">
            <div>
              <h2 className="mb-2 text-3xl font-bold tracking-tight">{project.title}</h2>
              {project.subtitle && (
                <p className="text-xl text-muted-foreground">{project.subtitle}</p>
              )}
            </div>
            <p className="text-muted-foreground">{project.description}</p>
            <div className="flex flex-wrap gap-2">
              {project.tags?.map((tag) => (
                <Badge key={tag} variant="secondary">{tag}</Badge>
              ))}
            </div>
            {project.projectUrl && (
              <Button 
                onClick={handleOpenProject} 
                className="relative px-6 py-3 text-gray-900 bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg overflow-hidden transition-all duration-300 hover:shadow-lg hover:scale-105 group"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent transform translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
                <div className="relative flex items-center space-x-2">
                  <ExternalLink className="h-4 w-4 transform group-hover:rotate-12 transition-transform duration-300" />
                  <span className="font-medium">View Project</span>
                </div>
              </Button>
            )}
          </div>
          <div className="order-1 md:order-2">
            {project.imageUrl ? (
              <img 
                src={project.imageUrl} 
                alt={project.title} 
                className="h-auto w-full rounded-lg object-cover shadow-lg"
              />
            ) : null}
          </div>
        </>
      ) : (
        <>
          <div className="order-1">
            {project.imageUrl ? (
              <img 
                src={project.imageUrl} 
                alt={project.title} 
                className="h-auto w-full rounded-lg object-cover shadow-lg"
              />
            ) : null}
          </div>
          <div className="order-2 space-y-6">
            <div>
              <h2 className="mb-2 text-3xl font-bold tracking-tight">{project.title}</h2>
              {project.subtitle && (
                <p className="text-xl text-muted-foreground">{project.subtitle}</p>
              )}
            </div>
            <p className="text-muted-foreground">{project.description}</p>
            <div className="flex flex-wrap gap-2">
              {project.tags?.map((tag) => (
                <Badge key={tag} variant="secondary">{tag}</Badge>
              ))}
            </div>
            {project.projectUrl && (
              <Button 
                onClick={handleOpenProject} 
                className="relative px-6 py-3 text-gray-900 bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg overflow-hidden transition-all duration-300 hover:shadow-lg hover:scale-105 group"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent transform translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
                <div className="relative flex items-center space-x-2">
                  <ExternalLink className="h-4 w-4 transform group-hover:rotate-12 transition-transform duration-300" />
                  <span className="font-medium">View Project</span>
                </div>
              </Button>
            )}
          </div>
        </>
      )}
    </motion.div>
  );
}