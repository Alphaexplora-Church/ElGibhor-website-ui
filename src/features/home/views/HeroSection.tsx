import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

export const HeroSection: React.FC = () => {
  return (
    <section id="home" className="relative min-h-[100vh] flex items-center justify-center overflow-hidden">
      {/* Video Background */}
      <div className="absolute inset-0 bg-[#FAFAFA]">
        <video 
          autoPlay 
          loop 
          muted 
          playsInline 
          className="absolute inset-0 w-full h-full object-cover mix-blend-overlay opacity-60"
        >
          <source src="https://cdn.pixabay.com/video/2019/11/17/29277-374636952_large.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-white/70 via-white/80 to-[#FAFAFA]"></div>
      </div>
      
      {/* Ambient orbs — subtle, not overpowering */}
      <div className="absolute top-1/3 left-1/3 w-[30rem] h-[30rem] bg-royal-purple rounded-full blur-[160px] opacity-25 animate-pulse-slow"></div>
      <div className="absolute bottom-1/3 right-1/3 w-[20rem] h-[20rem] bg-gold rounded-full blur-[160px] opacity-10 animate-pulse-slow" style={{ animationDelay: '3s' }}></div>

      <div className="relative z-10 max-w-3xl mx-auto px-6 flex flex-col items-center text-center">
        {/* Eyebrow label */}
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-gold-dark uppercase tracking-[0.3em] text-xs font-bold mb-6"
        >
          Welcome to TMGAN
        </motion.span>

        {/* Main Heading */}
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="text-4xl md:text-6xl font-black tracking-tight leading-[1.1] text-royal-purple-dark"
        >
          The Mighty God
          <br />
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-gold-dark via-gold to-gold-dark">
            of All Nations
          </span>
        </motion.h1>

        {/* Tagline */}
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-5 text-base md:text-lg text-gray-600 italic font-medium"
        >
          "Go and Make Disciples"
        </motion.p>

        {/* CTA Buttons */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-8 flex flex-col sm:flex-row gap-4"
        >
          <Link
            to="/ministries"
            className="px-8 py-3.5 bg-gold text-royal-purple-dark font-bold rounded-full shadow-lg hover:bg-gold-light transition-all duration-300 text-sm tracking-wide"
          >
            Explore Ministries
          </Link>
          <Link
            to="/connect"
            className="px-8 py-3.5 bg-white border border-gray-200 hover:bg-gray-50 text-royal-purple-dark font-semibold rounded-full shadow-sm transition-all duration-300 text-sm tracking-wide"
          >
            Service Schedule
          </Link>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-[10px] text-gray-400 font-bold uppercase tracking-[0.25em]">Scroll</span>
        <div className="w-px h-8 bg-gradient-to-b from-gray-300 to-transparent"></div>
      </motion.div>
    </section>
  );
};