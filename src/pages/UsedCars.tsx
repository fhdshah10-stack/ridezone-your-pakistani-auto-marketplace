import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, MapPin, ChevronRight, ChevronDown, ChevronUp,
  Shield, Users, Zap, Check, Car, Wrench, Eye, Sparkles, BadgeCheck
} from 'lucide-react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { HorizontalCarousel, CarouselItem } from '@/components/ui/horizontal-carousel';
import { usedCars, managedCars, blogs } from '@/data/mockData';

// Pakistani Cities
const majorCities = ['Lahore', 'Karachi', 'Islamabad', 'Rawalpindi', 'Faisalabad', 'Multan', 'Peshawar', 'Quetta'];
const allCities = [...majorCities, 'Sialkot', 'Gujranwala', 'Hyderabad', 'Bahawalpur', 'Sargodha', 'Sukkur', 'Larkana', 'Sheikhupura', 'Jhang', 'Rahim Yar Khan', 'Gujrat', 'Mardan', 'Kasur', 'Dera Ghazi Khan', 'Sahiwal', 'Okara', 'Wah Cantonment', 'Mingora', 'Nawabshah'];

// Car Makes and Models
const carBrands = {
  'Suzuki': ['Alto', 'Cultus', 'Swift', 'Wagon R', 'Bolan', 'Mehran', 'Vitara', 'Every'],
  'Toyota': ['Corolla', 'Yaris', 'Camry', 'Prado', 'Land Cruiser', 'Fortuner', 'Hilux', 'Aqua', 'Prius'],
  'Honda': ['Civic', 'City', 'BR-V', 'HR-V', 'Accord', 'Vezel', 'N-One', 'Fit'],
  'Daihatsu': ['Cuore', 'Move', 'Mira', 'Hijet', 'Terios', 'Cast', 'Esse'],
  'Nissan': ['Dayz', 'Juke', 'Note', 'X-Trail', 'Patrol', 'Sunny', 'Clipper'],
  'Hyundai': ['Tucson', 'Elantra', 'Sonata', 'Santa Fe', 'Ioniq', 'Staria', 'Porter']
};

// Categories
const categories = [
  { name: 'Automatic Cars', icon: '🅰️' },
  { name: 'Family Cars', icon: '👨‍👩‍👧‍👦' },
  { name: 'Small Cars', icon: '🚗' },
  { name: 'Big Cars', icon: '🚙' },
  { name: 'Imported Cars', icon: '✈️' },
  { name: 'Japanese Cars', icon: '🇯🇵' },
  { name: 'Hybrid Cars', icon: '🔋' },
  { name: 'Electric Cars', icon: '⚡' },
];

// Budget options
const budgetOptions = [
  'Under 5 Lakhs',
  'Under 10 Lakhs', 
  'Under 20 Lakhs',
  'Under 30 Lakhs',
  'Under 50 Lakhs',
  'Under 1 Crore',
  'Above 1 Crore'
];

// Body types
const bodyTypes = [
  { name: 'Hatchback', icon: '🚗' },
  { name: 'Sedan', icon: '🚘' },
  { name: 'SUV', icon: '🚙' },
  { name: 'Crossover', icon: '🚐' },
  { name: 'Pickup', icon: '🛻' },
  { name: 'Van', icon: '🚐' },
  { name: 'MPV', icon: '🚌' },
  { name: 'Coupe', icon: '🏎️' },
];

// Years
const currentYear = new Date().getFullYear();
const years = Array.from({ length: 15 }, (_, i) => currentYear - i);

// Dealers
const featuredDealers = [
  { id: 1, name: 'RideZone Premium Motors', location: 'Lahore', verified: true, inventory: 45 },
  { id: 2, name: 'Elite Auto Gallery', location: 'Karachi', verified: true, inventory: 32 },
  { id: 3, name: 'Capital Car House', location: 'Islamabad', verified: true, inventory: 28 },
  { id: 4, name: 'Punjab Auto Dealers', location: 'Faisalabad', verified: false, inventory: 18 },
];

