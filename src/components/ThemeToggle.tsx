import { Moon, Sun } from 'lucide-react';
import { useTheme } from './ThemeProvider';
import { Button } from './ui/button';

interface ThemeToggleProps {
  variant?: 'default' | 'outline' | 'ghost';
  size?: 'default' | 'sm' | 'lg' | 'icon';
  showLabel?: boolean;
}

export default function ThemeToggle({ variant = 'ghost', size = 'icon', showLabel = false }: ThemeToggleProps) {
  const { theme, toggleTheme } = useTheme();

  return (
    <Button
      variant={variant}
      size={size}
      onClick={toggleTheme}
      className="glass-card dark:glass-card-dark hover:glow-primary transition-smooth"
      aria-label="Toggle theme"
    >
      {theme === 'light' ? (
        <>
          <Moon className="w-5 h-5" />
          {showLabel && <span className="ml-2">Dark Mode</span>}
        </>
      ) : (
        <>
          <Sun className="w-5 h-5" />
          {showLabel && <span className="ml-2">Light Mode</span>}
        </>
      )}
    </Button>
  );
}
