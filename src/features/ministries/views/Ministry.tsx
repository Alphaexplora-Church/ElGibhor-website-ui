import React, { useState, useRef } from 'react';
import { useMinistriesViewModel } from '../viewModels/useMinistriesViewModel';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';

export const Ministry: React.FC = () => {
  const { ministries, isLoading } = useMinistriesViewModel();
  const headerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: headerRef,
    offset: ['start start', 'end start'],
  });

  const scaleHeader = useTransform(scrollYProgress, [0, 1], [1, 1.15]);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const toggle = (id: string) => {
    setExpandedId(prev => (prev === id ? null : id));
  };

  return (
    <div id="ministries" className="bg-background-dark overflow-x-hidden pb-0 antialiased font-sans [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">

      {/* Parallax Detailed Header */}
      <div ref={headerRef} className="relative h-[65vh] flex items-center justify-center overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-background-dark to-transparent z-10 pointer-events-none"></div>

        <motion.div style={{ scale: scaleHeader }} className="absolute inset-0 opacity-30 mix-blend-luminosity will-change-transform">
          <img
            src="https://images.unsplash.com/photo-1529070538774-1843cb3265df?w=1600&q=80"
            alt="Community"
            className="w-full h-full object-cover"
          />
        </motion.div>

        <div className="absolute inset-0 bg-gradient-to-b from-background-dark/95 via-background-dark/70 to-background-dark"></div>

        <div className="relative z-10 text-center px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center justify-center gap-4 mb-6"
          >
            <div className="h-px w-8 bg-gold/50"></div>
            <span className="text-gold font-bold uppercase tracking-[0.4em] text-xs md:text-sm">
              Our Ministries
            </span>
            <div className="h-px w-8 bg-gold/50"></div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-6xl md:text-8xl font-black text-white mb-8 tracking-tighter leading-none"
          >
            Grow in{' '}
            {/* Added pr-2 to prevent the italic 'h' from getting clipped */}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold-light via-gold to-gold-dark italic pr-3">
              Faith
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="text-gray-400 max-w-2xl mx-auto text-lg md:text-xl font-light leading-relaxed px-4"
          >
            Find your community and serve alongside fellow Christ-followers. There's a place for everyone exactly where they are.
          </motion.p>
        </div>
      </div>

      {/* Accordion Stacked Rows */}
      <div className="relative z-10 border-t border-white/5">
        {isLoading ? (
          <div className="text-center text-gold py-32 text-xl animate-pulse font-bold tracking-widest uppercase">
            Loading Community Data...
          </div>
        ) : (
          <div className="flex flex-col">
            {ministries.map((ministry, index) => {
              const isExpanded = expandedId === ministry.id;

              return (
                <motion.div
                  key={ministry.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                  className="group border-b border-white/10"
                >
                  <button
                    onClick={() => toggle(ministry.id)}
                    className="w-full text-left focus:outline-none"
                  >
                    <div
                      className={`
                        relative flex items-center justify-between overflow-hidden
                        transition-all duration-700 ease-in-out
                        ${isExpanded ? 'bg-white/[0.02]' : 'bg-transparent hover:bg-white/[0.04]'}
                      `}
                    >
                      {/* Image peek background */}
                      <div className={`absolute right-0 top-0 h-full w-1/2 transition-opacity duration-700 ${isExpanded ? 'opacity-0' : 'opacity-100'}`}>
                        <img src={ministry.imageUrl} alt="" className="w-full h-full object-cover opacity-10 mix-blend-luminosity grayscale group-hover:scale-110 transition-transform duration-[2s]" />
                        <div className="absolute inset-0 bg-gradient-to-r from-background-dark via-background-dark/80 to-transparent" />
                      </div>

                      <div className="relative z-10 flex items-center gap-6 md:gap-12 px-6 md:px-16 py-10 md:py-14 w-full">
                        <span className={`font-black text-2xl md:text-3xl tracking-tighter transition-colors duration-500 ${isExpanded ? 'text-gold' : 'text-white/10 group-hover:text-gold/40'}`}>
                          0{index + 1}
                        </span>

                        <h2 className={`text-2xl md:text-3xl lg:text-4xl font-black tracking-tighter leading-none transition-all duration-500 ${isExpanded ? 'text-gold-light' : 'text-white group-hover:text-gold-light'}`}>
                          {ministry.title}
                        </h2>
                      </div>

                      <div className="relative z-10 pr-6 md:pr-16">
                        <div className={`w-12 h-12 border rounded-full flex items-center justify-center transition-all duration-500 ${isExpanded ? 'border-gold bg-gold text-royal-purple-dark rotate-45' : 'border-white/20 text-white/40 group-hover:border-gold group-hover:text-gold'}`}>
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </button>

                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                        className="overflow-hidden bg-white/[0.02]"
                      >
                        <div className="px-6 md:px-16 pb-20 pt-4">
                          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">

                            {/* Detailed Image Card */}
                            <div className="lg:col-span-7">
                              <div className="relative aspect-video lg:aspect-auto lg:h-[35rem] rounded-3xl overflow-hidden border border-white/10 shadow-2xl">
                                <img src={ministry.imageUrl} alt={ministry.title} className="w-full h-full object-cover" />
                                <div className="absolute inset-0 bg-gradient-to-t from-background-dark/80 via-transparent to-transparent" />
                              </div>
                            </div>

                            {/* Content & Actions */}
                            <div className="lg:col-span-5 flex flex-col justify-center">
                              <p className="text-2xl md:text-3xl text-gray-300 font-light leading-relaxed mb-12 tracking-tight">
                                {ministry.description}
                              </p>

                              <div className="space-y-2">
                                <a href="#" className="group/link flex items-center justify-between py-6 border-b border-white/10 hover:border-gold transition-colors duration-300">
                                  <span className="text-xl font-bold text-white group-hover/link:text-gold transition-colors">Join this Ministry</span>
                                  <svg className="w-6 h-6 text-gold transform group-hover/link:translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                  </svg>
                                </a>
                                <a href="#" className="group/link flex items-center justify-between py-6 border-b border-white/10 hover:border-gold transition-colors duration-300">
                                  <span className="text-xl font-bold text-white group-hover/link:text-gold transition-colors">Service Times</span>
                                  <svg className="w-6 h-6 text-gold transform group-hover/link:translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                  </svg>
                                </a>
                              </div>
                            </div>

                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};