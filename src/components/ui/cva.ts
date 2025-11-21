/**
 * Simple Class Variance Authority (CVA) replacement
 * Avoids potential WebAssembly dependencies
 */

type ClassValue = string | number | boolean | undefined | null;
type ClassArray = ClassValue[];
type ClassObject = Record<string, ClassValue>;

export type VariantProps<T extends (...args: any) => any> = Partial<
  Omit<Parameters<T>[0], 'class' | 'className'>
>;

interface VariantConfig {
  variants?: Record<string, Record<string, string | string[]>>;
  defaultVariants?: Record<string, string>;
  compoundVariants?: Array<Record<string, any> & { class: string | string[] }>;
}

export function cva(base?: string | string[], config?: VariantConfig) {
  return (props?: Record<string, any>) => {
    if (!props) {
      return base || '';
    }

    const { class: className, className: classNameProp, ...variantProps } = props;
    
    // Start with base classes
    const classes: string[] = [];
    
    if (base) {
      if (Array.isArray(base)) {
        classes.push(...base);
      } else {
        classes.push(base);
      }
    }

    // Apply variant classes
    if (config?.variants) {
      for (const [variantName, variantValues] of Object.entries(config.variants)) {
        const variantValue = variantProps[variantName] ?? config?.defaultVariants?.[variantName];
        
        if (variantValue && variantValues[variantValue]) {
          const variantClass = variantValues[variantValue];
          if (Array.isArray(variantClass)) {
            classes.push(...variantClass);
          } else {
            classes.push(variantClass);
          }
        }
      }
    }

    // Apply compound variants
    if (config?.compoundVariants) {
      for (const compound of config.compoundVariants) {
        const { class: compoundClass, ...compoundProps } = compound;
        
        const matches = Object.entries(compoundProps).every(
          ([key, value]) => variantProps[key] === value
        );
        
        if (matches && compoundClass) {
          if (Array.isArray(compoundClass)) {
            classes.push(...compoundClass);
          } else {
            classes.push(compoundClass);
          }
        }
      }
    }

    // Add custom className
    if (className) classes.push(className);
    if (classNameProp) classes.push(classNameProp);

    return classes.filter(Boolean).join(' ');
  };
}
