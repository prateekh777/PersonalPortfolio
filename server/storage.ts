
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
    return sections.map(section => {
      // Create a properly typed object with all required fields
      const typedSection: Section = {
        id: section._id.toString(),
        title: section.title || '',
        content: section.content || '',
        type: section.type || '',
        order: section.order || 0,
        mediaUrls: section.mediaUrls || [],
        stats: section.stats || []
      };
      return typedSection;
    });
  }

  async createSection(section: InsertSection): Promise<Section> {
    await this.connect();
    const result = await this.sectionsCollection.insertOne(section);
    return {
      ...section,
      id: result.insertedId.toString()
    } as Section;
  }

  async updateSection(id: string, section: Partial<InsertSection>): Promise<Section> {
    await this.connect();
    const result = await this.sectionsCollection.findOneAndUpdate(
      { _id: new ObjectId(id) },
      { $set: section },
      { returnDocument: 'after' }
    );
    if (!result) throw new Error('Section not found');
    
    // Create a properly typed object with all required fields
    const typedSection: Section = {
      id: result._id.toString(),
      title: result.title || '',
      content: result.content || '',
      type: result.type || '',
      order: result.order || 0,
      mediaUrls: result.mediaUrls || [],
      stats: result.stats || []
    };
    return typedSection;
  }

  async deleteSection(id: string): Promise<void> {
    await this.connect();
    await this.sectionsCollection.deleteOne({ _id: new ObjectId(id) });
  }

  // Projects
  async getProjects(): Promise<Project[]> {
    await this.connect();
    const projects = await this.projectsCollection.find().toArray();
    return projects.map(project => {
      // Create a properly typed object with all required fields
      const typedProject: Project = {
        id: project._id.toString(),
        title: project.title || '',
        description: project.description || '',
        tags: project.tags || [],
        position: project.position || 'left',
        subtitle: project.subtitle,
        imageUrl: project.imageUrl,
        projectUrl: project.projectUrl
      };
      return typedProject;
    });
  }

  async createProject(project: InsertProject): Promise<Project> {
    await this.connect();
    const result = await this.projectsCollection.insertOne(project);
    return {
      ...project,
      id: result.insertedId.toString()
    } as Project;
  }

  async updateProject(id: string, project: Partial<InsertProject>): Promise<Project> {
    await this.connect();
    const result = await this.projectsCollection.findOneAndUpdate(
      { _id: new ObjectId(id) },
      { $set: project },
      { returnDocument: 'after' }
    );
    if (!result) throw new Error('Project not found');
    
    // Create a properly typed object with all required fields
    const typedProject: Project = {
      id: result._id.toString(),
      title: result.title || '',
      description: result.description || '',
      tags: result.tags || [],
      position: result.position || 'left',
      subtitle: result.subtitle,
      imageUrl: result.imageUrl,
      projectUrl: result.projectUrl
    };
    return typedProject;
  }

  async deleteProject(id: string): Promise<void> {
    await this.connect();
    await this.projectsCollection.deleteOne({ _id: new ObjectId(id) });
  }

  // Case Studies
  async getCaseStudies(): Promise<CaseStudy[]> {
    await this.connect();
    const caseStudies = await this.caseStudiesCollection.find().toArray();
    return caseStudies.map(caseStudy => {
      // Create a properly typed object with all required fields
      const typedCaseStudy: CaseStudy = {
        id: caseStudy._id.toString(),
        title: caseStudy.title || '',
        description: caseStudy.description || '',
        technologies: caseStudy.technologies || [],
        imageUrl: caseStudy.imageUrl,
        outcome: caseStudy.outcome
      };
      return typedCaseStudy;
    });
  }

  async createCaseStudy(caseStudy: InsertCaseStudy): Promise<CaseStudy> {
    await this.connect();
    const result = await this.caseStudiesCollection.insertOne(caseStudy);
    return {
      ...caseStudy,
      id: result.insertedId.toString()
    } as CaseStudy;
  }

  async updateCaseStudy(id: string, caseStudy: Partial<InsertCaseStudy>): Promise<CaseStudy> {
    await this.connect();
    const result = await this.caseStudiesCollection.findOneAndUpdate(
      { _id: new ObjectId(id) },
      { $set: caseStudy },
      { returnDocument: 'after' }
    );
    if (!result) throw new Error('Case study not found');
    
    // Create a properly typed object with all required fields
    const typedCaseStudy: CaseStudy = {
      id: result._id.toString(),
      title: result.title || '',
      description: result.description || '',
      technologies: result.technologies || [],
      imageUrl: result.imageUrl,
      outcome: result.outcome
    };
    
    return typedCaseStudy;
  }

  async deleteCaseStudy(id: string): Promise<void> {
    await this.connect();
    await this.caseStudiesCollection.deleteOne({ _id: new ObjectId(id) });
  }

  // AI Works
  async getAiWorks(): Promise<AiWork[]> {
    await this.connect();
    const aiWorks = await this.aiWorksCollection.find().toArray();
    return aiWorks.map(aiWork => {
      // Create a properly typed object with all required fields
      const typedAiWork: AiWork = {
        id: aiWork._id.toString(),
        title: aiWork.title || '',
        description: aiWork.description || '',
        technologies: aiWork.technologies || [],
        mediaType: aiWork.mediaType || 'image',
        imageUrl: aiWork.imageUrl,
        demoUrl: aiWork.demoUrl
      };
      return typedAiWork;
    });
  }

  async createAiWork(aiWork: InsertAiWork): Promise<AiWork> {
    await this.connect();
    const result = await this.aiWorksCollection.insertOne(aiWork);
    return {
      ...aiWork,
      id: result.insertedId.toString()
    } as AiWork;
  }

  async updateAiWork(id: string, aiWork: Partial<InsertAiWork>): Promise<AiWork> {
    await this.connect();
    const result = await this.aiWorksCollection.findOneAndUpdate(
      { _id: new ObjectId(id) },
      { $set: aiWork },
      { returnDocument: 'after' }
    );
    if (!result) throw new Error('AI work not found');
    
    // Create a properly typed object with all required fields
    const typedAiWork: AiWork = {
      id: result._id.toString(),
      title: result.title || '',
      description: result.description || '',
      technologies: result.technologies || [],
      mediaType: result.mediaType || 'image',
      imageUrl: result.imageUrl,
      demoUrl: result.demoUrl
    };
    
    return typedAiWork;
  }

  async deleteAiWork(id: string): Promise<void> {
    await this.connect();
    await this.aiWorksCollection.deleteOne({ _id: new ObjectId(id) });
  }

  // Interests
  async getInterests(): Promise<Interest[]> {
    await this.connect();
    const interests = await this.interestsCollection.find().toArray();
    return interests.map(interest => {
      // Create a properly typed object with all required fields
      const typedInterest: Interest = {
        id: interest._id.toString(),
        title: interest.title || '',
        description: interest.description || '',
        mediaType: interest.mediaType || 'image',
        mediaUrl: interest.mediaUrl || '',
        category: interest.category || ''
      };
      return typedInterest;
    });
  }

  async createInterest(interest: InsertInterest): Promise<Interest> {
    await this.connect();
    const result = await this.interestsCollection.insertOne(interest);
    return {
      ...interest,
      id: result.insertedId.toString()
    } as Interest;
  }

  async updateInterest(id: string, interest: Partial<InsertInterest>): Promise<Interest> {
    await this.connect();
    const result = await this.interestsCollection.findOneAndUpdate(
      { _id: new ObjectId(id) },
      { $set: interest },
      { returnDocument: 'after' }
    );
    if (!result) throw new Error('Interest not found');
    
    // Create a properly typed object with all required fields
    const typedInterest: Interest = {
      id: result._id.toString(),
      title: result.title || '',
      description: result.description || '',
      mediaType: result.mediaType || 'image',
      mediaUrl: result.mediaUrl || '',
      category: result.category || ''
    };
    
    return typedInterest;
  }

  async deleteInterest(id: string): Promise<void> {
    await this.connect();
    await this.interestsCollection.deleteOne({ _id: new ObjectId(id) });
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
