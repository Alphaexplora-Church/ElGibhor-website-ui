import React from 'react';
import { FaFacebook, FaInstagram, FaEnvelope } from 'react-icons/fa';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-background-card border-t border-border-dark py-24 relative overflow-hidden mt-auto">
      {/* Subtle glow effect in footer */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-1 bg-gradient-to-r from-transparent via-royal-purple to-transparent opacity-50"></div>
      <div className="absolute bottom-0 right-0 w-64 h-64 bg-royal-purple/10 rounded-full blur-[100px]"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10 flex flex-col md:flex-row justify-between items-center md:items-start gap-12">
        
        <div className="md:w-1/2 text-center md:text-left">
           <h2 className="text-3xl font-bold text-white mb-4 tracking-tight">The Mighty God of <br/>All Nations Inc.</h2>
           <p className="text-gray-400 max-w-md mx-auto md:mx-0 leading-relaxed mb-6">
             A movement of devoted Christ-followers dedicated to guiding others in their faith journey, all for the glory of God.
           </p>
        </div>

        <div className="flex flex-col items-center md:items-end space-y-6">
          <h3 className="text-lg font-semibold text-white">Connect With Us</h3>
          <div className="flex space-x-6">
            <a href="https://www.facebook.com/EGCcommunity" target="_blank" rel="noreferrer" className="w-12 h-12 rounded-full bg-background-dark border border-border-dark flex items-center justify-center text-gray-400 hover:text-white hover:border-white/40 hover:bg-white/5 transition-all transition-colors">
              <FaFacebook size={24} />
            </a>
            <a href="https://www.instagram.com/tmgn.inc?igsh=MTR4OHYzYXNsYXYxZA%3D%3D&utm_source=qr" target="_blank" rel="noreferrer" className="w-12 h-12 rounded-full bg-background-dark border border-border-dark flex items-center justify-center text-gray-400 hover:text-white hover:border-white/40 hover:bg-white/5 transition-all transition-colors">
              <FaInstagram size={24} />
            </a>
            <a href="mailto:inc.tmgn@gmail.com" className="w-12 h-12 rounded-full bg-background-dark border border-border-dark flex items-center justify-center text-gray-400 hover:text-white hover:border-white/40 hover:bg-white/5 transition-all transition-colors">
              <FaEnvelope size={24} />
            </a>
          </div>
        </div>
      </div>

      <div className="mt-20 pt-8 border-t border-border-dark text-center text-sm text-gray-600 flex flex-col items-center gap-2">
         <p><span className="text-gold/80 italic font-medium">Go and Make Disciples</span></p>
         <p>&copy; {new Date().getFullYear()} TMGN Inc. All rights reserved.</p>
         <p className="text-xs text-gray-500">
            Powered by <a href="https://www.alphaexplora.com/" target="_blank" rel="noreferrer" className="text-gray-400 hover:text-gold transition-colors font-semibold tracking-wide">ALPHAEXPLORA Information Technology Services</a>
         </p>
      </div>
    </footer>
  );
};
