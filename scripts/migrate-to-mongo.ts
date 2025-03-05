
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
  
  // Create memory and MongoDB storage instances
  const memStorage = new MemStorage();
  const mongoStorage = new MongoStorage(mongoUri);

  try {
    // Migrate sections
    console.log("Migrating sections...");
    const homesSections = await memStorage.getSections("home");
    for (const section of homesSections) {
      await mongoStorage.createSection({
        title: section.title,
        content: section.content,
        type: section.type,
        order: section.order,
        mediaUrls: section.mediaUrls,
        stats: section.stats
      });
    }
    console.log(`${homesSections.length} home sections migrated`);

    const expertiseSections = await memStorage.getSections("expertise");
    for (const section of expertiseSections) {
      await mongoStorage.createSection({
        title: section.title,
        content: section.content,
        type: section.type,
        order: section.order,
        mediaUrls: section.mediaUrls,
        stats: section.stats
      });
    }
    console.log(`${expertiseSections.length} expertise sections migrated`);

    // Migrate projects
    console.log("Migrating projects...");
    const projects = await memStorage.getProjects();
    for (const project of projects) {
      await mongoStorage.createProject({
        title: project.title,
        subtitle: project.subtitle,
        description: project.description,
        imageUrl: project.imageUrl,
        projectUrl: project.projectUrl,
        tags: project.tags,
        position: project.position
      });
    }
    console.log(`${projects.length} projects migrated`);

    // Migrate case studies
    console.log("Migrating case studies...");
    const caseStudies = await memStorage.getCaseStudies();
    for (const caseStudy of caseStudies) {
      await mongoStorage.createCaseStudy({
        title: caseStudy.title,
        description: caseStudy.description,
        imageUrl: caseStudy.imageUrl,
        outcome: caseStudy.outcome,
        technologies: caseStudy.technologies
      });
    }
    console.log(`${caseStudies.length} case studies migrated`);

    // Migrate AI works
    console.log("Migrating AI works...");
    const aiWorks = await memStorage.getAiWorks();
    for (const aiWork of aiWorks) {
      await mongoStorage.createAiWork({
        title: aiWork.title,
        description: aiWork.description,
        imageUrl: aiWork.imageUrl,
        mediaType: aiWork.mediaType,
        demoUrl: aiWork.demoUrl,
        technologies: aiWork.technologies
      });
    }
    console.log(`${aiWorks.length} AI works migrated`);

    // Migrate interests
    console.log("Migrating interests...");
    const interests = await memStorage.getInterests();
    for (const interest of interests) {
      await mongoStorage.createInterest({
        title: interest.title,
        description: interest.description,
        mediaUrl: interest.mediaUrl,
        mediaType: interest.mediaType,
        category: interest.category
      });
    }
    console.log(`${interests.length} interests migrated`);

    console.log("Migration completed successfully!");
  } catch (error) {
    console.error("Migration failed:", error);
  } finally {
    // Close MongoDB connection
    await mongoStorage.close();
    process.exit(0);
  }
}

migrateToMongo();
