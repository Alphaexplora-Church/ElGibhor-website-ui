import React, { useState, useEffect, memo } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';

export const Give: React.FC = memo(() => {
  const [activeModal, setActiveModal] = useState<string | null>(null);
  const [expandedCard, setExpandedCard] = useState<'church' | 'coffee'>('church');

  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 150]);
  const y2 = useTransform(scrollY, [0, 500], [0, -100]);

  useEffect(() => {
    if (activeModal) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [activeModal]);

  const cardVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.15, duration: 0.8, ease: [0.19, 1, 0.22, 1] },
    }),
  };

  return (
    <div className="bg-[#0C0515] min-h-screen flex flex-col w-full relative overflow-hidden">

      {/* Background Ambience */}
      <motion.div
        style={{ y: y1 }}
        className="absolute top-0 left-1/4 w-[35rem] h-[35rem] sm:w-[60rem] sm:h-[60rem] bg-royal-purple/15 rounded-full blur-[120px] sm:blur-[180px] pointer-events-none"
      />
      <motion.div
        style={{ y: y2 }}
        className="absolute bottom-0 right-0 w-[30rem] h-[30rem] sm:w-[50rem] sm:h-[50rem] bg-gold/10 rounded-full blur-[100px] sm:blur-[150px] pointer-events-none"
      />
      <div className="absolute top-1/2 left-0 w-[25rem] h-[25rem] sm:w-[40rem] sm:h-[40rem] bg-purple-600/5 rounded-full blur-[100px] pointer-events-none" />

      <section className="relative flex-grow z-10 px-4 sm:px-6 pt-32 sm:pt-40 md:pt-48 pb-24 sm:pb-32 md:pb-40">
        <div className="max-w-7xl mx-auto w-full">

          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.19, 1, 0.22, 1] }}
            className="text-center mb-16 sm:mb-24"
          >
            <div className="flex items-center justify-center gap-3 sm:gap-4 mb-6">
              <motion.div initial={{ width: 0 }} animate={{ width: 40 }} transition={{ delay: 0.5, duration: 0.8 }} className="h-px bg-gradient-to-r from-transparent to-gold" />
              <span className="text-gold font-black uppercase tracking-[0.3em] text-[10px] sm:text-xs">
                Worship Through Giving
              </span>
              <motion.div initial={{ width: 0 }} animate={{ width: 40 }} transition={{ delay: 0.5, duration: 0.8 }} className="h-px bg-gradient-to-l from-transparent to-gold" />
            </div>

            <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-[5.5rem] font-black text-white tracking-tighter mb-6 leading-[1.1]">
              Generosity{' '}
              <span className="relative inline-block italic text-transparent bg-clip-text bg-gradient-to-r from-gold to-gold-light">
                Changes
                <motion.div
                  className="absolute -bottom-1 left-0 right-0 h-[3px] bg-gradient-to-r from-transparent via-gold to-transparent"
                  initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ delay: 0.8, duration: 1 }}
                />
              </span>
              {' '}Everything.
            </h1>

            <motion.p
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }}
              className="text-gray-400 text-sm sm:text-base max-w-2xl mx-auto font-light"
            >
              Your seeds of generosity cultivate eternal impact. Choose how you'd like to sow today.
            </motion.p>
          </motion.div>

          {/* ───── INTERACTIVE ACCORDION LAYOUT ───── */}
          <div className="flex flex-col lg:flex-row gap-4 sm:gap-6 items-stretch min-h-[500px] lg:min-h-[650px]">

            {/* ── CARD 1: Support the Mission ── */}
            <motion.div
              custom={0} initial="hidden" animate="visible" variants={cardVariants}
              onMouseEnter={() => setExpandedCard('church')}
              onClick={() => setExpandedCard('church')}
              className={`relative group bg-[#11081f]/80 backdrop-blur-3xl border border-white/10 rounded-3xl overflow-hidden cursor-pointer transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] flex flex-col hover:border-gold/40
                ${expandedCard === 'church' ? 'lg:w-[70%]' : 'lg:w-[30%]'}
              `}
            >
              <div className="absolute -inset-[1px] bg-gradient-to-r from-gold/20 via-purple-500/20 to-gold/20 rounded-[3rem] blur-sm opacity-0 group-hover:opacity-100 transition-all duration-700" />

              <div className="relative h-full flex flex-col">
                <div className={`relative w-full overflow-hidden shrink-0 transition-all duration-700 ${expandedCard === 'church' ? 'h-40 sm:h-56 lg:h-64' : 'h-24 lg:h-40'}`}>
                  <img
                    src="/assets/Photos/church_mission.png" alt="Mission activities"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#11081f] via-[#11081f]/70 to-transparent" />
                </div>

                <div className={`relative p-6 sm:p-8 lg:p-10 pb-8 flex-grow flex flex-col transition-all duration-700 ${expandedCard === 'church' ? '-mt-12 lg:-mt-16' : 'mt-0'}`}>

                  <div className="flex items-center lg:items-start gap-4 lg:gap-0 lg:flex-col shrink-0">
                    <div className="relative w-12 h-12 lg:w-16 lg:h-16 shrink-0 lg:mb-6">
                      <div className="absolute inset-0 bg-gold/20 blur-xl rounded-full" />
                      <div className="relative w-full h-full bg-gradient-to-br from-gold to-gold-light rounded-xl flex items-center justify-center">
                        <svg className="w-6 h-6 lg:w-8 lg:h-8 text-royal-purple-dark" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                        </svg>
                      </div>
                    </div>
                    <div>
                      <h3 className="text-xl sm:text-2xl lg:text-4xl font-black text-white lg:mb-2 tracking-tight">
                        Support the Mission
                      </h3>
                      <div className={`hidden lg:flex items-center gap-2 transition-opacity duration-500 ${expandedCard === 'church' ? 'opacity-100' : 'opacity-0'}`}>
                        <div className="h-[2px] w-8 bg-gradient-to-r from-gold to-transparent" />
                        <p className="text-gold font-black uppercase tracking-[0.2em] text-[10px]">Direct to TMGAN Church</p>
                      </div>
                    </div>
                  </div>

                  <div className={`overflow-hidden transition-all duration-700 shrink-0 ${expandedCard === 'church' ? 'max-h-40 opacity-100 mt-4' : 'max-h-0 opacity-0 mt-0'}`}>
                    <p className="text-gray-300 font-light leading-relaxed text-xs sm:text-sm lg:text-base max-w-md">
                      Your tithes and offerings fuel our local ministries, community reach, and church operations. Every seed sown makes an eternal impact.
                    </p>
                  </div>

                  <div className="mt-auto pt-6 flex flex-col justify-end">
                    <motion.button
                      whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                      onClick={(e) => { e.stopPropagation(); setActiveModal("church"); }}
                      className="group/btn relative w-full sm:w-auto overflow-hidden rounded-2xl"
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-gold via-gold-light to-gold opacity-0 group-hover/btn:opacity-100 blur-xl transition-opacity duration-500" />
                      <div className="relative px-6 py-4 lg:px-10 lg:py-5 bg-gradient-to-r from-gold to-gold-light text-royal-purple-dark font-black uppercase tracking-widest text-xs lg:text-sm shadow-2xl flex items-center justify-center gap-3">
                        <span>Give to Church</span>
                        <svg className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                        </svg>
                      </div>
                    </motion.button>
                  </div>

                </div>
              </div>
            </motion.div>

            {/* ── CARD 2: Fuel the Tech Team ── */}
            <motion.div
              custom={1} initial="hidden" animate="visible" variants={cardVariants}
              onMouseEnter={() => setExpandedCard('coffee')}
              onClick={() => setExpandedCard('coffee')}
              className={`relative group bg-[#11081f]/80 backdrop-blur-3xl border border-white/10 rounded-3xl overflow-hidden cursor-pointer transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] flex flex-col hover:border-purple-500/40
                ${expandedCard === 'coffee' ? 'lg:w-[70%]' : 'lg:w-[30%]'}
              `}
            >
              <div className="absolute -inset-[1px] bg-gradient-to-r from-purple-500/20 via-gold/20 to-purple-500/20 rounded-[3rem] blur-sm opacity-0 group-hover:opacity-100 transition-all duration-700" />

              <div className="relative h-full flex flex-col">
                <div className={`relative w-full overflow-hidden shrink-0 transition-all duration-700 ${expandedCard === 'coffee' ? 'h-40 sm:h-56 lg:h-64' : 'h-24 lg:h-40'}`}>
                  <motion.img
                    whileHover={{ scale: 1.05 }} transition={{ duration: 0.7 }}
                    src="/assets/Photos/tech_team.png" alt="Tech team"
                    className="w-full h-full object-cover grayscale-[30%] group-hover:grayscale-0 transition-all duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#11081f] via-[#11081f]/80 to-transparent" />
                </div>

                <div className={`relative p-6 sm:p-8 lg:p-10 pb-8 flex-grow flex flex-col transition-all duration-700 ${expandedCard === 'coffee' ? '-mt-12 lg:-mt-16' : 'mt-0'}`}>

                  <div className="flex items-center lg:items-start gap-4 lg:gap-0 lg:flex-col shrink-0">
                    <div className="relative w-12 h-12 lg:w-16 lg:h-16 shrink-0 lg:mb-6">
                      <div className="absolute inset-0 bg-purple-500/20 blur-lg rounded-full" />
                      <div className="relative w-full h-full bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center">
                        <svg className="w-6 h-6 lg:w-8 lg:h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 8h1a4 4 0 014 4v1a4 4 0 01-4 4h-1 M2 8h16v9a4 4 0 01-4 4H6a4 4 0 01-4-4V8z M6 1v3 M10 1v3 M14 1v3" />
                        </svg>
                      </div>
                    </div>
                    <div>
                      <h3 className="text-xl sm:text-2xl lg:text-4xl font-black text-white lg:mb-2 tracking-tight whitespace-nowrap lg:whitespace-normal">
                        Fuel the Tech Team
                      </h3>
                      <div className={`hidden lg:flex items-center gap-2 transition-opacity duration-500 ${expandedCard === 'coffee' ? 'opacity-100' : 'opacity-0'}`}>
                        <div className="h-[2px] w-6 bg-gradient-to-r from-purple-500 to-transparent" />
                        <p className="text-purple-400 font-black uppercase tracking-[0.2em] text-[10px]">Buy us Coffee</p>
                      </div>
                    </div>
                  </div>

                  <div className={`overflow-hidden transition-all duration-700 shrink-0 ${expandedCard === 'coffee' ? 'max-h-40 opacity-100 mt-4' : 'max-h-0 opacity-0 mt-0'}`}>
                    <p className="text-gray-300 font-light leading-relaxed text-xs sm:text-sm lg:text-base max-w-md">
                      Support the developers and creators behind the TMGAN digital experience. Keep the servers running and the code flowing.
                    </p>
                  </div>

                  <div className="mt-auto pt-6 flex flex-col justify-end">
                    <motion.button
                      whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                      onClick={(e) => { e.stopPropagation(); setActiveModal("coffee"); }}
                      className="group/btn relative w-full sm:w-auto overflow-hidden rounded-2xl"
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-purple-600 opacity-0 group-hover/btn:opacity-100 blur-xl transition-opacity duration-500" />
                      <div className="relative px-6 py-4 lg:px-10 lg:py-5 bg-[#11081f] border border-purple-500/30 text-white font-black uppercase tracking-widest text-xs lg:text-sm flex items-center justify-center gap-3 transition-all group-hover/btn:bg-transparent">
                        <span>Support Tech Team</span>
                        <svg className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                        </svg>
                      </div>
                    </motion.button>
                  </div>

                </div>
              </div>
            </motion.div>

          </div>

          {/* ── Single Bottom Trust Badge ── */}
          <motion.div
            custom={2} initial="hidden" animate="visible" variants={cardVariants}
            className="flex justify-center mt-16 lg:mt-24"
          >
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-4 sm:p-6 hover:bg-white/10 transition-all duration-300 inline-flex items-center gap-4">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-green-500/10 flex items-center justify-center shrink-0">
                <svg className="w-5 h-5 sm:w-6 sm:h-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <div>
                <h4 className="text-white font-black text-sm sm:text-base pr-4">Bank-Grade Security</h4>
                <p className="text-gray-500 text-xs">256-bit encryption</p>
              </div>
            </div>
          </motion.div>

        </div>
      </section>

      {/* ── Fixed Overlay QR Modal ── */}
      <AnimatePresence>
        {activeModal && (
          <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setActiveModal(null)}
              className="absolute inset-0 bg-[#0C0515]/95 backdrop-blur-xl"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-xl bg-[#11081f] border border-white/10 rounded-[2rem] sm:rounded-[2.5rem] shadow-2xl overflow-y-auto max-h-[90vh]"
              style={{ msOverflowStyle: 'none', scrollbarWidth: 'none' }}
            >
              <button
                onClick={() => setActiveModal(null)}
                className="absolute top-4 right-4 sm:top-6 sm:right-6 z-50 w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center text-gray-400 hover:text-white transition-all"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              <div className="p-6 sm:p-8 md:p-12">
                <div className="text-center mb-8">
                  <h3 className="text-2xl sm:text-3xl font-black text-white mb-2">Complete Your Donation</h3>
                  <p className="text-gray-400 text-xs sm:text-sm">Scan the QR code using your banking or e-wallet app</p>
                </div>
                <div className="relative w-48 h-48 sm:w-56 sm:h-56 mx-auto bg-white p-4 rounded-3xl shadow-2xl mb-8 flex items-center justify-center">
                  <svg className="w-40 h-40 text-royal-purple-dark opacity-20" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M3 3h8v8H3V3zm2 2v4h4V5H5zm8-2h8v8h-8V3zm2 2v4h4V5h-4zM3 13h8v8H3v-8zm2 2v4h4v-4H5zm13-2h3v2h-3v-2zm-3 0h2v2h-2v-2zm3 3h3v2h-3v-2zm-3 0h2v2h-2v-2zm3 3h3v2h-3v-2zm-3 0h2v2h-2v-2z" />
                  </svg>
                  <span className="absolute text-[9px] font-black uppercase text-royal-purple-dark opacity-40 mt-2">Sample QR Code</span>
                </div>
                <div className="space-y-3 mb-8">
                  {[
                    { num: 1, text: "Screenshot or download this QR code to your gallery" },
                    { num: 2, text: "Open your banking app (BDO, BPI, GCash, etc.) and select 'Scan QR'" },
                    { num: 3, text: "Upload the screenshot and confirm the amount to finish" }
                  ].map((step) => (
                    <div key={step.num} className="flex gap-4 items-center bg-white/5 p-4 rounded-xl border border-white/5">
                      <div className="w-8 h-8 rounded-full bg-gold flex items-center justify-center text-royal-purple-dark font-black text-sm shrink-0">
                        {step.num}
                      </div>
                      <p className="text-gray-300 text-xs sm:text-sm">{step.text}</p>
                    </div>
                  ))}
                </div>
                <button onClick={() => setActiveModal(null)} className="w-full py-4 bg-white/10 text-white font-bold rounded-xl uppercase tracking-widest text-xs sm:text-sm hover:bg-white/20 transition-all">
                  Done
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
});

Give.displayName = "Give";