import { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { newCars } from '@/data/mockData';
import { useScrollCarousel } from '@/hooks/useScrollCarousel';

const tabs = [
  { id: 'popular', label: 'Popular' },
  { id: 'upcoming', label: 'Upcoming' },
  { id: 'newly-launched', label: 'Newly Launched' },
];

export function NewCarsSection() {
  const [activeTab, setActiveTab] = useState('popular');
  const { scrollRef, canScrollLeft, canScrollRight, scroll, touchHandlers } = useScrollCarousel({
    itemWidth: 160,
    gap: 16,
  });

  const filteredCars = newCars.filter((car) => car.status === activeTab);

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
        <h2 className="section-title mb-0">New Cars</h2>
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

      {/* Tabs */}
      <div className="flex gap-2 mb-8">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`filter-chip ${activeTab === tab.id ? 'filter-chip-active' : ''}`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Cars Carousel */}
      <div
        ref={scrollRef}
        className="flex gap-3 md:gap-4 overflow-x-auto scrollbar-hide pb-4"
        style={{ scrollSnapType: 'x mandatory' }}
        {...touchHandlers}
      >
        {filteredCars.map((car, index) => (
          <motion.div
            key={car.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.05 }}
            className="flex-shrink-0 w-[140px] sm:w-[160px] card-interactive p-4 text-center"
            style={{ scrollSnapAlign: 'start' }}
          >
            <div className="w-16 h-16 mx-auto mb-3 rounded-full bg-muted flex items-center justify-center overflow-hidden">
              <img
                src={car.image}
                alt={car.brand}
                className="w-full h-full object-cover"
              />
            </div>
            <p className="text-xs text-muted-foreground mb-1">{car.brand}</p>
            <h4 className="font-semibold text-foreground mb-2 line-clamp-1">
              {car.model}
            </h4>
            <p className="text-xs text-muted-foreground">{car.priceLabel}</p>
            <p className="price-tag text-sm">{formatPrice(car.price)}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
