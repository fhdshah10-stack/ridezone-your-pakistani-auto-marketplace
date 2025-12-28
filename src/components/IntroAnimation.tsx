import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export const IntroAnimation = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Check if mobile
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    
    // Skip animation on mobile
    if (window.innerWidth < 768) {
      setIsVisible(false);
      return;
    }

    // Auto-hide after animation completes (3.5s)
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 3500);

    return () => clearTimeout(timer);
  }, []);

  // Don't render on mobile
  if (isMobile) return null;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center overflow-hidden"
          style={{
            background: `
              radial-gradient(ellipse at center top, hsla(357, 81%, 25%, 0.8) 0%, transparent 50%),
              radial-gradient(ellipse at 30% 70%, hsla(357, 81%, 20%, 0.4) 0%, transparent 40%),
              radial-gradient(ellipse at 70% 60%, hsla(357, 81%, 18%, 0.3) 0%, transparent 35%),
              linear-gradient(180deg, hsl(0, 0%, 4%) 0%, hsl(0, 0%, 2%) 100%)
            `
          }}
        >
          {/* Animated gradient sweep */}
          <motion.div
            className="absolute inset-0 pointer-events-none"
            initial={{ x: '-100%', opacity: 0 }}
            animate={{ x: '200%', opacity: [0, 0.3, 0.3, 0] }}
            transition={{ duration: 2.5, delay: 0.5, ease: 'easeInOut' }}
            style={{
              background: 'linear-gradient(90deg, transparent 0%, hsla(357, 81%, 50%, 0.15) 50%, transparent 100%)',
              width: '50%',
              transform: 'skewX(-15deg)'
            }}
          />

          {/* Speed lines - left side */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={`left-${i}`}
                className="absolute h-[1px] bg-gradient-to-r from-transparent via-red-500/30 to-transparent"
                style={{
                  top: `${20 + i * 15}%`,
                  left: 0,
                  width: '40%'
                }}
                initial={{ x: '-100%', opacity: 0 }}
                animate={{ x: '50%', opacity: [0, 0.6, 0] }}
                transition={{
                  duration: 1.2,
                  delay: 0.8 + i * 0.1,
                  ease: 'easeOut'
                }}
              />
            ))}
          </div>

          {/* Speed lines - right side */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={`right-${i}`}
                className="absolute h-[1px] bg-gradient-to-l from-transparent via-red-500/30 to-transparent"
                style={{
                  top: `${25 + i * 15}%`,
                  right: 0,
                  width: '40%'
                }}
                initial={{ x: '100%', opacity: 0 }}
                animate={{ x: '-50%', opacity: [0, 0.6, 0] }}
                transition={{
                  duration: 1.2,
                  delay: 1 + i * 0.1,
                  ease: 'easeOut'
                }}
              />
            ))}
          </div>

          {/* Red glow behind logo */}
          <motion.div
            className="absolute w-96 h-96 rounded-full blur-3xl"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 0.4 }}
            transition={{ duration: 1, delay: 0.2, ease: 'easeOut' }}
            style={{
              background: 'radial-gradient(circle, hsla(357, 81%, 40%, 0.5) 0%, transparent 70%)'
            }}
          />

          {/* Logo */}
          <motion.img
            src="/ridezone-logo.png"
            alt="RideZone"
            className="relative z-10 h-32 md:h-40 lg:h-48 w-auto object-contain drop-shadow-2xl"
            initial={{ scale: 0.5, x: -100, opacity: 0 }}
            animate={{ scale: 1, x: 0, opacity: 1 }}
            transition={{
              duration: 0.8,
              delay: 0.3,
              ease: [0.25, 0.46, 0.45, 0.94]
            }}
            style={{
              filter: 'drop-shadow(0 0 30px hsla(357, 81%, 50%, 0.5))'
            }}
          />

          {/* Main heading */}
          <motion.h1
            className="relative z-10 mt-8 text-4xl md:text-5xl lg:text-6xl font-bold uppercase tracking-[0.2em] text-foreground"
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{
              duration: 0.6,
              delay: 1,
              ease: 'easeOut'
            }}
            style={{
              textShadow: '0 0 40px hsla(357, 81%, 50%, 0.4), 0 0 80px hsla(357, 81%, 40%, 0.2)'
            }}
          >
            RIDEZZONE.COM
          </motion.h1>

          {/* Subheading */}
          <motion.p
            className="relative z-10 mt-4 text-lg md:text-xl text-muted-foreground font-light tracking-wide"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.6,
              delay: 1.4,
              ease: 'easeOut'
            }}
          >
            Pakistan's Trusted Automobile Trading Platform
          </motion.p>

          {/* Bottom speed accent */}
          <motion.div
            className="absolute bottom-20 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-red-600/50 to-transparent"
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 1, opacity: 1 }}
            transition={{
              duration: 1,
              delay: 1.8,
              ease: 'easeOut'
            }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
};
