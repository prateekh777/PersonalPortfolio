import express, { Request, Response } from 'express';
import projectsRouter from './projects';
import sectionsRouter from './sections';
import { initializeStorageAndWait } from '../storage';
import { initData } from '../init-data';

// Initialize storage and data once
let initialized = false;
async function ensureInitialized() {
  if (!initialized) {
    await initializeStorageAndWait();
    await initData();
    initialized = true;
  }
}

// Create Express app
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Initialize API routes
app.use('/api/projects', projectsRouter);
app.use('/api/sections', sectionsRouter);

// Export the handler for Vercel
export default async function handler(req: Request, res: Response) {
  try {
    await ensureInitialized();
    return app(req, res);
  } catch (error) {
    console.error('API Error:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
} 