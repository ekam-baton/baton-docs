import React from 'react';
import { Blocks, Workflow, Server, CloudCog } from 'lucide-react';

export default function Integrations() {
  return (
    <div className="page-wrapper animate-fade-in">
      <div className="section-header">
        <h1 className="section-title">
          <Blocks className="title-icon" style={{ display: 'inline', verticalAlign: 'middle', marginRight: '1rem' }} /> 
          Connect to Anything
        </h1>
        <p className="section-subtitle">
          Because the Baton Android App functions as an HTTP client, you can connect it to any platform that accepts webhooks or REST API POST requests.
        </p>
      </div>

      <div className="bento-grid">
        <div className="bento-card span-6">
          <Workflow className="card-icon" />
          <h3>No-Code Workflow Automations</h3>
          <p>Instantly trigger complex workflows across thousands of apps by pasting a Webhook URL into the Baton app.</p>
          <ul style={{ paddingLeft: '1.5rem', marginTop: '1rem', color: 'var(--text-muted)' }}>
            <li style={{ marginBottom: '0.5rem' }}><strong>Make.com & Zapier:</strong> Point BATON to a "Catch Hook" to pass mobile text input directly into your automated pipelines.</li>
            <li><strong>n8n:</strong> Highly popular open-source workflow automation. Simply set up an HTTP Webhook trigger.</li>
          </ul>
        </div>

        <div className="bento-card span-6">
          <Server className="card-icon" />
          <h3>Custom AI Backends</h3>
          <p>Build your own custom AI server and use Baton as your zero-trust mobile UI.</p>
          <ul style={{ paddingLeft: '1.5rem', marginTop: '1rem', color: 'var(--text-muted)' }}>
            <li style={{ marginBottom: '0.5rem' }}>Deploy a custom Node.js or Python backend on AWS, Linode, or Hetzner.</li>
            <li>Point the app directly to an OpenAI-compatible server running locally on your hardware.</li>
          </ul>
        </div>

        <div className="bento-card span-12">
          <CloudCog className="card-icon" />
          <h3>Cloud Serverless Functions</h3>
          <p>You don't need a heavy server. Write a tiny cloud function that receives Baton's message, performs logic, and replies.</p>
          <ul style={{ paddingLeft: '1.5rem', marginTop: '1rem', color: 'var(--text-muted)' }}>
            <li><strong>Cloudflare Workers, AWS Lambda, Vercel:</strong> Build highly scalable endpoints without managing infrastructure. Paste the endpoint URL into the Baton app and add your API key.</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
