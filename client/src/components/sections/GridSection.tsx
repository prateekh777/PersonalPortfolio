// Importing necessary components from the UI library
import { Card, CardContent } from "@/components/ui/card";
import { useLocation } from "wouter";

// Defining the structure of a single grid item
interface GridItem {
  title: string;
  icon: string;
  link?: string; // Optional link property
}

// Defining the properties for the GridSection component
interface GridSectionProps {
  title: string;
  items: GridItem[];
}

// Helper function to get the appropriate link for a grid item
const getItemLink = (item: GridItem): string => {
  // If the item has a defined link, use it
  if (item.link) {
    return item.link;
  }
  
  // Otherwise, map titles to specific routes
  if (item.title === "Skills Honed, Stories Told - My Journey") {
    return "/expertise";
  }
  if (item.title === "Turning Puzzles into Pathways") {
    return "/case-studies";
  }
  if (item.title === "Things I've built Creations That Speak, Solutions That Sing") {
    return "/projects";
  }
  if (item.title === "Where AI Meets Soul - Let's Explore Together") {
    return "/ai-works";
  }
  if (item.title === "Conversations Open Doors - Let's Talk") {
    return "/contact";
  }
  if (item.title === "The Universe is Speaking—Here's How I Listen") {
    return "/interests";
  }
  
  // Default to home if no match
  return "/";
};

// React component to render a section with a grid of items
export function GridSection({ title, items }: GridSectionProps) {
  const [, setLocation] = useLocation();

  return (
    <section className="py-20">
      <div className="container px-4 md:px-6 lg:px-8 mx-auto">
        {/* Section title with animated underline */}
        <div className="mb-16 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-[#333333] drop-shadow-sm inline-block relative">
            {title}
            <span className="absolute -bottom-2 left-0 w-full h-[3px] bg-gradient-to-r from-transparent via-[#555] to-transparent opacity-30"></span>
          </h2>
          <p className="mt-4 text-[#555] max-w-2xl mx-auto">
            Explore the intersection of creativity and technology through these
            interactive elements
          </p>
        </div>

        {/* Grid container with improved spacing */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {items.map((item, index) => {
            const itemLink = getItemLink(item);
            
            return (
              <div 
                key={index}
                onClick={() => setLocation(itemLink)}
                className="cursor-pointer"
              >
                <Card
                  className="grid-card shimmer group relative overflow-hidden border border-[#7B7B7B] transition-transform hover:scale-[1.02]"
                  style={{
                    backgroundImage: `url(${item.icon})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                >
                  <CardContent className="grid-card-content flex min-h-[200px] flex-col items-center justify-center p-6 text-center diagonal-blur-gradient">
                    {/* Card icon */}
                    <div className="card-icon mb-4 opacity-75">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-[#444]"
                      >
                        <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"></path>
                        <path d="m22 2-5 5"></path>
                        <path d="m22 2-5-5"></path>
                        <path d="m2 22 5-5"></path>
                        <path d="m2 22 5 5"></path>
                      </svg>
                    </div>

                    {/* Item title */}
                    <h3 className="card-title text-lg font-semibold text-[#333333] drop-shadow-sm">
                      {item.title}
                    </h3>
                  </CardContent>
                </Card>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
