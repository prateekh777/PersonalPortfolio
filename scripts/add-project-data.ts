import { storage } from "../server/storage";

async function seedProjects() {
  console.log("Seeding projects data...");

  const projects = [
    {
      title: "E-Commerce Platform",
      subtitle: "Modern shopping experience",
      description: "A fully-featured e-commerce platform with secure payments, product management, and customer analytics. Built with React, Node.js, and PostgreSQL.",
      imageUrl: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?q=80&w=2340&auto=format&fit=crop",
      projectUrl: "https://example.com/ecommerce",
      tags: ["React", "Node.js", "PostgreSQL", "Stripe"],
      position: "left",
    },
    {
      title: "Health & Fitness App",
      subtitle: "Personal wellness tracker",
      description: "Mobile application for tracking fitness goals, nutrition, and daily health metrics. Features include workout routines, meal planning, and progress visualization.",
      imageUrl: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?q=80&w=2340&auto=format&fit=crop",
      projectUrl: "https://example.com/fitness",
      tags: ["React Native", "Firebase", "Health API", "Redux"],
      position: "right",
    },
    {
      title: "Smart Home Dashboard",
      subtitle: "IoT control center",
      description: "Centralized dashboard for managing smart home devices, automations, and energy usage. Integrates with popular IoT ecosystems for seamless control of your connected home.",
      imageUrl: "https://images.unsplash.com/photo-1558002038-1055e2e28ed1?q=80&w=2342&auto=format&fit=crop",
      projectUrl: "https://example.com/smarthome",
      tags: ["IoT", "Vue.js", "MQTT", "WebSockets"],
      position: "left",
    }
  ];

  // Add each project to the database
  for (const project of projects) {
    await storage.createProject(project);
  }

  console.log("Projects seeding completed!");
}

seedProjects()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("Error seeding projects:", error);
    process.exit(1);
  });