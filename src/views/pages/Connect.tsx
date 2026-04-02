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

                <div className="flex flex-col md:flex-row gap-8">
                    {/* Map/Location Card */}
                    <motion.div initial={{opacity:0, y:30}} animate={{opacity:1, y:0}} transition={{delay:0.3}} className="flex-1 bg-background-card border border-border-dark p-10 rounded-3xl relative overflow-hidden shadow-xl">
                        <div className="absolute -bottom-10 -right-10 opacity-5 pointer-events-none">
                            <FaMapMarkerAlt className="text-[12rem] text-white" />
                        </div>
                        <FaMapMarkerAlt className="text-gold text-4xl mb-6 relative z-10" />
                        <h3 className="text-2xl font-bold text-white mb-4 relative z-10">Location</h3>
                        <p className="text-gray-300 font-light text-lg leading-relaxed mb-8 relative z-10">
                            CES Center, 217 Malaya St.<br/>
                            <span className="text-white mt-1 block font-medium">Malanday, Marikina City</span>
                        </p>
                        <a href="https://www.google.com/maps/place/Ate+Ces+Headquarters,+217+Malaya+St,+Marikina,+1800+Metro+Manila/@14.649579,121.0906994,17z/data=!3m1!4b1!4m6!3m5!1s0x3397b9c4f3912a23:0x474a5534547336af!8m2!3d14.649579!4d121.0932743!16s%2Fg%2F11r1rycbcl?entry=ttu&g_ep=EgoyMDI2MDMzMC4wIKXMDSoASAFQAw%3D%3D" target="_blank" rel="noreferrer" className="inline-flex px-6 py-3 bg-gold/10 text-gold rounded-full text-sm font-bold uppercase tracking-wider hover:bg-gold hover:text-royal-purple-dark transition-colors relative z-10 items-center">
                            Get Directions <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7"/></svg>
                        </a>
                    </motion.div>

                    {/* Social Links Column */}
                    <motion.div initial={{opacity:0, y:30}} animate={{opacity:1, y:0}} transition={{delay:0.4}} className="flex-1 flex flex-col gap-8">
                         <a href="https://www.facebook.com/EGCcommunity" target="_blank" rel="noreferrer" className="flex-1 bg-background-card border border-border-dark p-8 rounded-3xl flex flex-col items-center justify-center hover:bg-gold hover:text-royal-purple group transition-all shadow-lg overflow-hidden relative">
                             <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                             <FaFacebook className="text-5xl text-gray-400 group-hover:text-royal-purple mb-4 transition-colors relative z-10" />
                             <span className="text-sm font-bold uppercase tracking-[0.2em] text-gray-500 group-hover:text-royal-purple relative z-10">Official Facebook</span>
                         </a>
                         <a href="https://www.instagram.com/tmgn.inc?igsh=MTR4OHYzYXNsYXYxZA%3D%3D&utm_source=qr" target="_blank" rel="noreferrer" className="flex-1 bg-background-card border border-border-dark p-8 rounded-3xl flex flex-col items-center justify-center hover:bg-gold hover:text-royal-purple group transition-all shadow-lg overflow-hidden relative">
                             <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                             <FaInstagram className="text-5xl text-gray-400 group-hover:text-royal-purple mb-4 transition-colors relative z-10" />
                             <span className="text-sm font-bold uppercase tracking-[0.2em] text-gray-500 group-hover:text-royal-purple relative z-10">Official Instagram</span>
                         </a>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};
