import { z } from "zod";

// Define MongoDB Schema types using Zod

// Section Schema
export const sectionSchema = z.object({
  id: z.string(),
  title: z.string(),
  content: z.string(),
  type: z.string(), // home, expertise, etc.
  order: z.number(),
  mediaUrls: z.array(z.string()).default([]),
  stats: z.array(z.object({ label: z.string(), value: z.string() })).default([]),
});

export const insertSectionSchema = sectionSchema.omit({ id: true });

// Project Schema
export const projectSchema = z.object({
  id: z.string(),
  title: z.string(),
  subtitle: z.string().optional(),
  description: z.string(),
  imageUrl: z.string().optional(),
  projectUrl: z.string().optional(),
  tags: z.array(z.string()).default([]),
  position: z.string().default("left"), // Can be "left" or "right" to indicate image position
});

export const insertProjectSchema = projectSchema.omit({ id: true });

// Case Study Schema
export const caseStudySchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
  imageUrl: z.string().optional(),
  outcome: z.string().optional(),
  technologies: z.array(z.string()).default([]),
});

export const insertCaseStudySchema = caseStudySchema.omit({ id: true });

// AI Works Schema
export const aiWorkSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
  imageUrl: z.string().optional(),
  mediaType: z.string().default("image"),
  demoUrl: z.string().optional(),
  technologies: z.array(z.string()).default([]),
});

export const insertAiWorkSchema = aiWorkSchema.omit({ id: true });

// Interests Schema
export const interestSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
  mediaUrl: z.string(),
  mediaType: z.string().default("image"), // "image" or "video"
  category: z.string(),
});

export const insertInterestSchema = interestSchema.omit({ id: true });

// Export Types for use throughout the application
export type Section = z.infer<typeof sectionSchema>;
export type InsertSection = z.infer<typeof insertSectionSchema>;

export type Project = z.infer<typeof projectSchema>;
export type InsertProject = z.infer<typeof insertProjectSchema>;

export type CaseStudy = z.infer<typeof caseStudySchema>;
export type InsertCaseStudy = z.infer<typeof insertCaseStudySchema>;

export type AiWork = z.infer<typeof aiWorkSchema>;
export type InsertAiWork = z.infer<typeof insertAiWorkSchema>;

export type Interest = z.infer<typeof interestSchema>;
export type InsertInterest = z.infer<typeof insertInterestSchema>;