import type { FC } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

export const HeroSection: React.FC = () => {
  return (
    <section id="home" className="relative min-h-[100vh] flex items-center justify-center overflow-hidden pt-20">
      {/* Video Background */}
      <div className="absolute inset-0 bg-royal-purple-dark">
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
      </div>

      {/* Decorative Orbs for extra blend */}
      <div className="absolute top-1/4 left-1/4 w-[40rem] h-[40rem] bg-royal-purple rounded-full blur-[150px] opacity-40 animate-pulse-slow"></div>
      <div className="absolute bottom-1/4 right-1/4 w-[30rem] h-[30rem] bg-gold rounded-full blur-[150px] opacity-10 animate-pulse-slow" style={{ animationDelay: '4s' }}></div>
      <div className="relative z-10 max-w-7xl mx-auto px-6 flex flex-col items-center text-center">
        {/* Main Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-5xl md:text-7xl font-black tracking-tighter leading-[1.1] mb-6 drop-shadow-2xl text-white"
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

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-12 flex flex-col sm:flex-row gap-6 justify-center"
        >
          <Link
            to="/experience#ministries"
            className="px-10 py-4 bg-gradient-to-r from-gold to-gold-light hover:from-gold-light hover:to-gold text-royal-purple font-bold rounded-full shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
          >
            Explore Ministries
          </Link>
          <Link
            to="/connect"
            className="px-10 py-4 bg-white/10 border border-white/20 hover:bg-white/20 text-white font-bold rounded-full shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 backdrop-blur-md"
          >
            Service Schedule
          </Link>
        </motion.div>
      </div>
    </section>
  );
};