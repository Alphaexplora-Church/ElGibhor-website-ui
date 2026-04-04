import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useMediaQuery } from '../../shared/hooks/useMediaQuery';
import { MagneticButton } from '../../shared/components/MagneticButton';

export const HeroSection: React.FC = () => {
  const { scrollY } = useScroll();
  const isMobile = useMediaQuery('(max-width: 768px)');
  // Micro-parallax: subtle move on mobile, stronger on desktop
  const yParallax = useTransform(scrollY, [0, 1000], [0, isMobile ? 50 : 250]);

  return (
    <section id="home" className="relative min-h-[100vh] flex items-center justify-center overflow-hidden pt-20">
      {/* Video Background with Parallax */}
      <motion.div 
        className="absolute inset-x-0 top-[0%] bottom-[-30%] bg-royal-purple-dark"
        style={{ y: yParallax }}
      >
        <video 
          autoPlay 
          loop 
          muted 
          playsInline 
          className="absolute inset-0 w-full h-full object-cover mix-blend-overlay opacity-80"
        >
          {/* A classy placeholder abstract background loop (or swap with actual worship video) */}
          <source src="https://cdn.pixabay.com/video/2019/11/17/29277-374636952_large.mp4" type="video/mp4" />
        </video>
        {/* Overlay gradient to ensure text readability and blend with the dark purple theme */}
        <div className="absolute inset-0 bg-gradient-to-b from-royal-purple-dark/60 via-background-dark/80 to-background-dark"></div>
      </motion.div>
      
      {/* Decorative Orbs for extra blend */}
      <div className="absolute top-1/4 left-1/4 w-[40rem] h-[40rem] bg-royal-purple rounded-full blur-[150px] opacity-40 animate-pulse-slow pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-1/4 w-[30rem] h-[30rem] bg-gold rounded-full blur-[150px] opacity-20 animate-pulse-slow pointer-events-none" style={{ animationDelay: '2s' }}></div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 flex flex-col items-center text-center">
        {/* Main Heading */}
        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-4xl sm:text-5xl md:text-7xl font-black tracking-tighter leading-[1.1] mb-6 drop-shadow-2xl text-white"
        >
          The Mighty God
          <br />
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-gold-light via-gold to-gold-dark">
            of All Nations
          </span>
        </motion.h1>

        {/* Tagline */}
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-4 text-lg md:text-2xl font-medium text-gray-200 italic drop-shadow-lg"
        >
          "Go and Make Disciples"
        </motion.p>

        {/* Primary CTA */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-8 flex flex-col sm:flex-row gap-4"
        >
          <MagneticButton to="/plan-a-visit" className="px-6 py-3 bg-gold text-royal-purple-dark rounded-full font-bold text-base hover:bg-gold-light hover:scale-105 transition-colors shadow-[0_0_20px_rgba(239,191,4,0.4)] flex items-center justify-center group w-full sm:w-auto">
            Plan a Visit
            <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform stroke-[3px]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
          </MagneticButton>
          <MagneticButton to="/ministries" className="px-6 py-3 bg-background-card/80 backdrop-blur-md border border-royal-purple text-white rounded-full font-bold text-base hover:border-gold/50 hover:bg-royal-purple-dark transition-colors flex items-center justify-center group shadow-md w-full sm:w-auto">
            Our Ministries
          </MagneticButton>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.5 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center animate-float"
      >
        <span className="text-xs text-gold font-bold uppercase tracking-widest mb-2">Scroll</span>
        <div className="w-[2px] h-12 bg-gradient-to-b from-gold to-transparent"></div>
      </motion.div>
    </section>
  );
};
