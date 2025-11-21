// Simple implementation to avoid potential WebAssembly issues
// Replaces clsx + tailwind-merge with a lighter implementation

type ClassValue =
  | ClassArray
  | ClassDictionary
  | string
  | number
  | null
  | boolean
  | undefined;
type ClassDictionary = Record<string, any>;
type ClassArray = ClassValue[];

function toVal(mix: ClassValue): string {
  let str = '';
  
  if (typeof mix === 'string' || typeof mix === 'number') {
    str += mix;
  } else if (typeof mix === 'object') {
    if (Array.isArray(mix)) {
      for (let k = 0; k < mix.length; k++) {
        if (mix[k]) {
          const y = toVal(mix[k]);
          if (y) {
            str && (str += ' ');
            str += y;
          }
        }
      }
    } else {
      for (const k in mix) {
        if (mix[k]) {
          str && (str += ' ');
          str += k;
        }
      }
    }
  }
  
  return str;
}

function clsx(...inputs: ClassValue[]): string {
  let i = 0;
  let tmp;
  let str = '';
  
  while (i < inputs.length) {
    if ((tmp = inputs[i++])) {
      const x = toVal(tmp);
      if (x) {
        str && (str += ' ');
        str += x;
      }
    }
  }
  
  return str;
}

// Simple Tailwind merge - just dedupe classes
function twMerge(...classLists: string[]): string {
  const joined = classLists.filter(Boolean).join(' ');
  const classes = joined.split(/\s+/);
  
  // Simple deduplication - last class wins
  const classMap = new Map<string, string>();
  
  classes.forEach(cls => {
    if (!cls) return;
    
    // Extract the base class name (before the variant)
    const parts = cls.split(':');
    const className = parts[parts.length - 1];
    const baseClass = className.split('-')[0];
    
    // Use the full class as key to allow last one to win
    classMap.set(cls, cls);
  });
  
  return Array.from(classMap.values()).join(' ');
}

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
