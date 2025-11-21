import { LucideIcon } from 'lucide-react';

export interface NavItem<T extends string = string> {
  id: T;
  label: string;
  icon: LucideIcon;
}

interface BottomNavProps<T extends string = string> {
  activeTab: T;
  onTabChange: (tab: T) => void;
  navItems: NavItem<T>[];
}

export default function BottomNav<T extends string = string>({ 
  activeTab, 
  onTabChange, 
  navItems 
}: BottomNavProps<T>) {
  // Dynamic grid based on number of items
  const itemCount = navItems.length;
  const gridClass = itemCount === 5 ? 'grid-cols-5' : 'grid-cols-4';
  
  // Responsive sizing for 5 items (smaller)
  const is5Items = itemCount === 5;
  const iconContainerSize = is5Items ? 'w-10 h-10' : 'w-12 h-12';
  const iconActiveSize = is5Items ? 'w-5 h-5' : 'w-6 h-6';
  const iconInactiveSize = is5Items ? 'w-4 h-4' : 'w-5 h-5';
  const textSize = is5Items ? 'text-[9px]' : 'text-[10px]';
  const paddingY = is5Items ? 'py-2.5' : 'py-3';
  const gap = is5Items ? 'gap-1' : 'gap-1.5';

  return (
    <nav 
      className="fixed bottom-0 left-0 right-0 md:hidden glass-card dark:glass-card-dark border-t-2 border-white/30 dark:border-white/10 shadow-[0_-4px_20px_rgba(0,0,0,0.15)] dark:shadow-[0_-4px_20px_rgba(0,0,0,0.4)] z-[100] transition-colors backdrop-blur-xl"
      style={{ 
        paddingBottom: 'env(safe-area-inset-bottom, 0px)',
      }}
    >
      <div className={`grid ${gridClass} ${is5Items ? 'px-1' : 'px-2'}`}>
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          
          return (
            <button
              key={item.id}
              onClick={() => onTabChange(item.id)}
              className={`
                relative flex flex-col items-center justify-center ${gap} ${paddingY}
                transition-all duration-200 ease-out
                active:scale-95
                ${isActive 
                  ? 'text-[#3B945E] dark:text-[#4CAF6E]' 
                  : 'text-gray-500 dark:text-gray-400'
                }
              `}
              aria-label={item.label}
              aria-current={isActive ? 'page' : undefined}
            >
              {/* Active Indicator - Top Bar */}
              <div 
                className={`
                  absolute top-0 left-1/2 -translate-x-1/2 h-0.5 rounded-b-full
                  transition-all duration-300 ease-out
                  bg-[#3B945E] dark:bg-[#4CAF6E]
                  ${isActive ? (is5Items ? 'w-8' : 'w-12') : 'w-0'} opacity-${isActive ? '100' : '0'}
                `}
              />
              
              {/* Icon Container with Active Background */}
              <div className={`
                relative flex items-center justify-center ${iconContainerSize} rounded-2xl
                transition-all duration-300 ease-out
                ${isActive 
                  ? 'bg-[#3B945E]/10 dark:bg-[#4CAF6E]/10 scale-100 shadow-lg glow-primary' 
                  : 'bg-transparent scale-90'
                }
              `}>
                {/* Glow Effect */}
                {isActive && (
                  <div className="absolute inset-0 bg-[#3B945E]/10 dark:bg-[#4CAF6E]/10 rounded-2xl blur-md scale-110" />
                )}
                
                {/* Icon */}
                <Icon 
                  className={`
                    relative z-10
                    transition-all duration-300
                    ${isActive ? iconActiveSize : iconInactiveSize} stroke-${isActive ? '[2.5]' : '2'}
                  `}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </div>
              
              {/* Label */}
              <span className={`
                ${textSize} leading-none tracking-tight
                transition-all duration-300
                ${isActive 
                  ? 'font-semibold opacity-100 scale-100' 
                  : 'font-medium opacity-70 scale-95'
                }
              `}>
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
