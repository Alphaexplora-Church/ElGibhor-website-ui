import React, { useState, memo } from 'react';
import { motion } from 'framer-motion';

export const Contact: React.FC = memo(() => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  return (
    <div id="contact" className="min-h-screen bg-background-dark pt-32 pb-24 relative flex items-center justify-center overflow-hidden">
      
      {/* Abstract Animated Glow */}
      <motion.div 
        animate={{ rotate: 360 }}
        transition={{ duration: 150, repeat: Infinity, ease: "linear" }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] md:w-[40vw] md:h-[40vw] rounded-full bg-[conic-gradient(var(--color-royal-purple)_0deg,transparent_120deg,var(--color-gold)_240deg,transparent_360deg)] blur-[100px] opacity-20 pointer-events-none"
      />

      <div className="max-w-3xl mx-auto px-6 w-full relative z-10">
         <motion.div 
           initial={{ opacity: 0, y: 30 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 0.8 }}
         >
           <h1 className="text-5xl md:text-7xl font-black text-white tracking-tighter mb-4">Let's <span className="text-gold">Talk</span>.</h1>
           <p className="text-xl text-gray-400 font-light mb-16">Whether you have a question, a prayer request, or just want to say hello, we're here for you.</p>

           <form className="space-y-12">
             
             {/* Name Input */}
             <div className="relative group">
                <input 
                  type="text" 
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full bg-transparent border-b-2 border-white/20 px-0 py-4 text-2xl md:text-3xl font-light text-white placeholder-transparent focus:outline-none focus:border-gold transition-colors peer"
                  placeholder="I am..."
                />
                <label 
                  htmlFor="name" 
                  className="absolute left-0 top-4 text-2xl md:text-3xl font-light text-gray-500 transition-all duration-300 pointer-events-none 
                             peer-placeholder-shown:top-4 peer-placeholder-shown:text-2xl peer-placeholder-shown:md:text-3xl peer-placeholder-shown:text-gray-500
                             peer-focus:-top-6 peer-focus:text-sm peer-focus:text-gold peer-focus:font-bold uppercase tracking-widest
                             -top-6 text-sm text-gold font-bold"
                >
                  I am...
                </label>
             </div>

             {/* Email Input */}
             <div className="relative group">
                <input 
                  type="email" 
                  id="email"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="w-full bg-transparent border-b-2 border-white/20 px-0 py-4 text-2xl md:text-3xl font-light text-white placeholder-transparent focus:outline-none focus:border-gold transition-colors peer"
                  placeholder="Reach me at..."
                />
                <label 
                  htmlFor="email" 
                  className="absolute left-0 top-4 text-2xl md:text-3xl font-light text-gray-500 transition-all duration-300 pointer-events-none 
                             peer-placeholder-shown:top-4 peer-placeholder-shown:text-2xl peer-placeholder-shown:md:text-3xl peer-placeholder-shown:text-gray-500
                             peer-focus:-top-6 peer-focus:text-sm peer-focus:text-gold peer-focus:font-bold uppercase tracking-widest
                             -top-6 text-sm text-gold font-bold"
                >
                  Reach me at...
                </label>
             </div>

             {/* Message Input */}
             <div className="relative group">
                <textarea 
                  id="message"
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                  rows={3}
                  className="w-full bg-transparent border-b-2 border-white/20 px-0 py-4 text-2xl md:text-3xl font-light text-white placeholder-transparent focus:outline-none focus:border-gold transition-colors peer resize-none"
                  placeholder="I'd like to talk about..."
                ></textarea>
                <label 
                  htmlFor="message" 
                  className="absolute left-0 top-4 text-2xl md:text-3xl font-light text-gray-500 transition-all duration-300 pointer-events-none 
                             peer-placeholder-shown:top-4 peer-placeholder-shown:text-2xl peer-placeholder-shown:md:text-3xl peer-placeholder-shown:text-gray-500
                             peer-focus:-top-6 peer-focus:text-sm peer-focus:text-gold peer-focus:font-bold uppercase tracking-widest
                             -top-6 text-sm text-gold font-bold"
                >
                  I'd like to talk about...
                </label>
             </div>

             {/* Submit Button */}
             <div className="pt-8">
               <button 
                 type="submit" 
                 className="relative overflow-hidden group px-12 py-5 rounded-full bg-gold text-royal-purple font-black text-xl tracking-wider hover:shadow-[0_0_40px_rgba(239,191,4,0.3)] transition-shadow duration-300"
               >
                 <span className="relative z-10 transition-transform duration-300 group-hover:-translate-y-1 block">Send Message</span>
                 <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
               </button>
             </div>

           </form>
         </motion.div>
      </div>
    </div>
  );
});

Contact.displayName = "Contact";