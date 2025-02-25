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
      icon: "/images/images_prev_ui.png"
    },
    {
      date: "2023 | Glacier | Head of Product",
      title: "Let’s Get Tech-y! Bringing Solid Platforms, Engaging Tech Stacks, and Sharpening Vision",
      description: <><i>Tech meets climate action.</i> At Glacier, I introduced scalable product structures that <b>enhanced content delivery</b> and accelerated our ability to educate at scale. Entering the <b>DACH region</b>, I gained hands-on experience in <b>regional strategies</b>, optimizing market entry and product alignment for a new audience.</>,
      icon: "/images/glaciereco_logo_prev_ui.png"
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
      icon: "/images/logo.png"
    },
    {
      date: "2017 | Greetude Energy (ClimateTech)",
      title: "Innovation for Impact",
      description: <><b>Energy efficiency</b> isn’t just a metric—it’s <b>a lifeline for sustainability</b>. We designed <b>EESEE</b>, an Energy Audit & Solutions Recommendation Engine that analyzed data from high-consumption equipment and provided actionable insights. The result? Energy savings equivalent to <b>lighting up 750 homes for an entire year.</b> It was a step toward <b>turning sustainability into real-world action.</b></>,
      icon: "/images/greetude_prev_ui.png"
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
      date: "2024 | SINGALALA",
      title: "Personalized Music Production at Will – AI at Play!",
      description: <>A vision for <b>music on demand</b> turned into a reality. At Singalala, we built a <b>dynamic AI-driven</b> music production house, crafting <b>500+ custom songs</b> that brought melodies to life. The joy of making personalized music accessible to all remains our <b>greatest achievement</b> — proving that creativity and technology can harmonize to create something truly unique.</>,
      icon: "/images/Singalala_logo.jpeg"
    },
    {
      date: "2018 | EDOFLIP",
      title: "Cross-Border Online Tutoring | Education that Lasts",
      description: <>A passion for <b>global education</b> led to the creation of a <b>referral-first</b> tutoring platform, where <b>100% of students came through recommendations</b>. Over <b>4,000 students</b> from the US & EU learned from our 40+ expert tutors, achieving a consistent 15% YoY growth. More than just numbers, <b>200+ students walked into their dream universities</b>, a testament to the impact of structured, high-quality education delivery</>,
      icon: "/images/logo.png"
    },
    {
      date: "2014 | GREETUDE ENERGY | ClimateTech",
      title: "Powering Change Through Innovation",
      description: <>Sustainability isn’t just about saving energy—it’s about <b>impact at scale</b>. With <b>300+ energy inspections and 40+ audits</b>, Greetude Energy helped some of India’s top brands like <b>Taj Hotels, Leela Palace & Lava Mobiles</b> reduce their energy footprints. The EESEE audit engine transformed data into real-world savings—enough to power <b>750 homes for a year.</b> Working with Bureau of Energy Efficiency & Frost and Sullivan, we built solutions that proved profitability and sustainability can go hand in hand.

</>,
      icon: "/images/greetude_prev_ui.png"
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
        <div className="space-y-4">
          {events.map((event, index) => (
            <div key={index} className="relative" style={{ marginTop: index % 2 === 0 ? '-10px' : '-20px' }}>
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
                    index % 2 === 0 ? "right-[42%]" : "left-[42%]",
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
                      "absolute top-4 h-4 w-4",
                      index % 2 === 0 ? "-left-2 rotate-45" : "-right-2 -rotate-45"
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