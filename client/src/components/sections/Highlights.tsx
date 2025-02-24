import { type Role } from "@/types/roles";
import { Card } from "@/components/ui/card";

type HighlightsProps = {
  role: Role;
};

const highlightsData: Record<Role, {
  image: string;
  points: string[];
}> = {
  "tech-leader": {
    image: "/images/tech-leader.jpg",
    points: [
      "Led architectural decisions for enterprise-scale applications",
      "Established technical standards and best practices",
      "Mentored and grew technical teams",
      "Drove innovation and technical excellence",
    ],
  },
  "people-manager": {
    image: "/images/people-manager.jpg",
    points: [
      "Built and managed high-performing engineering teams",
      "Developed career growth paths for team members",
      "Implemented agile methodologies and processes",
      "Fostered inclusive and collaborative team culture",
    ],
  },
  "individual-contributor": {
    image: "/images/individual-contributor.jpg",
    points: [
      "Developed complex technical solutions",
      "Contributed to open-source projects",
      "Specialized in performance optimization",
      "Led technical design and implementation",
    ],
  },
};

export function Highlights({ role }: HighlightsProps) {
  const { image, points } = highlightsData[role];

  return (
    <div className="space-y-8">
      <h2 className="text-3xl font-bold">Key Highlights</h2>
      <Card>
        <div className="grid gap-8 p-6 md:grid-cols-2">
          <div className="relative aspect-square overflow-hidden rounded-lg">
            <img
              src={image}
              alt={`${role} highlights`}
              className="absolute inset-0 h-full w-full object-cover"
            />
          </div>
          <div className="space-y-4">
            <ul className="space-y-4">
              {points.map((point, index) => (
                <li key={index} className="flex items-start">
                  <span className="mr-2 mt-1.5 h-3 w-3 shrink-0 rounded-full bg-primary" />
                  <span className="text-lg">{point}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Card>
    </div>
  );
}