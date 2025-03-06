import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.join(__dirname, '..');

// Load environment variables
dotenv.config({ path: path.join(rootDir, '.env') });

/**
 * This script prepares the project for Vercel deployment by:
 * 1. Validating environment variables
 * 2. Checking for required files
 * 3. Reporting any issues that need to be fixed
 */
async function prepareVercelDeployment() {
  console.log('Preparing for Vercel deployment...');
  
  // Check for required files
  const requiredFiles = [
    'vercel.json',
    'api/index.ts'
  ];
  
  let allFilesExist = true;
  
  for (const file of requiredFiles) {
    const filePath = path.join(rootDir, file);
    if (!fs.existsSync(filePath)) {
      console.error(`❌ Missing required file: ${file}`);
      allFilesExist = false;
    } else {
      console.log(`✅ Required file exists: ${file}`);
    }
  }
  
  if (!allFilesExist) {
    console.error('Please create the missing files before deploying.');
    process.exit(1);
  }
  
  // Check environment variables
  const requiredEnvVars = [
    'MONGODB_URI',
    'SENDGRID_API_KEY'
  ];
  
  // Optional but recommended env vars
  const recommendedEnvVars = [
    'CONTACT_FROM_EMAIL',
    'CONTACT_TO_EMAIL'
  ];
  
  let allRequiredVarsExist = true;
  
  for (const envVar of requiredEnvVars) {
    if (!process.env[envVar]) {
      console.error(`❌ Missing required environment variable: ${envVar}`);
      allRequiredVarsExist = false;
    } else {
      console.log(`✅ Required environment variable exists: ${envVar}`);
    }
  }
  
  for (const envVar of recommendedEnvVars) {
    if (!process.env[envVar]) {
      console.warn(`⚠️ Missing recommended environment variable: ${envVar}`);
    } else {
      console.log(`✅ Recommended environment variable exists: ${envVar}`);
    }
  }
  
  if (!allRequiredVarsExist) {
    console.error('Please set all required environment variables before deploying.');
    console.log('You can set these in your Vercel project settings or in a .env file.');
    process.exit(1);
  }
  
  // All checks passed
  console.log('\n✅✅✅ Your project is ready for Vercel deployment! ✅✅✅');
  console.log('Run the following commands to deploy:');
  console.log('  vercel login');
  console.log('  vercel --prod');
}

prepareVercelDeployment().catch(error => {
  console.error('Error preparing for Vercel deployment:', error);
  process.exit(1);
});