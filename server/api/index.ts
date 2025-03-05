import express from 'express';
import projectsRouter from './projects';
import sectionsRouter from './sections';
import { initializeStorageAndWait } from '../storage';
import { initData } from '../init-data';

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Initialize API routes
app.use('/api/projects', projectsRouter);
app.use('/api/sections', sectionsRouter);

// Initialize storage and data
(async () => {
  await initializeStorageAndWait();
  await initData();
})();

export default app; 