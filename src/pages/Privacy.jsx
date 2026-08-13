import React from 'react';

export default function Privacy() {
  return (
    <div className="page-wrapper animate-fade-in" style={{ maxWidth: '840px', paddingTop: '4rem' }}>
      <div className="section-header">
        <h1>Privacy Policy</h1>
        <p>Last Updated: June 20, 2026</p>
      </div>

      <div style={{ background: 'var(--bg-card)', padding: '2.5rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
        <p className="legal-text">
          This Privacy Policy explains how BATON ("we", "us", or "our") handles user information. BATON is a secure, personal AI communication interface and bridge engineered with sovereign data privacy and local-first storage as foundational principles.
        </p>

        <h2 className="legal-header">1. DATA WE COLLECT</h2>
        <p className="legal-text">For basic client profile identification and cryptographic handshake routing, the mobile application uses:</p>
        <ul className="legal-list">
          <li>User Profile Identifier (Email Address / Phone Number for device pairing)</li>
          <li>Locally generated X25519 public keys for establishing end-to-end encrypted tunnels</li>
        </ul>
        <p className="legal-text">No passwords or authentication secrets are uploaded to our servers; device access is protected via native hardware biometrics.</p>

        <h2 className="legal-header">2. LOCAL-FIRST STORAGE & ON-DEVICE ENCRYPTION</h2>
        <ul className="legal-list">
          <li><strong>Zero Cloud Databases:</strong> Your chat histories, prompt records, and agent definitions are stored solely on your local smartphone and paired desktop machine.</li>
          <li><strong>Database Encryption:</strong> Mobile storage is secured with 256-bit AES database encryption via SQLCipher.</li>
          <li><strong>Master Key Isolation:</strong> Cryptographic keys are locked within the Android Keystore / Apple Secure Enclave.</li>
        </ul>

        <h2 className="legal-header">3. NETWORK TRANSIT & THIRD-PARTY AI SERVICES</h2>
        <ul className="legal-list">
          <li><strong>Zero-Knowledge Relay:</strong> When connecting over cellular networks, our relay servers route opaque ciphertext envelopes without holding the keys to decrypt your traffic.</li>
          <li><strong>Model Context Protocol (MCP):</strong> Prompts and tool arguments are dispatched directly to your configured local endpoints (e.g., Ollama, LM Studio) or authorized corporate VPCs.</li>
          <li><strong>Third-Party Model Policies:</strong> If you connect BATON to third-party proprietary APIs (Anthropic, OpenAI, Google), the processing of those requests is subject to their respective terms and privacy policies.</li>
        </ul>

        <h2 className="legal-header">4. DATA ERASURE & USER CONTROL</h2>
        <p className="legal-text">You maintain absolute sovereignty over your records:</p>
        <ul className="legal-list">
          <li><strong>Immediate Local Wipe:</strong> Clear all database tables, cryptographic pairing keys, and cache files at any time via <code>Settings &gt; Privacy &amp; Security &gt; Clear All Data</code>.</li>
          <li><strong>Retention Controls:</strong> Configure automated memory pruning and context retention thresholds inside the application.</li>
        </ul>

        <h2 className="legal-header">5. FORENSIC AUDITABILITY (ISO/IEC 27037)</h2>
        <p className="legal-text">
          If forensic logging is enabled, audit hashes are signed on-device via a Merkle Tree chain. Cryptographic evidence archives are stored strictly on-device and can be exported as ISO/IEC 27037 compliant packages with detached signatures.
        </p>

        <h2 className="legal-header">6. CONTACT</h2>
        <p className="legal-text">
          For privacy inquiries or technical verification of our local-first cryptographic design, contact the maintainers at <a href="mailto:ekam.baton@gmail.com" style={{ color: 'var(--text-main)', textDecoration: 'underline' }}>ekam.baton@gmail.com</a>.
        </p>
      </div>
    </div>
  );
}
