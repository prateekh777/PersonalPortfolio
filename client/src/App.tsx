import { Switch, Route } from "wouter";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import { Toaster } from "@/components/ui/toaster";
import Navbar from "@/components/Navbar";
//import Hero from "@/components/Hero"; //Hero is not used, removing import to avoid error

// Pages
import Home from "@/pages/home";
import Expertise from "@/pages/expertise";
import CaseStudies from "@/pages/case-studies";
import Projects from "@/pages/projects";
import AiWorks from "@/pages/ai-works";
import Contact from "@/pages/contact";
import Interests from "@/pages/interests";
import AdminDashboard from "@/pages/admin/dashboard";
import NotFound from "@/pages/not-found";

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
    <QueryClientProvider client={queryClient}>
      <div className="relative min-h-screen">
        <Navbar />
        <main>
          <Router />
        </main>
      </div>
      <Toaster />
    </QueryClientProvider>
  );
}

export default App;