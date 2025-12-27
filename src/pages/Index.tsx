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
      {/* Full page gradient starting from navbar */}
      <div className="absolute top-0 left-0 right-0 h-[700px] pointer-events-none" style={{
      background: `
            linear-gradient(
              180deg,
              hsla(357, 81%, 18%, 0.5) 0%,
              hsla(357, 81%, 12%, 0.35) 15%,
              hsla(0, 0%, 8%, 0.9) 40%,
              hsl(0, 0%, 6%) 65%,
              hsl(var(--background)) 100%
            )
          `
    }} />
      {/* Subtle red glow at very top */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[140%] h-48 opacity-40 blur-3xl pointer-events-none" style={{
      background: 'radial-gradient(ellipse at center top, hsla(357, 81%, 25%, 0.6) 0%, transparent 70%)'
    }} />
      
      <Navbar />
      <AuthModal />
      
      <main className="relative z-10">
        {/* Hero Section */}
        <section className="relative py-12 md:py-20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-10">
              <h1 className="text-3xl md:text-5xl font-bold text-foreground mb-4">Pakistan's Trusted Automobile Trading Platform</h1>
              
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