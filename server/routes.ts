import express, { type Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertSectionSchema, insertProjectSchema, insertCaseStudySchema, insertAiWorkSchema, insertInterestSchema } from "@shared/schema";
import { contactFormSchema, sendContactEmail } from "./email";

export async function registerRoutes(app: Express): Promise<Server> {
  const httpServer = createServer(app);

  // Sections
  app.get("/api/sections/:type", async (req, res) => {
    const sections = await storage.getSections(req.params.type);
    res.json(sections);
  });

  app.post("/api/sections", async (req, res) => {
    const parsed = insertSectionSchema.parse(req.body);
    const section = await storage.createSection(parsed);
    res.json(section);
  });

  app.patch("/api/sections/:id", async (req, res) => {
    const id = parseInt(req.params.id);
    const section = await storage.updateSection(id, req.body);
    res.json(section);
  });

  app.delete("/api/sections/:id", async (req, res) => {
    const id = parseInt(req.params.id);
    await storage.deleteSection(id);
    res.status(204).end();
  });

  // Projects
  app.get("/api/projects", async (req, res) => {
    const projects = await storage.getProjects();
    res.json(projects);
  });

  app.post("/api/projects", async (req, res) => {
    const parsed = insertProjectSchema.parse(req.body);
    const project = await storage.createProject(parsed);
    res.json(project);
  });

  app.patch("/api/projects/:id", async (req, res) => {
    const id = parseInt(req.params.id);
    const project = await storage.updateProject(id, req.body);
    res.json(project);
  });

  app.delete("/api/projects/:id", async (req, res) => {
    const id = parseInt(req.params.id);
    await storage.deleteProject(id);
    res.status(204).end();
  });

  // Case Studies
  app.get("/api/case-studies", async (req, res) => {
    const caseStudies = await storage.getCaseStudies();
    res.json(caseStudies);
  });

  app.post("/api/case-studies", async (req, res) => {
    const parsed = insertCaseStudySchema.parse(req.body);
    const caseStudy = await storage.createCaseStudy(parsed);
    res.json(caseStudy);
  });

  app.patch("/api/case-studies/:id", async (req, res) => {
    const id = parseInt(req.params.id);
    const caseStudy = await storage.updateCaseStudy(id, req.body);
    res.json(caseStudy);
  });

  app.delete("/api/case-studies/:id", async (req, res) => {
    const id = parseInt(req.params.id);
    await storage.deleteCaseStudy(id);
    res.status(204).end();
  });

  // AI Works
  app.get("/api/ai-works", async (req, res) => {
    const aiWorks = await storage.getAiWorks();
    res.json(aiWorks);
  });

  app.post("/api/ai-works", async (req, res) => {
    const parsed = insertAiWorkSchema.parse(req.body);
    const aiWork = await storage.createAiWork(parsed);
    res.json(aiWork);
  });

  app.patch("/api/ai-works/:id", async (req, res) => {
    const id = parseInt(req.params.id);
    const aiWork = await storage.updateAiWork(id, req.body);
    res.json(aiWork);
  });

  app.delete("/api/ai-works/:id", async (req, res) => {
    const id = parseInt(req.params.id);
    await storage.deleteAiWork(id);
    res.status(204).end();
  });

  // Interests
  app.get("/api/interests", async (req, res) => {
    const interests = await storage.getInterests();
    res.json(interests);
  });

  app.post("/api/interests", async (req, res) => {
    const parsed = insertInterestSchema.parse(req.body);
    const interest = await storage.createInterest(parsed);
    res.json(interest);
  });

  app.patch("/api/interests/:id", async (req, res) => {
    const id = parseInt(req.params.id);
    const interest = await storage.updateInterest(id, req.body);
    res.json(interest);
  });

  app.delete("/api/interests/:id", async (req, res) => {
    const id = parseInt(req.params.id);
    await storage.deleteInterest(id);
    res.status(204).end();
  });

  // Contact form
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
