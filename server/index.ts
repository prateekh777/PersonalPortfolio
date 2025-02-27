import express from "express";
import { createServer } from "http";
import { setupVite, log } from "./vite";
import { handleAutoGPTRequest } from "./openai";
import dotenv from "dotenv";

// Load environment variables from .env file if present
dotenv.config();

// Check if OpenAI API key is set
if (!process.env.OPENAI_API_KEY) {
  console.warn("WARNING: OPENAI_API_KEY environment variable is not set. AutoGPT functionality will not work.");
}

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// API endpoint for AutoGPT
app.post('/api/autogpt', handleAutoGPTRequest);

// Simplified server just to serve the static files
(async () => {
  const server = createServer(app);

  // Use Vite for development
  if (app.get("env") === "development") {
    await setupVite(app, server);
  }

  // ALWAYS serve the app on port 5000
  const PORT = 5000;
  server.listen(PORT, "0.0.0.0", () => {
    log(`serving on port ${PORT}`);
    log(`OpenAI API key ${process.env.OPENAI_API_KEY ? 'is configured' : 'is NOT configured'}`);
  });
})();
