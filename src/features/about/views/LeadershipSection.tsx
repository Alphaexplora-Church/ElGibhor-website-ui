import React, { memo } from 'react';
import { motion } from 'framer-motion';

// Original data remains untouched
const leaders = [
  { name: "Pastor John Doe", role: "Senior Pastor", img: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=600&q=80" },
  { name: "Ptr. Jane Smith", role: "Executive Pastor", img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=600&q=80" },
  { name: "Ptr. Mark Johnson", role: "Worship Director", img: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=600&q=80" },
  { name: "Ptr. Sarah Davis", role: "Youth Pastor", img: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=600&q=80" },
  { name: "Ptr. Michael Brown", role: "Missions Director", img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=80" }
];

export const LeadershipSection: React.FC = memo(() => {
  // We reorder the array just for the visual layout to create the "Arch" 
  // Order: Youth(3) -> Exec(1) -> Senior(0) -> Worship(2) -> Missions(4)
  const displayLeaders = [leaders[3], leaders[1], leaders[0], leaders[2], leaders[4]];

  return (
    <section id="leaders" className="py-24 md:py-32 bg-[#F4EDFB] relative z-10 w-full overflow-hidden">

      {/* Cinematic Background Elements */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-white/60 rounded-full filter blur-[150px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto relative z-10">

        {/* Section Header */}
        <div className="mb-16 md:mb-20 px-6 text-center flex flex-col items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-4 mb-4"
          >
            <div className="h-px w-10 bg-gold/80"></div>
            <span className="text-gold-dark font-bold uppercase tracking-[0.3em] text-xs md:text-sm">Leadership</span>
            <div className="h-px w-10 bg-gold/80"></div>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-black text-royal-purple-dark tracking-tighter mb-6"
          >
            Our National <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold-dark to-gold italic pr-2">Team</span>
          </motion.h2>

          {/* NEW: Swipe to Explore Instruction (Mobile Only) */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="flex md:hidden justify-center items-center"
          >
            <span className="flex items-center gap-2 bg-white/80 backdrop-blur-sm border border-white px-5 py-2 rounded-full shadow-[0_4px_15px_rgba(0,0,0,0.03)] text-royal-purple-dark/70 font-bold uppercase tracking-widest text-[10px] md:text-xs">
              <svg className="w-4 h-4 text-gold-dark animate-[pulse_2s_ease-in-out_infinite]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
              </svg>
              - Swipe to explore -
            </span>
          </motion.div>

        </div>

        {/* The Editorial Fan Layout
          Mobile: Horizontal Snap Scroll 
          Desktop: Overlapping Arch (-space-x-8) 
        */}
        <div className="flex overflow-x-auto md:overflow-visible pb-16 pt-8 px-6 md:px-0 justify-start md:justify-center gap-6 md:gap-0 md:-space-x-8 lg:-space-x-12 snap-x snap-mandatory hide-scrollbar">
          {displayLeaders.map((leader, idx) => {
            // Generate the arch shape transforms for desktop
            let desktopTransform = "";
            let zIndex = "z-10";

            if (idx === 0) { desktopTransform = "md:translate-y-20 md:-rotate-6"; zIndex = "z-10"; }
            if (idx === 1) { desktopTransform = "md:translate-y-8 md:-rotate-3"; zIndex = "z-20"; }
            if (idx === 2) { desktopTransform = "md:translate-y-0 md:rotate-0 md:scale-105"; zIndex = "z-30"; }
            if (idx === 3) { desktopTransform = "md:translate-y-8 md:rotate-3"; zIndex = "z-20"; }
            if (idx === 4) { desktopTransform = "md:translate-y-20 md:rotate-6"; zIndex = "z-10"; }

            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                className={`relative flex-shrink-0 w-[260px] md:w-[240px] lg:w-[280px] aspect-[3/4] snap-center
                  bg-white p-3 lg:p-4 rounded-[2rem] shadow-[0_15px_35px_rgba(75,42,111,0.08)] border border-black/5
                  origin-bottom transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] group cursor-pointer
                  md:hover:!rotate-0 md:hover:!scale-110 md:hover:!-translate-y-12 md:hover:shadow-[0_30px_60px_rgba(75,42,111,0.2)] md:hover:z-50
                  ${desktopTransform}
                  ${zIndex}
                `}
              >
                <div className="w-full h-full flex flex-col">

                  {/* Photo Area */}
                  <div className="w-full flex-1 rounded-2xl overflow-hidden relative mb-4 bg-gray-100">
                    <img
                      src={leader.img}
                      alt={leader.name}
                      loading="lazy"
                      draggable={false}
                      className="w-full h-full object-cover filter md:grayscale-[40%] group-hover:grayscale-0 transition-all duration-500 scale-100 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-royal-purple/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>

                  {/* Editorial Text Area */}
                  <div className="text-center px-2 pb-2">
                    <h3 className="text-xl lg:text-2xl font-black text-royal-purple-dark tracking-tight group-hover:text-gold-dark transition-colors duration-300">
                      {leader.name}
                    </h3>
                    <p className="text-gray-400 group-hover:text-royal-purple/70 text-[10px] lg:text-xs font-bold uppercase tracking-widest mt-1 transition-colors duration-300">
                      {leader.role}
                    </p>
                  </div>

                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
});

LeadershipSection.displayName = "LeadershipSection";