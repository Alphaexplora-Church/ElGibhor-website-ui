import React, { memo } from 'react';
import { motion } from 'framer-motion';

export const WelcomeVideo: React.FC = memo(() => {
  return (
    <section className="relative w-full z-10 py-16 md:py-28 overflow-hidden">
      {/* Background Gradients */}
      <div className="absolute inset-0 bg-background-dark pointer-events-none -z-10"></div>
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[radial-gradient(circle_at_center,rgba(75,42,111,0.15),transparent_70%)] pointer-events-none -z-10"></div>
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[radial-gradient(circle_at_center,rgba(239,191,4,0.05),transparent_70%)] pointer-events-none -z-10"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">

          {/* --- LEFT SIDE: Portrait Image --- */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-5 relative group"
          >
            {/* Decorative Gold Frame (Offset) */}
            <div className="absolute inset-0 border-2 border-gold/30 rounded-[2.5rem] translate-x-4 translate-y-4 md:translate-x-6 md:translate-y-6 -z-10 transition-transform duration-500 group-hover:translate-x-8 group-hover:translate-y-8"></div>

            {/* Main Image Container */}
            <div className="relative w-full aspect-[4/5] rounded-[2.5rem] overflow-hidden border border-white/10 shadow-2xl bg-white/5 backdrop-blur-sm">
              <img
                src="/assets/Photos/SamplePastor.jpg"
                alt="Church Leadership"
                loading="lazy"
                className="w-full h-full object-cover opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-[2s] ease-out filter grayscale-[20%] group-hover:grayscale-0"
              />
              {/* Subtle inner gradient so the image isn't too flat */}
              <div className="absolute inset-0 bg-gradient-to-t from-background-dark/80 via-transparent to-transparent"></div>
            </div>
          </motion.div>


          {/* --- RIGHT SIDE: The Letter --- */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-7 flex flex-col justify-center mt-8 lg:mt-0"
          >
            {/* Small Eyebrow Heading */}
            <div className="flex items-center gap-4 mb-6">
              <div className="h-px w-10 bg-gold"></div>
              <span className="text-gold font-bold uppercase tracking-[0.25em] text-xs md:text-sm">Welcome Home</span>
            </div>

            {/* Main Headline */}
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white tracking-tighter mb-8 leading-[1.1]">
              You truly <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold-light to-gold italic pr-2">belong</span> here.
            </h2>

            {/* The Letter Body */}
            <div className="space-y-6 text-gray-300 text-lg md:text-xl font-light leading-relaxed">
              <p>
                From the moment you connect with us, we want you to feel the embrace of a family. Whether you are taking your first steps in faith or looking for a place to grow deeper, <strong className="text-white font-bold">there is a seat waiting just for you.</strong>
              </p>
              <p>
                We are a community united by grace, driven by purpose, and passionate about seeing lives transformed. Here, you will find authentic friendships, powerful worship, and the encouragement you need for every season of life.
              </p>
              <blockquote className="border-l-4 border-gold pl-4 italic text-white/80 my-6">
                "Therefore welcome one another as Christ has welcomed you, for the glory of God." <br />
                <span className="text-sm font-bold text-gold-light not-italic mt-2 block">— Romans 15:7</span>
              </blockquote>
              <p>
                Come as you are. We can't wait to worship with you, grow with you, and do life together!
              </p>
            </div>

            {/* The Signature */}
            <div className="mt-12 pt-8 border-t border-white/10">
              <p className="text-gray-500 text-sm font-bold uppercase tracking-widest mb-2">With Love & Expectation,</p>
              {/* Using font-serif and italic to mimic a signature */}
              <p className="font-serif italic text-4xl text-gold-light tracking-wide">
                The TMGN Community
              </p>
            </div>

          </motion.div>
        </div>
      </div>
    </section>
  );
});

WelcomeVideo.displayName = "WelcomeVideo";