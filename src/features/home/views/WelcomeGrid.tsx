import React, { memo } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useHomeViewModel } from '../viewModels/useHomeViewModel'; // Adjust path if necessary

export const WelcomeGrid: React.FC = memo(() => {
  const { ministries, isLoading } = useHomeViewModel();
  const featuredMinistries = ministries.slice(0, 3);

  return (
    <section className="py-24 px-6 bg-[#F4EDFB] relative z-10 overflow-hidden">
      {/* Subtle Gold Background Accents - Optimized with radial-gradient to prevent scroll lag */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[radial-gradient(circle,rgba(239,191,4,0.1)_0%,transparent_70%)] pointer-events-none transform translate-x-1/3 -translate-y-1/3"></div>
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[radial-gradient(circle,rgba(239,191,4,0.1)_0%,transparent_70%)] pointer-events-none transform -translate-x-1/3 translate-y-1/3"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center space-x-4 mb-3">
              <div className="w-10 h-1 bg-gradient-to-r from-gold to-gold-light rounded-full"></div>
              <span className="text-gold font-bold uppercase tracking-widest text-sm">Community</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-gray-900">Find Your <span className="text-royal-purple">Place</span></h2>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mt-6 md:mt-0"
          >
            <Link to="/experience#ministries" className="inline-flex items-center text-royal-purple font-bold hover:text-gold transition-colors group">
              See All Ministries
              <svg className="w-5 h-5 ml-2 group-hover:translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
            </Link>
          </motion.div>
        </div>

        {!isLoading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {featuredMinistries.map((ministry, idx) => (
              <motion.div
                key={ministry.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.15 }}
                className="group relative w-full aspect-[4/3] sm:aspect-square md:aspect-auto md:h-80 rounded-2xl overflow-hidden cursor-pointer shadow-lg will-change-transform"
              >
                <img src={ministry.imageUrl} alt={ministry.title} className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 opacity-90 group-hover:opacity-100" />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/40 to-transparent"></div>
                <div className="absolute inset-0 p-6 md:p-8 flex flex-col justify-end pointer-events-none">
                  <h3 className="text-xl md:text-2xl font-bold text-white group-hover:text-gold transition-colors mb-2">{ministry.title}</h3>
                  <p className="text-gray-200 text-xs md:text-sm opacity-0 max-h-0 group-hover:opacity-100 group-hover:max-h-24 transition-all duration-500 ease-in-out font-light">{ministry.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Reassurance Strip */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.8 }}
          className="mt-16 md:mt-20 pt-8 md:pt-10 border-t border-gray-300 grid grid-cols-2 sm:grid-cols-4 gap-4 md:gap-6 text-royal-purple-dark font-medium tracking-wide uppercase text-xs md:text-sm text-center md:text-left will-change-opacity"
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