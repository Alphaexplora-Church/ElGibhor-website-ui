// src/features/About/Manifesto.tsx

import React, { memo } from 'react';
import { motion } from 'framer-motion';

export const Manifesto: React.FC = memo(() => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } }
  };

  return (
    <section id="manifesto" className="relative py-24 md:py-32 bg-[#0C0515] overflow-hidden">
      {/* Background Image with Cinematic Fade */}
      <div className="absolute inset-0 z-0">
        <img
          src="/assets/about/header.jpg"
          alt="About Manifesto Background"
          className="w-full h-full object-cover mix-blend-luminosity opacity-40 scale-105"
        />
        {/* Changed to Royal Purple Gradients */}
        <div className="absolute inset-0 bg-gradient-to-r from-royal-purple-dark via-royal-purple-dark/90 to-royal-purple/20"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#0C0515] via-transparent to-[#0C0515]"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-center"
        >
          {/* Left Column: Huge Typography */}
          <motion.div variants={itemVariants} className="lg:col-span-5">
            <div className="flex items-center gap-4 mb-6">
              <div className="h-px w-10 bg-gold/50"></div>
              <span className="text-gold font-bold uppercase tracking-[0.3em] text-xs">Our Identity</span>
            </div>
            <h1 className="text-5xl md:text-7xl lg:text-[5.5rem] font-black text-white leading-[1.1] tracking-tighter drop-shadow-2xl">
              All for the <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold-light to-gold italic pr-2">Glory</span><br />
              of God.
            </h1>
          </motion.div>

          {/* Right Column: Bento Box Content */}
          <div className="lg:col-span-7 flex flex-col gap-6">

            {/* Main Manifesto Card */}
            <motion.div variants={itemVariants} className="bg-white/5 backdrop-blur-xl rounded-[2rem] p-8 md:p-12 shadow-[0_20px_50px_rgba(0,0,0,0.3)] border border-white/10 relative overflow-hidden group hover:border-white/20 transition-colors duration-500">
              <div className="absolute top-0 right-0 w-64 h-64 bg-royal-purple/20 rounded-full filter blur-[80px] -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>

              <h2 className="text-2xl md:text-3xl font-black text-white leading-snug mb-6 relative z-10 tracking-tight">
                A movement of devoted Christ-followers dedicated to guiding others in their faith journey.
              </h2>
              <p className="text-gray-400 font-light leading-relaxed md:text-lg relative z-10">
                At The Mighty God of All Nations Inc., we believe in walking life together. Whether you are spiritually seeking, looking for community, or seeking growth, you have a place here.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Tagline Card (High Contrast Gold) */}
              <motion.div variants={itemVariants} className="bg-gradient-to-br from-gold to-gold-dark rounded-[2rem] p-8 shadow-xl flex flex-col justify-center relative overflow-hidden group hover:scale-[1.02] transition-transform duration-500">
                <div className="absolute inset-0 bg-white/10 transform translate-y-full group-hover:translate-y-0 transition-transform duration-500"></div>
                <span className="text-royal-purple-dark/60 font-black uppercase tracking-widest text-[10px] mb-2 relative z-10">Our Tagline</span>
                <h3 className="text-3xl md:text-4xl font-black text-royal-purple-dark italic leading-tight relative z-10">
                  "Go and Make<br />Disciples."
                </h3>
              </motion.div>

              {/* Feature Pills */}
              <motion.div variants={itemVariants} className="flex flex-col justify-center bg-white/[0.02] border border-white/5 rounded-[2rem] p-8">
                <span className="text-gray-500 font-bold uppercase tracking-widest text-[10px] mb-4">Who We Serve</span>
                <div className="flex flex-wrap gap-2.5">
                  {[
                    { label: "Families", icon: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" },
                    { label: "Youth", icon: "M13 10V3L4 14h7v7l9-11h-7z" },
                    { label: "Seeking Individuals", icon: "M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" },
                    { label: "Growing Believers", icon: "M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" }
                  ].map((ft, i) => (
                    <div key={i} className="flex items-center gap-2 bg-white/5 border border-white/10 hover:border-gold/40 hover:bg-white/10 transition-colors rounded-full px-4 py-2 cursor-default">
                      <svg className="w-3.5 h-3.5 text-gold shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={ft.icon} />
                      </svg>
                      <span className="text-gray-300 font-medium text-xs md:text-sm tracking-tight">{ft.label}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>

          </div>
        </motion.div>
      </div>
    </section>
  );
});

Manifesto.displayName = "Manifesto";