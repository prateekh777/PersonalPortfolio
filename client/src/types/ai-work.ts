export interface AiWork {
  id: number;
  title: string;
  description: string;
  imageUrl: string | null;
  mediaType: "image" | "video";
  demoUrl: string | null;
  technologies: string[];
}