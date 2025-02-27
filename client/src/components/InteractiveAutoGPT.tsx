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
  const [apiKey, setApiKey] = useState<string | null>(null);
  const [showApiInput, setShowApiInput] = useState(false);
  const [tempApiKey, setTempApiKey] = useState("");
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
    // In a real implementation, we would use our backend API
    // to interact with OpenAI, but for this demo we'll continue
    // to use the browser's API key
    if (!apiKey) {
      toast({
        title: "API Key Required",
        description: "Please enter your OpenAI API key to continue.",
        variant: "destructive"
      });
      setShowApiInput(true);
      return;
    }

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
      
      if (!response.ok) {
        throw new Error(`API request failed with status: ${response.status}`);
      }
      
      const result = await response.json();
      const content = result.content || '';
      const thinking = result.thinking || [];
      
      // Extract steps from the AI's response
      const stepRegex = /\d+\.\s*(.*?)(?=\n\d+\.|\n\n|$)/g;
      const extractedSteps: string[] = [];
      let match: RegExpExecArray | null;
      while ((match = stepRegex.exec(content)) !== null) {
        if (match[1]) {
          extractedSteps.push(match[1].trim());
        }
      }
      
      // Create step objects from extracted steps
      const generatedSteps: GoalStep[] = extractedSteps.slice(0, 5).map((step, index) => ({
        id: index + 1,
        description: step,
        status: "pending" as const
      }));
      
      // If we couldn't extract steps, use default steps
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
      
    } catch (error) {
      console.error("Error analyzing goal:", error);
      setThinking(false);
      toast({
        title: "Error",
        description: "Failed to analyze the goal. Please try again.",
        variant: "destructive"
      });
    }
  };

  const processStep = async (stepId: number) => {
    if (!apiKey) {
      toast({
        title: "API Key Required",
        description: "Please enter your OpenAI API key to continue.",
        variant: "destructive"
      });
      setShowApiInput(true);
      return;
    }

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
      const historyMessages = messages.map(m => ({
        role: m.role,
        content: m.content
      }));
      
      // Call our backend API to get the next step response
      const response = await fetch('/api/autogpt', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: [
            ...historyMessages,
            {
              role: "system",
              content: `You are now working on step ${stepId}: "${currentStepObj.description}" for the goal: "${goal}". 
              Execute this step and provide a detailed report of what you've done and what you've learned.`
            }
          ],
          goal,
          step: stepId
        }),
      });
      
      if (!response.ok) {
        throw new Error(`API request failed with status: ${response.status}`);
      }
      
      const result = await response.json();
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
      
    } catch (error) {
      console.error("Error processing step:", error);
      setThinking(false);
      toast({
        title: "Error",
        description: `Failed to process step ${stepId}. Please try again.`,
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
        // Include all previous messages for context
        const historyMessages = messages.map(m => ({
          role: m.role,
          content: m.content
        }));
        
        // Call our backend API to handle follow-up questions
        const response = await fetch('/api/autogpt', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            messages: [
              ...historyMessages,
              {
                role: "user",
                content: input
              }
            ],
            goal
          }),
        });
        
        if (!response.ok) {
          throw new Error(`API request failed with status: ${response.status}`);
        }
        
        const result = await response.json();
        const content = result.content || '';
        const thinking = result.thinking || [];
        
        const assistantMessage: Message = {
          role: "assistant",
          content,
          thinking
        };
        
        setMessages(prev => [...prev, assistantMessage]);
        setThoughtProcess(thinking);
        
      } catch (error) {
        console.error("Error processing follow-up question:", error);
        // Fall back to a generic response if the API call fails
        const assistantMessage: Message = {
          role: "assistant",
          content: "I've completed all the steps for your goal. Is there anything specific about the solution you'd like me to explain or modify?",
          thinking: ["Considering the completed task context", "Formulating helpful response options"]
        };
        setMessages(prev => [...prev, assistantMessage]);
      }
      
      setThinking(false);
    }
    
    setIsLoading(false);
  };

  const saveApiKey = () => {
    if (!tempApiKey.trim()) {
      toast({
        title: "Invalid API Key",
        description: "Please enter a valid OpenAI API key.",
        variant: "destructive"
      });
      return;
    }
    
    setApiKey(tempApiKey);
    setShowApiInput(false);
    setTempApiKey("");
    toast({
      title: "API Key Saved",
      description: "Your API key has been saved for this session.",
    });
  };

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
          {!apiKey && (
            <Button 
              variant="outline" 
              onClick={() => setShowApiInput(!showApiInput)}
              size="sm"
            >
              Add API Key
            </Button>
          )}
        </div>
        
        {showApiInput && (
          <div className="mt-4 p-4 border rounded-md bg-muted/30">
            <CardDescription className="mb-2">
              Enter your OpenAI API key to enable interactive features.
              Your key is stored in your browser session only and never sent to our servers.
            </CardDescription>
            <div className="flex gap-2">
              <Textarea 
                placeholder="sk-..." 
                value={tempApiKey} 
                onChange={(e) => setTempApiKey(e.target.value)}
                className="font-mono"
              />
              <Button onClick={saveApiKey} className="shrink-0">Save</Button>
            </div>
          </div>
        )}
        
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
                        <span className="font-semibold text-muted-foreground flex items-center gap-1">
                          <Sparkles className="h-3 w-3" /> Thought Process
                        </span>
                        <CircleX className="h-3 w-3 text-muted-foreground hover:text-foreground" />
                      </div>
                      <ul className="space-y-1 text-muted-foreground">
                        {message.thinking.map((thought, i) => (
                          <li key={i} className="flex items-start gap-1">
                            <span className="font-mono text-primary/70">•</span>
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
                      <Sparkles className="h-3 w-3 text-muted-foreground" />
                      <span className="font-semibold text-muted-foreground">Thinking...</span>
                    </div>
                    <ul className="space-y-1 text-muted-foreground">
                      {thoughtProcess.map((thought, i) => (
                        <li key={i} className="flex items-start gap-1">
                          <span className="font-mono text-primary/70">•</span>
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
      
      <CardFooter className="text-xs text-muted-foreground pt-4">
        <div className="w-full">
          <p>
            This interactive demo showcases the core concept of AutoGPT - an autonomous agent that breaks down complex goals into manageable steps and executes them systematically.
          </p>
          <p className="mt-2">
            For the full experience, connect your OpenAI API key (requires GPT-4).
          </p>
        </div>
      </CardFooter>
    </Card>
  );
}