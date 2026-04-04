//src/shared/components/GlobalBackground.tsx

import React from 'react';
import { motion } from 'framer-motion';

export const GlobalBackground: React.FC = () => {
  return (
    <div className="fixed inset-0 z-[-1] overflow-hidden pointer-events-none bg-background-dark">

      {/* Large subtle glowing orb - Purple */}
      {/* Optimization: Removed CSS blur and mix-blend-mode. Radial gradient handles the soft edge. Added will-change-transform */}
      <motion.div
        className="absolute top-[-20%] left-[-10%] w-[70vw] h-[70vw] rounded-full opacity-30 pointer-events-none will-change-transform"
        style={{
          background: 'radial-gradient(circle, var(--color-royal-purple-light) 0%, transparent 70%)'
        }}
        animate={{
          x: [0, 50, 0],
          y: [0, 30, 0],
          scale: [1, 1.1, 1]
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear" // 'linear' is slightly cheaper to calculate than 'easeInOut'
        }}
      />

      {/* Another glowing orb - Gold */}
      <motion.div
        className="absolute bottom-[-20%] right-[-10%] w-[60vw] h-[60vw] rounded-full opacity-20 pointer-events-none will-change-transform"
        style={{
          background: 'radial-gradient(circle, var(--color-gold) 0%, transparent 70%)'
        }}
        animate={{
          x: [0, -40, 0],
          y: [0, -50, 0],
          scale: [1, 1.2, 1]
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "linear",
          delay: 2
        }}
      />

      {/* Noise overlay for texture */}
      {/* Optimization: Kept as is, but ensuring it's static. If lag persists on very old phones, consider removing this layer entirely via a media query for small screens. */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
        }}
      />
    </div>
  );
};