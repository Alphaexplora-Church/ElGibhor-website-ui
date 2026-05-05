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
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Ministries', path: '/ministries' },
    { name: 'Services', path: '/services' },
    { name: 'Connect', path: '/connect' }
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
            {navLinks.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className="text-gray-300 hover:text-white hover:bg-white/10 px-5 py-2 rounded-full text-sm font-medium transition-all duration-300"
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Desktop CTA & Mobile Toggle */}
          <div className="flex items-center space-x-4">
            <Link to="/plan-a-visit" className="hidden md:flex items-center justify-center space-x-2 bg-gold text-royal-purple-dark px-6 py-2.5 rounded-full text-sm font-bold hover:bg-gold-light hover:scale-105 active:scale-95 transition-all duration-300 shadow-[0_0_20px_rgba(239,191,4,0.3)]">
              <span>Plan A Visit</span>
            </Link>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden text-white p-2 focus:outline-none"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
              ) : (
                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "100vh" }}
          exit={{ opacity: 0, height: 0 }}
          className="md:hidden bg-royal-purple/95 backdrop-blur-xl border-t border-white/5 absolute top-24 left-0 right-0 w-full flex flex-col items-center pt-8 pb-12 gap-8 shadow-2xl"
        >
          {navLinks.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-white text-2xl font-bold hover:text-gold transition-colors"
            >
              {item.name}
            </Link>
          ))}
          <div className="w-24 h-px bg-white/10 my-4"></div>
          <Link
            to="/plan-a-visit"
            onClick={() => setIsMobileMenuOpen(false)}
            className="bg-gold text-royal-purple-dark px-10 py-4 rounded-full font-black text-xl hover:bg-gold-light hover:scale-105 active:scale-95 transition-all shadow-[0_0_30px_rgba(239,191,4,0.3)]"
          >
            Plan A Visit
          </Link>
        </motion.div>
      )}
    </motion.nav>
  );
};