import React from 'react';
import { HeroSection } from '../components/HeroSection';
import { Contact } from './Contact';
import { useHomeViewModel } from '../../viewModels/useHomeViewModel';
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
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {featuredMinistries.map((ministry, idx) => (
                <motion.div
                  key={ministry.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: idx * 0.15 }}
                  className="group relative w-full aspect-[4/3] sm:aspect-square md:aspect-auto md:h-80 rounded-2xl overflow-hidden cursor-pointer shadow-lg"
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
        </div>
      </section>

      {/* --- Snapshot: Services --- */}
      <section className="py-24 px-6 bg-royal-purple-dark/30 border-y border-border-dark relative z-10 w-full overflow-hidden">
        {/* Abstract background flair */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-gold/5 rounded-full blur-[100px] pointer-events-none"></div>

        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-y-10 lg:gap-16 items-center">
            
           {/* Section Title (Order 1) */}
           <motion.div 
             initial={{ opacity: 0, x: 40 }}
             whileInView={{ opacity: 1, x: 0 }}
             viewport={{ once: true }}
             transition={{ duration: 0.8 }}
             className="flex flex-col lg:col-start-1 lg:row-start-1 order-1"
           >
              <span className="text-gold font-bold uppercase tracking-widest text-sm mb-2 block">Our Services</span>
              <h2 className="text-4xl md:text-5xl font-black text-white mb-2 lg:mb-6">Worship, Care, <br/>& <span className="italic font-light">Community</span>.</h2>
           </motion.div>

           {/* Mobile Image (Order 2, sits directly between title and desc on mobile. On desktop spans the right side) */}
           <motion.div 
             initial={{ opacity: 0, scale: 0.9 }}
             whileInView={{ opacity: 1, scale: 1 }}
             viewport={{ once: true }}
             transition={{ duration: 0.8 }}
             className="w-full aspect-square md:aspect-video lg:aspect-auto lg:h-[30rem] rounded-3xl overflow-hidden relative lg:col-start-2 lg:row-start-1 lg:row-span-2 order-2 shadow-2xl"
           >
              <img src="https://images.unsplash.com/photo-1438232992991-995b7058bbb3?w=800&q=80" alt="Worship" className="w-full h-full object-cover opacity-80" />
              <div className="absolute inset-0 border-4 border-gold/20 rounded-3xl scale-95 z-10 pointer-events-none"></div>
              
              <div className="absolute bottom-6 left-6 md:bottom-8 md:left-8 bg-background-card/80 backdrop-blur-md border border-white/10 p-5 md:p-6 rounded-2xl z-20 max-w-[80%] md:max-w-xs shadow-xl hidden sm:block">
                 <h4 className="text-white font-bold text-lg md:text-xl mb-1 md:mb-2">Weekly Gatherings</h4>
                 <p className="text-gray-300 text-xs md:text-sm font-light leading-relaxed">Experience deeply moving worship and spiritually nourishing messages every Sunday.</p>
              </div>
           </motion.div>
           
           {/* Section Description, Bullets, CTA (Order 3) */}
           <motion.div 
             initial={{ opacity: 0, x: 40 }}
             whileInView={{ opacity: 1, x: 0 }}
             viewport={{ once: true }}
             transition={{ duration: 0.8, delay: 0.2 }}
             className="flex flex-col lg:col-start-1 lg:row-start-2 order-3"
           >
              <p className="text-gray-300 text-lg font-light leading-relaxed mb-8">
                 From Sunday worship to personal pastoral counseling, life celebrations, and community outreach. We are a family walking together through every season of life.
              </p>
              
              <ul className="space-y-4 mb-10">
                 {['Inspiring Sunday Worship', 'Intimate Discipleship Groups', 'Compassionate Pastoral Care'].map((item, i) => (
                    <li key={i} className="flex items-center text-gray-200">
                       <span className="w-6 h-6 shrink-0 rounded-full bg-gold/20 flex items-center justify-center mr-4">
                          <svg className="w-3 h-3 text-gold" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                       </span>
                       {item}
                    </li>
                 ))}
              </ul>

              <div className="flex">
                 <Link to="/services" className="px-8 py-4 bg-background-card border border-gold text-white rounded-full font-bold hover:bg-gold hover:text-royal-purple-dark transition-all duration-300 inline-flex items-center group shadow-[0_0_15px_rgba(239,191,4,0.15)]">
                    Explore All Services
                    <svg className="w-5 h-5 ml-2 group-hover:translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                 </Link>
              </div>
           </motion.div>
        </div>
      </section>

      <Contact />
    </div>
  );
};