//App.tsx

import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';

import { Navbar } from './shared/components/Navbar';
import { Footer } from './shared/components/Footer';
import { GlobalBackground } from './shared/components/GlobalBackground';
import { SmoothScroller } from './shared/components/SmoothScroller';
import { ScrollManager } from './shared/components/ScrollManager';
import { ScrollToTop } from './shared/components/ScrollToTop';

// Lazy loading route components heavily to improve layout paint parsing times
const Home = lazy(() => import('./features/home/views/Home').then(m => ({ default: m.Home })));
const AboutUs = lazy(() => import('./features/about/views/AboutUs').then(m => ({ default: m.AboutUs })));
const Experience = lazy(() => import('./features/experience/views/Experience').then(m => ({ default: m.Experience })));
const Give = lazy(() => import('./features/give/views/Give').then(m => ({ default: m.Give })));
const Contact = lazy(() => import('./features/contact/views/Contact').then(m => ({ default: m.Contact })));
const Watch = lazy(() => import('./features/watch/views/Watch').then(m => ({ default: m.Watch })));
const PrayerWall = lazy(() => import('./features/prayer/views/PrayerWall').then(m => ({ default: m.PrayerWall })));
const Ministry = lazy(() => import('./features/ministries/views/Ministry').then(m => ({ default: m.Ministry })));

// A lightweight fallback spinner strictly using minimal CSS
const PageLoader = () => (
  <div className="flex h-[50vh] items-center justify-center">
    <motion.div
      animate={{ rotate: 360, scale: [1, 1.2, 1] }}
      transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
      className="w-12 h-12 border-t-2 border-r-2 border-gold rounded-full"
    />
  </div>
);

const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait" onExitComplete={() => window.scrollTo({ top: 0, left: 0, behavior: 'instant' })}>
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/experience" element={<Experience />} />
        <Route path="/give" element={<Give />} />
        <Route path="/engage" element={<Contact />} />
        <Route path="/watch" element={<Watch />} />
        <Route path="/prayer" element={<PrayerWall />} />
        <Route path="/ministries" element={<Ministry />} />
      </Routes>
    </AnimatePresence>
  );
};

function App() {
  return (
    <BrowserRouter>
      <SmoothScroller>
        <ScrollToTop />
        <ScrollManager />
        {/* Changed to global light theme: light base, dark purple text */}
        <div className="font-sans antialiased text-royal-purple-dark bg-[#FAFAFA] min-h-screen flex flex-col selection:bg-gold selection:text-white">
          <GlobalBackground />

          <Navbar />

          <main className="flex-grow z-10 w-full relative">
            <Suspense fallback={<PageLoader />}>
              <AnimatedRoutes />
            </Suspense>
          </main>

          <Footer />
        </div>
      </SmoothScroller>
    </BrowserRouter>

  );
}

export default App;