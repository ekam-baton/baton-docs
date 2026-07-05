import React, { useState } from 'react';
import { Server, ArrowRight, ShieldCheck, Code, Box, Smartphone } from 'lucide-react';
import CodeBlock from '../components/CodeBlock';

export default function AdaptersGuide() {
  const [activeTab, setActiveTab] = useState('nodejs');

  return (
    <div className="animate-fade-in page-wrapper">
      <div className="section-header">
        <h1>Building Custom Adapters</h1>
        <p>Learn how to build a custom backend server to receive messages from the Baton Android app using the official SDK.</p>
      </div>

      <div className="bento-grid">
        <div className="bento-card span-12" style={{ background: 'var(--bg-elevated)', border: '1px solid var(--border)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '2rem', flexWrap: 'wrap' }}>
            <div style={{ flex: '1 1 300px' }}>
              <h2 style={{ fontSize: '2rem', marginBottom: '1rem' }}>How Baton Communicates</h2>
              <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', marginBottom: '1.5rem', lineHeight: '1.6' }}>
                The Baton Android app is a highly secure, local-first HTTP client. When you send a message, Baton sends a POST request to your configured Endpoint URL.
              </p>
              <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', lineHeight: '1.6' }}>
                An "Adapter" receives this request, processes it (e.g., calls an LLM), and streams the response back to your phone via Server-Sent Events (SSE). The easiest way to build one is using our official <strong>Node.js SDK</strong>, which handles all the cryptography and streaming protocols for you.
              </p>
            </div>
            <div style={{ flex: '1 1 400px', display: 'flex', flexDirection: 'column', gap: '1rem', padding: '2rem', background: 'var(--bg-card)', borderRadius: '1rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '1rem', background: 'rgba(59, 130, 246, 0.1)', borderRadius: '0.75rem' }}>
                <Smartphone className="card-icon" style={{ margin: 0, color: 'var(--accent-blue)' }} />
                <div>
                  <h4 style={{ margin: '0 0 0.25rem' }}>Baton Android App</h4>
                  <p style={{ margin: 0, fontSize: '0.9rem', color: 'var(--text-muted)' }}>Sends POST request with JSON chat history.</p>
                </div>
              </div>
              <div style={{ textAlign: 'center', color: 'var(--text-muted)' }}>
                <ArrowRight size={20} style={{ transform: 'rotate(90deg)' }} />
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '1rem', background: 'rgba(255, 159, 10, 0.1)', borderRadius: '0.75rem' }}>
                <Server className="card-icon" style={{ margin: 0, color: '#ff9f0a' }} />
                <div>
                  <h4 style={{ margin: '0 0 0.25rem' }}>Baton Node SDK Server</h4>
                  <p style={{ margin: 0, fontSize: '0.9rem', color: 'var(--text-muted)' }}>Decrypts payload, calls LLM, streams response.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bento-card span-12">
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
            <Box className="card-icon" style={{ margin: 0 }} />
            <h3 style={{ margin: 0 }}>Adapter Builder Guide</h3>
          </div>
          <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
            First, install the official SDK package for Node.js:
          </p>
          <CodeBlock code={`npm install @baton/sdk`} language="bash" />
          
          <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '1rem', marginTop: '2rem' }}>
            <button 
              className={activeTab === 'nodejs' ? 'btn-primary' : 'btn-secondary'}
              onClick={() => setActiveTab('nodejs')}
            >
              Basic Server (Standard)
            </button>
            <button 
              className={activeTab === 'secure' ? 'btn-primary' : 'btn-secondary'}
              onClick={() => setActiveTab('secure')}
            >
              E2EE Secure Server
            </button>
          </div>

          <div style={{ display: activeTab === 'nodejs' ? 'block' : 'none' }}>
            <h4 style={{ marginBottom: '1rem', color: 'var(--accent-blue)' }}>Standard Adapter</h4>
            <p style={{ color: 'var(--text-muted)', marginBottom: '1rem' }}>A simple adapter running in standard HTTP mode. We highly recommend adding an API Key if exposing this over the internet.</p>
            <CodeBlock code={`import { BatonAdapter } from '@baton/sdk';

const adapter = new BatonAdapter({
  port: 3000,
  endpoint: '/api/chat',
  security: { 
    mode: 'standard',
    apiKey: 'your-super-secret-token' // Required to prevent open relay
  }
});

// The SDK handles all HTTP/SSE routing. Just provide a message handler:
adapter.onMessage(async (messages, stream) => {
  const lastMessage = messages[messages.length - 1].content;
  console.log("User said:", lastMessage);

  // Stream your response back in chunks
  stream("Hello from the ");
  stream("official Node SDK!");
});

adapter.start();`} language="typescript" />
          </div>

          <div style={{ display: activeTab === 'secure' ? 'block' : 'none' }}>
            <h4 style={{ marginBottom: '1rem', color: 'var(--accent-green)' }}>End-to-End Encrypted Adapter</h4>
            <p style={{ color: 'var(--text-muted)', marginBottom: '1rem' }}>Configure the SDK to use AES-256-GCM encryption and HMAC signatures. Run <code>BatonAdapter.generateKeypair()</code> to get your server keys.</p>
            <CodeBlock code={`import { BatonAdapter } from '@baton/sdk';

const adapter = new BatonAdapter({
  port: 3000,
  endpoint: '/api/chat',
  security: { 
    mode: 'sovereign', // Highest security mode (E2EE + Signatures)
    serverPrivateKeyHex: 'your-server-private-key-hex',
    clientPublicKeyHex: 'the-android-app-public-key-hex',
  }
});

adapter.onMessage(async (messages, stream) => {
  // Messages are automatically decrypted here
  const lastMessage = messages[messages.length - 1].content;
  
  // Streamed chunks are automatically AES encrypted before transmission
  stream("I am completely private.");
});

adapter.start();`} language="typescript" />
          </div>
        </div>
      </div>
    </div>
  );
}
