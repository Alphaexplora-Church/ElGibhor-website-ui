//src/shared/components/GlobalBackground.tsx

import React from 'react';
import { motion } from 'framer-motion';

export const GlobalBackground: React.FC = () => {
  return (
    <div className="fixed inset-0 z-[-1] overflow-hidden pointer-events-none bg-[#FAFAFA]">

      {/* Large subtle glowing orb - Purple */}
      <motion.div
        className="absolute top-[-20%] right-[-10%] w-[80vw] h-[80vw] rounded-full opacity-60 pointer-events-none will-change-transform"
        style={{
          background: 'radial-gradient(circle, rgba(230, 220, 255, 0.8) 0%, transparent 60%)'
        }}
        animate={{
          x: [0, -30, 0],
          y: [0, 40, 0],
          scale: [1, 1.05, 1]
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear"
        }}
      />

      {/* Another glowing orb - Gold/Warm */}
      <motion.div
        className="absolute bottom-[-10%] left-[-10%] w-[70vw] h-[70vw] rounded-full opacity-40 pointer-events-none will-change-transform"
        style={{
          background: 'radial-gradient(circle, rgba(255, 237, 204, 0.7) 0%, transparent 60%)'
        }}
        animate={{
          x: [0, 40, 0],
          y: [0, -30, 0],
          scale: [1, 1.1, 1]
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