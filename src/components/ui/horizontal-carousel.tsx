import { useRef, useState, useEffect, useCallback, ReactNode } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface HorizontalCarouselProps {
  children: ReactNode;
  className?: string;
  itemClassName?: string;
  showNavigation?: boolean;
  gap?: number;
}

export function HorizontalCarousel({
  children,
  className,
  showNavigation = true,
  gap = 16,
}: HorizontalCarouselProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  const minSwipeDistance = 50;

  const updateScrollState = useCallback(() => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setCanScrollLeft(scrollLeft > 5);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 5);
    }
  }, []);

  useEffect(() => {
    const element = scrollRef.current;
    if (element) {
      const timeout = setTimeout(updateScrollState, 100);
      element.addEventListener('scroll', updateScrollState);
      window.addEventListener('resize', updateScrollState);
      return () => {
        clearTimeout(timeout);
        element.removeEventListener('scroll', updateScrollState);
        window.removeEventListener('resize', updateScrollState);
      };
    }
  }, [updateScrollState]);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const containerWidth = scrollRef.current.clientWidth;
      const scrollAmount = containerWidth * 0.8;
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) {
      scroll('right');
    } else if (isRightSwipe) {
      scroll('left');
    }
  };

  return (
    <div className={cn('relative group', className)}>
      {/* Left Navigation Button - Desktop Only */}
      {showNavigation && (
        <button
          onClick={() => scroll('left')}
          disabled={!canScrollLeft}
          className={cn(
            'absolute left-0 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full',
            'bg-card/95 backdrop-blur-sm border border-border shadow-lg',
            'transition-all duration-300 hidden md:flex items-center justify-center',
            'hover:border-primary hover:bg-card',
            'disabled:opacity-0 disabled:pointer-events-none',
            '-translate-x-1/2 opacity-0 group-hover:opacity-100'
          )}
          aria-label="Scroll left"
        >
          <ChevronLeft className="h-5 w-5 text-foreground" />
        </button>
      )}

      {/* Scrollable Container */}
      <div
        ref={scrollRef}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
        className="flex overflow-x-auto scrollbar-hide scroll-smooth"
        style={{ gap: `${gap}px` }}
      >
        {children}
      </div>

      {/* Right Navigation Button - Desktop Only */}
      {showNavigation && (
        <button
          onClick={() => scroll('right')}
          disabled={!canScrollRight}
          className={cn(
            'absolute right-0 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full',
            'bg-card/95 backdrop-blur-sm border border-border shadow-lg',
            'transition-all duration-300 hidden md:flex items-center justify-center',
            'hover:border-primary hover:bg-card',
            'disabled:opacity-0 disabled:pointer-events-none',
            'translate-x-1/2 opacity-0 group-hover:opacity-100'
          )}
          aria-label="Scroll right"
        >
          <ChevronRight className="h-5 w-5 text-foreground" />
        </button>
      )}
    </div>
  );
}

interface CarouselItemProps {
  children: ReactNode;
  className?: string;
}

export function CarouselItem({ children, className }: CarouselItemProps) {
  return (
    <div className={cn('flex-shrink-0', className)}>
      {children}
    </div>
  );
}
