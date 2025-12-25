import { motion } from 'framer-motion';
import { TrendingDown, TrendingUp, Fuel } from 'lucide-react';
import { fuelPrices } from '@/data/mockData';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

// Extended fuel data with old prices for comparison
const extendedFuelPrices = fuelPrices.map((fuel) => ({
  ...fuel,
  oldPrice: fuel.price - fuel.change,
}));

export function PetrolPrices() {
  return (
    <section className="py-12 -mx-4 px-4 md:-mx-8 md:px-8 lg:-mx-[calc((100vw-1280px)/2+2rem)] lg:px-[calc((100vw-1280px)/2+2rem)] bg-ridezone-charcoal border-t border-white/[0.03]">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
            <Fuel className="h-6 w-6 text-primary" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-foreground">Petrol Prices in Pakistan</h2>
            <p className="text-sm text-muted-foreground">Updated fuel prices effective from December 2024</p>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="rounded-xl overflow-hidden border border-white/[0.06] shadow-xl"
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-primary to-primary/80 px-6 py-4">
            <Table>
              <TableHeader>
                <TableRow className="border-none hover:bg-transparent">
                  <TableHead className="text-white font-semibold text-base w-[35%]">Fuel Type</TableHead>
                  <TableHead className="text-white font-semibold text-base text-center">Old Price</TableHead>
                  <TableHead className="text-white font-semibold text-base text-center">New Price</TableHead>
                  <TableHead className="text-white font-semibold text-base text-center w-[20%]">Difference</TableHead>
                </TableRow>
              </TableHeader>
            </Table>
          </div>

          {/* Body */}
          <div className="bg-card">
            <Table>
              <TableBody>
                {extendedFuelPrices.map((fuel, index) => (
                  <TableRow
                    key={fuel.type}
                    className={`border-white/[0.04] hover:bg-white/[0.02] transition-colors ${
                      index % 2 === 0 ? 'bg-white/[0.02]' : 'bg-transparent'
                    }`}
                  >
                    <TableCell className="py-5 w-[35%]">
                      <span className="text-primary font-medium text-base">{fuel.type}</span>
                    </TableCell>
                    <TableCell className="py-5 text-center">
                      <span className="text-muted-foreground font-medium">PKR {fuel.oldPrice.toFixed(2)}</span>
                    </TableCell>
                    <TableCell className="py-5 text-center">
                      <span className="text-foreground font-semibold">PKR {fuel.price.toFixed(2)}</span>
                    </TableCell>
                    <TableCell className="py-5 text-center w-[20%]">
                      <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-medium ${
                        fuel.change < 0 
                          ? 'bg-green-500/10 text-green-500' 
                          : fuel.change > 0 
                            ? 'bg-red-500/10 text-red-500'
                            : 'bg-muted text-muted-foreground'
                      }`}>
                        {fuel.change < 0 ? (
                          <TrendingDown className="h-4 w-4" />
                        ) : fuel.change > 0 ? (
                          <TrendingUp className="h-4 w-4" />
                        ) : null}
                        {fuel.change === 0 ? '0.0' : Math.abs(fuel.change).toFixed(1)}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {/* Footer */}
          <div className="bg-white/[0.02] px-6 py-3 border-t border-white/[0.04]">
            <p className="text-xs text-muted-foreground text-center">
              Prices are in Pakistani Rupees (PKR) per litre. Source: OGRA
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
