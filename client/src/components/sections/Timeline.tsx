import { type Role } from "@/types/roles";

type TimelineEvent = {
  date: string;
  title: string;
  description: string;
};

type TimelineProps = {
  role: Role;
};

const timelineData: Record<Role, TimelineEvent[]> = {
  "tech-leader": [
    {
      date: "2023 - Present",
      title: "Technical Architecture Lead",
      description: "Leading system design and architectural decisions for enterprise applications",
    },
    {
      date: "2021 - 2023",
      title: "Senior Technical Lead",
      description: "Spearheaded technical initiatives and mentored development teams",
    },
  ],
  "people-manager": [
    {
      date: "2022 - Present",
      title: "Engineering Manager",
      description: "Managing cross-functional teams and driving organizational growth",
    },
    {
      date: "2020 - 2022",
      title: "Team Lead",
      description: "Led agile teams and facilitated career development",
    },
  ],
  "individual-contributor": [
    {
      date: "2023 - Present",
      title: "Principal Engineer",
      description: "Solving complex technical challenges and setting technical standards",
    },
    {
      date: "2021 - 2023",
      title: "Senior Software Engineer",
      description: "Developing scalable solutions and mentoring junior developers",
    },
  ],
};

export function Timeline({ role }: TimelineProps) {
  const events = timelineData[role];

  return (
    <div className="space-y-8">
      <h2 className="text-3xl font-bold">Career Timeline</h2>
      <div className="relative space-y-8 before:absolute before:inset-0 before:ml-5 before:h-full before:w-0.5 before:-translate-x-1/2 before:bg-gradient-to-b before:from-primary before:to-primary/20">
        {events.map((event, index) => (
          <div key={index} className="relative pl-8">
            <div className="absolute left-0 top-2 h-4 w-4 rounded-full border-2 border-primary bg-background" />
            <div className="space-y-2">
              <span className="text-sm text-muted-foreground">{event.date}</span>
              <h3 className="text-xl font-semibold">{event.title}</h3>
              <p className="text-muted-foreground">{event.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
