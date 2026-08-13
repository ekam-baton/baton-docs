import React from 'react';
import { Smartphone, Server, Shield, Lock, Cpu, ArrowRight, Zap, QrCode, FileText, CheckCircle2, ShieldCheck } from 'lucide-react';
import GalaxyBackground from '../components/GalaxyBackground';
import AuditLogFeed from '../components/AuditLogFeed';

export default function Home() {
  return (
    <div className="animate-fade-in" style={{ position: 'relative', minHeight: '100vh', paddingBottom: '4rem' }}>
      <GalaxyBackground />

      {/* ── Hero Section ── */}
      <section className="hero-section" aria-label="Hero Section">
        <div className="hero-content">
          <div className="hero-badge">
            <span className="hero-badge-dot"></span>
            <span>Zero Cloud Storage · E2EE · Sovereign MCP</span>
          </div>

          <h1 className="hero-title">
            Own Your Workflow.<br />Chat with Your Local AI.
          </h1>

          <p className="hero-subtitle">
            BATON is a private, end-to-end encrypted mobile client that connects your smartphone directly to AI models running on your personal computer or private VPS. No third-party data tracking, no open router ports.
          </p>

          <div className="hero-platforms-container">
            {/* Windows + Android */}
            <div className="hero-platform-column">
              <span className="platform-col-header">Windows & Android</span>
              <a 
                href={`${import.meta.env.BASE_URL}Baton_0.1.0_x64_en-US.msi`} 
                download 
                className="btn-boxy btn-primary-boxy"
              >
                <span>Download Windows Hub (.msi)</span>
              </a>
              <a 
                href="https://github.com/ekam-baton/baton/releases/latest/download/app-debug.apk" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="btn-boxy btn-secondary-boxy"
              >
                <span>Download Android APK</span>
              </a>
            </div>

            {/* macOS + iOS */}
            <div className="hero-platform-column">
              <span className="platform-col-header">Apple Ecosystem</span>
              <a 
                href="https://github.com/ekam-baton/baton/releases/latest/download/baton-gateway-engine-macos" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="btn-boxy btn-primary-boxy"
              >
                <span>Download macOS Hub</span>
              </a>
              <a 
                href="https://github.com/ekam-baton/baton/releases/latest/download/BatonNetwork.xcframework.zip" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="btn-boxy btn-secondary-boxy"
              >
                <span>Download iOS Framework</span>
              </a>
            </div>
          </div>
        </div>

        <div className="hero-mockup-container">
          <AuditLogFeed />
        </div>
      </section>

      {/* ── 3-Step Quick Start ── */}
      <section className="page-wrapper" style={{ paddingTop: '3rem' }} aria-label="Quick Start">
        <div className="section-header" style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <h2>Get Started in Three Steps</h2>
          <p style={{ margin: '0 auto' }}>No central accounts or cloud lock-in. Just direct, cryptographic device pairing.</p>
        </div>
        
        <div className="bento-grid">
          <div className="bento-card span-4" style={{ textAlign: 'center', alignItems: 'center' }}>
            <Server className="card-icon" style={{ width: 32, height: 32, marginBottom: '1rem' }} />
            <h3>1. Start the Desktop Hub</h3>
            <p>Run the standalone Baton binary on your computer. It connects to your local Ollama, LM Studio, or custom MCP servers.</p>
          </div>
          
          <div className="bento-card span-4" style={{ textAlign: 'center', alignItems: 'center' }}>
            <Smartphone className="card-icon" style={{ width: 32, height: 32, marginBottom: '1rem' }} />
            <h3>2. Install the Mobile App</h3>
            <p>Open the Baton mobile app on Android or iOS. Biometric hardware keystores generate your sovereign private keys on-device.</p>
          </div>

          <div className="bento-card span-4" style={{ textAlign: 'center', alignItems: 'center' }}>
            <QrCode className="card-icon" style={{ width: 32, height: 32, marginBottom: '1rem' }} />
            <h3>3. Scan to Pair</h3>
            <p>Scan the encrypted pairing QR code on your desktop. Your phone and computer establish a permanent, authenticated link.</p>
          </div>
        </div>
      </section>

      {/* ── Real Capabilities ── */}
      <section className="page-wrapper" style={{ paddingTop: '5rem' }} aria-label="Capabilities">
        <div className="section-header">
          <h2>What You Can Do</h2>
          <p>Baton turns your smartphone into a sovereign control center for your private infrastructure.</p>
        </div>

        <div className="bento-grid">
          <div className="bento-card span-4">
            <Zap className="card-icon" />
            <h3>Private Mobile AI Chat</h3>
            <p>Chat natively from your phone with open-weight models (Llama 3, Mistral, DeepSeek, Qwen) hosted locally on your GPU without cloud rate limits.</p>
          </div>

          <div className="bento-card span-4">
            <Cpu className="card-icon" />
            <h3>Model Context Protocol (MCP)</h3>
            <p>Trigger local Python tools, query private PostgreSQL/SQLite databases, or execute filesystem workflows securely from your mobile device.</p>
          </div>

          <div className="bento-card span-4">
            <ShieldCheck className="card-icon" />
            <h3>Zero-Trust Corporate VPCs</h3>
            <p>Proxy directly to enterprise Anthropic, Azure OpenAI, or Google Cloud Vertex AI instances over authenticated internal networks.</p>
          </div>
        </div>
      </section>

      {/* ── Architecture Section ── */}
      <section className="page-wrapper" style={{ paddingTop: '5rem' }} aria-label="Architecture Topology">
        <div className="section-header">
          <h2>Hybrid Topology: Direct LAN & Zero-Knowledge Relay</h2>
          <p>BATON simultaneously races a direct local connection and a blind TURN relay, ensuring sub-millisecond latency when home and uninterrupted access when away.</p>
        </div>
        
        <div className="architecture-grid">
          <div className="arch-node">
            <div className="arch-icon-wrap">
              <Smartphone size={28} color="var(--text-main)" />
            </div>
            <h3>Mobile App</h3>
            <p>Encrypts payloads locally using X25519 & AES-256-GCM before transmission.</p>
          </div>
          
          <div className="arch-arrow">
            <ArrowRight size={20} />
            <span style={{ fontSize: '0.75rem', fontFamily: 'var(--font-mono)' }}>LAN / TURN</span>
          </div>

          <div className="arch-node">
            <div className="arch-icon-wrap">
              <Server size={28} color="var(--text-main)" />
            </div>
            <h3>Blind Relay</h3>
            <p>Routes encrypted envelopes based on destination ID without access to decryption keys.</p>
          </div>

          <div className="arch-arrow">
            <ArrowRight size={20} />
            <span style={{ fontSize: '0.75rem', fontFamily: 'var(--font-mono)' }}>E2EE</span>
          </div>

          <div className="arch-node">
            <div className="arch-icon-wrap">
              <Cpu size={28} color="var(--text-main)" />
            </div>
            <h3>Desktop Hub</h3>
            <p>Decrypts messages locally and routes requests to local MCP tools and models.</p>
          </div>
        </div>
      </section>

      {/* ── Security & Governance Deep Dive ── */}
      <section className="page-wrapper" style={{ paddingTop: '5rem' }} aria-label="Security Pillars">
        <div className="section-header">
          <h2>Built for Sovereign Privacy & Digital Evidence</h2>
          <p>Engineered for individuals who care about data ownership and teams that require verifiable audit trails.</p>
        </div>

        <div className="bento-grid">
          <div className="bento-card span-8">
            <Lock className="card-icon" />
            <h3>End-to-End Cryptography</h3>
            <p>
              Every conversation is protected by sovereign X25519 key exchange and AES-256-GCM encryption. The cloud router is a dumb pipe that mathematically cannot read your messages or prompts.
            </p>
          </div>

          <div className="bento-card span-4">
            <Shield className="card-icon" />
            <h3>Hardware Keystore Biometrics</h3>
            <p>Session tokens and private keys remain enclosed in your phone's secure hardware enclave, locked behind fingerprint or face authentication.</p>
          </div>

          <div className="bento-card span-4">
            <CheckCircle2 className="card-icon" />
            <h3>On-Device SQLCipher</h3>
            <p>Chat history and agent configurations are encrypted locally with 256-bit AES database encryption.</p>
          </div>

          <div className="bento-card span-8">
            <FileText className="card-icon" />
            <h3>Forensic Audit Ledger (ISO/IEC 27037)</h3>
            <p>
              BATON incorporates a Merkle Tree cryptographic hash chain for evidentiary compliance (eIDAS QES, US CISA/STIG, India IT Act Sec 65B). Export verifiable evidence archives directly from your device.
            </p>
          </div>
        </div>
      </section>

      {/* ── FAQ Section ── */}
      <section className="page-wrapper" style={{ paddingTop: '5rem', paddingBottom: '2rem' }} aria-label="Frequently Asked Questions">
        <div className="section-header">
          <h2>Frequently Asked Questions</h2>
          <p>Clear, direct answers about BATON's architecture, security, and pricing.</p>
        </div>
        
        <div className="faq-container">
          <details className="faq-item">
            <summary>Why does BATON charge a subscription when some chat apps are free?</summary>
            <p>Free applications monetize by collecting telemetry, analyzing chat logs, or serving ads. BATON charges a minimal subscription ($9.99/year globally, ₹199/year in India) to maintain high-throughput, zero-knowledge TURN relay servers without compromising user privacy. We do not store or sell your data.</p>
          </details>
          
          <details className="faq-item">
            <summary>Do my messages or AI responses ever touch the cloud unencrypted?</summary>
            <p>No. Payloads are encrypted on your phone before transmission and decrypted only on your paired desktop or local server. The relay server routes opaque, encrypted JSON envelopes and has zero visibility into plaintext content.</p>
          </details>
          
          <details className="faq-item">
            <summary>What AI models and backends are supported?</summary>
            <p>BATON supports any model or tool running via the Model Context Protocol (MCP) or standard HTTP/SSE endpoints. This includes Ollama, LM Studio, vLLM, LocalAI, Anthropic Claude, Azure OpenAI, and custom Python or Node.js agents.</p>
          </details>

          <details className="faq-item">
            <summary>Do I need to configure port forwarding on my home router?</summary>
            <p>No. BATON's hybrid networking uses automated NAT traversal and relay routing so you can securely reach your home server from cellular networks without exposing open ports or configuring dynamic DNS.</p>
          </details>
        </div>
      </section>
    </div>
  );
}
