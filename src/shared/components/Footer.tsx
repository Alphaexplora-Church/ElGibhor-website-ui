import React from 'react';
import { FaFacebook, FaInstagram, FaEnvelope } from 'react-icons/fa';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-background-card border-t border-border-dark py-10 relative z-[1] overflow-hidden mt-auto">
      {/* Subtle top accent line */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-px bg-gradient-to-r from-transparent via-royal-purple/40 to-transparent"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10 flex flex-col md:flex-row justify-between items-center md:items-start gap-8">

        <div className="md:w-1/2 text-center md:text-left">
          <h2 className="text-xl font-bold text-white mb-0.5 tracking-tight hover:text-gold transition-colors cursor-pointer">El Gibhor</h2>
          <p className="text-xs font-medium text-royal-purple-light uppercase tracking-widest mb-3">The Mighty God of All Nations Inc.</p>
          <p className="text-gray-500 text-sm max-w-xs mx-auto md:mx-0 leading-relaxed">
            A movement of devoted Christ-followers dedicated to guiding others in their faith journey, all for the glory of God.
          </p>
        </div>

        <div className="flex flex-col items-center md:items-end gap-4">
          <h3 className="text-sm font-semibold text-white">Connect With Us</h3>
          <div className="flex space-x-3">
            <a href="https://www.facebook.com/EGCcommunity" target="_blank" rel="noreferrer" className="w-9 h-9 rounded-full bg-background-dark border border-border-dark flex items-center justify-center text-gray-500 hover:text-white hover:border-white/30 transition-all">
              <FaFacebook size={16} />
            </a>
            <a href="https://www.instagram.com/tmgn.inc?igsh=MTR4OHYzYXNsYXYxZA%3D%3D&utm_source=qr" target="_blank" rel="noreferrer" className="w-9 h-9 rounded-full bg-background-dark border border-border-dark flex items-center justify-center text-gray-500 hover:text-white hover:border-white/30 transition-all">
              <FaInstagram size={16} />
            </a>
            <a href="mailto:inc.tmgn@gmail.com" className="w-9 h-9 rounded-full bg-background-dark border border-border-dark flex items-center justify-center text-gray-500 hover:text-white hover:border-white/30 transition-all">
              <FaEnvelope size={16} />
            </a>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 border-t border-border-dark mt-8 pt-6 flex flex-col sm:flex-row justify-between items-center gap-2 text-xs text-gray-600">
        <p>&copy; {new Date().getFullYear()} TMGN Inc. All rights reserved.</p>
        <p className="italic text-gold/60">"Go and Make Disciples"</p>
        <p>
          Powered by <a href="https://www.alphaexplora.com/" target="_blank" rel="noreferrer" className="text-gray-500 hover:text-gold transition-colors font-semibold tracking-wide"> Alphaexplora Information Technology Services</a>
        </p>
      </div>
    </footer>
  );
};