import React from 'react';
import { useMinistriesViewModel } from '../viewModels/useMinistriesViewModel';
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
            Find your community and serve alongside fellow Christ-followers. There's a place for everyone exactly where they are.
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
                   initial={{ opacity: 0 }}
                   whileInView={{ opacity: 1 }}
                   viewport={{ once: true, amount: 0.3 }}
                   transition={{ duration: 0.8, delay: 0.1 }}
                   className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center"
                >
                  {/* Content */}
                  <motion.div
                     initial={{ opacity: 0, x: isEven ? -50 : 50 }}
                     whileInView={{ opacity: 1, x: 0 }}
                     viewport={{ once: true }}
                     transition={{ duration: 0.8 }}
                     className={isEven ? 'order-1 md:order-1' : 'order-1 md:order-2'}
                  >
                    <div className="flex items-center space-x-4 mb-4">
                       <div className="w-1 h-8 bg-gold rounded-full"></div>
                       <span className="text-gold font-bold uppercase tracking-[0.2em] text-xs">{`Ministry ${index + 1}`}</span>
                    </div>
                    <h3 className="text-5xl font-black mb-6 text-white">{ministry.title}</h3>
                    <p className="text-gray-300 text-lg font-light leading-relaxed mb-8 max-w-md">{ministry.description}</p>
                  </motion.div>

                  {/* Image */}
                  <motion.div
                     initial={{ opacity: 0, x: isEven ? 50 : -50, scale: 0.95 }}
                     whileInView={{ opacity: 1, x: 0, scale: 1 }}
                     viewport={{ once: true }}
                     transition={{ duration: 0.8 }}
                     className={isEven ? 'order-2 md:order-2' : 'order-2 md:order-1'}
                  >
                    <div className="relative group rounded-2xl overflow-hidden h-96 border border-border-dark/50">
                      <img 
                        src={ministry.imageUrl} 
                        alt={ministry.title} 
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-background-dark/60 to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-300"></div>
                    </div>
                  </motion.div>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};