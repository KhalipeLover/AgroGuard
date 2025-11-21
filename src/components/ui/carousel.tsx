import * as React from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";

import { cn } from "./utils";
import { Button } from "./button";

type CarouselApi = {
  scrollNext: () => void;
  scrollPrev: () => void;
  canScrollNext: () => boolean;
  canScrollPrev: () => boolean;
  selectedScrollSnap: () => number;
  scrollTo: (index: number) => void;
  on: (event: string, callback: () => void) => void;
  off: (event: string, callback: () => void) => void;
};

type CarouselProps = {
  opts?: {
    align?: "start" | "center" | "end";
    loop?: boolean;
  };
  plugins?: any[];
  orientation?: "horizontal" | "vertical";
  setApi?: (api: CarouselApi) => void;
};

type CarouselContextProps = {
  carouselRef: React.RefObject<HTMLDivElement>;
  api: CarouselApi;
  scrollPrev: () => void;
  scrollNext: () => void;
  canScrollPrev: boolean;
  canScrollNext: boolean;
  orientation: "horizontal" | "vertical";
  totalItems: number;
  currentIndex: number;
  opts?: CarouselProps["opts"];
};

const CarouselContext = React.createContext<CarouselContextProps | null>(null);

function useCarousel() {
  const context = React.useContext(CarouselContext);

  if (!context) {
    throw new Error("useCarousel must be used within a <Carousel />");
  }

  return context;
}

function Carousel({
  orientation = "horizontal",
  opts,
  setApi,
  plugins,
  className,
  children,
  ...props
}: React.ComponentProps<"div"> & CarouselProps) {
  const carouselRef = React.useRef<HTMLDivElement>(null);
  const [canScrollPrev, setCanScrollPrev] = React.useState(false);
  const [canScrollNext, setCanScrollNext] = React.useState(true);
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const [totalItems, setTotalItems] = React.useState(0);
  const eventListeners = React.useRef<Map<string, Set<() => void>>>(new Map());
  const isLooping = opts?.loop ?? false;

  const emit = React.useCallback((event: string) => {
    const listeners = eventListeners.current.get(event);
    if (listeners) {
      listeners.forEach(callback => callback());
    }
  }, []);

  // Calculate total items
  React.useEffect(() => {
    if (!carouselRef.current) return;
    
    const items = carouselRef.current.querySelectorAll('[data-slot="carousel-item"]');
    setTotalItems(items.length);
  }, [children]);

  const scrollPrev = React.useCallback(() => {
    if (!carouselRef.current || totalItems === 0) return;
    
    let newIndex = currentIndex - 1;
    
    // Handle looping
    if (newIndex < 0) {
      if (isLooping) {
        newIndex = totalItems - 1;
      } else {
        return;
      }
    }
    
    const container = carouselRef.current;
    const scrollAmount = container.offsetWidth * newIndex;
    
    container.scrollTo({
      left: orientation === "horizontal" ? scrollAmount : 0,
      top: orientation === "vertical" ? scrollAmount : 0,
      behavior: "smooth",
    });
    
    setCurrentIndex(newIndex);
    setTimeout(() => emit('select'), 100);
  }, [orientation, currentIndex, totalItems, isLooping, emit]);

  const scrollNext = React.useCallback(() => {
    if (!carouselRef.current || totalItems === 0) return;
    
    let newIndex = currentIndex + 1;
    
    // Handle looping
    if (newIndex >= totalItems) {
      if (isLooping) {
        newIndex = 0;
      } else {
        return;
      }
    }
    
    const container = carouselRef.current;
    const scrollAmount = container.offsetWidth * newIndex;
    
    container.scrollTo({
      left: orientation === "horizontal" ? scrollAmount : 0,
      top: orientation === "vertical" ? scrollAmount : 0,
      behavior: "smooth",
    });
    
    setCurrentIndex(newIndex);
    setTimeout(() => emit('select'), 100);
  }, [orientation, currentIndex, totalItems, isLooping, emit]);

  const scrollTo = React.useCallback((index: number) => {
    if (!carouselRef.current || totalItems === 0) return;
    
    // Clamp index
    const clampedIndex = Math.max(0, Math.min(index, totalItems - 1));
    
    const container = carouselRef.current;
    const scrollAmount = container.offsetWidth * clampedIndex;
    
    container.scrollTo({
      left: orientation === "horizontal" ? scrollAmount : 0,
      top: orientation === "vertical" ? scrollAmount : 0,
      behavior: "smooth",
    });
    
    setCurrentIndex(clampedIndex);
    setTimeout(() => emit('select'), 100);
  }, [orientation, totalItems, emit]);

  const checkScroll = React.useCallback(() => {
    if (!carouselRef.current || totalItems === 0) return;
    
    const container = carouselRef.current;
    const scrollPos = orientation === "horizontal" ? container.scrollLeft : container.scrollTop;
    const itemWidth = container.offsetWidth;
    
    // Calculate current index based on scroll position
    const calculatedIndex = Math.round(scrollPos / itemWidth);
    
    if (calculatedIndex !== currentIndex) {
      setCurrentIndex(calculatedIndex);
      emit('select');
    }
    
    // Update scroll buttons state
    if (isLooping) {
      setCanScrollPrev(true);
      setCanScrollNext(true);
    } else {
      setCanScrollPrev(calculatedIndex > 0);
      setCanScrollNext(calculatedIndex < totalItems - 1);
    }
  }, [orientation, currentIndex, totalItems, isLooping, emit]);

  React.useEffect(() => {
    if (!carouselRef.current) return;
    
    const container = carouselRef.current;
    checkScroll();
    
    container.addEventListener("scroll", checkScroll);
    window.addEventListener("resize", checkScroll);
    
    return () => {
      container.removeEventListener("scroll", checkScroll);
      window.removeEventListener("resize", checkScroll);
    };
  }, [checkScroll]);

  const api: CarouselApi = React.useMemo(() => ({
    scrollNext,
    scrollPrev,
    scrollTo,
    canScrollNext: () => isLooping ? true : canScrollNext,
    canScrollPrev: () => isLooping ? true : canScrollPrev,
    selectedScrollSnap: () => currentIndex,
    on: (event: string, callback: () => void) => {
      if (!eventListeners.current.has(event)) {
        eventListeners.current.set(event, new Set());
      }
      eventListeners.current.get(event)!.add(callback);
    },
    off: (event: string, callback: () => void) => {
      const listeners = eventListeners.current.get(event);
      if (listeners) {
        listeners.delete(callback);
      }
    },
  }), [scrollNext, scrollPrev, scrollTo, canScrollNext, canScrollPrev, currentIndex, isLooping, totalItems]);

  React.useEffect(() => {
    if (setApi) {
      setApi(api);
    }
  }, [api, setApi]);

  return (
    <CarouselContext.Provider
      value={{
        carouselRef,
        api,
        scrollPrev,
        scrollNext,
        canScrollPrev: isLooping ? true : canScrollPrev,
        canScrollNext: isLooping ? true : canScrollNext,
        orientation,
        totalItems,
        currentIndex,
        opts,
      }}
    >
      <div
        className={cn("relative", className)}
        role="region"
        aria-roledescription="carousel"
        {...props}
      >
        {children}
      </div>
    </CarouselContext.Provider>
  );
}

