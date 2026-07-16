import React from 'react';
import { Smartphone, Server, Shield, Lock, Cpu, ArrowRight } from 'lucide-react';

export default function Home() {
  return (
    <div className="animate-fade-in" style={{ position: 'relative' }}>
      
      {/* ── Hero ── */}
      <div className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">
            Your Phone.<br />Your AI Agents.<br />Zero Compromises.
          </h1>
          <p className="hero-subtitle">
            Baton is a fully end-to-end encrypted bridge between your Android phone and any AI agent running on your desktop or VPS. No data ever touches our servers.
          </p>
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <a href="/baton-docs/downloads/Baton-Setup.exe" download style={{ textDecoration: 'none' }}>
              <button className="btn-primary" style={{ padding: '0.75rem 1.75rem', fontSize: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                Download for Windows
              </button>
            </a>
            <a href="https://play.google.com/store/apps/details?id=com.ekam.baton" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
              <button className="btn-secondary" style={{ padding: '0.75rem 1.75rem', fontSize: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Smartphone size={18} /> Get on Play Store
              </button>
            </a>
          </div>
        </div>
      </div>

      {/* ── Feature Bento Grid ── */}
      <div className="page-wrapper" style={{ paddingTop: '2rem' }}>
        <div className="bento-grid">
          
          <div className="bento-card span-8">
            <Lock className="card-icon" />
            <h2>End-to-End Encrypted</h2>
            <p>
              Every message uses X25519 Diffie-Hellman key exchange and AES-256-GCM encryption. Our cloud router only sees encrypted blobs and has zero knowledge of your conversations.
            </p>
          </div>

          <div className="bento-card span-4">
            <Database className="card-icon" />
            <h2>Zero Setup</h2>
            <p>The Baton Connector ships as a standalone executable. No Docker, no Postgres. Just download and run.</p>
          </div>

          <div className="bento-card span-4">
            <Shield className="card-icon" />
            <h2>Biometric Auth</h2>
            <p>Your private keys never leave the secure hardware enclave on your Android device.</p>
          </div>

          <div className="bento-card span-8">
            <Cpu className="card-icon" />
            <h2>Universal MCP Support</h2>
            <p>
              The Connector bridges to any locally-running AI via the Model Context Protocol. Point it at OpenClaw, Hermes, or any custom agent. Baton doesn't care what AI you run.
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}

const Database = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M3 5V19A9 3 0 0 0 21 19V5"/><path d="M3 12A9 3 0 0 0 21 12"/></svg>
);

