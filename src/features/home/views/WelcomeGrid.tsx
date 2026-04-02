import React, { memo } from 'react';
import { motion } from 'framer-motion';

const gridItems = [
  { img: 'https://images.unsplash.com/photo-1544427920-c49ccfbc3af5?w=800&q=80', text: 'Come as you are' },
  { img: 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=800&q=80', text: 'Real friendships await' },
  { img: 'https://images.unsplash.com/photo-1510214681659-3d12d4a544d6?w=800&q=80', text: 'Encounter His presence' }
];

export const WelcomeGrid: React.FC = memo(() => {
  return (
    <section className="py-24 relative z-10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8 min-h-[60vh]">
          {gridItems.map((item, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: idx * 0.2 }}
              className={`relative overflow-hidden rounded-3xl group ${idx === 1 ? 'md:-translate-y-12' : ''}`}
              style={{ willChange: "transform, opacity" }}
            >
              <img 
                src={item.img} 
                alt={item.text} 
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background-dark/90 via-transparent to-transparent"></div>
              <h3 className="absolute bottom-8 left-8 text-2xl font-bold text-white drop-shadow-md tracking-tight">
                {item.text}
              </h3>
            </motion.div>
          ))}
        </div>
        
        {/* Reassurance Strip */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.8 }}
          className="mt-20 pt-10 border-t border-white/10 flex flex-wrap justify-between gap-6 text-gray-400 font-medium tracking-wide uppercase text-sm"
        >
          <span>Free Coffee</span>
          <span>Casual Dress code</span>
          <span>Kids Programs</span>
          <span>Secure Parking</span>
        </motion.div>
      </div>
    </section>
  );
});

WelcomeGrid.displayName = "WelcomeGrid";
