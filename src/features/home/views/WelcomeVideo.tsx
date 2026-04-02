import React, { useState, memo } from 'react';
import { motion } from 'framer-motion';

export const WelcomeVideo: React.FC = memo(() => {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <section className="relative w-full z-10 bg-background-dark py-12">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative w-full aspect-video rounded-3xl overflow-hidden shadow-[0_0_50px_rgba(75,42,111,0.3)] bg-gray-900 group cursor-pointer border border-white/10"
          onClick={() => setIsPlaying(true)}
          style={{ willChange: "transform, opacity" }}
        >
          {!isPlaying ? (
            <>
              <img 
                src="https://images.unsplash.com/photo-1543722530-d2c3201371e7?w=1600&q=80" 
                alt="Senior Pastor Welcome" 
                loading="lazy"
                className="w-full h-full object-cover opacity-70 group-hover:opacity-90 group-hover:scale-105 transition-all duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background-dark via-transparent to-transparent"></div>
              
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-20 h-20 bg-gold/90 backdrop-blur-md rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-[0_0_30px_rgba(239,191,4,0.5)]">
                  <svg className="w-8 h-8 text-royal-purple ml-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>

              <div className="absolute bottom-10 left-10">
                <h3 className="text-3xl font-bold text-white drop-shadow-lg tracking-tight mb-2">Welcome to TMGAN</h3>
                <p className="text-gray-200 font-medium">A message from our leadership team</p>
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
