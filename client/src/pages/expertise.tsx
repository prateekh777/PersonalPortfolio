import { useState } from "react";
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

type Role = "tech-leader" | "people-manager" | "individual-contributor" | "strategy-contributor";

export default function Expertise() {
  const [selectedRole, setSelectedRole] = useState<Role>("tech-leader");

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
    <div className="space-y-12 pt-16"> {/* Added top padding to account for fixed header */}
      <h1 className="text-4xl flex items=center justify-center font-bold ">Skills Honed, Stories Told.. My Journey!</h1>

      {/* Role Selection - Made sticky */}
      <div className="sticky top-14 z-40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 py-4 rounded-lg">
        <div className="flex items-center justify-center gap-4">
          <label className="text-lg font-medium">My Hats</label>
          <Select value={selectedRole} onValueChange={(value: Role) => setSelectedRole(value)}>
            <SelectTrigger className="w-[280px]">
              <SelectValue placeholder="Select a role" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="tech-leader">Product Leader</SelectItem>
              <SelectItem value="people-manager">Operations - People Manager</SelectItem>
              <SelectItem value="individual-contributor">Founder - CXO</SelectItem>
              <SelectItem value="strategy-contributor">Strategy and Planning</SelectItem>
            </SelectContent>
          </Select>
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