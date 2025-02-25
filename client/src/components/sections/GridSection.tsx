import { Card, CardContent } from "@/components/ui/card";

interface GridItem {
  title: string;
  gradient: string;
}

interface GridSectionProps {
  title: string;
  items: GridItem[];
}

export function GridSection({ title, items }: GridSectionProps) {
  return (
    <section className="py-16">
      <div className="container">
        <h2 className="mb-12 text-center text-3xl font-bold">{title}</h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {items.map((item, index) => (
            <Card 
              key={index}
              className="group cursor-pointer overflow-hidden transition-all hover:scale-[1.02]"
              style={{
                backgroundImage: `url(/images/gradients/gradient-${index + 1}.jpg)`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            >
              <CardContent className="flex min-h-[200px] flex-col items-center justify-center p-6 text-center backdrop-blur-sm">
                <h3 className="text-lg font-semibold text-white drop-shadow-md">{item.title}</h3>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
