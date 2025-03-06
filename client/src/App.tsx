import { Switch, Route } from "wouter";
import { QueryClientProvider } from "@tanstack/react-query";
// Import mock query client instead of the real one
import { mockQueryClient } from "./lib/mockQueryClient"; 
import { Toaster } from "@/components/ui/toaster";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { FontChecker } from "@/components/FontChecker";
import NotFound from "@/pages/not-found";

// Pages
import Home from "@/pages/home";
import Expertise from "@/pages/expertise";
import CaseStudies from "@/pages/case-studies";
import Projects from "@/pages/projects";
import AiWorks from "@/pages/ai-works";
import Contact from "@/pages/contact";
import Interests from "@/pages/interests";
import AdminDashboard from "@/pages/admin/dashboard";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/expertise" component={Expertise} />
      <Route path="/case-studies" component={CaseStudies} />
      <Route path="/projects" component={Projects} />
      <Route path="/ai-works" component={AiWorks} />
      <Route path="/contact" component={Contact} />
      <Route path="/interests" component={Interests} />
      <Route path="/admin/dashboard" component={AdminDashboard} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={mockQueryClient}>
      <div className="relative min-h-screen">
        <Header />
        <main className="container mx-auto px-4 py-8">
          <Router />
        </main>
        <Footer />
        <FontChecker />
      </div>
      <Toaster />
    </QueryClientProvider>
  );
}

export default App;
