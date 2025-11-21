/**
 * Feature Card Component
 * Displays a feature with icon, title, description, and tag
 */

import { Card } from '../ui/card';

interface FeatureCardProps {
  feature: {
    icon: React.ReactNode;
    title: string;
    description: string;
    color: string;
  };
  index: number;
}

export default function FeatureCard({ feature, index }: FeatureCardProps) {
  return (
    <div
      className="animate-in fade-in slide-in-from-bottom-8 duration-500"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      <Card className="p-8 h-full glass-card dark:glass-card-dark hover:shadow-xl transition-smooth border-2 hover:border-[#3B945E] dark:hover:border-[#4CAF6E] hover:glow-primary group">
        <div className={`${feature.color} mb-4 group-hover:scale-110 transition-smooth`}>
          {feature.icon}
        </div>
        <h3 className="mb-3 text-foreground">{feature.title}</h3>
        <p className="text-muted-foreground text-sm leading-relaxed">
          {feature.description}
        </p>
      </Card>
    </div>
  );
}
