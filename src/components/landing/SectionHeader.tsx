/**
 * Section Header Component - v2.0 CONSISTENT BADGE STYLING
 * Reusable header for landing page sections with badge, title, and description
 * Updated badge styling to match ROI Calculator consistency
 */

import { Badge } from '../ui/badge';
import { useEffect, useState, useRef } from 'react';
import { LucideIcon } from 'lucide-react';

interface SectionHeaderProps {
  badge?: {
    icon: LucideIcon;
    text: string;
    color?: string;
  };
  title: string;
  description?: string;
  className?: string;
}

export default function SectionHeader({ 
  badge, 
  title, 
  description,
  className = '' 
}: SectionHeaderProps) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`text-center mb-16 transition-all duration-600 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
      } ${className}`}
    >
      {badge && (
        <Badge className="mb-4 bg-gradient-to-r from-[#3B945E] to-[#0077B6] border-0">
          <badge.icon className="w-3 h-3 mr-1" />
          {badge.text}
        </Badge>
      )}
      <div className="mb-4">
        <h2 className="text-foreground">{title}</h2>
      </div>
      {description && (
        <div className="max-w-2xl mx-auto">
          <p className="text-muted-foreground" dangerouslySetInnerHTML={{ __html: description }} />
        </div>
      )}
    </div>
  );
}
