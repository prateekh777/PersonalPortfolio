
// Importing necessary components from the UI library
import { Card, CardContent } from "@/components/ui/card";

// Defining the structure of a single grid item
interface GridItem {
  title: string;
  icon: string;
}

// Defining the properties for the GridSection component
interface GridSectionProps {
  title: string;
  items: GridItem[];
}

// React component to render a section with a grid of items
export function GridSection({ title, items }: GridSectionProps) {
  return (
    <section className="py-16">
      <div className="container">
        {/* Section title */}
        <h2 className="mb-12 text-center text-3xl font-bold text-[#222222] drop-shadow-sm">{title}</h2>
        {/* Grid container */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {items.map((item, index) => (
            <Card 
              key={index} // Unique key for each Card
              className="group relative cursor-pointer overflow-hidden transition-all border border-[#7B7B7B] hover:shadow-lg hover:scale-[1.02] duration-300"
              style={{
                backgroundImage: `url(${item.icon})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center'
              }}
            >
              <CardContent className="flex min-h-[200px] flex-col items-center justify-center p-6 text-center diagonal-blur-gradient">
                {/* Item title */}
                <h3 className="text-lg font-semibold text-[#FFFFFF] drop-shadow-md">{item.title}</h3>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
