import React from 'react';
import { Routes, Route } from 'react-router-dom';
import TopNav from './components/TopNav';
import Footer from './components/Footer';
import Home from './pages/Home';
import PersonalAgents from './pages/PersonalAgents';
import EnterpriseAgents from './pages/EnterpriseAgents';
import SecurityArchitecture from './pages/SecurityArchitecture';
import AdaptersGuide from './pages/AdaptersGuide';
import Integrations from './pages/Integrations';
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
          <Route path="/integrations" element={<Integrations />} />
          <Route path="/agents" element={<PersonalAgents />} />
          <Route path="/enterprise" element={<EnterpriseAgents />} />
          <Route path="/architecture" element={<SecurityArchitecture />} />
          <Route path="/adapters" element={<AdaptersGuide />} />
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
