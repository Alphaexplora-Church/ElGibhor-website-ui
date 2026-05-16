import React, { useState, useRef, useEffect, memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Prayer {
  id: string;
  name?: string;
  text: string;
  x: number;
  y: number;
  rotate: number;
  color: string;
}

const COLORS = [
  'bg-teal-700 text-white',
  'bg-[#e68a00] text-white', // Vibrant Dark Orange
  'bg-[#faf0e6] text-black', // Linen
  'bg-royal-purple text-white'
];

export const PrayerWall: React.FC = memo(() => {
  const [prayers, setPrayers] = useState<Prayer[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newPrayer, setNewPrayer] = useState({ name: '', text: '' });
  const [activePrayer, setActivePrayer] = useState<Prayer | null>(null);
  
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Generate initial dummy prayers
    const dummy = Array.from({ length: 15 }).map((_, i) => ({
      id: `initial-${i}`,
      name: i % 3 === 0 ? 'Anonymous' : `Member ${i}`,
      text: i % 2 === 0 ? 'Praying for my family\'s health and strength during this difficult season.' : 'Thanking God for the new job opportunity! He is faithful.',
      x: Math.random() * 1500 - 750,
      y: Math.random() * 1000 - 500,
      rotate: Math.random() * 20 - 10,
      color: COLORS[Math.floor(Math.random() * COLORS.length)]
    }));
    setPrayers(dummy);
  }, []);

  const handleAddPrayer = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPrayer.text) return;

    const prayer: Prayer = {
      id: Date.now().toString(),
      name: newPrayer.name || 'Anonymous',
      text: newPrayer.text,
      x: 0, // Center of viewport
      y: 0,
      rotate: Math.random() * 10 - 5,
      color: COLORS[Math.floor(Math.random() * COLORS.length)]
    };

    setPrayers(prev => [...prev, prayer]);
    setIsModalOpen(false);
    setNewPrayer({ name: '', text: '' });
  };

  return (
    <div className="bg-background-dark min-h-[100dvh] w-[100dvw] relative overflow-hidden font-sans select-none">
      
      {/* Top Banner overlay */}
      <div className="absolute top-0 left-0 right-0 h-40 bg-gradient-to-b from-background-dark to-transparent z-40 flex items-center justify-between px-6 pt-20 pointer-events-none">
         <div className="max-w-7xl mx-auto w-full flex justify-between items-start pointer-events-auto">
            <div>
              <h1 className="text-4xl md:text-5xl font-black text-white tracking-tighter">Prayer <span className="text-gold">Wall</span></h1>
              <p className="text-gray-300 font-light hidden md:block">Drag to explore. Add yours to the board.</p>
            </div>
            <button 
              onClick={() => setIsModalOpen(true)}
              className="px-6 py-3 bg-gold text-royal-purple font-bold rounded-xl shadow-[0_0_15px_rgba(239,191,4,0.3)] hover:scale-105 transition-transform"
            >
              Add Prayer
            </button>
         </div>
      </div>

      {/* Infinite Canvas */}
      <div className="absolute inset-0 z-10 overflow-hidden cursor-grab active:cursor-grabbing flex items-center justify-center" ref={containerRef}>
        <motion.div 
          ref={canvasRef}
          drag 
          dragConstraints={{ left: -1000, right: 1000, top: -750, bottom: 750 }}
          dragElastic={0.1}
          whileTap={{ cursor: "grabbing" }}
          className="w-[2000px] h-[1500px] absolute pointer-events-auto"
          style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='20' cy='20' r='1' fill='rgba(255,255,255,0.05)'/%3E%3C/svg%3E")`, willChange: "transform" }}
        >
          {prayers.map((prayer) => (
            <motion.div
              key={prayer.id}
              drag
              dragMomentum={false}
              onDragStart={(e) => e.stopPropagation()}
              onClick={() => setActivePrayer(prayer)}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1, x: prayer.x, y: prayer.y, rotate: prayer.rotate }}
              className={`absolute top-1/2 left-1/2 -mt-[100px] -ml-[125px] w-[250px] h-[200px] ${prayer.color} p-6 shadow-2xl cursor-pointer hover:z-50 border border-white/10 flex flex-col justify-between origin-center`}
              style={{ willChange: "transform" }}
            >
              {/* Pin */}
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-red-500 shadow-md flex items-center justify-center border border-red-700">
                <div className="w-1 h-1 bg-white rounded-full opacity-50"></div>
              </div>
              <p className="font-medium text-lg leading-snug line-clamp-4">{prayer.text}</p>
              <p className="text-sm font-bold opacity-70 mt-4 text-right">— {prayer.name}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Expanded Note Modal */}
      <AnimatePresence>
        {activePrayer && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="absolute inset-0 bg-background-dark/80 backdrop-blur-sm cursor-pointer"
              onClick={() => setActivePrayer(null)}
            />
             <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className={`relative z-10 w-full max-w-md min-h-[300px] ${activePrayer.color} p-10 shadow-2xl flex flex-col`}
            >
               <button onClick={() => setActivePrayer(null)} className="absolute top-4 right-4 text-currentColor opacity-60 hover:opacity-100 p-2">✕</button>
               <p className="font-medium text-2xl leading-relaxed flex-grow whitespace-pre-wrap">{activePrayer.text}</p>
               <div className="mt-8 border-t border-current/20 pt-4 flex justify-between items-center">
                  <p className="font-bold opacity-80">{activePrayer.name}</p>
                  <button className="text-sm font-bold uppercase tracking-widest opacity-60 hover:opacity-100 transition-opacity flex items-center space-x-1">
                     <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" /></svg>
                     <span>Pray</span>
                  </button>
               </div>
            </motion.div>
          </div>
        )}

        {/* Add Prayer Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
             <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="absolute inset-0 bg-background-dark/90 backdrop-blur-md cursor-pointer"
              onClick={() => setIsModalOpen(false)}
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }}
              className="relative z-10 w-full max-w-lg bg-background-card border border-white/10 rounded-3xl p-8 md:p-12 shadow-2xl"
            >
               <button onClick={() => setIsModalOpen(false)} className="absolute top-6 right-6 text-gray-500 hover:text-white transition-colors">✕</button>
               <h2 className="text-3xl font-black text-white mb-8">Share a Prayer</h2>
               
               <form onSubmit={handleAddPrayer} className="space-y-6">
                 <div>
                    <label className="text-xs font-bold uppercase tracking-widest text-gold mb-2 block">Name (Optional)</label>
                    <input type="text" value={newPrayer.name} onChange={e => setNewPrayer({...newPrayer, name: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-gold transition-colors" placeholder="Leave blank to remain anonymous" />
                 </div>
                 <div>
                    <label className="text-xs font-bold uppercase tracking-widest text-gold mb-2 block">Prayer Request</label>
                    <textarea required value={newPrayer.text} onChange={e => setNewPrayer({...newPrayer, text: e.target.value})} rows={4} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-gold transition-colors resize-none" placeholder="What can we pray for?"></textarea>
                 </div>
                 <button type="submit" className="w-full py-4 mt-4 bg-gold text-royal-purple font-black uppercase tracking-widest rounded-xl hover:shadow-[0_0_20px_rgba(239,191,4,0.3)] transition-shadow">Post Prayer</button>
               </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
});

PrayerWall.displayName = "PrayerWall";
