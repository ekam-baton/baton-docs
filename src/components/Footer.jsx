import React from 'react';
import { Link } from 'react-router-dom';
import { FaGithub, FaLinkedin, FaInstagram } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import batonLogo from '../assets/baton-logo.svg';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-grid">

        <div className="footer-col">
          <div className="nav-logo" style={{ marginBottom: '0.5rem' }}>
            <img src={batonLogo} alt="BATON Logo" className="logo-img" />
            <span className="logo-text">BATON</span>
          </div>
          <p style={{ fontSize: '0.78rem', color: 'var(--text-dim)', letterSpacing: '0.08em', marginBottom: '1rem', fontStyle: 'italic' }}>
            Finding Peace in the Chaos
          </p>
          <p className="footer-brand-desc">
            Private mobile AI chat. Your models, your machine, your data.
          </p>
          <div className="footer-social">
            <a href="https://github.com/ekam-baton" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
              <FaGithub size={18} />
            </a>
            <a href="https://x.com/Batonorg" target="_blank" rel="noopener noreferrer" aria-label="X / Twitter">
              <FaXTwitter size={18} />
            </a>
            <a href="https://www.linkedin.com/company/135244230/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
              <FaLinkedin size={18} />
            </a>
            <a href="https://www.instagram.com/baton_org/" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
              <FaInstagram size={18} />
            </a>
          </div>
        </div>

        <div className="footer-col">
          <h4>Product</h4>
          <ul>
            <li><a href="https://github.com/ekam-baton/baton/releases/latest/download/Baton_x64.msi" target="_blank" rel="noopener noreferrer">Windows</a></li>
            <li><a href="https://github.com/ekam-baton/baton/releases/latest/download/baton-v1.0.apk" target="_blank" rel="noopener noreferrer">Android</a></li>
            <li><a href="https://github.com/ekam-baton/baton/releases/latest/download/baton-gateway-engine-macos" target="_blank" rel="noopener noreferrer">macOS Hub</a></li>
            <li><a href="https://github.com/ekam-baton/baton/releases/latest/download/BatonNetwork.xcframework.zip" target="_blank" rel="noopener noreferrer">iOS Framework</a></li>
            <li><Link to="/changelog">Changelog</Link></li>
          </ul>
        </div>

        <div className="footer-col">
          <h4>Docs</h4>
          <ul>
            <li><Link to="/developers">Developers</Link></li>
            <li><Link to="/security">Security</Link></li>
            <li><Link to="/enterprise">Enterprise</Link></li>
            <li><Link to="/community">Community</Link></li>
          </ul>
        </div>

        <div className="footer-col">
          <h4>Legal</h4>
          <ul>
            <li><Link to="/privacy">Privacy</Link></li>
            <li><Link to="/terms">Terms</Link></li>
            <li><a href="mailto:ekam.baton@gmail.com">Contact</a></li>
          </ul>
        </div>

      </div>

      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} BATON Technologies. All rights reserved.</p>
      </div>
    </footer>
  );
}
