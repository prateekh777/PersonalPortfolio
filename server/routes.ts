import express, { type Express } from "express";
import { createServer, type Server } from "http";
import { contactFormSchema, sendContactEmail } from "./email";
import fs from "fs";
import path from "path";

// Create a function to load static JSON data
function loadJsonData(filename: string) {
  try {
    const dataPath = path.join(process.cwd(), 'data-export', filename);
    if (fs.existsSync(dataPath)) {
      const data = fs.readFileSync(dataPath, 'utf-8');
      return JSON.parse(data);
    }
    return [];
  } catch (error) {
    console.error(`Error loading ${filename}:`, error);
    return [];
  }
}

export async function registerRoutes(app: Express): Promise<Server> {
  const httpServer = createServer(app);

  // Health check endpoint for monitoring
  app.get("/api/health", async (req, res) => {
    res.status(200).json({
      status: "ok",
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      email: process.env.SENDGRID_API_KEY ? 'configured' : 'not_configured'
    });
  });

  // Data endpoints that load directly from JSON files
  app.get("/api/projects", (req, res) => {
    const projects = loadJsonData('projects.json');
    res.json(projects);
  });

  app.get("/api/interests", (req, res) => {
    const interests = loadJsonData('interests.json');
    res.json(interests);
  });

  app.get("/api/ai-works", (req, res) => {
    const aiWorks = loadJsonData('ai-works.json');
    res.json(aiWorks);
  });

  // Contact form - Only API endpoint we're keeping
  app.post("/api/contact", async (req, res) => {
    try {
      // Validate the request body
      const contactData = contactFormSchema.parse(req.body);
      
      // Send the email
      const success = await sendContactEmail(contactData);
      
      if (success) {
        res.json({ 
          success: true, 
          message: "Your message has been sent. I'll get back to you soon!" 
        });
      } else {
        res.status(500).json({ 
          success: false, 
          message: "Failed to send your message. Please try again later." 
        });
      }
    } catch (error) {
      console.error("Contact form error:", error);
      res.status(400).json({ 
        success: false, 
        message: "Invalid form data. Please check your inputs and try again." 
      });
    }
  });

  return httpServer;
}
