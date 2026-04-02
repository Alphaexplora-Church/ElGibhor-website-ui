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
                    initial={{opacity:0, y:20}} 
                    animate={{opacity:1, y:0}} 
                    className="flex items-center justify-center space-x-4 mb-6 relative z-10"
                >
                    <div className="w-12 h-[2px] bg-gold rounded-full"></div>
                    <span className="text-gold font-bold uppercase tracking-[0.3em] text-sm">Our Identity</span>
                    <div className="w-12 h-[2px] bg-gold rounded-full"></div>
                </motion.div>
                <motion.h1 
                    initial={{opacity:0, y:20}} 
                    animate={{opacity:1, y:0}} 
                    transition={{delay:0.1}} 
                    className="text-5xl md:text-7xl lg:text-8xl font-black text-gray-900 tracking-tighter relative z-10"
                >
                   All for the <span className="text-royal-purple italic pr-4">Glory</span> of God.
                </motion.h1>
            </div>

            {/* Content Section */}
            <div className="max-w-5xl mx-auto px-6 relative z-10 space-y-16">
                {/* Who We Are */}
                <motion.div
                    initial={{opacity:0, y:30}}
                    whileInView={{opacity:1, y:0}}
                    viewport={{once: true}}
                    transition={{duration:0.8}}
                >
                    <h2 className="text-4xl font-black text-gray-900 mb-6">Who We Are</h2>
                    <p className="text-lg text-gray-700 leading-relaxed font-light">
                        The Mighty God of All Nations Inc. is a vibrant community of Christ-followers dedicated to discipleship, worship, and service. We believe in the transformative power of God's word and the importance of building a thriving community where every person feels valued, supported, and empowered to grow in their faith.
                    </p>
                </motion.div>

                {/* Our Mission */}
                <motion.div
                    initial={{opacity:0, y:30}}
                    whileInView={{opacity:1, y:0}}
                    viewport={{once: true}}
                    transition={{duration:0.8, delay:0.1}}
                >
                    <h2 className="text-4xl font-black text-gray-900 mb-6">Our Mission</h2>
                    <p className="text-lg text-gray-700 leading-relaxed font-light">
                        "Go and Make Disciples" - Our mission is to spread the love of Christ and guide others in their spiritual journey. We are committed to creating an inclusive, welcoming environment where people from all walks of life can experience God's grace, grow in faith, and become agents of positive change in their communities.
                    </p>
                </motion.div>

                {/* Our Values */}
                <motion.div
                    initial={{opacity:0, y:30}}
                    whileInView={{opacity:1, y:0}}
                    viewport={{once: true}}
                    transition={{duration:0.8, delay:0.2}}
                >
                    <h2 className="text-4xl font-black text-gray-900 mb-6">Our Values</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {[
                            { title: 'Faith', desc: 'We trust in God\'s plan and live by His word.' },
                            { title: 'Community', desc: 'We are stronger together in faith and fellowship.' },
                            { title: 'Service', desc: 'We serve others and our community with love and compassion.' },
                            { title: 'Growth', desc: 'We continuously seek spiritual and personal development.' }
                        ].map((value, idx) => (
                            <motion.div
                                key={idx}
                                initial={{opacity:0, x:-20}}
                                whileInView={{opacity:1, x:0}}
                                transition={{delay:0.1 * idx}}
                                className="bg-white/50 backdrop-blur-sm p-6 rounded-xl border border-gold/20"
                            >
                                <h3 className="text-2xl font-bold text-royal-purple mb-3">{value.title}</h3>
                                <p className="text-gray-700 font-light">{value.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </div>
    );
};