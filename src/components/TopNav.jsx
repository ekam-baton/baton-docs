import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

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
          <img src="/baton-logo.svg" alt="BATON Logo" className="logo-img" />
          <span className="logo-text">BATON</span>
        </NavLink>

        <nav className={`nav-links ${mobileOpen ? 'mobile-open' : ''}`}>
          <NavLink to="/a2a" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"} onClick={() => setMobileOpen(false)}>A2A Core</NavLink>
          <NavLink to="/cloud" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"} onClick={() => setMobileOpen(false)}>Cloud Models</NavLink>
          <NavLink to="/local" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"} onClick={() => setMobileOpen(false)}>Local Sandbox</NavLink>
          <NavLink to="/frameworks" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"} onClick={() => setMobileOpen(false)}>Frameworks</NavLink>
          <NavLink to="/integrations" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"} onClick={() => setMobileOpen(false)}>Integrations</NavLink>
          <NavLink to="/workspaces" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"} onClick={() => setMobileOpen(false)}>Workspaces</NavLink>
        </nav>

        <div className="nav-actions">
          <button className="btn-primary">Get Started</button>
          <button className="mobile-toggle" onClick={() => setMobileOpen(!mobileOpen)}>
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>
    </header>
  );
}
