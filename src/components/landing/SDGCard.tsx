/**
 * SDG Card Component
 * Displays a Sustainable Development Goal with icon, goal number, title, and description
 */

import { Card, CardContent } from '../ui/card';
import { ImageWithFallback } from '../figma/ImageWithFallback';

interface SDGCardProps {
  goal: {
    number: string;
    title: string;
    subtitle: string;
    description: string;
    imageUrl: string | any;
  };
  index: number;
}

export default function SDGCard({ goal, index }: SDGCardProps) {
  return (
    <div
      className="animate-in fade-in slide-in-from-bottom-8 duration-500 h-full"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      <Card className="p-6 h-full glass-card dark:glass-card-dark hover:shadow-2xl transition-smooth border-2 hover:border-[#3B945E] dark:hover:border-[#4CAF6E] group">
        <div className="w-20 h-20 mb-4 mx-auto group-hover:scale-110 transition-transform">
          {typeof goal.imageUrl === 'string' ? (
            <ImageWithFallback
              src={goal.imageUrl}
              alt={`SDG ${goal.number}: ${goal.title}`}
              className="w-full h-full object-contain"
            />
          ) : (
            <img
              src={goal.imageUrl}
              alt={`SDG ${goal.number}: ${goal.title}`}
              className="w-full h-full object-contain"
            />
          )}
        </div>
        <h3 className="mb-1 text-foreground">{goal.title}</h3>
        <p className="text-gray-600 dark:text-gray-400 mb-3 text-sm">
          {goal.subtitle}
        </p>
        <p className="text-muted-foreground text-sm">
          {goal.description}
        </p>
      </Card>
    </div>
  );
}
