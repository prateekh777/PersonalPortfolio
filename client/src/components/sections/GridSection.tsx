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
                role="button"
                tabIndex={0}
                onKeyDown={(e) => e.key === 'Enter' && setLocation(itemLink)}
              >
                <Card
                  className="group relative overflow-hidden transition-all duration-300 hover:shadow-xl rounded-xl"
                  style={{ 
                    border: "1px solid rgba(255,255,255,0.15)"
                  }}
                >
                  {/* Clean background image with gradient overlay */}
                  <div 
                    className="absolute inset-0 z-0 transition-transform duration-700 group-hover:scale-105"
                    style={{
                      backgroundImage: `linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.7) 100%), url(${item.icon})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                    }}
                  />
                  
                  {/* Elegant content layout */}
                  <CardContent className="grid-card-content relative z-10 flex min-h-[220px] flex-col items-center justify-end p-6 text-center transition-all duration-300">
                    {/* Floating icon with elegant styling */}
                    <div 
                      className="card-icon absolute top-6 left-1/2 -translate-x-1/2 mb-4 rounded-full bg-white/90 p-4 shadow-lg transition-all duration-300 group-hover:scale-110 group-hover:shadow-xl"
                    >
                      {item.title.includes("Skills") && (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="28"
                          height="28"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="text-[#333]"
                        >
                          <path d="M12 20a8 8 0 1 0 0-16 8 8 0 0 0 0 16Z"></path>
                          <path d="M12 14a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z"></path>
                          <path d="M12 2v2"></path>
                          <path d="M12 22v-2"></path>
                          <path d="m17 20.66-1-1.73"></path>
                          <path d="M11 10.27 7 3.34"></path>
                          <path d="m20.66 17-1.73-1"></path>
                          <path d="m3.34 7 1.73 1"></path>
                          <path d="M14 12h8"></path>
                          <path d="M2 12h2"></path>
                          <path d="m20.66 7-1.73 1"></path>
                          <path d="m3.34 17 1.73-1"></path>
                          <path d="m17 3.34-1 1.73"></path>
                          <path d="m7 20.66 1-1.73"></path>
                        </svg>
                      )}
                      {item.title.includes("Puzzles") && (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="28"
                          height="28"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="text-[#333]"
                        >
                          <path d="M19.439 7.85c-.049.322.059.648.289.878l1.568 1.568c.47.47.706 1.087.706 1.704s-.235 1.233-.706 1.704l-1.611 1.611a.98.98 0 0 1-.837.276c-.47-.07-.802-.48-.968-.925-.314-.848-.88-1.448-1.764-1.448-.666 0-1.45.39-1.759 1.362-.49 1.528.620 2.181 1.319 2.45.47.182.871.608.665 1.111-.197.482-.636.84-1.134.869l-2.728.138c-1.349.068-2.494-.732-2.823-1.983-.264-1.007.1-2.18 1.125-2.909.889-.632.829-1.563-.115-2.302-.944-.74-1.826-.578-2.302-.072-.47.5-1.156.578-1.7.183l-1.914-1.39c-.471-.341-.722-.909-.692-1.465.029-.556.329-1.086.829-1.427l2.23-1.625c.235-.15.543-.233.9-.254.385-.021.766.049 1.043.233.277.185.470.452.548.765.197.765.892 1.471 1.863 1.471.912 0 1.585-.638 1.674-1.22.116-.579-.339-1.491-1.283-1.81-.904-.308-1.211-.945-1.133-1.508.078-.556.462-1.013.973-1.142l2.99-.769c.514-.132 1.083-.058 1.524.199s.744.658.85 1.142l.34 1.611c.068.325.226.611.447.825.221.215.5.358.802.417.471.078 1.044.183 1.59.77"/>
                        </svg>
                      )}
                      {item.title.includes("built") && (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="28"
                          height="28"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="text-[#333]"
                        >
                          <path d="M6 22V12a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v10"></path>
                          <path d="M6 18H4a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-2"></path>
                          <path d="M10 22V8"></path>
                          <path d="M14 22V8"></path>
                        </svg>
                      )}
                      {item.title.includes("AI") && (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="28"
                          height="28"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="text-[#333]"
                        >
                          <path d="M12 2H2v10h10V2Z"></path>
                          <path d="M12 12h10v10H12V12Z"></path>
                          <path d="m17 22 5-5"></path>
                          <path d="m17 2 5 5"></path>
                          <path d="M7 2 2 7"></path>
                          <path d="m7 22-5-5"></path>
                        </svg>
                      )}
                      {item.title.includes("Conversations") && (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="28"
                          height="28"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="text-[#333]"
                        >
                          <path d="M14 9a2 2 0 0 1-2 2H6l-4 4V4c0-1.1.9-2 2-2h8a2 2 0 0 1 2 2v5Z"></path>
                          <path d="M18 9h2a2 2 0 0 1 2 2v11l-4-4h-6a2 2 0 0 1-2-2v-1"></path>
                        </svg>
                      )}
                      {item.title.includes("Universe") && (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="28"
                          height="28"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="text-[#333]"
                        >
                          <circle cx="12" cy="12" r="10"></circle>
                          <circle cx="12" cy="12" r="6"></circle>
                          <circle cx="12" cy="12" r="2"></circle>
                        </svg>
                      )}
                    </div>

                    {/* Clean, elegant title presentation */}
                    <div className="transform transition-all duration-300 group-hover:translate-y-[-8px]">
                      <h3 className="text-xl font-medium text-white">
                        {item.title}
                      </h3>
                      <div className="mt-2 mx-auto h-[2px] w-16 bg-white/50 transition-all duration-300 group-hover:w-24 group-hover:bg-white/80"></div>
                    </div>
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