import React, { memo } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ServiceSchedule } from './ServiceSchedule';
import { Events } from './Events';
import { Ministry } from '../../ministries/views/Ministry';

const HeroExperience: React.FC = memo(() => {
  const { scrollYProgress } = useScroll();
  const yHeader = useTransform(scrollYProgress, [0, 1], [0, 250]);

  return (
    <section className="relative min-h-[50vh] flex items-center justify-center pt-24 overflow-hidden bg-background-dark">
      {/* Added bg-background-dark to ensure the section background is dark */}
      <div className="absolute inset-0 w-full h-full flex items-center justify-center overflow-hidden border-b border-border-dark">

        <motion.div style={{ y: yHeader }} className="absolute inset-0 opacity-20 mix-blend-luminosity">
          <img src="https://images.unsplash.com/photo-1438232992991-995b7058bbb3?w=1600&q=80" alt="Worship Background" className="w-full h-full object-cover" />
        </motion.div>

        {/* FIX 1: Changed from-transparent to from-background-dark/90 to fix the white glare at the top */}
        <div className="absolute inset-0 bg-gradient-to-b from-background-dark/90 via-background-dark/50 to-background-dark"></div>

        <div className="relative z-10 text-center px-6 mt-16">
          <motion.h1
            initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8 }}
            className="text-5xl md:text-7xl font-black text-white mb-6 uppercase tracking-tighter"
          >
            Discover our<br /><span className="text-gold"> community</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 0.3 }}
            className="text-gray-300 max-w-xl mx-auto text-lg font-light leading-relaxed"
          >
            Providing spiritual nourishment, care, and a dedicated community for every step of your faith journey.
          </motion.p>
        </div>
      </div >
    </section >
  );
});

HeroExperience.displayName = "HeroExperience";

export const Experience: React.FC = memo(() => {
  return (
    <div className="bg-background-light flex flex-col w-full relative z-10 overflow-hidden">
      {/* FIX 2: Changed bg-transparent to bg-background-dark to eliminate the white gap between components */}
      <HeroExperience />
      <ServiceSchedule />
      <Events />
      <Ministry />
    </div>
  );
});

Experience.displayName = "Experience";