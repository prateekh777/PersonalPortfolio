import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { type Section, type Project, type Frame } from "@shared/schema";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, Edit, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { FrameEditor } from "@/components/editor/FrameEditor";

export default function AdminDashboard() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const { data: sections } = useQuery<Section[]>({
    queryKey: ["/api/sections/home"],
  });

  const { data: projects } = useQuery<Project[]>({
    queryKey: ["/api/projects"],
  });

  const { data: frames } = useQuery<Frame[]>({
    queryKey: ["/api/sections", sections?.[0]?.id, "frames"],
    enabled: !!sections?.[0]?.id,
  });

  const createFrame = useMutation({
    mutationFn: async (frame: {
      title: string;
      sectionId: number;
      contentType: "text" | "image" | "video";
    }) => {
      return apiRequest("POST", "/api/frames", {
        ...frame,
        x: 10,
        y: 10,
        width: 30,
        height: 20,
        content: { text: "", styles: {} },
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["/api/sections", sections?.[0]?.id, "frames"],
      });
      toast({
        title: "Frame created",
        description: "New frame has been added to the section.",
      });
    },
  });

  const updateFrame = useMutation({
    mutationFn: async ({ id, ...frame }: Partial<Frame> & { id: number }) => {
      return apiRequest("PATCH", `/api/frames/${id}`, frame);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["/api/sections", sections?.[0]?.id, "frames"],
      });
    },
  });

  const deleteFrame = useMutation({
    mutationFn: async (id: number) => {
      await apiRequest("DELETE", `/api/frames/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["/api/sections", sections?.[0]?.id, "frames"],
      });
      toast({
        title: "Frame deleted",
        description: "Frame has been deleted successfully.",
      });
    },
  });

  const publishSection = useMutation({
    mutationFn: async (id: number) => {
      return apiRequest("POST", `/api/sections/${id}/publish`);
    },
    onSuccess: () => {
      toast({
        title: "Changes published",
        description: "Your changes are now live on the website.",
      });
    },
  });

  return (
    <div className="space-y-8">
      <h1 className="text-4xl font-bold">Admin Dashboard</h1>

      <Tabs defaultValue="home" className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="home">Home</TabsTrigger>
          <TabsTrigger value="projects">Projects</TabsTrigger>
          <TabsTrigger value="case-studies">Case Studies</TabsTrigger>
          <TabsTrigger value="ai-works">AI Works</TabsTrigger>
          <TabsTrigger value="interests">Interests</TabsTrigger>
        </TabsList>

        <TabsContent value="home" className="space-y-4">
          {sections?.map((section) => (
            <Card key={section.id}>
              <CardHeader>
                <CardTitle>{section.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <FrameEditor
                  sectionId={section.id}
                  frames={frames || []}
                  onCreateFrame={(contentType) =>
                    createFrame.mutate({
                      title: `New ${contentType} Frame`,
                      sectionId: section.id,
                      contentType,
                    })
                  }
                  onUpdateFrame={(id, updates) =>
                    updateFrame.mutate({ id, ...updates })
                  }
                  onDeleteFrame={(id) => deleteFrame.mutate(id)}
                  onPublish={() => publishSection.mutate(section.id)}
                />
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="projects">
          <p>Projects management...</p>
        </TabsContent>

        <TabsContent value="case-studies">
          <p>Case Studies management...</p>
        </TabsContent>

        <TabsContent value="ai-works">
          <p>AI Works management...</p>
        </TabsContent>

        <TabsContent value="interests">
          <p>Interests management...</p>
        </TabsContent>
      </Tabs>
    </div>
  );
}