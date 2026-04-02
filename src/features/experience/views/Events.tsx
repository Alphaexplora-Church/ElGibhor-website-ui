import React, { memo } from 'react';
import { motion } from 'framer-motion';

const topEvents = [
  { img: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=800&q=80", title: "Global Mission Sunday", date: "Next Sunday", desc: "A special service dedicating our year to global outreach." },
  { img: "https://images.unsplash.com/photo-1528605248644-14dd04022da1?w=800&q=80", title: "Youth Summer Camp", date: "July 20-25", desc: "Five days of encounter, fun, and community for ages 13-18." },
];

const announcements = [
  { title: "Baptism Class", date: "This Wednesday, 7 PM" },
  { title: "Growth Track Begins", date: "First Sunday of May" },
  { title: "Women's Breakfast", date: "May 15, 9 AM" },
  { title: "Night of Worship", date: "Last Friday of May, 8 PM" },
];

export const Events: React.FC = memo(() => {
  return (
    <section id="events" className="py-24 bg-background-card relative z-10 w-full overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-4xl md:text-5xl font-black text-white text-center tracking-tight mb-20 border-b border-white/10 pb-8">
          Upcoming <span className="text-royal-purple-light">Events</span>
        </h2>

        {/* Zig-Zag Featured Events */}
        <div className="space-y-24 mb-24">
          {topEvents.map((ev, idx) => (
            <div key={idx} className={`flex flex-col ${idx % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} items-center gap-12`}>
               <motion.div 
                 initial={{ opacity: 0, x: idx % 2 === 0 ? -50 : 50 }}
                 whileInView={{ opacity: 1, x: 0 }}
                 viewport={{ once: true }}
                 transition={{ duration: 0.6 }}
                 className="w-full md:w-1/2 relative group"
               >
                 <div className="absolute inset-0 bg-gold translate-x-4 translate-y-4 rounded-3xl pointer-events-none group-hover:translate-x-2 group-hover:translate-y-2 transition-transform duration-500"></div>
                 <div className="relative aspect-video rounded-3xl overflow-hidden border border-white/20 z-10">
                   <img src={ev.img} alt={ev.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" loading="lazy" />
                 </div>
               </motion.div>
               <motion.div 
                 initial={{ opacity: 0, y: 30 }}
                 whileInView={{ opacity: 1, y: 0 }}
                 viewport={{ once: true }}
                 transition={{ duration: 0.6, delay: 0.2 }}
                 className="w-full md:w-1/2 p-6"
               >
                 <span className="text-gold font-bold uppercase tracking-widest text-sm mb-2 block">{ev.date}</span>
                 <h3 className="text-3xl font-black text-white mb-4">{ev.title}</h3>
                 <p className="text-gray-400 font-light text-lg mb-8">{ev.desc}</p>
                 <button className="px-8 py-3 rounded-xl border border-white/20 text-white font-bold hover:bg-white/10 transition-colors">Learn More</button>
               </motion.div>
            </div>
          ))}
        </div>

        {/* Announcements Glassmorphism Grid */}
        <h3 className="text-2xl font-bold text-white mb-8 ml-4">More Announcements</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {announcements.map((ann, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="bg-white/5 backdrop-blur-md border border-white/10 p-6 rounded-2xl hover:bg-white/10 transition-colors cursor-pointer group"
            >
              <h4 className="text-lg font-bold text-white group-hover:text-gold transition-colors">{ann.title}</h4>
              <p className="text-sm text-gray-400 mt-2 font-light">{ann.date}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
});

Events.displayName = "Events";
