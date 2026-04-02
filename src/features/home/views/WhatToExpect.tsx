import React, { memo } from 'react';
import { motion } from 'framer-motion';

const expects = [
  { title: "The Service", sub: "Passionate worship & practical message.", img: "https://images.unsplash.com/photo-1438232992991-995b7058bbb3?w=600&q=80" },
  { title: "Kids & Youth", sub: "Safe, fun, and engaging environments.", img: "https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=600&q=80" },
  { title: "First-Time Guests", sub: "VIP parking & friendly hosts.", img: "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?w=600&q=80" }
];

export const WhatToExpect: React.FC = memo(() => {
  return (
    <section className="py-24 relative z-10">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl font-black text-white mb-16 tracking-tight"
        >
          What to <span className="text-royal-purple-light">Expect</span>
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {expects.map((item, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: idx * 0.15 }}
              style={{ willChange: "transform, opacity" }}
              className="text-left group cursor-pointer"
            >
              <div className="w-full aspect-[4/3] rounded-2xl overflow-hidden mb-6 relative">
                 <img 
                   src={item.img} 
                   alt={item.title} 
                   loading="lazy" 
                   className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                 />
                 <div className="absolute inset-0 bg-royal-purple/10 group-hover:bg-transparent transition-colors duration-300"></div>
              </div>
              <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-gold transition-colors">{item.title}</h3>
              <p className="text-gray-400 font-light">{item.sub}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
});

WhatToExpect.displayName = "WhatToExpect";
