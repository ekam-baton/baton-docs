import React from 'react';
import { Smartphone, Server, Shield, Lock, Cpu, ArrowRight, Zap, Play, QrCode, FileText } from 'lucide-react';
import GalaxyBackground from '../components/GalaxyBackground';
import AuditLogFeed from '../components/AuditLogFeed';

export default function Home() {
  return (
    <div className="animate-fade-in" style={{ position: 'relative', minHeight: '100vh', paddingBottom: '4rem' }}>
      <GalaxyBackground />

      {/* ── Hero ── */}
      <div className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">
            Own Your Workflow.<br />Deploy Your Agents.
          </h1>
          <p className="hero-subtitle">
            Baton is a secure chat app and bridge connecting your smartphone to compatible AI agents running locally on your computer or VPS. Your work flow stays yours.
          </p>
          <div className="hero-buttons">
            <a href="/baton-docs/downloads/Baton-Setup-v1.3.exe" download className="hero-btn-link">
              <button className="btn-primary" style={{ width: '100%', padding: '0.75rem 1.5rem', fontSize: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', whiteSpace: 'nowrap' }}>
                Download for Windows
              </button>
            </a>
            <a href="/baton-docs/downloads/Baton-Android.apk" download className="hero-btn-link">
              <button className="btn-secondary" style={{ width: '100%', padding: '0.75rem 1.5rem', fontSize: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', whiteSpace: 'nowrap' }}>
                <Smartphone size={18} /> Download APK
              </button>
            </a>
            <a href="#" className="hero-btn-link">
              <button className="btn-secondary" style={{ width: '100%', padding: '0.75rem 1.5rem', fontSize: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', whiteSpace: 'nowrap' }}>
                <Play size={18} /> Get on Google Play
              </button>
            </a>
          </div>
          <p style={{ marginTop: '1rem', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
            * iOS support coming soon.
          </p>
        </div>
        <div className="hero-mockup-container">
          <AuditLogFeed />
        </div>
      </div>

      {/* ── Quick Start / Simple Explanation ── */}
      <div className="page-wrapper" style={{ paddingTop: '4rem' }}>
        <div className="section-header" style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <h2 style={{ fontSize: '2.5rem' }}>Get Started in 3 Steps</h2>
          <p style={{ margin: '0 auto' }}>No accounts, no cloud subscriptions. Just a direct, encrypted connection.</p>
        </div>
        
        <div className="bento-grid">
          <div className="bento-card span-4" style={{ textAlign: 'center', alignItems: 'center' }}>
            <Server className="card-icon" style={{ width: 40, height: 40, marginBottom: '1rem', color: '#3b82f6' }} />
            <h3>1. Run the Hub</h3>
            <p style={{ fontSize: '0.9rem' }}>Download and run the standalone Baton executable on your Windows PC. It runs silently in the background.</p>
          </div>
          
          <div className="bento-card span-4" style={{ textAlign: 'center', alignItems: 'center' }}>
            <Smartphone className="card-icon" style={{ width: 40, height: 40, marginBottom: '1rem', color: '#10b981' }} />
            <h3>2. Install the App</h3>
            <p style={{ fontSize: '0.9rem' }}>Install the Baton app on your smartphone via the Google Play Store or direct APK download.</p>
          </div>

          <div className="bento-card span-4" style={{ textAlign: 'center', alignItems: 'center' }}>
            <QrCode className="card-icon" style={{ width: 40, height: 40, marginBottom: '1rem', color: '#a855f7' }} />
            <h3>3. Scan to Pair</h3>
            <p style={{ fontSize: '0.9rem' }}>Scan the secure QR code shown on your PC with your phone. Your devices are now permanently paired.</p>
          </div>
        </div>
      </div>

      {/* ── Capabilities (Moved Up for Client Ed) ── */}
      <div className="page-wrapper" style={{ paddingTop: '6rem' }}>
        <div className="section-header">
          <h2 style={{ fontSize: '2.5rem' }}>What can you do?</h2>
          <p>By leveraging the Model Context Protocol (MCP), Baton can securely command compatible local systems from your phone.</p>
        </div>

        <div className="bento-grid">
          <div className="bento-card span-4" style={{ background: '#0a0a0c' }}>
            <Zap className="card-icon" color="#eab308" />
            <h3>Local AI Chat</h3>
            <p style={{ fontSize: '0.9rem' }}>Chat securely with models running on Ollama, LM Studio, or vLLM hosted on your own computer.</p>
          </div>
          <div className="bento-card span-4" style={{ background: '#0a0c0a' }}>
            <DatabaseIcon className="card-icon" color="#10b981" />
            <h3>Database Queries</h3>
            <p style={{ fontSize: '0.9rem' }}>Securely access your local PostgreSQL or SQLite databases directly from your phone while on the go.</p>
          </div>
          <div className="bento-card span-4" style={{ background: '#0c0a0c' }}>
            <Cpu className="card-icon" color="#a855f7" />
            <h3>Home Assistant</h3>
            <p style={{ fontSize: '0.9rem' }}>Command compatible smart home infrastructure through natural language without exposing external network ports.</p>
          </div>
        </div>
      </div>

      {/* ── Technical Deep Dive (Bento Grid) ── */}
      <div className="page-wrapper" style={{ paddingTop: '6rem' }}>
        <div className="section-header">
          <h2 style={{ fontSize: '2.5rem' }}>Zero-Trust Architecture</h2>
          <p>For the technically inclined: Baton is built from the ground up for absolute data privacy and sovereign computing.</p>
        </div>
        <div className="bento-grid">
          
          <div className="bento-card span-8">
            <Lock className="card-icon" />
            <h3>End-to-End Encrypted</h3>
            <p>
              Every connection is secured with industry-standard end-to-end encryption. Our routing servers only relay unreadable data and have zero knowledge of your information.
            </p>
          </div>

          <div className="bento-card span-4">
            <Shield className="card-icon" />
            <h3>Biometric Auth</h3>
            <p>Your authentication keys remain locked safely on your physical device, protected by native biometrics.</p>
          </div>

          <div className="bento-card span-8">
            <Cpu className="card-icon" />
            <h3>Universal MCP Support</h3>
            <p>
              The Desktop Hub acts as a bridge to your locally-running tools via the standard Model Context Protocol. Point it at OpenClaw, Hermes, or compatible custom agents.
            </p>
          </div>

          <div className="bento-card span-4">
            <FileText className="card-icon" />
            <h3>Uncompromising Auditability</h3>
            <p>Every action is logged. Baton provides the verifiable accountability of enterprise accounting software, ensuring your AI workflows are traceable.</p>
          </div>

        </div>
      </div>

      {/* ── Architecture Section ── */}
      <div className="page-wrapper" style={{ paddingTop: '6rem' }}>
        <div className="section-header">
          <h2 style={{ fontSize: '2.5rem' }}>How the Bridge Works</h2>
          <p>A secure, un-opinionated tunnel between your phone and your private infrastructure.</p>
        </div>
        
        <div className="architecture-grid">
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
            <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: '#111', display: 'flex', justifyContent: 'center', alignItems: 'center', border: '1px solid var(--border-highlight)' }}>
              <Smartphone size={32} color="#D4D4D4" />
            </div>
            <h3 style={{ fontSize: '1.2rem', fontWeight: '500' }}>Mobile App</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Encrypts data locally and establishes a secure, persistent connection to the Hub.</p>
          </div>
          
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }} className="arch-arrow">
             <ArrowRight size={24} color="var(--border-highlight)" />
             <div style={{ width: '60px', height: '60px', borderRadius: '50%', background: 'rgba(255,255,255,0.02)', display: 'flex', justifyContent: 'center', alignItems: 'center', border: '1px dashed var(--border-highlight)' }}>
              <Server size={24} color="#666" />
            </div>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>Dumb Cloud Router</p>
             <ArrowRight size={24} color="var(--border-highlight)" />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
            <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: '#111', display: 'flex', justifyContent: 'center', alignItems: 'center', border: '1px solid var(--border-highlight)' }}>
              <Cpu size={32} color="#D4D4D4" />
            </div>
            <h3 style={{ fontSize: '1.2rem', fontWeight: '500' }}>Desktop Hub</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Decrypts payload locally and dispatches to local MCP tools.</p>
          </div>
        </div>
      </div>

      {/* ── FAQ Section ── */}
      <div className="page-wrapper" style={{ paddingTop: '6rem', paddingBottom: '4rem' }}>
        <div className="section-header">
          <h2 style={{ fontSize: '2.5rem' }}>Frequently Asked Questions</h2>
          <p>Everything you need to know about Baton's security, privacy, and pricing.</p>
        </div>
        
        <div className="faq-container">
          <details className="faq-item">
            <summary>Why does Baton cost money when other apps are free?</summary>
            <p>Because if an app is free, you are the product. Free apps monetize by mining your data or serving ads. Baton charges a tiny subscription ($9.99/year globally, ₹199/year in India) so we can keep the routing servers running without ever compromising your privacy. We don't want your data, and our architecture mathematically prevents us from accessing it.</p>
          </details>
          
          <details className="faq-item">
            <summary>Do my messages ever touch the cloud?</summary>
            <p>Yes, but only as unreadable, encrypted blobs. Our zero-knowledge relay router passes the data between your phone and your desktop, but it cannot decrypt the contents.</p>
          </details>
          
          <details className="faq-item">
            <summary>Can I use Baton to talk to my friends?</summary>
            <p>Baton is primarily designed as a secure bridge between you and your private AI agents, databases, and local tools. While it uses chat interfaces, it is an infrastructure tool, not a social network.</p>
          </details>

          <details className="faq-item">
            <summary>What AI models are supported?</summary>
            <p>Anything that supports the Model Context Protocol (MCP). You can connect it to local instances of Llama, Mistral, Hermes, or even custom Python scripts.</p>
          </details>
        </div>
      </div>

    </div>
  );
}

const DatabaseIcon = ({ className, color = "currentColor" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M3 5V19A9 3 0 0 0 21 19V5"/><path d="M3 12A9 3 0 0 0 21 12"/></svg>
);
