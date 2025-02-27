import { useState, useRef, useEffect } from "react";
import { Send, Bot, UserRound, ArrowDown, CircleX, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";

type Message = {
  role: "user" | "assistant" | "system";
  content: string;
  thinking?: string[];
};

type GoalStep = {
  id: number;
  description: string;
  status: "pending" | "in_progress" | "completed";
};

export function InteractiveAutoGPT() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "system",
      content: "I am AutoGPT, an autonomous agent that can break down tasks and solve them step by step."
    },
    {
      role: "assistant",
      content: "Hello! I'm AutoGPT, an autonomous AI agent. I can help you accomplish goals by breaking them down into manageable steps. What would you like me to help you with today?"
    }
  ]);
  
  const [isLoading, setIsLoading] = useState(false);
  const [goal, setGoal] = useState<string | null>(null);
  const [steps, setSteps] = useState<GoalStep[]>([]);
  const [currentStep, setCurrentStep] = useState<number | null>(null);
  const [thinking, setThinking] = useState<boolean>(false);
  const [thoughtProcess, setThoughtProcess] = useState<string[]>([]);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  // Auto-scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, thinking, thoughtProcess]);

  const analyzeGoal = async (goalText: string) => {
    // Our backend API already has access to the OpenAI API key
    // from the environment variables, so we don't need to check for apiKey

    setGoal(goalText);
    setThinking(true);
    setThoughtProcess(["Breaking down your goal into manageable steps..."]);
    
    try {
      // Call our backend API to interact with OpenAI
      const response = await fetch('/api/autogpt', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: [
            {
              role: "user",
              content: `My goal is: ${goalText}. Please analyze this goal and break it down into 4-5 concrete steps that I should follow to achieve it.`
            }
          ],
          goal: goalText
        }),
      });
      
      const result = await response.json();
      
      if (!response.ok) {
        // Handle API error with details from result
        const errorMessage = result.error || `API request failed with status: ${response.status}`;
        throw new Error(errorMessage);
      }
      
      const content = result.content || '';
      const thinking = result.thinking || [];
      
      // Enhanced step extraction pattern to handle different formatting
      // Look for numbered lists like "1. Step description" or "Step 1: Description"
      const stepRegex = /(?:\d+\.|\bStep\s+\d+:?)\s*(.*?)(?=(?:\d+\.|\bStep\s+\d+:?)|\n\n|$)/gs;
      const extractedSteps: string[] = [];
      let match: RegExpExecArray | null;
      
      // First attempt with numbered pattern
      while ((match = stepRegex.exec(content)) !== null) {
        if (match[1] && match[1].trim()) {
          extractedSteps.push(match[1].trim());
        }
      }
      
      // If no steps found, try looking for clear paragraphs or bullet points
      if (extractedSteps.length === 0) {
        const bulletRegex = /(?:\*|\-|\•)\s*(.*?)(?=(?:\*|\-|\•)|\n\n|$)/gs;
        while ((match = bulletRegex.exec(content)) !== null) {
          if (match[1] && match[1].trim()) {
            extractedSteps.push(match[1].trim());
          }
        }
      }
      
      // As a last resort, split by double newlines and take sections that look like steps
      if (extractedSteps.length === 0) {
        const paragraphs = content.split(/\n\n+/).filter(p => 
          p.trim() && 
          p.length > 10 && 
          !p.toLowerCase().includes("i've analyzed") &&
          !p.toLowerCase().includes("here's my")
        );
        
        if (paragraphs.length >= 2) {
          extractedSteps.push(...paragraphs.slice(0, 5));
        }
      }
      
      // Create step objects from extracted steps
      const generatedSteps: GoalStep[] = extractedSteps.slice(0, 5).map((step, index) => ({
        id: index + 1,
        description: step,
        status: "pending" as const
      }));
      
      // If we still couldn't extract steps, use default steps
      if (generatedSteps.length === 0) {
        const defaultSteps: GoalStep[] = [
          { id: 1, description: "Analyze and break down the main objective", status: "pending" as const },
          { id: 2, description: "Research necessary information and resources", status: "pending" as const },
          { id: 3, description: "Execute the primary task components", status: "pending" as const },
          { id: 4, description: "Review and refine the results", status: "pending" as const }
        ];
        setSteps(defaultSteps);
      } else {
        setSteps(generatedSteps);
      }
      
      setThinking(false);
      setCurrentStep(1);
      setThoughtProcess(thinking);
      
      const newMessage: Message = {
        role: "assistant",
        content: `I've analyzed your goal: "${goalText}"\n\nI've broken it down into ${generatedSteps.length} steps that we'll work through together. Let's start with step 1: ${generatedSteps[0]?.description}`,
        thinking: thinking
      };
      
      setMessages(prev => [...prev, newMessage]);
      
    } catch (error: any) {
      console.error("Error analyzing goal:", error);
      setThinking(false);
      
      // More helpful error messages based on the error
      let description = "Failed to analyze the goal. Please try again.";
      
      if (error.message.includes("API key")) {
        description = "The API key for OpenAI is missing or invalid. Please check server configuration.";
      } else if (error.message.includes("rate limit")) {
        description = "The OpenAI API rate limit has been exceeded. Please try again later.";
      } else if (error.message.includes("model not found")) {
        description = "The selected AI model is not available. The system will try an alternative model.";
      }
      
      toast({
        title: "Error",
        description,
        variant: "destructive"
      });
    }
  };

  const processStep = async (stepId: number) => {
    // Our backend API already has access to the OpenAI API key
    // from the environment variables, so we don't need to check for apiKey

    setThinking(true);
    setThoughtProcess([`Working on step ${stepId}...`]);
    
    const currentStepObj = steps.find(s => s.id === stepId);
    if (!currentStepObj) return;
    
    // Update step status
    setSteps(prev => prev.map(s => 
      s.id === stepId ? { ...s, status: "in_progress" as const } : s
    ));
    
    try {
      // Include all previous messages for context
      // Only keep essential messages to avoid token limits
      const relevantMessages = messages
        .slice(-5) // Get only the latest 5 messages for context
        .map(m => ({
          role: m.role,
          content: m.content
        }));
      
      // Add a message explaining the current step context
      const systemContext = {
        role: "system" as const,
        content: `You are now working on step ${stepId}: "${currentStepObj.description}" for the goal: "${goal}". 
        Execute this step and provide a detailed report of what you've done and what you've learned.
        
        Previous steps context: ${steps
          .filter(s => s.id < stepId)
          .map(s => `Step ${s.id}: ${s.description} (${s.status})`)
          .join(", ")}
        `
      };
      
      // Call our backend API to get the next step response
      const response = await fetch('/api/autogpt', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: [
            systemContext,
            ...relevantMessages
          ],
          goal,
          step: stepId
        }),
      });
      
      const result = await response.json();
      
      if (!response.ok) {
        // Handle API error with details from result
        const errorMessage = result.error || `API request failed with status: ${response.status}`;
        throw new Error(errorMessage);
      }
      
      const content = result.content || '';
      const thinking = result.thinking || [];
      
      setThoughtProcess(thinking);
      
      // Format the response to be more consistent
      const responseContent = `I've completed step ${stepId}: "${currentStepObj.description}"\n\n${content}`;
      
      // Mark current step as completed
      setSteps(prev => prev.map(s => 
        s.id === stepId ? { ...s, status: "completed" as const } : s
      ));
      
      // Move to next step if available
      if (stepId < steps.length) {
        setCurrentStep(stepId + 1);
      } else {
        setCurrentStep(null); // All steps completed
      }
      
      const newMessage: Message = {
        role: "assistant",
        content: responseContent,
        thinking: thinking
      };
      
      setMessages(prev => [...prev, newMessage]);
      setThinking(false);
      
    } catch (error: any) {
      console.error("Error processing step:", error);
      setThinking(false);
      
      // More helpful error messages based on error type
      let description = `Failed to process step ${stepId}. Please try again.`;
      
      if (error.message.includes("API key")) {
        description = "The API key for OpenAI is missing or invalid. Please check server configuration.";
      } else if (error.message.includes("rate limit")) {
        description = "The OpenAI API rate limit has been exceeded. Please try again later.";
      } else if (error.message.includes("model not found")) {
        description = "The selected AI model is not available. The system will try an alternative model.";
      } else if (error.message.includes("maximum context length")) {
        description = "The conversation is too long. Try starting a new session.";
        // Reset step to pending so user can try again
        setSteps(prev => prev.map(s => 
          s.id === stepId ? { ...s, status: "pending" as const } : s
        ));
      }
      
      toast({
        title: "Error",
        description,
        variant: "destructive"
      });
    }
  };

  const handleSendMessage = async () => {
    if (!input.trim()) return;
    
    const userMessage: Message = {
      role: "user",
      content: input
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);
    
    // If there's no goal yet, treat the first user message as setting a goal
    if (!goal) {
      await analyzeGoal(input);
    } else if (currentStep !== null) {
      await processStep(currentStep);
    } else {
      // Handle follow-up questions after all steps are completed
      setThinking(true);
      setThoughtProcess(["Analyzing your question..."]);
      
      try {
        // Include recent messages for context (limit to avoid token issues)
        const relevantMessages = messages
          .slice(-5) // Only include the most recent 5 messages
          .map(m => ({
            role: m.role,
            content: m.content
          }));
        
        // Add system context to remind the AI about the completed goal
        const systemContext = {
          role: "system" as const,
          content: `You've helped the user with the goal: "${goal}". 
          All steps have been completed. The user is now asking follow-up questions.
          Provide helpful, informative responses based on the work that was done.`
        };
        
        // Call our backend API to handle follow-up questions
        const response = await fetch('/api/autogpt', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            messages: [
              systemContext,
              ...relevantMessages,
              {
                role: "user",
                content: input
              }
            ],
            goal
          }),
        });
        
        const result = await response.json();
        
        if (!response.ok) {
          // Handle API error with details from result
          const errorMessage = result.error || `API request failed with status: ${response.status}`;
          throw new Error(errorMessage);
        }
        
        const content = result.content || '';
        const thinking = result.thinking || [];
        
        const assistantMessage: Message = {
          role: "assistant",
          content,
          thinking
        };
        
        setMessages(prev => [...prev, assistantMessage]);
        setThoughtProcess(thinking);
        
      } catch (error: any) {
        console.error("Error processing follow-up question:", error);
        
        // More descriptive error handling
        let errorThinking = ["Unable to process the question through the API"];
        let errorContent = "I encountered an issue while processing your question. Is there anything specific about the completed tasks you'd like to discuss?";
        
        if (error.message.includes("API key")) {
          errorThinking.push("API authentication issue detected");
          errorContent = "I'm currently unable to access my knowledge base due to an API authentication issue. Please try again later or contact support.";
        } else if (error.message.includes("rate limit")) {
          errorThinking.push("API rate limit reached");
          errorContent = "I've reached my usage limit for the moment. Please try again in a few minutes.";
        }
        
        // Fall back to a generic response with context-aware messaging
        const assistantMessage: Message = {
          role: "assistant",
          content: errorContent,
          thinking: errorThinking
        };
        
        setMessages(prev => [...prev, assistantMessage]);
        
        // Show toast for user awareness
        toast({
          title: "Connection Issue",
          description: "Had trouble connecting to the AI service. Provided a limited response.",
          variant: "destructive"
        });
      }
      
      setThinking(false);
    }
    
    setIsLoading(false);
  };

  // API key is now managed by the server - no need for client-side API key handling

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex justify-between items-center">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Bot className="h-6 w-6 text-primary" />
              Interactive AutoGPT
            </CardTitle>
            <CardDescription>
              Experience how an autonomous AI agent breaks down and solves complex tasks
            </CardDescription>
          </div>
          {/* API Key managed by the server */}
        </div>
        
        {goal && (
          <div className="mt-4">
            <div className="flex items-center gap-2 mb-2">
              <Sparkles className="h-4 w-4 text-primary" />
              <h3 className="font-semibold">Current Goal</h3>
            </div>
            <p className="text-sm border-l-2 border-primary/30 pl-3 py-1">{goal}</p>
            
            <div className="mt-4 space-y-2">
              <h3 className="text-sm font-semibold">Step-by-Step Plan</h3>
              <ul className="space-y-2">
                {steps.map((step) => (
                  <li key={step.id} className="flex items-start gap-2">
                    <div className={`h-5 w-5 rounded-full flex items-center justify-center text-xs shrink-0 ${
                      step.status === 'completed' 
                        ? 'bg-green-100 text-green-700' 
                        : step.status === 'in_progress'
                          ? 'bg-blue-100 text-blue-700'
                          : 'bg-muted text-muted-foreground'
                    }`}>
                      {step.id}
                    </div>
                    <span className={`text-sm ${
                      step.status === 'completed' 
                        ? 'text-green-700' 
                        : step.status === 'in_progress'
                          ? 'text-blue-700'
                          : 'text-muted-foreground'
                    }`}>
                      {step.description}
                    </span>
                    {step.status === 'completed' && (
                      <Badge variant="outline" className="ml-auto text-xs bg-green-50 text-green-700 border-green-200">
                        Completed
                      </Badge>
                    )}
                    {step.status === 'in_progress' && (
                      <Badge variant="outline" className="ml-auto text-xs bg-blue-50 text-blue-700 border-blue-200">
                        In Progress
                      </Badge>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </CardHeader>
      
      <CardContent>
        <div className="h-[350px] overflow-y-auto border rounded-md p-4 mb-4 bg-muted/20">
          {messages.map((message, index) => (
            <div key={index} className="mb-4">
              <div className={`flex gap-3 ${
                message.role === 'assistant' ? 'text-primary' : 'text-foreground'
              }`}>
                {message.role === 'assistant' ? (
                  <Bot className="h-6 w-6 mt-0.5 shrink-0" />
                ) : message.role === 'user' ? (
                  <UserRound className="h-6 w-6 mt-0.5 shrink-0" />
                ) : null}
                
                <div className="space-y-2 w-full">
                  <div className="whitespace-pre-line">
                    {message.content}
                  </div>
                  
                  {message.thinking && message.thinking.length > 0 && (
                    <div 
                      className="mt-2 text-xs bg-muted/40 p-2 rounded-md border border-muted cursor-pointer"
                      onClick={() => {
                        const updatedMessages = [...messages];
                        delete updatedMessages[index].thinking;
                        setMessages(updatedMessages);
                      }}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-semibold text-foreground flex items-center gap-1">
                          <Sparkles className="h-3 w-3 text-primary" /> Thought Process
                        </span>
                        <CircleX className="h-3 w-3 text-muted-foreground hover:text-foreground" />
                      </div>
                      <ul className="space-y-1 text-foreground">
                        {message.thinking.map((thought, i) => (
                          <li key={i} className="flex items-start gap-1">
                            <span className="font-mono text-primary">•</span>
                            {thought}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
          
          {thinking && (
            <div className="mb-4">
              <div className="flex gap-3 text-primary">
                <Bot className="h-6 w-6 mt-0.5 shrink-0" />
                <div className="space-y-2 w-full">
                  <div className="animate-pulse flex gap-1">
                    <div className="h-2 w-2 rounded-full bg-primary"></div>
                    <div className="h-2 w-2 rounded-full bg-primary"></div>
                    <div className="h-2 w-2 rounded-full bg-primary"></div>
                  </div>
                  
                  <div className="mt-2 text-xs bg-muted/40 p-2 rounded-md border border-muted">
                    <div className="flex items-center gap-1 mb-1">
                      <Sparkles className="h-3 w-3 text-primary" />
                      <span className="font-semibold text-foreground">Thinking...</span>
                    </div>
                    <ul className="space-y-1 text-foreground">
                      {thoughtProcess.map((thought, i) => (
                        <li key={i} className="flex items-start gap-1">
                          <span className="font-mono text-primary">•</span>
                          {thought}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>
        
        <div className="flex gap-2">
          <Textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={goal ? "Add additional info or ask questions..." : "Enter a goal for AutoGPT to work on..."}
            className="resize-none"
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSendMessage();
              }
            }}
            disabled={isLoading || thinking}
          />
          <Button 
            onClick={handleSendMessage} 
            disabled={isLoading || thinking || !input.trim()}
            size="icon"
            className="shrink-0"
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
      
      <Separator />
      
      <CardFooter className="text-xs text-muted-foreground pt-4 flex flex-col gap-6">
        <div className="w-full">
          <p>
            This interactive demo showcases the core concept of AutoGPT - an autonomous agent that breaks down complex goals into manageable steps and executes them systematically.
          </p>
          <p className="mt-2">
            Powered by GPT-4 with server-side API integration.
          </p>
        </div>
        
        {/* Schematic diagram showing how AutoGPT works */}
        <div className="w-full border rounded-md p-4 bg-muted/10">
          <h3 className="text-sm font-semibold mb-4 text-foreground">How AutoGPT Works - System Architecture</h3>
          
          <div className="relative w-full h-[200px] flex flex-col items-center">
            {/* User Input Box */}
            <div className="absolute top-0 left-0 w-1/4 border rounded-md p-2 bg-muted/30 text-center text-[10px]">
              <span className="font-semibold">User Input</span>
              <p>Goal & Follow-up Questions</p>
            </div>
            
            {/* Arrow Down */}
            <div className="absolute top-[40px] left-[12%] transform-gpu rotate-90">
              <ArrowDown className="h-4 w-4 text-primary" />
            </div>
            
            {/* Frontend Processing */}
            <div className="absolute top-0 left-1/3 w-1/3 border rounded-md p-2 bg-primary/10 text-center text-[10px]">
              <span className="font-semibold">Frontend Processing</span>
              <p>React UI & State Management</p>
            </div>
            
            {/* Arrow Down */}
            <div className="absolute top-[40px] left-[50%] transform-gpu -translate-x-1/2">
              <ArrowDown className="h-4 w-4 text-primary" />
            </div>
            
            {/* Server API */}
            <div className="absolute top-[60px] left-1/3 w-1/3 border border-primary rounded-md p-2 bg-primary/5 text-center text-[10px]">
              <span className="font-semibold">Server API</span>
              <p>Express.js Backend with OpenAI Integration</p>
            </div>
            
            {/* Arrow Down */}
            <div className="absolute top-[100px] left-[50%] transform-gpu -translate-x-1/2">
              <ArrowDown className="h-4 w-4 text-primary" />
            </div>
            
            {/* OpenAI API */}
            <div className="absolute top-[120px] left-1/3 w-1/3 border rounded-md p-2 bg-muted/20 text-center text-[10px]">
              <span className="font-semibold">OpenAI GPT-4 API</span>
              <p>Goal Analysis & Step Execution</p>
            </div>
            
            {/* Arrow Down */}
            <div className="absolute top-[100px] right-[12%] transform-gpu rotate-90">
              <ArrowDown className="h-4 w-4 text-primary rotate-180" />
            </div>
            
            {/* Result Output */}
            <div className="absolute top-0 right-0 w-1/4 border rounded-md p-2 bg-green-50/30 text-center text-[10px]">
              <span className="font-semibold">Results & Thinking</span>
              <p>Response & Thinking Process</p>
            </div>
            
            {/* Bottom box */}
            <div className="absolute bottom-0 left-0 right-0 border border-primary/50 rounded-md p-2 bg-muted/5 text-center text-[10px]">
              <span className="font-semibold">Key Features</span>
              <div className="grid grid-cols-3 gap-2 mt-1">
                <div className="border-r border-primary/20 px-1">Step-by-Step Planning</div>
                <div className="border-r border-primary/20 px-1">Autonomous Execution</div>
                <div className="px-1">Transparent Thinking</div>
              </div>
            </div>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}