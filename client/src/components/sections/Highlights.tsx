import { type Role } from "@/types/roles";
import { Card } from "@/components/ui/card";

type HighlightsProps = {
  role: Role;
};

const highlightsData: Record<Role, {
  media: string;
  mediaType: 'image' | 'video';
  points: string[];
}> = {
  "tech-leader": {
    media: "/assets/Cliamte Business.jpeg",
    mediaType: 'image',
    points: [
      "Led initiatives to stabilize conversion rates during rapid scaling, refining engagement models and optimizing processes for sustained learner success.",
      "Introduced scalable product structures in climate education, enhancing content delivery and facilitating successfully large group learner engagements in the DACH region.",
      "Developed scalable workflows for partner acquisition and lesson delivery, increasing operational efficiency and managing millions of tutoring minutes.",
      "Founded an online educational platform where 100% of students came through referrals, achieving 15% YoY growth and extended student engagement.",
      "Designed an Energy Audit & Solutions Recommendation Engine, achieving significant energy savings and lighting up hundreds of homes annually.",
    ],
  },
  "people-manager": {
    media: "/assets/Sales done slack text.jpg",
    mediaType: 'image',
    points: [
      "Developed and implemented robust operational strategies that streamlined company workflows, significantly increasing efficiency and reducing costs by over 20%.",
      "Fostered a team-oriented environment that encouraged innovation and collaborative problem-solving, leading to a 25% increase in project delivery efficiency.",
      "Spearheaded the adoption of advanced digital tools and project management systems, enhancing team productivity and enabling real-time tracking of key performance indicators.",
      "Initiated and led a company-wide change management program that successfully integrated agile methodologies, improving responsiveness and flexibility in operations.",
      "Championed employee well-being and professional growth, resulting in a 15% improvement in employee retention rates and a highly engaged workforce.",
    ],
  },
  "individual-contributor": {
    media: "/images/individual-contributor.jpg",
    mediaType: 'image',
    points: [
      "Developed complex technical solutions",
      "Contributed to open-source projects",
      "Specialized in performance optimization",
      "Led technical design and implementation",
    ],
  },
  "strategy-contributor": {
    media: "/Interests/Startups/BC Video.mp4",
    mediaType: 'video',
    points: [
      "Developed complex technical solutions",
      "Contributed to open-source projects",
      "Specialized in performance optimization",
      "Led technical design and implementation",
    ],
  },
};

export function Highlights({ role }: HighlightsProps) {
  const { media, mediaType, points } = highlightsData[role];

  return (
    <div className="space-y-8">
      <h2 className="text-3xl font-bold">Key Highlights</h2>
      <Card>
        <div className="grid gap-8 p-6 md:grid-cols-2">
          <div className="relative aspect-square overflow-hidden rounded-lg">
            {mediaType === 'video' ? (
              <video
                src={media}
                controls
                autoPlay
                loop
                muted
                className="absolute inset-0 h-full w-full object-cover"
              />
            ) : (
              <img
                src={media}
                alt={`${role} highlights`}
                className="absolute inset-0 h-full w-full object-cover"
              />
            )}
          </div>
          <div className="space-y-4">
            <ul className="list-disc list-inside space-y-4">
              {points.map((point, index) => (
                <li key={index} className="text-lg">
                  {point}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Card>
    </div>
  );
}