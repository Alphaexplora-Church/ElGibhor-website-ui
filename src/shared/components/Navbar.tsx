import React, { useState, useEffect } from 'react';
import { motion, useScroll, useMotionValueEvent } from 'framer-motion';
import { Link } from 'react-router-dom';

export const Navbar: React.FC = () => {
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() || 0;
    if (latest > previous && latest > 150) {
      setHidden(true);
      setIsMobileMenuOpen(false); // Close menu if scrolling down
    } else {
      setHidden(false);
    }
    setHasScrolled(latest > 50);
  });

  const navLinks = [
    {name: 'Home', path: '/'}, 
    {name: 'About', path: '/about'},
    {name: 'Ministries', path: '/ministries'}, 
    {name: 'Services', path: '/services'}, 
    {name: 'Connect', path: '/connect'}
  ];

  return (
    <motion.nav 
      variants={{
        visible: { y: 0 },
        hidden: { y: "-100%" },
      }}
      animate={hidden ? "hidden" : "visible"}
      transition={{ duration: 0.35, ease: "easeInOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 ${hasScrolled || isMobileMenuOpen ? 'bg-royal-purple/95 backdrop-blur-md border-b border-white/5 shadow-2xl' : 'bg-transparent'}`}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        <div className="flex justify-between h-24 items-center">
          <div className="flex-shrink-0 flex items-center group cursor-pointer">
            <Link to="/" onClick={() => setIsMobileMenuOpen(false)} className="text-2xl font-bold tracking-tighter text-white group-hover:text-gold transition-colors duration-300">
              TMGN
            </Link>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-1 items-center bg-white/5 backdrop-blur-md rounded-full px-2 py-1.5 border border-white/10">
            {navLinks.map(link => (
              <Link 
                key={link.path}
                to={link.path}
                onClick={() => setIsMobileMenuOpen(false)}
                className="px-5 py-2 text-sm font-medium text-gray-200 rounded-full hover:text-white hover:bg-white/10 transition-all duration-300"
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-white hover:bg-white/10 focus:outline-none"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isMobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="md:hidden pb-4 space-y-2"
          >
            {navLinks.map(link => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setIsMobileMenuOpen(false)}
                className="block px-4 py-2 text-sm font-medium text-gray-200 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
              >
                {link.name}
              </Link>
            ))}
          </motion.div>
        )}
      </div>
    </motion.nav>
  );
};