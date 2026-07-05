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
                An "Adapter" receives this request, processes it (e.g., calls an LLM), and streams the response back to your phone via Server-Sent Events (SSE) or the standard Model Context Protocol (MCP). The easiest way to build one is using standard HTTP frameworks like Express in Node.js.
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
                  <h4 style={{ margin: '0 0 0.25rem' }}>Your Custom Backend</h4>
                  <p style={{ margin: 0, fontSize: '0.9rem', color: 'var(--text-muted)' }}>Receives payload, calls LLM, streams response via SSE.</p>
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
            To build a backend, you just need a standard HTTP server that can return Server-Sent Events (SSE). Here's how to do it in Node.js:
          </p>
          <CodeBlock code={`npm install express cors`} language="bash" />
          
          <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '1rem', marginTop: '2rem' }}>
            <button 
              className={activeTab === 'nodejs' ? 'btn-primary' : 'btn-secondary'}
              onClick={() => setActiveTab('nodejs')}
            >
              Raw SSE Server (Express)
            </button>
            <button 
              className={activeTab === 'secure' ? 'btn-primary' : 'btn-secondary'}
              onClick={() => setActiveTab('secure')}
            >
              MCP Tool Server
            </button>
          </div>

          <div style={{ display: activeTab === 'nodejs' ? 'block' : 'none' }}>
            <h4 style={{ marginBottom: '1rem', color: 'var(--accent-blue)' }}>Standard Express Adapter</h4>
            <p style={{ color: 'var(--text-muted)', marginBottom: '1rem' }}>A simple Express server returning SSE. (Note: use our 'LLM Prompt' button in the navbar to generate this instantly!)</p>
            <CodeBlock code={`const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

app.post('/api/chat', async (req, res) => {
  const { messages } = req.body;
  const lastMessage = messages[messages.length - 1].content;
  console.log("User said:", lastMessage);

  // Set headers for Server-Sent Events
  res.writeHead(200, {
    'Content-Type': 'text/event-stream',
    'Cache-Control': 'no-cache',
    'Connection': 'keep-alive'
  });

  // Stream your response back in chunks
  res.write(\`data: {"content": "Hello from your "}\\n\\n\`);
  res.write(\`data: {"content": "custom Express backend!"}\\n\\n\`);
  res.write(\`data: [DONE]\\n\\n\`);
  res.end();
});

app.listen(3000, () => console.log('Baton adapter listening on port 3000'));`} language="javascript" />
          </div>

          <div style={{ display: activeTab === 'secure' ? 'block' : 'none' }}>
            <h4 style={{ marginBottom: '1rem', color: 'var(--accent-green)' }}>Model Context Protocol (MCP) Server</h4>
            <p style={{ color: 'var(--text-muted)', marginBottom: '1rem' }}>Baton is fully compatible with MCP servers. You can tunnel an MCP connection over standard HTTP.</p>
            <CodeBlock code={`import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";

const server = new McpServer({
  name: "weather",
  version: "1.0.0"
});

// Add an MCP tool
server.tool(
  "get-weather",
  "Get weather for location",
  { location: z.string() },
  async ({ location }) => {
    return {
      content: [{ type: "text", text: \`Weather in \${location} is sunny.\` }]
    };
  }
);

// Start the server (can be proxied to Baton via an HTTP wrapper)
const transport = new StdioServerTransport();
await server.connect(transport);`} language="typescript" />
          </div>
        </div>
      </div>
    </div>
  );
}
