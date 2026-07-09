import React, { useState } from 'react';

export default function SecurityArchitecture() {
  const [activeTab, setActiveTab] = useState('local');

  return (
    <div className="page-wrapper animate-fade-in">
      <div className="section-header">
        <h1 className="section-title">Security & Connection Architecture</h1>
        <p className="section-subtitle">
          Baton is a universal, protocol-agnostic router. Instead of proprietary APIs, Baton standardizes all communication using the Model Context Protocol (MCP) wrapped in an HTTP Server-Sent Events (SSE) transport layer.
        </p>
      </div>

      <div style={{
        display: 'flex',
        gap: '1rem',
        marginBottom: '2rem',
        flexWrap: 'wrap',
        justifyContent: 'center'
      }}>
        {['local', 'automation', 'enterprise'].map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            style={{
              padding: '10px 24px',
              borderRadius: '24px',
              border: `1px solid ${activeTab === tab ? 'rgba(61,142,255,0.8)' : 'rgba(255,255,255,0.1)'}`,
              background: activeTab === tab ? 'rgba(61,142,255,0.15)' : 'rgba(255,255,255,0.05)',
              color: activeTab === tab ? '#3D8EFF' : '#fff',
              cursor: 'pointer',
              fontWeight: 600,
              textTransform: 'capitalize',
              transition: 'all 0.2s ease'
            }}
          >
            {tab === 'local' ? 'Local / Personal Cloud' : tab === 'automation' ? 'Automation Agents' : 'Enterprise Environments'}
          </button>
        ))}
      </div>

      <div style={{
        background: 'linear-gradient(135deg, rgba(61,142,255,0.08) 0%, rgba(100,210,255,0.05) 100%)',
        border: '1px solid rgba(61,142,255,0.25)',
        borderRadius: '16px',
        padding: '2rem',
        marginBottom: '3rem',
        minHeight: '400px'
      }}>
        
        {activeTab === 'local' && (
          <div className="animate-fade-in">
            <h2 style={{ fontSize: '1.8rem', color: '#3D8EFF', marginBottom: '1rem' }}>Local Setup & Personal Cloud Servers</h2>
            <p style={{ color: 'rgba(255,255,255,0.7)', lineHeight: 1.6, marginBottom: '2rem' }}>
              For personal self-hosted agents (OpenClaw, NemoClaw, Hermis), Baton cannot directly reach localhost on your laptop unless securely configured via tunnels or tethering.
            </p>
            
            <div style={{ display: 'grid', gap: '1.5rem', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))' }}>
              <div style={{ background: 'rgba(255,255,255,0.04)', padding: '1.5rem', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.08)' }}>
                <h3 style={{ color: '#fff', marginBottom: '0.5rem' }}>🔌 Physical Tethering (ADB Reverse)</h3>
                <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.9rem', marginBottom: '1rem' }}>
                  If your phone is plugged in via USB, you can use ADB reverse port forwarding to tunnel traffic directly without exposing it to the network.
                </p>
                <pre style={{ background: 'rgba(0,0,0,0.4)', padding: '1rem', borderRadius: '8px', color: '#64D2FF', fontSize: '0.85rem' }}>
                  adb reverse tcp:8080 tcp:8080
                </pre>
              </div>
              
              <div style={{ background: 'rgba(255,255,255,0.04)', padding: '1.5rem', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.08)' }}>
                <h3 style={{ color: '#fff', marginBottom: '0.5rem' }}>🌐 Secure Cloudflare/Ngrok Tunnels</h3>
                <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.9rem', marginBottom: '1rem' }}>
                  For wireless or remote access to your personal cloud server (like NemoClaw running on a home NAS), spin up a Cloudflare Tunnel. Baton connects to this secure Edge URL, forwarding traffic without opening home router ports.
                </p>
                <pre style={{ background: 'rgba(0,0,0,0.4)', padding: '1rem', borderRadius: '8px', color: '#64D2FF', fontSize: '0.85rem' }}>
                  cloudflared tunnel --url http://localhost:8080
                </pre>
              </div>

              <div style={{ background: 'rgba(255,255,255,0.04)', padding: '1.5rem', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.08)' }}>
                <h3 style={{ color: '#fff', marginBottom: '0.5rem' }}>🔒 Bring-Your-Own-Server (BYOS) Auth</h3>
                <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.9rem', marginBottom: '1rem' }}>
                  Never expose your personal AI agents to the public. The a2a-router uses BYOS authentication. Simply define a custom <strong>JWT_SECRET</strong> in your server's <code>.env</code> file, and enter this exact secret in the Baton Android App under <em>Settings &gt; Network Configuration &gt; Pipeline Mode (Custom Server)</em>. 
                </p>
                <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.9rem', marginBottom: '0' }}>
                  The app performs a secure challenge-response, exchanging the secret for a short-lived Bearer token before upgrading the connection to WebSocket.
                </p>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'automation' && (
          <div className="animate-fade-in">
            <h2 style={{ fontSize: '1.8rem', color: '#3D8EFF', marginBottom: '1rem' }}>Automation Agents</h2>
            <p style={{ color: 'rgba(255,255,255,0.7)', lineHeight: 1.6, marginBottom: '2rem' }}>
              Automation engines (n8n, LangChain, Flowise) are typically hosted on remote servers (VPS, AWS). Baton treats them as Direct Public Cloud Endpoints.
            </p>
            
            <div style={{ background: 'rgba(255,255,255,0.04)', padding: '1.5rem', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.08)' }}>
              <h3 style={{ color: '#fff', marginBottom: '0.5rem' }}>🔑 Dynamic User API Keys (Revocable Bearer Tokens)</h3>
              <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.9rem', marginBottom: '1rem' }}>
                Instead of a static `.env` master password (which is highly insecure for exposed endpoints), Baton expects the automation server to validate the Bearer token against a database. This allows you to easily revoke a specific device's access if compromised, without shutting down the entire automation engine.
              </p>
              <pre style={{ background: 'rgba(0,0,0,0.4)', padding: '1rem', borderRadius: '8px', color: '#64D2FF', fontSize: '0.85rem', overflowX: 'auto' }}>
{`// Example Validation Middleware
async function authenticateAgentKey(req, res, next) {
    const token = req.headers['authorization'].split(' ')[1];
    const userSession = await db.query('SELECT is_active FROM tokens WHERE token = $1', [token]);
    
    if (userSession.rows.length === 0 || !userSession.rows[0].is_active) {
        return res.status(403).json({ error: 'Access revoked' });
    }
    next();
}`}
              </pre>
            </div>
          </div>
        )}

        {activeTab === 'enterprise' && (
          <div className="animate-fade-in">
            <h2 style={{ fontSize: '1.8rem', color: '#3D8EFF', marginBottom: '1rem' }}>Enterprise Environments</h2>
            <p style={{ color: 'rgba(255,255,255,0.7)', lineHeight: 1.6, marginBottom: '2rem' }}>
              When connecting to highly secure corporate environments (Gemini Enterprise, Claude CoWork, OpenAI Codex), standard API keys are insufficient. Baton integrates using Enterprise-Grade Identity Strategies.
            </p>
            
            <div style={{ display: 'grid', gap: '1.5rem', gridTemplateColumns: '1fr' }}>
              <div style={{ background: 'rgba(255,255,255,0.04)', padding: '1.5rem', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.08)' }}>
                <h3 style={{ color: '#fff', marginBottom: '0.5rem' }}>🛡️ OAuth 2.1 Integration</h3>
                <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.9rem', marginBottom: '0' }}>
                  Baton natively supports enterprise SSO. When you connect, Baton opens a secure browser for corporate identity login (Auth0, Okta). It receives a short-lived JWT and a Refresh Token, attached to every request. IT admins can revoke these sessions instantly from their central console.
                </p>
              </div>
              
              <div style={{ background: 'rgba(255,255,255,0.04)', padding: '1.5rem', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.08)' }}>
                <h3 style={{ color: '#fff', marginBottom: '0.5rem' }}>🔐 Sovereign Signed Keys (Zero-Trust)</h3>
                <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.9rem', marginBottom: '1rem' }}>
                  For maximum security (defense/finance sectors), Baton generates an asymmetric cryptographic keypair (Ed25519) locally inside your Android device's hardware-backed Secure Keystore.
                </p>
                <ul style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.9rem', paddingLeft: '1.5rem', margin: 0 }}>
                  <li style={{ marginBottom: '0.5rem' }}>You register the public key with the enterprise server.</li>
                  <li style={{ marginBottom: '0.5rem' }}>Instead of sending a password over the network, Baton cryptographically signs a timestamped challenge for every single AI query.</li>
                  <li style={{ marginBottom: '0' }}>If an employee leaves, IT simply deletes their public key from the trusted list, permanently severing access.</li>
                </ul>
              </div>
            </div>
          </div>
        )}
        
      </div>
    </div>
  );
}
