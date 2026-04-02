import React, { memo } from 'react';
import { motion } from 'framer-motion';

export const Manifesto: React.FC = memo(() => {
  return (
    <section id="manifesto" className="relative min-h-[90vh] py-32 flex items-center justify-center overflow-hidden bg-background-dark z-10 w-full">
      {/* Background Texture */}
      <div className="absolute inset-0 opacity-5 pointer-events-none" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] bg-royal-purple/20 rounded-full filter blur-[150px] pointer-events-none"></div>

      <div className="max-w-5xl mx-auto px-6 relative z-10 text-center">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <span className="text-gold font-bold uppercase tracking-widest text-sm mb-6 block">Why We Exist</span>
          <h1 className="text-5xl md:text-7xl font-black text-white leading-tight tracking-tighter mb-12 drop-shadow-2xl">
            A movement of devoted <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold-light to-gold">Christ-followers</span> dedicated to guiding others in their faith journey, all for the glory of God.
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 font-light leading-relaxed max-w-3xl mx-auto">
            TMGAN is a growing family of churches across the Philippines. We exist to declare the mighty works of God and to see cities transformed by the radical love of Jesus Christ.
          </p>
        </motion.div>
      </div>
    </section>
  );
});

Manifesto.displayName = "Manifesto";
