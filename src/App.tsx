import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Navbar } from './shared/components/Navbar';
import { Home } from './features/home/views/Home';
import { Ministries } from './features/ministries/views/Ministry';
import { Services } from './features/services/views/Services';
import { Connect } from './features/connect/views/Connect';
import { Contact } from './features/contact/views/Contact';
import { About } from './features/about/views/About';
import { Footer } from './shared/components/Footer';

function App() {
  return (
    <BrowserRouter>
      <div className="font-sans antialiased text-white bg-background-dark min-h-screen flex flex-col selection:bg-gold selection:text-black">
        <Navbar />
        
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/ministries" element={<Ministries />} />
            <Route path="/services" element={<Services />} />
            <Route path="/connect" element={<Connect />} />
            <Route path="/plan-a-visit" element={<Contact />} />
          </Routes>
        </main>
        
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;