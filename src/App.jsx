import React from 'react';
import { Routes, Route } from 'react-router-dom';
import TopNav from './components/TopNav';
import Footer from './components/Footer';
import Home from './pages/Home';
import LocalHarnesses from './pages/LocalHarnesses';
import Frameworks from './pages/Frameworks';
import Workspaces from './pages/Workspaces';
import AdaptersGuide from './pages/AdaptersGuide';
import Integrations from './pages/Integrations';
import A2A from './pages/A2A';
import Terms from './pages/Terms';
import Privacy from './pages/Privacy';
import Changelog from './pages/Changelog';
import Community from './pages/Community';

function App() {
  return (
    <div className="app-container">
      <TopNav />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/integrations" element={<Integrations />} />
          <Route path="/a2a" element={<A2A />} />
          <Route path="/local" element={<LocalHarnesses />} />
          <Route path="/frameworks" element={<Frameworks />} />
          <Route path="/workspaces" element={<Workspaces />} />
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
