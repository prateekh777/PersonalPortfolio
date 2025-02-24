import { type Role } from "@/types/roles";

type TimelineEvent = {
  date: string;
  title: string;
  description: string;
  image: string;
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
      image: "/images/tech-lead-2023.jpg"
    },
    {
      date: "2021 - 2023",
      title: "Senior Technical Lead",
      description: "Spearheaded technical initiatives and mentored development teams",
      image: "/images/tech-lead-2021.jpg"
    },
  ],
  "people-manager": [
    {
      date: "2022 - Present",
      title: "Engineering Manager",
      description: "Managing cross-functional teams and driving organizational growth",
      image: "/images/eng-manager-2022.jpg"
    },
    {
      date: "2020 - 2022",
      title: "Team Lead",
      description: "Led agile teams and facilitated career development",
      image: "/images/team-lead-2020.jpg"
    },
  ],
  "individual-contributor": [
    {
      date: "2023 - Present",
      title: "Principal Engineer",
      description: "Solving complex technical challenges and setting technical standards",
      image: "/images/principal-eng-2023.jpg"
    },
    {
      date: "2021 - 2023",
      title: "Senior Software Engineer",
      description: "Developing scalable solutions and mentoring junior developers",
      image: "/images/senior-eng-2021.jpg"
    },
  ],
};

export function Timeline({ role }: TimelineProps) {
  const events = timelineData[role];

  return (
    <div className="space-y-8">
      <h2 className="text-3xl font-bold text-center">Career Timeline</h2>

      {/* Horizontal Timeline */}
      <div className="relative mt-20">
        {/* Timeline Line */}
        <div className="absolute top-1/2 left-0 w-full h-0.5 bg-gradient-to-r from-primary/20 via-primary to-primary/20 transform -translate-y-1/2" />

        {/* Timeline Events */}
        <div className="relative flex justify-between items-center gap-4 px-8">
          {events.map((event, index) => (
            <div 
              key={index} 
              className={`relative flex flex-col items-center ${
                index % 2 === 0 ? 'pt-16 pb-8' : 'pb-16 pt-8'
              }`}
            >
              {/* Timeline Node */}
              <div className="absolute top-1/2 transform -translate-y-1/2 w-4 h-4 bg-background border-2 border-primary rounded-full z-10" />

              {/* Image */}
              <div className="relative w-48 h-48 rounded-lg overflow-hidden shadow-lg mb-4">
                <img
                  src={event.image}
                  alt={event.title}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Content */}
              <div className="text-center w-48">
                <span className="block text-sm text-muted-foreground">{event.date}</span>
                <h3 className="text-lg font-semibold mt-2">{event.title}</h3>
                <p className="text-sm text-muted-foreground mt-2">{event.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}