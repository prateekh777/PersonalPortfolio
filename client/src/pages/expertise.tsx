import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { type Section } from "@shared/schema";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Timeline } from "@/components/sections/Timeline";
import { Highlights } from "@/components/sections/Highlights";

type Role =
  | "tech-leader"
  | "people-manager"
  | "individual-contributor"
  | "strategy-contributor";

export default function Expertise() {
  const [selectedRole, setSelectedRole] = useState<Role>("tech-leader");
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const { data: sections, isLoading } = useQuery<Section[]>({
    queryKey: ["/api/sections/expertise"],
  });

  if (isLoading) {
    return (
      <div className="grid gap-6 md:grid-cols-2">
        <Skeleton className="h-[300px]" />
        <Skeleton className="h-[300px]" />
        <Skeleton className="h-[300px]" />
        <Skeleton className="h-[300px]" />
      </div>
    );
  }

  return (
    <div className="space-y-12 pt-16">
      {" "}
      {/* Added top padding to account for fixed header */}
      <h1 className="text-4xl flex items=center justify-center font-bold ">
        Skills Honed, Stories Told.. My Journey!
      </h1>
      {/* Role Selection - Made sticky with tabs instead of dropdown */}
      <div className="sticky top-14 z-40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 py-4 rounded-lg">
        <div className="flex flex-col items-center justify-center gap-2">
          <h2 className="text-xl font-medium mb-2">My Hats</h2>
          <div className="flex flex-wrap items-center justify-center gap-2">
            <button 
              onClick={() => setSelectedRole("tech-leader")}
              className={`px-4 py-2 rounded-lg transition-colors ${
                selectedRole === "tech-leader" 
                  ? "bg-primary text-primary-foreground font-medium" 
                  : "bg-muted hover:bg-muted/80"
              }`}
            >
              Product Leader
            </button>
            <button 
              onClick={() => setSelectedRole("people-manager")}
              className={`px-4 py-2 rounded-lg transition-colors ${
                selectedRole === "people-manager" 
                  ? "bg-primary text-primary-foreground font-medium" 
                  : "bg-muted hover:bg-muted/80"
              }`}
            >
              Operations - People Manager
            </button>
            <button 
              onClick={() => setSelectedRole("individual-contributor")}
              className={`px-4 py-2 rounded-lg transition-colors ${
                selectedRole === "individual-contributor" 
                  ? "bg-primary text-primary-foreground font-medium" 
                  : "bg-muted hover:bg-muted/80"
              }`}
            >
              Founder - CXO
            </button>
            <button 
              onClick={() => setSelectedRole("strategy-contributor")}
              className={`px-4 py-2 rounded-lg transition-colors ${
                selectedRole === "strategy-contributor" 
                  ? "bg-primary text-primary-foreground font-medium" 
                  : "bg-muted hover:bg-muted/80"
              }`}
            >
              Strategy and Planning
            </button>
          </div>
        </div>
      </div>
      {/* Timeline Section */}
      <Timeline role={selectedRole} />
      {/* Highlights Section */}
      <Highlights role={selectedRole} />
      {/* Original Sections */}
      <div className="grid gap-6 md:grid-cols-2">
        {sections?.map((section) => (
          <Card key={section.id}>
            <CardContent className="p-6">
              <h2 className="mb-4 text-2xl font-bold">{section.title}</h2>
              <p className="text-muted-foreground">{section.content}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
