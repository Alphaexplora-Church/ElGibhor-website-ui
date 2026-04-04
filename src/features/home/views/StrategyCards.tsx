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
    <section className="py-16 bg-transparent relative z-10 w-full overflow-hidden">
      <div className="absolute top-0 right-0 w-[40rem] h-[40rem] bg-royal-purple-light rounded-full filter blur-[200px] opacity-[0.05] pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-black text-royal-purple-dark mb-10 text-center tracking-tight">
          Your Next <span className="text-gold">Steps</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {strategies.map((strat, idx) => (
            <motion.div 
              key={idx}
              layout
              onClick={() => setActiveCard(activeCard === idx ? null : idx)}
              initial={{ borderRadius: "1rem" }}
              className={`bg-white shadow-[0_4px_20px_rgba(0,0,0,0.03)] border cursor-pointer overflow-hidden transition-all ${activeCard === idx ? 'border-gold shadow-md' : 'border-black/5 hover:border-black/10 hover:shadow-md'}`}
            >
              <motion.div layout className="p-6 focus:outline-none">
                <motion.div layout className="w-9 h-9 bg-royal-purple-dark/5 rounded-full flex items-center justify-center mb-5 text-gold-dark font-bold text-sm">
                  {idx + 1}
                </motion.div>
                <motion.h3 layout className="text-lg font-bold text-royal-purple-dark mb-1.5 tracking-tight">{strat.title}</motion.h3>
                <motion.p layout className="text-gray-500 text-sm font-light leading-relaxed">{strat.excerpt}</motion.p>
                
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
                      <p className="mt-4 pt-4 border-t border-black/5 text-gray-600 text-sm leading-relaxed">
                        {strat.detail}
                      </p>
                      <button className="mt-6 w-full py-3 bg-gold text-royal-purple-dark font-bold rounded-lg transition-colors border border-transparent hover:bg-gold-light">
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
