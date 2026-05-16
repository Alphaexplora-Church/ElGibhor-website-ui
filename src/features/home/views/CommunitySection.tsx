import React from 'react';
import { motion } from 'framer-motion';

const audiences = [
  { name: "Spiritually Seeking", color: "bg-royal-purple-light" },
  { name: "Families", color: "bg-gold text-black" },
  { name: "Youth", color: "bg-background-card border-2 border-gold text-white" },
  { name: "Existing Believers", color: "bg-white text-royal-purple-dark" }
];

export const CommunitySection: React.FC = () => {
  return (
    <section className="py-32 bg-background-dark relative z-10 w-full overflow-hidden">
      
      {/* Decorative floating elements */}
      {[...Array(5)].map((_, i) => (
         <motion.div
           key={i}
           className="absolute rounded-full pointer-events-none mix-blend-screen opacity-10"
           style={{
             width: Math.random() * 200 + 50 + 'px',
             height: Math.random() * 200 + 50 + 'px',
             background: i % 2 === 0 ? 'var(--color-gold)' : 'var(--color-royal-purple-light)',
             top: Math.random() * 100 + '%',
             left: Math.random() * 100 + '%',
           }}
           animate={{
             y: [0, Math.random() * 100 - 50, 0],
             x: [0, Math.random() * 100 - 50, 0],
             scale: [1, Math.random() * 0.5 + 1, 1]
           }}
           transition={{
             duration: Math.random() * 10 + 10,
             repeat: Infinity,
             ease: "easeInOut"
           }}
         />
      ))}

      <div className="max-w-7xl mx-auto px-6 relative z-10 text-center flex flex-col items-center">
        <motion.h2 
           initial={{ opacity: 0, y: 30 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           transition={{ duration: 0.8 }}
           className="text-4xl md:text-5xl font-black text-white tracking-tight mb-6"
        >
          A Place For <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold-light to-gold">Everyone</span>
        </motion.h2>
        
        <motion.p 
           initial={{ opacity: 0 }}
           whileInView={{ opacity: 1 }}
           viewport={{ once: true }}
           transition={{ duration: 0.8, delay: 0.2 }}
           className="text-xl text-gray-400 max-w-2xl font-light mb-16"
        >
          No matter where you are on your walk with God, you belong here.
        </motion.p>

        <div className="flex flex-wrap justify-center gap-4 md:gap-8 max-w-4xl mx-auto">
          {audiences.map((audience, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              whileHover={{ 
                scale: 1.1, 
                rotate: idx % 2 === 0 ? 2 : -2,
                boxShadow: "0 0 40px rgba(239, 191, 4, 0.3)" 
              }}
              viewport={{ once: true }}
              transition={{ 
                duration: 0.5, 
                delay: idx * 0.1,
                type: "spring",
                stiffness: 200
              }}
              className={`px-8 py-5 rounded-full text-lg md:text-2xl font-bold cursor-pointer ${audience.color} transition-all`}
            >
              {audience.name}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
