import express from "express";
import { createServer } from "http";
import { setupVite, log, serveStatic } from "./vite";
import path, { dirname } from "path";
import { fileURLToPath } from "url";
import fs from "fs";
import { registerRoutes } from "./routes";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Simplified server just to serve the static files and contact form API
const startServer = async () => {
  const server = createServer(app);

  // Register API routes (only contact form endpoint)
  await registerRoutes(app);

  // Use Vite for development
  if (process.env.NODE_ENV !== "production") {
    await setupVite(app, server);
  } else {
    // In production, serve static files
    const distPath = path.resolve(__dirname, "../dist/public");
    
    if (fs.existsSync(distPath)) {
      app.use(express.static(distPath));
      
      // Serve index.html for any routes not handled by the API
      app.get("*", (req, res) => {
        res.sendFile(path.resolve(distPath, "index.html"));
      });
    } else {
      log("Warning: Build directory not found!");
    }
  }

  // For local development or non-Vercel environments
  if (process.env.VERCEL !== "1") {
    const PORT = parseInt(process.env.PORT || "5000", 10);
    server.listen(PORT, "0.0.0.0", () => {
      log(`Server running at http://0.0.0.0:${PORT}`);
    });
  }
  
  return app;
};

// Start the server immediately for all environments
// For Vercel, the default export is handled in a separate file
startServer();
