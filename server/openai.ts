
import { OpenAI } from "openai";
import { Request, Response } from "express";

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function handleAutoGPTRequest(req: Request, res: Response) {
  try {
    const { messages, goal, step } = req.body;
    
    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({
        error: "Messages are required and must be an array"
      });
    }
    
    // Create a system message that explains the AutoGPT concept
    const systemMessage = {
      role: "system",
      content: `You are AutoGPT, an autonomous agent that breaks down complex tasks into smaller steps.
      You analyze the user's goal, create a plan of action, and execute each step methodically.
      ${step ? `You are currently working on step ${step}.` : ""}
      ${goal ? `The user's goal is: "${goal}"` : ""}
      Show your thinking process in detail, explaining how you approach this problem.`
    };
    
    // Create message array for the OpenAI API
    const apiMessages = [
      systemMessage,
      ...messages
    ];
    
    // Call OpenAI API with proper error handling
    const completion = await openai.chat.completions.create({
      model: "gpt-4", // May fallback to gpt-3.5-turbo if GPT-4 is not available
      messages: apiMessages,
      temperature: 0.7,
      max_tokens: 1000,
    });
    
    // Extract and send the response
    const responseContent = completion.choices[0]?.message?.content || "";
    
    res.json({
      content: responseContent,
      thinking: parseThinking(responseContent),
    });
    
  } catch (error: any) {
    console.error("Error calling OpenAI API:", error);
    
    // Detailed error handling with specific feedback
    if (error.name === 'AuthenticationError') {
      return res.status(401).json({
        error: "OpenAI API key is invalid or not set properly"
      });
    } else if (error.name === 'RateLimitError') {
      return res.status(429).json({
        error: "OpenAI API rate limit exceeded"
      });
    } else if (error.status === 404) {
      return res.status(404).json({
        error: "Model not found or API endpoint incorrect"
      });
    }
    
    // Fallback for other errors
    res.status(500).json({
      error: error.message || "Failed to process request",
      details: "There was a problem connecting to the AI service"
    });
  }
}

// Helper function to parse thinking steps from the response
function parseThinking(content: string): string[] {
  // Return empty array if content is empty
  if (!content || content.trim() === "") {
    return ["Analyzing the request and context"];
  }
  
  // Extract thinking process - look for sections that describe the thought process
  const thinkingIndicators = [
    "Let me think", "My thought process", "I'm thinking", "Here's my analysis",
    "Let's break this down", "My approach", "Step by step", "First", "To accomplish this",
    "I will", "I need to", "Let me analyze", "Thinking about"
  ];
  
  // Try to extract a thinking section
  let thoughts: string[] = [];
  
  // Split by paragraphs and lines
  const lines = content.split(/\n+/);
  
  for (const line of lines) {
    const trimmedLine = line.trim();
    // Skip empty lines
    if (!trimmedLine) continue;
    
    // If the line starts with or contains a thinking indicator
    if (thinkingIndicators.some(indicator => 
      trimmedLine.toLowerCase().includes(indicator.toLowerCase()))) {
      thoughts.push(trimmedLine);
      continue;
    }
    
    // Look for numbered or bulleted thinking steps
    if (/^(\d+\.|\*|\-)\s/.test(trimmedLine)) {
      thoughts.push(trimmedLine);
    }
  }
  
  // If we couldn't find explicit thinking steps, create default ones
  if (thoughts.length === 0) {
    // Extract meaningful segments from the response to create thinking steps
    const segments = content.split(/\.\s+/).filter(s => s.length > 30).slice(0, 3);
    
    if (segments.length > 0) {
      thoughts = segments.map(s => s.trim() + ".");
    } else {
      thoughts = [
        "Analyzing the request and context",
        "Formulating a structured approach",
        "Considering the most effective solution"
      ];
    }
  }
  
  return thoughts;
}
