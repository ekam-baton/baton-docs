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
          <NavLink to="/enterprise" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"} onClick={() => setMobileOpen(false)}>Enterprise</NavLink>
          <NavLink to="/security" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"} onClick={() => setMobileOpen(false)}>Security</NavLink>
          <NavLink to="/developers" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"} onClick={() => setMobileOpen(false)}>Developers</NavLink>
        </nav>

        <div className="nav-actions" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <button 
            onClick={() => {
              navigator.clipboard.writeText('Read https://ekam-baton.github.io/baton-docs/ and help me write a Python MCP stdio agent to connect to the Baton Connector. The agent should: read JSON-RPC messages from stdin, implement the initialize and tools/call methods, and write JSON responses to stdout. It will be registered with MCP_AGENT_<NAME>_CMD and MCP_AGENT_<NAME>_ARGS environment variables on the Connector.');
              alert('LLM Prompt copied to clipboard!');
            }}
            title="Copy a prompt to paste into any LLM to instantly build a Baton MCP agent."
            className="btn-llm"
          >
            <span className="pulse-dot"></span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 8V4H8"/><rect width="16" height="12" x="4" y="8" rx="2"/><path d="M2 14h2"/><path d="M20 14h2"/><path d="M15 13v2"/><path d="M9 13v2"/></svg>
              LLM Prompt
            </span>
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
