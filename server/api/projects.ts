import { Router } from 'express';
import { storage } from '../storage';
import { insertProjectSchema } from "@shared/schema";

const router = Router();

router.get("/", async (req, res) => {
  const projects = await storage.getProjects();
  res.json(projects);
});

router.post("/", async (req, res) => {
  const parsed = insertProjectSchema.parse(req.body);
  const project = await storage.createProject(parsed);
  res.json(project);
});

router.patch("/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  const project = await storage.updateProject(id, req.body);
  res.json(project);
});

router.delete("/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  await storage.deleteProject(id);
  res.status(204).end();
});

export default router; 