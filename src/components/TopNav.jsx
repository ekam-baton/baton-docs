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
          <NavLink to="/agents" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"} onClick={() => setMobileOpen(false)}>Personal Agents</NavLink>
          <NavLink to="/routing" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"} onClick={() => setMobileOpen(false)}>Routing & Tunnels</NavLink>
          <NavLink to="/adapters" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"} onClick={() => setMobileOpen(false)}>Build an Adapter</NavLink>
          <NavLink to="/integrations" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"} onClick={() => setMobileOpen(false)}>Integrations</NavLink>
        </nav>

        <div className="nav-actions" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <button 
            onClick={() => {
              navigator.clipboard.writeText('Read https://ekam-baton.github.io/baton-docs/llms-full.txt and write the Node.js backend code to connect my local agent to BATON.');
              alert('LLM Prompt copied to clipboard!');
            }}
            style={{ 
              background: 'rgba(59, 130, 246, 0.15)', 
              border: '1px solid rgba(59, 130, 246, 0.4)', 
              color: '#60a5fa', 
              padding: '0.5rem 1rem', 
              borderRadius: '8px', 
              fontSize: '0.9rem',
              fontWeight: 600,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              boxShadow: '0 0 10px rgba(59,130,246,0.2)'
            }}
            title="Copy a prompt to paste into any LLM to instantly build a BATON backend."
            className="llm-button"
          >
            <span style={{ width: '8px', height: '8px', background: '#60a5fa', borderRadius: '50%', display: 'inline-block', animation: 'pulse 2s infinite' }}></span>
            LLM Prompt
          </button>
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
