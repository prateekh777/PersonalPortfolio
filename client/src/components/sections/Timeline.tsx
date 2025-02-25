import { type Role } from "@/types/roles";
import { cn } from "@/lib/utils";

type TimelineEvent = {
  date: string;
  title: string;
  description: string;
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
      description: `<i>Scaling isn’t just about growth—it’s about stability.</i> At Complori, I led key initiatives that ensured conversion rates stayed strong despite scaling challenges. By refining engagement models and optimizing operational processes, we built a resilient system that supported long-term retention and sustained learner success.`,
      icon: "/images/brightchamps-logo.png"
    },
    {
      date: "2022",
      title: "Scaled Platform",
      description: "Improved system performance by 200%",
      icon: "/images/brightchamps-logo.png"
    },
    {
      date: "GREETUDE ENERGY 2017",
      title: "Innovation Impact",
      description: `• Designed ESEE - an Energy Audit and Solution Recommendation platform.\n` +
                  `• Took data from Energy guzzling equipments, analysed it, shared recommendations on solutions in order of RoI`,
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
                  "w-[48%]",
                  index % 2 === 0 ? "ml-auto pl-8" : "mr-auto pr-8"
                )}
              >
                {/* Connector Line */}
                <div 
                  className={cn(
                    "absolute top-8 h-0.5 w-[8%]",
                    index % 2 === 0 ? "left-[48%]" : "right-[48%]",
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