import express, { type Express } from "express";
import { createServer, type Server } from "http";
import { contactFormSchema, sendContactEmail } from "./email";

export async function registerRoutes(app: Express): Promise<Server> {
  const httpServer = createServer(app);

  // Contact form - Only API endpoint we're keeping
  app.post("/api/contact", async (req, res) => {
    try {
      // Validate the request body
      const contactData = contactFormSchema.parse(req.body);
      
      // Send the email
      const success = await sendContactEmail(contactData);
      
      if (success) {
        res.json({ 
          success: true, 
          message: "Your message has been sent. I'll get back to you soon!" 
        });
      } else {
        res.status(500).json({ 
          success: false, 
          message: "Failed to send your message. Please try again later." 
        });
      }
    } catch (error) {
      console.error("Contact form error:", error);
      res.status(400).json({ 
        success: false, 
        message: "Invalid form data. Please check your inputs and try again." 
      });
    }
  });

  return httpServer;
}
