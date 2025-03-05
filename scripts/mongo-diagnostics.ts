import { MongoClient } from "mongodb";
import dotenv from 'dotenv';
import dns from 'dns';
import { promisify } from 'util';
import https from 'https';

dotenv.config();

// Convert DNS functions to Promise-based
const dnsLookup = promisify(dns.lookup);
const dnsResolve = promisify(dns.resolve);

// Function to test HTTP connection to a URL
function testHttpConnection(url: string): Promise<boolean> {
  return new Promise((resolve) => {
    const req = https.get(url, (res) => {
      console.log(`HTTP Status Code for ${url}: ${res.statusCode}`);
      resolve(res.statusCode === 200);
    });
    
    req.on('error', (err) => {
      console.error(`Error connecting to ${url}:`, err.message);
      resolve(false);
    });
    
    req.setTimeout(5000, () => {
      console.error(`Connection to ${url} timed out`);
      req.destroy();
      resolve(false);
    });
  });
}

async function runDiagnostics() {
  console.log("Node.js version:", process.version);
  console.log("Platform:", process.platform);
  console.log("Architecture:", process.arch);
  console.log("Process environment:", process.env.NODE_ENV || 'not set');
  
  const mongoUri = process.env.MONGODB_URI;
  if (!mongoUri) {
    console.error("MONGODB_URI environment variable is not set");
    return;
  }
  
  console.log("\nRunning MongoDB connection diagnostics...");
  console.log("Connection string:", mongoUri.replace(/mongodb\+srv:\/\/([^:]+):[^@]+@/, 'mongodb+srv://$1:***@'));
  
  // Parse the MongoDB URI to extract hostname
  const match = mongoUri.match(/mongodb\+srv:\/\/[^@]+@([^\/]+)/);
  if (!match) {
    console.error("Failed to parse MongoDB URI");
    return;
  }
  
  const hostname = match[1];
  console.log(`MongoDB hostname: ${hostname}`);
  
  // Test DNS resolution
  console.log("\n1. Testing DNS resolution...");
  try {
    console.log(`Looking up ${hostname}...`);
    const dnsResult = await dnsLookup(hostname);
    console.log(`DNS lookup successful: ${hostname} -> ${dnsResult.address}`);
    
    console.log(`Resolving SRV records for ${hostname}...`);
    const srvRecords = await dnsResolve(`_mongodb._tcp.${hostname}`, 'SRV');
    console.log(`SRV records found: ${srvRecords.length}`);
    srvRecords.forEach((record, i) => {
      console.log(`  Server ${i+1}: ${record.name}:${record.port} (priority: ${record.priority})`);
    });
  } catch (error) {
    console.error("DNS resolution failed:", error);
  }
  
  // Test HTTPS connectivity
  console.log("\n2. Testing HTTPS connectivity...");
  try {
    const httpsConnected = await testHttpConnection(`https://${hostname}`);
    console.log(`HTTPS connection to ${hostname}: ${httpsConnected ? 'Successful' : 'Failed'}`);
  } catch (error) {
    console.error("HTTPS test failed:", error);
  }

  // Test MongoDB connection with various options
  console.log("\n3. Testing MongoDB connections with different settings...");
  
  // Basic connection
  try {
    console.log("\nAttempting basic connection...");
    const client = new MongoClient(mongoUri);
    await client.connect();
    console.log("Basic connection successful!");
    await client.close();
  } catch (error) {
    console.error("Basic connection failed:", error);
  }
  
  // Connection with TLS options
  try {
    console.log("\nAttempting connection with TLS options...");
    const client = new MongoClient(mongoUri, {
      tls: true,
      tlsAllowInvalidCertificates: true,
      tlsAllowInvalidHostnames: true
    });
    await client.connect();
    console.log("TLS connection successful!");
    await client.close();
  } catch (error) {
    console.error("TLS connection failed:", error);
  }
  
  // Connection with connection pool options
  try {
    console.log("\nAttempting connection with connection pool options...");
    const client = new MongoClient(mongoUri, {
      maxPoolSize: 1,
      minPoolSize: 0,
      maxIdleTimeMS: 5000,
      waitQueueTimeoutMS: 5000
    });
    await client.connect();
    console.log("Connection pool connection successful!");
    await client.close();
  } catch (error) {
    console.error("Connection pool connection failed:", error);
  }
  
  // Connection with timeout options
  try {
    console.log("\nAttempting connection with timeout options...");
    const client = new MongoClient(mongoUri, {
      connectTimeoutMS: 30000,
      socketTimeoutMS: 45000,
      serverSelectionTimeoutMS: 30000
    });
    await client.connect();
    console.log("Timeout options connection successful!");
    
    // Test a simple operation
    console.log("Testing database operation...");
    const db = client.db('portfolio');
    const collections = await db.listCollections().toArray();
    console.log(`Collections found: ${collections.length}`);
    collections.forEach(collection => {
      console.log(`  - ${collection.name}`);
    });
    
    await client.close();
  } catch (error) {
    console.error("Timeout options connection failed:", error);
  }

  console.log("\nDiagnostics completed.");
}

runDiagnostics().catch(error => {
  console.error("Unhandled error during diagnostics:", error);
  process.exit(1);
});