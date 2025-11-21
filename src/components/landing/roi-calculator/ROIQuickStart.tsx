/**
 * ROI Quick Start Component - v2.0 ACTIVE STATE
 * Quick example buttons dengan active state yang jelas
 * Responsive untuk semua ukuran layar
 */

import { Card } from '../../ui/card';
import { Sparkles, Check } from 'lucide-react';
import { LAND_SIZE_EXAMPLES, getPlantConfig } from '../../../data';
import { MotionDiv } from '../../ui/motion-replacement';

interface ROIQuickStartProps {
  onSelectExample: (exampleId: string) => void;
  activeExampleId?: string | null;
}

export function ROIQuickStart({ onSelectExample, activeExampleId }: ROIQuickStartProps) {
  return (
    <MotionDiv
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: 0.1 }}
      className="mb-12"
    >
      <Card className="glass-card dark:glass-card-dark border-2 border-white/30 dark:border-white/10 p-4 md:p-6">
        <div className="flex items-center gap-2 mb-4">
          <Sparkles className="w-5 h-5 text-[#FFB703]" />
          <h3>Quick Start - Pilih Mode</h3>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
          {LAND_SIZE_EXAMPLES.map(example => {
            const plantConfig = getPlantConfig(example.suggestedPlant);
            const isActive = activeExampleId === example.id;
            
            return (
              <button
                key={example.id}
                onClick={() => onSelectExample(example.id)}
                className={`
                  relative p-4 text-left rounded-lg transition-all duration-300
                  ${isActive 
                    ? 'border-2 border-[#3B945E] bg-[#3B945E]/10 dark:bg-[#3B945E]/20 shadow-lg shadow-[#3B945E]/20' 
                    : 'border-2 border-dashed border-white/20 dark:border-white/10 hover:border-[#3B945E] hover:bg-[#3B945E]/5'
                  }
                  group
                `}
              >
                {/* Active Indicator */}
                {isActive && (
                  <div className="absolute top-2 right-2 w-6 h-6 bg-[#3B945E] rounded-full flex items-center justify-center shadow-lg animate-in zoom-in duration-300">
                    <Check className="w-4 h-4 text-white" />
                  </div>
                )}
                
                <div className="text-2xl md:text-3xl mb-2">{example.emoji}</div>
                <h4 className={`
                  font-semibold mb-1 transition-colors
                  ${isActive ? 'text-[#3B945E]' : 'group-hover:text-[#3B945E]'}
                `}>
                  {example.name}
                </h4>
                <p className="text-muted-foreground">
                  {example.landSize}m² • {plantConfig?.name}
                </p>
              </button>
            );
          })}
        </div>
        
        {/* Active Mode Description */}
        {activeExampleId && (
          <MotionDiv
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="mt-4 p-4 rounded-lg bg-[#3B945E]/5 dark:bg-[#3B945E]/10 border border-[#3B945E]/20"
          >
            <div className="flex items-start gap-2">
              <Check className="w-5 h-5 text-[#3B945E] flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-[#3B945E] mb-1">
                  Mode Aktif: {LAND_SIZE_EXAMPLES.find(e => e.id === activeExampleId)?.name}
                </p>
                <p className="text-muted-foreground">
                  {LAND_SIZE_EXAMPLES.find(e => e.id === activeExampleId)?.description}
                </p>
              </div>
            </div>
          </MotionDiv>
        )}
      </Card>
    </MotionDiv>
  );
}
