import React, { useState } from 'react';
import { Terminal, Code2, Cpu, Wrench } from 'lucide-react';

export default function Developers() {
  const [activeLang, setActiveLang] = useState('python');

  return (
    <div className="animate-fade-in page-wrapper" style={{ paddingTop: '4rem' }}>
      <div className="section-header">
        <h1>Developer Guide & MCP Integration</h1>
        <p>
          Connect any Model Context Protocol (MCP) tool, local LLM orchestrator, or custom Python/TypeScript service to your phone through BATON's encrypted bridge.
        </p>
      </div>

      <div className="bento-grid">
        {/* Architecture Overview */}
        <div className="bento-card span-12">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
            <Cpu className="card-icon" style={{ margin: 0 }} />
            <h2 style={{ margin: 0 }}>How BATON MCP Works</h2>
          </div>
          <p style={{ marginBottom: '1.25rem', fontSize: '1rem' }}>
            The BATON mobile app acts as an <strong>MCP Client</strong>. The BATON Desktop Hub runs on your machine as an <strong>MCP Host & Bridge</strong>. When you send a prompt from your phone, the Desktop Hub routes JSON-RPC messages to your registered local tool processes via standard input/output (<code>stdio</code>) or SSE endpoints.
          </p>
          <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
            <div style={{ flex: '1 1 280px', background: 'var(--bg-canvas)', padding: '1.25rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)' }}>
              <h4 style={{ color: 'var(--text-main)', marginBottom: '0.5rem' }}>1. Local Process Isolation</h4>
              <p style={{ fontSize: '0.88rem' }}>Tools run as sub-processes under your user permissions. BATON never requires root/admin escalation.</p>
            </div>
            <div style={{ flex: '1 1 280px', background: 'var(--bg-canvas)', padding: '1.25rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)' }}>
              <h4 style={{ color: 'var(--text-main)', marginBottom: '0.5rem' }}>2. Strict Standard I/O</h4>
              <p style={{ fontSize: '0.88rem' }}>Full adherence to the official Model Context Protocol JSON-RPC specification (v2024-11-05).</p>
            </div>
            <div style={{ flex: '1 1 280px', background: 'var(--bg-canvas)', padding: '1.25rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)' }}>
              <h4 style={{ color: 'var(--text-main)', marginBottom: '0.5rem' }}>3. E2EE Transit</h4>
              <p style={{ fontSize: '0.88rem' }}>All tool requests and outputs are encrypted on-device before traversing the network.</p>
            </div>
          </div>
        </div>

        {/* Code Example Section */}
        <div className="bento-card span-12">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <Code2 className="card-icon" style={{ margin: 0 }} />
              <h3 style={{ margin: 0 }}>Write a Custom MCP Tool Server</h3>
            </div>
            
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <button 
                onClick={() => setActiveLang('python')}
                className={activeLang === 'python' ? 'btn-primary' : 'btn-secondary'}
                style={{ padding: '0.35rem 0.85rem', fontSize: '0.82rem' }}
              >
                Python
              </button>
              <button 
                onClick={() => setActiveLang('typescript')}
                className={activeLang === 'typescript' ? 'btn-primary' : 'btn-secondary'}
                style={{ padding: '0.35rem 0.85rem', fontSize: '0.82rem' }}
              >
                TypeScript / Node.js
              </button>
            </div>
          </div>

          {activeLang === 'python' ? (
            <div className="z-code">
              <div className="code-header">
                <span>server.py (Python FastMCP)</span>
                <span>Python 3.10+</span>
              </div>
              <pre><code>{`# Install: pip install mcp
from mcp.server.fastmcp import FastMCP
import subprocess

# Initialize the FastMCP Server
mcp = FastMCP("LocalTools")

@mcp.tool()
def query_local_database(sql_query: str) -> str:
    """Executes a read-only query against the local SQLite database."""
    import sqlite3
    conn = sqlite3.connect("database.db")
    cursor = conn.cursor()
    cursor.execute(sql_query)
    results = cursor.fetchall()
    conn.close()
    return str(results)

@mcp.tool()
def read_system_status() -> str:
    """Returns current system memory and CPU utilization."""
    import psutil
    cpu = psutil.cpu_percent(interval=1)
    mem = psutil.virtual_memory().percent
    return f"CPU: {cpu}%, RAM: {mem}%"

if __name__ == "__main__":
    mcp.run(transport="stdio")`}</code></pre>
            </div>
          ) : (
            <div className="z-code">
              <div className="code-header">
                <span>server.ts (TypeScript / Node.js SDK)</span>
                <span>Node.js 18+</span>
              </div>
              <pre><code>{`// Install: npm install @modelcontextprotocol/sdk
import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { CallToolRequestSchema, ListToolsRequestSchema } from "@modelcontextprotocol/sdk/types.js";

const server = new Server(
  { name: "custom-node-agent", version: "1.0.0" },
  { capabilities: { tools: {} } }
);

server.setRequestHandler(ListToolsRequestSchema, async () => ({
  tools: [
    {
      name: "get_weather",
      description: "Get local temperature for a given city",
      inputSchema: {
        type: "object",
        properties: { city: { type: "string" } },
        required: ["city"]
      }
    }
  ]
}));

server.setRequestHandler(CallToolRequestSchema, async (request) => {
  if (request.params.name === "get_weather") {
    const city = String(request.params.arguments?.city);
    return { content: [{ type: "text", text: \`Weather in \${city}: 22°C, Sunny\` }] };
  }
  throw new Error("Tool not found");
});

const transport = new StdioServerTransport();
await server.connect(transport);`}</code></pre>
            </div>
          )}
        </div>

        {/* Configuration Guide */}
        <div className="bento-card span-6">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
            <Wrench className="card-icon" style={{ margin: 0 }} />
            <h3 style={{ margin: 0 }}>Registering with Desktop Hub</h3>
          </div>
          <p style={{ marginBottom: '1rem' }}>
            To register your tool server with the BATON Desktop Hub, add it to your <code>baton.json</code> configuration file or pass environment variables:
          </p>
          <div className="z-code">
            <div className="code-header">
              <span>baton.json</span>
            </div>
            <pre><code>{`{
  "mcpServers": {
    "local-tools": {
      "command": "python",
      "args": ["C:/agents/server.py"],
      "env": {}
    }
  }
}`}</code></pre>
          </div>
        </div>

        {/* Local LLM Integration */}
        <div className="bento-card span-6">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
            <Terminal className="card-icon" style={{ margin: 0 }} />
            <h3 style={{ margin: 0 }}>Local Model Backends</h3>
          </div>
          <p style={{ marginBottom: '1rem' }}>
            BATON connects out-of-the-box to local inference engines running on your machine:
          </p>
          <ul style={{ paddingLeft: '1.25rem', color: 'var(--text-muted)', display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.9rem' }}>
            <li><strong>Ollama:</strong> Connects to <code>http://127.0.0.1:11434</code> automatically.</li>
            <li><strong>LM Studio:</strong> Connects to <code>http://127.0.0.1:1234/v1</code> OpenAI-compatible server.</li>
            <li><strong>vLLM & LocalAI:</strong> Point BATON to any custom HTTP/SSE host.</li>
            <li><strong>HuggingFace TGI:</strong> Standard OpenAI-format streaming supported.</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
