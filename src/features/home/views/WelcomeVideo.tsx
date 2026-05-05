import React, { useState, memo } from 'react';
import { motion } from 'framer-motion';

export const WelcomeVideo: React.FC = memo(() => {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <section className="relative w-full z-10 py-16 md:py-24">
      {/* Removed overflow-x-hidden as it conflicts with Lenis smooth scrolling */}

      {/* New Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-royal-purple-dark/70 via-background-dark/90 to-background-dark pointer-events-none -z-10"></div>

      <div className="max-w-6xl mx-auto px-6 relative z-10">

        {/* Header Context */}
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center justify-center gap-4 mb-4"
          >
            <div className="h-px w-12 bg-gold/50"></div>
            <span className="text-gold font-bold uppercase tracking-[0.3em] text-sm">Welcome Home</span>
            <div className="h-px w-12 bg-gold/50"></div>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-4xl md:text-6xl font-black text-white tracking-tighter mb-6"
          >
            A Place for <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold-light to-gold italic pr-2">Everyone</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="text-gray-300 max-w-2xl mx-auto text-lg md:text-xl font-light leading-relaxed"
          >
            We're so glad you're here. Watch this brief message from our leadership team to learn more about our heart, our vision, and how you can get connected.
          </motion.p>
        </div>

        {/* Video Container */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="relative w-full aspect-video rounded-3xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.5)] group cursor-pointer border border-white/10"
          onClick={() => setIsPlaying(true)}
          style={{ willChange: "transform, opacity" }}
        >
          {!isPlaying ? (
            <>
              <img
                src="https://images.unsplash.com/photo-1543722530-d2c3201371e7?w=1600&q=80"
                alt="Senior Pastor Welcome"
                loading="lazy"
                className="w-full h-full object-cover opacity-70 group-hover:opacity-100 group-hover:scale-105 transition-all duration-[1.5s] ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background-dark/90 via-background-dark/20 to-transparent"></div>

              {/* Perfectly Centered Play Button */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 bg-gold/90 backdrop-blur-md rounded-full flex items-center justify-center group-hover:scale-110 group-hover:bg-gold transition-all duration-300 shadow-[0_0_30px_rgba(239,191,4,0.4)]">
                  <svg className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 text-royal-purple-dark translate-x-0.5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
              </div>

              {/* Bottom Text Overlay */}
              <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-6 md:bottom-8 md:left-8 md:right-8 flex flex-col sm:flex-row justify-between items-start sm:items-end gap-3 sm:gap-4">
                <div>
                  <h3 className="text-xl sm:text-3xl md:text-4xl font-black text-white drop-shadow-lg tracking-tight mb-1 md:mb-2 leading-tight">Welcome to TMGAN</h3>
                  <p className="text-gold-light font-medium tracking-wide text-xs sm:text-sm md:text-base">A message from our leadership team</p>
                </div>
                <div className="hidden sm:flex px-3 py-1.5 md:px-4 md:py-2 bg-black/50 backdrop-blur-md rounded-lg border border-white/10 text-white text-xs md:text-sm font-bold items-center gap-1.5 md:gap-2">
                  <svg className="w-3 h-3 md:w-4 md:h-4 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                  Watch Video
                </div>
              </div>
            </>
          ) : (
            <iframe
              width="100%"
              height="100%"
              src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1&mute=0"
              title="Welcome Video"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="absolute inset-0 w-full h-full"
            ></iframe>
          )}
        </motion.div>
      </div>
    </section>
  );
});

WelcomeVideo.displayName = "WelcomeVideo";