import { Router } from 'express';
import { storage } from '../storage';
import { insertSectionSchema } from "@shared/schema";
import type { Request, Response } from 'express';

const router = Router();

router.get("/:type", async (req: Request, res: Response) => {
  const sections = await storage.getSections(req.params.type);
  res.json(sections);
});

router.post("/", async (req: Request, res: Response) => {
  const parsed = insertSectionSchema.parse(req.body);
  const section = await storage.createSection(parsed);
  res.json(section);
});

router.patch("/:id", async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const section = await storage.updateSection(id, req.body);
  res.json(section);
});

router.delete("/:id", async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  await storage.deleteSection(id);
  res.status(204).end();
});

export default router; 