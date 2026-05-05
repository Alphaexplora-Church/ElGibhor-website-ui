import React, { memo } from 'react';
import { motion } from 'framer-motion';

// Combined events. The first item will automatically be treated as the "Featured" hero event.
const events = [
  {
    id: 1,
    img: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=1600&q=80",
    title: "Global Mission Sunday",
    date: "Next Sunday",
    desc: "A special service dedicating our year to global outreach. Join us as we partner with international communities."
  },
  {
    id: 2,
    img: "https://images.unsplash.com/photo-1528605248644-14dd04022da1?w=800&q=80",
    title: "Youth Summer Camp",
    date: "July 20-25",
    desc: "Five days of encounter, fun, and community for ages 13-18."
  },
  {
    id: 3,
    img: "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=800&q=80",
    title: "Leadership Summit",
    date: "August 5th",
    desc: "Equipping the next generation of leaders in our community."
  },
];

const announcements = [
  { title: "Baptism Class", date: "This Wednesday, 7 PM", tag: "Equip" },
  { title: "Growth Track Begins", date: "First Sunday of May", tag: "Grow" },
  { title: "Women's Breakfast", date: "May 15, 9 AM", tag: "Connect" },
  { title: "Night of Worship", date: "Last Friday of May, 8 PM", tag: "Worship" },
];

export const Events: React.FC = memo(() => {
  const featuredEvent = events[0];
  const secondaryEvents = events.slice(1);

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

        {/* --- MAIN EDITORIAL LAYOUT --- */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-20">

          {/* Featured Hero Event (Takes up 8 columns on large screens) */}
          <motion.div
            initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}
            className="lg:col-span-8 group relative rounded-[2rem] overflow-hidden aspect-square sm:aspect-video lg:aspect-auto lg:h-[600px] cursor-pointer shadow-2xl border border-white/5"
          >
            <img src={featuredEvent.img} alt={featuredEvent.title} className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000 ease-out" />
            <div className="absolute inset-0 bg-gradient-to-t from-background-dark via-background-dark/50 to-transparent opacity-90 group-hover:opacity-100 transition-opacity duration-500"></div>

            <div className="absolute inset-0 p-8 md:p-12 flex flex-col justify-end">
              <div className="flex items-center gap-4 mb-4">
                <span className="px-4 py-1.5 rounded-full bg-gold text-royal-purple-dark text-xs font-black uppercase tracking-wider">Featured</span>
                <span className="text-gold-light font-bold text-sm tracking-wide flex items-center">
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                  {featuredEvent.date}
                </span>
              </div>
              <h3 className="text-4xl md:text-6xl font-black text-white mb-4 leading-tight">{featuredEvent.title}</h3>
              <p className="text-gray-300 text-lg md:text-xl max-w-2xl font-light mb-8 line-clamp-2 md:line-clamp-none">{featuredEvent.desc}</p>


            </div>
          </motion.div>

          {/* Secondary Events Grid (Takes up 4 columns on large screens) */}
          <div className="lg:col-span-4 flex flex-col gap-8">
            {secondaryEvents.map((ev, idx) => (
              <motion.div
                key={ev.id}
                initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: idx * 0.2 }}
                className="group relative flex-1 rounded-[2rem] overflow-hidden cursor-pointer border border-white/5 bg-white/5 hover:bg-white/10 transition-colors duration-300"
              >
                <div className="h-48 relative overflow-hidden">
                  <img src={ev.img} alt={ev.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out opacity-80 group-hover:opacity-100" />
                  <div className="absolute inset-0 bg-gradient-to-t from-background-dark to-transparent"></div>
                </div>
                <div className="p-6 md:p-8 relative z-10 -mt-10">
                  <span className="text-gold text-xs font-bold uppercase tracking-widest block mb-2">{ev.date}</span>
                  <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-gold-light transition-colors">{ev.title}</h3>
                  <p className="text-gray-400 text-sm font-light line-clamp-2">{ev.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* --- DASHBOARD-STYLE ANNOUNCEMENTS --- */}
        <motion.div
          initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-[2rem] p-8 md:p-12"
        >
          <div className="flex justify-between items-center mb-8 border-b border-white/10 pb-6">
            <h3 className="text-2xl md:text-3xl font-bold text-white">More Announcements</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6">
            {announcements.map((ann, idx) => (
              <div
                key={idx}
                className="group flex items-center justify-between p-4 -mx-4 rounded-xl hover:bg-white/5 transition-all duration-300 cursor-pointer"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center flex-shrink-0 group-hover:bg-gold group-hover:border-gold transition-all duration-400 group-hover:shadow-[0_0_20px_rgba(239,191,4,0.25)] group-hover:-translate-y-1">
                    <svg className="w-5 h-5 text-gold group-hover:text-royal-purple-dark transition-colors duration-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-white group-hover:text-gold transition-colors">{ann.title}</h4>
                    <p className="text-sm text-gray-400 mt-1 font-light flex items-center gap-2">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                      {ann.date}
                    </p>
                  </div>
                </div>
                <svg className="w-5 h-5 text-gray-500 group-hover:text-gold transform group-hover:translate-x-1 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Mobile View Calendar Button (Only shows on mobile) */}
        <button className="md:hidden w-full mt-8 py-4 rounded-xl border border-white/20 text-white font-bold hover:bg-white/5 transition-colors flex items-center justify-center">
          View Full Calendar
        </button>

      </div>
    </section>
  );
});

Events.displayName = "Events";