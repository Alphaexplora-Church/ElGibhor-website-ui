import React, { useState, memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export const PlanVisitForm: React.FC = memo(() => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', service: '10am', adults: 1, kids: 0, type: 'first' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  return (
    <section className="py-16 relative z-10 w-full overflow-hidden" id="plan-visit">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-3xl bg-royal-purple-light/20 rounded-[100%] blur-[100px] pointer-events-none"></div>

      <div className="max-w-xl mx-auto px-6 relative z-10">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-black text-royal-purple-dark mb-4 tracking-tight">We'll save a <span className="text-royal-purple-light">seat.</span></h2>
          <p className="text-gray-500 font-light text-sm max-w-md mx-auto">Let us know you're coming so we can welcome you properly, guide you across the campus, and help you feel right at home.</p>
        </div>

        <div className="bg-royal-purple-dark border border-black/5 rounded-2xl p-8 shadow-2xl relative overflow-hidden">
          
          {/* Internal Glow */}
          <div className="absolute -top-32 -right-32 w-64 h-64 bg-gold/20 rounded-full blur-[80px]"></div>

          <AnimatePresence mode="wait">
            {!isSubmitted ? (
              <motion.div
                key="form"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
              >
                <div className="sr-only">
                  <h2 className="text-3xl md:text-4xl font-black text-white mb-4 tracking-tight">Plan a <span className="text-gold">Visit</span></h2>
                  <p className="text-gray-400 font-light">We can't wait to meet you.</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                       <input required type="text" className="w-full bg-royal-purple border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold transition-colors" placeholder="John Doe" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
                    </div>
                    <div className="space-y-2">
                       <label className="text-xs font-bold text-gold uppercase tracking-wider">Email</label>
                       <input required type="email" className="w-full bg-royal-purple border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold transition-colors" placeholder="john@example.com" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="space-y-2">
                       <label className="text-xs font-bold text-gold uppercase tracking-wider">Service Time</label>
                       <select className="w-full bg-royal-purple border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold transition-colors appearance-none" value={formData.service} onChange={e => setFormData({...formData, service: e.target.value})}>
                         <option value="10am">Sunday 10:00 AM</option>
                         <option value="2pm">Sunday 2:00 PM</option>
                         <option value="4pm">Sunday 4:00 PM</option>
                       </select>
                    </div>
                    <div className="space-y-2">
                       <label className="text-xs font-bold text-gold uppercase tracking-wider">Adults</label>
                       <input type="number" min="1" className="w-full bg-royal-purple border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-gold transition-colors" value={formData.adults} onChange={e => setFormData({...formData, adults: parseInt(e.target.value)})} />
                    </div>
                    <div className="space-y-2">
                       <label className="text-xs font-bold text-gold uppercase tracking-wider">Kids (Ages 0-11)</label>
                       <input type="number" min="0" className="w-full bg-royal-purple border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-gold transition-colors" value={formData.kids} onChange={e => setFormData({...formData, kids: parseInt(e.target.value)})} />
                    </div>
                  </div>

                  <button type="submit" className="w-full mt-8 py-4 rounded-xl bg-gold text-royal-purple-dark font-black tracking-wide text-sm uppercase transition-all hover:bg-gold-light hover:shadow-lg">
                    Continue to Guide
                  </button>
                </form>
              </motion.div>
            ) : (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-12"
              >
                <div className="w-20 h-20 bg-green-500/20 text-green-400 rounded-full flex items-center justify-center mx-auto mb-6 border border-green-500/30">
                  <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                </div>
                <h3 className="text-3xl font-black text-white mb-4">You're All Set!</h3>
                <p className="text-gray-300 font-light mb-8 max-w-md mx-auto">We've sent a confirmation email with details on where to park and what to expect. See you Sunday!</p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                   <button className="px-6 py-3 bg-white/10 rounded-xl font-bold hover:bg-white/20 transition-colors border border-white/10">Add to Calendar</button>
                   <button className="px-6 py-3 bg-gold text-royal-purple font-bold rounded-xl hover:shadow-[0_0_15px_rgba(239,191,4,0.4)] transition-all">Get Directions</button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
});

PlanVisitForm.displayName = "PlanVisitForm";
