import React, { memo } from 'react';
import { motion } from 'framer-motion';

export const Manifesto: React.FC = memo(() => {
  return (
    <section id="manifesto" className="relative min-h-[60vh] pt-24 pb-12 flex flex-col items-center justify-center z-10 w-full overflow-hidden">

      {/* Background Image & Purple Gradient Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="/assets/about/header.jpg"
          alt="About Manifesto Background"
          className="w-full h-full object-cover mix-blend-luminosity opacity-50"
        />
        {/* The gradient overlay ensuring proper contrast for the text */}
        <div className="absolute inset-0 bg-gradient-to-b from-background-dark via-royal-purple-dark/80 to-background-dark"></div>
      </div>

      <div className="max-w-5xl mx-auto px-6 relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="h-px w-12 bg-gold"></div>
            <span className="text-gold font-bold uppercase tracking-widest text-xs">Our Identity</span>
            <div className="h-px w-12 bg-gold"></div>
          </div>

          {/* Updated text to white for dark mode contrast */}
          <h1 className="text-5xl md:text-7xl font-black text-white leading-tight tracking-tight mb-16 drop-shadow-lg">
            All for the <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold-light to-gold italic">Glory</span> of God.
          </h1>

          {/* Updated from solid white to dark frosted glass */}
          <div className="bg-background-dark/40 backdrop-blur-xl rounded-[2rem] p-10 md:p-16 shadow-[0_10px_40px_rgba(0,0,0,0.3)] border border-white/10 max-w-4xl mx-auto relative group">
            <div className="text-gold text-3xl mb-4 flex justify-center">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 4L2 20H22L12 4Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <h2 className="text-2xl md:text-3xl font-black text-white leading-snug mb-4">
              A movement of devoted Christ-followers dedicated to guiding others in their faith journey.
            </h2>
            <p className="text-gray-300 font-light leading-relaxed max-w-2xl mx-auto">
              At The Mighty God of All Nations Inc., we believe in walking life together. Whether you are spiritually seeking, looking for community, or seeking growth, you have a place here.
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto items-stretch">
            {/* Tagline Card */}
            <div className="bg-gradient-to-br from-royal-purple-dark to-background-dark text-left p-10 rounded-[2rem] shadow-xl border border-white/5 flex flex-col justify-center">
              <span className="text-gold font-bold uppercase tracking-widest text-[10px] mb-3 block">Our Tagline</span>
              <h3 className="text-3xl md:text-4xl font-black text-white italic drop-shadow-md">
                "Go and Make<br />Disciples."
              </h3>
            </div>

            {/* Feature Mini Cards - Updated to dark glassmorphism */}
            <div className="grid grid-cols-2 gap-4">
              {[
                { label: "Families" },
                { label: "Youth" },
                { label: "Seeking Individuals" },
                { label: "Growing Believers" }
              ].map((ft, i) => (
                <div key={i} className="bg-white/5 backdrop-blur-md rounded-2xl p-6 shadow-sm border border-white/10 flex flex-col items-center justify-center text-center hover:bg-white/10 transition-colors">
                  <div className="w-8 h-8 rounded-full bg-gold/10 text-gold mb-3 flex items-center justify-center">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                  </div>
                  <span className="text-white font-bold text-sm tracking-tight">{ft.label}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
});

Manifesto.displayName = "Manifesto";