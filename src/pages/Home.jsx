import React from 'react';
import { Layers, Zap, Lock, Cpu, Globe2, Link, Shield, FileCheck } from 'lucide-react';
import RoutingNexus from '../components/RoutingNexus';
import Starfield from '../components/Starfield';

export default function Home() {
  return (
    <div className="animate-fade-in" style={{ position: 'relative' }}>
      
      {/* Interactive Universe Background */}
      <Starfield />

      {/* Hero Section */}
      <div className="hero-section" style={{ position: 'relative', zIndex: 1, minHeight: '80vh', paddingTop: '2rem', flexWrap: 'wrap', alignItems: 'center' }}>
        <div className="hero-content" style={{ flex: '1 1 500px', zIndex: 10 }}>
          <h1 className="hero-title" style={{ textAlign: 'left', textShadow: '0 10px 30px rgba(0,0,0,0.8)' }}>The Universal Mobile Router for AI Agents</h1>
          <p className="hero-subtitle" style={{ margin: '0 0 3rem', textAlign: 'left', textShadow: '0 5px 15px rgba(0,0,0,0.8)' }}>
            BATON is a highly secure, local-first Android client. Connect to your local AI agents, custom webhooks, or cloud endpoints using encrypted tunnels—all without storing your API keys in the cloud.
          </p>
          <div style={{ marginTop: '1rem' }}>
            <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', fontWeight: 500, borderLeft: '3px solid var(--accent-blue)', paddingLeft: '1rem' }}>
              Available on Play Store and Coming soon to Apple Store.
            </p>
          </div>
        </div>
        
        <div className="hero-mockup-container" style={{ flex: '1 1 500px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <RoutingNexus />
        </div>
      </div>

      {/* Feature Grid */}
      <div className="page-wrapper" style={{ position: 'relative', zIndex: 1, background: 'linear-gradient(to bottom, rgba(2,6,23,0) 0%, var(--bg-dark) 200px)', paddingTop: '8rem' }}>
        <div className="bento-grid">
          <div className="bento-card span-8">
            <Globe2 className="card-icon" />
            <h3>Zero-Trust Mobile Routing</h3>
            <p style={{ fontSize: '1.1rem' }}>
              BATON is a pure client. It acts as the universal bridge between your phone and your autonomous systems, never logging your chat data on external servers.
            </p>
          </div>
          
          <div className="bento-card span-4">
            <Shield className="card-icon" />
            <h3>Firebase Auth</h3>
            <p>Secure identity management powered by Firebase Authentication, ensuring only authorized users can access your configured agents.</p>
          </div>

          <div className="bento-card span-6">
            <Lock className="card-icon" />
            <h3>SQLCipher</h3>
            <p>All of your agent configurations, API keys, and chat histories are locally encrypted on your Android device using SQLCipher 256-bit AES encryption.</p>
          </div>

          <div className="bento-card span-6">
            <Link className="card-icon" />
            <h3>Deep Link Provisioning</h3>
            <p>Distribute agent configurations to your team instantly. A simple tap on a Baton deep-link securely configures endpoints and auth types inside the app.</p>
          </div>

          <div className="bento-card span-6">
            <Zap className="card-icon" />
            <h3>Cloudflare & Ngrok</h3>
            <p>Natively designed to work with secure tunneling tools, letting you expose local LLMs to your phone without opening ports on your home router.</p>
          </div>

          <div className="bento-card span-6">
            <Layers className="card-icon" />
            <h3>Strict Network Security</h3>
            <p>The Android app implements strict Network Security Configurations, enforcing HTTPS, blocking cleartext traffic, and providing hooks for certificate pinning.</p>
          </div>

          <div className="bento-card span-12" style={{ background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.1) 0%, rgba(5, 150, 105, 0.05) 100%)', border: '1px solid rgba(16, 185, 129, 0.2)' }}>
            <FileCheck className="card-icon" style={{ color: '#10b981' }} />
            <h3 style={{ color: '#10b981' }}>Global Governance Standard: Forensically Audit-Ready</h3>
            <p style={{ fontSize: '1.1rem', marginBottom: '1rem' }}>
              BATON is architected for universal legal admissibility, aligning with the strictest global evidentiary standards:
            </p>
            <ul style={{ fontSize: '1.05rem', color: 'var(--text-muted)', paddingLeft: '1.5rem', marginBottom: '1rem', lineHeight: '1.6' }}>
              <li><strong>ISO/IEC 27037 (Global)</strong>: Evidence is packaged in a standardized, open `.zip` archive alongside a detached `.sig` cryptographic signature, guaranteeing verifiable Chain of Custody by any independent forensic lab.</li>
              <li><strong>eIDAS Regulation (EU/UK)</strong>: Supports injection of third-party Qualified Certificates from Qualified Trust Service Providers (QTSP), elevating logs to <strong>Qualified Electronic Signatures (QES)</strong> (the legal equivalent of a handwritten signature).</li>
              <li><strong>CISA & DISA STIG (US)</strong>: Tamper-evident <strong>Merkle Tree Hash Chains</strong> ensure absolute data integrity.</li>
              <li><strong>IT Act Sec 65B (India)</strong>: Cryptographically secure <strong>Hardware-Backed Digital Signatures (Android Keystore)</strong> provide strict non-repudiation and origin proof.</li>
            </ul>
          </div>

          <div className="bento-card span-12" style={{ textAlign: 'center', padding: '4rem 2rem', background: 'radial-gradient(circle at 50% 0%, rgba(59, 130, 246, 0.15) 0%, transparent 70%), var(--bg-card)' }}>
            <Cpu className="card-icon" style={{ margin: '0 auto 1.5rem', width: '48px', height: '48px' }} />
            <h2 style={{ fontSize: '2.5rem', fontWeight: 700, marginBottom: '1rem', letterSpacing: '-0.02em' }}>Enterprise Architecture. Local Control.</h2>
            <p style={{ maxWidth: '600px', margin: '0 auto', fontSize: '1.15rem', color: 'var(--text-muted)' }}>
              BATON doesn't lock you into a vendor ecosystem. It gives you an enterprise-grade mobile interface, complete with Fake Billing flows and API Key management, to control the custom AI endpoints you build on your own hardware.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
