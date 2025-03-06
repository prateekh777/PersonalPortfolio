import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
import { promisify } from 'util';

dotenv.config();

const readdir = promisify(fs.readdir);
const readFile = promisify(fs.readFile);
const stat = promisify(fs.stat);

async function walkDir(dir: string): Promise<string[]> {
  const files = await readdir(dir);
  const allFiles = await Promise.all(
    files.map(async (file) => {
      const filePath = path.join(dir, file);
      const stats = await stat(filePath);
      if (stats.isDirectory()) {
        return walkDir(filePath);
      } else if (stats.isFile() && (filePath.endsWith('.tsx') || filePath.endsWith('.ts') || filePath.endsWith('.jsx') || filePath.endsWith('.js'))) {
        return [filePath];
      }
      return [];
    })
  );
  return allFiles.flat();
}

async function analyzeCollectionUsage() {
  const mongoUri = process.env.MONGODB_URI;
  if (!mongoUri) {
    console.error("MONGODB_URI environment variable is not set");
    process.exit(1);
  }

  console.log("Analyzing MongoDB collection usage in frontend code...");
  
  // Get all collections in MongoDB
  const client = new MongoClient(mongoUri);
  
  try {
    await client.connect();
    const db = client.db('portfolio');
    const collections = await db.listCollections().toArray();
    const collectionNames = collections.map(c => c.name);
    
    console.log(`\nFound ${collectionNames.length} collections in MongoDB:`, collectionNames);
    
    // Analyze frontend code
    const clientDir = path.join(process.cwd(), 'client');
    const frontendFiles = await walkDir(clientDir);
    
    // Map to track collection usage
    const collectionUsage: Record<string, Set<string>> = {};
    collectionNames.forEach(name => {
      collectionUsage[name] = new Set<string>();
    });
    
    // Define API endpoints to collection mapping
    const apiToCollection: Record<string, string> = {
      '/api/sections': 'sections',
      '/api/projects': 'projects',
      '/api/case-studies': 'caseStudies',
      '/api/ai-works': 'aiWorks',
      '/api/interests': 'interests'
    };
    
    // Check each file for collection usage
    for (const file of frontendFiles) {
      const content = await readFile(file, 'utf8');
      const relativeFile = path.relative(process.cwd(), file);
      
      // Check for direct collection references and API endpoint usage
      for (const [endpoint, collection] of Object.entries(apiToCollection)) {
        if (content.includes(endpoint)) {
          if (collectionUsage[collection]) {
            collectionUsage[collection].add(relativeFile);
          }
        }
      }
      
      // Check for type references
      const typeMatches = [
        { pattern: /Section\[\]/g, collection: 'sections' },
        { pattern: /Project\[\]/g, collection: 'projects' },
        { pattern: /CaseStudy\[\]/g, collection: 'caseStudies' },
        { pattern: /AiWork\[\]/g, collection: 'aiWorks' },
        { pattern: /Interest\[\]/g, collection: 'interests' }
      ];
      
      for (const {pattern, collection} of typeMatches) {
        if (pattern.test(content) && collectionUsage[collection]) {
          collectionUsage[collection].add(relativeFile);
        }
      }
    }
    
    // Report usage
    console.log("\nCollection usage in frontend:");
    for (const [collection, files] of Object.entries(collectionUsage)) {
      console.log(`\n${collection}: ${files.size > 0 ? 'USED' : 'UNUSED'}`);
      if (files.size > 0) {
        console.log("  Used in files:");
        Array.from(files).forEach(file => console.log(`  - ${file}`));
      }
    }
    
    // Identify unused collections
    const unusedCollections = collectionNames.filter(name => 
      collectionUsage[name] && collectionUsage[name].size === 0
    );
    
    console.log("\nUnused collections:", unusedCollections.length > 0 ? unusedCollections.join(', ') : 'None');
    
    // Check for 'test' collection which might be for testing only
    if (collectionNames.includes('test')) {
      console.log("\n'test' collection found - this appears to be a test collection that can be removed");
    }
    
  } catch (error) {
    console.error("Error analyzing collection usage:", error);
  } finally {
    await client.close();
    console.log("\nAnalysis complete");
  }
}

analyzeCollectionUsage().catch(console.error);