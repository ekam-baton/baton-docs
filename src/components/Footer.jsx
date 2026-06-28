import React from 'react';
import { Link } from 'react-router-dom';
import { FaDiscord, FaGithub, FaTwitter, FaLinkedin, FaInstagram } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="footer" style={{ borderTop: '1px solid var(--border-color)', padding: '4rem 2rem 2rem', background: 'var(--bg-dark)', marginTop: 'auto' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '3rem', paddingBottom: '3rem', borderBottom: '1px solid var(--border-color)' }}>
        
        <div>
          <div className="nav-logo" style={{ marginBottom: '1.5rem' }}>
            <img src="/baton-logo.svg" alt="BATON Logo" className="logo-img" />
            BATON
          </div>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '1.5rem' }}>
            The universal way to talk to agents & robots. Native MCP support with Zero Trust architecture.
          </p>
          <div style={{ display: 'flex', gap: '1rem' }}>
            <a href="https://discord.gg/wMKg8CMd" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--text-muted)', transition: 'color 0.2s' }}><FaDiscord size={20} /></a>
            <a href="https://github.com/ekam-baton" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--text-muted)', transition: 'color 0.2s' }}><FaGithub size={20} /></a>
            <a href="https://x.com/Batonorg" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--text-muted)', transition: 'color 0.2s' }}><FaTwitter size={20} /></a>
            <a href="https://www.linkedin.com/company/135244230/" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--text-muted)', transition: 'color 0.2s' }}><FaLinkedin size={20} /></a>
            <a href="https://www.instagram.com/baton_org/" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--text-muted)', transition: 'color 0.2s' }}><FaInstagram size={20} /></a>
          </div>
        </div>

        <div>
          <h4 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: '1.5rem', color: '#fff' }}>Product</h4>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <li><a href="#" style={{ color: 'var(--text-muted)', textDecoration: 'none', fontSize: '0.95rem' }}>Download iOS</a></li>
            <li><a href="#" style={{ color: 'var(--text-muted)', textDecoration: 'none', fontSize: '0.95rem' }}>Download Android</a></li>
            <li><Link to="/changelog" style={{ color: 'var(--text-muted)', textDecoration: 'none', fontSize: '0.95rem' }}>Changelog</Link></li>
          </ul>
        </div>

        <div>
          <h4 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: '1.5rem', color: '#fff' }}>Resources</h4>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <li><Link to="/a2a" style={{ color: 'var(--text-muted)', textDecoration: 'none', fontSize: '0.95rem' }}>Documentation</Link></li>
            <li><Link to="/integrations" style={{ color: 'var(--text-muted)', textDecoration: 'none', fontSize: '0.95rem' }}>Integrations</Link></li>
            <li><Link to="/community" style={{ color: 'var(--text-muted)', textDecoration: 'none', fontSize: '0.95rem' }}>Community</Link></li>
          </ul>
        </div>

        <div>
          <h4 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: '1.5rem', color: '#fff' }}>Legal</h4>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <li><Link to="/privacy" style={{ color: 'var(--text-muted)', textDecoration: 'none', fontSize: '0.95rem' }}>Privacy Policy</Link></li>
            <li><Link to="/terms" style={{ color: 'var(--text-muted)', textDecoration: 'none', fontSize: '0.95rem' }}>Terms of Service</Link></li>
          </ul>
        </div>

      </div>
      <div style={{ maxWidth: '1200px', margin: '2rem auto 0', display: 'flex', justifyContent: 'space-between', alignItems: 'center', color: 'var(--text-muted)', fontSize: '0.85rem' }}>
        <p>© 2026 BATON Technologies. All rights reserved.</p>
        <p>Built with React & Vite.</p>
      </div>
    </footer>
  );
}
