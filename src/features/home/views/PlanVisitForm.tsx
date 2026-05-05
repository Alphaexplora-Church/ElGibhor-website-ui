import { useState } from 'react';
import type { FC } from 'react';
import { motion } from 'framer-motion';

export const PlanVisitForm: FC = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    service: '',
    adults: 1,
    kids: 0,
    type: 'first-time'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Visit RSVP Submitted", formData);
  };

  return (
    <div className="py-24 px-6 bg-[#F4EDFB] border-t border-purple-200 flex flex-col items-center justify-center overflow-hidden relative min-h-[80vh]">
      <div className="max-w-4xl mx-auto w-full relative">
        {/* Background glow */}
        <div className="absolute -top-32 right-0 w-[40rem] h-[40rem] bg-gold/10 rounded-full blur-[120px] pointer-events-none"></div>
        <div className="absolute -bottom-32 left-0 w-[30rem] h-[30rem] bg-gold/15 rounded-full blur-[100px] pointer-events-none"></div>

        <div className="text-center mb-12 relative z-10">
          <div className="w-16 h-1 bg-gradient-to-r from-gold/20 via-gold to-gold/20 mx-auto rounded-full mb-8"></div>
          <h2 className="text-5xl md:text-6xl font-black text-gray-900 tracking-tighter leading-tight mb-4">
            We'll save <span className="text-royal-purple italic pr-2">a seat.</span>
          </h2>
          <p className="text-gray-600 text-lg font-light max-w-xl mx-auto">
            Let us know you're coming so we can welcome you properly, guide you across the campus, and help you feel right at home.
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative z-10"
        >
          <form onSubmit={handleSubmit} className="bg-gradient-to-br from-royal-purple to-royal-purple-dark border border-gold/30 p-8 md:p-12 rounded-3xl shadow-[0_15px_40px_rgba(75,42,111,0.3)]">
            <div className="space-y-6">

              <div className="flex flex-col md:flex-row gap-6">
                <div className="flex-1">
                  <label className="block text-[10px] font-bold text-gold uppercase tracking-widest mb-2">First Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="First name"
                    value={formData.firstName}
                    onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                    className="w-full bg-white/5 border border-gold/20 rounded-xl px-5 py-4 text-white placeholder-white/40 focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold transition-colors"
                  />
                </div>
                <div className="flex-1">
                  <label className="block text-[10px] font-bold text-gold uppercase tracking-widest mb-2">Last Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="Last name"
                    value={formData.lastName}
                    onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                    className="w-full bg-white/5 border border-gold/20 rounded-xl px-5 py-4 text-white placeholder-white/40 focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-bold text-gold uppercase tracking-widest mb-2">Email *</label>
                <input
                  type="email"
                  required
                  placeholder="your@email.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full bg-white/5 border border-gold/20 rounded-xl px-5 py-4 text-white placeholder-white/40 focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold transition-colors"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold text-gold uppercase tracking-widest mb-2">Preferred Service</label>
                <div className="relative">
                  <select
                    value={formData.service}
                    onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                    className="w-full appearance-none bg-white/5 border border-gold/20 rounded-xl px-5 py-4 text-white hover:border-gold/40 focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold transition-colors cursor-pointer"
                  >
                    <option value="" disabled className="text-gray-400">Select a service</option>
                    <option value="sunday-830" className="text-gray-900">Sunday Worship - 8:30 AM</option>
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center px-5 pointer-events-none text-gold">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                  </div>
                </div>
              </div>

              <div className="flex gap-6">
                <div className="flex-1">
                  <label className="block text-[10px] font-bold text-gold uppercase tracking-widest mb-2">Adults</label>
                  <input
                    type="number"
                    min="1"
                    value={formData.adults}
                    onChange={(e) => setFormData({ ...formData, adults: parseInt(e.target.value) || 1 })}
                    className="w-full bg-white/5 border border-gold/20 rounded-xl px-5 py-4 text-white focus:outline-none focus:border-gold transition-colors"
                  />
                </div>
                <div className="flex-1">
                  <label className="block text-[10px] font-bold text-gold uppercase tracking-widest mb-2">Kids</label>
                  <input
                    type="number"
                    min="0"
                    value={formData.kids}
                    onChange={(e) => setFormData({ ...formData, kids: parseInt(e.target.value) || 0 })}
                    className="w-full bg-white/5 border border-gold/20 rounded-xl px-5 py-4 text-white focus:outline-none focus:border-gold transition-colors"
                  />
                </div>
              </div>

              <div className="pt-2">
                <label className="block text-[10px] font-bold text-gold uppercase tracking-widest mb-4">I am a...</label>
                <div className="flex flex-col sm:flex-row gap-6">
                  <label className="flex items-center cursor-pointer group">
                    <div className="relative flex items-center">
                      <input
                        type="radio"
                        name="userType"
                        className="sr-only"
                        checked={formData.type === 'first-time'}
                        onChange={() => setFormData({ ...formData, type: 'first-time' })}
                      />
                      <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${formData.type === 'first-time' ? 'border-gold bg-transparent' : 'border-gold/30 bg-white/5 group-hover:border-gold/60'}`}>
                        {formData.type === 'first-time' && <div className="w-3 h-3 rounded-full bg-gold"></div>}
                      </div>
                    </div>
                    <span className={`ml-3 text-sm font-medium transition-colors ${formData.type === 'first-time' ? 'text-white' : 'text-white/60'}`}>First-Time Guest</span>
                  </label>

                  <label className="flex items-center cursor-pointer group">
                    <div className="relative flex items-center">
                      <input
                        type="radio"
                        name="userType"
                        className="sr-only"
                        checked={formData.type === 'returning'}
                        onChange={() => setFormData({ ...formData, type: 'returning' })}
                      />
                      <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${formData.type === 'returning' ? 'border-gold bg-transparent' : 'border-gold/30 bg-white/5 group-hover:border-gold/60'}`}>
                        {formData.type === 'returning' && <div className="w-3 h-3 rounded-full bg-gold"></div>}
                      </div>
                    </div>
                    <span className={`ml-3 text-sm font-medium transition-colors ${formData.type === 'returning' ? 'text-white' : 'text-white/60'}`}>Returning Member</span>
                  </label>
                </div>
              </div>

              <div className="pt-6 border-t border-white/10">
                <button type="submit" className="w-full bg-gold text-royal-purple-dark py-5 rounded-xl font-black text-lg hover:bg-gold-light hover:scale-[1.02] active:scale-[0.98] transition-all shadow-[0_0_20px_rgba(239,191,4,0.3)] tracking-wide">
                  CONTINUE TO GUIDE
                </button>
              </div>

            </div>
          </form>
        </motion.div>

      </div>
    </div>
  );
};
