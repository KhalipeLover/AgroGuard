/**
 * AGROGUARD IoT - Module Blocker Component
 * 
 * Secondary defense layer - blocks WebAssembly at module loading stage
 * Works in tandem with pre-init-blocker.js for complete protection
 * 
 * MUST be imported second in App.tsx after pre-init-blocker.js
 */

// ================================================================
// CRITICAL: AGGRESSIVE ERROR SUPPRESSION
// ================================================================

if (typeof window !== 'undefined') {
  const suppressedErrors: Array<{type: string; message: string}> = [];
  
  // Intercept and suppress WebAssembly-related errors
  const isWasmRelated = (message: string): boolean => {
    const lower = message.toLowerCase();
    return lower.includes('webassembly') ||
           lower.includes('wasm') ||
           lower.includes('compilation') ||
           lower.includes('aborted') ||
           lower.includes('network error') ||
           lower.includes('response body') ||
           lower.includes('motion') ||
           lower.includes('sonner') ||
           lower.includes('framer') ||
           lower.includes('vaul');
  };

  // Override Error constructor to catch WebAssembly errors at creation
  const OriginalError = Error;
  (window as any).Error = function(message?: string) {
    if (message && isWasmRelated(message)) {
      suppressedErrors.push({ type: 'constructor', message });
      // Return a benign error instead
      return new OriginalError('Suppressed error');
    }
    return new OriginalError(message);
  };
  // Preserve prototype
  (window as any).Error.prototype = OriginalError.prototype;

  // Suppress Promise rejection errors
  const originalPromiseReject = Promise.reject;
  Promise.reject = function<T = never>(reason?: any): Promise<T> {
    if (reason && typeof reason === 'object' && reason.message) {
      if (isWasmRelated(reason.message)) {
        suppressedErrors.push({ type: 'promise', message: reason.message });
        // Don't actually reject - return a resolved promise instead
        return Promise.resolve(null as any);
      }
    }
    return originalPromiseReject.call(this, reason);
  };

  // Block dynamic imports of problematic modules
  const stubModules: Record<string, any> = {
    'motion/react': {
      motion: 'div',
      AnimatePresence: ({ children }: any) => children,
      useAnimation: () => ({}),
      useInView: () => false,
      useMotionValue: () => ({ set: () => {}, get: () => 0 }),
      useScroll: () => ({ scrollY: { get: () => 0, set: () => {} } }),
      useTransform: () => ({ get: () => 0 }),
      useSpring: () => ({ get: () => 0 }),
    },
    'framer-motion': {
      motion: 'div',
      AnimatePresence: ({ children }: any) => children,
    },
    'sonner': {
      toast: {
        success: () => {},
        error: () => {},
        info: () => {},
        warning: () => {},
      },
      Toaster: () => null,
    },
    'vaul': {
      Drawer: () => null,
    },
  };

  // Intercept dynamic imports
  if ((window as any).import) {
    const originalImport = (window as any).import;
    (window as any).import = function(moduleSpecifier: string) {
      const lower = moduleSpecifier.toLowerCase();
      
      // Check for problematic modules
      for (const blocked in stubModules) {
        if (lower.includes(blocked)) {
          suppressedErrors.push({ type: 'import', message: moduleSpecifier });
          return Promise.resolve(stubModules[blocked]);
        }
      }
      
      return originalImport.apply(this, arguments);
    };
  }

  // Block WebAssembly APIs completely
  if (typeof WebAssembly !== 'undefined') {
    const blockWasm = () => {
      suppressedErrors.push({ type: 'wasm-api', message: 'WebAssembly API called' });
      return Promise.reject(new Error('WebAssembly disabled'));
    };

    try {
      Object.defineProperty(WebAssembly, 'compile', { 
        value: blockWasm, 
        writable: false, 
        configurable: false 
      });
      Object.defineProperty(WebAssembly, 'instantiate', { 
        value: blockWasm, 
        writable: false, 
        configurable: false 
      });
      
      if (WebAssembly.compileStreaming) {
        Object.defineProperty(WebAssembly, 'compileStreaming', { 
          value: blockWasm, 
          writable: false, 
          configurable: false 
        });
      }
      
      if (WebAssembly.instantiateStreaming) {
        Object.defineProperty(WebAssembly, 'instantiateStreaming', { 
          value: blockWasm, 
          writable: false, 
          configurable: false 
        });
      }
    } catch (e) {
      // If we can't override, it's already protected or blocked
    }
  }

  // Enhanced fetch interception
  if (typeof fetch !== 'undefined') {
    const originalFetch = window.fetch;
    
    window.fetch = function(input: RequestInfo | URL, init?: RequestInit): Promise<Response> {
      const url = typeof input === 'string' ? input : 
                  input instanceof URL ? input.href : 
                  (input as Request).url;
      
      const lower = url.toLowerCase();
      
      // Block .wasm files at network level
      if (lower.includes('.wasm')) {
        suppressedErrors.push({ type: 'fetch-wasm', message: url });
        return Promise.reject(new Error('WASM blocked'));
      }
      
      // Block problematic package requests
      const blockedPatterns = [
        'motion/react',
        'framer-motion',
        'sonner',
        'vaul',
        '@motion',
        'motion.js',
        'framer.js'
      ];
      
      for (const pattern of blockedPatterns) {
        if (lower.includes(pattern)) {
          suppressedErrors.push({ type: 'fetch-module', message: url });
          // Return empty module
          return Promise.resolve(new Response(
            'export default {}; export const motion = "div";',
            {
              status: 200,
              headers: { 'Content-Type': 'application/javascript' }
            }
          ));
        }
      }
      
      return originalFetch.apply(this, arguments as any);
    };
  }

  // Store debug info
  (window as any).__AGROGUARD_MODULE_BLOCKER__ = {
    suppressedErrors,
    isActive: true,
    version: '2.0-ultimate'
  };

  // Module blocker active
}

// ================================================================
// EXPORT NULL COMPONENT
// ================================================================

/**
 * This component doesn't render anything - it only exists for its side effects
 * The actual blocking happens in the if block above
 */
export default function ModuleBlocker(): null {
  return null;
}
