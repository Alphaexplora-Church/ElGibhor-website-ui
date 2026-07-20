import React, { memo } from 'react';
import { motion } from 'framer-motion';
import { useEventsViewModel } from '../events/useEventsViewModel';

const PLACEHOLDER_IMG = "https://c.pxhere.com/photos/15/67/banner_header_easter_cross_sunset_sunrise_hill_sky-645931.jpg!d";

export const Events: React.FC = memo(() => {
  const { isLoading, error, featuredEvent, secondaryEvents: rawSecondaryEvents, announcements } = useEventsViewModel();
  // For testing, limit showing events to 1
  const secondaryEvents = rawSecondaryEvents.slice(0, 2);

  const totalCount = (featuredEvent ? 1 : 0) + secondaryEvents.length;

  const renderComingSoonBanner = (colSpan: string, height: string) => (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, delay: 0.3 }}
      className={`${colSpan} ${height} relative overflow-hidden rounded-3xl border border-dashed border-white/15 bg-background-card/25 flex flex-col items-center justify-center text-center p-8 group hover:border-gold/30 hover:bg-background-card/40 transition-all duration-500 shadow-xl`}
    >
      {/* Ambient background gold glow inside the card */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-gold/5 rounded-full filter blur-2xl pointer-events-none group-hover:bg-gold/10 transition-colors duration-500"></div>

      <div className="relative z-10 flex flex-col items-center max-w-sm">
        <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:border-gold/40 group-hover:shadow-[0_0_20px_rgba(239,191,4,0.1)] transition-all duration-500">
          <svg className="w-8 h-8 text-gold-light" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
          </svg>
        </div>
        <h3 className="text-xl md:text-2xl font-black text-white mb-2 tracking-tight group-hover:text-gold-light transition-colors duration-500">
          More events coming soon!
        </h3>
        <p className="text-sm text-gray-400 font-light leading-relaxed">
          We're preparing more services, gatherings, and community events. Stay tuned for updates!
        </p>
      </div>
    </motion.div>
  );

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

        {/* Bento Grid Layout */}
        {!isLoading && !error && (
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch">

            {/* Featured Card (Large) */}
            {featuredEvent && (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
                className="md:col-span-8 group relative overflow-hidden rounded-3xl border border-white/10 bg-background-card/50 aspect-[16/9] md:aspect-auto md:h-[600px] hover:border-gold/30 transition-all duration-500 shadow-2xl flex flex-col justify-end"
              >
                <div className="absolute inset-0 bg-gradient-to-t from-background-dark via-background-dark/40 to-transparent z-10 pointer-events-none"></div>
                <img
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  src={(featuredEvent.hasImage && featuredEvent.img) ? featuredEvent.img : PLACEHOLDER_IMG}
                  onError={(e) => {
                    e.currentTarget.onerror = null;
                    e.currentTarget.src = PLACEHOLDER_IMG;
                  }}
                  alt={featuredEvent.title}
                />
                <div className="relative bottom-0 left-0 p-8 md:p-12 z-20 w-full md:w-2/3">
                  {featuredEvent.category && (
                    <span className="bg-gold/20 text-gold-light text-[10px] font-bold tracking-wider px-3 py-1.5 rounded-full mb-4 inline-block uppercase">
                      {featuredEvent.category}
                    </span>
                  )}
                  <h2 className="text-3xl md:text-4xl lg:text-5xl font-black mb-4 text-white tracking-tight leading-tight">
                    {featuredEvent.title}
                  </h2>
                  <p className="text-sm md:text-base text-gray-300 mb-6 max-w-lg font-light leading-relaxed line-clamp-3">
                    {featuredEvent.desc}
                  </p>

                  {/* Date, Time and Location Details (Simple text format) */}
                  <div className="flex flex-wrap gap-y-2 gap-x-6 text-sm font-semibold text-gray-300 mt-4">
                    <div className="flex items-center gap-2">
                      <svg className="w-4 h-4 text-gold shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span>{featuredEvent.startFull || 'TBA'}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <svg className="w-4 h-4 text-gold shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      <span>{featuredEvent.location || 'TBA'}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Secondary Card 1 */}
            {secondaryEvents.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.1 }}
                className="md:col-span-4 group relative overflow-hidden rounded-3xl border border-white/10 bg-background-card/50 h-[600px] hover:border-gold/30 transition-all duration-500 shadow-2xl flex flex-col justify-end"
              >
                <div className="absolute inset-0 bg-gradient-to-t from-background-dark via-background-dark/60 to-transparent z-10 pointer-events-none"></div>
                <img
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  src={(secondaryEvents[0].hasImage && secondaryEvents[0].img) ? secondaryEvents[0].img : PLACEHOLDER_IMG}
                  onError={(e) => {
                    e.currentTarget.onerror = null;
                    e.currentTarget.src = PLACEHOLDER_IMG;
                  }}
                  alt={secondaryEvents[0].title}
                />
                <div className="relative bottom-0 left-0 p-8 md:p-10 z-20 w-full">
                  {secondaryEvents[0].category && (
                    <span className="bg-gold/20 text-gold-light text-[10px] font-bold tracking-wider px-3 py-1.5 rounded-full mb-4 inline-block uppercase">
                      {secondaryEvents[0].category}
                    </span>
                  )}
                  <h3 className="text-2xl md:text-3xl font-black mb-2 text-white tracking-tight leading-tight">
                    {secondaryEvents[0].title}
                  </h3>
                  <p className="text-sm md:text-base text-gray-300 mb-4 font-light leading-relaxed line-clamp-3">
                    {secondaryEvents[0].desc}
                  </p>

                  {/* Date, Time and Location Details (Simple text format) */}
                  <div className="flex flex-col gap-2 text-xs font-semibold text-gray-300 mt-2">
                    <div className="flex items-center gap-2">
                      <svg className="w-3.5 h-3.5 text-gold shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span className="truncate">{secondaryEvents[0].startFull || 'TBA'}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <svg className="w-3.5 h-3.5 text-gold shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      <span className="truncate">{secondaryEvents[0].location || 'TBA'}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Render Banner in Slot 2 if only 1 event exists */}
            {totalCount === 1 && renderComingSoonBanner("md:col-span-4", "h-[600px]")}

            {/* Tertiary Cards Grid */}
            {secondaryEvents.slice(1).map((ev, idx) => (
              <motion.div
                key={ev.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.2 + idx * 0.1 }}
                className="md:col-span-4 group relative overflow-hidden rounded-3xl border border-white/10 bg-background-card/50 h-[400px] hover:border-gold/30 transition-all duration-500 shadow-2xl flex flex-col justify-end"
              >
                <div className="absolute inset-0 bg-gradient-to-t from-background-dark via-background-dark/80 to-transparent z-10 pointer-events-none"></div>
                <img
                  className="absolute inset-0 w-full h-full object-cover grayscale opacity-50 group-hover:grayscale-0 group-hover:opacity-80 transition-all duration-500 group-hover:scale-105"
                  src={(ev.hasImage && ev.img) ? ev.img : PLACEHOLDER_IMG}
                  onError={(e) => {
                    e.currentTarget.onerror = null;
                    e.currentTarget.src = PLACEHOLDER_IMG;
                  }}
                  alt={ev.title}
                />
                <div className="relative bottom-0 left-0 p-8 z-20 w-full">
                  <h3 className="text-xl md:text-2xl font-black mb-2 text-white tracking-tight">
                    {ev.title}
                  </h3>
                  <p className="text-sm text-gray-300 mb-4 font-light leading-relaxed line-clamp-2">
                    {ev.desc}
                  </p>

                  {/* Date, Time and Location Details (Simple text format) */}
                  <div className="flex flex-col gap-2 text-xs font-semibold text-gray-300 mt-2">
                    <div className="flex items-center gap-2">
                      <svg className="w-3.5 h-3.5 text-gold shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span className="truncate">{ev.startFull || 'TBA'}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <svg className="w-3.5 h-3.5 text-gold shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      <span className="truncate">{ev.location || 'TBA'}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}

            {/* Renders for remaining cases where totalCount is between 0 and 4 */}
            {totalCount === 0 && renderComingSoonBanner("md:col-span-12", "h-[400px]")}
            {totalCount === 2 && renderComingSoonBanner("md:col-span-12", "h-[400px]")}
            {totalCount === 3 && renderComingSoonBanner("md:col-span-8", "h-[400px]")}
            {totalCount === 4 && renderComingSoonBanner("md:col-span-4", "h-[400px]")}
          </div>
        )}

        {/* Pagination */}
        {!isLoading && !error && (
          <div className="mt-16 flex flex-col md:flex-row items-center justify-between border-t border-white/10 pt-8 gap-4">
            <span className="text-sm text-gray-400">
              Showing {totalCount} of {totalCount} events
            </span>
            <div className="flex items-center gap-2">
              <button className="p-3 rounded-xl border border-white/10 text-gray-400 hover:text-gold hover:border-gold/30 transition-all cursor-pointer">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <div className="flex items-center gap-2 px-2">
                <button className="w-10 h-10 flex items-center justify-center rounded-xl bg-gold text-royal-purple-dark font-bold text-sm shadow-md cursor-pointer">1</button>
              </div>
              <button className="p-3 rounded-xl border border-white/10 text-gray-400 hover:text-gold hover:border-gold/30 transition-all cursor-pointer">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        )}

        {/* --- DASHBOARD-STYLE ANNOUNCEMENTS --- */}
        {!isLoading && !error && announcements.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-[2rem] p-8 md:p-12 mt-20"
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
                          <svg className="w-3.5 h-3.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
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

      </div>
    </section>
  );
});

Events.displayName = "Events";