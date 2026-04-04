import React from 'react';
import { useMinistriesViewModel } from '../viewModels/useMinistriesViewModel';
import { motion, useScroll, useTransform } from 'framer-motion';

export const Ministry: React.FC = () => {
  const { ministries, isLoading } = useMinistriesViewModel();
  const { scrollYProgress } = useScroll();
  const yHeader = useTransform(scrollYProgress, [0, 1], [0, 300]);

  return (
    <div className="bg-transparent overflow-x-hidden pt-20">
      
      {/* Parallax Detailed Header */}
      <div className="relative h-[60vh] flex items-center justify-center overflow-hidden">
        <motion.div style={{ y: yHeader }} className="absolute inset-0 opacity-40 mix-blend-luminosity">
            <img src="https://images.unsplash.com/photo-1529070538774-1843cb3265df?w=1600&q=80" alt="Community" className="w-full h-full object-cover" />
        </motion.div>
        {/* Soft light gradient overlay rather than dark */}
        <div className="absolute inset-0 bg-gradient-to-b from-white/60 via-white/80 to-[#FAFAFA]"></div>
        
        <div className="relative z-10 text-center px-6">
          <motion.span 
             initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
             className="text-gold-dark font-bold uppercase tracking-[0.3em] text-sm mb-4 block"
          >
             Our Ministries
          </motion.span>
          <motion.h1 
             initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }}
             className="text-5xl md:text-7xl font-black text-royal-purple-dark mb-6 tracking-tighter"
          >
             Grow in <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold-dark to-gold italic pr-2">Faith</span>
          </motion.h1>
          <motion.p 
             initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 0.4 }}
             className="text-gray-600 max-w-2xl mx-auto text-lg md:text-xl font-light"
          >
            Find your community and serve alongside fellow Christ-followers. There's a place for everyone exactly where they are.
          </motion.p>
        </div>
      </div>

      {/* Main Expansive Content */}
      <div className="max-w-7xl mx-auto px-6 py-24 relative z-10">
        {isLoading && (
           <div className="text-center text-gold-dark py-20 text-xl animate-pulse font-medium">Retrieving community data...</div>
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
                  <div className="w-full lg:w-1/2 h-[28rem] relative rounded-3xl overflow-hidden shadow-2xl bg-white border border-black/5">
                    <img 
                      src={ministry.imageUrl} 
                      alt={ministry.title} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000 opacity-90 group-hover:opacity-100 mix-blend-luminosity group-hover:mix-blend-normal"
                    />
                    <div className="absolute inset-0 bg-royal-purple/10 group-hover:bg-transparent transition-colors duration-500"></div>
                  </div>

                  {/* Elegant Staggered Text */}
                  <div className="w-full lg:w-1/2">
                    <div className="flex items-center mb-6">
                       <span className="text-gold-dark font-bold text-xl mr-4 opacity-70">0{index + 1}</span>
                       <div className="h-px bg-gold/40 flex-grow"></div>
                    </div>
                    <h2 className="text-4xl md:text-5xl font-bold text-royal-purple-dark mb-6 tracking-tight">{ministry.title}</h2>
                    <p className="text-xl text-gray-600 leading-relaxed font-light mb-10">
                      {ministry.description} 
                    </p>
                    <button className="px-8 py-3 bg-white border border-gold-dark text-royal-purple-dark rounded-full font-bold hover:bg-gold-light hover:border-gold-light transition-all duration-300 inline-flex items-center shadow-lg group/btn">
                        Connect with this Ministry
                        <svg className="w-5 h-5 ml-2 text-gold-dark group-hover/btn:translate-x-1 group-hover/btn:text-royal-purple-dark transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
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