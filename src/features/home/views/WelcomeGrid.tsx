import React, { memo } from 'react';
import { motion } from 'framer-motion';

import { useScroll, useTransform } from 'framer-motion';
import { useMediaQuery } from '../../../shared/hooks/useMediaQuery';
import { PremiumCard } from '../../../shared/components/PremiumCard';

const gridItems = [
  { img: 'https://8482942.fs1.hubspotusercontent-na1.net/hub/8482942/hubfs/family-pray-together-praying-with-parent-at-home.jpg_s=1024x1024&w=is&k=20&c=yNhzndyaBEL7hGr4mYLAF7P-DHhmwNzgsc3aq9GuH_Q=.jpg?width=684&name=family-pray-together-praying-with-parent-at-home.jpg_s=1024x1024&w=is&k=20&c=yNhzndyaBEL7hGr4mYLAF7P-DHhmwNzgsc3aq9GuH_Q=.jpg', text: 'Come as you are' },
  { img: 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=800&q=80', text: 'Real friendships await' },
  { img: 'https://ymi.today/wp-content/uploads/2023/02/WHY-CHRISTIAN-COMMUNITY-MATTERS-1024x423.jpg', text: 'Encounter His presence' }
];

export const WelcomeGrid: React.FC = memo(() => {
  const { scrollY } = useScroll();
  const isMobile = useMediaQuery('(max-width: 768px)');
  const imgY = useTransform(scrollY, [0, 800], [0, isMobile ? 30 : 80]);

  return (
    <section className="py-12 md:py-16 relative z-10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {gridItems.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: idx * 0.15 }}
              className={`relative rounded-2xl min-h-[260px] sm:min-h-[320px] md:h-[340px] w-full`}
            >
              <PremiumCard className="w-full h-full rounded-3xl overflow-hidden shadow-2xl">
                <motion.div 
                  className="absolute inset-x-0 top-[-10%] bottom-[-10%] w-full"
                  style={{ y: imgY }}
                >
                  <img
                    src={item.img}
                    alt={item.text}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                </motion.div>
                <div className="absolute inset-0 bg-gradient-to-t from-royal-purple-dark/80 via-royal-purple-dark/20 to-transparent md:via-transparent pointer-events-none"></div>
                <h3 className="absolute bottom-6 left-6 md:bottom-8 md:left-8 text-xl md:text-2xl font-bold text-white drop-shadow-md tracking-tight pr-4 pointer-events-none">
                  {item.text}
                </h3>
              </PremiumCard>
            </motion.div>
          ))}
        </div>

        {/* Reassurance Strip */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.8 }}
          className="mt-16 md:mt-20 pt-8 md:pt-10 border-t border-gray-200 grid grid-cols-2 sm:grid-cols-4 gap-4 md:gap-6 text-royal-purple-dark font-medium tracking-wide uppercase text-xs md:text-sm text-center md:text-left"
        >
          <span className="flex items-center justify-center md:justify-start">Free Coffee</span>
          <span className="flex items-center justify-center md:justify-start">Casual Dress code</span>
          <span className="flex items-center justify-center md:justify-start">Kids Programs</span>
          <span className="flex items-center justify-center md:justify-start">Secure Parking</span>
        </motion.div>
      </div>
    </section>
  );
});

WelcomeGrid.displayName = "WelcomeGrid";
