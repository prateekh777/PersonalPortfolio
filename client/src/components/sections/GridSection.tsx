import { Card, CardContent } from "@/components/ui/card";
interface GridItem {
  title: string;
  icon: string;
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
          {items.map((item, index) => {
            const Icon = icons[item.icon];
            return (
              <Card 
                key={index}
                className="group relative cursor-pointer overflow-hidden transition-all hover:text-primary-foreground"
                style={{
                  backgroundImage: `url(${item.icon})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center'
                }}
              >
                <CardContent className="flex min-h-[200px] flex-col items-center justify-center p-6 text-center backdrop-blur-sm">
                  <h3 className="text-lg font-semibold text-white">{item.title}</h3>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
