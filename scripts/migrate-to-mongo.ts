
import { MongoClient } from "mongodb";
import { MemStorage, MongoStorage } from "../server/storage";
import dotenv from 'dotenv';

dotenv.config();

async function migrateToMongo() {
  const mongoUri = process.env.MONGODB_URI;
  if (!mongoUri) {
    console.error("MONGODB_URI environment variable is not set");
    process.exit(1);
  }

  console.log("Starting migration to MongoDB...");
  console.log("Connection string:", mongoUri.replace(/mongodb\+srv:\/\/([^:]+):[^@]+@/, 'mongodb+srv://$1:***@')); // Hide password
  
  // Create memory and MongoDB storage instances
  const memStorage = new MemStorage();
  const mongoStorage = new MongoStorage(mongoUri);

  try {
    // Test MongoDB connection with timeout
    console.log("Testing MongoDB connection...");
    const connectionPromise = mongoStorage.connect();
    const timeoutPromise = new Promise((_, reject) => {
      setTimeout(() => reject(new Error("MongoDB connection timeout after 15 seconds")), 15000);
    });
    
    try {
      await Promise.race([connectionPromise, timeoutPromise]);
      console.log("Successfully connected to MongoDB!");
    } catch (error) {
      console.error("Failed to connect to MongoDB:", error);
      console.log("Migration aborted due to connection issues");
      process.exit(1);
    }
    
    // Check if MongoDB already has data
    const existingAiWorks = await mongoStorage.getAiWorks();
    if (existingAiWorks.length > 0) {
      console.log(`WARNING: MongoDB already contains ${existingAiWorks.length} AI works.`);
      console.log("To avoid duplicates, please clear the MongoDB collections first or run a dedicated sync script.");
      console.log("Migration aborted to prevent data duplication.");
      process.exit(1);
    }
    
    let totalMigrated = 0;
    let totalItems = 0;
    
    // Migrate sections
    console.log("Migrating sections...");
    const homeSections = await memStorage.getSections("home");
    totalItems += homeSections.length;
    
    let homeSectionsMigrated = 0;
    for (const section of homeSections) {
      try {
        await mongoStorage.createSection({
          title: section.title,
          content: section.content,
          type: section.type,
          order: section.order,
          mediaUrls: section.mediaUrls || [],
          stats: section.stats || null
        });
        homeSectionsMigrated++;
        totalMigrated++;
      } catch (error) {
        console.error(`Failed to migrate home section "${section.title}":`, error);
      }
    }
    console.log(`${homeSectionsMigrated} of ${homeSections.length} home sections migrated`);

    const expertiseSections = await memStorage.getSections("expertise");
    totalItems += expertiseSections.length;
    
    let expertiseSectionsMigrated = 0;
    for (const section of expertiseSections) {
      try {
        await mongoStorage.createSection({
          title: section.title,
          content: section.content,
          type: section.type,
          order: section.order,
          mediaUrls: section.mediaUrls || [],
          stats: section.stats || null
        });
        expertiseSectionsMigrated++;
        totalMigrated++;
      } catch (error) {
        console.error(`Failed to migrate expertise section "${section.title}":`, error);
      }
    }
    console.log(`${expertiseSectionsMigrated} of ${expertiseSections.length} expertise sections migrated`);

    // Migrate projects
    console.log("Migrating projects...");
    const projects = await memStorage.getProjects();
    totalItems += projects.length;
    
    let projectsMigrated = 0;
    for (const project of projects) {
      try {
        await mongoStorage.createProject({
          title: project.title,
          subtitle: project.subtitle || null,
          description: project.description,
          imageUrl: project.imageUrl || null,
          projectUrl: project.projectUrl || null,
          tags: project.tags || null,
          position: project.position || null
        });
        projectsMigrated++;
        totalMigrated++;
      } catch (error) {
        console.error(`Failed to migrate project "${project.title}":`, error);
      }
    }
    console.log(`${projectsMigrated} of ${projects.length} projects migrated`);

    // Migrate case studies
    console.log("Migrating case studies...");
    const caseStudies = await memStorage.getCaseStudies();
    totalItems += caseStudies.length;
    
    let caseStudiesMigrated = 0;
    for (const caseStudy of caseStudies) {
      try {
        await mongoStorage.createCaseStudy({
          title: caseStudy.title,
          description: caseStudy.description,
          imageUrl: caseStudy.imageUrl || null,
          outcome: caseStudy.outcome || null,
          technologies: caseStudy.technologies || null
        });
        caseStudiesMigrated++;
        totalMigrated++;
      } catch (error) {
        console.error(`Failed to migrate case study "${caseStudy.title}":`, error);
      }
    }
    console.log(`${caseStudiesMigrated} of ${caseStudies.length} case studies migrated`);

    // Migrate AI works
    console.log("Migrating AI works...");
    const aiWorks = await memStorage.getAiWorks();
    totalItems += aiWorks.length;
    
    let aiWorksMigrated = 0;
    for (const aiWork of aiWorks) {
      try {
        await mongoStorage.createAiWork({
          title: aiWork.title,
          description: aiWork.description,
          imageUrl: aiWork.imageUrl || null,
          mediaType: aiWork.mediaType || null,
          demoUrl: aiWork.demoUrl || null,
          technologies: aiWork.technologies || null
        });
        aiWorksMigrated++;
        totalMigrated++;
      } catch (error) {
        console.error(`Failed to migrate AI work "${aiWork.title}":`, error);
      }
    }
    console.log(`${aiWorksMigrated} of ${aiWorks.length} AI works migrated`);

    // Migrate interests
    console.log("Migrating interests...");
    const interests = await memStorage.getInterests();
    totalItems += interests.length;
    
    let interestsMigrated = 0;
    for (const interest of interests) {
      try {
        await mongoStorage.createInterest({
          title: interest.title,
          description: interest.description,
          mediaUrl: interest.mediaUrl,
          mediaType: interest.mediaType || "image", // Default to image if not specified
          category: interest.category
        });
        interestsMigrated++;
        totalMigrated++;
      } catch (error) {
        console.error(`Failed to migrate interest "${interest.title}":`, error);
      }
    }
    console.log(`${interestsMigrated} of ${interests.length} interests migrated`);

    console.log(`Migration summary: ${totalMigrated} of ${totalItems} items successfully migrated to MongoDB!`);
  } catch (error) {
    console.error("Migration failed:", error);
  } finally {
    try {
      // Close MongoDB connection
      await mongoStorage.close();
      console.log("MongoDB connection closed");
    } catch (err) {
      console.error("Error closing MongoDB connection:", err);
    }
    process.exit(0);
  }
}

// Execute with error handling
migrateToMongo().catch(error => {
  console.error("Unhandled error during migration:", error);
  process.exit(1);
});
