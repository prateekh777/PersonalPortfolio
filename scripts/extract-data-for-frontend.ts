import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';
import { MongoClient } from 'mongodb';
import { MongoStorage } from '../server/mongo-storage';

// Load environment variables
dotenv.config();

const DATA_EXPORT_DIR = path.join(process.cwd(), 'data-export');

/**
 * This script extracts data from MongoDB and saves it as static JSON files
 * for use in the Vercel serverless deployment
 */
async function extractDataForFrontend() {
  console.log('Extracting data from MongoDB to static JSON files...');
  
  // Create data export directory if it doesn't exist
  if (!fs.existsSync(DATA_EXPORT_DIR)) {
    fs.mkdirSync(DATA_EXPORT_DIR, { recursive: true });
    console.log(`Created directory: ${DATA_EXPORT_DIR}`);
  }
  
  // Check if MongoDB URI is provided
  const mongoUri = process.env.MONGODB_URI;
  if (!mongoUri) {
    console.error('ERROR: MONGODB_URI environment variable not set');
    console.log('Creating sample data files instead');
    createSampleDataFiles();
    return;
  }
  
  // Initialize storage and connect to MongoDB
  try {
    const storage = new MongoStorage(mongoUri);
    await storage.connect();
    console.log('Connected to MongoDB');
    
    // Extract and save projects data
    const projects = await storage.getProjects();
    saveDataToFile(projects, 'projects.json');
    
    // Extract and save case studies data
    const caseStudies = await storage.getCaseStudies();
    saveDataToFile(caseStudies, 'case-studies.json');
    
    // Extract and save AI works data
    const aiWorks = await storage.getAiWorks();
    saveDataToFile(aiWorks, 'ai-works.json');
    
    // Extract and save interests data
    const interests = await storage.getInterests();
    saveDataToFile(interests, 'interests.json');
    
    // Close MongoDB connection
    await storage.close();
    console.log('MongoDB connection closed');
    
    console.log('Data extraction completed successfully');
  } catch (error) {
    console.error('Error extracting data from MongoDB:', error);
    console.log('Creating sample data files instead');
    createSampleDataFiles();
  }
}

/**
 * Save data to a JSON file
 */
function saveDataToFile(data: any, filename: string) {
  const filePath = path.join(DATA_EXPORT_DIR, filename);
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
  console.log(`Saved ${data.length} items to ${filePath}`);
}

/**
 * Create sample data files if MongoDB extraction fails
 */
function createSampleDataFiles() {
  console.log('Creating sample data files...');
  
  // Sample projects data
  const sampleProjects = [
    {
      id: '1',
      title: 'Portfolio Website',
      subtitle: 'Personal showcase',
      description: 'A responsive portfolio website built with React and Express',
      imageUrl: '/images/portfolio.jpg',
      tags: ['React', 'TypeScript', 'Tailwind CSS'],
      position: 'Software Engineer'
    }
  ];
  saveDataToFile(sampleProjects, 'projects.json');
  
  // Sample case studies data
  const sampleCaseStudies = [
    {
      id: '1',
      title: 'Increasing Conversion Rate',
      result: 'Increased conversion by 25%',
      actions: [
        {
          heading: 'Research',
          items: ['Conducted user interviews', 'Analyzed analytics data']
        },
        {
          heading: 'Implementation',
          items: ['Redesigned landing page', 'Simplified signup flow']
        }
      ],
      context: {
        heading: 'Skills Applied',
        skills: ['UX Research', 'Data Analysis', 'A/B Testing']
      }
    }
  ];
  saveDataToFile(sampleCaseStudies, 'case-studies.json');
  
  // Sample AI works data
  const sampleAiWorks = [
    {
      id: '1',
      title: 'AI Screen Reader',
      description: 'A real-time voice tutor that reads text and provides explanations',
      technologies: ['OpenAI', 'React', 'Web Speech API'],
      mediaType: 'image',
      imageUrl: '/images/ai-reader.jpg'
    }
  ];
  saveDataToFile(sampleAiWorks, 'ai-works.json');
  
  // Sample interests data
  const sampleInterests = [
    {
      id: '1',
      title: 'Machine Learning',
      description: 'Exploring neural networks and their applications',
      mediaType: 'image',
      mediaUrl: '/images/machine-learning.jpg',
      category: 'science'
    }
  ];
  saveDataToFile(sampleInterests, 'interests.json');
  
  console.log('Sample data files created successfully');
}

// Run the extraction function
extractDataForFrontend().catch(console.error);