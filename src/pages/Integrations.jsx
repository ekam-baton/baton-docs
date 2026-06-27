import React from 'react';
import CodeTabs from '../components/CodeTabs';
import { Blocks, Workflow, Home, Server, Code2, CloudCog } from 'lucide-react';

export default function Integrations() {
  return (
    <div className="page-wrapper animate-fade-in">
      <div className="section-header">
        <h1 className="section-title">
          <Blocks className="title-icon" style={{ display: 'inline', verticalAlign: 'middle', marginRight: '1rem' }} /> 
          Connect to Anything
        </h1>
        <p className="section-subtitle">
          BATON only requires a simple Backend API URL to work. This makes it universally compatible with almost any platform on the internet. Paste a Webhook URL, and BATON becomes your remote control!
        </p>
      </div>

      <div className="bento-grid">
        <div className="bento-card span-6">
          <Workflow className="card-icon" />
          <h3>No-Code / Low-Code Automations</h3>
          <p>Instantly trigger complex workflows across thousands of apps.</p>
          <ul style={{ paddingLeft: '1.5rem', marginTop: '1rem', color: 'var(--text-muted)' }}>
            <li style={{ marginBottom: '0.5rem' }}><strong>Microsoft Power Automate:</strong> Create a flow with the "When an HTTP request is received" trigger and paste the URL into BATON.</li>
            <li style={{ marginBottom: '0.5rem' }}><strong>Zapier & Make.com:</strong> Point BATON to a "Catch Hook" to connect with 5,000+ apps.</li>
            <li><strong>n8n:</strong> Highly popular open-source workflow automation.</li>
          </ul>
        </div>

        <div className="bento-card span-6">
          <Code2 className="card-icon" />
          <h3>Custom AI & Agent Frameworks</h3>
          <p>Build your own custom AI workforce and use BATON as the stunning mobile frontend.</p>
          <ul style={{ paddingLeft: '1.5rem', marginTop: '1rem', color: 'var(--text-muted)' }}>
            <li style={{ marginBottom: '0.5rem' }}><strong>Antigravity:</strong> Interface with advanced autonomous coding agents.</li>
            <li style={{ marginBottom: '0.5rem' }}><strong>LangChain & LangGraph:</strong> Connect conversational AI apps.</li>
            <li><strong>CrewAI & AutoGen:</strong> Unified chat interface for AI teams.</li>
          </ul>
        </div>

        <div className="bento-card span-4">
          <Server className="card-icon" />
          <h3>Developers & Self-Hosters</h3>
          <p>Bring your own server. Your rules, your code, total privacy.</p>
          <ul style={{ paddingLeft: '1.5rem', marginTop: '1rem', color: 'var(--text-muted)' }}>
            <li style={{ marginBottom: '0.5rem' }}>Deploy a custom backend on AWS, Linode, or Hetzner.</li>
            <li>Run Llama 3 via <strong>Ollama</strong> or <strong>LM Studio</strong> completely offline.</li>
          </ul>
        </div>

        <div className="bento-card span-4">
          <Home className="card-icon" />
          <h3>Smart Home Control</h3>
          <p>Use BATON as a dedicated chat interface to control your physical world.</p>
          <ul style={{ paddingLeft: '1.5rem', marginTop: '1rem', color: 'var(--text-muted)' }}>
            <li><strong>Home Assistant:</strong> Point BATON to a HA webhook to turn on lights, unlock doors, or trigger automation scripts.</li>
          </ul>
        </div>

        <div className="bento-card span-4">
          <CloudCog className="card-icon" />
          <h3>Cloud Serverless Functions</h3>
          <p>Write a tiny script that receives a message, performs logic, and replies instantly.</p>
          <ul style={{ paddingLeft: '1.5rem', marginTop: '1rem', color: 'var(--text-muted)' }}>
            <li><strong>Cloudflare Workers, AWS Lambda, Vercel:</strong> Build highly scalable endpoints without managing infrastructure.</li>
          </ul>
        </div>
      </div>
    </div>
  );
}


