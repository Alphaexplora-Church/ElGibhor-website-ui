import React from 'react';
import { motion } from 'framer-motion';

export const About: React.FC = () => {
    return (
        <div className="min-h-screen bg-background-dark pt-24 pb-16 overflow-x-hidden flex flex-col items-center">
            
            {/* Header */}
            <div className="text-center mb-16 px-6 relative w-full">
                <div className="absolute top-0 right-1/4 w-[20rem] h-[20rem] bg-gold/8 rounded-full blur-[100px] pointer-events-none"></div>

                <motion.div 
                    initial={{opacity:0, y:15}} 
                    animate={{opacity:1, y:0}} 
                    className="flex items-center justify-center space-x-3 mb-5 relative z-10"
                >
                    <div className="w-8 h-px bg-gold/60 rounded-full"></div>
                    <span className="text-gold/80 font-semibold uppercase tracking-[0.3em] text-xs">Our Identity</span>
                    <div className="w-8 h-px bg-gold/60 rounded-full"></div>
                </motion.div>
                <motion.h1 
                    initial={{opacity:0, y:15}} 
                    animate={{opacity:1, y:0}} 
                    transition={{delay:0.1}} 
                    className="text-4xl md:text-6xl font-black text-white tracking-tight relative z-10"
                >
                   All for the <span className="text-royal-purple-light italic">Glory</span> of God.
                </motion.h1>
            </div>

            {/* Content Section */}
            <div className="max-w-4xl mx-auto w-full px-6 relative z-10 space-y-10">
                {/* Who We Are */}
                <motion.div
                    initial={{opacity:0, y:20}}
                    whileInView={{opacity:1, y:0}}
                    viewport={{once: true}}
                    transition={{duration:0.7}}
                    className="bg-background-card border border-white/5 rounded-2xl p-8"
                >
                    <h2 className="text-2xl font-bold text-white mb-4">Who We Are</h2>
                    <p className="text-gray-400 leading-relaxed font-light">
                        The Mighty God of All Nations Inc. is a vibrant community of Christ-followers dedicated to discipleship, worship, and service. We believe in the transformative power of God's word and the importance of building a thriving community where every person feels valued, supported, and empowered to grow in their faith.
                    </p>
                </motion.div>

                {/* Our Mission */}
                <motion.div
                    initial={{opacity:0, y:20}}
                    whileInView={{opacity:1, y:0}}
                    viewport={{once: true}}
                    transition={{duration:0.7, delay:0.1}}
                    className="bg-background-card border border-white/5 rounded-2xl p-8"
                >
                    <h2 className="text-2xl font-bold text-white mb-4">Our Mission</h2>
                    <p className="text-gray-400 leading-relaxed font-light">
                        "Go and Make Disciples" — Our mission is to spread the love of Christ and guide others in their spiritual journey. We are committed to creating an inclusive, welcoming environment where people from all walks of life can experience God's grace, grow in faith, and become agents of positive change in their communities.
                    </p>
                </motion.div>

                {/* Our Values */}
                <motion.div
                    initial={{opacity:0, y:20}}
                    whileInView={{opacity:1, y:0}}
                    viewport={{once: true}}
                    transition={{duration:0.7, delay:0.2}}
                >
                    <h2 className="text-2xl font-bold text-white mb-6">Our Values</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {[
                            { title: 'Faith', desc: 'We trust in God\'s plan and live by His word.' },
                            { title: 'Community', desc: 'We are stronger together in faith and fellowship.' },
                            { title: 'Service', desc: 'We serve others and our community with love and compassion.' },
                            { title: 'Growth', desc: 'We continuously seek spiritual and personal development.' }
                        ].map((value, idx) => (
                            <motion.div
                                key={idx}
                                initial={{opacity:0, x:-15}}
                                whileInView={{opacity:1, x:0}}
                                viewport={{once: true}}
                                transition={{delay:0.08 * idx}}
                                className="bg-background-card border border-white/5 p-6 rounded-xl hover:border-gold/20 transition-colors"
                            >
                                <div className="w-1.5 h-1.5 rounded-full bg-gold mb-3"></div>
                                <h3 className="text-lg font-bold text-white mb-2">{value.title}</h3>
                                <p className="text-gray-500 text-sm font-light">{value.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </div>
    );
};