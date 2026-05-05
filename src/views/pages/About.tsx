import React from 'react';
import { motion } from 'framer-motion';

export const About: React.FC = () => {
    return (
        <div className="min-h-screen bg-[#F4EDFB] pt-32 pb-24 overflow-x-hidden border-t border-purple-200 flex flex-col items-center">

            {/* Header */}
            <div className="text-center mb-24 px-6 relative w-full">
                <div className="absolute top-0 right-1/4 w-[30rem] h-[30rem] bg-gold/15 rounded-full blur-[120px] pointer-events-none"></div>
                <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-gold/10 rounded-full blur-[100px] pointer-events-none"></div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center justify-center space-x-4 mb-6 relative z-10"
                >
                    <div className="w-12 h-[2px] bg-gold rounded-full"></div>
                    <span className="text-gold font-bold uppercase tracking-[0.3em] text-sm">Our Identity</span>
                    <div className="w-12 h-[2px] bg-gold rounded-full"></div>
                </motion.div>
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="text-5xl md:text-7xl lg:text-8xl font-black text-gray-900 tracking-tighter relative z-10"
                >
                    All for the <span className="text-royal-purple italic pr-4">Glory</span> of God.
                </motion.h1>
            </div>

            <div className="max-w-6xl mx-auto w-full px-6 flex flex-col gap-12 lg:gap-24 relative z-10">

                {/* Mission Block */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="w-full bg-[#fcf9ff] border border-purple-100 p-10 md:p-16 rounded-[3rem] relative overflow-hidden group shadow-xl flex flex-col items-center text-center"
                >
                    <div className="absolute inset-0 bg-gradient-to-br from-royal-purple/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                    <svg className="w-12 h-12 text-gold mb-8 opacity-80" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2L2 22h20L12 2zm0 4.5l6.5 13h-13L12 6.5z" /></svg>
                    <h3 className="text-2xl md:text-4xl font-bold text-gray-900 mb-6 leading-snug">
                        A movement of devoted Christ-followers dedicated to guiding others in their faith journey.
                    </h3>
                    <p className="text-gray-600 text-lg md:text-xl font-light max-w-2xl">
                        At The Mighty God of All Nations Inc., we believe in walking life together. Whether you are spiritually seeking, looking for community, or seeking growth, you have a place here.
                    </p>
                </motion.div>

                <div className="flex flex-col lg:flex-row gap-8">
                    {/* The Tagline */}
                    <motion.div
                        initial={{ opacity: 0, x: -40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="flex-1 bg-royal-purple border border-royal-purple-light p-10 md:p-14 rounded-[3rem] relative overflow-hidden shadow-xl flex items-center"
                    >
                        <div className="absolute -left-10 -top-10 w-64 h-64 bg-gold/10 rounded-full blur-[60px] pointer-events-none"></div>
                        <div>
                            <span className="text-gold font-bold uppercase tracking-widest text-xs mb-4 block">Our Tagline</span>
                            <h2 className="text-5xl md:text-6xl font-black text-white italic drop-shadow-xl">
                                "Go and Make Disciples."
                            </h2>
                        </div>
                    </motion.div>

                    {/* Community Grid */}
                    <motion.div
                        initial={{ opacity: 0, x: 40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="flex-1 grid grid-cols-2 gap-4"
                    >
                        {['Families', 'Youth', 'Seeking Individuals', 'Growing Believers'].map((item, idx) => (
                            <div key={idx} className="bg-white border border-purple-100 p-8 rounded-3xl flex flex-col items-center justify-center text-center hover:shadow-lg transition-all group">
                                <div className="w-10 h-10 rounded-full bg-gold/10 text-gold flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                                </div>
                                <span className="font-bold text-gray-800">{item}</span>
                            </div>
                        ))}
                    </motion.div>
                </div>

            </div>
        </div>
    );
};
