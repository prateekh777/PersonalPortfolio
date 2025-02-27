import { Github, ExternalLink, UserRoundCog, Bot, Cpu, Database, GitFork, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export function AutoGPTAgent() {
  return (
    <Card className="shadow-lg border-2 overflow-hidden">
      <div className="bg-gradient-to-r from-primary/10 to-primary/5 p-6">
        <div className="flex flex-col md:flex-row justify-between gap-6">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Bot className="h-8 w-8 text-primary" />
              <h2 className="text-3xl font-bold">AutoGPT</h2>
            </div>
            <p className="text-lg text-muted-foreground max-w-2xl">
              An autonomous AI agent that can perform complex tasks through self-prompting 
              and chain-of-thought reasoning. AutoGPT is designed to solve tasks autonomously 
              by breaking them down into sub-tasks.
            </p>
            <div className="flex gap-3">
              <div className="flex items-center gap-1 text-muted-foreground">
                <Star className="h-4 w-4" />
                <span className="font-semibold">172k</span>
              </div>
              <div className="flex items-center gap-1 text-muted-foreground">
                <GitFork className="h-4 w-4" />
                <span className="font-semibold">45.2k</span>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-center">
            <div className="bg-white p-4 rounded-full shadow-lg">
              <svg width="80" height="80" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2L3 7V17L12 22L21 17V7L12 2Z" fill="#4f46e5" stroke="#312e81" strokeWidth="1" />
                <path d="M12 6L7 9V15L12 18L17 15V9L12 6Z" fill="white" stroke="#312e81" strokeWidth="0.5" />
                <circle cx="12" cy="12" r="2" fill="#312e81" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="w-full justify-start px-6 pt-2">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="features">Features</TabsTrigger>
          <TabsTrigger value="demo">Demo</TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="px-6 py-4">
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold mb-2">About</h3>
              <p className="text-muted-foreground">
                AutoGPT is the vision of accessible AI for everyone, to use and to build on. 
                Created by Significant Gravitas, it's one of the first implementations of an 
                autonomous GPT-4 agent. It pushes the boundaries of what's possible with AI by 
                breaking complex goals into subtasks and reasoning through steps to achieve them.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-2">Architecture</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="flex items-center gap-2">
                      <UserRoundCog className="h-5 w-5" />
                      Agent Core
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      The central reasoning engine that manages goals, planning, and task execution
                    </p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="flex items-center gap-2">
                      <Cpu className="h-5 w-5" />
                      LLM Integration
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      Leverages models like GPT-4 for reasoning and generating actions toward goals
                    </p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="flex items-center gap-2">
                      <Database className="h-5 w-5" />
                      Memory System
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      Maintains context and stores information needed for long-running tasks
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-2">Technologies</h3>
              <div className="flex flex-wrap gap-2">
                <Badge>Python</Badge>
                <Badge>LLM</Badge>
                <Badge>GPT-4</Badge>
                <Badge>Autonomous Agents</Badge>
                <Badge>Natural Language Processing</Badge>
                <Badge>Chain-of-Thought</Badge>
              </div>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="features" className="px-6 py-4">
          <div className="space-y-6">
            <ul className="space-y-4">
              <li className="flex gap-3">
                <div className="h-6 w-6 rounded-full bg-primary/20 flex items-center justify-center text-primary">
                  1
                </div>
                <div>
                  <h4 className="text-base font-semibold">Autonomous Task Completion</h4>
                  <p className="text-muted-foreground">Completes complex tasks with minimal human intervention by breaking them into manageable subtasks</p>
                </div>
              </li>
              <li className="flex gap-3">
                <div className="h-6 w-6 rounded-full bg-primary/20 flex items-center justify-center text-primary">
                  2
                </div>
                <div>
                  <h4 className="text-base font-semibold">Long-term Memory</h4>
                  <p className="text-muted-foreground">Maintains context across multiple steps and remembers important information throughout the execution process</p>
                </div>
              </li>
              <li className="flex gap-3">
                <div className="h-6 w-6 rounded-full bg-primary/20 flex items-center justify-center text-primary">
                  3
                </div>
                <div>
                  <h4 className="text-base font-semibold">Internet Access</h4>
                  <p className="text-muted-foreground">Can search the web for information, access APIs, and interact with online resources</p>
                </div>
              </li>
              <li className="flex gap-3">
                <div className="h-6 w-6 rounded-full bg-primary/20 flex items-center justify-center text-primary">
                  4
                </div>
                <div>
                  <h4 className="text-base font-semibold">File Operations</h4>
                  <p className="text-muted-foreground">Can read, write, and manipulate files to complete tasks requiring data processing</p>
                </div>
              </li>
              <li className="flex gap-3">
                <div className="h-6 w-6 rounded-full bg-primary/20 flex items-center justify-center text-primary">
                  5
                </div>
                <div>
                  <h4 className="text-base font-semibold">Extensible Plugin System</h4>
                  <p className="text-muted-foreground">Supports plugins to add new capabilities and integrate with external tools and services</p>
                </div>
              </li>
            </ul>
          </div>
        </TabsContent>
        
        <TabsContent value="demo" className="px-6 py-4">
          <div className="space-y-4">
            <div className="rounded-lg overflow-hidden border bg-card text-card-foreground shadow">
              <div className="bg-muted p-3 flex justify-between items-center">
                <span className="font-medium">AutoGPT Demo Session</span>
                <div className="flex gap-1">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                </div>
              </div>
              <div className="p-4 font-mono text-sm bg-black text-emerald-300 h-64 overflow-y-auto">
                <p className="pb-1">Welcome to AutoGPT! I am an autonomous agent working to help you.</p>
                <p className="pb-1">🎯 Goal: Research the latest advancements in renewable energy and create a summary report.</p>
                <p className="pb-1">I'll break this down into steps:</p>
                <p className="pb-1 pl-4">1. Search for recent publications on renewable energy</p>
                <p className="pb-1 pl-4">2. Collect key information from credible sources</p>
                <p className="pb-1 pl-4">3. Organize findings by technology type</p>
                <p className="pb-1 pl-4">4. Generate a comprehensive summary report</p>
                <p className="pb-1">Executing step 1: Searching for recent publications...</p>
                <p className="pb-1">Found 24 relevant papers from the last 6 months. Analyzing content...</p>
                <p className="pb-1">Step 2: Collecting key information from sources with impact factor &gt;4.0...</p>
                <p className="pb-1">Creating summary...</p>
                <p className="pb-1">Writing report to renewable_energy_report.md</p>
                <p className="pb-1">Task completed successfully! The report contains 5 major breakthroughs in solar, wind, hydrogen, and battery storage technologies.</p>
              </div>
            </div>
            <p className="text-sm text-muted-foreground">
              This demo illustrates how AutoGPT autonomously breaks down a complex research task into manageable steps, executes each step with minimal supervision, and produces a useful output.
            </p>
          </div>
        </TabsContent>
      </Tabs>
      
      <Separator />
      
      <CardFooter className="flex justify-between p-6">
        <Button variant="outline" onClick={() => window.open("https://github.com/Significant-Gravitas/AutoGPT", "_blank")}>
          <Github className="mr-2 h-4 w-4" />
          View on GitHub
        </Button>
        <Button onClick={() => window.open("https://agpt.co", "_blank")}>
          <ExternalLink className="mr-2 h-4 w-4" />
          Visit AutoGPT Website
        </Button>
      </CardFooter>
    </Card>
  );
}