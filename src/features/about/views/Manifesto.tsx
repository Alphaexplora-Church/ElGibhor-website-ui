import React, { memo } from 'react';
import { motion } from 'framer-motion';

export const Manifesto: React.FC = memo(() => {
  return (
    <section id="manifesto" className="relative min-h-[60vh] pt-24 pb-12 flex flex-col items-center justify-center bg-transparent z-10 w-full">
      {/* Background Texture */}
      <div className="absolute inset-0 opacity-5 pointer-events-none" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[40vw] h-[40vw] bg-royal-purple/15 rounded-full filter blur-[120px] pointer-events-none"></div>

      <div className="max-w-5xl mx-auto px-6 relative z-10 text-center">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="h-px w-12 bg-gold"></div>
            <span className="text-gold-dark font-bold uppercase tracking-widest text-xs">Our Identity</span>
            <div className="h-px w-12 bg-gold"></div>
          </div>
          <h1 className="text-5xl md:text-7xl font-black text-royal-purple-dark leading-tight tracking-tight mb-16">
            All for the <span className="text-royal-purple-light italic">Glory</span> of God.
          </h1>

          <div className="bg-white rounded-[2rem] p-10 md:p-16 shadow-[0_10px_40px_rgba(0,0,0,0.05)] border border-black/5 max-w-4xl mx-auto relative group">
            <div className="text-gold-dark text-3xl mb-4 flex justify-center">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 4L2 20H22L12 4Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <h2 className="text-2xl md:text-3xl font-black text-royal-purple-dark leading-snug mb-4">
              A movement of devoted Christ-followers dedicated to guiding others in their faith journey.
            </h2>
            <p className="text-gray-500 font-light leading-relaxed max-w-2xl mx-auto">
              At The Mighty God of All Nations Inc., we believe in walking life together. Whether you are spiritually seeking, looking for community, or seeking growth, you have a place here.
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto items-stretch">
            {/* Tagline Card */}
            <div className="bg-royal-purple-dark text-left p-10 rounded-[2rem] shadow-xl flex flex-col justify-center">
              <span className="text-gold font-bold uppercase tracking-widest text-[10px] mb-3 block">Our Tagline</span>
              <h3 className="text-3xl md:text-4xl font-black text-white italic">
                "Go and Make<br/>Disciples."
              </h3>
            </div>
            
            {/* Feature Mini Cards */}
            <div className="grid grid-cols-2 gap-4">
              {[
                { label: "Families" },
                { label: "Youth" },
                { label: "Seeking Individuals" },
                { label: "Growing Believers" }
              ].map((ft, i) => (
                <div key={i} className="bg-white rounded-2xl p-6 shadow-sm border border-black/5 flex flex-col items-center justify-center text-center hover:shadow-md transition-shadow">
                  <div className="w-8 h-8 rounded-full bg-gold/10 text-gold mb-3 flex items-center justify-center">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7"/></svg>
                  </div>
                  <span className="text-royal-purple-dark font-bold text-sm tracking-tight">{ft.label}</span>
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
