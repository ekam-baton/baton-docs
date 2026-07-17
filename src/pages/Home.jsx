import React from 'react';
import { Smartphone, Server, Shield, Lock, Cpu, ArrowRight, ArrowDown, ExternalLink, Zap, Play } from 'lucide-react';
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
            Own Your Workflow.<br />Zero Compromises.
          </h1>
          <p className="hero-subtitle">
            Baton is a fully end-to-end encrypted bridge between your Android phone and any AI agent running on your desktop or VPS. No data ever touches our servers.
          </p>
          <div style={{ display: 'flex', gap: '1rem', width: '100%' }}>
            <a href="/baton-docs/downloads/Baton-Setup-v1.1.exe" download style={{ textDecoration: 'none', flex: 1 }}>
              <button className="btn-primary" style={{ width: '100%', padding: '0.75rem 1rem', fontSize: '0.9rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', whiteSpace: 'nowrap' }}>
                Download for Windows
              </button>
            </a>
            <a href="/downloads/Baton-Android.apk" download style={{ textDecoration: 'none', flex: 1 }}>
              <button className="btn-secondary" style={{ width: '100%', padding: '0.75rem 1rem', fontSize: '0.9rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', whiteSpace: 'nowrap' }}>
                <Smartphone size={18} /> Download APK
              </button>
            </a>
            <a href="https://play.google.com/store/apps/details?id=com.ekam.baton" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', flex: 1 }}>
              <button className="btn-secondary" style={{ width: '100%', padding: '0.75rem 1rem', fontSize: '0.9rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', whiteSpace: 'nowrap' }}>
                <Play size={18} /> Get on Google Play
              </button>
            </a>
          </div>
        </div>
        <div className="hero-mockup-container">
          <AuditLogFeed />
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

      {/* ── Architecture Section ── */}
      <div className="page-wrapper" style={{ paddingTop: '6rem' }}>
        <div className="section-header">
          <h1 style={{ fontSize: '2.5rem' }}>How It Works</h1>
          <p>A secure, un-opinionated bridge between your phone and your private infrastructure.</p>
        </div>
        
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '2rem', textAlign: 'center', alignItems: 'center', background: 'var(--bg-card)', padding: '4rem 2rem', borderRadius: '12px', border: '1px solid var(--border-color)' }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
            <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: '#111', display: 'flex', justifyContent: 'center', alignItems: 'center', border: '1px solid var(--border-highlight)' }}>
              <Smartphone size={32} color="#D4D4D4" />
            </div>
            <h3 style={{ fontSize: '1.2rem', fontWeight: '500' }}>Mobile App</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Encrypts payloads with AES-256-GCM and sends via WebSocket.</p>
          </div>
          
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
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

      {/* ── Use Cases Section ── */}
      <div className="page-wrapper" style={{ paddingTop: '6rem' }}>
        <div className="section-header">
          <h1 style={{ fontSize: '2.5rem' }}>Infinite Capabilities</h1>
          <p>By leveraging the Model Context Protocol (MCP), Baton can communicate with practically any local system.</p>
        </div>

        <div className="bento-grid">
          <div className="bento-card span-4" style={{ background: '#0a0a0c' }}>
            <Zap className="card-icon" color="#eab308" />
            <h3>Local Llama 3</h3>
            <p style={{ fontSize: '0.9rem' }}>Chat securely with models running on Ollama, LM Studio, or vLLM running on your local rig.</p>
          </div>
          <div className="bento-card span-4" style={{ background: '#0a0c0a' }}>
            <Database className="card-icon" color="#10b981" />
            <h3>SQL Databases</h3>
            <p style={{ fontSize: '0.9rem' }}>Query your local PostgreSQL or SQLite databases directly from your phone while on the go.</p>
          </div>
          <div className="bento-card span-4" style={{ background: '#0c0a0c' }}>
            <Cpu className="card-icon" color="#a855f7" />
            <h3>Home Assistant</h3>
            <p style={{ fontSize: '0.9rem' }}>Control your smart home infrastructure through natural language without exposing ports.</p>
          </div>
        </div>
      </div>

    </div>
  );
}

const Database = ({ className, color = "currentColor" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M3 5V19A9 3 0 0 0 21 19V5"/><path d="M3 12A9 3 0 0 0 21 12"/></svg>
);
