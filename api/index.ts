import express, { Express, Request, Response } from 'express';
import path from 'path';
import fs from 'fs';
import { sendContactEmail, contactFormSchema } from '../server/email';
import { z } from 'zod';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// Initialize Express
const app = express();
app.use(express.json());

// Define constants
const DATA_DIR = path.join(process.cwd(), 'data-export');

// Helper function to load JSON data
function loadJsonData(filename: string) {
  try {
    const filePath = path.join(DATA_DIR, filename);
    if (fs.existsSync(filePath)) {
      const data = fs.readFileSync(filePath, 'utf8');
      return JSON.parse(data);
    } else {
      console.warn(`File not found: ${filePath}`);
      return [];
    }
  } catch (error) {
    console.error(`Error loading ${filename}:`, error);
    return [];
  }
}

// Create data directory if it doesn't exist
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

// API Routes
app.get('/api/health', (req: Request, res: Response) => {
  const startTime = process.env.SERVER_START_TIME || Date.now();
  const uptime = (Date.now() - Number(startTime)) / 1000;
  
  // Check email configuration
  const emailStatus = process.env.SENDGRID_API_KEY ? 'configured' : 'not_configured';
  
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    uptime,
    email: emailStatus
  });
});

app.get('/api/projects', (req: Request, res: Response) => {
  const projects = loadJsonData('projects.json');
  res.json(projects);
});

app.get('/api/case-studies', (req: Request, res: Response) => {
  const caseStudies = loadJsonData('case-studies.json');
  res.json(caseStudies);
});

app.get('/api/ai-works', (req: Request, res: Response) => {
  const aiWorks = loadJsonData('ai-works.json');
  res.json(aiWorks);
});

app.get('/api/interests', (req: Request, res: Response) => {
  const interests = loadJsonData('interests.json');
  res.json(interests);
});

app.post('/api/contact', async (req: Request, res: Response) => {
  try {
    const validatedData = contactFormSchema.parse(req.body);
    
    // Verify reCAPTCHA if configured
    if (process.env.RECAPTCHA_SECRET_KEY && validatedData.recaptchaToken) {
      const recaptchaResponse = await fetch(`https://www.google.com/recaptcha/api/siteverify?secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${validatedData.recaptchaToken}`, {
        method: 'POST'
      });
      
      const recaptchaData = await recaptchaResponse.json();
      if (!recaptchaData.success) {
        return res.status(400).json({ message: 'reCAPTCHA verification failed' });
      }
    }
    
    const result = await sendContactEmail(validatedData);
    
    if (result) {
      res.status(200).json({ message: 'Message sent successfully' });
    } else {
      res.status(500).json({ message: 'Failed to send email' });
    }
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(400).json({ message: 'Validation error', errors: error.errors });
    } else {
      console.error('Contact form error:', error);
      res.status(500).json({ message: 'An error occurred' });
    }
  }
});

// For local development, listen on a port
// On Vercel, this is not used as the file is imported directly
if (process.env.NODE_ENV !== 'production') {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`API server running at http://localhost:${PORT}`);
  });
}

// Export for Vercel serverless functions
export default app;