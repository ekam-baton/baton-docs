import React from 'react';
import { Building2, Server, Shield, Cpu } from 'lucide-react';

export default function Enterprise() {
  return (
    <div className="animate-fade-in page-wrapper" style={{ paddingTop: '4rem' }}>
      <div className="section-header">
        <h1>Enterprise Architecture & Private VPC Deployment</h1>
        <p>
          Equip workforce teams with secure mobile access to proprietary AI models and internal databases without data leaving your corporate security boundary.
        </p>
      </div>

      <div className="bento-grid">
        {/* Core Enterprise Value */}
        <div className="bento-card span-12">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
            <Building2 className="card-icon" style={{ margin: 0 }} />
            <h2 style={{ margin: 0 }}>Zero Data Egress into Third-Party Clouds</h2>
          </div>
          <p style={{ fontSize: '1rem', marginBottom: '1.5rem' }}>
            Standard AI chat applications require sending corporate prompts to centralized vendor servers. BATON routes encrypted traffic directly to your own private cloud or on-premise infrastructure. No prompts, model weights, or telemetry are ever harvested.
          </p>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.25rem' }}>
            <div style={{ background: 'var(--bg-canvas)', padding: '1.25rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)' }}>
              <h4 style={{ color: 'var(--text-main)', marginBottom: '0.5rem' }}>Self-Hosted Connector</h4>
              <p style={{ fontSize: '0.88rem' }}>Deploy the compiled Rust connector binary as a lightweight Docker container inside your VPC or Kubernetes cluster.</p>
            </div>

            <div style={{ background: 'var(--bg-canvas)', padding: '1.25rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)' }}>
              <h4 style={{ color: 'var(--text-main)', marginBottom: '0.5rem' }}>MDM Configuration</h4>
              <p style={{ fontSize: '0.88rem' }}>Distribute pre-authenticated connection profiles to employee phones using standard MDM deep links and AppConfig.</p>
            </div>

            <div style={{ background: 'var(--bg-canvas)', padding: '1.25rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)' }}>
              <h4 style={{ color: 'var(--text-main)', marginBottom: '0.5rem' }}>Internal Audit Ledger</h4>
              <p style={{ fontSize: '0.88rem' }}>Decrypted audit logs remain strictly within your corporate SIEM/data warehouse for compliance reviews.</p>
            </div>
          </div>
        </div>

        {/* Enterprise Model Proxies */}
        <div className="bento-card span-6">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
            <Cpu className="card-icon" style={{ margin: 0 }} />
            <h3 style={{ margin: 0 }}>Supported Enterprise AI Endpoints</h3>
          </div>
          <ul style={{ paddingLeft: '1.25rem', color: 'var(--text-muted)', display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.92rem' }}>
            <li><strong>Claude for Enterprise:</strong> Proxy securely to Anthropic endpoints via AWS API Gateway and private VPC endpoints.</li>
            <li><strong>Azure OpenAI Service:</strong> Connect to dedicated <code>*.openai.azure.com</code> deployments over private VNets or Tailscale.</li>
            <li><strong>Google Vertex AI:</strong> Direct authenticated routing to Google Cloud Run endpoints via Service Account credentials.</li>
            <li><strong>Self-Hosted vLLM / TensorRT-LLM:</strong> Point BATON directly to GPU clusters running inside your own data center.</li>
          </ul>
        </div>

        {/* Corporate Security & Compliance */}
        <div className="bento-card span-6">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
            <Shield className="card-icon" style={{ margin: 0 }} />
            <h3 style={{ margin: 0 }}>Compliance & Governance</h3>
          </div>
          <ul style={{ paddingLeft: '1.25rem', color: 'var(--text-muted)', display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.92rem' }}>
            <li><strong>eIDAS QES Compliance:</strong> Enterprise certificate manager supports injecting Qualified Trust Service Provider (QTSP) certificates.</li>
            <li><strong>ISO/IEC 27037:</strong> Cryptographic evidence ledger produces legally verifiable forensic archives.</li>
            <li><strong>Hardware Key Isolation:</strong> Android Keymaster / Apple Secure Enclave guarantees that keys cannot be cloned from devices.</li>
            <li><strong>Strict DLP & Role Control:</strong> Model Context Protocol permissions restrict tool execution by user role.</li>
          </ul>
        </div>

        {/* Deployment Snippet */}
        <div className="bento-card span-12">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
            <Server className="card-icon" style={{ margin: 0 }} />
            <h3 style={{ margin: 0 }}>Deploying the Enterprise Hub</h3>
          </div>
          <p style={{ marginBottom: '1rem' }}>
            Deploy the standalone BATON connector via Docker Compose in minutes:
          </p>
          <div className="z-code">
            <div className="code-header">
              <span>docker-compose.yml</span>
              <span>Linux x86_64 / ARM64</span>
            </div>
            <pre><code>{`version: '3.8'

services:
  baton-hub:
    image: ghcr.io/ekam-baton/baton-hub:latest
    restart: always
    environment:
      - PORT=3000
      - DATABASE_URL=sqlite:///data/baton.db
      - RELAY_URL=wss://relay.baton.network
      - MCP_AGENT_DEFAULT_CMD=python3
      - MCP_AGENT_DEFAULT_ARGS=/opt/agents/main.py
    volumes:
      - ./data:/data
    ports:
      - "127.0.0.1:3000:3000"`}</code></pre>
          </div>
        </div>
      </div>
    </div>
  );
}
