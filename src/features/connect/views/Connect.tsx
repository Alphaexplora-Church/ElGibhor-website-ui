import React from 'react';
import { motion } from 'framer-motion';
import { FaFacebook, FaInstagram, FaMapMarkerAlt, FaClock } from 'react-icons/fa';

export const Connect: React.FC = () => {
    return (
        <div className="min-h-screen bg-background-dark pt-24 pb-16 px-6 overflow-x-hidden flex flex-col items-center">
            
            {/* Header */}
            <div className="text-center mb-12">
                <motion.span initial={{opacity:0, y:15}} animate={{opacity:1, y:0}} className="text-gold/80 font-semibold uppercase tracking-[0.3em] text-xs mb-3 block">Connect with Us</motion.span>
                <motion.h1 initial={{opacity:0, y:15}} animate={{opacity:1, y:0}} transition={{delay:0.1}} className="text-4xl md:text-5xl font-black text-white tracking-tight">
                   Service <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold-light to-gold-dark italic">Schedule</span>
                </motion.h1>
            </div>

            <div className="max-w-3xl mx-auto w-full flex flex-col gap-5">
                {/* Schedule Card */}
                <motion.div initial={{opacity:0, y:20}} animate={{opacity:1, y:0}} transition={{delay:0.2}} className="w-full bg-background-card border border-border-dark p-8 rounded-2xl relative overflow-hidden flex flex-col sm:flex-row items-center sm:text-left justify-between gap-6">
                    <div className="absolute -right-8 -top-8 w-48 h-48 bg-royal-purple/20 rounded-full blur-[50px] pointer-events-none"></div>
                    <div className="relative z-10">
                        <div className="flex items-center gap-3 mb-3">
                            <FaClock className="text-gold text-xl" />
                            <span className="text-gold/80 uppercase tracking-widest text-xs font-semibold">Weekly Service</span>
                        </div>
                        <h3 className="text-2xl font-bold text-white mb-1 tracking-tight">Sunday Worship Service</h3>
                        <p className="text-gray-400 text-sm font-light">Join our dedicated family every Sunday morning.</p>
                    </div>
                    <div className="bg-royal-purple/30 border border-royal-purple/40 px-8 py-4 rounded-xl relative z-10 shrink-0 text-center">
                        <span className="text-gold/70 uppercase tracking-widest text-xs font-bold block mb-0.5">Time</span>
                        <span className="font-black text-white text-3xl whitespace-nowrap">8:30 AM</span>
                    </div>
                </motion.div>

                {/* Location Card */}
                <motion.div initial={{opacity:0, y:20}} animate={{opacity:1, y:0}} transition={{delay:0.3}} className="w-full bg-background-card border border-border-dark p-8 rounded-2xl relative overflow-hidden flex flex-col sm:flex-row items-center sm:text-left justify-between gap-6">
                    <div className="absolute -left-8 -bottom-8 w-40 h-40 bg-royal-purple/10 rounded-full blur-[40px] pointer-events-none"></div>
                    <div className="relative z-10">
                        <div className="flex items-center gap-3 mb-3">
                            <FaMapMarkerAlt className="text-gold text-xl" />
                            <span className="text-gold/80 uppercase tracking-widest text-xs font-semibold">Location</span>
                        </div>
                        <h3 className="text-2xl font-bold text-white mb-1 tracking-tight">Our Location</h3>
                        <p className="text-gray-400 text-sm font-light">CES Center, 217 Malaya St.<br/><span className="text-gray-300 font-medium">Malanday, Marikina City</span></p>
                    </div>
                    <a href="https://www.google.com/maps/place/Ate+Ces+Headquarters,+217+Malaya+St,+Marikina,+1800+Metro+Manila/@14.649579,121.0906994,17z" target="_blank" rel="noreferrer" className="relative z-10 shrink-0 px-6 py-2.5 bg-gold/10 border border-gold/30 text-gold rounded-full text-sm font-semibold hover:bg-gold hover:text-royal-purple-dark transition-all duration-300 flex items-center gap-2">
                        Get Directions
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7"/></svg>
                    </a>
                </motion.div>

                {/* Social Links */}
                <motion.div initial={{opacity:0, y:20}} animate={{opacity:1, y:0}} transition={{delay:0.4}} className="w-full text-center pt-4">
                    <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-widest mb-5">Follow Our Journey</h3>
                    <div className="flex justify-center gap-4">
                        <a href="https://www.facebook.com/EGCcommunity" target="_blank" rel="noreferrer" className="w-12 h-12 rounded-full bg-background-card border border-border-dark flex items-center justify-center text-gray-500 hover:text-white hover:border-white/30 hover:bg-white/5 transition-all duration-300">
                            <FaFacebook size={20} />
                        </a>
                        <a href="https://www.instagram.com/tmgn.inc?igsh=MTR4OHYzYXNsYXYxZA%3D%3D&utm_source=qr" target="_blank" rel="noreferrer" className="w-12 h-12 rounded-full bg-background-card border border-border-dark flex items-center justify-center text-gray-500 hover:text-white hover:border-white/30 hover:bg-white/5 transition-all duration-300">
                            <FaInstagram size={20} />
                        </a>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};