// Inspection checkpoints
const inspectionCategories = ['Engine', 'Suspension', 'Exterior', 'Interior'];

function formatPrice(price: number): string {
  if (price >= 10000000) {
    return `PKR ${(price / 10000000).toFixed(2)} Crore`;
  } else if (price >= 100000) {
    return `PKR ${(price / 100000).toFixed(1)} Lakh`;
  }
  return `PKR ${price.toLocaleString()}`;
}

export default function UsedCars() {
  const [selectedCity, setSelectedCity] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [showAllCities, setShowAllCities] = useState(false);
  const [activeInspectionIndex, setActiveInspectionIndex] = useState(0);

  // Animate inspection checkpoints
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveInspectionIndex((prev) => (prev + 1) % inspectionCategories.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative py-16 md:py-24 overflow-hidden">
        {/* Gradient Background */}
        <div className="absolute inset-0 bg-background">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-transparent opacity-50" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-primary/10 blur-[120px] rounded-full" />
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-10">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-4"
            >
              Find Used Cars in Pakistan
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto"
            >
              Thousands of verified listings — find the right ride for you.
            </motion.p>
          </div>

          {/* Search Bar */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="max-w-4xl mx-auto"
          >
            <div className="bg-card/95 backdrop-blur-sm border border-border/80 rounded-2xl p-4 md:p-6 shadow-[0_8px_40px_-12px_hsla(0,0%,0%,0.8),0_0_0_1px_hsla(0,0%,100%,0.05)]">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {/* Search Input */}
                <div className="md:col-span-2 relative">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Car Make or Model"
                    className="input-field w-full pl-12"
                  />
                </div>

                {/* City Selector */}
                <div className="relative">
                  <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <select
                    value={selectedCity}
                    onChange={(e) => setSelectedCity(e.target.value)}
                    className="input-field w-full pl-12 appearance-none cursor-pointer"
                  >
                    <option value="">All Cities</option>
                    {allCities.map((city) => (
                      <option key={city} value={city}>{city}</option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
                </div>

                {/* Price Range */}
                <div className="flex gap-2">
                  <input
                    type="number"
                    value={minPrice}
                    onChange={(e) => setMinPrice(e.target.value)}
                    placeholder="Min"
                    className="input-field w-full"
                  />
                  <input
                    type="number"
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(e.target.value)}
                    placeholder="Max"
                    className="input-field w-full"
                  />
                </div>
              </div>

              {/* Action Row */}
              <div className="flex flex-wrap items-center justify-between gap-4 mt-4">
                <Link
                  to="/advanced-filters"
                  className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  Advanced Filters
                  <ChevronRight className="h-4 w-4" />
                </Link>

                <Button size="lg">
                  <Search className="h-4 w-4 mr-2" />
                  Search
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Search Benefits Strip */}
      <section className="py-8 bg-secondary border-y border-border/50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { icon: Zap, title: 'Free Ad', desc: 'Post your car in seconds' },
              { icon: Users, title: 'Genuine Buyers', desc: 'Verified user system' },
              { icon: Shield, title: 'Sell Faster', desc: 'Better visibility & reach' },
            ].map((benefit, idx) => (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                viewport={{ once: true }}
                className="flex items-center gap-4 p-4 rounded-xl bg-card/50 border border-border/50 hover:border-primary/50 transition-colors group cursor-pointer"
              >
                <div className="p-3 rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                  <benefit.icon className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">{benefit.title}</h3>
                  <p className="text-sm text-muted-foreground">{benefit.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Used Cars */}
      <section className="py-12 bg-background">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <h2 className="section-title mb-0">Featured Used Cars for Sale</h2>
            <Link to="/featured-cars" className="text-primary hover:text-primary/80 font-medium flex items-center gap-1">
              View all featured <ChevronRight className="h-4 w-4" />
            </Link>
          </div>

          <HorizontalCarousel gap={24}>
            {usedCars.filter(car => car.isFeatured).map((car, idx) => (
              <CarouselItem key={car.id} className="w-[280px] sm:w-[300px]">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -8 }}
                  className="listing-card group h-full"
                >
                  <Link to={`/car/${car.id}`}>
                    <div className="relative aspect-[4/3] overflow-hidden">
                      <img 
                        src={car.image} 
                        alt={car.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <span className="absolute top-3 left-3 bg-primary text-primary-foreground text-xs font-semibold px-3 py-1 rounded-full">
                        Featured
                      </span>
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold text-foreground mb-2 line-clamp-1">{car.title}</h3>
                      <p className="price-tag mb-3">{formatPrice(car.price)}</p>
                      <div className="flex items-center justify-between text-sm text-muted-foreground">
                        <span>{car.year} • {car.transmission}</span>
                        <span className="flex items-center gap-1">
                          <MapPin className="h-3 w-3" /> {car.location}
                        </span>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              </CarouselItem>
            ))}
          </HorizontalCarousel>
        </div>
      </section>

      {/* Managed by RideZone */}
      <section className="py-12 bg-secondary">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <h2 className="section-title mb-0">Managed by RideZone</h2>
            <Link to="/managed-cars" className="text-primary hover:text-primary/80 font-medium flex items-center gap-1">
              View all <ChevronRight className="h-4 w-4" />
            </Link>
          </div>

          <HorizontalCarousel gap={24}>
            {managedCars.map((car, idx) => (
              <CarouselItem key={car.id} className="w-[280px] sm:w-[320px]">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -8 }}
                  className="listing-card group h-full"
                >
                  <Link to={`/car/${car.id}`}>
                    <div className="relative aspect-[4/3] overflow-hidden">
                      <img 
                        src={car.image} 
                        alt={car.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <span className="absolute top-3 left-3 bg-card/90 backdrop-blur-sm text-primary text-xs font-semibold px-3 py-1 rounded-full border border-primary/30 flex items-center gap-1">
                        <Sparkles className="h-3 w-3" /> Managed
                      </span>
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold text-foreground mb-2 line-clamp-1">{car.title}</h3>
                      <p className="price-tag mb-3">{formatPrice(car.price)}</p>
                      <div className="flex items-center justify-between text-sm text-muted-foreground">
                        <span>{car.mileage?.toLocaleString()} km</span>
                        <span className="flex items-center gap-1">
                          <MapPin className="h-3 w-3" /> {car.location}
                        </span>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              </CarouselItem>
            ))}
          </HorizontalCarousel>
        </div>
      </section>

      {/* Car Inspection Promotion */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Never buy a used car without RideZone Inspection
              </h2>
              <p className="text-xl text-muted-foreground mb-8">
                200+ inspection checkpoints
              </p>
              <Button size="lg">
                Learn More <ChevronRight className="h-4 w-4 ml-2" />
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="grid grid-cols-2 gap-4"
            >
              {inspectionCategories.map((category, idx) => (
                <motion.div
                  key={category}
                  animate={{ 
                    scale: activeInspectionIndex === idx ? 1.05 : 1,
                    borderColor: activeInspectionIndex === idx ? 'hsl(var(--primary))' : 'hsl(var(--border))'
                  }}
                  className="p-6 rounded-xl bg-card border border-border flex items-center gap-4"
                >
                  <div className={`p-3 rounded-lg transition-colors ${activeInspectionIndex === idx ? 'bg-primary text-primary-foreground' : 'bg-secondary text-muted-foreground'}`}>
                    {idx === 0 && <Wrench className="h-6 w-6" />}
                    {idx === 1 && <Car className="h-6 w-6" />}
                    {idx === 2 && <Eye className="h-6 w-6" />}
                    {idx === 3 && <Shield className="h-6 w-6" />}
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">{category}</h3>
                    <p className="text-sm text-muted-foreground">50+ points</p>
                  </div>
                  {activeInspectionIndex === idx && (
                    <Check className="h-5 w-5 text-primary ml-auto" />
                  )}
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Browse by City */}
      <section className="py-12 bg-secondary">
        <div className="container mx-auto px-4">
          <h2 className="section-title">Browse Used Cars by City</h2>
          
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3 mb-4">
            {majorCities.map((city) => (
              <Link
                key={city}
                to={`/used-cars/${city.toLowerCase()}`}
                className="p-4 rounded-xl bg-card border border-border text-center hover:border-primary/50 hover:bg-muted transition-all"
              >
                <MapPin className="h-5 w-5 mx-auto mb-2 text-primary" />
                <span className="text-sm font-medium text-foreground">{city}</span>
              </Link>
            ))}
          </div>

          <AnimatePresence>
            {showAllCities && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden"
              >
                <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-3 pt-4">
                  {allCities.slice(8).map((city) => (
                    <Link
                      key={city}
                      to={`/used-cars/${city.toLowerCase()}`}
                      className="p-3 rounded-lg bg-card/50 border border-border/50 text-center hover:border-primary/50 transition-all text-sm text-muted-foreground hover:text-foreground"
                    >
                      {city}
                    </Link>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <button
            onClick={() => setShowAllCities(!showAllCities)}
            className="mt-4 flex items-center gap-2 mx-auto text-primary hover:text-primary/80 font-medium"
          >
            {showAllCities ? 'Show Less' : 'View All Cities'}
            {showAllCities ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
          </button>
        </div>
      </section>

      {/* Browse by Make & Model */}
      <section className="py-12 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="section-title">Used Cars by Popular Makes & Models</h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {Object.entries(carBrands).map(([brand, models]) => (
              <div key={brand} className="p-6 rounded-xl bg-card border border-border">
                <h3 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
                  <Car className="h-5 w-5 text-primary" /> {brand}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {models.map((model) => (
                    <Link
                      key={model}
                      to={`/used-cars/${brand.toLowerCase()}/${model.toLowerCase()}`}
                      className="text-sm text-muted-foreground hover:text-primary transition-colors"
                    >
                      {model}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Browse by Category */}
      <section className="py-12 bg-secondary">
        <div className="container mx-auto px-4">
          <h2 className="section-title">Used Cars by Category</h2>
          
          <HorizontalCarousel gap={16}>
            {categories.map((category, idx) => (
              <CarouselItem key={category.name} className="w-[160px] sm:w-[180px]">
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: idx * 0.05 }}
                  viewport={{ once: true }}
                  className="p-6 rounded-xl bg-card border border-border hover:border-primary/50 transition-all cursor-pointer group text-center h-full"
                >
                  <span className="text-3xl mb-3 block">{category.icon}</span>
                  <span className="font-medium text-foreground group-hover:text-primary transition-colors">{category.name}</span>
                </motion.div>
              </CarouselItem>
            ))}
          </HorizontalCarousel>
        </div>
      </section>

      {/* Browse by Budget */}
      <section className="py-12 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="section-title">Used Cars by Budget</h2>
          
          <HorizontalCarousel gap={16}>
            {budgetOptions.map((budget) => (
              <CarouselItem key={budget} className="w-[140px] sm:w-[160px]">
                <Link
                  to={`/used-cars/budget/${budget.toLowerCase().replace(/ /g, '-')}`}
                  className="p-4 rounded-xl bg-card border border-border text-center hover:border-primary/50 hover:bg-muted transition-all group block h-full"
                >
                  <span className="text-sm font-medium text-muted-foreground group-hover:text-primary transition-colors">{budget}</span>
                </Link>
              </CarouselItem>
            ))}
          </HorizontalCarousel>
        </div>
      </section>

      {/* Browse by Body Type */}
      <section className="py-12 bg-secondary">
        <div className="container mx-auto px-4">
          <h2 className="section-title">Used Cars by Body Type</h2>
          
          <HorizontalCarousel gap={16}>
            {bodyTypes.map((type) => (
              <CarouselItem key={type.name} className="w-[120px] sm:w-[140px]">
                <Link
                  to={`/used-cars/body/${type.name.toLowerCase()}`}
                  className="p-4 rounded-xl bg-card border border-border text-center hover:border-primary/50 transition-all group block h-full"
                >
                  <span className="text-2xl mb-2 block">{type.icon}</span>
                  <span className="text-sm font-medium text-muted-foreground group-hover:text-primary transition-colors">{type.name}</span>
                </Link>
              </CarouselItem>
            ))}
          </HorizontalCarousel>
        </div>
      </section>

      {/* Browse by Year */}
      <section className="py-12 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="section-title">Used Cars by Year</h2>
          
          <HorizontalCarousel gap={12}>
            {years.map((year) => (
              <CarouselItem key={year} className="w-[100px]">
                <Link
                  to={`/used-cars/year/${year}`}
                  className="px-6 py-3 rounded-lg bg-card border border-border hover:border-primary/50 hover:bg-muted transition-all text-foreground font-medium block text-center"
                >
                  {year}
                </Link>
              </CarouselItem>
            ))}
          </HorizontalCarousel>
        </div>
      </section>

      {/* Featured Dealers */}
      <section className="py-12 bg-secondary">
        <div className="container mx-auto px-4">
          <h2 className="section-title">Featured Dealers</h2>
          
          <HorizontalCarousel gap={24}>
            {featuredDealers.map((dealer, idx) => (
              <CarouselItem key={dealer.id} className="w-[280px] sm:w-[300px]">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  viewport={{ once: true }}
                  className="p-6 rounded-xl bg-card border border-border hover:border-primary/30 transition-all h-full"
                >
                  <div className="flex items-start justify-between mb-4">
                    <h3 className="font-semibold text-foreground">{dealer.name}</h3>
                    {dealer.verified && (
                      <BadgeCheck className="h-5 w-5 text-primary flex-shrink-0" />
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground mb-4 flex items-center gap-1">
                    <MapPin className="h-4 w-4" /> {dealer.location}
                  </p>
                  <p className="text-sm text-muted-foreground mb-4">{dealer.inventory} cars in inventory</p>
                  <Button variant="outline" className="w-full">
                    View Inventory
                  </Button>
                </motion.div>
              </CarouselItem>
            ))}
          </HorizontalCarousel>
        </div>
      </section>

      {/* Used Car Advice & Tips */}
      <section className="py-12 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="section-title">Used Car Advice & Tips</h2>
          
          <HorizontalCarousel gap={24}>
            {blogs.map((blog, idx) => (
              <CarouselItem key={blog.id} className="w-[300px] sm:w-[340px]">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  viewport={{ once: true }}
                  className="group cursor-pointer h-full"
                >
                  <Link to={`/blog/${blog.id}`}>
                    <div className="rounded-xl overflow-hidden bg-card border border-border hover:border-primary/30 transition-all h-full">
                      <div className="aspect-video overflow-hidden">
                        <img 
                          src={blog.thumbnail} 
                          alt={blog.title}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                      </div>
                      <div className="p-4">
                        <h3 className="font-semibold text-foreground mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                          {blog.title}
                        </h3>
                        <p className="text-sm text-muted-foreground line-clamp-2 mb-3">{blog.excerpt}</p>
                        <span className="text-primary text-sm font-medium flex items-center gap-1">
                          Read More <ChevronRight className="h-4 w-4" />
                        </span>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              </CarouselItem>
            ))}
          </HorizontalCarousel>
        </div>
      </section>

      <Footer />
    </div>
  );
}
