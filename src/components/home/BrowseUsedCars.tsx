import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Cog, Users, User, Circle, Maximize2, DoorOpen, Wallet, Crown } from 'lucide-react';
const TABS = [{
  id: 'quick-browse',
  label: 'Quick Browse'
}, {
  id: 'category',
  label: 'Category'
}, {
  id: 'make',
  label: 'Make'
}, {
  id: 'model',
  label: 'Model'
}, {
  id: 'budget',
  label: 'Budget'
}, {
  id: 'body-type',
  label: 'Body Type'
}] as const;
type TabId = typeof TABS[number]['id'];
const quickBrowseItems = [{
  icon: Cog,
  label: 'Automatic Cars'
}, {
  icon: Users,
  label: 'Family Cars'
}, {
  icon: User,
  label: '5 Seater Cars'
}, {
  icon: Circle,
  label: 'Small Cars'
}, {
  icon: Maximize2,
  label: 'Big Cars'
}, {
  icon: DoorOpen,
  label: '5 Door Cars'
}, {
  icon: Wallet,
  label: 'Low Budget Cars'
}, {
  icon: Crown,
  label: 'Luxury Cars'
}];
const categoryItems = ['Automatic Cars', 'Family Cars', '5 Seater', 'Small Cars', 'Big Cars', 'Imported Cars', 'Old Cars', '5 Door', '4 Door', '1000cc Cars', '1300cc Cars', 'Japanese Cars', '660cc Cars', 'Low Priced Cars', 'Jeep', 'Cheap Cars', 'Low Mileage Cars', 'Hybrid Cars', '4 Seater', 'Diesel Cars', 'Commercial', '7 Seater', 'Electric Cars', 'Carry Daba', '8 Seater', '2 Door', '2 Seater', 'Sports Cars', 'Modified Cars', '3 Door', 'Custom Auction', 'Urgent', 'Duplicate File', 'Accidental', 'Amnesty Scheme', 'Duplicate Book Cars', 'Army Auction Jeeps', 'Missing File', 'Duplicate Number Plate', 'Bullet Proof', 'Superdari', 'Police Auction', 'Bank Auction', 'Non Custom Paid'];
const makeItems = ['Suzuki', 'Toyota', 'Honda', 'Daihatsu', 'Nissan', 'Hyundai', 'KIA', 'Changan', 'Mitsubishi', 'Haval', 'Mercedes Benz', 'MG', 'Audi', 'FAW', 'BMW', 'Mazda', 'Lexus', 'Peugeot', 'Chevrolet', 'DFSK', 'Proton', 'Subaru', 'Prince', 'Jeep'];
const modelItems = ['Corolla', 'Mehran', 'Civic', 'Alto', 'City', 'Cultus', 'Wagon R', 'Vitz', 'Raize', 'Bolan', 'Swift', 'Mira', 'Prado', 'Sportage', 'Hilux', 'Cuore', 'Land Cruiser', 'Passo', 'Yaris Sedan', 'Santro', 'Vezel', 'Khyber', 'Prius', 'H6', 'Aqua', 'Fortuner', 'Dayz', 'Every', 'Tucson', 'Baleno'];
const budgetItems = ['Cars under 5 Lakhs', 'Cars under 10 Lakhs', 'Cars under 20 Lakhs', 'Cars under 30 Lakhs', 'Cars under 40 Lakhs', 'Cars under 50 Lakhs', 'Cars under 60 Lakhs', 'Cars under 80 Lakhs', 'Cars under 1 Crore', 'Cars under 1.5 Crore', 'Cars under 2 Crore', 'Cars above 2 Crore'];
const bodyTypeItems = ['Hatchback', 'Sedan', 'SUV', 'Crossover', 'Mini Van', 'Van', 'Micro Van', 'Compact SUV', 'MPV', 'Compact Sedan', 'Double Cabin', 'Pick Up', 'Mini Vehicles', 'Station Wagon', 'Truck', 'Coupe', 'Convertible', 'High Roof', 'Off-Road Vehicles', 'Single Cabin', 'Subcompact Hatchback', 'Compact Hatchback'];
const getTabData = (tabId: TabId): string[] => {
  switch (tabId) {
    case 'quick-browse':
      return quickBrowseItems.map(item => item.label);
    case 'category':
      return categoryItems;
    case 'make':
      return makeItems;
    case 'model':
      return modelItems;
    case 'budget':
      return budgetItems;
    case 'body-type':
      return bodyTypeItems;
    default:
      return [];
  }
};
const getQuickBrowseIcon = (label: string) => {
  const item = quickBrowseItems.find(i => i.label === label);
  return item?.icon;
};
interface BrowseUsedCarsProps {
  onCategoryClick?: (category: string) => void;
}
export function BrowseUsedCars({
  onCategoryClick
}: BrowseUsedCarsProps) {
  const [activeTab, setActiveTab] = useState<TabId>('quick-browse');
  const [currentPage, setCurrentPage] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const items = getTabData(activeTab);
  const itemsPerPage = 8;
  const totalPages = Math.ceil(items.length / itemsPerPage);
  const currentItems = items.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage);

  // Reset page when tab changes
  useEffect(() => {
    setCurrentPage(0);
  }, [activeTab]);
  const handlePrevious = () => {
    setCurrentPage(prev => prev > 0 ? prev - 1 : totalPages - 1);
  };
  const handleNext = () => {
    setCurrentPage(prev => prev < totalPages - 1 ? prev + 1 : 0);
  };

  // Touch handlers for mobile swipe
  const minSwipeDistance = 50;
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
      handleNext();
    } else if (isRightSwipe) {
      handlePrevious();
    }
  };
  return <section className="py-12">
      {/* Header */}
      <div className="mb-8 text-center">
        <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
          Browse Used Cars
        </h2>
        
      </div>

      {/* Tabs */}
      <div className="mb-8 overflow-x-auto scrollbar-hide">
        <div className="flex justify-center gap-2 min-w-max pb-2">
          {TABS.map(tab => <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 whitespace-nowrap ${activeTab === tab.id ? 'bg-primary text-primary-foreground shadow-glow' : 'bg-secondary text-muted-foreground hover:text-foreground hover:bg-muted border border-border'}`}>
              {tab.label}
            </button>)}
        </div>
      </div>

      {/* Tiles Grid with Navigation */}
      <div className="relative">
        {/* Left Navigation - Desktop only */}
        {totalPages > 1 && <button onClick={handlePrevious} className="hidden md:flex absolute -left-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 items-center justify-center rounded-full bg-card border border-border hover:border-primary hover:text-primary transition-all duration-300 shadow-card" aria-label="Previous">
            <ChevronLeft className="w-5 h-5" />
          </button>}

        {/* Grid Container */}
        <div ref={containerRef} className="overflow-hidden px-1" onTouchStart={onTouchStart} onTouchMove={onTouchMove} onTouchEnd={onTouchEnd}>
          <AnimatePresence mode="wait">
            <motion.div key={`${activeTab}-${currentPage}`} initial={{
            opacity: 0,
            x: 20
          }} animate={{
            opacity: 1,
            x: 0
          }} exit={{
            opacity: 0,
            x: -20
          }} transition={{
            duration: 0.25,
            ease: 'easeInOut'
          }} className="grid grid-cols-2 sm:grid-cols-4 gap-3 md:gap-4">
              {currentItems.map((item, index) => {
              const Icon = activeTab === 'quick-browse' ? getQuickBrowseIcon(item) : null;
              return <motion.button key={item} initial={{
                opacity: 0,
                y: 10
              }} animate={{
                opacity: 1,
                y: 0
              }} transition={{
                delay: index * 0.03
              }} onClick={() => onCategoryClick?.(item)} className="group flex flex-col items-center justify-center gap-3 p-5 rounded-xl bg-card border border-border transition-all duration-300 hover:border-primary/60 hover:bg-muted cursor-pointer min-h-[100px]">
                    {Icon && <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                        <Icon className="h-5 w-5 text-primary" />
                      </div>}
                    <span className="text-sm font-medium text-foreground text-center leading-tight group-hover:text-primary transition-colors">
                      {item}
                    </span>
                  </motion.button>;
            })}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Right Navigation - Desktop only */}
        {totalPages > 1 && <button onClick={handleNext} className="hidden md:flex absolute -right-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 items-center justify-center rounded-full bg-card border border-border hover:border-primary hover:text-primary transition-all duration-300 shadow-card" aria-label="Next">
            <ChevronRight className="w-5 h-5" />
          </button>}
      </div>

      {/* Page Indicators */}
      {totalPages > 1 && <div className="flex justify-center gap-2 mt-6">
          {Array.from({
        length: totalPages
      }).map((_, index) => <button key={index} onClick={() => setCurrentPage(index)} className={`w-2 h-2 rounded-full transition-all duration-300 ${currentPage === index ? 'bg-primary w-6' : 'bg-muted-foreground/30 hover:bg-muted-foreground/50'}`} aria-label={`Go to page ${index + 1}`} />)}
        </div>}
    </section>;
}