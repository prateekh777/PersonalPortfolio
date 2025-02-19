import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { type Section, type Project, type Frame } from "@shared/schema";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, Edit, Trash2, Move, Type, Image, Video, Layers } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from "@/components/ui/resizable";
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerTrigger } from "@/components/ui/drawer";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";

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

  // Mutations
  const deleteSection = useMutation({
    mutationFn: async (id: number) => {
      await apiRequest("DELETE", `/api/sections/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/sections/home"] });
      toast({
        title: "Section deleted",
        description: "The section has been successfully deleted.",
      });
    },
  });

  const deleteProject = useMutation({
    mutationFn: async (id: number) => {
      await apiRequest("DELETE", `/api/projects/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/projects"] });
      toast({
        title: "Project deleted",
        description: "Project has been deleted successfully.",
      });
    },
  });

  const createFrame = useMutation({
    mutationFn: async (frame: { title: string; sectionId: number; contentType: string }) => {
      await apiRequest("POST", "/api/frames", {
        ...frame,
        x: 0,
        y: 0,
        width: 50,
        height: 30,
        content: { text: "", styles: {} }
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/sections", sections?.[0]?.id, "frames"] });
      toast({
        title: "Frame created",
        description: "New frame has been added to the section.",
      });
    },
  });

  const updateFrame = useMutation({
    mutationFn: async ({ id, ...frame }: Partial<Frame> & { id: number }) => {
      await apiRequest("PATCH", `/api/frames/${id}`, frame);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/sections", sections?.[0]?.id, "frames"] });
      toast({
        title: "Frame updated",
        description: "Frame has been updated successfully.",
      });
    },
  });

  const deleteFrame = useMutation({
    mutationFn: async (id: number) => {
      await apiRequest("DELETE", `/api/frames/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/sections", sections?.[0]?.id, "frames"] });
      toast({
        title: "Frame deleted",
        description: "Frame has been deleted successfully.",
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
          <div className="flex justify-end gap-2">
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Section
            </Button>
          </div>

          <div className="grid gap-4">
            {sections?.map((section) => (
              <Card key={section.id}>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span>{section.title}</span>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <Edit className="mr-2 h-4 w-4" />
                        Edit Section
                      </Button>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => deleteSection.mutate(section.id)}
                      >
                        <Trash2 className="mr-2 h-4 w-4" />
                        Delete
                      </Button>
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="mb-4">
                    <p className="text-muted-foreground">{section.content}</p>
                  </div>

                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <h3 className="text-lg font-semibold">Frames</h3>
                      <div className="flex gap-2">
                        <Drawer>
                          <DrawerTrigger asChild>
                            <Button variant="outline" size="sm">
                              <Plus className="mr-2 h-4 w-4" />
                              Add Frame
                            </Button>
                          </DrawerTrigger>
                          <DrawerContent>
                            <DrawerHeader>
                              <DrawerTitle>Add New Frame</DrawerTitle>
                            </DrawerHeader>
                            <div className="p-4 space-y-4">
                              <div className="grid grid-cols-3 gap-2">
                                <Button
                                  variant="outline"
                                  onClick={() =>
                                    createFrame.mutate({
                                      title: "New Text Frame",
                                      sectionId: section.id,
                                      contentType: "text"
                                    })
                                  }
                                >
                                  <Type className="h-8 w-8 mb-2" />
                                  <span>Text Frame</span>
                                </Button>
                                <Button
                                  variant="outline"
                                  onClick={() =>
                                    createFrame.mutate({
                                      title: "New Image Frame",
                                      sectionId: section.id,
                                      contentType: "image"
                                    })
                                  }
                                >
                                  <Image className="h-8 w-8 mb-2" />
                                  <span>Image Frame</span>
                                </Button>
                                <Button
                                  variant="outline"
                                  onClick={() =>
                                    createFrame.mutate({
                                      title: "New Video Frame",
                                      sectionId: section.id,
                                      contentType: "video"
                                    })
                                  }
                                >
                                  <Video className="h-8 w-8 mb-2" />
                                  <span>Video Frame</span>
                                </Button>
                              </div>
                            </div>
                          </DrawerContent>
                        </Drawer>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      {/* Frame Preview Area */}
                      <div className="border rounded-lg p-4 bg-gray-50 min-h-[400px] relative">
                        <h4 className="text-sm font-medium mb-2">Preview Area</h4>
                        {frames?.map((frame) => (
                          <div
                            key={frame.id}
                            className="absolute border-2 border-blue-500 bg-white p-2 cursor-move"
                            style={{
                              left: `${frame.x}%`,
                              top: `${frame.y}%`,
                              width: `${frame.width}%`,
                              height: `${frame.height}%`,
                              zIndex: frame.zIndex,
                            }}
                          >
                            {frame.contentType === "text" && (
                              <p style={frame.content.styles}>{frame.content.text || "Empty Text Frame"}</p>
                            )}
                            {frame.contentType === "image" && frame.content.mediaUrl && (
                              <img
                                src={frame.content.mediaUrl}
                                alt={frame.content.altText || "Frame image"}
                                className="w-full h-full object-cover"
                              />
                            )}
                            {frame.contentType === "video" && frame.content.mediaUrl && (
                              <video
                                src={frame.content.mediaUrl}
                                controls
                                className="w-full h-full"
                              />
                            )}
                          </div>
                        ))}
                      </div>

                      {/* Frame List */}
                      <div className="border rounded-lg p-4">
                        <h4 className="text-sm font-medium mb-2">Frame List</h4>
                        <div className="space-y-2">
                          {frames?.map((frame) => (
                            <div
                              key={frame.id}
                              className="p-3 border rounded-lg hover:bg-gray-50"
                            >
                              <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                  <Move className="h-4 w-4 text-muted-foreground" />
                                  <span className="font-medium">{frame.title}</span>
                                </div>
                                <div className="flex gap-2">
                                  <Drawer>
                                    <DrawerTrigger asChild>
                                      <Button variant="outline" size="sm">
                                        <Edit className="mr-2 h-4 w-4" />
                                        Edit
                                      </Button>
                                    </DrawerTrigger>
                                    <DrawerContent>
                                      <DrawerHeader>
                                        <DrawerTitle>Edit Frame</DrawerTitle>
                                      </DrawerHeader>
                                      <div className="p-4 space-y-4">
                                        <div className="space-y-2">
                                          <Label>Position</Label>
                                          <div className="grid grid-cols-2 gap-2">
                                            <div>
                                              <Label htmlFor="x">X (%)</Label>
                                              <Input
                                                id="x"
                                                type="number"
                                                value={frame.x}
                                                onChange={(e) =>
                                                  updateFrame.mutate({
                                                    id: frame.id,
                                                    x: parseFloat(e.target.value),
                                                  })
                                                }
                                              />
                                            </div>
                                            <div>
                                              <Label htmlFor="y">Y (%)</Label>
                                              <Input
                                                id="y"
                                                type="number"
                                                value={frame.y}
                                                onChange={(e) =>
                                                  updateFrame.mutate({
                                                    id: frame.id,
                                                    y: parseFloat(e.target.value),
                                                  })
                                                }
                                              />
                                            </div>
                                          </div>
                                        </div>
                                        <div className="space-y-2">
                                          <Label>Size</Label>
                                          <div className="grid grid-cols-2 gap-2">
                                            <div>
                                              <Label htmlFor="width">Width (%)</Label>
                                              <Input
                                                id="width"
                                                type="number"
                                                value={frame.width}
                                                onChange={(e) =>
                                                  updateFrame.mutate({
                                                    id: frame.id,
                                                    width: parseFloat(e.target.value),
                                                  })
                                                }
                                              />
                                            </div>
                                            <div>
                                              <Label htmlFor="height">Height (%)</Label>
                                              <Input
                                                id="height"
                                                type="number"
                                                value={frame.height}
                                                onChange={(e) =>
                                                  updateFrame.mutate({
                                                    id: frame.id,
                                                    height: parseFloat(e.target.value),
                                                  })
                                                }
                                              />
                                            </div>
                                          </div>
                                        </div>
                                        <div className="space-y-2">
                                          <Label>Z-Index</Label>
                                          <Input
                                            type="number"
                                            value={frame.zIndex}
                                            onChange={(e) =>
                                              updateFrame.mutate({
                                                id: frame.id,
                                                zIndex: parseInt(e.target.value),
                                              })
                                            }
                                          />
                                        </div>
                                        <div className="space-y-2">
                                          <Label>Content</Label>
                                          {frame.contentType === "text" && (
                                            <Textarea
                                              value={frame.content.text}
                                              onChange={(e) =>
                                                updateFrame.mutate({
                                                  id: frame.id,
                                                  content: {
                                                    ...frame.content,
                                                    text: e.target.value,
                                                  },
                                                })
                                              }
                                            />
                                          )}
                                          {frame.contentType === "image" && (
                                            <Input
                                              type="text"
                                              placeholder="Image URL"
                                              value={frame.content.mediaUrl}
                                              onChange={(e) =>
                                                updateFrame.mutate({
                                                  id: frame.id,
                                                  content: {
                                                    ...frame.content,
                                                    mediaUrl: e.target.value,
                                                  },
                                                })
                                              }
                                            />
                                          )}
                                          {frame.contentType === "video" && (
                                            <Input
                                              type="text"
                                              placeholder="Video URL"
                                              value={frame.content.mediaUrl}
                                              onChange={(e) =>
                                                updateFrame.mutate({
                                                  id: frame.id,
                                                  content: {
                                                    ...frame.content,
                                                    mediaUrl: e.target.value,
                                                  },
                                                })
                                              }
                                            />
                                          )}
                                        </div>
                                        <div className="flex items-center space-x-2">
                                          <Label htmlFor="responsive">Responsive</Label>
                                          <Switch
                                            id="responsive"
                                            checked={frame.isResponsive}
                                            onCheckedChange={(checked) =>
                                              updateFrame.mutate({
                                                id: frame.id,
                                                isResponsive: checked,
                                              })
                                            }
                                          />
                                        </div>
                                      </div>
                                    </DrawerContent>
                                  </Drawer>
                                  <Button
                                    variant="destructive"
                                    size="sm"
                                    onClick={() => deleteFrame.mutate(frame.id)}
                                  >
                                    <Trash2 className="mr-2 h-4 w-4" />
                                    Delete
                                  </Button>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="projects" className="space-y-4">
          <div className="flex justify-end">
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Project
            </Button>
          </div>
          <div className="grid gap-4">
            {projects?.map((project) => (
              <Card key={project.id}>
                <CardHeader>
                  <CardTitle>{project.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{project.description}</p>
                  <div className="mt-4 flex gap-2">
                    <Button variant="outline" size="sm">
                      <Edit className="mr-2 h-4 w-4" />
                      Edit
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => deleteProject.mutate(project.id)}
                    >
                      <Trash2 className="mr-2 h-4 w-4" />
                      Delete
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="case-studies">
          <p>Case Studies management coming soon...</p>
        </TabsContent>

        <TabsContent value="ai-works">
          <p>AI Works management coming soon...</p>
        </TabsContent>

        <TabsContent value="interests">
          <p>Interests management coming soon...</p>
        </TabsContent>
      </Tabs>
    </div>
  );
}