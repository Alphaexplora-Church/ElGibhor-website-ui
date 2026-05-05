import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface PlanVisitModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PlanVisitModal: React.FC<PlanVisitModalProps> = ({ isOpen, onClose }) => {
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        service: '',
        adults: 1,
        kids: 0,
        type: 'first-time'
    });

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Visit RSVP Submitted", formData);
        setIsSubmitted(true);
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 md:p-8">
                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-[#0C0515]/90 backdrop-blur-sm cursor-pointer"
                    />
                    
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        transition={{ type: "spring", damping: 25, stiffness: 300 }}
                        className="relative z-10 w-full max-w-2xl bg-background-card border border-white/10 rounded-3xl p-6 sm:p-8 shadow-2xl overflow-y-auto max-h-[90vh] sm:max-h-[85vh] scrollbar-thin scrollbar-thumb-white/20 scrollbar-track-transparent"
                    >
                        {/* Background Glow */}
                        <div className="absolute top-0 right-0 w-64 h-64 bg-gold/10 rounded-full blur-[80px] pointer-events-none"></div>
                        <div className="absolute bottom-0 left-0 w-64 h-64 bg-royal-purple/20 rounded-full blur-[80px] pointer-events-none"></div>

                        <button 
                            onClick={onClose}
                            className="absolute top-4 right-4 sm:top-6 sm:right-6 p-2 text-white/50 hover:text-white transition-colors z-20 bg-white/5 rounded-full hover:bg-white/10"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                        </button>

                        <AnimatePresence mode="wait">
                            {!isSubmitted ? (
                                <motion.div key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="relative z-10">
                                    <div className="mb-8">
                                        <div className="w-12 h-1 bg-gradient-to-r from-gold to-gold/20 rounded-full mb-6"></div>
                                        <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tighter leading-tight mb-3">
                                            We'll save <span className="text-gold italic pr-2">a seat.</span>
                                        </h2>
                                        <p className="text-gray-400 text-sm sm:text-base font-light">
                                            Let us know you're coming so we can welcome you properly, guide you across the campus, and help you feel right at home.
                                        </p>
                                    </div>

                                    <form onSubmit={handleSubmit} className="space-y-5">
                                        <div className="flex flex-col sm:flex-row gap-5">
                                            <div className="flex-1">
                                                <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1.5">First Name *</label>
                                                <input 
                                                    type="text" 
                                                    required
                                                    placeholder="First name"
                                                    value={formData.firstName}
                                                    onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                                                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold transition-colors text-sm sm:text-base"
                                                />
                                            </div>
                                            <div className="flex-1">
                                                <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1.5">Last Name *</label>
                                                <input 
                                                    type="text" 
                                                    required
                                                    placeholder="Last name"
                                                    value={formData.lastName}
                                                    onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                                                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold transition-colors text-sm sm:text-base"
                                                />
                                            </div>
                                        </div>

                                        <div>
                                            <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1.5">Email *</label>
                                            <input 
                                                type="email" 
                                                required
                                                placeholder="your@email.com"
                                                value={formData.email}
                                                onChange={(e) => setFormData({...formData, email: e.target.value})}
                                                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold transition-colors text-sm sm:text-base"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1.5">Preferred Service</label>
                                            <div className="relative">
                                                <select 
                                                    value={formData.service}
                                                    onChange={(e) => setFormData({...formData, service: e.target.value})}
                                                    className="w-full appearance-none bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white hover:border-white/20 focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold transition-colors cursor-pointer text-sm sm:text-base"
                                                >
                                                    <option value="" disabled className="text-gray-500">Select a service</option>
                                                    <option value="sunday-830" className="text-gray-900 bg-white">Sunday Worship - 8:30 AM</option>
                                                    <option value="sunday-1030" className="text-gray-900 bg-white">Sunday Worship - 10:30 AM</option>
                                                </select>
                                                <div className="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none text-gray-400">
                                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="flex gap-5">
                                            <div className="flex-1">
                                                <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1.5">Adults</label>
                                                <input 
                                                    type="number" 
                                                    min="1"
                                                    value={formData.adults}
                                                    onChange={(e) => setFormData({...formData, adults: parseInt(e.target.value) || 1})}
                                                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-gold transition-colors text-sm sm:text-base"
                                                />
                                            </div>
                                            <div className="flex-1">
                                                <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1.5">Kids</label>
                                                <input 
                                                    type="number" 
                                                    min="0"
                                                    value={formData.kids}
                                                    onChange={(e) => setFormData({...formData, kids: parseInt(e.target.value) || 0})}
                                                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-gold transition-colors text-sm sm:text-base"
                                                />
                                            </div>
                                        </div>

                                        <div className="pt-2">
                                            <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-3">I am a...</label>
                                            <div className="flex flex-col sm:flex-row gap-4">
                                                <label className="flex items-center cursor-pointer group">
                                                    <div className="relative flex items-center">
                                                        <input 
                                                            type="radio" 
                                                            name="userType"
                                                            className="sr-only"
                                                            checked={formData.type === 'first-time'}
                                                            onChange={() => setFormData({...formData, type: 'first-time'})}
                                                        />
                                                        <div className={`w-5 h-5 rounded-full border flex items-center justify-center transition-colors ${formData.type === 'first-time' ? 'border-gold bg-gold/20' : 'border-white/20 bg-white/5 group-hover:border-white/40'}`}>
                                                            {formData.type === 'first-time' && <div className="w-2.5 h-2.5 rounded-full bg-gold"></div>}
                                                        </div>
                                                    </div>
                                                    <span className={`ml-3 text-sm transition-colors ${formData.type === 'first-time' ? 'text-white font-medium' : 'text-gray-400'}`}>First-Time Guest</span>
                                                </label>
                                                
                                                <label className="flex items-center cursor-pointer group">
                                                    <div className="relative flex items-center">
                                                        <input 
                                                            type="radio" 
                                                            name="userType"
                                                            className="sr-only"
                                                            checked={formData.type === 'returning'}
                                                            onChange={() => setFormData({...formData, type: 'returning'})}
                                                        />
                                                        <div className={`w-5 h-5 rounded-full border flex items-center justify-center transition-colors ${formData.type === 'returning' ? 'border-gold bg-gold/20' : 'border-white/20 bg-white/5 group-hover:border-white/40'}`}>
                                                            {formData.type === 'returning' && <div className="w-2.5 h-2.5 rounded-full bg-gold"></div>}
                                                        </div>
                                                    </div>
                                                    <span className={`ml-3 text-sm transition-colors ${formData.type === 'returning' ? 'text-white font-medium' : 'text-gray-400'}`}>Returning Member</span>
                                                </label>
                                            </div>
                                        </div>

                                        <div className="pt-6">
                                            <button type="submit" className="w-full bg-gold text-royal-purple-dark py-4 rounded-xl font-black text-sm sm:text-base hover:bg-gold-light hover:scale-[1.02] active:scale-[0.98] transition-all shadow-[0_0_20px_rgba(239,191,4,0.3)] tracking-wide uppercase">
                                                Schedule Visit
                                            </button>
                                        </div>
                                    </form>
                                </motion.div>
                            ) : (
                                <motion.div key="success" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-12 sm:py-16">
                                    <div className="w-20 h-20 bg-green-500/20 text-green-400 rounded-full flex items-center justify-center mx-auto mb-6">
                                        <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                                    </div>
                                    <h3 className="text-3xl sm:text-4xl font-black text-white mb-3">See You Soon!</h3>
                                    <p className="text-gray-400 mb-8 max-w-sm mx-auto text-sm sm:text-base">Your visit is scheduled. We've sent details to your inbox.</p>
                                    <button onClick={onClose} className="px-8 py-3 bg-white/10 text-white rounded-xl font-bold hover:bg-white/20 transition-colors border border-white/10 text-sm sm:text-base">Close</button>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};
