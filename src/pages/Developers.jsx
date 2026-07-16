import React from 'react';

export default function Developers() {
  return (
    <div className="animate-fade-in page-wrapper" style={{ paddingTop: '6rem' }}>
      <div className="section-header">
        <h1>Developers & API</h1>
        <p>Build custom MCP adapters and integrate Baton into your existing AI workflows.</p>
      </div>
      
      <div className="bento-grid" style={{ marginTop: '3rem' }}>
        <div className="bento-card span-12">
          <h2>MCP Architecture</h2>
          <p style={{ marginBottom: '1.5rem' }}>Baton acts as an MCP (Model Context Protocol) client on your phone and an MCP server host on your desktop. This means any standard MCP server can be instantly exposed to your phone securely.</p>
          <div className="z-code" style={{ padding: '0' }}>
            <div className="code-header">
              <div className="dots"><span className="dot red"></span><span className="dot yellow"></span><span className="dot green"></span></div>
              <span>mcp_server.py</span>
            </div>
            <pre><code>{`# Example MCP Server Registration
import os
from mcp.server import Server

app = Server("MyCustomAgent")

@app.tool()
async def execute_task(task: str) -> str:
    """Execute a local task"""
    return f"Executing {task} locally!"

if __name__ == "__main__":
    app.run_stdio()`}</code></pre>
          </div>
        </div>
      </div>
    </div>
  );
}
