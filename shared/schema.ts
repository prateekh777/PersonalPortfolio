import { pgTable, text, serial, integer, json, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const sections = pgTable("sections", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  content: text("content").notNull(),
  type: text("type").notNull(), // home, expertise, etc.
  order: integer("order").notNull(),
  mediaUrls: text("media_urls").array().default([]).notNull(),
  stats: json("stats").$type<{ label: string; value: string }[]>().default([]),
});

export const projects = pgTable("projects", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  imageUrl: text("image_url"),
  projectUrl: text("project_url"),
  tags: json("tags").$type<string[]>().default([]),
});

export const caseStudies = pgTable("case_studies", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  imageUrl: text("image_url"),
  outcome: text("outcome"),
  technologies: json("technologies").$type<string[]>().default([]),
});

export const aiWorks = pgTable("ai_works", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  imageUrl: text("image_url"),
  demoUrl: text("demo_url"),
  technologies: json("technologies").$type<string[]>().default([]),
});

export const interests = pgTable("interests", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  imageUrl: text("image_url"),
  category: text("category").notNull(),
});

// Insert schemas
export const insertSectionSchema = createInsertSchema(sections);
export const insertProjectSchema = createInsertSchema(projects);
export const insertCaseStudySchema = createInsertSchema(caseStudies);
export const insertAiWorkSchema = createInsertSchema(aiWorks);
export const insertInterestSchema = createInsertSchema(interests);

// Types
export type Section = typeof sections.$inferSelect;
export type InsertSection = z.infer<typeof insertSectionSchema>;

export type Project = typeof projects.$inferSelect;
export type InsertProject = z.infer<typeof insertProjectSchema>;

export type CaseStudy = typeof caseStudies.$inferSelect;
export type InsertCaseStudy = z.infer<typeof insertCaseStudySchema>;

export type AiWork = typeof aiWorks.$inferSelect;
export type InsertAiWork = z.infer<typeof insertAiWorkSchema>;

export type Interest = typeof interests.$inferSelect;
export type InsertInterest = z.infer<typeof insertInterestSchema>;