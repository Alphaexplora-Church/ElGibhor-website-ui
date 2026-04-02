import React, { useState, useEffect, memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Mock hook for Live Status
const useLiveStatus = () => {
  const [isLive, setIsLive] = useState(false);
  const [timeLeft, setTimeLeft] = useState<{ d: number, h: number, m: number, s: number } | null>(null);

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date();
      const currentDay = now.getDay();
      const currentHour = now.getHours();
      const currentMinute = now.getMinutes();

      // Check if it's currently Sunday between 10:00AM - 11:30AM or 2:00PM - 3:30PM
      if (currentDay === 0 && ((currentHour === 10 || (currentHour === 11 && currentMinute <= 30)) || (currentHour === 14 || (currentHour === 15 && currentMinute <= 30)))) {
        setIsLive(true);
        setTimeLeft(null);
        return;
      }

      setIsLive(false);

      // Simple mock countdown to next Sunday 10am
      let daysUntilSunday = 0 - currentDay;
      if (daysUntilSunday <= 0) daysUntilSunday += 7;
      
      const nextSunday = new Date(now.getFullYear(), now.getMonth(), now.getDate() + daysUntilSunday, 10, 0, 0);
      const diff = nextSunday.getTime() - now.getTime();

      setTimeLeft({
        d: Math.floor(diff / (1000 * 60 * 60 * 24)),
        h: Math.floor((diff / (1000 * 60 * 60)) % 24),
        m: Math.floor((diff / 1000 / 60) % 60),
        s: Math.floor((diff / 1000) % 60)
      });
    };

    calculateTimeLeft();
    const interval = setInterval(calculateTimeLeft, 1000);
    return () => clearInterval(interval);
  }, []);

  return { isLive, timeLeft };
};

export const Watch: React.FC = memo(() => {
  const { isLive, timeLeft } = useLiveStatus();

  return (
    <div className="bg-background-dark min-h-screen pt-32 pb-24 relative flex items-center justify-center overflow-hidden">
      
      {/* Background Orbs */}
      <div className="absolute top-0 right-0 w-[50vw] h-[50vw] bg-royal-purple/20 rounded-full blur-[150px] pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-[50vw] h-[50vw] bg-gold/10 rounded-full blur-[150px] pointer-events-none"></div>

      <div className="max-w-6xl mx-auto px-6 w-full relative z-10 text-center flex flex-col items-center">
         
         <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-12">
            <span className="flex items-center justify-center space-x-2 text-sm font-bold uppercase tracking-widest text-[#FF0000] mb-4 bg-[#FF0000]/10 px-4 py-1.5 rounded-full w-fit mx-auto border border-[#FF0000]/20">
               <span className="relative flex h-3 w-3">
                 <span className={`animate-ping absolute inline-flex h-full w-full rounded-full bg-[#FF0000] opacity-75 ${!isLive && 'hidden'}`}></span>
                 <span className="relative inline-flex rounded-full h-3 w-3 bg-[#FF0000]"></span>
               </span>
               <span className="text-gray-200">{isLive ? 'Live Now' : 'Offline'}</span>
            </span>
            <h1 className="text-5xl md:text-6xl font-black text-white tracking-tighter">TMGAN <span className="text-royal-purple-light">Online</span></h1>
         </motion.div>

         <AnimatePresence mode="wait">
           {isLive ? (
             <motion.div
               key="player"
               initial={{ opacity: 0, scale: 0.95 }}
               animate={{ opacity: 1, scale: 1 }}
               exit={{ opacity: 0, scale: 0.9 }}
               className="w-full aspect-video bg-black rounded-3xl overflow-hidden shadow-2xl border border-white/10 relative"
             >
               <iframe 
                 width="100%" 
                 height="100%" 
                 src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1&mute=0" 
                 title="TMGAN Live Service" 
                 frameBorder="0" 
                 allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                 allowFullScreen
                 className="absolute inset-0 w-full h-full"
               ></iframe>
             </motion.div>
           ) : (
             <motion.div
               key="countdown"
               initial={{ opacity: 0, scale: 0.95 }}
               animate={{ opacity: 1, scale: 1 }}
               exit={{ opacity: 0, scale: 0.9 }}
               className="bg-background-card border border-white/10 rounded-3xl p-12 w-full max-w-4xl shadow-2xl"
             >
                <h2 className="text-2xl text-gray-300 font-light mb-12">Our next live broadcast begins in:</h2>
                
                <div className="flex justify-center gap-4 sm:gap-8 md:gap-12">
                  {[
                    { label: "Days", value: timeLeft?.d },
                    { label: "Hours", value: timeLeft?.h },
                    { label: "Minutes", value: timeLeft?.m },
                    { label: "Seconds", value: timeLeft?.s }
                  ].map((unit, idx) => (
                    <div key={idx} className="flex flex-col items-center">
                       <div className="w-20 h-24 sm:w-24 sm:h-32 md:w-32 md:h-40 bg-background-dark border border-white/5 rounded-2xl flex items-center justify-center shadow-inner relative overflow-hidden group">
                         <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent pointer-events-none"></div>
                         <div className="absolute inset-x-0 top-1/2 h-px bg-black border-b border-white/10 shadow-[0_2px_5px_rgba(0,0,0,0.5)] z-10 w-full"></div>
                         <span className="text-4xl sm:text-5xl md:text-7xl font-black text-white font-mono tracking-tighter drop-shadow-md z-0 leading-none">
                           {unit.value !== undefined ? String(unit.value).padStart(2, '0') : '00'}
                         </span>
                       </div>
                       <span className="mt-4 text-xs sm:text-sm font-bold text-gold uppercase tracking-widest">{unit.label}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-16 pt-8 border-t border-white/10">
                   <p className="text-gray-400 font-light mb-6">Service Times: Sunday @ 10:00 AM (English) and 2:00 PM (Tagalog)</p>
                   <button className="px-8 py-3 bg-white/5 rounded-xl border border-white/10 font-bold hover:bg-white/10 transition-colors">
                     Watch Previous Services
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
