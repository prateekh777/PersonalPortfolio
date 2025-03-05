import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';

dotenv.config();

async function testMongoConnection() {
  const mongoUri = process.env.MONGODB_URI;
  if (!mongoUri) {
    console.error("MONGODB_URI environment variable is not set");
    process.exit(1);
  }

  console.log("Testing MongoDB connection...");
  console.log("Connection string:", mongoUri.replace(/mongodb\+srv:\/\/([^:]+):[^@]+@/, 'mongodb+srv://$1:***@')); // Hide password
  
  // Add connection options for better reliability with timeout settings
  const options = {
    connectTimeoutMS: 30000, // 30 seconds connection timeout
    socketTimeoutMS: 45000,  // 45 seconds socket timeout
    serverSelectionTimeoutMS: 30000, // 30 seconds server selection timeout
    maxPoolSize: 10, // Maximum number of connections in the connection pool
    retryWrites: true,
    retryReads: true
  };
  
  const client = new MongoClient(mongoUri, options);
  
  try {
    await client.connect();
    console.log("Successfully connected to MongoDB!");
    
    const db = client.db('portfolio');
    const collections = await db.listCollections().toArray();
    console.log("Available collections:", collections.map(c => c.name));
    
    // Count documents in collections
    if (collections.length > 0) {
      for (const collection of collections) {
        const count = await db.collection(collection.name).countDocuments();
        console.log(`Collection '${collection.name}' has ${count} documents`);
      }
    } else {
      console.log("No collections found in the database");
    }
    
  } catch (error) {
    console.error("Failed to connect to MongoDB:", error);
  } finally {
    await client.close();
    console.log("Connection closed");
  }
}

testMongoConnection().catch(console.error);