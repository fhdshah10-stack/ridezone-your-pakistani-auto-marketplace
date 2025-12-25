import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, MapPin, Gauge } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { managedCars } from '@/data/mockData';
import { useScrollCarousel } from '@/hooks/useScrollCarousel';

export function ManagedAdsCarousel() {
  const { scrollRef, canScrollLeft, canScrollRight, scroll, touchHandlers } = useScrollCarousel({
    itemWidth: 288,
    gap: 24,
  });

  const formatPrice = (price: number) => {
    if (price >= 10000000) {
      return `PKR ${(price / 10000000).toFixed(1)} Crore`;
    } else if (price >= 100000) {
      return `PKR ${(price / 100000).toFixed(1)} Lakh`;
    }
    return `PKR ${price.toLocaleString()}`;
  };

  return (
    <section className="py-12">
      <div className="flex items-center justify-between mb-6">
        <h2 className="section-title mb-0">Managed by RideZone</h2>
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
      </div>

      <div
        ref={scrollRef}
        className="flex gap-4 md:gap-6 overflow-x-auto scrollbar-hide pb-4"
        style={{ scrollSnapType: 'x mandatory' }}
        {...touchHandlers}
      >
        {managedCars.map((car, index) => (
          <motion.div
            key={car.id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="flex-shrink-0 w-[260px] sm:w-72 listing-card"
            style={{ scrollSnapAlign: 'start' }}
          >
            <div className="relative">
              <img
                src={car.image}
                alt={car.title}
                className="w-full h-44 object-cover"
              />
              <div className="absolute top-3 left-3">
                <span className="badge-managed">Managed by RideZone</span>
              </div>
            </div>
            <div className="p-4">
              <h3 className="font-semibold text-foreground mb-2 line-clamp-1">
                {car.title}
              </h3>
              <p className="price-tag mb-3">{formatPrice(car.price)}</p>
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Gauge className="h-4 w-4" />
                  {car.mileage.toLocaleString()} km
                </div>
                <div className="flex items-center gap-1">
                  <MapPin className="h-4 w-4" />
                  {car.location}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
