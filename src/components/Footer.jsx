import React from 'react';
import { Link } from 'react-router-dom';
import { FaGithub, FaLinkedin, FaInstagram } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import batonLogo from '../assets/baton-logo.jpg';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-grid">
        
        <div className="footer-col">
          <div className="nav-logo" style={{ marginBottom: '1rem' }}>
            <img src={batonLogo} alt="BATON Logo" className="logo-img" />
            <span className="logo-text">BATON</span>
          </div>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '1.25rem', maxWidth: '300px', lineHeight: 1.6 }}>
            Private, end-to-end encrypted mobile client for local AI models and Model Context Protocol servers.
          </p>
          <div style={{ display: 'flex', gap: '1.25rem' }}>
            <a href="https://github.com/ekam-baton" target="_blank" rel="noopener noreferrer" aria-label="GitHub" style={{ color: 'var(--text-muted)', transition: 'color 0.15s' }}>
              <FaGithub size={18} />
            </a>
            <a href="https://x.com/Batonorg" target="_blank" rel="noopener noreferrer" aria-label="X / Twitter" style={{ color: 'var(--text-muted)', transition: 'color 0.15s' }}>
              <FaXTwitter size={18} />
            </a>
            <a href="https://www.linkedin.com/company/135244230/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" style={{ color: 'var(--text-muted)', transition: 'color 0.15s' }}>
              <FaLinkedin size={18} />
            </a>
            <a href="https://www.instagram.com/baton_org/" target="_blank" rel="noopener noreferrer" aria-label="Instagram" style={{ color: 'var(--text-muted)', transition: 'color 0.15s' }}>
              <FaInstagram size={18} />
            </a>
          </div>
        </div>

        <div className="footer-col">
          <h4>Product</h4>
          <ul>
            <li><a href={`${import.meta.env.BASE_URL}Baton_0.1.0_x64_en-US.msi`} download>Windows Desktop Hub</a></li>
            <li><a href="https://github.com/ekam-baton/baton/releases/latest/download/app-debug.apk" target="_blank" rel="noopener noreferrer">Android APK</a></li>
            <li><a href="https://github.com/ekam-baton/baton-Desktop-App" target="_blank" rel="noopener noreferrer">Source Code (GitHub)</a></li>
            <li><Link to="/changelog">Changelog & Roadmap</Link></li>
          </ul>
        </div>

        <div className="footer-col">
          <h4>Resources</h4>
          <ul>
            <li><Link to="/security">Security Architecture</Link></li>
            <li><Link to="/developers">Developers & MCP</Link></li>
            <li><Link to="/enterprise">Enterprise Deployment</Link></li>
            <li><Link to="/community">Community & Support</Link></li>
          </ul>
        </div>

        <div className="footer-col">
          <h4>Legal</h4>
          <ul>
            <li><Link to="/privacy">Privacy Policy</Link></li>
            <li><Link to="/terms">Terms of Service</Link></li>
            <li><a href="mailto:ekam.baton@gmail.com">Contact Maintainers</a></li>
          </ul>
        </div>

      </div>

      <div className="footer-bottom">
        <p>© 2026 BATON Technologies. All rights reserved.</p>
        <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem' }}>Sovereign Local-First AI</p>
      </div>
    </footer>
  );
}
