/**
 * Use Case Card Component
 * Displays a use case with icon, category, title, and description
 */

import { Card, CardContent } from '../ui/card';
import { Badge } from '../ui/badge';
import { ImageWithFallback } from '../figma/ImageWithFallback';

interface UseCaseCardProps {
  useCase: {
    title: string;
    description: string;
    image: string;
    icon: React.ReactNode;
    stats: string[];
  };
  index: number;
}

export default function UseCaseCard({ useCase, index }: UseCaseCardProps) {
  return (
    <div
      className="animate-in fade-in slide-in-from-bottom-8 duration-500 h-full"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      <Card className="overflow-hidden h-full glass-card dark:glass-card-dark hover:shadow-2xl transition-smooth group border-2 border-white/30 dark:border-white/10">
        <div className="relative h-56 overflow-hidden">
          <ImageWithFallback
            src={useCase.image}
            alt={useCase.title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <div className="absolute bottom-4 left-4 text-white">
            <div className="glass-card rounded-full p-2 w-10 h-10 flex items-center justify-center mb-2">
              {useCase.icon}
            </div>
          </div>
        </div>
        <div className="p-6">
          <h3 className="mb-2 text-foreground">{useCase.title}</h3>
          <p className="text-muted-foreground mb-4 text-sm">
            {useCase.description}
          </p>
          <div className="flex gap-3">
            {useCase.stats.map((stat, idx) => (
              <Badge key={idx} variant="secondary">
                {stat}
              </Badge>
            ))}
          </div>
        </div>
      </Card>
    </div>
  );
}
