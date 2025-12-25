import { motion } from 'framer-motion';
import { Smartphone } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function GetAppSection() {
  return (
    <section className="py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-br from-primary/20 via-card to-card border border-primary/20 rounded-3xl p-8 md:p-12"
      >
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex-1 text-center md:text-left">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full mb-4">
              <Smartphone className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium text-primary">Mobile App</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Get the RideZone App
            </h2>
            <p className="text-muted-foreground max-w-md">
              Download the RideZone app for a seamless car buying and selling experience on the go.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <Button variant="secondary" size="lg" className="h-14 px-6">
              <svg className="h-7 w-7 mr-3" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.523 15.3414C17.523 16.0464 17.082 16.6484 16.4625 16.9194C16.1265 17.0674 15.756 17.1164 15.396 17.0674C14.886 16.9914 14.4285 16.7364 14.1075 16.3494L12.003 13.5894L9.8925 16.3494C9.5715 16.7364 9.114 16.9914 8.604 17.0674C8.244 17.1164 7.8735 17.0674 7.5375 16.9194C6.918 16.6484 6.477 16.0464 6.477 15.3414V5.8434C6.477 4.5924 7.521 3.5484 8.772 3.5484H15.228C16.479 3.5484 17.523 4.5924 17.523 5.8434V15.3414Z" />
                <path d="M18.093 19.8714C18.093 20.5764 17.652 21.1784 17.0325 21.4494C16.6965 21.5974 16.326 21.6464 15.966 21.5974C15.456 21.5214 14.9985 21.2664 14.6775 20.8794L12.003 18.0894L9.3225 20.8794C9.0015 21.2664 8.544 21.5214 8.034 21.5974C7.674 21.6464 7.3035 21.5974 6.9675 21.4494C6.348 21.1784 5.907 20.5764 5.907 19.8714V17.1114C5.907 16.3584 6.471 15.7944 7.224 15.7944H16.776C17.529 15.7944 18.093 16.3584 18.093 17.1114V19.8714Z" />
              </svg>
              <div className="text-left">
                <div className="text-xs text-muted-foreground">GET IT ON</div>
                <div className="font-semibold">Google Play</div>
              </div>
            </Button>

            <Button variant="secondary" size="lg" className="h-14 px-6">
              <svg className="h-7 w-7 mr-3" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.71 19.5C17.88 20.74 17 21.95 15.66 21.97C14.32 22 13.89 21.18 12.37 21.18C10.84 21.18 10.37 21.95 9.09997 22C7.78997 22.05 6.79997 20.68 5.95997 19.47C4.24997 17 2.93997 12.45 4.69997 9.39C5.56997 7.87 7.12997 6.91 8.81997 6.88C10.1 6.86 11.32 7.75 12.11 7.75C12.89 7.75 14.37 6.68 15.92 6.84C16.57 6.87 18.39 7.1 19.56 8.82C19.47 8.88 17.39 10.1 17.41 12.63C17.44 15.65 20.06 16.66 20.09 16.67C20.06 16.74 19.67 18.11 18.71 19.5ZM13 3.5C13.73 2.67 14.94 2.04 15.94 2C16.07 3.17 15.6 4.35 14.9 5.19C14.21 6.04 13.07 6.7 11.95 6.61C11.8 5.46 12.36 4.26 13 3.5Z" />
              </svg>
              <div className="text-left">
                <div className="text-xs text-muted-foreground">Download on the</div>
                <div className="font-semibold">App Store</div>
              </div>
            </Button>

            <Button variant="secondary" size="lg" className="h-14 px-6">
              <svg className="h-7 w-7 mr-3" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 20C7.59 20 4 16.41 4 12C4 7.59 7.59 4 12 4C16.41 4 20 7.59 20 12C20 16.41 16.41 20 12 20Z" />
                <path d="M12 7L7 12H10V17H14V12H17L12 7Z" />
              </svg>
              <div className="text-left">
                <div className="text-xs text-muted-foreground">EXPLORE IT ON</div>
                <div className="font-semibold">App Gallery</div>
              </div>
            </Button>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
