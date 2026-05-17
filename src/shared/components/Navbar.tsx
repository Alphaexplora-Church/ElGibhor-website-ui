import React, { useState, useCallback } from 'react';
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';

// Assuming this component exists in your project
import { PlanVisitModal } from './planVisit';

const navData = [
  { name: 'Home', path: '/' },
  {
    name: 'About',
    path: '/about',
    dropdown: [
      { title: 'Who We Are', sub: 'Our Manifesto', path: '/about#manifesto' },

      { title: 'Our Leadership', sub: 'Shepherding the Community', path: '/about#alterone' },
      { title: 'Life at TMGN', sub: 'Glimpse into Our Community', path: '/about#altertwo' },

      //{ title: 'Leadership', sub: 'National Team', path: '/about#leaders' },
      //{ title: 'Churches', sub: 'Daughter Churches', path: '/about#churches' },
    ]
  },
  {
    name: 'Experience',
    path: '/experience',
    dropdown: [
      { title: 'Events', sub: 'Upcoming Gatherings', path: '/experience#events' },
      { title: 'Ministries', sub: 'Find Your Circle', path: '/experience#ministries' }
    ]
  },
  { name: 'Give', path: '/give' },
  {
    name: 'Engage',
    path: '/engage',
    dropdown: [
      { title: 'Serve', sub: 'Make a Difference', path: '/engage#serve' },
      //{ title: 'Contact', sub: 'Let\'s Talk', path: '/engage#contact' }
    ]
  }
];

