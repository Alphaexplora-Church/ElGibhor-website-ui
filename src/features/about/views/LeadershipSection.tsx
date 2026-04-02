import React, { useRef, useState, useEffect, memo } from 'react';
import { motion, useMotionValue } from 'framer-motion';

const leaders = [
  { name: "Pastor John Doe", role: "Senior Pastor", img: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=600&q=80" },
  { name: "Ptr. Jane Smith", role: "Executive Pastor", img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=600&q=80" },
  { name: "Ptr. Mark Johnson", role: "Worship Director", img: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=600&q=80" },
  { name: "Ptr. Sarah Davis", role: "Youth Pastor", img: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=600&q=80" },
  { name: "Ptr. Michael Brown", role: "Missions Director", img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=80" }
];

export const LeadershipSection: React.FC = memo(() => {
  const [carouselWidth, setCarouselWidth] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);

  useEffect(() => {
    if (carouselRef.current) {
      setCarouselWidth(carouselRef.current.scrollWidth - carouselRef.current.offsetWidth);
    }
  }, []);

  return (
    <section id="leaders" className="py-32 bg-background-card relative z-10 w-full overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 mb-16 flex justify-between items-end">
         <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight">Our National <span className="text-royal-purple-light">Team</span></h2>
            <p className="text-gray-400 mt-4 max-w-lg">Dedicated men and women serving to expand God's kingdom across the nation.</p>
         </motion.div>
         {/* Drag Indicator */}
         <div className="hidden md:flex items-center text-gold space-x-2 animate-pulse">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" /></svg>
            <span className="text-sm font-bold uppercase tracking-widest">Drag</span>
         </div>
      </div>

      <motion.div ref={carouselRef} className="cursor-grab active:cursor-grabbing overflow-hidden ml-6 lg:ml-[max(1.5rem,calc((100vw-80rem)/2))] pb-12">
        <motion.div 
          drag="x" 
          dragConstraints={{ right: 0, left: -carouselWidth }}
          whileTap={{ cursor: "grabbing" }}
          style={{ x }}
          className="flex space-x-6"
        >
          {leaders.map((leader, idx) => (
            <motion.div 
              key={idx}
              className="min-w-[300px] h-[400px] md:min-w-[400px] md:h-[500px] rounded-3xl overflow-hidden relative group"
            >
               {/* Grayscale by default, color on hover */}
               <img 
                 src={leader.img} 
                 alt={leader.name} 
                 loading="lazy"
                 draggable={false}
                 className="w-full h-full object-cover transition-all duration-700 filter grayscale group-hover:grayscale-0 group-hover:scale-105"
               />
               
               <div className="absolute inset-0 bg-gradient-to-t from-background-dark via-background-dark/40 to-transparent opacity-80 group-hover:opacity-60 transition-opacity duration-300"></div>
               
               <div className="absolute bottom-8 left-8 right-8">
                 <div className="w-12 h-1 bg-gold mb-4 group-hover:w-full transition-all duration-500 ease-out"></div>
                 <h3 className="text-2xl font-bold text-white tracking-tight">{leader.name}</h3>
                 <p className="text-gold font-medium uppercase tracking-widest text-sm">{leader.role}</p>
               </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
});

LeadershipSection.displayName = "LeadershipSection";
