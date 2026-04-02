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
    <section className="py-24 relative z-10 w-full overflow-hidden" id="plan-visit">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-4xl bg-royal-purple-light/10 rounded-[100%] blur-[120px] pointer-events-none"></div>

      <div className="max-w-4xl mx-auto px-6 relative z-10">
        <div className="bg-background-card/80 backdrop-blur-2xl border border-white/10 rounded-3xl p-8 md:p-12 shadow-2xl relative overflow-hidden">
          
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
                <div className="text-center mb-10">
                  <h2 className="text-3xl md:text-4xl font-black text-white mb-4 tracking-tight">Plan a <span className="text-gold">Visit</span></h2>
                  <p className="text-gray-400 font-light">We can't wait to meet you. Let us know you're coming so we can roll out the red carpet.</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                       <label className="text-sm font-bold text-gray-400 uppercase tracking-wider">Name</label>
                       <input required type="text" className="w-full bg-background-dark/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold transition-colors" placeholder="John Doe" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
                    </div>
                    <div className="space-y-2">
                       <label className="text-sm font-bold text-gray-400 uppercase tracking-wider">Email</label>
                       <input required type="email" className="w-full bg-background-dark/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold transition-colors" placeholder="john@example.com" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="space-y-2">
                       <label className="text-sm font-bold text-gray-400 uppercase tracking-wider">Service Time</label>
                       <select className="w-full bg-background-dark/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold transition-colors appearance-none" value={formData.service} onChange={e => setFormData({...formData, service: e.target.value})}>
                         <option value="10am">Sunday 10:00 AM</option>
                         <option value="2pm">Sunday 2:00 PM</option>
                         <option value="4pm">Sunday 4:00 PM</option>
                       </select>
                    </div>
                    <div className="space-y-2">
                       <label className="text-sm font-bold text-gray-400 uppercase tracking-wider">Adults</label>
                       <input type="number" min="1" className="w-full bg-background-dark/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-gold transition-colors" value={formData.adults} onChange={e => setFormData({...formData, adults: parseInt(e.target.value)})} />
                    </div>
                    <div className="space-y-2">
                       <label className="text-sm font-bold text-gray-400 uppercase tracking-wider">Kids (Ages 0-11)</label>
                       <input type="number" min="0" className="w-full bg-background-dark/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-gold transition-colors" value={formData.kids} onChange={e => setFormData({...formData, kids: parseInt(e.target.value)})} />
                    </div>
                  </div>

                  <button type="submit" className="w-full mt-4 py-4 rounded-xl bg-gradient-to-r from-gold to-gold-light text-royal-purple-dark font-black tracking-wide text-lg shadow-[0_0_20px_rgba(239,191,4,0.3)] hover:shadow-[0_0_30px_rgba(239,191,4,0.5)] transform hover:-translate-y-0.5 transition-all">
                    Schedule My Visit
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
