import React, { memo } from 'react';
import { motion } from 'framer-motion';

export const AlterOne: React.FC = memo(() => {
    return (
        /* Updated background color to match the deep theme base */
        <section className="relative w-full z-10 py-24 overflow-hidden bg-[#0C0515]">

            {/* Background Ambience - Adding depth with theme-consistent orbs */}
            <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-royal-purple/10 rounded-full blur-[120px] pointer-events-none -z-10" />
            <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-gold/5 rounded-full blur-[100px] pointer-events-none -z-10" />

            <div className="max-w-7xl mx-auto px-6 relative z-10">

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-16"
                >
                    <div className="flex items-center justify-center gap-4 mb-4">
                        <div className="h-px w-8 bg-gold"></div>
                        <span className="text-gold font-bold uppercase tracking-[0.25em] text-xs">Our Leadership</span>
                        <div className="h-px w-8 bg-gold"></div>
                    </div>
                    <h2 className="text-4xl md:text-5xl font-black text-white tracking-tighter">
                        A Heart for <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold-light to-gold italic pr-2">Service</span>
                    </h2>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="relative aspect-square md:aspect-[4/5] rounded-[2.5rem] overflow-hidden border border-white/10 shadow-2xl group"
                    >
                        <img
                            src="/assets/Photos/SamplePastor.jpg"
                            alt="Leadership guiding the community"
                            className="w-full h-full object-cover grayscale-[20%] group-hover:grayscale-0 transition-all duration-700"
                        />
                        {/* Gradient overlay for text readability and cinematic depth */}
                        <div className="absolute inset-0 bg-gradient-to-t from-[#0C0515] via-transparent to-transparent opacity-80"></div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="flex flex-col justify-center"
                    >
                        <h3 className="text-3xl font-bold text-white mb-6">Shepherding the Community</h3>
                        <p className="text-gray-300 font-light leading-relaxed mb-6 text-lg">
                            At TMGN, we believe that true leadership is rooted in humility and genuine care. Our pastoral team is dedicated to creating a safe space where individuals can encounter grace, discover their purpose, and grow deeply in their faith.
                        </p>
                        <p className="text-gray-300 font-light leading-relaxed mb-8 text-lg">
                            We are not just building a church; we are raising a family. Every message, every ministry, and every gathering is intentionally designed to point people back to the love of Christ and empower them to impact their own communities.
                        </p>
                        <blockquote className="border-l-4 border-gold pl-6 py-2 bg-white/5 rounded-r-2xl">
                            <p className="italic text-white/90 text-xl font-serif">
                                "Leading by example, serving with compassion, and building a foundation of unwavering faith."
                            </p>
                        </blockquote>
                    </motion.div>
                </div>

            </div>
        </section>
    );
});

AlterOne.displayName = "AlterOne";