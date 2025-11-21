/**
 * Section Background Pattern Component
 * Reusable background gradients and decorative blobs
 */

interface SectionBackgroundProps {
  variant?: 'blue' | 'green' | 'yellow' | 'dual-blue-green' | 'dual-green-blue';
  position?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left' | 'center' | 'dual';
  className?: string;
}

export default function SectionBackground({ 
  variant = 'green', 
  position = 'top-right',
  className = ''
}: SectionBackgroundProps) {
  const colorClass = {
    'blue': 'bg-[#0077B6]',
    'green': 'bg-[#3B945E]',
    'yellow': 'bg-[#FFB703]',
    'dual-blue-green': 'bg-[#0077B6]',
    'dual-green-blue': 'bg-[#3B945E]'
  }[variant];

  const secondaryColor = variant.startsWith('dual-') ? 
    (variant === 'dual-blue-green' ? 'bg-[#3B945E]' : 'bg-[#0077B6]') : null;

  const positionClasses = {
    'top-right': 'top-0 right-0',
    'top-left': 'top-0 left-0',
    'bottom-right': 'bottom-0 right-0',
    'bottom-left': 'bottom-0 left-0',
    'center': 'top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2',
    'dual': ''
  }[position];

  if (variant.startsWith('dual-')) {
    return (
      <div className={`absolute inset-0 opacity-20 dark:opacity-30 ${className}`}>
        <div className={`absolute top-0 right-0 w-96 h-96 ${colorClass} rounded-full filter blur-3xl`} />
        <div className={`absolute bottom-0 left-1/4 w-96 h-96 ${secondaryColor} rounded-full filter blur-3xl`} />
      </div>
    );
  }

  return (
    <div className={`absolute inset-0 opacity-20 dark:opacity-30 ${className}`}>
      <div className={`absolute ${positionClasses} w-96 h-96 ${colorClass} rounded-full filter blur-3xl`} />
    </div>
  );
}
