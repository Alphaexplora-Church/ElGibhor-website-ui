import React from 'react';
import { motion } from 'framer-motion';
import { FaFacebook, FaInstagram, FaMapMarkerAlt, FaClock } from 'react-icons/fa';

export const Connect: React.FC = () => {
    return (
        <div className="min-h-screen bg-background-dark pt-32 pb-24 px-6 overflow-x-hidden border-t border-border-dark flex flex-col items-center">
            
            {/* Header */}
            <div className="text-center mb-16">
                <motion.span initial={{opacity:0, y:20}} animate={{opacity:1, y:0}} className="text-gold font-bold uppercase tracking-[0.3em] text-sm mb-4 block">Connect with Us</motion.span>
                <motion.h1 initial={{opacity:0, y:20}} animate={{opacity:1, y:0}} transition={{delay:0.1}} className="text-5xl md:text-7xl font-black text-white tracking-tighter">
                   Service <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold-light to-gold-dark italic pr-2">Schedule</span>
                </motion.h1>
            </div>

            <div className="max-w-4xl mx-auto w-full flex flex-col gap-8">
                {/* Glowing Schedule Card - Full Width */}
                <motion.div initial={{opacity:0, y:30}} animate={{opacity:1, y:0}} transition={{delay:0.2}} className="w-full bg-royal-purple border border-royal-purple-light p-10 md:p-16 rounded-3xl relative overflow-hidden shadow-2xl flex flex-col md:flex-row items-center text-center md:text-left justify-between">
                    <div className="absolute -right-10 -top-10 w-64 h-64 bg-gold/20 rounded-full blur-[60px] pointer-events-none"></div>
                    <div>
                        <FaClock className="text-gold text-5xl mb-6 mx-auto md:mx-0" />
                        <h3 className="text-3xl md:text-4xl font-bold text-white mb-2 tracking-tight">Sunday Worship Service</h3>
                        <p className="text-gray-200 text-lg font-light">Join our dedicated family every Sunday morning.</p>
                    </div>
                    <div className="mt-8 md:mt-0 bg-white/10 backdrop-blur-md px-10 py-6 rounded-2xl border border-white/20">
                        <span className="text-gold uppercase tracking-widest text-xs font-bold block mb-1">Time</span>
                        <span className="font-black text-white text-4xl whitespace-nowrap">8:30 AM</span>
                    </div>
                </motion.div>

                {/* Location Cards */}
                <motion.div initial={{opacity:0, y:30}} animate={{opacity:1, y:0}} transition={{delay:0.3}} className="w-full bg-background-card border border-border-dark p-10 md:p-16 rounded-3xl relative overflow-hidden shadow-xl flex flex-col md:flex-row items-center text-center md:text-left justify-between">
                    <div className="absolute -left-10 -bottom-10 w-56 h-56 bg-royal-purple/20 rounded-full blur-[60px] pointer-events-none"></div>
                    <div>
                        <FaMapMarkerAlt className="text-gold text-5xl mb-6 mx-auto md:mx-0" />
                        <h3 className="text-3xl md:text-4xl font-bold text-white mb-2 tracking-tight">Our Location</h3>
                        <p className="text-gray-300 text-lg font-light">Visit us at our beautiful sanctuary.</p>
                    </div>
                    <div className="mt-8 md:mt-0 bg-white/5 backdrop-blur-md px-8 py-6 rounded-2xl border border-white/10">
                        <p className="text-gray-200 font-light">123 Faith Street<br/>Your City, State ZIP</p>
                    </div>
                </motion.div>

                {/* Social & Contact Links */}
                <motion.div initial={{opacity:0, y:30}} animate={{opacity:1, y:0}} transition={{delay:0.4}} className="w-full text-center">
                    <h3 className="text-2xl font-bold text-white mb-8">Follow Our Journey</h3>
                    <div className="flex justify-center gap-6">
                        <a href="https://www.facebook.com/EGCcommunity" target="_blank" rel="noreferrer" className="w-16 h-16 rounded-full bg-background-card border border-border-dark flex items-center justify-center text-gold hover:text-white hover:border-gold hover:bg-gold/10 transition-all duration-300">
                            <FaFacebook size={28} />
                        </a>
                        <a href="https://www.instagram.com/tmgn.inc?igsh=MTR4OHYzYXNsYXYxZA%3D%3D&utm_source=qr" target="_blank" rel="noreferrer" className="w-16 h-16 rounded-full bg-background-card border border-border-dark flex items-center justify-center text-gold hover:text-white hover:border-gold hover:bg-gold/10 transition-all duration-300">
                            <FaInstagram size={28} />
                        </a>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};