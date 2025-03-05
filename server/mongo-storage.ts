
import { MongoClient, Collection, ObjectId } from 'mongodb';
import { 
  sections, projects, caseStudies, aiWorks, interests,
  type Section, type InsertSection,
  type Project, type InsertProject,
  type CaseStudy, type InsertCaseStudy,
  type AiWork, type InsertAiWork,
  type Interest, type InsertInterest
} from "@shared/schema";

export class MongoStorage implements IStorage {
  private client: MongoClient;
  private sectionsCollection: Collection;
  private projectsCollection: Collection;
  private caseStudiesCollection: Collection;
  private aiWorksCollection: Collection;
  private interestsCollection: Collection;
  private isConnected: boolean = false;

  constructor(mongoUri: string) {
    this.client = new MongoClient(mongoUri);
  }

  async connect() {
    if (!this.isConnected) {
      await this.client.connect();
      const db = this.client.db('portfolio');
      this.sectionsCollection = db.collection('sections');
      this.projectsCollection = db.collection('projects');
      this.caseStudiesCollection = db.collection('caseStudies');
      this.aiWorksCollection = db.collection('aiWorks');
      this.interestsCollection = db.collection('interests');
      this.isConnected = true;
      console.log('Connected to MongoDB');
    }
  }

  // Sections
  async getSections(type: string): Promise<Section[]> {
    await this.connect();
    const sections = await this.sectionsCollection.find({ type }).sort({ order: 1 }).toArray();
    return sections.map(section => ({
      ...section,
      id: section._id.toString(),
      stats: section.stats || []
    })) as Section[];
  }

  async createSection(section: InsertSection): Promise<Section> {
    await this.connect();
    const result = await this.sectionsCollection.insertOne(section);
    return {
      ...section,
      id: result.insertedId.toString()
    } as Section;
  }

  async updateSection(id: number, section: Partial<InsertSection>): Promise<Section> {
    await this.connect();
    const result = await this.sectionsCollection.findOneAndUpdate(
      { _id: new ObjectId(id.toString()) },
      { $set: section },
      { returnDocument: 'after' }
    );
    if (!result) throw new Error('Section not found');
    return {
      ...result,
      id: result._id.toString()
    } as Section;
  }

  async deleteSection(id: number): Promise<void> {
    await this.connect();
    await this.sectionsCollection.deleteOne({ _id: new ObjectId(id.toString()) });
  }

  // Projects
  async getProjects(): Promise<Project[]> {
    await this.connect();
    const projects = await this.projectsCollection.find().toArray();
    return projects.map(project => ({
      ...project,
      id: project._id.toString(),
      tags: project.tags || []
    })) as Project[];
  }

  async createProject(project: InsertProject): Promise<Project> {
    await this.connect();
    const result = await this.projectsCollection.insertOne(project);
    return {
      ...project,
      id: result.insertedId.toString()
    } as Project;
  }

  async updateProject(id: number, project: Partial<InsertProject>): Promise<Project> {
    await this.connect();
    const result = await this.projectsCollection.findOneAndUpdate(
      { _id: new ObjectId(id.toString()) },
      { $set: project },
      { returnDocument: 'after' }
    );
    if (!result) throw new Error('Project not found');
    return {
      ...result,
      id: result._id.toString()
    } as Project;
  }

  async deleteProject(id: number): Promise<void> {
    await this.connect();
    await this.projectsCollection.deleteOne({ _id: new ObjectId(id.toString()) });
  }

  // Case Studies
  async getCaseStudies(): Promise<CaseStudy[]> {
    await this.connect();
    const caseStudies = await this.caseStudiesCollection.find().toArray();
    return caseStudies.map(caseStudy => ({
      ...caseStudy,
      id: caseStudy._id.toString(),
      technologies: caseStudy.technologies || []
    })) as CaseStudy[];
  }

  async createCaseStudy(caseStudy: InsertCaseStudy): Promise<CaseStudy> {
    await this.connect();
    const result = await this.caseStudiesCollection.insertOne(caseStudy);
    return {
      ...caseStudy,
      id: result.insertedId.toString()
    } as CaseStudy;
  }

  async updateCaseStudy(id: number, caseStudy: Partial<InsertCaseStudy>): Promise<CaseStudy> {
    await this.connect();
    const result = await this.caseStudiesCollection.findOneAndUpdate(
      { _id: new ObjectId(id.toString()) },
      { $set: caseStudy },
      { returnDocument: 'after' }
    );
    if (!result) throw new Error('Case study not found');
    return {
      ...result,
      id: result._id.toString()
    } as CaseStudy;
  }

  async deleteCaseStudy(id: number): Promise<void> {
    await this.connect();
    await this.caseStudiesCollection.deleteOne({ _id: new ObjectId(id.toString()) });
  }

  // AI Works
  async getAiWorks(): Promise<AiWork[]> {
    await this.connect();
    const aiWorks = await this.aiWorksCollection.find().toArray();
    return aiWorks.map(aiWork => ({
      ...aiWork,
      id: aiWork._id.toString(),
      technologies: aiWork.technologies || []
    })) as AiWork[];
  }

  async createAiWork(aiWork: InsertAiWork): Promise<AiWork> {
    await this.connect();
    const result = await this.aiWorksCollection.insertOne(aiWork);
    return {
      ...aiWork,
      id: result.insertedId.toString()
    } as AiWork;
  }

  async updateAiWork(id: number, aiWork: Partial<InsertAiWork>): Promise<AiWork> {
    await this.connect();
    const result = await this.aiWorksCollection.findOneAndUpdate(
      { _id: new ObjectId(id.toString()) },
      { $set: aiWork },
      { returnDocument: 'after' }
    );
    if (!result) throw new Error('AI work not found');
    return {
      ...result,
      id: result._id.toString()
    } as AiWork;
  }

  async deleteAiWork(id: number): Promise<void> {
    await this.connect();
    await this.aiWorksCollection.deleteOne({ _id: new ObjectId(id.toString()) });
  }

  // Interests
  async getInterests(): Promise<Interest[]> {
    await this.connect();
    const interests = await this.interestsCollection.find().toArray();
    return interests.map(interest => ({
      ...interest,
      id: interest._id.toString()
    })) as Interest[];
  }

  async createInterest(interest: InsertInterest): Promise<Interest> {
    await this.connect();
    const result = await this.interestsCollection.insertOne(interest);
    return {
      ...interest,
      id: result.insertedId.toString()
    } as Interest;
  }

  async updateInterest(id: number, interest: Partial<InsertInterest>): Promise<Interest> {
    await this.connect();
    const result = await this.interestsCollection.findOneAndUpdate(
      { _id: new ObjectId(id.toString()) },
      { $set: interest },
      { returnDocument: 'after' }
    );
    if (!result) throw new Error('Interest not found');
    return {
      ...result,
      id: result._id.toString()
    } as Interest;
  }

  async deleteInterest(id: number): Promise<void> {
    await this.connect();
    await this.interestsCollection.deleteOne({ _id: new ObjectId(id.toString()) });
  }

  async close() {
    if (this.isConnected) {
      await this.client.close();
      this.isConnected = false;
      console.log('Disconnected from MongoDB');
    }
  }
}
