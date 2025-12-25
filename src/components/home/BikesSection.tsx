import { motion } from 'framer-motion';
import { ArrowRight, Gauge, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { bikes } from '@/data/mockData';
import { Link } from 'react-router-dom';
import { useScrollCarousel } from '@/hooks/useScrollCarousel';

export function BikesSection() {
  const { scrollRef, canScrollLeft, canScrollRight, scroll, touchHandlers } = useScrollCarousel({
    itemWidth: 220,
    gap: 16,
  });

  const formatPrice = (price: number) => {
    return `PKR ${price.toLocaleString()}`;
  };

  return (
    <section className="py-12">
      <div className="flex items-center justify-between mb-6">
        <h2 className="section-title mb-0">Featured Bikes</h2>
        <div className="flex items-center gap-2">
          <div className="hidden md:flex items-center gap-2">
            <Button
              variant="outline"
              size="icon"
              onClick={() => scroll('left')}
              disabled={!canScrollLeft}
              className="disabled:opacity-50"
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={() => scroll('right')}
              disabled={!canScrollRight}
              className="disabled:opacity-50"
            >
              <ChevronRight className="h-5 w-5" />
            </Button>
          </div>
          <Link to="/bikes">
            <Button variant="outline">
              View All Bikes
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </Link>
        </div>
      </div>

      <div
        ref={scrollRef}
        className="flex gap-3 md:gap-4 overflow-x-auto scrollbar-hide pb-4"
        style={{ scrollSnapType: 'x mandatory' }}
        {...touchHandlers}
      >
        {bikes.map((bike, index) => (
          <motion.div
            key={bike.id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.05 }}
            className="flex-shrink-0 w-[180px] sm:w-[220px] listing-card group"
            style={{ scrollSnapAlign: 'start' }}
          >
            <div className="relative overflow-hidden">
              <img
                src={bike.image}
                alt={bike.title}
                className="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="p-4">
              <p className="text-xs text-muted-foreground mb-1">{bike.make}</p>
              <h3 className="font-semibold text-foreground mb-2 line-clamp-1 group-hover:text-primary transition-colors">
                {bike.title}
              </h3>
              <p className="price-tag text-sm mb-2">{formatPrice(bike.price)}</p>
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <Gauge className="h-3 w-3" />
                {bike.engineCC}cc
              </div>
              <Button variant="secondary" size="sm" className="w-full mt-3">
                View Bike
              </Button>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
