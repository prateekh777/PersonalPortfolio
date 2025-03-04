import { type Role } from "@/types/roles";
import { Card } from "@/components/ui/card";
import { Play } from "lucide-react";
import { useState } from "react";

type HighlightsProps = {
  role: Role;
};

// Updated interface to support both images and videos
type MediaContent = {
  type: 'image' | 'video';
  url: string;
  posterUrl?: string; // Optional poster image for videos
};

const highlightsData: Record<Role, {
  media: MediaContent;
  points: string[];
}> = {
  "tech-leader": {
    media: {
      type: 'image',
      url: "/assets/Cliamte Business.jpeg",
    },
    points: [
      "Led initiatives to stabilize conversion rates during rapid scaling, refining engagement models and optimizing processes for sustained learner success.",
      "Introduced scalable product structures in climate education, enhancing content delivery and facilitating successfully large group learner engagements in the DACH region.",
      "Developed scalable workflows for partner acquisition and lesson delivery, increasing operational efficiency and managing millions of tutoring minutes.",
      "Founded an online educational platform where 100% of students came through referrals, achieving 15% YoY growth and extended student engagement.",
      "Designed an Energy Audit & Solutions Recommendation Engine, achieving significant energy savings and lighting up hundreds of homes annually.",
    ],
  },
  "people-manager": {
    media: {
      type: 'image',
      url: "/assets/Sales done slack text.jpg",
    },
    points: [
      "Developed and implemented robust operational strategies that streamlined company workflows, significantly increasing efficiency and reducing costs by over 20%.",
      "Fostered a team-oriented environment that encouraged innovation and collaborative problem-solving, leading to a 25% increase in project delivery efficiency.",
      "Spearheaded the adoption of advanced digital tools and project management systems, enhancing team productivity and enabling real-time tracking of key performance indicators.",
      "Initiated and led a company-wide change management program that successfully integrated agile methodologies, improving responsiveness and flexibility in operations.",
      "Championed employee well-being and professional growth, resulting in a 15% improvement in employee retention rates and a highly engaged workforce.",
    ],
  },
  "individual-contributor": {
    media: {
      type: 'image',
      url: "/images/gradients/green_card.png",
    },
    points: [
      "Developed complex technical solutions",
      "Contributed to open-source projects",
      "Specialized in performance optimization",
      "Led technical design and implementation",
    ],
  },
  "strategy-contributor": {
    media: {
      type: 'video',
      url: "/Interests/Startups/BC Video.mp4",
      posterUrl: "/images/brightchamps-logo.png", // Poster image for the video
    },
    points: [
      "Developed complex technical solutions",
      "Contributed to open-source projects",
      "Specialized in performance optimization",
      "Led technical design and implementation",
    ],
  },
};

export function Highlights({ role }: HighlightsProps) {
  const { media, points } = highlightsData[role];
  const [isPlaying, setIsPlaying] = useState(false);

  // Function to handle video play/pause
  const handleVideoClick = (videoEl: HTMLVideoElement) => {
    if (videoEl.paused) {
      videoEl.play()
        .then(() => {
          setIsPlaying(true);
        })
        .catch((error) => {
          console.error("Error playing video:", error);
          // Show a message to the user that autoplay might be blocked
        });
    } else {
      videoEl.pause();
      setIsPlaying(false);
    }
  };
  
  // Listen for video end event to reset play state
  const handleVideoEnded = (videoEl: HTMLVideoElement) => {
    setIsPlaying(false);
    // Optionally reset video to beginning
    videoEl.currentTime = 0;
  };

  return (
    <div className="space-y-8">
      <h2 className="text-3xl font-bold">Key Highlights</h2>
      <Card>
        <div className="grid gap-8 p-6 md:grid-cols-2">
          <div className="relative aspect-square overflow-hidden rounded-lg">
            {media.type === 'image' ? (
              <img
                src={media.url}
                alt={`${role} highlights`}
                className="absolute inset-0 h-full w-full object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = "https://via.placeholder.com/400?text=Image+Not+Found";
                }}
              />
            ) : (
              <div className="relative h-full w-full">
                <video
                  src={media.url}
                  poster={media.posterUrl}
                  className="absolute inset-0 h-full w-full object-cover cursor-pointer"
                  onClick={(e) => handleVideoClick(e.target as HTMLVideoElement)}
                  onError={(e) => {
                    const videoEl = e.target as HTMLVideoElement;
                    videoEl.style.display = 'none';
                    const parent = videoEl.parentElement;
                    if (parent) {
                      const errorImg = document.createElement('img');
                      errorImg.src = "https://via.placeholder.com/400?text=Video+Not+Found";
                      errorImg.className = "absolute inset-0 h-full w-full object-cover";
                      parent.appendChild(errorImg);
                    }
                  }}
                />
                {!isPlaying && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30 z-10">
                    <div className="rounded-full bg-white bg-opacity-80 p-3 shadow-lg">
                      <Play className="h-8 w-8 text-[#222222]" />
                    </div>
                  </div>
                )}
              </div>
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