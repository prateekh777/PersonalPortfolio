import { 
  sections, projects, caseStudies, aiWorks, interests, frames,
  type Section, type InsertSection,
  type Project, type InsertProject,
  type CaseStudy, type InsertCaseStudy,
  type AiWork, type InsertAiWork,
  type Interest, type InsertInterest,
  type Frame, type InsertFrame
} from "@shared/schema";

export interface IStorage {
  // Sections
  getSections(type: string): Promise<Section[]>;
  createSection(section: InsertSection): Promise<Section>;
  updateSection(id: number, section: Partial<InsertSection>): Promise<Section>;
  deleteSection(id: number): Promise<void>;

  // Frames
  getFrames(sectionId: number): Promise<Frame[]>;
  createFrame(frame: InsertFrame): Promise<Frame>;
  updateFrame(id: number, frame: Partial<InsertFrame>): Promise<Frame>;
  deleteFrame(id: number): Promise<void>;

  // Projects
  getProjects(): Promise<Project[]>;
  createProject(project: InsertProject): Promise<Project>;
  updateProject(id: number, project: Partial<InsertProject>): Promise<Project>;
  deleteProject(id: number): Promise<void>;

  // Case Studies
  getCaseStudies(): Promise<CaseStudy[]>;
  createCaseStudy(caseStudy: InsertCaseStudy): Promise<CaseStudy>;
  updateCaseStudy(id: number, caseStudy: Partial<InsertCaseStudy>): Promise<CaseStudy>;
  deleteCaseStudy(id: number): Promise<void>;

  // AI Works
  getAiWorks(): Promise<AiWork[]>;
  createAiWork(aiWork: InsertAiWork): Promise<AiWork>;
  updateAiWork(id: number, aiWork: Partial<InsertAiWork>): Promise<AiWork>;
  deleteAiWork(id: number): Promise<void>;

  // Interests
  getInterests(): Promise<Interest[]>;
  createInterest(interest: InsertInterest): Promise<Interest>;
  updateInterest(id: number, interest: Partial<InsertInterest>): Promise<Interest>;
  deleteInterest(id: number): Promise<void>;
}

export class MemStorage implements IStorage {
  private sections: Map<number, Section>;
  private projects: Map<number, Project>;
  private caseStudies: Map<number, CaseStudy>;
  private aiWorks: Map<number, AiWork>;
  private interests: Map<number, Interest>;
  private frames: Map<number, Frame>;
  private currentId: number;

  constructor() {
    this.sections = new Map();
    this.projects = new Map();
    this.caseStudies = new Map();
    this.aiWorks = new Map();
    this.interests = new Map();
    this.frames = new Map();
    this.currentId = 1;
  }

  // Sections
  async getSections(type: string): Promise<Section[]> {
    return Array.from(this.sections.values())
      .filter(section => section.type === type)
      .sort((a, b) => a.order - b.order);
  }

  async createSection(section: InsertSection): Promise<Section> {
    const id = this.currentId++;
    const newSection: Section = { 
      ...section, 
      id,
      mediaUrls: section.mediaUrls || [],
      stats: section.stats || null,
      layout: section.layout || { columns: 12, rows: 1, gap: 16, padding: 24 }
    };
    this.sections.set(id, newSection);
    return newSection;
  }

  async updateSection(id: number, section: Partial<InsertSection>): Promise<Section> {
    const existing = this.sections.get(id);
    if (!existing) throw new Error('Section not found');
    const updated = { ...existing, ...section };
    this.sections.set(id, updated);
    return updated;
  }

  async deleteSection(id: number): Promise<void> {
    this.sections.delete(id);
    // Delete all frames associated with this section
    const framesToDelete = Array.from(this.frames.values())
      .filter(frame => frame.sectionId === id)
      .map(frame => frame.id);
    framesToDelete.forEach(frameId => this.frames.delete(frameId));
  }

  // Frames
  async getFrames(sectionId: number): Promise<Frame[]> {
    return Array.from(this.frames.values())
      .filter(frame => frame.sectionId === sectionId)
      .sort((a, b) => a.zIndex - b.zIndex);
  }

