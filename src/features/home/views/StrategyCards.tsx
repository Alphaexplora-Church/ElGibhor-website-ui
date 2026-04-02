import React, { useState, memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const strategies = [
  { title: "Know God", excerpt: "Experience a relationship with Jesus.", detail: "We believe that the journey starts here. Our weekend gatherings are focused on helping you know God and step into the incredible plan He has for your life.", action: "Plan a Visit" },
  { title: "Find Freedom", excerpt: "Connect with others in groups.", detail: "True life change happens in the context of relationships. Join a Group to find a supportive community that will help you grow and overcome.", action: "Find a Group" },
  { title: "Discover Purpose", excerpt: "Learn how you're uniquely designed.", detail: "You are a masterpiece, created with a specific purpose. Our Growth Track is designed to help you uncover your spiritual gifts and passions.", action: "Start Growth Track" },
  { title: "Make a Difference", excerpt: "Use your gifts to serve others.", detail: "The ultimate goal of our faith is to spread His love. Join a serve team and make a lasting impact on our church and the surrounding community.", action: "Join a Team" }
];

export const StrategyCards: React.FC = memo(() => {
  const [activeCard, setActiveCard] = useState<number | null>(null);

  return (
    <section className="py-24 bg-background-card relative z-10 w-full overflow-hidden">
      <div className="absolute top-0 right-0 w-[40rem] h-[40rem] bg-gold rounded-full filter blur-[200px] opacity-[0.03] pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-4xl md:text-5xl font-black text-white mb-16 text-center tracking-tight">
          Your Next <span className="text-gold">Steps</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {strategies.map((strat, idx) => (
            <motion.div 
              key={idx}
              layout
              onClick={() => setActiveCard(activeCard === idx ? null : idx)}
              initial={{ borderRadius: "1.5rem" }}
              className={`bg-background-dark border border-white/5 cursor-pointer overflow-hidden backdrop-blur-xl transition-colors hover:border-royal-purple/50 ${activeCard === idx ? 'ring-2 ring-gold/50' : ''}`}
            >
              <motion.div layout className="p-8 focus:outline-none">
                <motion.div layout className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center mb-6 text-gold font-bold text-xl">
                  {idx + 1}
                </motion.div>
                <motion.h3 layout className="text-2xl font-bold text-white mb-2 tracking-tight">{strat.title}</motion.h3>
                <motion.p layout className="text-gray-400 font-light leading-relaxed">{strat.excerpt}</motion.p>
                
                {/* Expandable Content */}
                <AnimatePresence>
                  {activeCard === idx && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <p className="mt-4 pt-4 border-t border-white/10 text-gray-300 text-sm leading-relaxed">
                        {strat.detail}
                      </p>
                      <button className="mt-6 w-full py-3 bg-gold/10 hover:bg-gold/20 text-gold font-bold rounded-lg transition-colors border border-gold/20">
                        {strat.action}
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
});

StrategyCards.displayName = "StrategyCards";
