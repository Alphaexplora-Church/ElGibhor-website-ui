import React, { useState, memo } from 'react';
import { motion } from 'framer-motion';

const bankAccounts = [
  { bank: "BDO Unibank", actName: "TMGAN INC", actNumber: "0012 3456 7890", type: "Peso / Checking" },
  { bank: "BPI", actName: "TMGAN INC", actNumber: "9876 5432 10", type: "Peso / Savings" },
  { bank: "Metrobank", actName: "TMGAN INC", actNumber: "1122 3344 5566", type: "Peso / Checking" }
];

export const Give: React.FC = memo(() => {
  const [copied, setCopied] = useState<string | null>(null);

  const handleCopy = (actNumber: string) => {
    navigator.clipboard.writeText(actNumber);
    setCopied(actNumber);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <div className="bg-background-dark min-h-screen flex flex-col w-full relative z-10 overflow-hidden">
      
      {/* Global Fixed Watermark overlay */}
      <div className="fixed bottom-0 right-0 p-8 pointer-events-none select-none z-0">
        <span className="text-[15vw] font-black leading-none text-white/5 tracking-tighter">TMGAN</span>
      </div>

      <section className="relative flex-grow flex items-center justify-center py-32 z-10 px-6">
        {/* Subtle Gold Texture Overlay */}
        <div className="absolute inset-0 opacity-10 pointer-events-none mix-blend-color-dodge bg-[radial-gradient(circle_at_top_right,var(--color-gold),transparent_40%)]"></div>

        <div className="max-w-4xl mx-auto w-full">
           <motion.div 
             initial={{ opacity: 0, y: 30 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ duration: 0.8 }}
             className="text-center mb-16"
           >
             <h1 className="text-5xl md:text-7xl font-black text-white tracking-tighter mb-6">Worship Through <span className="text-gold">Giving</span></h1>
             <p className="text-xl text-gray-400 font-light max-w-2xl mx-auto">
               Your generosity helps us continue to build the church and make a lasting impact in our communities and across the nation.
             </p>
           </motion.div>

           <div className="bg-background-card/50 backdrop-blur-3xl border border-white/10 rounded-3xl p-8 md:p-12 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-royal-purple/20 rounded-full blur-[100px]"></div>

              <h2 className="text-2xl font-bold text-white mb-8 border-b border-white/10 pb-4">Bank Transfer Details</h2>
              
              <div className="space-y-6">
                {bankAccounts.map((act, idx) => (
                  <motion.div 
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 + (idx * 0.1) }}
                    key={idx} 
                    className="flex flex-col md:flex-row md:items-center justify-between p-6 bg-white/5 border border-white/5 rounded-2xl hover:bg-white/10 transition-colors group"
                  >
                     <div>
                        <div className="flex items-center space-x-3 mb-2">
                           <span className="text-xl font-black text-white">{act.bank}</span>
                           <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-white/10 text-gray-300">{act.type}</span>
                        </div>
                        <div className="text-gray-400 text-sm mb-1 uppercase tracking-widest">{act.actName}</div>
                        <div className="text-2xl font-mono text-gold tracking-wider font-semibold">{act.actNumber}</div>
                     </div>

                     <button 
                       onClick={() => handleCopy(act.actNumber)}
                       className="mt-4 md:mt-0 self-start md:self-auto px-6 py-3 bg-white/10 rounded-xl text-white font-bold hover:bg-white/20 transition-all flex items-center space-x-2 active:scale-95"
                     >
                       {copied === act.actNumber ? (
                         <>
                           <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                           <span className="text-green-400">Copied!</span>
                         </>
                       ) : (
                         <>
                           <svg className="w-5 h-5 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" /></svg>
                           <span>Copy Number</span>
                         </>
                       )}
                     </button>
                  </motion.div>
                ))}
              </div>

              <div className="mt-12 pt-8 border-t border-white/10 text-center">
                 <p className="text-sm text-gray-500 font-light">For special offerings, pledges, or any finance-related inquiries, please contact our accounting department at <a href="mailto:finance@tmgan.org" className="text-gold hover:underline">finance@tmgan.org</a>.</p>
              </div>
           </div>
        </div>
      </section>
    </div>
  );
});

Give.displayName = "Give";
