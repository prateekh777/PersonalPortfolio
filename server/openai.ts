import { OpenAI } from "openai";
import { Request, Response } from "express";

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function handleAutoGPTRequest(req: Request, res: Response) {
  try {
    const { messages, goal, step } = req.body;
    
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
    
    // Call OpenAI API
    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: apiMessages as any,
      temperature: 0.7,
      max_tokens: 1000,
    });
    
    // Extract and send the response
    const responseContent = completion.choices[0].message.content;
    
    res.json({
      content: responseContent,
      thinking: parseThinking(responseContent || ""),
    });
    
  } catch (error: any) {
    console.error("Error calling OpenAI API:", error);
    res.status(500).json({
      error: error.message || "Failed to process request"
    });
  }
}

// Helper function to parse thinking steps from the response
function parseThinking(content: string): string[] {
  // Extract thinking process - look for sections that describe the thought process
  const thinkingIndicators = [
    "Let me think", "My thought process", "I'm thinking", "Here's my analysis",
    "Let's break this down", "My approach", "Step by step"
  ];
  
  // Try to extract a thinking section
  let thoughts: string[] = [];
  
  // Split by paragraphs and lines
  const lines = content.split(/\n+/);
  
  for (const line of lines) {
    // If the line starts with or contains a thinking indicator
    if (thinkingIndicators.some(indicator => 
      line.toLowerCase().includes(indicator.toLowerCase()))) {
      thoughts.push(line);
      continue;
    }
    
    // Look for numbered or bulleted thinking steps
    if (/^(\d+\.|\*|\-)\s/.test(line.trim())) {
      thoughts.push(line.trim());
    }
  }
  
  // If we couldn't find explicit thinking steps, create default ones
  if (thoughts.length === 0) {
    thoughts = [
      "Analyzing the request and context",
      "Formulating a structured approach",
      "Considering the most effective solution"
    ];
  }
  
  return thoughts;
}