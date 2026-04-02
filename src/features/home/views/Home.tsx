import React from 'react';
import { HeroSection } from './HeroSection';
import { Contact } from '../../contact/views/Contact';
import { useHomeViewModel } from '../viewModels/useHomeViewModel';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

export const Home: React.FC = () => {
  const { ministries, isLoading } = useHomeViewModel();
  const featuredMinistries = ministries.slice(0, 3);

  return (
    <div className="min-h-screen bg-background-dark max-w-[100vw] overflow-x-hidden">
      <HeroSection />

      {/* --- Snapshot: Ministries --- */}
      <section className="py-24 px-6 bg-[#F4EDFB] relative z-10 overflow-hidden">
        {/* Subtle Gold Background Accents */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gold/10 rounded-full blur-[120px] pointer-events-none transform translate-x-1/3 -translate-y-1/3"></div>
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-gold/10 rounded-full blur-[100px] pointer-events-none transform -translate-x-1/3 translate-y-1/3"></div>

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
               <Link to="/ministries" className="inline-flex items-center text-royal-purple font-bold hover:text-gold transition-colors group">
                  See All Ministries
                  <svg className="w-5 h-5 ml-2 group-hover:translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
               </Link>
            </motion.div>
          </div>

          {!isLoading && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {featuredMinistries.map((ministry, idx) => (
                <motion.div 
                  key={ministry.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: idx * 0.15 }}
                  className="group relative h-80 rounded-2xl overflow-hidden border border-gold/20 hover:border-gold/50 transition-all duration-300"
                >
                  <img src={ministry.imageUrl} alt={ministry.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/40 to-transparent opacity-70 group-hover:opacity-90 transition-opacity duration-300"></div>
                  <div className="absolute inset-0 p-6 flex flex-col justify-end">
                    <h3 className="text-2xl font-bold text-white mb-2">{ministry.title}</h3>
                    <p className="text-gray-200 text-sm line-clamp-2">{ministry.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      <Contact />
    </div>
  );
};