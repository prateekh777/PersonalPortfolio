
import { 
  sections, projects, caseStudies, aiWorks, interests,
  type Section, type InsertSection,
  type Project, type InsertProject,
  type CaseStudy, type InsertCaseStudy,
  type AiWork, type InsertAiWork,
  type Interest, type InsertInterest
} from "@shared/schema";
import { MongoClient, Collection, ObjectId } from 'mongodb';
import dotenv from 'dotenv';

dotenv.config();

export interface IStorage {
  // Sections
  getSections(type: string): Promise<Section[]>;
  createSection(section: InsertSection): Promise<Section>;
  updateSection(id: number, section: Partial<InsertSection>): Promise<Section>;
  deleteSection(id: number): Promise<void>;

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
  private currentId: number;

  constructor() {
    this.sections = new Map();
    this.projects = new Map();
    this.caseStudies = new Map();
    this.aiWorks = new Map();
    this.interests = new Map();
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
    const newSection = { ...section, id };
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
  }

  // Projects
  async getProjects(): Promise<Project[]> {
    return Array.from(this.projects.values());
  }

  async createProject(project: InsertProject): Promise<Project> {
    const id = this.currentId++;
    const newProject = { ...project, id };
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
    const newCaseStudy = { ...caseStudy, id };
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
    const newAiWork = { ...aiWork, id };
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
    const newInterest = { ...interest, id };
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

export class MongoStorage implements IStorage {
  private client: MongoClient;
  private sectionsCollection: Collection;
  private projectsCollection: Collection;
  private caseStudiesCollection: Collection;
  private aiWorksCollection: Collection;
  private interestsCollection: Collection;
  private isConnected: boolean = false;

  constructor(mongoUri: string) {
    // Add connection options for better reliability with timeout settings
    const options = {
      connectTimeoutMS: 30000, // 30 seconds connection timeout
      socketTimeoutMS: 45000,  // 45 seconds socket timeout
      serverSelectionTimeoutMS: 30000, // 30 seconds server selection timeout
      maxPoolSize: 10, // Maximum number of connections in the connection pool
      retryWrites: true,
      retryReads: true
    };
    
    this.client = new MongoClient(mongoUri, options);
    
    // Initialize collections to empty collections to satisfy TypeScript
    // These will be properly set during connect()
    const db = this.client.db('portfolio');
    this.sectionsCollection = db.collection('sections');
    this.projectsCollection = db.collection('projects');
    this.caseStudiesCollection = db.collection('caseStudies');
    this.aiWorksCollection = db.collection('aiWorks');
    this.interestsCollection = db.collection('interests');
  }

  async connect(): Promise<boolean> {
    if (!this.isConnected) {
      try {
        // Attempt connection with detailed error reporting
        await this.client.connect();
        
        // Get reference to the portfolio database
        const db = this.client.db('portfolio');
        
        // Initialize collections
        this.sectionsCollection = db.collection('sections');
        this.projectsCollection = db.collection('projects');
        this.caseStudiesCollection = db.collection('caseStudies');
        this.aiWorksCollection = db.collection('aiWorks');
        this.interestsCollection = db.collection('interests');
        
        // Connection successful
        this.isConnected = true;
        console.log('Connected to MongoDB');
        
        // Perform a simple test query to verify connection is fully working
        try {
          await this.aiWorksCollection.findOne({});
          console.log('Database connection verified with test query');
        } catch (queryError) {
          console.error('Connected but failed test query:', queryError);
          // We still consider this a successful connection
        }
        
        return true;
      } catch (error: any) {
        // Provide more detailed error information based on error type
        console.error('Failed to connect to MongoDB.');
        
        if (error.name === 'MongoServerSelectionError') {
          console.error('Connection timeout or server selection error:', error.message);
        } else if (error.code === 'ENOTFOUND') {
          console.error('DNS lookup failed - hostname not found:', error.message);
        } else if (error.message && error.message.includes('authentication failed')) {
          console.error('Authentication error - check username and password');
        } else {
          console.error('Error details:', error);
        }
        
        this.isConnected = false;
        return false;
      }
    }
    return this.isConnected;
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

// Create and initialize storage
async function initializeStorage(): Promise<IStorage> {
  const mongoUri = process.env.MONGODB_URI;
  
  if (mongoUri) {
    console.log("MongoDB URI found, attempting to connect to MongoDB...");
    
    const mongoStorage = new MongoStorage(mongoUri);
    
    try {
      // Test connection with a timeout
      const connectionPromise = mongoStorage.connect();
      
      // Create a timeout promise
      const timeoutPromise = new Promise((_, reject) => {
        setTimeout(() => reject(new Error("MongoDB connection timeout after 15 seconds")), 15000);
      });
      
      // Race the connection against the timeout
      const connected = await Promise.race([connectionPromise, timeoutPromise]);
      
      if (connected) {
        console.log("✅ Successfully connected to MongoDB database!");
        return mongoStorage;
      } else {
        console.log("⚠️ MongoDB connection test failed");
        console.log("ℹ️ Falling back to in-memory storage for this session");
        return new MemStorage();
      }
    } catch (error) {
      console.error("❌ Failed to connect to MongoDB:", error);
      console.log("ℹ️ Common MongoDB connection issues:");
      console.log("  • Authentication issues: Check username and password in connection string");
      console.log("  • Network issues: DNS resolution or firewall blocking connections");
      console.log("  • Database name issues: Verify database name in connection string");
      console.log("ℹ️ Using in-memory storage fallback - data will not persist between sessions");
      return new MemStorage();
    }
  } else {
    console.log("ℹ️ No MongoDB URI provided, using in-memory storage");
    console.log("ℹ️ Note: Data will not persist between application restarts");
    return new MemStorage();
  }
}

// Initialize storage with a default to MemStorage until initialization is complete
let storage: IStorage = new MemStorage();

// Immediately start the initialization process
initializeStorage().then(initializedStorage => {
  storage = initializedStorage;
});

// Export the storage that will be updated once initialization is complete
export { storage };
