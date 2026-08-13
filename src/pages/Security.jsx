import React from 'react';
import { Lock, Shield, Server, Key, Database, FileCheck } from 'lucide-react';

export default function Security() {
  return (
    <div className="animate-fade-in page-wrapper" style={{ paddingTop: '4rem' }}>
      <div className="section-header">
        <h1>Security & Cryptographic Architecture</h1>
        <p>
          BATON is engineered under zero-trust principles: we mathematically cannot inspect, store, or monetize your private chats, prompts, or model parameters.
        </p>
      </div>

      <div className="bento-grid">
        {/* Core Architecture */}
        <div className="bento-card span-12">
          <h2>Three-Tier Zero-Knowledge Topology</h2>
          <p style={{ fontSize: '1rem', marginBottom: '1.5rem' }}>
            BATON separates message routing from message decryption. The mobile application and desktop hub hold exclusive possession of the asymmetric keypairs needed to read your conversations.
          </p>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.25rem' }}>
            <div style={{ background: 'var(--bg-canvas)', padding: '1.25rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                <Key size={18} color="var(--text-main)" />
                <h4 style={{ color: 'var(--text-main)', margin: 0 }}>1. On-Device Encryption</h4>
              </div>
              <p style={{ fontSize: '0.88rem' }}>Messages, file attachments, and tool arguments are encrypted locally using AES-256-GCM before leaving memory.</p>
            </div>

            <div style={{ background: 'var(--bg-canvas)', padding: '1.25rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                <Server size={18} color="var(--text-main)" />
                <h4 style={{ color: 'var(--text-main)', margin: 0 }}>2. Blind Cloud Relay</h4>
              </div>
              <p style={{ fontSize: '0.88rem' }}>The relay server only inspects the <code>destination_id</code> header to route ciphertext envelopes. It holds no cryptographic keys.</p>
            </div>

            <div style={{ background: 'var(--bg-canvas)', padding: '1.25rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                <Lock size={18} color="var(--text-main)" />
                <h4 style={{ color: 'var(--text-main)', margin: 0 }}>3. Local Hub Decryption</h4>
              </div>
              <p style={{ fontSize: '0.88rem' }}>Your personal desktop hub decrypts payloads using the paired private key and dispatches tasks to local MCP models.</p>
            </div>
          </div>
        </div>

        {/* Cryptographic Specifications */}
        <div className="bento-card span-6">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
            <Shield className="card-icon" style={{ margin: 0 }} />
            <h3 style={{ margin: 0 }}>Cryptographic Primitives</h3>
          </div>
          <ul style={{ paddingLeft: '1.25rem', color: 'var(--text-muted)', display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.92rem' }}>
            <li><strong>Key Agreement:</strong> Elliptic-curve Diffie-Hellman over Curve25519 (X25519).</li>
            <li><strong>Symmetric Cipher:</strong> AES-256-GCM with unique, non-repeating initialization vectors (IVs) per frame.</li>
            <li><strong>Identity & Signatures:</strong> Ed25519 / ECDSA (secp256r1) hardware-backed keys.</li>
            <li><strong>Integrity Verification:</strong> HMAC-SHA256 message authentication.</li>
          </ul>
        </div>

        {/* Device Storage Security */}
        <div className="bento-card span-6">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
            <Database className="card-icon" style={{ margin: 0 }} />
            <h3 style={{ margin: 0 }}>Hardware Keystore & SQLCipher</h3>
          </div>
          <ul style={{ paddingLeft: '1.25rem', color: 'var(--text-muted)', display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.92rem' }}>
            <li><strong>Android Keystore:</strong> Private keys are generated within the Trusted Execution Environment (TEE) or StrongBox keymaster.</li>
            <li><strong>Biometric Gating:</strong> Master keys require user fingerprint or facial authentication before decrypting session caches.</li>
            <li><strong>Encrypted SQLite:</strong> Local chat archives are stored on-device inside SQLCipher databases with 256-bit AES page encryption.</li>
            <li><strong>Zero Backup Leakage:</strong> <code>allowBackup="false"</code> is enforced in Android manifest.</li>
          </ul>
        </div>

        {/* Forensic Auditability */}
        <div className="bento-card span-12">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
            <FileCheck className="card-icon" style={{ margin: 0 }} />
            <h3 style={{ margin: 0 }}>Tamper-Evident Evidence Ledger (ISO/IEC 27037)</h3>
          </div>
          <p style={{ marginBottom: '1rem' }}>
            For enterprise compliance and legal forensic verification, BATON optionally maintains a cryptographic Merkle Tree hash chain of system actions and tool executions:
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1rem' }}>
            <div style={{ background: 'var(--bg-canvas)', padding: '1rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)' }}>
              <strong style={{ color: 'var(--text-main)', fontSize: '0.9rem' }}>Merkle Hash Chaining</strong>
              <p style={{ fontSize: '0.85rem', marginTop: '0.25rem' }}>Every log entry incorporates the cryptographic hash of the prior entry, ensuring any database tampering is immediately detectable.</p>
            </div>
            <div style={{ background: 'var(--bg-canvas)', padding: '1rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)' }}>
              <strong style={{ color: 'var(--text-main)', fontSize: '0.9rem' }}>eIDAS QES Compliance</strong>
              <p style={{ fontSize: '0.85rem', marginTop: '0.25rem' }}>Compatible with MDM-injected Qualified Trust Service Provider (QTSP) certificates for qualified digital signatures.</p>
            </div>
            <div style={{ background: 'var(--bg-canvas)', padding: '1rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)' }}>
              <strong style={{ color: 'var(--text-main)', fontSize: '0.9rem' }}>Standardized Export</strong>
              <p style={{ fontSize: '0.85rem', marginTop: '0.25rem' }}>Export audit records directly to standardized ISO/IEC 27037 compliant <code>.zip</code> packages with detached <code>.sig</code> signatures.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
