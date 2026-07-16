import React from 'react';
import { GitCommit, Sparkles, Wrench, CheckCircle } from 'lucide-react';

const Entry = ({ version, date, badge, badgeColor, icon: Icon, iconColor, title, items }) => (
  <div className="bento-card" style={{ borderLeft: `4px solid ${badgeColor}`, marginBottom: '1rem' }}>
    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
      <Icon size={22} color={iconColor || badgeColor} style={{ flexShrink: 0 }} />
      <div style={{ flex: 1 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
          <h2 style={{ fontSize: '1.3rem', fontWeight: 700, margin: 0 }}>{title}</h2>
          <span style={{ background: `${badgeColor}22`, color: badgeColor, border: `1px solid ${badgeColor}44`, padding: '0.2rem 0.8rem', borderRadius: '99px', fontSize: '0.78rem', fontWeight: 700 }}>{badge}</span>
        </div>
        <div style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginTop: '0.2rem' }}>{version} · {date}</div>
      </div>
    </div>
    <ul style={{ paddingLeft: '1.25rem', color: 'var(--text-muted)', display: 'flex', flexDirection: 'column', gap: '0.4rem', margin: 0 }}>
      {items.map(item => <li key={item}>{item}</li>)}
    </ul>
  </div>
);

export default function Changelog() {
  return (
    <div className="page-wrapper animate-fade-in" style={{ paddingTop: '6rem' }}>
      <div className="section-header" style={{ marginBottom: '3rem' }}>
        <h1>Changelog & Roadmap</h1>
        <p>
          What's shipped, what's in progress, and what's next.
        </p>
      </div>

      <Entry
        version="Upcoming" date="2026 Q3"
        badge="UPCOMING" badgeColor="#8b5cf6"
        icon={Sparkles} iconColor="#8b5cf6"
        title="Pre-built binaries & one-click installer"
        items={[
          'Distribute the Baton Connector as a signed binary for Windows (.exe), macOS (.app), and Linux',
          'No Rust toolchain needed — download and run immediately',
          'Automatic update checks built into the dashboard',
        ]}
      />

      <Entry
        version="Upcoming" date="2026 Q3"
        badge="UPCOMING" badgeColor="#3b82f6"
        icon={GitCommit} iconColor="#3b82f6"
        title="Baton Connector v0.3 — Multi-agent routing"
        items={[
          'Route different conversation threads to different local agents',
          'Agent health monitoring and automatic failover in the admin dashboard',
          'Stream token-by-token responses through the E2EE tunnel to the phone',
        ]}
      />

      <Entry
        version="v0.2" date="July 2026"
        badge="CURRENT" badgeColor="#10b981"
        icon={CheckCircle} iconColor="#10b981"
        title="Baton Connector — Standalone, SQLite by default"
        items={[
          'Switched from Postgres-only to embedded SQLite by default — no Docker or external database required',
          'Postgres still supported: set DATABASE_URL=postgres://... and the same binary auto-switches',
          'X25519 keypair generated and persisted on first run (baton_x25519_key.bin)',
          'Admin password auto-generated on first run and saved to baton_admin_password.txt',
          'Admin dashboard at localhost:8081 shows pending/approved devices with approve/deny buttons',
          'Rate limiting on all endpoints (configurable via RATE_LIMIT_RPM and PAIR_RATE_LIMIT_PER_MIN)',
          'mDNS broadcast for automatic LAN discovery from the Android app',
        ]}
      />

      <Entry
        version="v0.1" date="June 2026"
        badge="RELEASED" badgeColor="#6366f1"
        icon={Wrench} iconColor="#6366f1"
        title="Baton Connector — Initial release"
        items={[
          'Baton Connector built in Rust with Axum — routes MCP calls from the Android app to local agents',
          'A2A cloud router (zero-knowledge relay) for routing encrypted messages between phone and Connector',
          'AES-256-GCM end-to-end encryption over all messages',
          'QR-code device pairing: phone scans Connector QR, Connector generates matching session keypair',
          'JWT authentication (HS256) with access + refresh token pair',
          'Support for Ollama, Anthropic, Gemini, OpenAI-compatible, and Nvidia NIM providers',
          'MCP stdio adapter: connect any agent that speaks MCP over stdin/stdout',
          'Android app: E2EE chat, biometric auth, SQLCipher local storage, QR pairing',
        ]}
      />
    </div>
  );
}
