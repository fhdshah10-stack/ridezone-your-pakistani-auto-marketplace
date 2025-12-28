import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { HeroSearch } from '@/components/home/HeroSearch';
import { BrowseUsedCars } from '@/components/home/BrowseUsedCars';
import { ServicesSection } from '@/components/home/ServicesSection';
import { ManagedAdsCarousel } from '@/components/home/ManagedAdsCarousel';
import { FeaturedCars } from '@/components/home/FeaturedCars';
import { NewCarsSection } from '@/components/home/NewCarsSection';
import { PetrolPrices } from '@/components/home/PetrolPrices';
import { BikesSection } from '@/components/home/BikesSection';
import { VideosSection } from '@/components/home/VideosSection';
import { BlogsSection } from '@/components/home/BlogsSection';
import { GetAppSection } from '@/components/home/GetAppSection';
import { AuthModal } from '@/components/auth/AuthModal';
const Index = () => {
  return <div className="min-h-screen bg-background relative overflow-x-hidden">
      {/* Extended gradient from top to middle of hero (search bar) */}
      <div className="absolute top-0 left-0 right-0 h-[600px] pointer-events-none" style={{
      background: `
            linear-gradient(
              180deg,
              hsla(357, 81%, 20%, 0.6) 0%,
              hsla(357, 81%, 15%, 0.5) 20%,
              hsla(357, 81%, 12%, 0.5) 40%,
              hsla(357, 81%, 8%, 0.4) 55%,
              hsla(0, 0%, 6%, 0.95) 75%,
              hsl(var(--background)) 100%
            )
          `
    }} />
      {/* Stronger red glow at very top */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[160%] h-64 opacity-50 blur-3xl pointer-events-none" style={{
      background: 'radial-gradient(ellipse at center top, hsla(357, 81%, 30%, 0.7) 0%, transparent 70%)'
    }} />
      
      <Navbar />
      <AuthModal />
      
      <main className="relative z-10">
        {/* Hero Section */}
        <section className="relative py-8 md:py-16">
          <div className="container mx-auto px-4">
            {/* Logo and Heading side by side */}
            <div className="flex items-center justify-center gap-4 md:gap-5 mb-10">
              <img src="/ridezone-logo.png" alt="RideZone" className="h-24 md:h-32 lg:h-40 w-auto object-contain -mr-6 md:-mr-8" onError={e => {
              e.currentTarget.onerror = null;
            }} />
              <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold text-foreground text-center">
                <span className="block text-3xl">Pakistan's Trusted</span>
                <span className="block text-3xl">Automobile Trading Platform</span>
              </h1>
            </div>
            <HeroSearch />
          </div>
        </section>

        <div className="container mx-auto px-4">
          <BrowseUsedCars />
          <ServicesSection />
          <ManagedAdsCarousel />
          <FeaturedCars />
          <NewCarsSection />
          <PetrolPrices />
          <BikesSection />
          <VideosSection />
          <BlogsSection />
          <GetAppSection />
        </div>
      </main>

      <Footer />
    </div>;
};
export default Index;