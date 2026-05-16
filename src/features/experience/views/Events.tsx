import React, { memo } from 'react';
import { motion } from 'framer-motion';
import { useEventsViewModel } from '../events/useEventsViewModel';

const PLACEHOLDER_IMG = "https://c.pxhere.com/photos/15/67/banner_header_easter_cross_sunset_sunrise_hill_sky-645931.jpg!d";

export const Events: React.FC = memo(() => {
  const { isLoading, error, featuredEvent, secondaryEvents, announcements } = useEventsViewModel();

  return (
    <section id="events" className="py-24 bg-background-dark relative z-10 w-full overflow-hidden">
      {/* Subtle ambient background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-[radial-gradient(ellipse_at_top,rgba(239,191,4,0.08),transparent_70%)] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">

        {/* Section Header */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <div className="flex items-center space-x-4 mb-4">
              <div className="w-12 h-px bg-gold"></div>
              <span className="text-gold font-bold uppercase tracking-[0.2em] text-sm">Experience</span>
            </div>
            <h2 className="text-5xl md:text-6xl font-black text-white tracking-tighter">
              Upcoming <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold-light to-gold">Events</span>
            </h2>
          </motion.div>
          <motion.button
            initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
            className="hidden md:flex items-center text-gray-300 hover:text-white transition-colors group font-bold"
          >
            View Full Calendar
            <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
          </motion.button>
        </div>

        {/* Loading / Error States */}
        {isLoading && (
          <div className="flex justify-center py-20">
            <div className="w-10 h-10 border-t-2 border-r-2 border-gold rounded-full animate-spin"></div>
          </div>
        )}
        {error && (
          <div className="text-center py-20 text-red-400 font-bold bg-red-500/10 rounded-2xl border border-red-500/20 backdrop-blur-md">
            {error}
          </div>
        )}

        {/* --- MAIN EDITORIAL LAYOUT --- */}
        {!isLoading && !error && (
          // Fixed Spacing: Changed h-[650px] to min-h-[650px] and increased bottom margin (mb-24) to prevent overlap
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 mb-24 lg:min-h-[650px] items-stretch">

            {/* Featured Hero Event */}
            {featuredEvent && (
              <motion.div
                initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}
                className="lg:col-span-8 group relative rounded-[2rem] overflow-hidden min-h-[450px] lg:min-h-[650px] cursor-pointer shadow-2xl border border-white/5 flex flex-col"
              >
                {/* FIXED: Added onError fallback so broken images swap to placeholder instantly */}
                <img
                  src={(featuredEvent.hasImage && featuredEvent.img) ? featuredEvent.img : PLACEHOLDER_IMG}
                  onError={(e) => {
                    e.currentTarget.onerror = null; // prevents looping
                    e.currentTarget.src = PLACEHOLDER_IMG;
                  }}
                  alt={featuredEvent.title}
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background-dark via-background-dark/60 to-transparent opacity-90 group-hover:opacity-100 transition-opacity duration-500"></div>

                <div className="relative z-10 p-8 md:p-12 flex flex-col justify-end h-full">
                  <div className="flex items-center gap-3 mb-4 flex-wrap">
                    {featuredEvent.category && (
                      <span className="px-4 py-1.5 rounded-full bg-gold text-royal-purple-dark text-xs font-black uppercase tracking-wider">
                        {featuredEvent.category}
                      </span>
                    )}
                    <span className="text-gold-light font-bold text-sm tracking-wide flex items-center bg-black/40 px-3 py-1.5 rounded-lg backdrop-blur-md">
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                      {featuredEvent.location}
                    </span>
                  </div>

                  <h3 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-4 leading-tight">{featuredEvent.title}</h3>
                  <p className="text-gray-300 text-lg md:text-xl max-w-2xl font-light mb-6 line-clamp-2">{featuredEvent.desc}</p>

                  <div className="flex flex-col sm:flex-row gap-4 text-sm font-bold text-white/70">
                    <div className="flex items-center gap-2">
                      <span className="text-gold uppercase text-[10px] tracking-widest">Starts:</span>
                      <span>{featuredEvent.startFull}</span>
                    </div>
                    {featuredEvent.endFull && (
                      <div className="flex items-center gap-2 sm:border-l sm:border-white/20 sm:pl-4">
                        <span className="text-gold uppercase text-[10px] tracking-widest">Ends:</span>
                        <span>{featuredEvent.endFull}</span>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            )}

            {/* Secondary Events Grid - Flex layout forces items to stretch and fill all space */}
            <div className="lg:col-span-4 flex flex-col gap-4 lg:gap-6 h-full">
              {secondaryEvents.map((ev, idx) => (
                <motion.div
                  key={ev.id}
                  initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: idx * 0.2 }}
                  // flex-1 forces the cards to perfectly fill the empty vertical space without gaps
                  className="group relative flex-1 flex flex-col rounded-[2rem] overflow-hidden cursor-pointer border border-white/5 bg-white/5 hover:bg-white/10 transition-colors duration-300 min-h-[200px]"
                >
                  <div className="h-32 lg:h-[45%] relative overflow-hidden shrink-0 bg-background-dark/50">
                    {/* FIXED: Added onError fallback for broken secondary images too */}
                    <img
                      src={(ev.hasImage && ev.img) ? ev.img : PLACEHOLDER_IMG}
                      onError={(e) => {
                        e.currentTarget.onerror = null;
                        e.currentTarget.src = PLACEHOLDER_IMG;
                      }}
                      alt={ev.title}
                      className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity group-hover:scale-105 duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#140a24] to-transparent"></div>
                    {ev.category && (
                      <span className="absolute top-4 left-4 px-3 py-1 rounded-full bg-gold/90 text-royal-purple-dark text-[10px] font-black uppercase shadow-md">
                        {ev.category}
                      </span>
                    )}
                  </div>

                  {/* Content area flexes to fill the rest of the bottom space */}
                  <div className="p-5 lg:p-6 relative z-10 flex-1 flex flex-col justify-end -mt-8 bg-gradient-to-b from-transparent via-[#140a24]/90 to-[#140a24]">
                    <h3 className="text-lg lg:text-xl font-bold text-white mb-2 group-hover:text-gold-light transition-colors line-clamp-1">{ev.title}</h3>
                    <p className="text-gray-400 text-xs font-light line-clamp-2 mb-4">{ev.desc}</p>

                    <div className="flex flex-col gap-1.5 text-[10px] lg:text-[11px] font-bold mt-auto">
                      <span className="text-gold tracking-widest flex items-center gap-2">
                        <svg className="w-3.5 h-3.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                        <span className="truncate">{ev.startFull}</span>
                      </span>
                      <span className="text-gray-400 flex items-center gap-2">
                        <svg className="w-3.5 h-3.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                        <span className="truncate">{ev.location}</span>
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* --- DASHBOARD-STYLE ANNOUNCEMENTS --- */}
        {!isLoading && announcements.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-[2rem] p-8 md:p-12"
          >
            <div className="flex justify-between items-center mb-8 border-b border-white/10 pb-6">
              <h3 className="text-2xl md:text-3xl font-bold text-white">More Announcements</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6">
              {announcements.map((ann) => (
                <div
                  key={ann.id}
                  className="group flex items-center justify-between p-4 -mx-4 rounded-xl hover:bg-white/5 transition-all duration-300 cursor-pointer"
                >
                  <div className="flex items-start gap-4 overflow-hidden">
                    <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center flex-shrink-0 group-hover:bg-gold group-hover:border-gold transition-all duration-400 group-hover:shadow-[0_0_20px_rgba(239,191,4,0.25)] group-hover:-translate-y-1">
                      <svg className="w-5 h-5 text-gold group-hover:text-royal-purple-dark transition-colors duration-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div className="min-w-0">
                      <h4 className="text-lg font-bold text-white group-hover:text-gold transition-colors truncate">{ann.title}</h4>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="px-2 py-0.5 rounded bg-white/10 text-gold text-[10px] font-bold uppercase tracking-wider whitespace-nowrap">{ann.tag}</span>
                        <p className="text-sm text-gray-400 font-light flex items-center gap-1 truncate">
                          <svg className="w-3 h-3 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                          {ann.date}
                        </p>
                      </div>
                    </div>
                  </div>
                  <svg className="w-5 h-5 text-gray-500 group-hover:text-gold transform group-hover:translate-x-1 transition-all shrink-0 ml-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Mobile View Calendar Button */}
        <button className="md:hidden w-full mt-8 py-4 rounded-xl border border-white/20 text-white font-bold hover:bg-white/5 transition-colors flex items-center justify-center">
          View Full Calendar
        </button>

      </div>
    </section>
  );
});

Events.displayName = "Events";