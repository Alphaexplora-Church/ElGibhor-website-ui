// src/shared/components/planVisit/PlanVisitModal.tsx

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePlanVisitViewModel } from './usePlanVisitViewModel';

interface PlanVisitModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export const PlanVisitModal: React.FC<PlanVisitModalProps> = ({ isOpen, onClose }) => {
    const vm = usePlanVisitViewModel(isOpen);

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[9999999] flex items-center justify-center p-2 sm:p-4 md:p-8">
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-[#0C0515]/90 backdrop-blur-sm cursor-pointer"
                    />

                    {/* Modal card */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                        className="relative z-10 w-full max-w-2xl bg-background-card border border-white/10 rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 shadow-2xl overflow-y-auto max-h-[92vh] sm:max-h-[85vh] scrollbar-thin scrollbar-thumb-white/20 scrollbar-track-transparent"
                    >
                        {/* Background glows */}
                        <div className="absolute top-0 right-0 w-40 sm:w-64 h-40 sm:h-64 bg-gold/10 rounded-full blur-[60px] sm:blur-[80px] pointer-events-none" />
                        <div className="absolute bottom-0 left-0 w-40 sm:w-64 h-40 sm:h-64 bg-royal-purple/20 rounded-full blur-[60px] sm:blur-[80px] pointer-events-none" />

                        {/* Close button */}
                        <button
                            onClick={onClose}
                            aria-label="Close modal"
                            className="absolute top-3 right-3 sm:top-4 sm:right-4 md:top-6 md:right-6 p-1.5 sm:p-2 text-white/50 hover:text-white transition-colors z-20 bg-white/5 rounded-full hover:bg-white/10"
                        >
                            <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>

                        <AnimatePresence mode="wait">
                            {!vm.isSubmitted ? (
                                /* ── Form view ───────────────────────────────── */
                                <motion.div
                                    key="form"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    className="relative z-10"
                                >
                                    {/* Header */}
                                    <div className="mb-5 sm:mb-8">
                                        <div className="w-10 sm:w-12 h-0.5 sm:h-1 bg-gradient-to-r from-gold to-gold/20 rounded-full mb-4 sm:mb-6" />
                                        <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-white tracking-tighter leading-tight mb-2 sm:mb-3">
                                            We'll save <span className="text-gold italic pr-1 sm:pr-2">a seat.</span>
                                        </h2>
                                        <p className="text-gray-400 text-xs sm:text-sm md:text-base font-light leading-relaxed">
                                            Let us know you're coming so we can welcome you properly, guide you across the campus, and help you feel right at home.
                                        </p>
                                    </div>

                                    {/* Error banner */}
                                    {vm.error && (
                                        <div className="mb-4 sm:mb-5 px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg sm:rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs sm:text-sm">
                                            {vm.error}
                                        </div>
                                    )}

                                    <form onSubmit={vm.handleSubmit} className="space-y-3 sm:space-y-5">
                                        {/* Name row */}
                                        <div className="flex flex-col sm:flex-row gap-3 sm:gap-5">
                                            <div className="flex-1">
                                                <label className="block text-[9px] sm:text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1 sm:mb-1.5">
                                                    First Name *
                                                </label>
                                                <input
                                                    type="text"
                                                    required
                                                    placeholder="First name"
                                                    value={vm.formData.firstName}
                                                    onChange={e => vm.setField('firstName', e.target.value)}
                                                    className="w-full bg-white/5 border border-white/10 rounded-lg sm:rounded-xl px-3 sm:px-4 py-2.5 sm:py-3 text-white placeholder-white/30 focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold transition-colors text-sm"
                                                />
                                            </div>
                                            <div className="flex-1">
                                                <label className="block text-[9px] sm:text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1 sm:mb-1.5">
                                                    Last Name *
                                                </label>
                                                <input
                                                    type="text"
                                                    required
                                                    placeholder="Last name"
                                                    value={vm.formData.lastName}
                                                    onChange={e => vm.setField('lastName', e.target.value)}
                                                    className="w-full bg-white/5 border border-white/10 rounded-lg sm:rounded-xl px-3 sm:px-4 py-2.5 sm:py-3 text-white placeholder-white/30 focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold transition-colors text-sm"
                                                />
                                            </div>
                                        </div>

                                        {/* Email */}
                                        <div>
                                            <label className="block text-[9px] sm:text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1 sm:mb-1.5">
                                                Email *
                                            </label>
                                            <input
                                                type="email"
                                                required
                                                placeholder="your@email.com"
                                                value={vm.formData.email}
                                                onChange={e => vm.setField('email', e.target.value)}
                                                className="w-full bg-white/5 border border-white/10 rounded-lg sm:rounded-xl px-3 sm:px-4 py-2.5 sm:py-3 text-white placeholder-white/30 focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold transition-colors text-sm"
                                            />
                                        </div>

                                        {/* Service selector */}
                                        <div>
                                            <label className="block text-[9px] sm:text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1 sm:mb-1.5">
                                                Preferred Service
                                            </label>
                                            <div className="relative">
                                                <select
                                                    value={vm.formData.service}
                                                    onChange={e => vm.setField('service', e.target.value)}
                                                    className="w-full appearance-none bg-white/5 border border-white/10 rounded-lg sm:rounded-xl px-3 sm:px-4 py-2.5 sm:py-3 text-white hover:border-white/20 focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold transition-colors cursor-pointer text-sm"
                                                >
                                                    <option value="" disabled className="text-gray-500">Select a service</option>
                                                    <option value="sunday-830" className="text-gray-900 bg-white">Sunday Worship - 8:30 AM</option>
                                                    <option value="sunday-1030" className="text-gray-900 bg-white">Sunday Worship - 10:30 AM</option>
                                                </select>
                                                <div className="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none text-gray-400">
                                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                                    </svg>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Attendance count */}
                                        <div className="flex gap-3 sm:gap-5">
                                            <div className="flex-1">
                                                <label className="block text-[9px] sm:text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1 sm:mb-1.5">
                                                    Adults
                                                </label>
                                                <input
                                                    type="number"
                                                    min="1"
                                                    value={vm.formData.adults}
                                                    onChange={e => vm.setField('adults', parseInt(e.target.value) || 1)}
                                                    className="w-full bg-white/5 border border-white/10 rounded-lg sm:rounded-xl px-3 sm:px-4 py-2.5 sm:py-3 text-white focus:outline-none focus:border-gold transition-colors text-sm"
                                                />
                                            </div>
                                            <div className="flex-1">
                                                <label className="block text-[9px] sm:text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1 sm:mb-1.5">
                                                    Kids
                                                </label>
                                                <input
                                                    type="number"
                                                    min="0"
                                                    value={vm.formData.kids}
                                                    onChange={e => vm.setField('kids', parseInt(e.target.value) || 0)}
                                                    className="w-full bg-white/5 border border-white/10 rounded-lg sm:rounded-xl px-3 sm:px-4 py-2.5 sm:py-3 text-white focus:outline-none focus:border-gold transition-colors text-sm"
                                                />
                                            </div>
                                        </div>

                                        {/* Visitor type */}
                                        <div className="pt-1 sm:pt-2">
                                            <label className="block text-[9px] sm:text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-2 sm:mb-3">
                                                I am a...
                                            </label>
                                            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                                                {/* First-time */}
                                                <label className="flex items-center cursor-pointer group">
                                                    <div className="relative flex items-center">
                                                        <input
                                                            type="radio"
                                                            name="userType"
                                                            className="sr-only"
                                                            checked={vm.formData.type === 'first-time'}
                                                            onChange={() => vm.setField('type', 'first-time')}
                                                        />
                                                        <div className={`w-4 h-4 sm:w-5 sm:h-5 rounded-full border flex items-center justify-center transition-colors ${vm.formData.type === 'first-time' ? 'border-gold bg-gold/20' : 'border-white/20 bg-white/5 group-hover:border-white/40'}`}>
                                                            {vm.formData.type === 'first-time' && <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-gold" />}
                                                        </div>
                                                    </div>
                                                    <span className={`ml-2 sm:ml-3 text-xs sm:text-sm transition-colors ${vm.formData.type === 'first-time' ? 'text-white font-medium' : 'text-gray-400'}`}>
                                                        First-Time Member
                                                    </span>
                                                </label>

                                                {/* Returning */}
                                                <label className="flex items-center cursor-pointer group">
                                                    <div className="relative flex items-center">
                                                        <input
                                                            type="radio"
                                                            name="userType"
                                                            className="sr-only"
                                                            checked={vm.formData.type === 'returning'}
                                                            onChange={() => vm.setField('type', 'returning')}
                                                        />
                                                        <div className={`w-4 h-4 sm:w-5 sm:h-5 rounded-full border flex items-center justify-center transition-colors ${vm.formData.type === 'returning' ? 'border-gold bg-gold/20' : 'border-white/20 bg-white/5 group-hover:border-white/40'}`}>
                                                            {vm.formData.type === 'returning' && <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-gold" />}
                                                        </div>
                                                    </div>
                                                    <span className={`ml-2 sm:ml-3 text-xs sm:text-sm transition-colors ${vm.formData.type === 'returning' ? 'text-white font-medium' : 'text-gray-400'}`}>
                                                        Returning Member
                                                    </span>
                                                </label>
                                            </div>
                                        </div>

                                        {/* Submit */}
                                        <div className="pt-4 sm:pt-6">
                                            <button
                                                type="submit"
                                                disabled={vm.isSubmitting}
                                                className="w-full bg-gold text-royal-purple-dark py-3 sm:py-4 rounded-lg sm:rounded-xl font-black text-xs sm:text-sm md:text-base hover:bg-gold-light hover:scale-[1.02] active:scale-[0.98] transition-all shadow-[0_0_20px_rgba(239,191,4,0.3)] tracking-wide uppercase disabled:opacity-60 disabled:cursor-not-allowed disabled:scale-100"
                                            >
                                                {vm.isSubmitting ? 'Submitting...' : 'Schedule Visit'}
                                            </button>
                                        </div>
                                    </form>
                                </motion.div>
                            ) : (
                                /* ── Success view ────────────────────────────── */
                                <motion.div
                                    key="success"
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="text-center py-8 sm:py-12 md:py-16"
                                >
                                    <div className="w-16 h-16 sm:w-20 sm:h-20 bg-green-500/20 text-green-400 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
                                        <svg className="w-8 h-8 sm:w-10 sm:h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                        </svg>
                                    </div>
                                    <h3 className="text-2xl sm:text-3xl md:text-4xl font-black text-white mb-2 sm:mb-3">See You Soon!</h3>
                                    <p className="text-gray-400 mb-6 sm:mb-8 max-w-sm mx-auto text-xs sm:text-sm md:text-base">
                                        Your visit is scheduled. We've sent details to your inbox.
                                    </p>
                                    <button
                                        onClick={onClose}
                                        className="px-6 sm:px-8 py-2.5 sm:py-3 bg-white/10 text-white rounded-lg sm:rounded-xl font-bold hover:bg-white/20 transition-colors border border-white/10 text-xs sm:text-sm md:text-base"
                                    >
                                        Close
                                    </button>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};
