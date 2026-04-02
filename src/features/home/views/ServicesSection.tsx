import React from 'react';
import { motion } from 'framer-motion';

export const ServicesSection: React.FC = () => {
    const services = [
        { name: "Worship Services", desc: "Join us in exalting God through powerful praise and deeply moving messages.", img: "https://images.unsplash.com/photo-1438232992991-995b7058bbb3?w=800&q=80" },
        { name: "Discipleship Groups", desc: "Grow deeply in your faith surrounded by a supportive, tight-knit community.", img: "https://images.unsplash.com/photo-1445445290350-18a3b86e0b5b?w=800&q=80" },
        { name: "Pastoral Care", desc: "Compassionate counseling and support to help you through life's challenges.", img: "https://images.unsplash.com/photo-1544427920-c49ccfbc3af5?w=800&q=80" },
        { name: "Weddings", desc: "Celebrate your sacred union in a beautiful, God-centered environment.", img: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=800&q=80" },
        { name: "Baptism Services", desc: "Publicly declare your faith and step forward into your new life in Christ.", img: "https://images.unsplash.com/photo-1510214681659-3d12d4a544d6?w=800&q=80" },
        { name: "Outreach Programs", desc: "Serving our local community and spreading His love through action.", img: "https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=800&q=80" }
    ];

    return (
        <section id="services" className="py-24 relative bg-background-dark z-10 w-full">
            <div className="max-w-7xl mx-auto px-6">
                
                <div className="mb-16">
                    <h2 className="text-4xl font-black tracking-tight mb-4 text-white">Our <span className="text-gold">Services</span></h2>
                    <p className="text-lg text-gray-300 max-w-2xl font-light">Providing spiritual nourishment, care, and a community where you can grow deeply in your faith journey.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {services.map((service, idx) => (
                        <motion.div 
                            key={idx}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 0.6, delay: idx * 0.1 }}
                            className="group relative h-[22rem] rounded-2xl bg-background-card border border-border-dark overflow-hidden hover:border-gold/50 hover:shadow-[0_0_30px_rgba(75,42,111,0.5)] transition-all duration-500 cursor-pointer"
                        >
                            {/* Background Image Placeholder */}
                            <div className="absolute inset-0">
                                <img src={service.img} alt={service.name} className="w-full h-full object-cover group-hover:scale-110 group-hover:rotate-1 opacity-60 group-hover:opacity-40 transition-transform duration-700 blur-[2px] group-hover:blur-0" />
                                <div className="absolute inset-0 bg-gradient-to-t from-background-card via-background-card/80 to-transparent"></div>
                            </div>
                            
                            <div className="absolute inset-0 p-8 flex flex-col justify-end z-10">
                                <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300 translate-x-4 group-hover:translate-x-0">
                                    <span className="w-12 h-12 rounded-full bg-gold shadow-[0_0_15px_rgba(239,191,4,0.5)] flex items-center justify-center text-royal-purple-dark">
                                        <svg className="w-6 h-6 stroke-[2.5px]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                                    </span>
                                </div>
                                
                                <h3 className="text-2xl font-bold mb-0 group-hover:mb-2 text-white group-hover:text-gold tracking-tight transition-all duration-500 drop-shadow-md">{service.name}</h3>
                                
                                <p className="text-gray-300 text-sm font-light leading-relaxed max-h-0 opacity-0 group-hover:max-h-24 group-hover:opacity-100 transition-all duration-500 delay-75 mb-0 group-hover:mb-4 overflow-hidden">
                                     {service.desc}
                                </p>

                                <div className="h-1.5 w-12 bg-royal-purple rounded-full group-hover:w-full group-hover:bg-gold transition-all duration-500 shadow-sm"></div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};