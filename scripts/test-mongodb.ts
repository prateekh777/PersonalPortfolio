import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

// Load environment variables
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.join(__dirname, '..', '.env') });

/**
 * This script tests the MongoDB connection
 */
async function testMongoConnection() {
  console.log('Testing MongoDB connection...');
  
  // Check for MongoDB URI
  const mongoUri = process.env.MONGODB_URI;
  if (!mongoUri) {
    console.error('Error: MONGODB_URI environment variable is not set.');
    console.log('Please set this environment variable and try again.');
    process.exit(1);
  }
  
  let client: MongoClient | null = null;
  
  try {
    // Create a new MongoClient
    client = new MongoClient(mongoUri);
    
    // Connect to the MongoDB server
    console.log('Connecting to MongoDB...');
    await client.connect();
    console.log('Successfully connected to MongoDB!');
    
    // Get the database name from the connection string
    let dbName = 'portfolio';
    try {
      const uriParts = mongoUri.split('/');
      if (uriParts.length > 3) {
        dbName = uriParts[3].split('?')[0];
      }
    } catch (error) {
      console.warn('Could not extract database name from URI, using default: "portfolio"');
    }
    
    // Get the database and list collections
    const db = client.db(dbName);
    console.log(`Using database: ${dbName}`);
    
    const collections = await db.listCollections().toArray();
    console.log(`Found ${collections.length} collections:`);
    
    for (const collection of collections) {
      console.log(`- ${collection.name}`);
      
      // Count documents in each collection
      const count = await db.collection(collection.name).countDocuments();
      console.log(`  (${count} documents)`);
    }
    
    console.log('\nMongoDB connection test completed successfully!');
  } catch (error) {
    console.error('Error connecting to MongoDB:');
    console.error(error);
    process.exit(1);
  } finally {
    // Close the connection
    if (client) {
      console.log('Closing MongoDB connection...');
      await client.close();
      console.log('MongoDB connection closed.');
    }
  }
}

testMongoConnection().catch(error => {
  console.error('Unexpected error:', error);
  process.exit(1);
});