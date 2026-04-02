import React, { memo } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

export const FooterCTA: React.FC = memo(() => {
  return (
    <section className="relative py-32 z-10 w-full overflow-hidden mt-12 bg-background-dark">
      <div className="absolute inset-0">
        <img 
           src="https://images.unsplash.com/photo-1438232992991-995b7058bbb3?w=1600&q=80" 
           alt="Worship Background" 
           loading="lazy" 
           className="w-full h-full object-cover opacity-40 mix-blend-overlay"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background-dark via-royal-purple-dark/80 to-background-dark"></div>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center flex flex-col items-center">
        <motion.h2 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-5xl md:text-6xl font-black text-white tracking-tighter mb-8 drop-shadow-2xl"
        >
          Ready to take a <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold-light to-gold">step</span>?
        </motion.h2>

        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex flex-col sm:flex-row gap-6 w-full sm:w-auto"
        >
          <a
            href="#plan-visit"
            className="px-10 py-5 bg-gradient-to-r from-gold to-gold-light text-royal-purple-dark font-black rounded-full shadow-[0_0_30px_rgba(239,191,4,0.4)] hover:scale-105 transition-transform duration-300 text-lg"
          >
            Plan a Visit
          </a>
          <Link
            to="/watch"
            className="px-10 py-5 bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 text-white font-bold rounded-full shadow-xl hover:scale-105 transition-transform duration-300 text-lg"
          >
            Watch Live
          </Link>
        </motion.div>
      </div>
    </section>
  );
});

FooterCTA.displayName = "FooterCTA";
