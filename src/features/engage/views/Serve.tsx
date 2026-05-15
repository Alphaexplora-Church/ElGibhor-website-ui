import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';

const volunteerTeams = [
  {
    id: 'guest-experience',
    title: 'Guest Experience',
    description: 'Create a welcoming atmosphere from the parking lot to the sanctuary. Help guests feel like family the moment they arrive.',
    image: 'assets/Photos/Image1.jpg',
  },
  {
    id: 'radiance-youth',
    title: 'Radiance Youth & Kids',
    description: 'Invest in the next generation. Lead, teach, and create safe, fun environments for children and youth to encounter God.',
    image: 'assets/Photos/SampleImg1.jpg',
  },
  {
    id: 'worship-production',
    title: 'Worship & Production',
    description: 'Use your musical talents or technical skills in audio, lighting, and video to create distraction-free environments for worship.',
    image: 'assets/Photos/Image5.png',
  },
  {
    id: 'creative-media',
    title: 'Creative Media',
    description: 'Capture moments and tell stories through photography, videography, and social media to share the love of Christ online.',
    image: 'assets/Photos/Image3.jpg',
  }
];

export const Serve: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const autoplayTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Function to start the autoplay timer
  const startAutoplay = useCallback(() => {
    // Clear any existing timer first to prevent duplication
    if (autoplayTimerRef.current) clearInterval(autoplayTimerRef.current);

    autoplayTimerRef.current = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % volunteerTeams.length);
    }, 5000); // CHANGED TO 10 SECONDS
  }, []);

  // Function to reset autoplay on manual interaction
  const resetAutoplay = useCallback(() => {
    startAutoplay();
  }, [startAutoplay]);

  // Handle auto-play setup and cleanup
  useEffect(() => {
    startAutoplay();
    // Cleanup timer on component unmount
    return () => {
      if (autoplayTimerRef.current) clearInterval(autoplayTimerRef.current);
    };
  }, [startAutoplay]);

  // Navigation Handlers with Autoplay Reset
  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % volunteerTeams.length);
    resetAutoplay(); // Stop jumps by resetting timer
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + volunteerTeams.length) % volunteerTeams.length);
    resetAutoplay(); // Stop jumps by resetting timer
  };

  return (
    <section id="serve" className="pt-24 pb-0 bg-[#0C0515] relative overflow-hidden text-white min-h-screen flex flex-col justify-between">
      {/* Cinematic Ambient Background */}
      <div className="absolute top-[-10%] right-[-5%] w-[40rem] h-[40rem] bg-royal-purple/20 rounded-full filter blur-[150px] opacity-70 pointer-events-none"></div>

      {/* Header Section (Constrained Width) */}
      <div className="max-w-7xl mx-auto px-6 relative z-10 w-full mb-12 shrink-0">
        <div className="text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center justify-center gap-4 mb-6"
          >
            <div className="h-px w-12 bg-gold/50"></div>
            <span className="text-gold font-bold uppercase tracking-[0.3em] text-xs md:text-sm">
              Join the Movement
            </span>
            <div className="h-px w-12 bg-gold/50"></div>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-7xl font-black tracking-tighter mb-6 leading-tight"
          >
            Make a <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold to-gold-light italic pr-2">Difference</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-gray-400 max-w-2xl mx-auto text-lg md:text-xl font-light leading-relaxed mb-6"
          >
            God has equipped you with unique gifts and passions. Discover your purpose by serving others and building the Kingdom together.
          </motion.p>
        </div>
      </div>

      {/* Edge-to-Edge Carousel Section */}
      <div className="relative w-full z-20 flex-grow h-[60vh] min-h-[500px] lg:h-[70vh] overflow-hidden">

        {volunteerTeams.map((team, idx) => (
          <motion.div
            key={team.id}
            // ───── DRAMATIC FADE IN logic ─────
            className="absolute inset-0 w-full h-full group"
            animate={{ opacity: idx === currentIndex ? 1 : 0 }}
            transition={{ duration: 1, ease: [0.4, 0, 0.2, 1] }}
            style={{ pointerEvents: idx === currentIndex ? 'auto' : 'none' }}
          >
            {/* Full-width Background Image */}
            <div className="absolute inset-0 z-0">
              <img
                src={team.image}
                alt={team.title}
                // CHANGED: duration-[10s] keeps the zoom going for the full 10 seconds
                className={`w-full h-full object-cover object-center transition-transform duration-[10s] ease-out ${currentIndex === idx ? 'scale-105' : 'scale-100'} opacity-80`}
              />
              {/* Cinematic Vignette Overlay */}
              <div className="absolute inset-0 bg-[#0C0515]/30 mix-blend-multiply transition-colors duration-700"></div>
              <div className="absolute inset-0 bg-gradient-to-t from-[#0C0515] via-[#0C0515]/60 to-transparent"></div>
              {/* Side Gradients for blending under the buttons */}
              <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-[#0C0515]/80 to-transparent"></div>
              <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-[#0C0515]/80 to-transparent"></div>
            </div>

            {/* Text & Button Overlay (Constrained to Center) */}
            <div className="absolute inset-0 z-10 flex flex-col justify-end pb-16 sm:pb-20 md:pb-24">
              <div className="max-w-7xl mx-auto w-full px-16 md:px-20 flex flex-col md:flex-row md:items-end justify-between gap-6 sm:gap-8">

                {/* Left Content Area */}
                <motion.div
                  className="max-w-2xl transform translate-y-4 group-hover:translate-y-0 transition-transform duration-700 ease-out"
                  animate={{ opacity: idx === currentIndex ? 1 : 0 }}
                  transition={{ delay: idx === currentIndex ? 0.3 : 0, duration: 0.6 }}
                >
                  <h3 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white mb-3 sm:mb-4 tracking-tight drop-shadow-xl">
                    {team.title}
                  </h3>
                  <p className="text-gray-300 font-light leading-relaxed text-sm sm:text-base md:text-lg max-w-lg drop-shadow-md">
                    {team.description}
                  </p>
                </motion.div>

                {/* Right Button Area */}
                <motion.div
                  className="shrink-0 pb-2"
                  animate={{ opacity: idx === currentIndex ? 1 : 0 }}
                  transition={{ delay: idx === currentIndex ? 0.5 : 0, duration: 0.6 }}
                >
                  <button
                    onClick={() => window.open(`https://m.me/TMGANcommunity?ref=${team.id}`, '_blank')}
                    className="inline-flex items-center justify-center w-full md:w-auto px-8 sm:px-10 py-4 bg-gradient-to-r from-gold to-gold-light text-royal-purple-dark font-black text-xs sm:text-sm uppercase tracking-[0.2em] rounded-full shadow-[0_10px_30px_rgba(239,191,4,0.2)] hover:shadow-[0_10px_40px_rgba(239,191,4,0.4)] hover:-translate-y-1 active:scale-95 transition-all duration-300"
                  >
                    Join Team
                  </button>
                </motion.div>

              </div>
            </div>
          </motion.div>
        ))}

        {/* ───── Interactive Navigation Overlays ───── */}

        {/* Navigation Buttons */}
        <button
          onClick={prevSlide}
          className="absolute left-2 sm:left-8 top-1/2 -translate-y-1/2 z-30 w-9 h-9 sm:w-14 sm:h-14 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-white/20 hover:scale-110 active:scale-95 transition-all duration-300 group"
        >
          <svg className="w-4 h-4 sm:w-7 sm:h-7 transform group-hover:-translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        <button
          onClick={nextSlide}
          className="absolute right-2 sm:right-8 top-1/2 -translate-y-1/2 z-30 w-9 h-9 sm:w-14 sm:h-14 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-white/20 hover:scale-110 active:scale-95 transition-all duration-300 group"
        >
          <svg className="w-4 h-4 sm:w-7 sm:h-7 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>

        {/* Bottom Pagination Dots */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 flex gap-3">
          {volunteerTeams.map((_, idx) => (
            <button
              key={idx}
              onClick={() => {
                setCurrentIndex(idx);
                resetAutoplay();
              }}
              className={`transition-all duration-500 rounded-full ${currentIndex === idx
                ? 'w-8 h-2 bg-gold shadow-[0_0_10px_rgba(239,191,4,0.8)]'
                : 'w-2 h-2 bg-white/30 hover:bg-white/50'
                }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};