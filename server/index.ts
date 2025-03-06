import express from "express";
import { createServer } from "http";
import { setupVite, log, serveStatic } from "./vite";
import path from "path";
import fs from "fs";
import { registerRoutes } from "./routes";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Simplified server just to serve the static files and contact form API
(async () => {
  const server = createServer(app);

  // Register API routes (only contact form endpoint)
  await registerRoutes(app);

  // Use Vite for development
  if (app.get("env") === "development") {
    await setupVite(app, server);
  } else {
    // In production, serve static files
    serveStatic(app);
  }

  // ALWAYS serve the app on port 5000
  const PORT = parseInt(process.env.PORT || "5000", 10);
  server.listen(PORT, "0.0.0.0", () => {
    log(`Server running at http://0.0.0.0:${PORT}`);
  });
})();
