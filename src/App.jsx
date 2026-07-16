import React from 'react';
import { Routes, Route } from 'react-router-dom';
import TopNav from './components/TopNav';
import Footer from './components/Footer';
import Home from './pages/Home';
import Enterprise from './pages/Enterprise';
import Security from './pages/Security';
import Developers from './pages/Developers';
import Terms from './pages/Terms';
import Privacy from './pages/Privacy';
import Changelog from './pages/Changelog';
import Community from './pages/Community';
import ScrollToTop from './components/ScrollToTop';

function App() {
  return (
    <div className="app-container">
      <ScrollToTop />
      <TopNav />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/enterprise" element={<Enterprise />} />
          <Route path="/security" element={<Security />} />
          <Route path="/developers" element={<Developers />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/changelog" element={<Changelog />} />
          <Route path="/community" element={<Community />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
