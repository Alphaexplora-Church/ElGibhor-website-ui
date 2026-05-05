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
      {/* Removed overflow-x-hidden to prevent scroll bugs with Lenis */}

      {/* The dark gradient starting from above */}
      <div className="absolute inset-0 bg-gradient-to-b from-background-dark via-[#0C0515] to-background-dark pointer-events-none -z-10"></div>

      {/* Subtle purple ambient glow at the top to blend sections */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-40 bg-[radial-gradient(ellipse_at_top,rgba(75,42,111,0.3),transparent_70%)] pointer-events-none -z-10"></div>

      <div className="max-w-7xl mx-auto px-6 text-center">

        {/* Editorial Subheading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex items-center justify-center gap-4 mb-6"
        >
          <div className="h-px w-8 bg-gold/50"></div>
          <span className="text-gold font-bold uppercase tracking-[0.3em] text-xs md:text-sm">New Here?</span>
          <div className="h-px w-8 bg-gold/50"></div>
        </motion.div>

        {/* Main Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-4xl md:text-6xl font-black text-white mb-16 tracking-tighter"
        >
          What to <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold-light to-gold italic pr-2">Expect</span>
        </motion.h2>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {expects.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: idx * 0.15 }}
              style={{ willChange: "transform, opacity" }}
              className="text-left group cursor-pointer bg-white/[0.03] backdrop-blur-md border border-white/10 rounded-[2rem] p-5 hover:bg-white/[0.06] hover:-translate-y-2 transition-all duration-500 shadow-2xl"
            >
              {/* Image Container */}
              <div className="w-full aspect-[4/3] rounded-2xl overflow-hidden mb-6 relative border border-white/5">
                <img
                  src={item.img}
                  alt={item.title}
                  loading="lazy"
                  className="w-full h-full object-cover opacity-70 group-hover:opacity-100 group-hover:scale-110 transition-transform duration-[1.5s] ease-out mix-blend-luminosity group-hover:mix-blend-normal"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background-dark/90 via-background-dark/20 to-transparent opacity-80 group-hover:opacity-30 transition-opacity duration-500"></div>
              </div>

              {/* Content */}
              <div className="px-2 pb-2">
                <div className="flex items-center gap-4 mb-4">
                  <span className="text-gold/50 font-black text-xl tracking-tighter">0{idx + 1}</span>
                  <div className="h-px bg-gradient-to-r from-gold/30 to-transparent flex-grow"></div>
                </div>
                <h3 className="text-2xl font-black text-white mb-2 group-hover:text-gold-light transition-colors duration-300 tracking-tight">{item.title}</h3>
                <p className="text-gray-400 text-base font-light leading-relaxed">{item.sub}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
});

WhatToExpect.displayName = "WhatToExpect";