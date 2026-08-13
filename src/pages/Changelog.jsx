import React from 'react';
import { Sparkles, Wrench, CheckCircle2 } from 'lucide-react';

const Entry = ({ version, date, badge, icon: Icon, title, items }) => (
  <div className="bento-card" style={{ marginBottom: '1.25rem' }}>
    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
      <Icon size={20} color="var(--text-main)" style={{ flexShrink: 0 }} />
      <div style={{ flex: 1 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
          <h2 style={{ fontSize: '1.2rem', fontWeight: 600, margin: 0 }}>{title}</h2>
          <span style={{ background: 'var(--bg-canvas)', color: 'var(--text-secondary)', border: '1px solid var(--border-color)', padding: '0.2rem 0.65rem', borderRadius: 'var(--radius-sm)', fontSize: '0.75rem', fontFamily: 'var(--font-mono)' }}>{badge}</span>
        </div>
        <div style={{ color: 'var(--text-dim)', fontSize: '0.82rem', marginTop: '0.2rem', fontFamily: 'var(--font-mono)' }}>{version} · {date}</div>
      </div>
    </div>
    <ul style={{ paddingLeft: '1.25rem', color: 'var(--text-muted)', display: 'flex', flexDirection: 'column', gap: '0.45rem', margin: 0, fontSize: '0.92rem' }}>
      {items.map(item => <li key={item}>{item}</li>)}
    </ul>
  </div>
);

export default function Changelog() {
  return (
    <div className="page-wrapper animate-fade-in" style={{ paddingTop: '4rem' }}>
      <div className="section-header" style={{ marginBottom: '2.5rem' }}>
        <h1>Changelog & Product Roadmap</h1>
        <p>
          Continuous improvements, architecture updates, and upcoming features across the BATON ecosystem.
        </p>
      </div>

      <Entry
        version="v0.3-preview" date="2026 Q3"
        badge="UPCOMING"
        icon={Sparkles}
        title="Baton Hub v0.3 — Multi-Agent Parallel Routing"
        items={[
          'Simultaneous multi-agent routing: route different conversational threads to distinct local model instances',
          'Token-by-token streaming through the E2EE WebRTC data channel directly to the smartphone UI',
          'Automated background health checks and model failover in the Hub daemon',
        ]}
      />

      <Entry
        version="v0.2.0" date="July 2026"
        badge="STABLE"
        icon={CheckCircle2}
        title="Baton Hub v0.2 — Standalone Embedded SQLite & Native Pairing"
        items={[
          'Embedded SQLite storage engine by default — zero external database dependencies required',
          'Optional PostgreSQL support via standard DATABASE_URL auto-switch',
          'Local X25519 keypair persistence and cryptographically verified pairing handshake',
          'Local admin dashboard at localhost:8081 for authorized device pairing approvals',
          'Sub-millisecond LAN mDNS discovery for automatic mobile-to-desktop detection',
        ]}
      />

      <Entry
        version="v0.1.0" date="June 2026"
        badge="RELEASED"
        icon={Wrench}
        title="Baton Core & Mobile Client — Initial Release"
        items={[
          'High-throughput Axum/Rust connector bridging mobile client to local MCP servers',
          'Zero-knowledge blind cloud router for encrypted NAT traversal',
          'End-to-End Encryption (AES-256-GCM + X25519) across all mobile packets',
          'Biometric hardware keystore integration and on-device SQLCipher 256-bit database encryption',
          'Out-of-the-box support for Ollama, LM Studio, Mistral, and custom stdio MCP scripts',
        ]}
      />
    </div>
  );
}
