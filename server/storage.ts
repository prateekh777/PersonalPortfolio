
import { 
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
  updateSection(id: string, section: Partial<InsertSection>): Promise<Section>;
  deleteSection(id: string): Promise<void>;

  // Projects
  getProjects(): Promise<Project[]>;
  createProject(project: InsertProject): Promise<Project>;
  updateProject(id: string, project: Partial<InsertProject>): Promise<Project>;
  deleteProject(id: string): Promise<void>;

  // Case Studies
  getCaseStudies(): Promise<CaseStudy[]>;
  createCaseStudy(caseStudy: InsertCaseStudy): Promise<CaseStudy>;
  updateCaseStudy(id: string, caseStudy: Partial<InsertCaseStudy>): Promise<CaseStudy>;
  deleteCaseStudy(id: string): Promise<void>;

  // AI Works
  getAiWorks(): Promise<AiWork[]>;
  createAiWork(aiWork: InsertAiWork): Promise<AiWork>;
  updateAiWork(id: string, aiWork: Partial<InsertAiWork>): Promise<AiWork>;
  deleteAiWork(id: string): Promise<void>;

  // Interests
  getInterests(): Promise<Interest[]>;
  createInterest(interest: InsertInterest): Promise<Interest>;
  updateInterest(id: string, interest: Partial<InsertInterest>): Promise<Interest>;
  deleteInterest(id: string): Promise<void>;
}

// MongoDB is our only storage option

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
  
  if (!mongoUri) {
    console.error("MongoDB URI is required but not provided.");
    throw new Error("MongoDB URI is required. Please set the MONGODB_URI environment variable.");
  }
    
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
      console.error("❌ MongoDB connection test failed");
      throw new Error("Failed to connect to MongoDB. Application cannot start without database connection.");
    }
  } catch (error) {
    console.error("❌ Failed to connect to MongoDB:", error);
    console.error("Common MongoDB connection issues:");
    console.error("  • Authentication issues: Check username and password in connection string");
    console.error("  • Network issues: DNS resolution or firewall blocking connections");
    console.error("  • Database name issues: Verify database name in connection string");
    throw new Error("Failed to connect to MongoDB. Application cannot start without database connection.");
  }
}

// Private storage instance
let _storage: IStorage | null = null;

// Function to wait for storage initialization
export async function initializeStorageAndWait(): Promise<void> {
  if (!_storage) {
    console.log("Initializing storage...");
    _storage = await initializeStorage();
    console.log("Storage initialization complete.");
  }
}

// Export a proxy to ensure storage is always initialized before use
export const storage: IStorage = new Proxy({} as IStorage, {
  get: function(target, prop) {
    if (!_storage) {
      throw new Error("Storage accessed before initialization! Call initializeStorageAndWait() first");
    }
    return _storage[prop as keyof IStorage];
  }
});
