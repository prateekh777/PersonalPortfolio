import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';

dotenv.config();

async function checkCollections() {
  const mongoUri = process.env.MONGODB_URI;
  if (!mongoUri) {
    console.error("MONGODB_URI environment variable is not set");
    process.exit(1);
  }

  console.log("Checking MongoDB collections and usage...");
  
  const client = new MongoClient(mongoUri);
  
  try {
    await client.connect();
    console.log("Connected to MongoDB!");
    
    const db = client.db('portfolio');
    const collections = await db.listCollections().toArray();
    console.log("\nAvailable collections:");
    collections.forEach(c => console.log(`- ${c.name}`));
    
    // Check document counts in each collection
    console.log("\nDocument counts:");
    for (const collection of collections) {
      const count = await db.collection(collection.name).countDocuments();
      console.log(`- ${collection.name}: ${count} documents`);
      
      // Sample a document to see its structure
      if (count > 0) {
        const sample = await db.collection(collection.name).findOne({});
        console.log(`  Sample document structure: ${JSON.stringify(sample, null, 2)}`);
      }
    }
    
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  } finally {
    await client.close();
    console.log("\nConnection closed");
  }
}

checkCollections().catch(console.error);