export const Navbar: React.FC = () => {
  const { scrollY } = useScroll();
  const [hasScrolled, setHasScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isVisitModalOpen, setIsVisitModalOpen] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() || 0;

    // Auto-close menus on scroll down
    if (latest > previous && latest > 150) {
      setIsMobileMenuOpen(false);
      setActiveDropdown(null);
    }

    setHasScrolled(latest > 50);
  });

  const handleMouseEnter = useCallback((name: string) => {
    setActiveDropdown(name);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setActiveDropdown(null);
  }, []);

  const handleNavClick = (_path?: string) => {
    setIsMobileMenuOpen(false);
    setActiveDropdown(null);
  };

  return (
    <>
      <motion.nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${hasScrolled || isMobileMenuOpen
          ? 'bg-royal-purple/95 backdrop-blur-md border-b border-white/5 shadow-2xl'
          : 'bg-transparent'
          }`}
        onMouseLeave={handleMouseLeave}
      >
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10">
          {/* Main Desktop/Mobile Container - Height transitions from h-16 to h-24 on Large Screens */}
          <div className="flex justify-between h-16 lg:h-24 items-center transition-all duration-500">

            {/* --- Logo --- */}
            <div className="flex-shrink-0 flex items-center group cursor-pointer z-50">
              <Link
                to="/"
                onClick={() => handleNavClick('/')}
                className="transition-transform duration-300 group-hover:scale-105"
              >
                <img
                  src="/LOGO1.png"
                  alt="El Gibhor Logo"
                  className="h-14 md:h-20 w-auto object-contain drop-shadow-[0_0_15px_rgba(239,191,4,0.2)]"
                />
              </Link>
            </div>

            {/* --- Desktop Links (Floating Pill Style) --- */}
            <div className="hidden lg:flex flex-1 justify-center relative">
              <div className="flex space-x-1 items-center bg-white/5 backdrop-blur-md rounded-full px-3 py-2 border border-white/10 relative">
                {navData.map(link => (
                  <div
                    key={link.name}
                    className="relative group"
                    onMouseEnter={() => handleMouseEnter(link.name)}
                  >
                    <Link
                      to={link.path}
                      onClick={() => handleNavClick(link.path)}
                      className="px-6 py-2.5 text-sm lg:text-base font-medium text-gray-200 rounded-full hover:text-white hover:bg-white/10 transition-all duration-300 block"
                    >
                      {link.name}
                    </Link>

                    {/* --- Dropdown Menu --- */}
                    <AnimatePresence>
                      {activeDropdown === link.name && link.dropdown && (
                        <motion.div
                          initial={{ opacity: 0, y: 15, scale: 0.95 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 10, scale: 0.95 }}
                          transition={{ duration: 0.2 }}
                          className="absolute left-1/2 -translate-x-1/2 mt-6 w-72 bg-[#1A0B2E]/95 backdrop-blur-xl border border-white/10 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] overflow-hidden p-2"
                        >
                          {link.dropdown.map(drop => (
                            <Link
                              key={drop.title}
                              to={drop.path}
                              onClick={() => handleNavClick(drop.path)}
                              className="block px-5 py-4 rounded-xl hover:bg-white/5 transition-colors group/item"
                            >
                              <div className="text-white font-bold text-sm lg:text-base group-hover/item:text-gold transition-colors">
                                {drop.title}
                              </div>
                              <div className="text-gray-400 text-xs mt-1">
                                {drop.sub}
                              </div>
                            </Link>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
              </div>
            </div>

            {/* --- Quick Actions --- */}
            <div className="hidden lg:flex items-center space-x-6 z-50">
              <button
                onClick={() => setIsVisitModalOpen(true)}
                className="flex items-center justify-center h-11 lg:h-14 px-7 lg:px-9 rounded-full bg-gold text-royal-purple-dark text-sm lg:text-base font-black tracking-wide hover:bg-gold-light hover:scale-105 active:scale-95 transition-all duration-300 shadow-[0_0_20px_rgba(239,191,4,0.4)] border border-transparent"
              >
                Plan a Visit
              </button>
              <Link
                to="/watch"
                onClick={() => handleNavClick('/watch')}
                className="flex items-center justify-center h-11 lg:h-14 px-7 lg:px-9 rounded-full bg-white/10 border border-white/20 text-white text-sm lg:text-base font-bold tracking-wide hover:bg-white/20 hover:border-white/40 transition-all transform hover:scale-105 active:scale-95 backdrop-blur-md"
              >
                <span className="relative flex h-2.5 w-2.5 mr-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-500"></span>
                </span>
                Watch Live
              </Link>
            </div>

            {/* --- Mobile Menu Toggle --- */}
            <div className="lg:hidden z-50 relative">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="inline-flex items-center justify-center p-2 rounded-full text-white hover:bg-white/10 transition-colors focus:outline-none"
              >
                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d={isMobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* --- Mobile Full Screen Reveal Menu --- */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ clipPath: "circle(0% at 100% 0)" }}
            animate={{ clipPath: "circle(150% at 100% 0)" }}
            exit={{ clipPath: "circle(0% at 100% 0)" }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 bg-[#0C0515] z-40 overflow-y-auto"
          >
            <div className="absolute inset-0 opacity-20 pointer-events-none bg-[radial-gradient(circle_at_center,var(--color-royal-purple-light),transparent_70%)]"></div>
            <div className="w-full max-w-sm mx-auto px-6 flex flex-col pt-32 pb-12 min-h-screen justify-center relative z-10">
              <div className="flex flex-col space-y-6">
                {navData.map((link, idx) => (
                  <motion.div
                    key={link.path}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 * idx }}
                  >
                    <Link
                      to={link.path}
                      onClick={() => handleNavClick(link.path)}
                      className="text-4xl font-black text-white hover:text-gold transition-colors block"
                    >
                      {link.name}
                    </Link>
                    {link.dropdown && (
                      <div className="mt-2 pl-4 border-l-2 border-white/20 space-y-2">
                        {link.dropdown.map(drop => (
                          <Link
                            key={drop.title}
                            to={drop.path}
                            onClick={() => handleNavClick(drop.path)}
                            className="block text-lg text-gray-400 hover:text-white transition-colors"
                          >
                            {drop.title}
                          </Link>
                        ))}
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>

              {/* FIXED: Restored Watch Live Button for Mobile */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="mt-8 pt-8 border-t border-white/10 flex flex-col space-y-4"
              >
                <button
                  onClick={() => { setIsMobileMenuOpen(false); setIsVisitModalOpen(true); }}
                  className="flex items-center justify-center h-14 w-full rounded-xl bg-white/5 border border-white/10 text-white font-bold hover:bg-white/10 transition-colors"
                >
                  Plan a Visit
                </button>
                <Link
                  to="/watch"
                  onClick={() => handleNavClick('/watch')}
                  className="flex items-center justify-center h-14 w-full rounded-xl bg-gold text-royal-purple-dark font-black tracking-wide shadow-[0_0_20px_rgba(239,191,4,0.3)] transition-transform active:scale-95"
                >
                  <span className="relative flex h-3 w-3 mr-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-red-600"></span>
                  </span>
                  Watch Live
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <PlanVisitModal isOpen={isVisitModalOpen} onClose={() => setIsVisitModalOpen(false)} />
    </>
  );
};

Navbar.displayName = "Navbar";