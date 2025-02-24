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
      <h2 className="text-3xl font-bold text-center">Career Timeline</h2>

      <div className="relative mt-16 px-8">
        {/* Timeline Base Line */}
        <div className="absolute top-8 left-0 w-full h-2 bg-gradient-to-r from-[#FF3366] via-[#FF9933] to-[#33CC99]" />

        {/* Timeline Events */}
        <div className="relative grid grid-cols-3 gap-4">
          {events.map((event, index) => (
            <div key={index} className="flex flex-col items-center">
              {/* Year Label */}
              <div className="mb-4 text-lg font-bold">{event.date}</div>

              {/* Node Point */}
              <div className="w-6 h-6 rounded-full bg-white border-4 border-primary mb-4" />

              {/* Content Box */}
              <div className={cn(
                "w-full p-4 rounded-lg shadow-lg bg-white border border-muted",
                "transform transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
              )}>
                <div className="text-3xl mb-2">{event.icon}</div>
                <h3 className="text-lg font-semibold mb-2">{event.title}</h3>
                <p className="text-sm text-muted-foreground mb-3">{event.description}</p>
                <div className="text-right text-primary font-bold">{event.percentage}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}