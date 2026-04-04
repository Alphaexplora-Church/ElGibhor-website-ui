import React, { memo } from 'react';
import { motion } from 'framer-motion';
import { ServiceSchedule } from './ServiceSchedule';
import { Events } from './Events';
import { Ministry } from '../../ministries/views/Ministry';

const HeroExperience: React.FC = memo(() => (
  <section className="relative min-h-[50vh] flex items-center justify-center pt-24 overflow-hidden">
    <div className="absolute inset-0 mix-blend-overlay opacity-30 bg-gradient-to-br from-royal-purple/10 to-gold/20"></div>
    <motion.h1
      initial={{ opacity: 0, scale: 0.9, filter: "blur(10px)" }}
      animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
      transition={{ duration: 1, ease: "easeOut" }}
      className="text-[12vw] sm:text-[10vw] font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-royal-purple-dark to-royal-purple-light select-none z-10"
      style={{ willChange: "transform, opacity, filter" }}
    >
      experience
    </motion.h1>
  </section>
));
HeroExperience.displayName = "HeroExperience";

export const Experience: React.FC = memo(() => {
  return (
    <div className="bg-transparent flex flex-col w-full relative z-10 overflow-hidden">
      <HeroExperience />
      <ServiceSchedule />
      <Events />
      <Ministry />
    </div>
  );
});

Experience.displayName = "Experience";
