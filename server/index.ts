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

  // Try to serve the app on port 5000, fall back to alternative ports if needed
  const PORT = process.env.PORT || 5000;
  
  const startServer = (port: number) => {
    server.listen(port, "0.0.0.0")
      .on("error", (err: any) => {
        if (err.code === "EADDRINUSE") {
          log(`Port ${port} is already in use, trying port ${port + 1}`);
          startServer(port + 1);
        } else {
          console.error("Server error:", err);
        }
      })
      .on("listening", () => {
        const actualPort = (server.address() as any).port;
        log(`serving on port ${actualPort}`);
        log(`OpenAI API key ${process.env.OPENAI_API_KEY ? 'is configured' : 'is NOT configured'}`);
      });
  };
  
  startServer(Number(PORT));
})();
