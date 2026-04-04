import React, { memo } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

export const FooterCTA: React.FC = memo(() => {
  return (
    <section className="relative py-20 z-10 w-full overflow-hidden bg-background-dark">
      <div className="absolute inset-0">
        <img 
           src="https://images.unsplash.com/photo-1438232992991-995b7058bbb3?w=1600&q=80" 
           alt="Worship Background" 
           loading="lazy" 
           className="w-full h-full object-cover opacity-25 mix-blend-overlay"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background-dark via-royal-purple-dark/60 to-background-dark"></div>
      </div>

      <div className="relative z-10 max-w-3xl mx-auto px-6 text-center flex flex-col items-center">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-4xl md:text-5xl font-black text-white tracking-tight mb-6 drop-shadow-xl"
        >
          Ready to take a <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold-light to-gold">step</span>?
        </motion.h2>

        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto"
        >
          <a
            href="#plan-visit"
            className="px-8 py-4 bg-gold text-royal-purple-dark font-black rounded-full shadow-[0_0_20px_rgba(239,191,4,0.35)] hover:bg-gold-light hover:scale-105 transition-all duration-300"
          >
            Plan a Visit
          </a>
          <Link
            to="/watch"
            className="px-8 py-4 bg-white/10 backdrop-blur-md border border-white/15 hover:bg-white/20 text-white font-bold rounded-full hover:scale-105 transition-all duration-300"
          >
            Watch Live
          </Link>
        </motion.div>
      </div>
    </section>
  );
});

FooterCTA.displayName = "FooterCTA";
