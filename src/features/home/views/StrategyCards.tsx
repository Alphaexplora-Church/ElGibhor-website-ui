import React, { useState, memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const strategies = [
  {
    id: "01",
    title: "Know God",
    excerpt: "Experience a relationship with Jesus.",
    detail: "We believe that the journey starts here. Our weekend gatherings are focused on helping you know God and step into the incredible plan He has for your life.",
    action: "Plan a Visit"
  },
  {
    id: "02",
    title: "Find Freedom",
    excerpt: "Connect with others in groups.",
    detail: "True life change happens in the context of relationships. Join a Group to find a supportive community that will help you grow and overcome.",
    action: "Find a Group"
  },
  {
    id: "03",
    title: "Discover Purpose",
    excerpt: "Learn how you're uniquely designed.",
    detail: "You are a masterpiece, created with a specific purpose. Our Growth Track is designed to help you uncover your spiritual gifts and passions.",
    action: "Start Growth Track"
  },
  {
    id: "04",
    title: "Make a Difference",
    excerpt: "Use your gifts to serve others.",
    detail: "The ultimate goal of our faith is to spread His love. Join a serve team and make a lasting impact on our church and the surrounding community.",
    action: "Join a Team"
  }
];

// Nagdagdag tayo ng interface para tanggapin ang prop
interface StrategyCardsProps {
  onOpenVisitModal: () => void;
}

export const StrategyCards: React.FC<StrategyCardsProps> = memo(({ onOpenVisitModal }) => {
  const [activeCard, setActiveCard] = useState<number | null>(null);
  const navigate = useNavigate();

  const handleActionClick = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();

    switch (id) {
      case "01":
        // Step 1: Open the Plan Visit Modal
        onOpenVisitModal();
        break;
      case "02":
        // Step 2: Route to Ministries
        navigate('/experience#ministries');
        break;
      case "03":
        // Step 3: Route to the existing Contact Page
        navigate('/engage#contact');
        break;
      case "04":
        // Step 4: Route to the new Serve Page
        navigate('/engage#serve');
        break;
      default:
        break;
    }
  };

  return (
    <section className="py-24 bg-[#F4EDFB] relative z-10 w-full overflow-hidden">
      {/* Background Ambient Glows */}
      <div className="absolute top-0 right-0 w-[40rem] h-[40rem] bg-royal-purple/10 rounded-full filter blur-[150px] opacity-60 pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-[30rem] h-[30rem] bg-gold/10 rounded-full filter blur-[120px] opacity-50 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">

        {/* Section Header */}
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center justify-center gap-4 mb-4"
          >
            <div className="h-px w-8 bg-gold/50"></div>
            <span className="text-gold font-bold uppercase tracking-[0.3em] text-xs md:text-sm">Growth Track</span>
            <div className="h-px w-8 bg-gold/50"></div>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl font-black text-gray-900 tracking-tighter mb-6"
          >
            Your Next <span className="text-transparent bg-clip-text bg-gradient-to-r from-royal-purple to-royal-purple-dark italic pr-2">Steps</span>
          </motion.h2>

          {/* --- Dynamic Interaction Instructions --- */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="flex justify-center items-center text-royal-purple-dark/60 font-bold uppercase tracking-widest text-[10px]"
          >
            {/* Desktop Instruction */}
            <span className="hidden md:flex items-center gap-2 bg-royal-purple/5 px-4 py-1.5 rounded-full border border-royal-purple/10">
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" /></svg>
              Click to expand
            </span>
            {/* Mobile Instruction */}
            <span className="flex md:hidden items-center gap-2 bg-royal-purple/5 px-4 py-1.5 rounded-full border border-royal-purple/10">
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 11.5V14m0-2.5v-6a1.5 1.5 0 113 0m-3 6a1.5 1.5 0 00-3 0v2a7.5 7.5 0 0015 0v-5a1.5 1.5 0 00-3 0m-6-3V11m0-5.5v-1a1.5 1.5 0 013 0v1m0 0V11m0-5.5a1.5 1.5 0 013 0v3m0 0V11" /></svg>
              Tap to expand
            </span>
          </motion.div>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {strategies.map((strat, idx) => {
            const isActive = activeCard === idx;

            return (
              <motion.div
                key={strat.id}
                layout
                onClick={() => setActiveCard(isActive ? null : idx)}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className={`relative bg-white/70 backdrop-blur-xl border border-white overflow-hidden cursor-pointer group transition-all duration-500
                  ${isActive
                    ? 'rounded-[2.5rem] shadow-[0_20px_50px_rgba(75,42,111,0.15)] -translate-y-2 ring-2 ring-gold/30'
                    : 'rounded-[2rem] shadow-[0_8px_30px_rgba(0,0,0,0.04)] hover:shadow-[0_20px_40px_rgba(75,42,111,0.08)] hover:-translate-y-1'
                  }`}
              >
                {/* Massive Watermark Number */}
                <div className={`absolute -bottom-8 -right-6 text-[8rem] md:text-[10rem] font-black leading-none transition-all duration-700 pointer-events-none select-none
                  ${isActive ? 'text-royal-purple/[0.08] scale-110 -translate-y-4 -translate-x-4' : 'text-gray-900/[0.03] group-hover:scale-105 group-hover:text-royal-purple/[0.05]'}
                `}>
                  {strat.id}
                </div>

                <motion.div layout className="relative p-8 z-10 flex flex-col h-full">

                  {/* Step Pill */}
                  <motion.div layout className="self-start px-4 py-1.5 bg-royal-purple/5 border border-royal-purple/10 rounded-full mb-6">
                    <span className="text-royal-purple font-black text-xs uppercase tracking-widest">
                      Step {idx + 1}
                    </span>
                  </motion.div>

                  {/* Headers */}
                  <motion.h3 layout className="text-2xl font-black text-gray-900 mb-2 tracking-tight group-hover:text-royal-purple transition-colors duration-300">
                    {strat.title}
                  </motion.h3>

                  <motion.p layout className="text-gray-500 text-sm font-medium leading-relaxed">
                    {strat.excerpt}
                  </motion.p>

                  {/* Expandable Content */}
                  <AnimatePresence>
                    {isActive && (
                      <motion.div
                        initial={{ opacity: 0, height: 0, marginTop: 0 }}
                        animate={{ opacity: 1, height: "auto", marginTop: 24 }}
                        exit={{ opacity: 0, height: 0, marginTop: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="overflow-hidden"
                      >
                        <div className="pt-6 border-t border-gray-200/60">
                          <p className="text-gray-600 text-sm font-light leading-relaxed mb-6">
                            {strat.detail}
                          </p>
                          <button
                            onClick={(e) => handleActionClick(strat.id, e)}
                            className="w-full py-3.5 bg-gradient-to-r from-gold to-gold-light text-royal-purple-dark text-sm font-black tracking-wide rounded-xl shadow-[0_5px_15px_rgba(239,191,4,0.3)] hover:shadow-[0_8px_25px_rgba(239,191,4,0.4)] hover:scale-[1.02] active:scale-[0.98] transition-all duration-300"
                          >
                            {strat.action}
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                </motion.div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
});

StrategyCards.displayName = "StrategyCards";