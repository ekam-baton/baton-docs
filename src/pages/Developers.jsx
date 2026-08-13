import React, { useState } from 'react';

export default function Developers() {
  const [activeLang, setActiveLang] = useState('python');

  return (
    <div className="animate-fade-in inner-page">
      <h1>Developers</h1>
      <p className="page-intro">
        Write custom tools that run on your machine and trigger them from your phone.
      </p>

      <h2>How BATON connects to your tools</h2>
      <p>
        BATON uses the <a href="https://modelcontextprotocol.io" target="_blank" rel="noopener noreferrer">Model Context Protocol</a> (MCP)
        — an open standard for connecting AI models to local tools. The mobile app acts as an MCP client.
        The desktop connector acts as the host, spawning your tool processes and routing JSON-RPC
        messages between your phone and your local code over <code>stdio</code>.
      </p>
      <p>
        Your tools run as normal processes under your user account. BATON never requires root
        or admin privileges. All tool requests and responses are encrypted end-to-end before
        they leave either device.
      </p>

      <h2>Write a tool server</h2>
      <p>Pick your language:</p>
      <div className="lang-tabs">
        <button
          onClick={() => setActiveLang('python')}
          className={`lang-tab ${activeLang === 'python' ? 'active' : ''}`}
        >
          Python
        </button>
        <button
          onClick={() => setActiveLang('typescript')}
          className={`lang-tab ${activeLang === 'typescript' ? 'active' : ''}`}
        >
          TypeScript
        </button>
      </div>

      {activeLang === 'python' ? (
        <div className="z-code">
          <div className="code-header">
            <span>server.py</span>
            <span>Python 3.10+ · pip install mcp</span>
          </div>
          <pre><code>{`from mcp.server.fastmcp import FastMCP
import sqlite3

mcp = FastMCP("my-tools")

@mcp.tool()
def query_notes(search: str) -> str:
    """Search your local notes database."""
    conn = sqlite3.connect("notes.db")
    cur = conn.cursor()
    cur.execute(
        "SELECT title, body FROM notes WHERE body LIKE ?",
        (f"%{search}%",)
    )
    results = cur.fetchall()
    conn.close()
    if not results:
        return "No matches found."
    return "\\n".join(f"• {title}: {body[:120]}" for title, body in results)

@mcp.tool()
def system_status() -> str:
    """Check CPU and memory usage."""
    import psutil
    cpu = psutil.cpu_percent(interval=1)
    mem = psutil.virtual_memory()
    return f"CPU: {cpu}% | RAM: {mem.used // (1024**3)}GB / {mem.total // (1024**3)}GB"

if __name__ == "__main__":
    mcp.run(transport="stdio")`}</code></pre>
        </div>
      ) : (
        <div className="z-code">
          <div className="code-header">
            <span>server.ts</span>
            <span>Node 18+ · npm install @modelcontextprotocol/sdk</span>
          </div>
          <pre><code>{`import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from "@modelcontextprotocol/sdk/types.js";
import { execSync } from "child_process";

const server = new Server(
  { name: "dev-tools", version: "1.0.0" },
  { capabilities: { tools: {} } }
);

server.setRequestHandler(ListToolsRequestSchema, async () => ({
  tools: [
    {
      name: "git_status",
      description: "Show the current git status of a repository",
      inputSchema: {
        type: "object",
        properties: { path: { type: "string" } },
        required: ["path"],
      },
    },
  ],
}));

server.setRequestHandler(CallToolRequestSchema, async (req) => {
  if (req.params.name === "git_status") {
    const path = String(req.params.arguments?.path);
    const output = execSync("git status --short", { cwd: path }).toString();
    return { content: [{ type: "text", text: output || "Clean working tree" }] };
  }
  throw new Error("Unknown tool");
});

const transport = new StdioServerTransport();
await server.connect(transport);`}</code></pre>
        </div>
      )}

      <h2>Register your tool</h2>
      <p>
        Add your tool server to the <code>baton.json</code> configuration file in the connector's
        working directory:
      </p>
      <div className="z-code">
        <div className="code-header">
          <span>baton.json</span>
        </div>
        <pre><code>{`{
  "mcpServers": {
    "my-tools": {
      "command": "python",
      "args": ["C:/agents/server.py"],
      "env": {}
    }
  }
}`}</code></pre>
      </div>
      <p>
        Restart the desktop connector. Your tools will appear in the mobile app automatically.
      </p>

      <h2>Supported model backends</h2>
      <p>
        BATON connects to any local inference engine that exposes an HTTP endpoint:
      </p>
      <ul>
        <li><strong>Ollama</strong> — auto-detected at <code>http://127.0.0.1:11434</code></li>
        <li><strong>LM Studio</strong> — OpenAI-compatible at <code>http://127.0.0.1:1234/v1</code></li>
        <li><strong>vLLM / LocalAI / TGI</strong> — any custom endpoint with OpenAI-format streaming</li>
      </ul>
      <p>
        You can also proxy to cloud APIs (Anthropic, Azure OpenAI, Vertex AI) if you prefer.
        The connector handles authentication and routing.
      </p>
    </div>
  );
}
