import { motion } from 'framer-motion';
import { ShieldCheck, FileSearch, CarFront, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const services = [
  {
    icon: CarFront,
    title: 'Sell It For Me',
    description: 'Let RideZone experts handle the sale of your car from start to finish.',
  },
  {
    icon: ShieldCheck,
    title: 'RideZone Car Inspection',
    description: 'Get a comprehensive 200+ point inspection report for any used car.',
  },
  {
    icon: FileSearch,
    title: 'Auction Sheet Verification',
    description: 'Verify Japanese imported car auction sheets for authenticity.',
  },
];

export function ServicesSection() {
  return (
    <section className="py-12 -mx-4 px-4 md:-mx-8 md:px-8 lg:-mx-[calc((100vw-1280px)/2+2rem)] lg:px-[calc((100vw-1280px)/2+2rem)] bg-ridezone-charcoal border-t border-white/[0.03]">
      <h2 className="section-title">RideZone Services</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {services.map((service, index) => (
          <motion.div
            key={service.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="card-elevated p-6 group"
          >
            <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
              <service.icon className="h-7 w-7 text-primary" />
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-2">
              {service.title}
            </h3>
            <p className="text-muted-foreground text-sm mb-4">
              {service.description}
            </p>
            <Button variant="outline" size="sm" className="group-hover:border-primary group-hover:text-primary">
              Learn More
              <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
