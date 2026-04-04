import React, { useState, memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const regions = [
  { 
    id: "luzon", 
    title: "Luzon", 
    image: "https://images.unsplash.com/photo-1518458028785-8fbcd101ebb9?w=1200&q=80",
    churches: ["TMGAN Manila", "TMGAN Baguio", "TMGAN Quezon City", "TMGAN Makati"]
  },
  { 
    id: "visayas", 
    title: "Visayas", 
    image: "https://images.unsplash.com/photo-1510414167123-5e917d598687?w=1200&q=80",
    churches: ["TMGAN Cebu", "TMGAN Iloilo", "TMGAN Bacolod"]
  },
  { 
    id: "mindanao", 
    title: "Mindanao", 
    image: "https://images.unsplash.com/photo-1542289659-cd91d6ebfaed?w=1200&q=80",
    churches: ["TMGAN Davao", "TMGAN Cagayan de Oro", "TMGAN General Santos"]
  }
];

export const DaughterChurchesSection: React.FC = memo(() => {
  const [activeRegion, setActiveRegion] = useState(regions[0]);

  return (
    <section id="churches" className="py-16 bg-background-dark relative z-10 w-full overflow-hidden">
      
      {/* Massive Fading Watermark Text */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeRegion.id}
          initial={{ opacity: 0, scale: 0.9, y: 50 }}
          animate={{ opacity: 0.05, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 1.1, y: -50 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden"
          style={{ willChange: "transform, opacity" }}
        >
           <span className="text-[25vw] font-black text-white whitespace-nowrap uppercase tracking-tighter">
             {activeRegion.title}
           </span>
        </motion.div>
      </AnimatePresence>

      <div className="max-w-7xl mx-auto px-6 relative z-10 w-full">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 border-b border-white/10 pb-8 gap-8">
           <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <h2 className="text-2xl md:text-3xl font-black text-white tracking-tight">Daughter <span className="text-gold">Churches</span></h2>
              <p className="text-gray-500 mt-2 text-sm max-w-md font-light">Spreading the word of God. Find a TMGAN congregation near you.</p>
           </motion.div>

           {/* Tabs */}
           <div className="flex space-x-2 md:space-x-4">
             {regions.map((region) => (
               <button
                 key={region.id}
                 onClick={() => setActiveRegion(region)}
                 className={`px-6 py-3 rounded-full font-bold transition-all duration-300 ${activeRegion.id === region.id ? 'bg-royal-purple text-white shadow-lg' : 'bg-white/5 text-gray-400 hover:text-white hover:bg-white/10'}`}
               >
                 {region.title}
               </button>
             ))}
           </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
           {/* Image Frame */}
           <div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl border border-white/10">
              <AnimatePresence mode="wait">
                <motion.img
                  key={activeRegion.id}
                  src={activeRegion.image}
                  alt={activeRegion.title}
                  loading="lazy"
                  initial={{ opacity: 0, scale: 1.1, rotate: 2 }}
                  animate={{ opacity: 1, scale: 1, rotate: 0 }}
                  exit={{ opacity: 0, scale: 0.9, rotate: -2 }}
                  transition={{ duration: 0.6 }}
                  className="absolute inset-0 w-full h-full object-cover"
                  style={{ willChange: "transform, opacity" }}
                />
              </AnimatePresence>
              <div className="absolute inset-0 bg-gradient-to-t from-background-dark/80 via-transparent to-transparent"></div>
           </div>

           {/* Church List */}
           <div className="flex flex-col justify-center">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeRegion.id}
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -30 }}
                  transition={{ duration: 0.4 }}
                  className="space-y-4"
                >
                  <h3 className="text-xl font-bold text-white mb-5 border-l-2 border-gold pl-3">{activeRegion.title} Region</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {activeRegion.churches.map((church, idx) => (
                      <motion.div 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 * idx }}
                        key={idx} 
                        className="bg-white/5 border border-white/10 p-4 rounded-xl hover:bg-white/10 hover:border-gold/50 cursor-pointer transition-colors group"
                      >
                         <h4 className="text-base font-bold text-gray-200 group-hover:text-gold transition-colors">{church}</h4>
                         <p className="text-sm text-gray-500 mt-2 font-light">Get Directions &rarr;</p>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              </AnimatePresence>
           </div>
        </div>

        {/* Contact Links */}
        <div id="contact" className="mt-12 pt-8 border-t border-white/10 text-center flex flex-col items-center">
           <h3 className="text-2xl font-bold text-white mb-6">Need to reach a specific department?</h3>
           <div className="flex flex-wrap justify-center gap-4">
             <a href="mailto:leadership@tmgan.org" className="px-6 py-3 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-colors">leadership@tmgan.org</a>
             <a href="mailto:membership@tmgan.org" className="px-6 py-3 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-colors">membership@tmgan.org</a>
             <a href="mailto:ministries@tmgan.org" className="px-6 py-3 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-colors">ministries@tmgan.org</a>
           </div>
        </div>
      </div>
    </section>
  );
});

DaughterChurchesSection.displayName = "DaughterChurchesSection";
