import React from 'react';
import { Server, Shield } from 'lucide-react';

export default function Enterprise() {
  return (
    <div className="animate-fade-in page-wrapper" style={{ paddingTop: '6rem' }}>
      <div className="section-header">
        <h1>Enterprise Deployment</h1>
        <p>Scale Baton across your organization. Provide teams with secure, native access to internal AI models without VPNs or exposing endpoints to the public internet.</p>
      </div>

      <div className="bento-grid" style={{ marginTop: '3rem' }}>
        
        <div className="bento-card span-12">
          <h2>Zero-Trust Architecture</h2>
          <p>
            Deploy the Baton Connector on your internal VPS or private cloud. Employees pair their Android devices directly with the Connector using our Zero-Knowledge Cloud Relay. 
            No sensitive data is ever decrypted outside of your network perimeter.
          </p>
        </div>

        <div className="bento-card span-6">
          <Server className="card-icon" />
          <h2>Self-Hosted Control</h2>
          <p>Run the entire stack within your VPC. Integrate with your existing active directory and SSO for agent access control.</p>
        </div>

        <div className="bento-card span-6">
          <Shield className="card-icon" />
          <h2>Audit Logging</h2>
          <p>Every message passing through the enterprise connector is logged locally (after decryption) for compliance and auditing purposes.</p>
        </div>

      </div>
    </div>
  );
}
