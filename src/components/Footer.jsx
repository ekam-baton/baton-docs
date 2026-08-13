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
          <div className="nav-logo" style={{ marginBottom: '1rem' }}>
            <img src={batonLogo} alt="BATON Logo" className="logo-img" />
            <span className="logo-text">BATON</span>
          </div>
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
            <li><a href={`${import.meta.env.BASE_URL}Baton_0.1.0_x64_en-US.msi`} download>Windows</a></li>
            <li><a href="https://github.com/ekam-baton/baton/releases/latest/download/app-debug.apk" target="_blank" rel="noopener noreferrer">Android</a></li>
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
        <p>© 2026 BATON</p>
      </div>
    </footer>
  );
}
