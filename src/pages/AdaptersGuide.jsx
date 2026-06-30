import React, { useState } from 'react';
import { Server, Lock, ArrowRight, ShieldCheck, Code, Box } from 'lucide-react';
import CodeBlock from '../components/CodeBlock';

export default function AdaptersGuide() {
  const [activeTab, setActiveTab] = useState('gemini');

  const geminiCode = `import express from 'express';
import { GoogleAuth } from 'google-auth-library';
import { VertexAI } from '@google-cloud/vertexai';

const app = express();
app.use(express.json());

// Initialize Vertex AI with Application Default Credentials
// NO API KEYS NEEDED IN SOURCE CODE!
const vertex_ai = new VertexAI({
  project: process.env.GOOGLE_CLOUD_PROJECT,
  location: 'us-central1'
});
const model = vertex_ai.preview.getGenerativeModel({ model: 'gemini-1.5-pro' });

// BATON connects to this endpoint
app.post('/baton-mcp', async (req, res) => {
  const userMessage = req.body.messages.pop().content;
  
  // Set up Server-Sent Events for real-time streaming to BATON
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');

  const streamingResp = await model.generateContentStream({
    contents: [{ role: 'user', parts: [{ text: userMessage }] }]
  });

  for await (const chunk of streamingResp.stream) {
    if (chunk.candidates?.[0]?.content?.parts?.[0]?.text) {
      const text = chunk.candidates[0].content.parts[0].text;
      res.write(\`data: \${JSON.stringify({ text })}\\n\\n\`);
    }
  }
  res.end();
});

app.listen(3000, () => console.log('Baton Enterprise Adapter running on port 3000'));`;

  const openaiCode = `import express from 'express';
import OpenAI from 'openai';

const app = express();
app.use(express.json());

// Initialize OpenAI client
// The API key is securely loaded from your server's environment variables
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// BATON connects to this endpoint
app.post('/baton-mcp', async (req, res) => {
  const userMessage = req.body.messages.pop().content;
  
  // Set up Server-Sent Events for real-time streaming to BATON
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');

  const stream = await openai.chat.completions.create({
    model: 'gpt-4o',
    messages: [{ role: 'user', content: userMessage }],
    stream: true,
  });

  for await (const chunk of stream) {
    const text = chunk.choices[0]?.delta?.content || '';
    if (text) {
      res.write(\`data: \${JSON.stringify({ text })}\\n\\n\`);
    }
  }
  res.end();
});

app.listen(3000, () => console.log('OpenAI Codex Adapter running on port 3000'));`;

  const claudeCode = `import express from 'express';
import Anthropic from '@anthropic-ai/sdk';

const app = express();
app.use(express.json());

// Initialize Anthropic client
// Securely loaded from server environment variables
const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

// BATON connects to this endpoint
app.post('/baton-mcp', async (req, res) => {
  const userMessage = req.body.messages.pop().content;
  
  // Set up Server-Sent Events for real-time streaming to BATON
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');

  const stream = await anthropic.messages.create({
    max_tokens: 1024,
    messages: [{ role: 'user', content: userMessage }],
    model: 'claude-3-opus-20240229',
    stream: true,
  });

  for await (const event of stream) {
    if (event.type === 'content_block_delta' && event.delta.text) {
      const text = event.delta.text;
      res.write(\`data: \${JSON.stringify({ text })}\\n\\n\`);
    }
  }
  res.end();
});

app.listen(3000, () => console.log('Claude for Work Adapter running on port 3000'));`;

  return (
    <div className="animate-fade-in page-wrapper">
      <div className="section-header">
        <h1>Enterprise Adapters</h1>
        <p>Zero Trust on mobile. Keep your APIs and billing accounts locked down on your own infrastructure.</p>
      </div>

      <div className="bento-grid">
        <div className="bento-card span-12" style={{ background: 'var(--bg-elevated)', border: '1px solid var(--border)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '2rem', flexWrap: 'wrap' }}>
            <div style={{ flex: '1 1 300px' }}>
              <h2 style={{ fontSize: '2rem', marginBottom: '1rem' }}>The BATON Architecture & Security</h2>
              <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', marginBottom: '1.5rem', lineHeight: '1.6' }}>
                BATON removes the risk of distributing corporate API keys to employee devices. It acts as a routing layer and never stores your LLM API keys. 
              </p>
              <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', lineHeight: '1.6' }}>
                For absolute privacy, BATON implements <strong>End-to-End Encryption (E2EE)</strong> using X25519 Elliptic Curve Diffie-Hellman and AES-256-GCM. 
                Even if the local network is compromised, payloads remain completely unreadable to anyone without the shared secret.
              </p>
            </div>
            <div style={{ flex: '1 1 400px', display: 'flex', flexDirection: 'column', gap: '1rem', padding: '2rem', background: 'var(--bg-card)', borderRadius: '1rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '1rem', background: 'rgba(59, 130, 246, 0.1)', borderRadius: '0.75rem' }}>
                <ShieldCheck className="card-icon" style={{ margin: 0, color: 'var(--accent-blue)' }} />
                <div>
                  <h4 style={{ margin: '0 0 0.25rem' }}>BATON App (Employee Phone)</h4>
                  <p style={{ margin: 0, fontSize: '0.9rem', color: 'var(--text-muted)' }}>Zero Trust Client. E2EE Encrypts Payload.</p>
                </div>
              </div>
              <div style={{ textAlign: 'center', color: 'var(--text-muted)' }}>
                <ArrowRight size={20} style={{ transform: 'rotate(90deg)' }} />
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '1rem', background: 'rgba(255, 159, 10, 0.1)', borderRadius: '0.75rem' }}>
                <Server className="card-icon" style={{ margin: 0, color: '#ff9f0a' }} />
                <div>
                  <h4 style={{ margin: '0 0 0.25rem' }}>Your Adapter Server (Node / Rust)</h4>
                  <p style={{ margin: 0, fontSize: '0.9rem', color: 'var(--text-muted)' }}>Decrypts payload, holds API Keys, streams to app.</p>
                </div>
              </div>
              <div style={{ textAlign: 'center', color: 'var(--text-muted)' }}>
                <ArrowRight size={20} style={{ transform: 'rotate(90deg)' }} />
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '1rem', background: 'rgba(50, 215, 75, 0.1)', borderRadius: '0.75rem' }}>
                <Lock className="card-icon" style={{ margin: 0, color: '#32d74b' }} />
                <div>
                  <h4 style={{ margin: '0 0 0.25rem' }}>Enterprise AI (Gemini / OpenAI / Claude)</h4>
                  <p style={{ margin: 0, fontSize: '0.9rem', color: 'var(--text-muted)' }}>Billed securely to corporate accounts.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bento-card span-12">
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
            <Box className="card-icon" style={{ margin: 0 }} />
            <h3 style={{ margin: 0 }}>Adapter Builder Guide (Rust & Node.js)</h3>
          </div>
          <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
            For maximum security and performance, we recommend deploying our production-grade **Rust Adapter**. We also provide a Node.js SDK for fast prototyping.
          </p>
          
          <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '1rem' }}>
            <button 
              className={activeTab === 'gemini' ? 'btn-primary' : 'btn-secondary'}
              onClick={() => setActiveTab('gemini')}
            >
              Rust Adapter (E2EE Production)
            </button>
            <button 
              className={activeTab === 'openai' ? 'btn-primary' : 'btn-secondary'}
              onClick={() => setActiveTab('openai')}
            >
              Node.js SDK (E2EE Alternative)
            </button>
            <button 
              className={activeTab === 'claude' ? 'btn-primary' : 'btn-secondary'}
              onClick={() => setActiveTab('claude')}
            >
              Generating Keys (Rust CLI)
            </button>
          </div>

          <div style={{ display: activeTab === 'gemini' ? 'block' : 'none' }}>
            <h4 style={{ marginBottom: '1rem', color: 'var(--accent-blue)' }}>Rust Adapter Setup (`mcp-connector`)</h4>
            <p style={{ color: 'var(--text-muted)', marginBottom: '1rem' }}>Configure E2EE and environment variables in a `.env` file:</p>
            <CodeBlock code={`# .env
BATON_PORT=3000
BATON_SECURITY_MODE=secured # Options: standard, signed, secured
BATON_SERVER_PRIVATE_KEY=38b7ef... # 32-byte X25519 private key (Hex)
BATON_CLIENT_PUBLIC_KEY=f8a2de...  # 32-byte X25519 client public key (Hex)
BATON_TIMESTAMP_TOLERANCE_SECS=30 # Replay attack tolerance`} language="bash" />
            <p style={{ color: 'var(--text-muted)', marginTop: '1.5rem', marginBottom: '1rem' }}>Compile and run the server with Cargo:</p>
            <CodeBlock code={`# Build and run the secure Rust adapter
cargo run --release --package mcp-connector`} language="bash" />
          </div>
          <div style={{ display: activeTab === 'openai' ? 'block' : 'none' }}>
            <h4 style={{ marginBottom: '1rem', color: 'var(--accent-blue)' }}>Node.js E2EE Setup (`baton-sdk-node`)</h4>
            <CodeBlock code={`import { BatonAdapter } from 'baton-sdk-node';

// Create an adapter that requires encrypted payloads using X25519 & AES-GCM
const adapter = new BatonAdapter({
  port: 3000,
  mcpTarget: 'Claude',
  security: {
    mode: 'secured',
    serverPrivateKeyHex: process.env.BATON_SERVER_PRIVATE_KEY, // 32-byte hex
    clientPublicKeyHex: process.env.BATON_CLIENT_PUBLIC_KEY,   // 32-byte hex
    timestampToleranceMs: 30000 // Reject requests older than 30s to prevent replay attacks
  }
});

adapter.start();
console.log('Secure E2EE Node Adapter running.');`} language="javascript" />
          </div>
          <div style={{ display: activeTab === 'claude' ? 'block' : 'none' }}>
            <h4 style={{ marginBottom: '1rem', color: 'var(--accent-blue)' }}>Generating Cryptographic Keys via Rust</h4>
            <p style={{ color: 'var(--text-muted)', marginBottom: '1rem' }}>BATON uses standard X25519 key pairs. You can generate secure private and public key pairs in Rust:</p>
            <CodeBlock code={`use x25519_dalek::{StaticSecret, PublicKey};

fn main() {
    let private_key = StaticSecret::random_from_rng(rand::thread_rng());
    let public_key = PublicKey::from(&private_key);
    
    println!("Private Key (Hex): {}", hex::encode(private_key.to_bytes()));
    println!("Public Key (Hex): {}", hex::encode(public_key.as_bytes()));
}`} language="rust" />
          </div>
        </div>
      </div>
    </div>
  );
}
