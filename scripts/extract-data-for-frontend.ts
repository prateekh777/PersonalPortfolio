import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';

dotenv.config();

async function extractDataForFrontend() {
  const mongoUri = process.env.MONGODB_URI;
  if (!mongoUri) {
    console.error("MONGODB_URI environment variable is not set");
    process.exit(1);
  }

  console.log("Extracting MongoDB data for frontend hardcoding...");
  
  const client = new MongoClient(mongoUri);
  
  try {
    await client.connect();
    console.log("Connected to MongoDB!");
    
    const db = client.db('portfolio');
    
    // Extract data from projects collection
    const projects = await db.collection('projects').find().toArray();
    console.log(`\nExtracted ${projects.length} projects`);
    
    // Extract data from aiWorks collection
    const aiWorks = await db.collection('aiWorks').find().toArray();
    console.log(`Extracted ${aiWorks.length} AI works`);
    
    // Extract data from interests collection
    const interests = await db.collection('interests').find().toArray();
    console.log(`Extracted ${interests.length} interests`);
    
    // Write data to files
    const dataDir = path.join(process.cwd(), 'data-export');
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir);
    }
    
    fs.writeFileSync(
      path.join(dataDir, 'projects.json'), 
      JSON.stringify(projects, null, 2)
    );
    
    fs.writeFileSync(
      path.join(dataDir, 'ai-works.json'), 
      JSON.stringify(aiWorks, null, 2)
    );
    
    fs.writeFileSync(
      path.join(dataDir, 'interests.json'), 
      JSON.stringify(interests, null, 2)
    );
    
    console.log(`\nData exported to ${dataDir} directory`);
    console.log("Use this data to hardcode into your frontend components");
    
  } catch (error) {
    console.error("Error extracting data:", error);
  } finally {
    await client.close();
    console.log("\nExport complete");
  }
}

extractDataForFrontend().catch(console.error);