  async createFrame(frame: InsertFrame): Promise<Frame> {
    const id = this.currentId++;
    const newFrame: Frame = {
      ...frame,
      id,
      x: frame.x ?? 0,
      y: frame.y ?? 0,
      width: frame.width ?? 100,
      height: frame.height ?? 100,
      zIndex: frame.zIndex ?? 0,
      isResponsive: frame.isResponsive ?? true,
      responsiveRules: frame.responsiveRules || [],
      content: frame.content || { text: '', styles: {} }
    };
    this.frames.set(id, newFrame);
    return newFrame;
  }

  async updateFrame(id: number, frame: Partial<InsertFrame>): Promise<Frame> {
    const existing = this.frames.get(id);
    if (!existing) throw new Error('Frame not found');
    const updated = { ...existing, ...frame };
    this.frames.set(id, updated);
    return updated;
  }

  async deleteFrame(id: number): Promise<void> {
    this.frames.delete(id);
  }

  // Projects
  async getProjects(): Promise<Project[]> {
    return Array.from(this.projects.values());
  }

  async createProject(project: InsertProject): Promise<Project> {
    const id = this.currentId++;
    const newProject: Project = {
      ...project,
      id,
      imageUrl: project.imageUrl || null,
      projectUrl: project.projectUrl || null,
      tags: project.tags || null
    };
    this.projects.set(id, newProject);
    return newProject;
  }

  async updateProject(id: number, project: Partial<InsertProject>): Promise<Project> {
    const existing = this.projects.get(id);
    if (!existing) throw new Error('Project not found');
    const updated = { ...existing, ...project };
    this.projects.set(id, updated);
    return updated;
  }

  async deleteProject(id: number): Promise<void> {
    this.projects.delete(id);
  }

  // Case Studies
  async getCaseStudies(): Promise<CaseStudy[]> {
    return Array.from(this.caseStudies.values());
  }

  async createCaseStudy(caseStudy: InsertCaseStudy): Promise<CaseStudy> {
    const id = this.currentId++;
    const newCaseStudy: CaseStudy = {
      ...caseStudy,
      id,
      imageUrl: caseStudy.imageUrl || null,
      outcome: caseStudy.outcome || null,
      technologies: caseStudy.technologies || null
    };
    this.caseStudies.set(id, newCaseStudy);
    return newCaseStudy;
  }

  async updateCaseStudy(id: number, caseStudy: Partial<InsertCaseStudy>): Promise<CaseStudy> {
    const existing = this.caseStudies.get(id);
    if (!existing) throw new Error('Case study not found');
    const updated = { ...existing, ...caseStudy };
    this.caseStudies.set(id, updated);
    return updated;
  }

  async deleteCaseStudy(id: number): Promise<void> {
    this.caseStudies.delete(id);
  }

  // AI Works
  async getAiWorks(): Promise<AiWork[]> {
    return Array.from(this.aiWorks.values());
  }

  async createAiWork(aiWork: InsertAiWork): Promise<AiWork> {
    const id = this.currentId++;
    const newAiWork: AiWork = {
      ...aiWork,
      id,
      imageUrl: aiWork.imageUrl || null,
      technologies: aiWork.technologies || null,
      demoUrl: aiWork.demoUrl || null
    };
    this.aiWorks.set(id, newAiWork);
    return newAiWork;
  }

  async updateAiWork(id: number, aiWork: Partial<InsertAiWork>): Promise<AiWork> {
    const existing = this.aiWorks.get(id);
    if (!existing) throw new Error('AI work not found');
    const updated = { ...existing, ...aiWork };
    this.aiWorks.set(id, updated);
    return updated;
  }

  async deleteAiWork(id: number): Promise<void> {
    this.aiWorks.delete(id);
  }

  // Interests
  async getInterests(): Promise<Interest[]> {
    return Array.from(this.interests.values());
  }

  async createInterest(interest: InsertInterest): Promise<Interest> {
    const id = this.currentId++;
    const newInterest: Interest = {
      ...interest,
      id,
      imageUrl: interest.imageUrl || null
    };
    this.interests.set(id, newInterest);
    return newInterest;
  }

  async updateInterest(id: number, interest: Partial<InsertInterest>): Promise<Interest> {
    const existing = this.interests.get(id);
    if (!existing) throw new Error('Interest not found');
    const updated = { ...existing, ...interest };
    this.interests.set(id, updated);
    return updated;
  }

  async deleteInterest(id: number): Promise<void> {
    this.interests.delete(id);
  }
}

export const storage = new MemStorage();