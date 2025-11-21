/**
 * Motion Replacement Component
 * Drop-in replacement for motion/react with zero external dependencies
 * Uses CSS animations only - no WebAssembly issues
 */

import { useEffect, useState, useRef, CSSProperties } from 'react';

// Motion component (CSS-based)
interface MotionProps {
  children: React.ReactNode;
  id?: string;
  className?: string;
  style?: CSSProperties;
  initial?: {
    opacity?: number;
    y?: number;
    x?: number;
    scale?: number;
  };
  animate?: {
    opacity?: number;
    y?: number;
    x?: number;
    scale?: number;
  };
  exit?: {
    opacity?: number;
    y?: number;
    x?: number;
    scale?: number;
  };
  whileInView?: {
    opacity?: number;
    y?: number;
    x?: number;
    scale?: number;
  };
  whileHover?: {
    scale?: number;
    y?: number;
    x?: number;
  };
  viewport?: {
    once?: boolean;
    amount?: number;
  };
  transition?: {
    duration?: number;
    delay?: number;
    type?: string; // Ignored but accepted for compatibility
  };
  onClick?: () => void;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
}

// Base Motion Component
function MotionComponent({ 
  children, 
  id,
  className = '', 
  style = {},
  initial,
  animate,
  whileInView,
  whileHover,
  viewport = { once: true },
  transition = { duration: 0.6 },
  as: Component = 'div',
  ...rest
}: MotionProps & { as?: keyof JSX.IntrinsicElements }) {
  const [isVisible, setIsVisible] = useState(!initial && !whileInView);
  const [isHovered, setIsHovered] = useState(false);
  const ref = useRef<HTMLElement>(null);

  // Viewport observer for whileInView
  useEffect(() => {
    if (!whileInView) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (viewport.once) {
            observer.disconnect();
          }
        } else if (!viewport.once) {
          setIsVisible(false);
        }
      },
      { threshold: viewport.amount || 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [whileInView, viewport]);

  // Compute transform
  const getTransform = () => {
    const target = isHovered && whileHover ? whileHover : (isVisible ? (animate || whileInView) : initial);
    if (!target) return '';

    const parts: string[] = [];
    if (target.x !== undefined) parts.push(`translateX(${target.x}px)`);
    if (target.y !== undefined) parts.push(`translateY(${target.y}px)`);
    if (target.scale !== undefined) parts.push(`scale(${target.scale})`);

    return parts.join(' ');
  };

  const getOpacity = () => {
    const target = isHovered && whileHover ? whileHover : (isVisible ? (animate || whileInView) : initial);
    return target?.opacity !== undefined ? target.opacity : 1;
  };

  const computedStyle: CSSProperties = {
    ...style,
    opacity: getOpacity(),
    transform: getTransform(),
    transition: `all ${transition.duration || 0.6}s cubic-bezier(0.4, 0, 0.2, 1)`,
    transitionDelay: transition.delay ? `${transition.delay}s` : undefined,
  };

  return (
    <Component
      ref={ref as any}
      id={id}
      className={className}
      style={computedStyle}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      {...rest}
    >
      {children}
    </Component>
  );
}

// Specific components
export function MotionDiv(props: MotionProps) {
  return <MotionComponent {...props} as="div" />;
}

export function MotionButton(props: MotionProps) {
  return <MotionComponent {...props} as="button" />;
}

export function MotionSection(props: MotionProps) {
  return <MotionComponent {...props} as="section" />;
}

export function MotionH1(props: MotionProps) {
  return <MotionComponent {...props} as="h1" />;
}

export function MotionH2(props: MotionProps) {
  return <MotionComponent {...props} as="h2" />;
}

export function MotionP(props: MotionProps) {
  return <MotionComponent {...props} as="p" />;
}

export function MotionH3(props: MotionProps) {
  return <MotionComponent {...props} as="h3" />;
}

export function MotionSpan(props: MotionProps) {
  return <MotionComponent {...props} as="span" />;
}

export function MotionA(props: MotionProps) {
  return <MotionComponent {...props} as="a" />;
}

export function MotionLi(props: MotionProps) {
  return <MotionComponent {...props} as="li" />;
}

export function MotionArticle(props: MotionProps) {
  return <MotionComponent {...props} as="article" />;
}

export function MotionForm(props: MotionProps & { onSubmit?: (e: React.FormEvent) => void }) {
  return <MotionComponent {...props} as="form" />;
}

// AnimatePresence replacement (simple show/hide with CSS)
interface AnimatePresenceProps {
  children: React.ReactNode;
}

export function AnimatePresence({ children }: AnimatePresenceProps) {
  return <>{children}</>;
}

// Export as default for easy replacement
// This object structure allows usage like: motion.div, motion.button, etc.
const motion = {
  div: MotionDiv,
  button: MotionButton,
  section: MotionSection,
  h1: MotionH1,
  h2: MotionH2,
  h3: MotionH3,
  p: MotionP,
  span: MotionSpan,
  a: MotionA,
  li: MotionLi,
  article: MotionArticle,
  form: MotionForm,
};

export default motion;
