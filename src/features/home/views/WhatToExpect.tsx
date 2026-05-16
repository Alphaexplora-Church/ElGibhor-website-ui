// src/features/Home/WhatToExpect.tsx

import React, { memo, useState } from 'react';
import { motion } from 'framer-motion';

const expects = [
  {
    id: "01",
    title: "Sunday Celebrations",
    sub: "Passionate worship and life-giving messages dedicated to guiding your faith journey.",
    img: "/assets/Photos/SampleImg3.png"
  },
  {
    id: "02",
    title: "Radiance Youth",
    sub: "A safe, dynamic community where the next generation can encounter God and grow together.",
    img: "/assets/Photos/SampleImg1.png"
  },
  {
    id: "03",
    title: "First-Time Guests",
    sub: "Welcome to our Marikina family! We are a movement of devoted Christ-followers excited to meet you.",
    img: "/assets/Photos/Image6.png"
  }
];

export const WhatToExpect: React.FC = memo(() => {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section className="py-24 relative z-10 overflow-hidden">
      <div className="absolute inset-0 bg-background-dark pointer-events-none -z-10"></div>
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-64 bg-[radial-gradient(ellipse_at_top,rgba(75,42,111,0.2),transparent_70%)] pointer-events-none -z-10"></div>

      <div className="max-w-7xl mx-auto px-6">

        <div className="text-center mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center justify-center gap-4 mb-4"
          >
            <div className="h-px w-8 bg-gold/50"></div>
            <span className="text-gold font-bold uppercase tracking-[0.3em] text-xs md:text-sm">New Here?</span>
            <div className="h-px w-8 bg-gold/50"></div>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl font-black text-white tracking-tighter mb-6"
          >
            What to <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold-light to-gold italic pr-2">Expect</span>
          </motion.h2>

          {/* Dynamic Interaction Instructions */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="flex justify-center items-center text-gray-500 font-bold uppercase tracking-widest text-[10px]"
          >
            {/* Desktop Instruction */}
            <span className="hidden md:flex items-center gap-2 bg-white/5 px-4 py-1.5 rounded-full border border-white/10">
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" /></svg>
              Hover to expand
            </span>
            {/* Mobile Instruction */}
            <span className="flex md:hidden items-center gap-2 bg-white/5 px-4 py-1.5 rounded-full border border-white/10">
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 11.5V14m0-2.5v-6a1.5 1.5 0 113 0m-3 6a1.5 1.5 0 00-3 0v2a7.5 7.5 0 0015 0v-5a1.5 1.5 0 00-3 0m-6-3V11m0-5.5v-1a1.5 1.5 0 013 0v1m0 0V11m0-5.5a1.5 1.5 0 013 0v3m0 0V11" /></svg>
              Tap to expand
            </span>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex flex-col md:flex-row w-full h-[600px] md:h-[500px] lg:h-[600px] gap-4"
        >
          {expects.map((item, idx) => {
            const isActive = activeIndex === idx;

            return (
              <div
                key={item.id}
                onMouseEnter={() => setActiveIndex(idx)}
                onClick={() => setActiveIndex(idx)}
                className={`relative rounded-[2rem] overflow-hidden cursor-pointer border border-white/10 transition-[flex,box-shadow] duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] group
                  ${isActive ? 'flex-[4] shadow-[0_0_40px_rgba(239,191,4,0.15)]' : 'flex-1 hover:bg-white/5'}
                `}
              >
                {/* Background Image */}
                <img
                  src={item.img}
                  alt={item.title}
                  loading="lazy"
                  className={`absolute inset-0 w-full h-full object-cover transition-all duration-700 ease-in-out
                    ${isActive ? 'scale-100 opacity-90 mix-blend-normal filter-none' : 'scale-110 opacity-40 mix-blend-luminosity grayscale-[30%]'}
                  `}
                />

                {/* Background Gradient */}
                <div className={`absolute inset-0 transition-opacity duration-700 
                  ${isActive ? 'bg-gradient-to-t from-background-dark via-background-dark/30 to-transparent' : 'bg-background-dark/60'}
                `}></div>

                {/* --- LAYER 1: COLLAPSED STATE (Centered) --- */}
                <div className={`absolute inset-0 flex items-center justify-center transition-all duration-500
                  ${isActive ? 'opacity-0 scale-95 pointer-events-none' : 'opacity-100 scale-100 delay-200'}
                `}>
                  <div className="flex items-center gap-3 md:-rotate-90 whitespace-nowrap">
                    <span className="text-gold/60 font-black text-xl">{item.id}</span>
                    <h3 className="text-white font-bold text-lg md:text-xl tracking-widest">{item.title}</h3>
                  </div>
                </div>

                {/* --- LAYER 2: EXPANDED STATE (Bottom Left) --- */}
                <div className={`absolute inset-0 p-6 md:p-8 flex flex-col justify-end transition-all duration-500
                  ${isActive ? 'opacity-100 translate-y-0 delay-200' : 'opacity-0 translate-y-8 pointer-events-none'}
                `}>
                  <div className="flex items-center gap-4 mb-4">
                    <span className="font-black tracking-tighter text-gold/80 text-2xl md:text-3xl">
                      {item.id}
                    </span>
                    <div className="h-px w-12 bg-gradient-to-r from-gold/50 to-transparent"></div>
                  </div>
                  <div>
                    <h3 className="font-black text-white text-3xl md:text-4xl mb-3 drop-shadow-lg">
                      {item.title}
                    </h3>
                    <p className="text-gray-300 text-sm md:text-base font-light leading-relaxed max-w-sm">
                      {item.sub}
                    </p>
                  </div>
                </div>

              </div>
            );
          })}
        </motion.div>

      </div>
    </section>
  );
});

WhatToExpect.displayName = "WhatToExpect";