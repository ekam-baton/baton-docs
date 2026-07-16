import React from 'react';
import { Lock, Shield, Server } from 'lucide-react';

export default function Security() {
  return (
    <div className="animate-fade-in page-wrapper" style={{ paddingTop: '6rem' }}>
      <div className="section-header">
        <h1>Safety & Security</h1>
        <p>Baton's architecture guarantees that even we cannot read your conversations. Your data is encrypted before it leaves your device.</p>
      </div>

      <div className="bento-grid" style={{ marginTop: '3rem' }}>
        
        <div className="bento-card span-12">
          <h2>Three Layers. Zero Leaks.</h2>
          <p>
            Baton uses a three-pillar architecture. The Android App encrypts messages using X25519 and AES-256-GCM. 
            The A2A Cloud Relay is a dumb, zero-knowledge router. The Desktop Connector decrypts the messages locally and forwards them to your AI agents.
          </p>
        </div>

        <div className="bento-card span-4">
          <Lock className="card-icon" />
          <h2>Local Key Generation</h2>
          <p>Cryptographic keys are generated on-device and stored in the Android Hardware Keystore.</p>
        </div>

        <div className="bento-card span-4">
          <Shield className="card-icon" />
          <h2>Perfect Forward Secrecy</h2>
          <p>Session keys are rotated regularly to ensure past messages cannot be decrypted even if keys are compromised.</p>
        </div>

        <div className="bento-card span-4">
          <Server className="card-icon" />
          <h2>Zero-Knowledge Relay</h2>
          <p>Our cloud infrastructure only routes encrypted blobs and never holds the private keys required to decrypt them.</p>
        </div>

      </div>
    </div>
  );
}
