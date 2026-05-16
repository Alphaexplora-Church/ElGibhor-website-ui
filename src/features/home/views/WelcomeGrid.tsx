// src/features/Home/WelcomeGrid.tsx

import React, { memo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useHomeViewModel } from '../viewModels/useHomeViewModel';

export const WelcomeGrid: React.FC = memo(() => {
  const { ministries, isLoading } = useHomeViewModel();
  const featuredMinistries = ministries.slice(0, 4);
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section className="py-24 px-6 bg-[#F4EDFB] relative z-10 overflow-hidden">
      {/* Subtle Gold Background Accents */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[radial-gradient(circle,rgba(239,191,4,0.08)_0%,transparent_70%)] pointer-events-none transform translate-x-1/3 -translate-y-1/3"></div>
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[radial-gradient(circle,rgba(75,42,111,0.08)_0%,transparent_70%)] pointer-events-none transform -translate-x-1/3 translate-y-1/3"></div>

      <div className="max-w-7xl mx-auto relative z-10">

        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-center md:items-end mb-16">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center md:text-left"
          >
            <div className="flex items-center justify-center md:justify-start space-x-4 mb-3">
              <div className="w-10 h-px bg-gold border-t border-gold"></div>
              <span className="text-gold font-bold uppercase tracking-[0.3em] text-xs">Community</span>
            </div>
            <h2 className="text-4xl md:text-6xl font-black text-gray-900 tracking-tighter">
              Find Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-royal-purple to-royal-purple-dark italic pr-2">Place</span>
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mt-6 md:mt-0"
          >
            <Link to="/experience#ministries" className="inline-flex items-center px-6 py-3 rounded-full border border-royal-purple/20 text-royal-purple font-bold hover:bg-royal-purple hover:text-white transition-all duration-300 group shadow-sm">
              See All Ministries
              <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
            </Link>
          </motion.div>
        </div>

        {!isLoading && featuredMinistries.length > 0 && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 min-h-[500px]">

            {/* LEFT SIDE: Interactive Typography List */}
            <div className="lg:col-span-5 flex flex-col justify-center gap-2">
              {featuredMinistries.map((ministry, idx) => {
                const isActive = activeIndex === idx;

                return (
                  <motion.div
                    key={ministry.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1 }}
                    onClick={() => setActiveIndex(idx)}
                    onMouseEnter={() => setActiveIndex(idx)}
                    className="relative group cursor-pointer py-6 border-b border-gray-300/50 last:border-transparent"
                  >
                    {/* Active State Background Highlight */}
                    <div className={`absolute inset-0 -mx-6 px-6 rounded-2xl transition-colors duration-500 -z-10
                      ${isActive ? 'bg-white/40 shadow-[0_8px_30px_rgba(0,0,0,0.04)]' : 'group-hover:bg-white/20'}
                    `}></div>

                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className={`text-2xl md:text-3xl font-black transition-all duration-500 tracking-tight
                          ${isActive ? 'text-royal-purple translate-x-2' : 'text-gray-400 group-hover:text-gray-600'}
                        `}>
                          {ministry.title}
                        </h3>

                        {/* Smooth expanding description */}
                        <div className={`grid transition-all duration-500 ease-in-out
                          ${isActive ? 'grid-rows-[1fr] opacity-100 mt-3 translate-x-2' : 'grid-rows-[0fr] opacity-0 mt-0'}
                        `}>
                          <p className="overflow-hidden text-gray-600 font-light leading-relaxed pr-8">
                            {ministry.description}
                          </p>
                        </div>
                      </div>

                      {/* Animated Arrow */}
                      <div className={`transition-all duration-500 flex-shrink-0
                        ${isActive ? 'opacity-100 translate-x-0 text-gold' : 'opacity-0 -translate-x-4 text-gray-300'}
                      `}>
                        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                      </div>
                    </div>

                    {/* ── MOBILE INLINE IMAGE (only visible on mobile when active) ── */}
                    <AnimatePresence>
                      {isActive && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                          className="lg:hidden overflow-hidden mt-4"
                        >
                          <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden shadow-lg border border-white/50">
                            <img
                              src={ministry.imageUrl}
                              alt={ministry.title}
                              className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-royal-purple-dark/30 via-transparent to-transparent pointer-events-none" />
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                );
              })}
            </div>

            {/* RIGHT SIDE: Cinematic Image Canvas (desktop only) */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="hidden lg:block lg:col-span-7 relative w-full lg:h-[600px] rounded-[2.5rem] overflow-hidden shadow-2xl border border-white/50"
            >
              <AnimatePresence mode="wait">
                <motion.img
                  key={activeIndex}
                  initial={{ opacity: 0, scale: 1.05 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.6, ease: "easeInOut" }}
                  src={featuredMinistries[activeIndex]?.imageUrl}
                  alt={featuredMinistries[activeIndex]?.title}
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </AnimatePresence>

              {/* Inner overlay for depth */}
              <div className="absolute inset-0 bg-gradient-to-t from-royal-purple-dark/40 via-transparent to-transparent pointer-events-none"></div>
            </motion.div>

          </div>
        )}

        {/* Reassurance Strip - Redesigned to fit the premium light theme */}
        {/*
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-20 pt-10 border-t border-gray-300/50 flex flex-wrap justify-center gap-x-12 gap-y-6"
        >
          {['Free Coffee', 'Casual Dress code', 'Kids Programs'].map((text, i) => (
            <div key={i} className="flex items-center gap-3 text-royal-purple-dark/70 font-bold uppercase tracking-widest text-xs">
              <div className="w-1.5 h-1.5 rounded-full bg-gold"></div>
              {text}
            </div>
          ))}
        </motion.div>
        */}

      </div>
    </section>
  );
});

WelcomeGrid.displayName = "WelcomeGrid";