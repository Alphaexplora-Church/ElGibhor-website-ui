import React, { memo } from 'react';
import { motion } from 'framer-motion';

export const ServiceSchedule: React.FC = memo(() => {
  return (
    <section id="schedule" className="py-24 relative overflow-hidden bg-background-dark z-10 w-full">
      {/* Massive Glowing Orange Orb */}
      <motion.div
        animate={{ scale: [1, 1.05, 1], opacity: [0.1, 0.15, 0.1] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] bg-gold rounded-full filter blur-[150px] pointer-events-none"
        style={{ willChange: "transform, opacity" }}
      />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <h2 className="text-4xl md:text-5xl font-black text-white mb-16 text-center tracking-tight">Our <span className="text-gold">Rhythms</span></h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

          {/* Times Card */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-background-card/80 backdrop-blur-xl border border-white/10 rounded-3xl p-10 shadow-2xl relative overflow-hidden group"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-royal-purple/30 rounded-bl-[100px] pointer-events-none transition-transform group-hover:scale-110 duration-500"></div>
            <h3 className="text-3xl font-bold text-white mb-8 border-b border-white/10 pb-4">Service Time</h3>
            <div className="space-y-6">
              <div className="flex justify-between items-center bg-white/5 p-4 rounded-xl border-l-4 border-gold">
                <span className="text-xl font-bold text-white">SUNDAY</span>
                <span className="text-gold font-black text-xl tracking-wider">8:30 AM to 10:30 AM</span>
              </div>
            </div>
            <p className="mt-8 text-gray-400 font-light italic">Sunday Service is approximately two to three hours long.</p>
          </motion.div>

          {/* Location Card */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative rounded-3xl overflow-hidden shadow-2xl group border border-white/10 flex flex-col justify-end min-h-[400px]"
          >
            {/* The Image (Blur removed to let the multiply effect shine) */}
            <img
              src="/assets/Photos/Image.jpg"
              alt="Location"
              loading="lazy"
              className="absolute inset-0 w-full h-full object-cover transition-transform blur-xs duration-1000 group-hover:scale-110"
              style={{ willChange: "transform" }}
            />

            {/* NEW: Purple Multiply Tint Overlay */}
            <div className="absolute inset-0 bg-purple-800 mix-blend-multiply opacity-50 pointer-events-none transition-opacity duration-500 group-hover:opacity-30"></div>

            {/* Dark bottom gradient for text readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-background-dark via-background-dark/60 to-transparent"></div>

            <div className="relative z-10 p-10">
              <span className="bg-gold text-royal-purple text-xs font-black uppercase tracking-widest px-3 py-1 rounded-full mb-4 inline-block">Main Church</span>
              <h3 className="text-3xl font-bold text-white mb-2">
                Marikina City</h3>
              <p className="text-gray-300 mb-6 font-light">St. Mary Ave, Provident Village, Marikina City</p>

              <a href="https://maps.app.goo.gl/LGoT9RB46my7kYXbA" target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto px-8 py-3 bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 text-white font-bold rounded-xl transition-all shadow-lg hover:shadow-xl inline-block text-center">
                Get Directions
              </a>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
});

ServiceSchedule.displayName = "ServiceSchedule";