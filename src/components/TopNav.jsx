import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import batonLogo from '../assets/baton-logo.jpg';

export default function TopNav() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`top-nav ${scrolled ? 'scrolled' : ''}`}>
      <div className="nav-container">
        <NavLink to="/" className="nav-logo">
          <img src={batonLogo} alt="BATON Logo" className="logo-img" style={{ borderRadius: '15%' }} />
          <span className="logo-text">BATON</span>
        </NavLink>

        <nav className={`nav-links ${mobileOpen ? 'mobile-open' : ''}`}>
          <NavLink to="/a2a" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"} onClick={() => setMobileOpen(false)}>A2A Core</NavLink>
          <NavLink to="/adapters" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"} onClick={() => setMobileOpen(false)}>Enterprise Adapters</NavLink>
          <NavLink to="/local" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"} onClick={() => setMobileOpen(false)}>Local Sandbox</NavLink>
          <NavLink to="/frameworks" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"} onClick={() => setMobileOpen(false)}>Frameworks</NavLink>
          <NavLink to="/integrations" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"} onClick={() => setMobileOpen(false)}>Integrations</NavLink>
          <NavLink to="/workspaces" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"} onClick={() => setMobileOpen(false)}>Workspaces</NavLink>
        </nav>

        <div className="nav-actions">
          <a href="https://github.com/ekam-baton" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
            <button className="btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>View on GitHub</button>
          </a>
          <button className="mobile-toggle" onClick={() => setMobileOpen(!mobileOpen)}>
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>
    </header>
  );
}
