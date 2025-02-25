import { type Role } from "@/types/roles";
import { cn } from "@/lib/utils";

type TimelineEvent = {
  date: string;
  title: string;
  description: string;
  icon: string;
};

type TimelineProps = {
  role: Role;
};

const timelineData: Record<Role, TimelineEvent[]> = {
  "tech-leader": [
    {
      date: "2021",
      title: "Modernized Tech Stack",
      description: "Led migration to microservices architecture",
      icon: <img src="/BrightChamps_logo.png" alt="Tech Leader Icon" style={{width: '100%', height: '100%'}} />
    },
    {
      date: "2022",
      title: "Scaled Platform",
      description: "Improved system performance by 200%",
      icon: "⚡"
    },
    {
      date: "2023",
      title: "Innovation Impact",
      description: "Launched 5 major technical initiatives",
      icon: "💫"
    },
  ],
  "people-manager": [
    {
      date: "2021",
      title: "Team Foundation",
      description: "Built core engineering team of 10",
      icon: "🎯"
    },
    {
      date: "2022",
      title: "Process Optimization",
      description: "Reduced delivery time by 40%",
      icon: "⚙️"
    },
    {
      date: "2023",
      title: "Growth Achievement",
      description: "Expanded team to 3 departments",
      icon: "📈"
    },
  ],
  "individual-contributor": [
    {
      date: "2021",
      title: "Core System Design",
      description: "Architected primarily focusing on scalability and maintainability",
      icon: "🔧"
    },
    {
      date: "2022",
      title: "Performance Impact",
      description: "Optimized critical workflows by 60%",
      icon: "⚡"
    },
    {
      date: "2023",
      title: "Innovation Leadership",
      description: "Delivered 3 breakthrough features",
      icon: "🌟"
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
          style={{ 
            backgroundColor: '#222222',
          }} 
        />

        {/* Timeline Events */}
        <div className="space-y-12">
          {events.map((event, index) => (
            <div key={index} className="relative">
              {/* Circle with Icon */}
              <div 
                className={cn(
                  "absolute left-1/2 -translate-x-1/2 flex h-16 w-16 items-center justify-center rounded-full border-4",
                  "z-10"  // Ensure circle is above the line
                )}
                style={{ 
                  backgroundColor: '#FFFFFF',
                  borderColor: '#222222'
                }}
              >
                <span className="text-2xl">{event.icon}</span>
              </div>

              {/* Content */}
              <div 
                className={cn(
                  "w-[48%]", // Increased width to reduce white space
                  index % 2 === 0 ? "ml-auto pl-8" : "mr-auto pr-8" // Alternate sides
                )}
              >
                {/* Connector Line */}
                <div 
                  className={cn(
                    "absolute top-8 h-0.5 w-[8%]", // Reduced width for more compact layout
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