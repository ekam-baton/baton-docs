import React from 'react';

export default function Changelog() {
  return (
    <div className="animate-fade-in inner-page">
      <h1>Changelog</h1>
      <p className="page-intro">
        What's shipped and what's coming next.
      </p>

      <div className="changelog-entry">
        <div className="changelog-meta">
          <span className="changelog-version">v0.3-preview</span>
          <span className="changelog-date">2026 Q3</span>
          <span className="changelog-tag">upcoming</span>
        </div>
        <h3>Multi-agent parallel routing</h3>
        <ul>
          <li>Route different conversation threads to separate local model instances simultaneously</li>
          <li>Token-by-token streaming through the encrypted data channel directly to the mobile UI</li>
          <li>Background health checks and automatic model failover in the connector daemon</li>
        </ul>
      </div>

      <div className="changelog-entry">
        <div className="changelog-meta">
          <span className="changelog-version">v0.2.0</span>
          <span className="changelog-date">July 2026</span>
          <span className="changelog-tag">stable</span>
        </div>
        <h3>Embedded SQLite and native pairing</h3>
        <ul>
          <li>Embedded SQLite storage — no external database dependencies</li>
          <li>Optional PostgreSQL support via <code>DATABASE_URL</code> environment variable</li>
          <li>Local X25519 keypair persistence and cryptographic pairing handshake</li>
          <li>Admin dashboard at <code>localhost:8081</code> for device pairing approvals</li>
          <li>LAN mDNS discovery for automatic mobile-to-desktop detection</li>
        </ul>
      </div>

      <div className="changelog-entry">
        <div className="changelog-meta">
          <span className="changelog-version">v0.1.0</span>
          <span className="changelog-date">June 2026</span>
          <span className="changelog-tag">released</span>
        </div>
        <h3>Initial release</h3>
        <ul>
          <li>Rust connector bridging the mobile app to local MCP servers</li>
          <li>Encrypted relay for NAT traversal without port forwarding</li>
          <li>End-to-end encryption (AES-256-GCM + X25519) on all packets</li>
          <li>Biometric hardware keystore integration and on-device SQLCipher encryption</li>
          <li>Out-of-the-box support for Ollama, LM Studio, and custom MCP scripts</li>
        </ul>
      </div>
    </div>
  );
}
