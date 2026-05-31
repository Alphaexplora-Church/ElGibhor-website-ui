import React, { useState, useEffect, memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// ── Helpers ──────────────────────────────────────────────────────────────────
function getNextStream() {
  const now = new Date();
  const dayOfWeek = now.getDay(); // 0=Sun
  const daysUntilSunday = dayOfWeek === 0 ? 0 : 7 - dayOfWeek;
  const thisSunday = new Date(now);
  thisSunday.setDate(now.getDate() + daysUntilSunday);

  const taglish = new Date(thisSunday);
  taglish.setHours(9, 0, 0, 0);

  if (now < taglish) return { label: '9:00 AM — Taglish', target: taglish };

  // Passed — next Sunday Taglish
  const nextSunday = new Date(thisSunday);
  nextSunday.setDate(thisSunday.getDate() + 7);
  nextSunday.setHours(9, 0, 0, 0);
  return { label: '9:00 AM — Taglish', target: nextSunday };
}

function useCountdown(target: Date) {
  const [diff, setDiff] = useState(target.getTime() - Date.now());
  useEffect(() => {
    const id = setInterval(() => setDiff(target.getTime() - Date.now()), 1000);
    return () => clearInterval(id);
  }, [target]);
  const total = Math.max(0, diff);
  const d = Math.floor(total / 86400000);
  const h = Math.floor((total % 86400000) / 3600000);
  const m = Math.floor((total % 3600000) / 60000);
  const s = Math.floor((total % 60000) / 1000);
  return { d, h, m, s };
}

export const Watch: React.FC = memo(() => {
  const [isLive, setIsLive] = useState(false);

  // We are not using FACEBOOK_LIVE_URL variable anymore since the full iframe source is embedded directly below.

  const next = getNextStream();
  const { d, h, m, s } = useCountdown(next.target);

  // ── Check if currently within service hours ────────────────────────────
  useEffect(() => {
    const checkServiceTime = () => {
      const now = new Date();
      const dayOfWeek = now.getDay(); // 0=Sun
      const hours = now.getHours();
      const minutes = now.getMinutes();
      const currentTime = hours * 60 + minutes; // Convert to minutes

      // Service times (in minutes from midnight):
      // 9:00 AM = 540 minutes
      const taglish9am = 540;
      const buffer_before = 10;
      const buffer_after = 150;

      const withinTaglish = dayOfWeek === 0 && currentTime >= (taglish9am - buffer_before) && currentTime <= (taglish9am + buffer_after);

      setIsLive(withinTaglish);
    };

    checkServiceTime();
    const interval = setInterval(checkServiceTime, 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-background-dark min-h-screen pt-32 pb-24 relative flex items-center justify-center overflow-hidden">

      {/* Background Orbs */}
      <div className="absolute top-0 right-0 w-[50vw] h-[50vw] bg-royal-purple/20 rounded-full blur-[150px] pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-[50vw] h-[50vw] bg-gold/10 rounded-full blur-[150px] pointer-events-none"></div>

      <div className="max-w-5xl mx-auto px-6 w-full relative z-10">

        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-12 text-center">
          <span className="flex items-center justify-center space-x-2 text-sm font-bold uppercase tracking-widest text-[#FF0000] mb-4 bg-[#FF0000]/10 px-4 py-1.5 rounded-full w-fit mx-auto border border-[#FF0000]/20">
            <span className="relative flex h-3 w-3">
              <span className={`animate-ping absolute inline-flex h-full w-full rounded-full bg-[#FF0000] opacity-75 ${!isLive && 'hidden'}`}></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-[#FF0000]"></span>
            </span>
            <span className="text-gray-200">{isLive ? 'Live Now' : 'Offline'}</span>
          </span>
          <h1 className="text-5xl md:text-6xl font-black text-white tracking-tighter">TMGN <span className="text-royal-purple-light">Online</span></h1>
        </motion.div>

        <AnimatePresence mode="wait">
          {isLive ? (
            /* ── LIVE EMBED (FACEBOOK) ────────────────────────────────────── */
            <motion.div
              key="player"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="mb-12"
            >
              <div className="relative w-full rounded-3xl overflow-hidden bg-black/20 border border-white/10 shadow-2xl">
                <div className="aspect-video">
                  <iframe
                    src="https://www.facebook.com/plugins/video.php?height=314&href=https%3A%2F%2Fwww.facebook.com%2FTMGNcommunity%2Fvideos%2F1510912510828062%2F&show_text=false&width=560&t=0"
                    width="100%"
                    height="100%"
                    style={{ border: 'none', overflow: 'hidden' }}
                    scrolling="no"
                    frameBorder="0"
                    allowFullScreen={true}
                    allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                    className="w-full h-full"
                    title="Church Live Stream"
                  ></iframe>
                </div>
              </div>
            </motion.div>
          ) : (
            /* ── COUNTDOWN & OFFLINE UI ────────────────────────── */
            <motion.div
              key="countdown"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="w-full"
            >
              {/* Single Taglish Service Button */}
              <div className="flex justify-center mb-12">
                <div className="w-full max-w-md flex items-center justify-between px-6 py-4 rounded-2xl border border-white/10 bg-white/[0.03]">
                  <div>
                    <span className="font-sans text-[10px] uppercase tracking-[0.3em] text-gold font-bold block">Taglish</span>
                    <span className="text-2xl font-bold text-white">9:00 AM Service</span>
                  </div>
                  <div className="px-4 py-1.5 rounded-full border border-white/20 font-sans text-[10px] uppercase tracking-widest text-white/50 font-bold">
                    Upcoming
                  </div>
                </div>
              </div>

              {/* Countdown */}
              <div className="text-center mb-10">
                <p className="text-white/50 text-sm uppercase tracking-widest mb-6">
                  Next stream: <span className="text-gold">{next.label}</span>
                </p>
                <div className="flex items-center justify-center gap-4 md:gap-8">
                  {[
                    { val: d, label: 'Days' },
                    { val: h, label: 'Hours' },
                    { val: m, label: 'Min' },
                    { val: s, label: 'Sec' },
                  ].map(({ val, label }) => (
                    <div key={label} className="flex flex-col items-center">
                      <div className="w-20 h-24 sm:w-24 sm:h-32 md:w-32 md:h-40 bg-background-card border border-white/5 rounded-2xl flex items-center justify-center shadow-inner relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent pointer-events-none"></div>
                        <div className="absolute inset-x-0 top-1/2 h-px bg-black border-b border-white/10 shadow-[0_2px_5px_rgba(0,0,0,0.5)] z-10 w-full"></div>
                        <AnimatePresence mode="wait">
                          <motion.span
                            key={val}
                            initial={{ y: -10, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            exit={{ y: 10, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="text-4xl sm:text-5xl md:text-7xl font-black text-white font-mono tracking-tighter drop-shadow-md z-0 leading-none"
                          >
                            {String(val).padStart(2, '0')}
                          </motion.span>
                        </AnimatePresence>
                      </div>
                      <span className="mt-4 text-xs sm:text-sm font-bold text-gold uppercase tracking-widest">{label}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Watch Live button (inactive until live) */}
              <div className="flex justify-center mb-12">
                <button
                  disabled
                  className="px-12 py-4 rounded-full border border-white/20 text-white/40 font-sans text-[11px] uppercase tracking-[0.3em] font-bold cursor-not-allowed"
                >
                  Stream Starts Soon
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
});

Watch.displayName = "Watch";
