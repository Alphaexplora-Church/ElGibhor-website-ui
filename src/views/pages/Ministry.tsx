import React from 'react';
import { useMinistriesViewModel } from '../../viewModels/useMinistriesViewModel';
import { motion, useScroll, useTransform } from 'framer-motion';

export const Ministries: React.FC = () => {
  const { ministries, isLoading } = useMinistriesViewModel();
  const { scrollYProgress } = useScroll();
  const yHeader = useTransform(scrollYProgress, [0, 1], [0, 300]);

  return (
    <div className="min-h-screen bg-background-dark overflow-x-hidden">

      {/* Parallax Detailed Header */}
      <div className="relative h-[60vh] flex items-center justify-center overflow-hidden border-b border-border-dark">
        <motion.div style={{ y: yHeader }} className="absolute inset-0 opacity-30 mix-blend-luminosity">
          <img src="https://images.unsplash.com/photo-1529070538774-1843cb3265df?w=1600&q=80" alt="Community" className="w-full h-full object-cover" />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-b from-background-dark/80 via-royal-purple-dark/80 to-background-dark"></div>

        <div className="relative z-10 text-center px-6">
          <motion.span
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
            className="text-gold font-bold uppercase tracking-[0.3em] text-sm mb-4 block"
          >
            Our Ministries
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }}
            className="text-5xl md:text-7xl font-black text-white mb-6 tracking-tighter"
          >
            Grow in <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold-light to-gold-dark italic pr-2">Faith</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 0.4 }}
            className="text-gray-300 max-w-2xl mx-auto text-lg md:text-xl font-light"
          >
            Find your community and serve alongside fellow Christ-followers. There’s a place for everyone exactly where they are.
          </motion.p>
        </div>
      </div>

      {/* Main Expansive Content */}
      <div className="max-w-7xl mx-auto px-6 py-24">
        {isLoading && (
          <div className="text-center text-gold py-20 text-xl animate-pulse font-medium">Retrieving community data...</div>
        )}

        {!isLoading && (
          <div className="space-y-32">
            {ministries.map((ministry, index) => {
              const isEven = index % 2 === 0;
              return (
                <motion.div
                  key={ministry.id}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.8 }}
                  className={`flex flex-col ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'} items-center gap-16 group`}
                >
                  {/* Huge Immersive Image */}
                  <div className="w-full lg:w-1/2 h-[28rem] relative rounded-3xl overflow-hidden shadow-2xl">
                    <img
                      src={ministry.imageUrl}
                      alt={ministry.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000 opacity-80 group-hover:opacity-100 mix-blend-luminosity group-hover:mix-blend-normal"
                    />
                    <div className="absolute inset-0 bg-royal-purple/20 group-hover:bg-transparent transition-colors duration-500"></div>
                  </div>

                  {/* Elegant Staggered Text */}
                  <div className="w-full lg:w-1/2">
                    <div className="flex items-center mb-6">
                      <span className="text-gold font-bold text-xl mr-4 opacity-50">0{index + 1}</span>
                      <div className="h-px bg-gold/20 flex-grow"></div>
                    </div>
                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 group-hover:text-gold transition-colors duration-500 tracking-tight">{ministry.title}</h2>
                    <p className="text-xl text-gray-300 leading-relaxed font-light mb-10">
                      {ministry.description}
                    </p>
                    <button className="px-8 py-3 bg-transparent border border-gold text-white rounded-full font-bold hover:bg-gold hover:text-royal-purple-dark transition-all duration-300 inline-flex items-center shadow-[0_0_15px_rgba(239,191,4,0.15)] group/btn">
                      Connect with this Ministry
                      <svg className="w-5 h-5 ml-2 group-hover/btn:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};