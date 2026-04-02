import React, { memo, useRef, useState } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';

const ministries = [
  { id: "seasoned", title: "Seasoned", type: "Life", img: "https://images.unsplash.com/photo-1573497620053-ea5300f94f21?w=800&q=80", desc: "For those 55 and better exploring the rich seasons of life together." },
  { id: "men", title: "Men", type: "Life", img: "https://images.unsplash.com/photo-1520699697851-3dc6abfb5bd0?w=800&q=80", desc: "Building strong men of faith through brotherhood and accountability." },
  { id: "women", title: "Women", type: "Life", img: "https://images.unsplash.com/photo-1502685104226-ee32379fefbe?w=800&q=80", desc: "Empowering women to grow deeply in their identity in Christ." },
  { id: "worship", title: "Worship", type: "Service", img: "https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=800&q=80", desc: "Leading the congregation into life-changing encounters with God." },
  { id: "kids", title: "Kids", type: "Life", img: "https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=800&q=80", desc: "A fun, safe, and engaging environment for children to learn about Jesus." }
];

export const MinistriesCarousel: React.FC = memo(() => {
  const [activeTab, setActiveTab] = useState<"Life" | "Service">("Life");
  const filtered = ministries.filter(m => m.type === activeTab);
  
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const rotateY = useTransform(scrollYProgress, [0, 1], [20, -20]);

  // Card Mouse tracking effect
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    e.currentTarget.style.setProperty('--mouse-x', `${x}px`);
    e.currentTarget.style.setProperty('--mouse-y', `${y}px`);
  };

  return (
    <section id="ministries" ref={containerRef} className="py-32 bg-background-dark relative z-10 w-full overflow-hidden min-h-[100vh] flex flex-col justify-center perspective-[2000px]">
      
      {/* Dynamic Background Text based on active tab */}
      <AnimatePresence mode="wait">
         <motion.div
           key={activeTab}
           initial={{ opacity: 0, y: 100 }}
           animate={{ opacity: 0.05, y: 0 }}
           exit={{ opacity: 0, y: -100 }}
           transition={{ duration: 1 }}
           className="absolute inset-0 flex items-center justify-center pointer-events-none select-none"
         >
           <span className="text-[25vw] sm:text-[30vw] font-black text-white whitespace-nowrap uppercase tracking-tighter mix-blend-overlay">
             {activeTab}
           </span>
         </motion.div>
      </AnimatePresence>

      <div className="max-w-7xl mx-auto px-6 relative z-10 text-center mb-16">
        <h2 className="text-5xl font-black text-white mb-8 tracking-tight">Find Your <span className="text-gold">Circle</span></h2>
        
        <div className="inline-flex bg-white/5 p-1 rounded-full border border-white/10 mb-12">
           <button 
             onClick={() => setActiveTab("Life")}
             className={`px-8 py-3 rounded-full font-bold transition-colors ${activeTab === "Life" ? 'bg-gold text-royal-purple' : 'text-gray-400 hover:text-white'}`}
           >
             Life Groups
           </button>
           <button 
             onClick={() => setActiveTab("Service")}
             className={`px-8 py-3 rounded-full font-bold transition-colors ${activeTab === "Service" ? 'bg-gold text-royal-purple' : 'text-gray-400 hover:text-white'}`}
           >
             Serve Teams
           </button>
        </div>
      </div>

      {/* 3D Carousel View */}
      <div className="w-full relative px-6 md:px-12 flex justify-center py-10">
        <motion.div 
          style={{ rotateY, transformStyle: "preserve-3d" }}
          className="flex flex-wrap justify-center gap-8 max-w-7xl w-full"
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((min, idx) => (
              <motion.div
                key={min.id}
                layout
                initial={{ opacity: 0, scale: 0.8, z: -100 }}
                animate={{ opacity: 1, scale: 1, z: 0 }}
                exit={{ opacity: 0, scale: 0.8, z: -100 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                onMouseMove={handleMouseMove}
                className="group relative w-full max-w-[350px] aspect-[3/4] rounded-3xl overflow-hidden border border-white/10 shadow-[0_30px_50px_rgba(0,0,0,0.5)] cursor-pointer"
                style={{ willChange: "transform, opacity", transformStyle: "preserve-3d" }}
              >
                 <img src={min.img} alt={min.title} loading="lazy" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                 
                 {/* CSS Trick for Glass Follow effect */}
                 <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" 
                      style={{ background: 'radial-gradient(circle 800px at var(--mouse-x) var(--mouse-y), rgba(239, 191, 4, 0.15), transparent 40%)' }}>
                 </div>
                 
                 <div className="absolute inset-0 bg-gradient-to-t from-background-dark/95 via-background-dark/50 to-transparent flex flex-col justify-end p-8" style={{ transform: "translateZ(30px)" }}>
                    <h3 className="text-3xl font-bold text-white mb-3 tracking-tight group-hover:text-gold transition-colors">{min.title}</h3>
                    <p className="text-gray-300 font-light leading-relaxed mb-6">{min.desc}</p>
                    <button className="self-start uppercase text-xs font-bold tracking-widest text-gold pb-1 border-b border-gold/30 hover:border-gold transition-colors">Join Group</button>
                 </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

    </section>
  );
});

MinistriesCarousel.displayName = "MinistriesCarousel";
