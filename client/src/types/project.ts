// Project type definition for the static website
export interface Project {
  id: number;
  title: string;
  subtitle?: string;
  description: string;
  imageUrl?: string;
  projectUrl?: string;
  tags?: string[];
  position?: string;
}