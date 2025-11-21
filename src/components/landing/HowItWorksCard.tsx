/**
 * How It Works Card Component
 * Displays a step in the "How It Works" process with number, icon, title, and description
 */

import { Card } from '../ui/card';
import { ArrowRight } from 'lucide-react';

interface HowItWorksCardProps {
  item: {
    step: string;
    title: string;
    description: string;
    color: string;
    icon: React.ReactNode;
  };
  index: number;
  isLast: boolean;
}

export default function HowItWorksCard({ item, index, isLast }: HowItWorksCardProps) {
  return (
    <div
      className="text-center relative animate-in fade-in slide-in-from-bottom-8 duration-500"
      style={{ animationDelay: `${index * 200}ms` }}
    >
      <Card className="p-8 h-full glass-card dark:glass-card-dark border-2 hover:shadow-xl transition-smooth hover:glow-primary">
        <div className={`${item.color} text-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6 shadow-lg text-3xl glow-accent`}>
          {item.step}
        </div>
        <div className="flex justify-center mb-4 text-[#3B945E] dark:text-[#A7F3D0]">
          {item.icon}
        </div>
        <h3 className="mb-3 text-foreground">{item.title}</h3>
        <p className="text-muted-foreground text-sm leading-relaxed">
          {item.description}
        </p>
      </Card>
      
      {!isLast && (
        <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2 z-10">
          <ArrowRight className="w-8 h-8 text-[#3B945E] dark:text-[#4CAF6E]" />
        </div>
      )}
    </div>
  );
}
