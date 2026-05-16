import React, { memo } from 'react';
import { motion } from 'framer-motion';

export const AlterOne: React.FC = memo(() => {
    return (
        <section id="alterone" className="relative w-full z-10 py-24 overflow-hidden bg-[#0C0515]">

            {/* Background Ambience */}
            <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-royal-purple/10 rounded-full blur-[120px] pointer-events-none -z-10" />
            <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-gold/5 rounded-full blur-[100px] pointer-events-none -z-10" />

            <div className="max-w-7xl mx-auto px-6 relative z-10">

                {/* --- SECTION HEADER --- */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-16 md:mb-24"
                >
                    <div className="flex items-center justify-center gap-4 mb-6">
                        <div className="h-px w-10 bg-gold/50"></div>
                        <span className="text-gold font-black uppercase tracking-[0.3em] text-xs">Our Leadership</span>
                        <div className="h-px w-10 bg-gold/50"></div>
                    </div>
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white tracking-tighter leading-[1.1]">
                        A Heart for <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold-light to-gold italic pr-2">Service</span>
                    </h2>
                </motion.div>

                {/* --- CONTENT LAYOUT --- */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">

                    {/* Image Column */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="lg:col-span-5 relative aspect-square md:aspect-[4/5] rounded-[2.5rem] overflow-hidden border border-white/10 shadow-2xl group"
                    >
                        <img
                            src="/assets/Photos/newimg1.jpg"
                            alt="Leadership guiding the community"
                            className="w-full h-full object-cover grayscale-[20%] group-hover:grayscale-0 transition-all duration-700"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#0C0515] via-transparent to-transparent opacity-80"></div>
                    </motion.div>

                    {/* Description Column */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="lg:col-span-7 flex flex-col justify-center"
                    >
                        <h3 className="text-2xl md:text-3xl font-black text-white tracking-tight mb-6 leading-tight">
                            Shepherding the Community
                        </h3>

                        <div className="space-y-6 text-gray-300 text-base md:text-lg font-light leading-relaxed">
                            <p>
                                At TMGAN, we believe that true leadership is rooted in humility and genuine care. Our pastoral team is dedicated to creating a safe space where individuals can encounter grace, discover their purpose, and grow deeply in their faith.
                            </p>
                            <p>
                                We are not just building a church; we are raising a family. Every message, every ministry, and every gathering is intentionally designed to point people back to the love of Christ and empower them to impact their own communities.
                            </p>

                            <blockquote className="border-l-4 border-gold pl-6 py-3 bg-white/[0.02] rounded-r-2xl my-6 border-y border-r border-white/5">
                                {/* FIXED: Removed font-serif to maintain theme-wide uniform typography */}
                                <p className="italic text-white/90 text-lg md:text-xl font-sans tracking-wide leading-relaxed">
                                    "Leading by example, serving with compassion, and building a foundation of unwavering faith."
                                </p>
                            </blockquote>
                        </div>
                    </motion.div>
                </div>

            </div>
        </section>
    );
});

AlterOne.displayName = "AlterOne";