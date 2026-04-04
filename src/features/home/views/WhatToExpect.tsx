import React, { memo } from 'react';
import { motion } from 'framer-motion';

const expects = [
  { title: "The Service", sub: "Passionate worship & practical message.", img: "https://images.unsplash.com/photo-1438232992991-995b7058bbb3?w=600&q=80" },
  { title: "Kids & Youth", sub: "Safe, fun, and engaging environments.", img: "https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=600&q=80" },
  { title: "First-Time Guests", sub: "VIP parking & friendly hosts.", img: "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?w=600&q=80" }
];

export const WhatToExpect: React.FC = memo(() => {
  return (
    <section className="py-16 relative z-10">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl font-black text-royal-purple-dark mb-12 tracking-tight"
        >
          What to <span className="text-royal-purple-light">Expect</span>
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {expects.map((item, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: idx * 0.12 }}
              style={{ willChange: "transform, opacity" }}
              className="text-left group cursor-pointer"
            >
              <div className="w-full aspect-[4/3] rounded-2xl overflow-hidden mb-4 relative">
                 <img 
                   src={item.img} 
                   alt={item.title} 
                   loading="lazy" 
                   className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                 />
              </div>
              <h3 className="text-lg font-bold text-royal-purple-dark mb-1 group-hover:text-gold-dark transition-colors">{item.title}</h3>
              <p className="text-gray-600 text-sm font-light">{item.sub}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
});

WhatToExpect.displayName = "WhatToExpect";
