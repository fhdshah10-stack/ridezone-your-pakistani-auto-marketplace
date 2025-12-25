import { motion } from 'framer-motion';
import {
  Cog,
  Users,
  User,
  Circle,
  Maximize2,
  DoorOpen,
  Wallet,
  Crown,
} from 'lucide-react';

const categories = [
  { icon: Cog, label: 'Automatic Cars', color: 'text-primary' },
  { icon: Users, label: 'Family Cars', color: 'text-primary' },
  { icon: User, label: '5 Seater Cars', color: 'text-primary' },
  { icon: Circle, label: 'Small Cars', color: 'text-primary' },
  { icon: Maximize2, label: 'Big Cars', color: 'text-primary' },
  { icon: DoorOpen, label: '5 Door Cars', color: 'text-primary' },
  { icon: Wallet, label: 'Low Budget Cars', color: 'text-primary' },
  { icon: Crown, label: 'Luxury Cars', color: 'text-primary' },
];

interface CategoryIconsProps {
  onCategoryClick?: (category: string) => void;
}

export function CategoryIcons({ onCategoryClick }: CategoryIconsProps) {
  return (
    <section className="py-12">
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-4">
        {categories.map((category, index) => (
          <motion.button
            key={category.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            onClick={() => onCategoryClick?.(category.label)}
            className="category-icon"
          >
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
              <category.icon className={`h-6 w-6 ${category.color}`} />
            </div>
            <span className="text-sm font-medium text-foreground text-center">
              {category.label}
            </span>
          </motion.button>
        ))}
      </div>
    </section>
  );
}
