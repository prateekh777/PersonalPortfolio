import express from "express";
import { createServer } from "http";
import { setupVite, log } from "./vite";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

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
  });
})();
