import React, { useState } from 'react';
import { motion } from 'framer-motion';

export const Contact: React.FC = () => {
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
        <div className="py-24 px-6 bg-[#F4EDFB] border-t border-purple-200 flex flex-col items-center justify-center overflow-x-hidden relative min-h-[80vh]">
            <div className="max-w-4xl mx-auto w-full relative">
                {/* Background glow */}
                <div className="absolute -top-32 right-0 w-[40rem] h-[40rem] bg-gold/10 rounded-full blur-[120px] pointer-events-none"></div>
                <div className="absolute -bottom-32 left-0 w-[30rem] h-[30rem] bg-gold/15 rounded-full blur-[100px] pointer-events-none"></div>
                
                <div className="text-center mb-12 relative z-10">
                    <div className="w-16 h-1 bg-gradient-to-r from-gold/20 via-gold to-gold/20 mx-auto rounded-full mb-8"></div>
                    <h2 className="text-5xl md:text-6xl font-black text-gray-900 tracking-tighter leading-tight mb-4">
                        We'll save <span className="text-royal-purple italic pr-2">a seat.</span>
                    </h2>
                    <p className="text-gray-700 font-light text-lg max-w-2xl mx-auto">
                        Planning your first visit? Fill out the form below and we'll make sure to welcome you with open arms.
                    </p>
                </div>

                {/* Form */}
                <motion.form
                    initial={{opacity: 0, y: 20}}
                    animate={{opacity: 1, y: 0}}
                    transition={{delay: 0.2}}
                    onSubmit={handleSubmit}
                    className="relative z-10 bg-white/60 backdrop-blur-md p-8 rounded-2xl border border-gold/20 space-y-6"
                >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <input 
                            type="text" 
                            placeholder="First Name" 
                            required 
                            className="px-6 py-3 rounded-lg bg-white/80 border border-gold/20 focus:outline-none focus:border-gold transition-colors text-gray-900 placeholder-gray-500"
                            value={formData.firstName}
                            onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                        />
                        <input 
                            type="text" 
                            placeholder="Last Name" 
                            required 
                            className="px-6 py-3 rounded-lg bg-white/80 border border-gold/20 focus:outline-none focus:border-gold transition-colors text-gray-900 placeholder-gray-500"
                            value={formData.lastName}
                            onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                        />
                    </div>

                    <input 
                        type="email" 
                        placeholder="Email Address" 
                        required 
                        className="w-full px-6 py-3 rounded-lg bg-white/80 border border-gold/20 focus:outline-none focus:border-gold transition-colors text-gray-900 placeholder-gray-500"
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                    />

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <select 
                            className="px-6 py-3 rounded-lg bg-white/80 border border-gold/20 focus:outline-none focus:border-gold transition-colors text-gray-900"
                            value={formData.type}
                            onChange={(e) => setFormData({...formData, type: e.target.value})}
                        >
                            <option value="first-time">First Time Visitor</option>
                            <option value="returning">Returning Guest</option>
                            <option value="member">Church Member</option>
                        </select>
                        <input 
                            type="number" 
                            min="1" 
                            placeholder="# Adults" 
                            className="px-6 py-3 rounded-lg bg-white/80 border border-gold/20 focus:outline-none focus:border-gold transition-colors text-gray-900"
                            value={formData.adults}
                            onChange={(e) => setFormData({...formData, adults: parseInt(e.target.value) || 1})}
                        />
                        <input 
                            type="number" 
                            min="0" 
                            placeholder="# Children" 
                            className="px-6 py-3 rounded-lg bg-white/80 border border-gold/20 focus:outline-none focus:border-gold transition-colors text-gray-900"
                            value={formData.kids}
                            onChange={(e) => setFormData({...formData, kids: parseInt(e.target.value) || 0})}
                        />
                    </div>

                    <button 
                        type="submit"
                        className="w-full px-8 py-4 bg-gradient-to-r from-gold to-gold-light hover:from-gold-light hover:to-gold text-royal-purple font-bold rounded-lg shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-0.5"
                    >
                        Reserve Your Seat
                    </button>
                </motion.form>
            </div>
        </div>
    );
};