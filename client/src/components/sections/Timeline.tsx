import { type Role } from "@/types/roles";
import { cn } from "@/lib/utils";

type TimelineEvent = {
  date: string;
  title: string;
  description: string;
  percentage: string;
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
      percentage: "92.3%",
      icon: "🚀"
    },
    {
      date: "2022",
      title: "Scaled Platform",
      description: "Improved system performance by 200%",
      percentage: "88.5%",
      icon: "⚡"
    },
    {
      date: "2023",
      title: "Innovation Impact",
      description: "Launched 5 major technical initiatives",
      percentage: "95.2%",
      icon: "💫"
    },
  ],
  "people-manager": [
    {
      date: "2021",
      title: "Team Foundation",
      description: "Built core engineering team of 10",
      percentage: "91.2%",
      icon: "🎯"
    },
    {
      date: "2022",
      title: "Process Optimization",
      description: "Reduced delivery time by 40%",
      percentage: "89.7%",
      icon: "⚙️"
    },
    {
      date: "2023",
      title: "Growth Achievement",
      description: "Expanded team to 3 departments",
      percentage: "94.1%",
      icon: "📈"
    },
  ],
  "individual-contributor": [
    {
      date: "2021",
      title: "Core System Design",
      description: "Architected primary backend services",
      percentage: "90.5%",
      icon: "🔧"
    },
    {
      date: "2022",
      title: "Performance Impact",
      description: "Optimized critical workflows by 60%",
      percentage: "93.8%",
      icon: "⚡"
    },
    {
      date: "2023",
      title: "Innovation Leadership",
      description: "Delivered 3 breakthrough features",
      percentage: "96.3%",
      icon: "🌟"
    },
  ],
};

export function Timeline({ role }: TimelineProps) {
  const events = timelineData[role];

  return (
    <div className="space-y-8">
      <h2 className="text-3xl font-bold text-center" style={{ color: '#222222' }}>Career Timeline</h2>

      <div className="relative pl-16 pt-8">
        {/* Vertical Timeline Line */}
        <div 
          className="absolute left-8 top-0 h-full w-1" 
          style={{ 
            background: 'linear-gradient(to bottom, #FF3366, #FF9933, #33CC99)',
          }} 
        />

        {/* Timeline Events */}
        <div className="space-y-20">
          {events.map((event, index) => (
            <div key={index} className="relative">
              {/* Circle with Icon */}
              <div 
                className="absolute -left-12 flex h-24 w-24 items-center justify-center rounded-full border-4"
                style={{ 
                  backgroundColor: '#FFFFFF',
                  borderColor: '#222222'
                }}
              >
                <span className="text-4xl">{event.icon}</span>
              </div>

              {/* Content */}
              <div className="ml-16 pt-2">
                {/* Year */}
                <div 
                  className="mb-2 text-lg font-bold"
                  style={{ color: '#222222' }}
                >
                  {event.date}
                </div>

                {/* Title and Description */}
                <div 
                  className="rounded-lg p-4"
                  style={{ backgroundColor: '#F8F8F8' }}
                >
                  <h3 
                    className="mb-2 text-xl font-semibold"
                    style={{ color: '#222222' }}
                  >
                    {event.title}
                  </h3>
                  <p 
                    className="mb-3 text-base"
                    style={{ color: '#7B7B7B' }}
                  >
                    {event.description}
                  </p>
                  <div 
                    className="text-right font-bold"
                    style={{ color: '#222222' }}
                  >
                    {event.percentage}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}