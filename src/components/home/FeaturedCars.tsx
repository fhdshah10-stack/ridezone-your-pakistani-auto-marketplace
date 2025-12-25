import { motion } from 'framer-motion';
import { MapPin, Gauge, ArrowRight, ChevronLeft, ChevronRight, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { usedCars } from '@/data/mockData';
import { useScrollCarousel } from '@/hooks/useScrollCarousel';
import { Link } from 'react-router-dom';
export function FeaturedCars() {
  const { scrollRef, canScrollLeft, canScrollRight, scroll, touchHandlers } = useScrollCarousel({
    itemWidth: 300,
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
    <section className="py-12 bg-ridezone-charcoal border-t border-white/[0.03]">
      <div className="flex items-center justify-between mb-6">
        <h2 className="section-title mb-0">Featured Used Cars</h2>
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
          <Button variant="outline">
            View All
            <ArrowRight className="h-4 w-4 ml-2" />
          </Button>
        </div>
      </div>

      <div
        ref={scrollRef}
        className="flex gap-4 md:gap-6 overflow-x-auto scrollbar-hide pb-4"
        style={{ scrollSnapType: 'x mandatory' }}
        {...touchHandlers}
      >
        {usedCars.map((car, index) => (
          <Link
            key={car.id}
            to={`/car/${car.id}`}
            className="flex-shrink-0 w-[280px] sm:w-[300px]"
            style={{ scrollSnapAlign: 'start' }}
          >
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
              className="listing-card group cursor-pointer h-full"
            >
              <div className="relative overflow-hidden">
                <img
                  src={car.image}
                  alt={car.title}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="absolute top-3 left-3">
                  <span className="inline-flex items-center gap-1 px-2 py-1 rounded-md bg-primary text-primary-foreground text-xs font-medium">
                    <Star className="h-3 w-3 fill-current" />
                    Featured
                  </span>
                </div>
              </div>
              <div className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs text-muted-foreground">{car.year}</span>
                  <span className="text-xs text-muted-foreground">|</span>
                  <span className="text-xs text-muted-foreground">{car.transmission}</span>
                </div>
                <h3 className="font-semibold text-foreground mb-2 line-clamp-1 group-hover:text-primary transition-colors">
                  {car.title}
                </h3>
                <p className="price-tag mb-3">{formatPrice(car.price)}</p>
                <div className="flex items-center justify-between text-sm text-muted-foreground">
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
          </Link>
        ))}
      </div>
    </section>
  );
}