function CarouselContent(
  { className, ...props }: React.ComponentProps<"div">
) {
  const { carouselRef, orientation } = useCarousel();

  return (
    <div className="overflow-hidden">
      <div
        ref={carouselRef}
        data-slot="carousel-content"
        className={cn(
          "flex",
          orientation === "horizontal" 
            ? "overflow-x-auto scroll-smooth snap-x snap-mandatory scrollbar-hide -ml-4" 
            : "flex-col overflow-y-auto scroll-smooth snap-y snap-mandatory scrollbar-hide -mt-4",
          className
        )}
        {...props}
      />
    </div>
  );
}

function CarouselItem({ className, ...props }: React.ComponentProps<"div">) {
  const { orientation } = useCarousel();

  return (
    <div
      data-slot="carousel-item"
      role="group"
      aria-roledescription="slide"
      className={cn(
        "min-w-0 shrink-0 grow-0 basis-full snap-start",
        orientation === "horizontal" ? "pl-4" : "pt-4",
        className
      )}
      {...props}
    />
  );
}

function CarouselPrevious({
  className,
  variant = "outline",
  size = "icon",
  ...props
}: React.ComponentProps<typeof Button>) {
  const { scrollPrev, canScrollPrev, opts } = useCarousel();
  const isLooping = opts?.loop ?? false;

  return (
    <Button
      variant={variant}
      size={size}
      className={cn(
        "absolute h-8 w-8 rounded-full",
        "left-0 top-1/2 -translate-y-1/2",
        className
      )}
      disabled={!isLooping && !canScrollPrev}
      onClick={scrollPrev}
      {...props}
    >
      <ArrowLeft className="h-4 w-4" />
      <span className="sr-only">Previous slide</span>
    </Button>
  );
}

function CarouselNext({
  className,
  variant = "outline",
  size = "icon",
  ...props
}: React.ComponentProps<typeof Button>) {
  const { scrollNext, canScrollNext, opts } = useCarousel();
  const isLooping = opts?.loop ?? false;

  return (
    <Button
      variant={variant}
      size={size}
      className={cn(
        "absolute h-8 w-8 rounded-full",
        "right-0 top-1/2 -translate-y-1/2",
        className
      )}
      disabled={!isLooping && !canScrollNext}
      onClick={scrollNext}
      {...props}
    >
      <ArrowRight className="h-4 w-4" />
      <span className="sr-only">Next slide</span>
    </Button>
  );
}

export {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
  type CarouselApi,
};
