import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export const Services: React.FC = () => {
    const services = [
        { name: "Worship Services", desc: "Join us in exalting God through powerful praise and deeply moving messages.", img: "https://images.unsplash.com/photo-1438232992991-995b7058bbb3?w=800&q=80", tag: "Gathering" },
        { name: "Discipleship Groups", desc: "Grow deeply in your faith surrounded by a supportive, tight-knit community.", img: "https://images.unsplash.com/photo-1445445290350-18a3b86e0b5b?w=800&q=80", tag: "Community" },
        { name: "Pastoral Care", desc: "Compassionate counseling and support to help you through life's challenges.", img: "https://images.unsplash.com/photo-1544427920-c49ccfbc3af5?w=800&q=80", tag: "Support" },
        { name: "Weddings", desc: "Celebrate your sacred union in a beautiful, God-centered environment.", img: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=800&q=80", tag: "Ceremony" },
        { name: "Baptism Services", desc: "Publicly declare your faith and step forward into your new life in Christ.", img: "https://images.unsplash.com/photo-1510214681659-3d12d4a544d6?w=800&q=80", tag: "Sacrament" },
        { name: "Outreach Programs", desc: "Serving our local community and spreading His love through action.", img: "https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=800&q=80", tag: "Action" }
    ];

    const { scrollYProgress } = useScroll();
    const yHeader = useTransform(scrollYProgress, [0, 1], [0, 250]);

    return (
        <div className="min-h-screen bg-background-dark overflow-x-hidden border-t border-border-dark">
            
            {/* Parallax Header */}
            <div className="relative h-[50vh] flex items-center justify-center overflow-hidden border-b border-border-dark">
               <motion.div style={{ y: yHeader }} className="absolute inset-0 opacity-20 mix-blend-luminosity">
                   <img src="https://images.unsplash.com/photo-1438232992991-995b7058bbb3?w=1600&q=80" alt="Worship Background" className="w-full h-full object-cover" />
               </motion.div>
               <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background-dark/50 to-background-dark"></div>
               
               <div className="relative z-10 text-center px-6 mt-16">
                 <motion.h1 
                    initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8 }}
                    className="text-5xl md:text-7xl font-black text-white mb-6 uppercase tracking-tighter"
                 >
                    Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold-light to-gold-dark italic">Services</span>
                 </motion.h1>
               </div>
            </div>

            {/* Main Service Grid */}
            <div className="max-w-7xl mx-auto px-6 py-24">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {services.map((service, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 0.6, delay: idx * 0.1 }}
                            className="group rounded-2xl overflow-hidden border border-border-dark hover:border-gold/50 transition-all duration-300 hover:shadow-[0_0_30px_rgba(75,42,111,0.5)]"
                        >
                            {/* Image */}
                            <div className="relative h-80 overflow-hidden">
                                <img 
                                    src={service.img} 
                                    alt={service.name} 
                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-background-dark to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                <div className="absolute top-4 left-4">
                                    <span className="text-gold font-bold uppercase tracking-widest text-xs px-3 py-1 bg-background-dark/80 backdrop-blur-md rounded-full border border-gold/30">
                                        {service.tag}
                                    </span>
                                </div>
                            </div>

                            {/* Content */}
                            <div className="p-6 bg-background-card">
                                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-gold transition-colors">{service.name}</h3>
                                <p className="text-gray-300 text-sm font-light leading-relaxed">{service.desc}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
};