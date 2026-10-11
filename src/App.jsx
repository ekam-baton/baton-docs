import React, { useEffect } from 'react';
import { Routes, Route, Navigate, useLocation, useNavigate } from 'react-router-dom';
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

const LusionDemo = React.lazy(() => import('./pages/LusionDemo'));

function App() {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    // If user accesses via #demo, #/demo, or ?demo in URL, navigate to /demo
    if (window.location.hash.toLowerCase().includes('demo') || window.location.search.toLowerCase().includes('demo')) {
      if (location.pathname !== '/demo') {
        navigate('/demo', { replace: true });
      }
    }
  }, [location, navigate]);

  const isDemo = location.pathname === '/demo';

  return (
    <div className="app-container">
      <ScrollToTop />
      {!isDemo && <TopNav />}
      <main className={isDemo ? "demo-content" : "main-content"}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/enterprise" element={<Enterprise />} />
          <Route path="/security" element={<Security />} />
          <Route path="/developers" element={<Developers />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/changelog" element={<Changelog />} />
          <Route path="/community" element={<Community />} />
          <Route path="/demo" element={
            <React.Suspense fallback={<div style={{ minHeight: '100vh', background: '#000000' }} />}>
              <LusionDemo />
            </React.Suspense>
          } />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      {!isDemo && <Footer />}
    </div>
  );
}

export default App;
