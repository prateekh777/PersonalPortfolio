import { type Role } from "@/types/roles";
import { cn } from "@/lib/utils";
import { Bold } from "lucide-react";

type TimelineEvent = {
  date: string;
  title: string;
  description: React.ReactNode; // Changed to React.ReactNode
  icon: string; // Path to the image in public directory
};

type TimelineProps = {
  role: Role;
};

const timelineData: Record<Role, TimelineEvent[]> = {
  "tech-leader": [
    {
      date: "2024 | Complori | VP, Product",
      title: "Processes and Data Management that Kept Conversion Rates Consistent",
      description: <><i>Scaling isn’t just about growth—it’s about stability.</i> At Complori, I led key initiatives that ensured conversion rates stayed strong despite scaling challenges. By refining engagement models and optimizing operational processes, we built a <b>resilient system </b> that supported long-term retention and sustained learner success.</>,
      icon: "/images/brightchamps-logo.png"
    },
    {
      date: "2023 | Glacier | Head of Product",
      title: "Let’s Get Tech-y! Bringing Solid Platforms, Engaging Tech Stacks, and Sharpening Vision",
      description: <><i>Tech meets climate action.</i> At Glacier, I introduced scalable product structures that <b>enhanced content delivery</b> and accelerated our ability to educate at scale. Entering the <b>DACH region</b>, I gained hands-on experience in <b>regional strategies</b>, optimizing market entry and product alignment for a new audience.</>,
      icon: "/images/brightchamps-logo.png"
    },
    {
      date: "2020 | BrightChamps | Head of Academy / Operations",
      title: "Designed Scalable Workflows for Partner Acquisition & Delivery",
      description: <>Building a high-growth education platform required <b>speed, agility, and scale</b>. I developed <b>processes and workflows</b> that streamlined partner acquisition and lesson delivery. Our system clocked<b> over millions of minutes in tutoring</b> , managed a vast network of educators, and ensured an exceptional learning experience—all while moving at startup velocity.</>,
      icon: "/images/brightchamps-logo.png"
    },
    {
      date: "2019 | Edoflip | CEO",
      title: "Built a Cross-Border Online Portal Connecting Tutors & Students",
      description: <>When I started Edoflip, the focus was on <b>building lasting relationships in learning</b>. The result? A platform where <b>100% of students came through referrals and renewals</b>, boasting 15% YoY growth and an average student lifetime of 28 months. These weren’t just numbers—they were a testament to the <b>trust and value created in our learning network.</b></>,
      icon: "/images/brightchamps-logo.png"
    },
    {
      date: "2020 | BrightChamps | Head of Academy / Operations",
      title: "Designed Scalable Workflows for Partner Acquisition & Delivery",
      description: <>Building a high-growth education platform required <b>speed, agility, and scale</b>. I developed <b>processes and workflows</b> that streamlined partner acquisition and lesson delivery. Our system clocked<b> over millions of minutes in tutoring</b> , managed a vast network of educators, and ensured an exceptional learning experience—all while moving at startup velocity.</>,
      icon: "/images/brightchamps-logo.png"
    },
  ],
  "people-manager": [
    {
      date: "2021",
      title: "Team Foundation",
      description: "Built core engineering team of 10",
      icon: "/images/brightchamps-logo.png"
    },
    {
      date: "2022",
      title: "Process Optimization",
      description: "Reduced delivery time by 40%",
      icon: "/images/brightchamps-logo.png"
    },
    {
      date: "2023",
      title: "Growth Achievement",
      description: "Expanded team to 3 departments",
      icon: "/images/brightchamps-logo.png"
    },
  ],
  "individual-contributor": [
    {
      date: "2021",
      title: "Core System Design",
      description: "Architected primarily focusing on scalability and maintainability",
      icon: "/images/brightchamps-logo.png"
    },
    {
      date: "2022",
      title: "Performance Impact",
      description: "Optimized critical workflows by 60%",
      icon: "/images/brightchamps-logo.png"
    },
    {
      date: "2023",
      title: "Innovation Leadership",
      description: "Delivered 3 breakthrough features",
      icon: "/images/brightchamps-logo.png"
    },
  ],
  "strategy-contributor": [
    {
      date: "2021",
      title: "Core System Design",
      description: "Architected primarily focusing on scalability and maintainability",
      icon: "/images/brightchamps-logo.png"
    },
    {
      date: "2022",
      title: "Performance Impact",
      description: "Optimized critical workflows by 60%",
      icon: "/images/brightchamps-logo.png"
    },
    {
      date: "2023",
      title: "Innovation Leadership",
      description: "Delivered 3 breakthrough features",
      icon: "/images/brightchamps-logo.png"
    },
  ],
};

export function Timeline({ role }: TimelineProps) {
  const events = timelineData[role];

  return (
    <div className="space-y-8">
      <h2 className="text-3xl font-bold text-center" style={{ color: '#222222' }}>Career Timeline</h2>

      <div className="relative py-8">
        {/* Vertical Timeline Line */}
        <div 
          className="absolute left-1/2 top-0 h-full w-1 -translate-x-1/2" 
          style={{ backgroundColor: '#222222' }} 
        />

        {/* Timeline Events */}
        <div className="space-y-12">
          {events.map((event, index) => (
            <div key={index} className="relative">
              {/* Circle with Image */}
              <div 
                className={cn(
                  "absolute left-1/2 -translate-x-1/2 flex h-16 w-16 items-center justify-center rounded-full border-4",
                  "z-10 bg-white overflow-hidden" // Added bg-white and overflow-hidden
                )}
                style={{ 
                  borderColor: '#222222'
                }}
              >
                <div className="w-12 h-12 relative"> {/* Added container for image */}
                  <img 
                    src={event.icon}
                    alt={event.title}
                    className="w-full h-full object-contain" // Changed to object-contain
                    onError={(e) => {
                      // Fallback handling if image fails to load
                      e.currentTarget.style.display = 'none';
                      e.currentTarget.parentElement!.innerHTML = '🔄';
                    }}
                  />
                </div>
              </div>

              {/* Content */}
              <div 
                className={cn(
                  "w-[42%]",
                  index % 2 === 0 ? "ml-auto pl-8" : "mr-auto pr-8",
                  index > 0 ? "mt-[-80px]" : ""
                )}
              >
                {/* Connector Line */}
                <div 
                  className={cn(
                    "absolute top-8 h-0.5 w-[10%]",
                    index % 2 === 0 ? "left-[42%]" : "right-[42%]",
                  )}
                  style={{ backgroundColor: '#222222' }}
                />

                {/* Content Box with Arrow */}
                <div 
                  className={cn(
                    "relative rounded-lg p-4",
                    index % 2 === 0 ? "ml-2" : "mr-2"
                  )}
                  style={{ backgroundColor: '#F8F8F8' }}
                >
                  {/* Arrow pointing to timeline */}
                  <div 
                    className={cn(
                      "absolute top-4 h-4 w-4 rotate-45",
                      index % 2 === 0 ? "-left-2" : "-right-2"
                    )}
                    style={{ backgroundColor: '#F8F8F8' }}
                  />

                  {/* Year */}
                  <div 
                    className="mb-2 text-base font-bold"
                    style={{ color: '#222222' }}
                  >
                    {event.date}
                  </div>

                  {/* Title and Description */}
                  <h3 
                    className="mb-2 text-lg font-semibold"
                    style={{ color: '#222222' }}
                  >
                    {event.title}
                  </h3>
                  <p 
                    className="text-sm"
                    style={{ color: '#7B7B7B' }}
                  >
                    {event.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}