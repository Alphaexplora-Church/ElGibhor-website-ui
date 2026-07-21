import React, { memo, useState } from 'react';
import { motion } from 'framer-motion';

export const AlterTwo: React.FC = memo(() => {
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

    // 36 slots para sa collage gamit ang gal1 to gal20 na naka-loop
    // OPTIMIZATION: Idinagdag ang w_600,c_limit para tipid sa Cloudinary bandwidth/credits
    const galleryImages = Array.from({ length: 21 }, (_, i) => {
        const imageNum = (i % 21) + 1; // Naglo-loop mula 1 hanggang 21
        return `https://res.cloudinary.com/djben2yoo/image/upload/f_auto,q_auto,w_600,c_limit/v1778966222/gal${imageNum}.jpg`;
    });

    // Iba't ibang aspect ratios para magkaroon ng dynamic widths ang bawat picture
    const aspectClasses = [
        'aspect-video',
        'aspect-square',
        'aspect-[4/3]',
        'aspect-[3/2]',
        'aspect-[3/4]',
        'aspect-[5/4]',
    ];

    return (
        <section id="altertwo" className="relative w-full z-10 py-24 overflow-hidden bg-[#0C0515]">

            {/* Background Ambience */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[80vw] h-[500px] bg-[radial-gradient(ellipse_at_top,rgba(75,42,111,0.2)_0%,transparent_70%)] pointer-events-none"></div>

            <div className="max-w-[1600px] mx-auto px-4 sm:px-6 relative z-10">

                {/* --- HEADER --- */}
                <div className="flex flex-col items-center text-center mb-16 md:mb-24">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <div className="flex items-center justify-center gap-4 mb-6">
                            <div className="h-px w-12 bg-gradient-to-r from-transparent to-gold"></div>
                            <span className="text-gold font-black uppercase tracking-[0.3em] text-xs md:text-sm">
                                Life at TMGAN
                            </span>
                            <div className="h-px w-12 bg-gradient-to-l from-transparent to-gold"></div>
                        </div>

                        <h2 className="text-5xl md:text-7xl font-black text-white tracking-tighter mb-6 leading-tight">
                            A Glimpse into Our <span className="relative inline-block text-transparent bg-clip-text bg-gradient-to-r from-gold to-gold-light italic pr-2">
                                Community
                                <motion.div
                                    className="absolute -bottom-2 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-gold to-transparent"
                                    initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} transition={{ delay: 0.5, duration: 1 }} viewport={{ once: true }}
                                />
                            </span>
                        </h2>

                        <p className="text-gray-400 font-light text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
                            Every face has a story, and every moment is a testament to grace. Explore the genuine connections and vibrant worship that make this community home.
                        </p>
                    </motion.div>
                </div>

                {/* --- FLEXBOX COLLAGE GALLERY --- */}
                <div className="flex flex-wrap gap-3 md:gap-4 justify-center">
                    {galleryImages.map((src, index) => {
                        const isHovered = hoveredIndex === index;
                        const isDimmed = hoveredIndex !== null && hoveredIndex !== index;
                        const baseAspect = aspectClasses[index % aspectClasses.length];

                        return (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 40 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "0px 0px -50px 0px" }}
                                transition={{
                                    duration: 0.8,
                                    delay: (index % 8) * 0.05,
                                    ease: [0.21, 1.11, 0.81, 0.99]
                                }}
                                onMouseEnter={() => setHoveredIndex(index)}
                                onMouseLeave={() => setHoveredIndex(null)}
                                className={`
                  relative flex-grow flex-shrink-0 h-40 sm:h-56 md:h-64 lg:h-80
                  ${baseAspect}
                  rounded-2xl md:rounded-[2rem] overflow-hidden cursor-pointer
                  transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)]
                  ${isHovered ? 'scale-[1.03] z-20 shadow-[0_20px_50px_rgba(239,191,4,0.15)] ring-1 ring-gold/30' : 'z-10'}
                  ${isDimmed ? 'opacity-20 scale-[0.98]' : 'opacity-100'}
                `}
                            >
                                <img
                                    src={src}
                                    alt={`Community moment ${index + 1}`}
                                    loading="lazy"
                                    className="w-full h-full object-cover transition-transform duration-[2s] hover:scale-110"
                                />

                                {/* Subtle Inner Overlay */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60"></div>

                                {/* Hover Accent */}
                                <div className={`absolute bottom-6 left-6 right-6 transition-all duration-500 transform ${isHovered ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
                                    <div className="h-[2px] w-8 bg-gold mb-2"></div>
                                </div>
                            </motion.div>
                        );
                    })}

                    {/* Spacer div para hindi ma-stretch nang sobra ang huling picture sa row */}
                    <div className="flex-grow-[10] h-0"></div>
                </div>

            </div>

            <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[#0C0515] to-transparent pointer-events-none"></div>
        </section>
    );
});

AlterTwo.displayName = "AlterTwo";