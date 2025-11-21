/**
 * Legal Dialog Component
 * 
 * Modular dialog untuk menampilkan legal documents:
 * - Privacy Policy
 * - Terms of Service  
 * - Cookie Policy
 * - Open Source Licenses
 * 
 * Features:
 * - Data loaded from /data/demo-legal-content.ts
 * - Mobile-first responsive design
 * - Glass morphism styling
 * - Scrollable content
 * - Easy to update content
 */

import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../ui/dialog';
import { ScrollArea } from '../ui/scroll-area';
import { Separator } from '../ui/separator';
import { Shield, FileText, Cookie, Code2, LucideIcon } from 'lucide-react';
import { getLegalContent, type LegalType } from '../../data';

interface LegalDialogProps {
  type: LegalType;
  children: React.ReactNode; // Trigger button
}

// Icon mapping
const iconMap: Record<string, LucideIcon> = {
  Shield: Shield,
  FileText: FileText,
  Cookie: Cookie,
  Code2: Code2
};

export default function LegalDialog({ type, children }: LegalDialogProps) {
  const [open, setOpen] = useState(false);
  
  // Load legal content from /data/
  const legalData = getLegalContent(type);
  const IconComponent = iconMap[legalData.icon] || Shield;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      
      <DialogContent 
        className="w-full sm:w-auto max-w-full sm:max-w-4xl sm:max-h-[85vh] bg-white/98 dark:bg-[#0E172A]/98 sm:bg-white/95 sm:dark:bg-[#0E172A]/95 backdrop-blur-xl border-0 sm:border-2 sm:border-white/30 sm:dark:border-white/10 shadow-2xl p-0 gap-0 rounded-none sm:rounded-xl overflow-hidden"
      >
        <DialogHeader className="p-6 pb-4 border-b border-white/20 dark:border-white/10">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-3 rounded-xl bg-gradient-to-br from-[#3B945E] to-[#0077B6] dark:from-[#4CAF6E] dark:to-[#0099E6]">
              <IconComponent className="w-6 h-6 text-white" />
            </div>
            <div>
              <DialogTitle className="text-foreground">{legalData.title}</DialogTitle>
              <DialogDescription className="text-muted-foreground text-sm">
                {legalData.description}
              </DialogDescription>
            </div>
          </div>
          <p className="text-xs text-muted-foreground">
            Last Updated: {legalData.lastUpdated}
          </p>
        </DialogHeader>

        <ScrollArea className="h-[calc(85vh-140px)] px-6">
          <div className="py-6 space-y-6">
            {legalData.sections.map((section, index) => (
              <section key={index}>
                <h3 className="text-foreground mb-3">{section.heading}</h3>
                <p className="text-muted-foreground leading-relaxed mb-3">
                  {section.content}
                </p>
                {section.listItems && section.listItems.length > 0 && (
                  <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                    {section.listItems.map((item, itemIndex) => (
                      <li key={itemIndex}>{item}</li>
                    ))}
                  </ul>
                )}
                {index < legalData.sections.length - 1 && (
                  <Separator className="mt-6 bg-white/10 dark:bg-white/5" />
                )}
              </section>
            ))}
          </div>
        </ScrollArea>

        <div className="p-4 border-t border-white/20 dark:border-white/10 bg-white/50 dark:bg-black/20">
          <p className="text-xs text-center text-muted-foreground">
            Untuk pertanyaan lebih lanjut, hubungi kami di{' '}
            <a 
              href="mailto:info@agroguard.id" 
              className="text-[#3B945E] dark:text-[#4CAF6E] hover:underline transition-smooth"
            >
              info@agroguard.id
            </a>
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export type { LegalType };
