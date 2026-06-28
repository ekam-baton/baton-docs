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
              <h2 style={{ fontSize: '2rem', marginBottom: '1rem' }}>The BATON Architecture</h2>
              <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', marginBottom: '1.5rem', lineHeight: '1.6' }}>
                BATON completely removes the risks associated with distributing corporate API keys to employee mobile devices. BATON is strictly a universal routing layer. It does not store API keys for OpenAI, Anthropic, or Gemini. 
              </p>
              <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', lineHeight: '1.6' }}>
                Instead, you deploy an <strong>Adapter Server</strong> on your secure infrastructure. The Adapter Server securely authenticates with enterprise LLMs using Identity and Access Management (IAM) or stored secrets. BATON simply connects to the Adapter via a secure tunnel.
              </p>
            </div>
            <div style={{ flex: '1 1 400px', display: 'flex', flexDirection: 'column', gap: '1rem', padding: '2rem', background: 'var(--bg-card)', borderRadius: '1rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '1rem', background: 'rgba(59, 130, 246, 0.1)', borderRadius: '0.75rem' }}>
                <ShieldCheck className="card-icon" style={{ margin: 0, color: 'var(--accent-blue)' }} />
                <div>
                  <h4 style={{ margin: '0 0 0.25rem' }}>BATON App (Employee Phone)</h4>
                  <p style={{ margin: 0, fontSize: '0.9rem', color: 'var(--text-muted)' }}>No API Keys. Zero Trust Client.</p>
                </div>
              </div>
              <div style={{ textAlign: 'center', color: 'var(--text-muted)' }}>
                <ArrowRight size={20} style={{ transform: 'rotate(90deg)' }} />
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '1rem', background: 'rgba(255, 159, 10, 0.1)', borderRadius: '0.75rem' }}>
                <Server className="card-icon" style={{ margin: 0, color: '#ff9f0a' }} />
                <div>
                  <h4 style={{ margin: '0 0 0.25rem' }}>Your Adapter Server (e.g. Google Cloud Run)</h4>
                  <p style={{ margin: 0, fontSize: '0.9rem', color: 'var(--text-muted)' }}>Holds secure credentials, handles MCP streaming.</p>
                </div>
              </div>
              <div style={{ textAlign: 'center', color: 'var(--text-muted)' }}>
                <ArrowRight size={20} style={{ transform: 'rotate(90deg)' }} />
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '1rem', background: 'rgba(50, 215, 75, 0.1)', borderRadius: '0.75rem' }}>
                <Lock className="card-icon" style={{ margin: 0, color: '#32d74b' }} />
                <div>
                  <h4 style={{ margin: '0 0 0.25rem' }}>Enterprise AI (Gemini / OpenAI / Claude)</h4>
                  <p style={{ margin: 0, fontSize: '0.9rem', color: 'var(--text-muted)' }}>Billed securely to your corporate account.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bento-card span-12">
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
            <Box className="card-icon" style={{ margin: 0 }} />
            <h3 style={{ margin: 0 }}>Adapter Builder Guides</h3>
          </div>
          <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
            Choose your preferred Enterprise AI provider below to see how to build a compliant Server-Sent Events (SSE) adapter in Node.js.
          </p>
          
          <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '1rem' }}>
            <button 
              className={activeTab === 'gemini' ? 'btn-primary' : 'btn-secondary'}
              onClick={() => setActiveTab('gemini')}
            >
              Gemini Enterprise
            </button>
            <button 
              className={activeTab === 'openai' ? 'btn-primary' : 'btn-secondary'}
              onClick={() => setActiveTab('openai')}
            >
              OpenAI Codex
            </button>
            <button 
              className={activeTab === 'claude' ? 'btn-primary' : 'btn-secondary'}
              onClick={() => setActiveTab('claude')}
            >
              Claude for Work
            </button>
          </div>

          <div style={{ display: activeTab === 'gemini' ? 'block' : 'none' }}>
            <h4 style={{ marginBottom: '1rem', color: 'var(--accent-blue)' }}>Google Vertex AI Implementation</h4>
            <CodeBlock code={geminiCode} language="javascript" />
          </div>
          <div style={{ display: activeTab === 'openai' ? 'block' : 'none' }}>
            <h4 style={{ marginBottom: '1rem', color: 'var(--accent-blue)' }}>OpenAI Implementation</h4>
            <CodeBlock code={openaiCode} language="javascript" />
          </div>
          <div style={{ display: activeTab === 'claude' ? 'block' : 'none' }}>
            <h4 style={{ marginBottom: '1rem', color: 'var(--accent-blue)' }}>Anthropic Implementation</h4>
            <CodeBlock code={claudeCode} language="javascript" />
          </div>
        </div>
      </div>
    </div>
  );
}
