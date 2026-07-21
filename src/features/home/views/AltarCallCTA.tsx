// src/features/home/views/AltarCallCTA.tsx
// Concept 1: "The Altar Call" — Split-Verse Editorial CTA

import React, { memo, useRef } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';

interface AltarCallCTAProps {
  onOpenVisitModal: () => void;
}

export const AltarCallCTA: React.FC<AltarCallCTAProps> = memo(({ onOpenVisitModal }) => {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  // Softer parallax for cross-device smooth scrolling (prevents extreme layout shifts on mobile)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const scriptureY = useTransform(scrollYProgress, [0, 1], [30, -30]);
  const scriptureOpacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.3, 1, 1, 0.3]);

  return (
    <section
      ref={sectionRef}
      className="relative bg-[#0C0515] overflow-hidden border-t border-white/5 w-full"
    >
      {/* === AMBIENT BACKGROUND ORBS === */}
      <div className="absolute top-1/2 left-1/2 lg:left-1/3 -translate-x-1/2 -translate-y-1/2 w-[24rem] sm:w-[50rem] h-[24rem] sm:h-[30rem] bg-royal-purple/10 rounded-full blur-[100px] sm:blur-[150px] pointer-events-none -z-10" />
      <div className="absolute bottom-0 right-0 w-[18rem] sm:w-[30rem] h-[18rem] sm:h-[20rem] bg-gold/5 rounded-full blur-[90px] sm:blur-[120px] pointer-events-none -z-10" />

      {/* Optimized responsive vertical paddings */}
      <div className="max-w-7xl mx-auto px-6 py-16 sm:py-24 lg:py-36 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 lg:gap-0 items-center min-h-[350px] lg:min-h-[400px]">

          {/* ═══════════════════════════════════════════════
              LEFT COLUMN — Scripture Verse (Decorative)
              ═══════════════════════════════════════════════ */}
          <motion.div
            style={{ y: scriptureY, opacity: scriptureOpacity }}
            className="lg:col-span-5 relative flex flex-col justify-center items-center lg:items-start w-full"
          >
            <div className="relative w-full">
              <blockquote className="relative z-10">
                {/* FIXED: Increased text opacity values from 15/[0.09] to 50/35 for crystal-clear legibility */}
                <p className="font-serif italic text-2xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-gold/90 leading-[1.2] lg:leading-[1.15] tracking-tight select-none text-center lg:text-left break-words">
                  "For I know
                  <br className="hidden sm:block" />
                  {' '}the plans
                  <br className="hidden sm:block" />
                  {' '}I have
                  <br className="hidden sm:block" />
                  {' '}for you"
                </p>

                {/* Verse reference */}
                <motion.cite
                  initial={{ opacity: 0, x: -10 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.8, duration: 0.6 }}
                  className="block mt-4 lg:mt-6 not-italic text-center lg:text-left"
                >
                  {/* FIXED: Bumped from text-gold/40 to text-gold/70 */}
                  <span className="text-gold font-sans text-[10px] sm:text-xs font-bold uppercase tracking-[0.3em]">
                    — Jeremiah 29:11
                  </span>
                </motion.cite>
              </blockquote>
            </div>
          </motion.div>

          {/* ═══════════════════════════════════════════════
              CENTER — Self-Drawing Gold Divider Line
              ═══════════════════════════════════════════════ */}
          <div className="hidden lg:flex lg:col-span-1 justify-center items-stretch relative self-stretch">
            <div className="relative w-px h-full flex items-center justify-center">
              <motion.div
                initial={{ scaleY: 0 }}
                animate={isInView ? { scaleY: 1 } : {}}
                transition={{ delay: 0.3, duration: 1, ease: [0.22, 1, 0.36, 1] }}
                className="w-px bg-gradient-to-b from-transparent via-gold/30 to-transparent origin-top h-[80%]"
              />

              {/* Center diamond ornament */}
              <motion.div
                initial={{ opacity: 0, scale: 0, rotate: 0 }}
                animate={isInView ? { opacity: 1, scale: 1, rotate: 45 } : {}}
                transition={{ delay: 0.8, duration: 0.4, ease: "backOut" }}
                className="absolute top-1/2 -translate-y-1/2 w-2 h-2 bg-gold/50 shadow-[0_0_12px_rgba(239,191,4,0.3)]"
              />
            </div>
          </div>

          {/* Mobile horizontal divider */}
          <div className="flex lg:hidden justify-center py-2 w-full">
            <motion.div
              initial={{ scaleX: 0 }}
              animate={isInView ? { scaleX: 1 } : {}}
              transition={{ delay: 0.3, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="h-px w-20 sm:w-24 bg-gradient-to-r from-transparent via-gold/30 to-transparent origin-center"
            />
          </div>

          {/* ═══════════════════════════════════════════════
              RIGHT COLUMN — CTA Content
              ═══════════════════════════════════════════════ */}
          <div className="lg:col-span-6 flex flex-col justify-center items-center lg:items-start text-center lg:text-left lg:pl-12 w-full">

            {/* Eyebrow Badge */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="flex items-center gap-3 mb-4 sm:mb-6"
            >
              <div className="h-px w-6 sm:w-8 bg-gold/40" />
              <span className="text-gold font-bold uppercase tracking-[0.3em] text-[10px] sm:text-xs">
                Your Invitation
              </span>
            </motion.div>

            {/* Main Headline */}
            <motion.h2
              initial={{ opacity: 0, y: 15 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.5, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="text-3xl sm:text-5xl md:text-6xl lg:text-[4rem] xl:text-[4.2rem] font-black text-white tracking-tighter leading-[1.15] lg:leading-[1.1] mb-4 sm:mb-6"
            >
              WE'LL SAVE{' '}
              <span className="italic text-transparent bg-clip-text bg-gradient-to-r from-gold-light to-gold normal-case tracking-normal pr-1">
                A SEAT
              </span>
              <br className="hidden sm:block" />
              {' '}FOR YOU.
            </motion.h2>

            {/* Body Copy */}
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.6, duration: 0.5 }}
              className="text-gray-400 text-sm sm:text-base md:text-lg font-light leading-relaxed max-w-md mb-8 sm:mb-10"
            >
              Let us know you're coming so we can welcome you properly,
              guide you across the campus, and help you feel right at home.
            </motion.p>

            {/* CTA Button */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.7, duration: 0.5 }}
              className="w-full sm:w-auto"
            >
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={onOpenVisitModal}
                className="group relative w-full sm:w-auto px-8 sm:px-12 py-4 sm:py-5 rounded-xl overflow-hidden"
              >
                {/* Resting state border */}
                <div className="absolute inset-0 rounded-xl border border-gold/30 group-hover:border-gold/60 transition-colors duration-500" />

                {/* Hover fill gradient */}
                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-royal-purple to-royal-purple-dark opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                {/* Outer glow on hover */}
                <div className="absolute -inset-1 rounded-2xl bg-gold/0 group-hover:bg-gold/5 blur-xl transition-all duration-700" />

                {/* Button text */}
                <span className="relative z-10 text-gold group-hover:text-white font-bold text-xs sm:text-sm uppercase tracking-[0.2em] transition-colors duration-300 flex items-center justify-center gap-3">
                  Schedule Your Visit
                  <svg
                    className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </span>
              </motion.button>
            </motion.div>

          </div>

        </div>
      </div>
    </section>
  );
});

AltarCallCTA.displayName = "AltarCallCTA";