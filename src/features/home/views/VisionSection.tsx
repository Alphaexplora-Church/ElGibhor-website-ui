import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export const VisionSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  const textOpacity = useTransform(scrollYProgress, [0, 0.4, 0.6, 1], [0.2, 1, 1, 0.2]);
  const textY = useTransform(scrollYProgress, [0, 0.4, 0.6, 1], [50, 0, 0, -50]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.95, 1, 1.05]);

  return (
    <section ref={containerRef} className="relative min-h-[80vh] flex items-center justify-center py-24 overflow-hidden z-20">
      <div className="absolute inset-0 pointer-events-none">
         {/* Subtle morphing background specific to Vision */}
         <motion.div 
           className="w-[80vw] h-[80vw] mx-auto mt-[10vh] rounded-[40%_60%_70%_30%/40%_50%_60%_50%] bg-gradient-to-tr from-royal-purple/20 to-gold/10 mix-blend-color-dodge blur-[80px]"
           animate={{
             borderRadius: ["40% 60% 70% 30% / 40% 50% 60% 50%", "60% 40% 30% 70% / 60% 50% 40% 50%", "40% 60% 70% 30% / 40% 50% 60% 50%"],
             rotate: [0, 90, 180, 360],
           }}
           transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
         />
      </div>

      <div className="max-w-5xl mx-auto px-6 relative z-10 text-center">
        <motion.div style={{ opacity: textOpacity, y: textY, scale: scale }}>
            <p className="text-3xl md:text-5xl lg:text-6xl font-black leading-tight tracking-tight text-white mb-8">
              A movement of <span className="text-gold italic font-serif">devoted</span> Christ-followers 
              dedicated to guiding others in their faith journey, 
              all for the <span className="text-royal-purple-light italic font-serif">glory of God</span>.
            </p>
            <div className="w-24 h-1 bg-gold mx-auto rounded-full mt-12 mb-4"></div>
        </motion.div>
      </div>
    </section>
  );
};
